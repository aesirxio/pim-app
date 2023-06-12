/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { SVGComponent } from 'aesirx-uikit';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import { AesirXSelect as SelectComponent } from 'aesirx-uikit';
import CreatableComponent from '../../../components/Select/Creatable';
import FormRadio from '../FormRadio';
import Input from '../Input';
import Label from '../Label';
import './index.scss';
import { withTranslation } from 'react-i18next';
import { notify } from 'aesirx-uikit';
import { renderingGroupFieldHandler } from 'utils/form';

class FormSelectionFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: props.field?.getValueSelected,
      listOptions: this.props.field.getValueSelectedOptions,
    };
  }

  handleChange = (data) => {
    if (this.props.field.isEdit) {
      notify(this.props.t('txt_field_change_warning'), 'warn');
    }
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
    const { t, validator } = this.props;
    const specifications = this.props.field.listFieldType?.length
      ? this.props.field.listFieldType?.find((item) => item?.value === this.state.field?.value)
          ?.specifications
      : null;
    if (specifications?.length && !this.props.field.isEdit) {
      specifications?.map((item) => {
        return this.props.field.viewModel.handleFormPropsData([PIM_FIELD_DETAIL_FIELD_KEY.PARAMS], {
          [item?.attributes?.name]: item?.attributes?.default,
        });
      });
    }
    const generateSpecificationsSetting = [
      {
        fields: specifications?.length
          ? specifications?.map((item) => {
              let selectedValue = '';
              if (
                item?.attributes?.type === FORM_FIELD_TYPE.SELECTION ||
                item?.attributes?.type === FORM_FIELD_TYPE.LIST ||
                item?.attributes?.type === FORM_FIELD_TYPE.RADIO ||
                item?.attributes?.type === FORM_FIELD_TYPE.CHECKBOX
              ) {
                let fieldValue = this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                  PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                ][item?.attributes?.name]
                  ? this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                      PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                    ][item?.attributes?.name]
                  : item?.attributes?.default;
                selectedValue = fieldValue
                  ? {
                      label: item?.options?.find((x) => x.value?.toString() === fieldValue)?.label,
                      value: fieldValue,
                    }
                  : null;
              } else {
                selectedValue =
                  this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                    PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                  ][item?.attributes?.name] ?? null;
              }
              return (
                item?.attributes?.label && {
                  label: item?.attributes?.label,
                  key: item?.attributes?.name,
                  type: item?.attributes?.type,
                  getValueSelected: selectedValue,
                  getDataSelectOptions:
                    item?.options?.map((item) => {
                      return { label: item?.label, value: item?.value?.toString() };
                    }) ?? [],
                  handleChange: (data) => {
                    if (
                      item?.attributes?.type === FORM_FIELD_TYPE.SELECTION ||
                      item?.attributes?.type === FORM_FIELD_TYPE.LIST
                    ) {
                      this.props.field.viewModel.handleFormPropsData(
                        [PIM_FIELD_DETAIL_FIELD_KEY.PARAMS],
                        { [item?.attributes?.name]: data.value }
                      );
                    } else if (item?.attributes?.type === FORM_FIELD_TYPE.IMAGE) {
                      this.props.field.viewModel.handleFormPropsData(
                        [PIM_FIELD_DETAIL_FIELD_KEY.PARAMS],
                        { [item?.attributes?.name]: data }
                      );
                    } else if (item?.attributes?.type === FORM_FIELD_TYPE.CHECKBOX) {
                      this.props.field.viewModel.handleFormPropsData(
                        [PIM_FIELD_DETAIL_FIELD_KEY.PARAMS],
                        { [item?.attributes?.name]: data ?? '' }
                      );
                    } else if (item?.attributes?.type === FORM_FIELD_TYPE.EDITOR) {
                      this.props.field.viewModel.handleFormPropsData(
                        [PIM_FIELD_DETAIL_FIELD_KEY.PARAMS],
                        { [item?.attributes?.name]: data }
                      );
                    } else {
                      this.props.field.viewModel.handleFormPropsData(
                        [PIM_FIELD_DETAIL_FIELD_KEY.PARAMS],
                        { [item?.attributes?.name]: data.target.value }
                      );
                      console.log(
                        'dsadsa',
                        this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                          PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                        ]
                      );
                    }
                  },
                  description: item?.attributes?.description,
                  className: 'col-lg-12 mt-24',
                }
              );
            })
          : {},
      },
    ];
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

            {(this.state.field?.value === FORM_FIELD_TYPE.SELECTION ||
              this.state.field?.value === FORM_FIELD_TYPE.RADIO ||
              this.state.field?.value === FORM_FIELD_TYPE.CHECKBOX) && (
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
                              <SVGComponent
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
                  className={`px-24 py-10 fw-semibold d-flex align-items-center rounded-1 border border-success border-da-1 mt-16`}
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
                  <SVGComponent url="/assets/images/plus.svg" className={`me-15`} />
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
            {Object.keys(generateSpecificationsSetting)
              .map((groupIndex) => {
                return [...Array(generateSpecificationsSetting[groupIndex])].map((group) => {
                  return renderingGroupFieldHandler(group, validator);
                });
              })
              .reduce((arr, el) => {
                return arr.concat(el);
              }, [])}
          </>
        )}
      </>
    );
  }
}

export default withTranslation()(FormSelectionFields);
