/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './index.scss';
import { withTranslation } from 'react-i18next';
import { SketchPicker } from 'react-color';
import { SVGComponent } from 'aesirx-uikit';
const FormColor = ({ field, ...props }) => {
  const { t } = props;
  const [colorSelected, setColor] = useState(field.getValueSelected ?? '#ffffff');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChange = (color) => {
    setColor(color?.hex);
    field.handleChange(color?.hex);
  };

  const handleChangeInput = (e) => {
    if (Object.prototype.hasOwnProperty.call(field, 'handleChange')) {
      e.target.value = e.target.value.normalize('NFKC');
      field.handleChange(e.target.value);
      setColor(e.target.value);
    }
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const color = {
    height: '30px',
    borderRadius: '2px',
    background: `${colorSelected}`,
    width: '100%',
  };
  const swatch = {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'block',
    cursor: 'pointer',
    width: '100%',
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
      <Row className="align-items-center">
        <Col sm="3">
          <Form.Control
            as="input"
            value={colorSelected}
            type={'text'}
            required={field.required ?? false}
            id={field.key}
            onPaste={field.pasted ?? undefined}
            className={`${field.classNameInput}`}
            onChange={(e) => handleChangeInput(e)}
            onSelect={(e) => handleChangeInput(e)}
            onBlur={field.blurred ?? undefined}
            placeholder={field.placeholder ?? t('txt_type')}
            readOnly={field.readOnly}
            disabled={field.disabled}
            maxLength={field.maxLength}
          />
        </Col>
        <Col sm="9">
          <div className="d-flex">
            <div className="w-100">
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
            <div
              className="border-1 rounded-1 d-flex align-items-center justify-content-center ms-24 px-8px cursor-pointer"
              onClick={() => {
                setColor('#ffffff');
                field.handleChange('#ffffff');
              }}
            >
              <SVGComponent url="/assets/images/cancel.svg" className={'bg-danger'} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation()(FormColor);
