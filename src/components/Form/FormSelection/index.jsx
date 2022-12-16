/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';

import SelectComponent from '../../../components/Select';
import CreatableComponent from '../../../components/Select/Creatable';
import Input from '../Input';
import './index.scss';

class FormSelection extends Component {
  constructor(props) {
    super(props);
    this.state = { field: props.field?.getValueSelected?.value };
  }

  handleChange = (data) => {
    this.props.field.handleChange(data);
    if (
      data.value === FORM_FIELD_TYPE.NUMBER ||
      data.value === FORM_FIELD_TYPE.SELECTION ||
      this.state.field === FORM_FIELD_TYPE.NUMBER
    ) {
      this.setState({ field: data.value });
    }
  };
  render() {
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
              defaultValue={this.props.field.getValueSelected}
              options={this.props.field.getDataSelectOptions}
              className="fs-14"
              isBorder={true}
              //onFocus={this.props.field.changed}
              onBlur={this.props.field.blurred}
              isMulti={this.props.field.isMulti}
              onChange={this.handleChange}
              arrowColor={this.props.field.arrowColor}
              placeholder={this.props.field.placeholder}
              isDisabled={this.props.field.isDisabled}
            />
            {this.props.field.extraField && this.state.field === FORM_FIELD_TYPE.NUMBER && (
              <Input
                field={{
                  value: this.props.field.extraFieldNumberValueSelected,
                  classNameInput: 'fs-14 mt-16',
                  placeholder: 'Format',
                  handleChange: this.props.field.extraFieldNumberHandleChange,
                }}
              />
            )}
          </>
        )}
      </>
    );
  }
}

export default FormSelection;
