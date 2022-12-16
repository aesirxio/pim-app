/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ComponentSVG from 'components/ComponentSVG';
import ComponentVideo from 'components/ComponentVideo';
import ModalDAMComponent from 'components/ModalDamComponent';
import React, { useState } from 'react';
import { Button, Col, Ratio, Row } from 'react-bootstrap';

import './index.scss';
const FormVideo = ({ field }) => {
  const [file, setFile] = useState(field.getValueSelected);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const onSelect = (data) => {
    data.length && setFile(data);
    field.handleChange(data);
    setShow(false);
  };

  return (
    <>
      <div className="position-relative">
        {file && (
          <Row className="gx-24 mb-16">
            <Col lg={7}>
              <Ratio aspectRatio="16x9">
                <div className="d-flex align-items-center w-100 h-100 border">
                  <ComponentVideo src={file && file[0]?.url} />
                </div>
              </Ratio>
            </Col>
          </Row>
        )}
        <Button
          variant={`light`}
          className={` px-24 py-1 fw-semibold d-flex align-items-center rounded-1 border`}
          onClick={() => {
            setShow(true);
          }}
        >
          <ComponentSVG url="/assets/images/add-media-image.svg" className="bg-black me-1" />
          Add More Video
        </Button>
      </div>
      <ModalDAMComponent show={show} onHide={handleClose} onSelect={onSelect} />
    </>
  );
};

export default FormVideo;
