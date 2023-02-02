/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ComponentSVG from 'components/ComponentSVG';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import SelectComponent from '../../../components/Select';
import CreatableComponent from '../../../components/Select/Creatable';
import FormRadio from '../FormRadio';
import Input from '../Input';
import Label from '../Label';
import './index.scss';
import { withTranslation } from 'react-i18next';

class FormSelectionFields extends Component {
  constructor(props) {
    super(props);
    console.log('this.props', this.props);
    this.state = {
      field: props.field?.getValueSelected,
      listOptions: this.props.field.getValueSelectedOptions,
    };
  }

  handleChange = (data) => {
    this.props.field.handleChange(data);
    this.setState({ field: data });
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.field.getValueSelected !== this.props.field.getValueSelected) {
      this.setState((prevState) => {
        return {
          ...prevState,
          field: this.props.field.getValueSelected,
        };
      });
    }
    this.state.listOptions.length &&
      this.props.field.viewModel.handleFormPropsData(
        [PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS],
        [...this.state.listOptions]
      );
  };
  render() {
    const { t } = this.props;
    return (
      <>
        {this.props.field.creatable ? (
          <CreatableComponent
            defaultValue={this.props.field.getValueSelected}
            isBorder={true}
            arrowColor={this.props.field.arrowColor}
            placeholder={this.props.field.placeholder}
            className="fs-14"
            onChange={this.props.field.handleChange}
          />
        ) : (
          <>
            <SelectComponent
              value={this.state.field ?? null}
              options={this.props.field?.getDataSelectOptions}
              className="fs-14"
              isBorder={true}
              //onFocus={this.props.field.changed}
              onBlur={this.props.field?.blurred}
              isMulti={this.props.field?.isMulti}
              onChange={this.handleChange}
              arrowColor={this.props.field?.arrowColor}
              placeholder={this.props.field?.placeholder}
              isDisabled={this.props.field?.isDisabled}
            />
            {this.state.field?.value === FORM_FIELD_TYPE.NUMBER && (
              <Input
                field={{
                  getValueSelected:
                    this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                      PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                    ].number_units,
                  classNameInput: 'fs-14 mt-16',
                  placeholder: 'Format',
                  handleChange: (data) => {
                    this.props.field.viewModel.handleFormPropsData(
                      [PIM_FIELD_DETAIL_FIELD_KEY.PARAMS],
                      {
                        number_units: data.target.value,
                      }
                    );
                  },
                }}
              />
            )}
            {(this.state.field?.value === FORM_FIELD_TYPE.SELECTION ||
              this.state.field?.value === FORM_FIELD_TYPE.RADIO) && (
              <>
                {this.state.listOptions.length
                  ? this.state.listOptions.map((option, index) => (
                      <Row
                        key={option.label + '-' + option.value + '-' + index}
                        className="mt-16 gx-24"
                      >
                        <Col xs={4}>
                          <Input
                            field={{
                              key: index + option.label,
                              getValueSelected: option.label,
                              classNameInput: 'fs-14',
                              placeholder: 'Label',
                              handleChange: (data) => {
                                this.props.field.viewModel.handleFormPropsData(
                                  PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS,
                                  { label: data.target.value },
                                  index
                                );
                              },
                            }}
                          />
                        </Col>
                        <Col xs={8}>
                          <div className="d-flex">
                            <div className="w-100">
                              <Input
                                field={{
                                  key: index + option.value,
                                  getValueSelected: option.value,
                                  classNameInput: 'fs-14',
                                  placeholder: 'Value',
                                  handleChange: (data) => {
                                    this.props.field.viewModel.handleFormPropsData(
                                      PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS,
                                      { value: data.target.value },
                                      index
                                    );
                                  },
                                }}
                              />
                            </div>
                            <div
                              className="border-1 rounded-1 d-flex align-items-center justify-content-center ms-24 px-8px cursor-pointer"
                              onClick={() => {
                                let array = [...this.state.listOptions];
                                array.splice(index, 1);
                                this.setState((prevState) => {
                                  return {
                                    ...prevState,
                                    listOptions: array,
                                  };
                                });
                              }}
                            >
                              <ComponentSVG
                                url="/assets/images/cancel.svg"
                                className={'bg-danger'}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ))
                  : null}

                <Button
                  variant={`light`}
                  className={`px-24 py-1 fw-semibold d-flex align-items-center rounded-1 border border-success border-da-1 mt-16`}
                  onClick={() => {
                    if (this.state.listOptions.length) {
                      this.setState((prevState) => {
                        return {
                          ...prevState,
                          listOptions: [
                            ...this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                              PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS
                            ],
                            { label: '', value: '' },
                          ],
                        };
                      });
                    } else {
                      this.setState((prevState) => {
                        return {
                          ...prevState,
                          listOptions: [...this.state.listOptions, { label: '', value: '' }],
                        };
                      });
                    }
                  }}
                >
                  <ComponentSVG url="/assets/images/plus.svg" className={`me-15`} />
                  {t('txt_add_more_option')}
                </Button>
              </>
            )}
            {this.state.field?.value === FORM_FIELD_TYPE.EDITOR && (
              <div className="mt-16">
                <Label text={'Textarea'} />
                <FormRadio
                  field={{
                    key: 'textarea',
                    getValueSelected: this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                      PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                    ]?.editor
                      ? {
                          label:
                            this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                              PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                            ]?.editor === 'none'
                              ? 'Yes'
                              : 'No',
                          value:
                            this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                              PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                            ]?.editor.toString(),
                        }
                      : {
                          label: 'No',
                          value: 'default',
                        },
                    getDataSelectOptions: [
                      {
                        label: 'No',
                        value: 'default',
                      },
                      {
                        label: 'Yes',
                        value: 'none',
                      },
                    ],
                    handleChange: (data) => {
                      this.props.field.viewModel.handleFormPropsData(
                        PIM_FIELD_DETAIL_FIELD_KEY.PARAMS,
                        { editor: data.target.value }
                      );
                    },
                  }}
                />
              </div>
            )}
            {this.state.field?.value === FORM_FIELD_TYPE.IMAGE && (
              <div className="mt-16">
                <Label text={'Multiple'} />
                <FormRadio
                  field={{
                    key: 'isMulti',
                    getValueSelected: this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                      PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                    ]?.multiple
                      ? {
                          label:
                            this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                              PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                            ]?.multiple === '1'
                              ? 'Yes'
                              : 'No',
                          value:
                            this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                              PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                            ]?.multiple.toString(),
                        }
                      : {
                          label: 'No',
                          value: '0',
                        },
                    getDataSelectOptions: [
                      {
                        label: 'No',
                        value: '0',
                      },
                      {
                        label: 'Yes',
                        value: '1',
                      },
                    ],
                    handleChange: (data) => {
                      this.props.field.viewModel.handleFormPropsData(
                        PIM_FIELD_DETAIL_FIELD_KEY.PARAMS,
                        { multiple: data.target.value }
                      );
                    },
                  }}
                />
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default withTranslation('common')(FormSelectionFields);
