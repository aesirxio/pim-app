/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';

const FormRadio = ({ field }) => {
  console.log('field.getValueSelected ', field.getValueSelected);
  return (
    <div className="d-flex align-items-center justify-content-between w-100">
      {field.getDataSelectOptions?.map((option, key) => (
        <Form.Check
          key={key}
          className={`mb-0 ${option.className}`}
          inline
          label={option.label}
          value={option.value}
          name="group1"
          type={field.checkbox ? 'checkbox' : 'radio'}
          id={`inline-radio-${option.value}`}
          onChange={field.handleChange}
          checked={field.getValueSelected === option.value}
        />
      ))}
    </div>
  );
};

export default FormRadio;
