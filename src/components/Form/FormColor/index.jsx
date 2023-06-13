/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './index.scss';
import { withTranslation } from 'react-i18next';
import { ChromePicker, SketchPicker } from 'react-color';
const FormColor = ({ field, ...props }) => {
  const { t } = props;
  const [colorSelected, setColor] = useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  });
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChange = (color) => {
    setColor(color?.rgb);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const color = {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
    background: `rgba(${colorSelected.r}, ${colorSelected.g}, ${colorSelected.b}, ${colorSelected.a})`,
  };
  const swatch = {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  };
  const popover = {
    position: 'absolute',
    zIndex: '2',
  };
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };
  return (
    <div className="position-relative">
      {/* <Form.Control
        as="input"
        defaultValue={field.getValueSelected ?? ''}
        type={field.typeFormat ? (field.typeFormat == 11 ? 'password' : 'text') : 'text'}
        required={field.required ?? false}
        id={field.key}
        onPaste={field.pasted ?? undefined}
        className={`${field.classNameInput}`}
        onBlur={field.blurred ?? undefined}
        placeholder={field.placeholder ?? t('txt_type')}
        readOnly={field.readOnly}
        disabled={field.disabled}
        maxLength={field.maxLength}
      /> */}
      <div style={swatch} onClick={handleClick}>
        <div style={color} />
      </div>
      {displayColorPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <SketchPicker color={colorSelected} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default withTranslation()(FormColor);
