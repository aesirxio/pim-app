/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';
import './index.scss';

const Input = ({ field }) => {
  const handleChange = (e) => {
    if (Object.prototype.hasOwnProperty.call(field, 'handleChange')) {
      e.target.value = e.target.value.normalize('NFKC');
      field.handleChange(e);
    }
  };

  return (
    <div className="position-relative">
      <Form.Control
        as="input"
        defaultValue={field.getValueSelected ?? ''}
        type={field.typeFormat ? (field.typeFormat == 11 ? 'password' : 'text') : 'text'}
        required={field.required ?? false}
        id={field.key}
        onChange={(e) => handleChange(e)}
        onSelect={(e) => handleChange(e)}
        onPaste={field.pasted ?? undefined}
        className={`${field.classNameInput}`}
        onBlur={field.blurred ?? undefined}
        placeholder={field.placeholder ?? 'Type'}
        readOnly={field.readOnly}
        disabled={field.disabled}
      />
      {field.format && (
        <div
          className={`form-control input-format border-0 border-start border-end ${field.classNameInput}`}
        >
          {field.format}
        </div>
      )}
    </div>
  );
};

export default Input;
