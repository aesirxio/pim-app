import React from 'react';
import { AesirXDam } from 'aesirx-dam-app';
import { Modal } from 'react-bootstrap';
import './index.scss';
function ModalDAMComponent({ show, onHide, onSelect }) {
  return (
    <Modal
      dialogClassName={'modal-xl modal_digital_assets'}
      show={show}
      onHide={onHide}
      centered
      autoFocus={false}
    >
      <Modal.Body className="px-24 pt-24 pb-0">
        <div className="modal-class">
          <AesirXDam onSelect={onSelect} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDAMComponent;
