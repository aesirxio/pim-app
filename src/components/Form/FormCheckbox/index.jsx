/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const FormCheckbox = ({ field }) => {
  const [selectedValue, setSelectedValue] = useState(field.getValueSelected?.value ?? []);
  useEffect(() => {
    if (field.getValueSelected?.value) {
      setSelectedValue(field.getValueSelected?.value);
    }
  }, [field.getValueSelected?.value]);

  useEffect(() => {
    field.handleChange(selectedValue);
  }, [selectedValue]);

  const handleChange = (data) => {
    if (data.target.checked) {
      setSelectedValue((current) => [...current, data.target.value]);
    } else {
      setSelectedValue((current) => current.filter((item) => item !== data.target.value));
    }
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
              type={'checkbox'}
              id={`inline-radio-${option.value}`}
              onChange={handleChange}
              onBlur={field?.blurred}
              checked={selectedValue?.includes(option.value)}
            />
          )
      )}
    </div>
  );
};

export default FormCheckbox;
