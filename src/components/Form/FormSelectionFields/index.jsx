/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ComponentSVG from 'components/ComponentSVG';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import SelectComponent from '../../../components/Select';
import CreatableComponent from '../../../components/Select/Creatable';
import Input from '../Input';
import './index.scss';

class FormSelectionFields extends Component {
  constructor(props) {
    super(props);
    this.state = { field: props.field?.getValueSelected, listOptions: [] };
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
  };
  render() {
    console.log('this.props.viewModel', this.state);
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
            {this.state.field?.value === FORM_FIELD_TYPE.SELECTION && (
              <>
                {this.state.listOptions.length
                  ? this.state.listOptions.map((option, index) => (
                      <Row key={index} className="mt-16 gx-24">
                        <Col lg={4}>
                          <Input
                            field={{
                              getValueSelected:
                                this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                                  PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                                ].number_units,
                              classNameInput: 'fs-14',
                              placeholder: 'Label',
                              handleChange: (data) => {
                                this.props.field.viewModel.handleFormPropsData(
                                  PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS + '[' + index + ']',
                                  { label: data.target.value, value: 'test' }
                                );
                                console.log(
                                  'this.props.field.viewModel',
                                  this.props.field.viewModel.fieldDetailViewModel.formPropsData
                                );
                              },
                            }}
                          />
                        </Col>
                        <Col lg={8}>
                          <Input
                            field={{
                              getValueSelected:
                                this.props.field.viewModel.fieldDetailViewModel.formPropsData[
                                  PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                                ].number_units,
                              classNameInput: 'fs-14',
                              placeholder: 'Value',
                              handleChange: (data) => {
                                this.props.field.viewModel.handleFormPropsData(
                                  [PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS][index],
                                  { value: data.target.value }
                                );
                                console.log(
                                  'this.props.field.viewModel',
                                  this.props.field.viewModel.fieldDetailViewModel.formPropsData
                                );
                              },
                            }}
                          />
                        </Col>
                      </Row>
                    ))
                  : null}

                <Button
                  variant={`light`}
                  className={`px-24 py-1 fw-semibold d-flex align-items-center rounded-1 border border-success border-da-1 mt-16`}
                  onClick={() => {
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        listOptions: [...this.state.listOptions, { label: '', value: '' }],
                      };
                    });
                    this.props.field.viewModel.handleFormPropsData(
                      [PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS],
                      [...this.state.listOptions, { label: '', value: '' }]
                    );
                    console.log(
                      'this.props.field.viewModel',
                      this.props.field.viewModel.fieldDetailViewModel.formPropsData
                    );
                  }}
                >
                  <ComponentSVG url="/assets/images/plus.svg" className={`me-15`} />
                  Add More Option
                </Button>
              </>
            )}
          </>
        )}
      </>
    );
  }
}

export default FormSelectionFields;
