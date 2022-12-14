/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';

const FormRadio = ({ field }) => {
  const handleChange = (data) => {
    field.handleChange(data);
  };
  return (
    <div className="d-flex align-items-center justify-content-between w-100">
      {field.getDataSelectOptions?.map((option, key) => (
        <Form.Check
          key={field.key + key}
          className={`mb-0 ${option.className}`}
          inline
          label={option.label}
          value={option.value}
          name={field.key}
          type={field.checkbox ? 'checkbox' : 'radio'}
          id={`inline-radio-${option.value}`}
          onChange={handleChange}
          defaultChecked={field.getValueSelected?.value === option.value}
        />
      ))}
    </div>
  );
};

export default FormRadio;
