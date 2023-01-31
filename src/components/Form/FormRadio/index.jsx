/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const FormRadio = ({ field }) => {
  const [selectedValue, setSelectedValue] = useState(field.getValueSelected?.value);
  useEffect(() => {
    if (field.getValueSelected?.value) {
      setSelectedValue(field.getValueSelected?.value);
    }
  }, [field.getValueSelected?.value]);

  const handleChange = (data) => {
    setSelectedValue(data.target.value);
    field.handleChange(data);
  };
  return (
    <div className="d-flex align-items-center w-100">
      {field.getDataSelectOptions?.map(
        (option, key) =>
          option.label && (
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
              onBlur={field?.blurred}
              checked={selectedValue === option.value}
            />
          )
      )}
    </div>
  );
};

export default FormRadio;
