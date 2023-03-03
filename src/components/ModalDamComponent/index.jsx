import React from 'react';
import { AesirXDam } from 'aesirx-dam-app';
import { Modal } from 'react-bootstrap';
import './index.scss';
import { useThemeContext } from 'themes/ThemeContextProvider';
import { useTranslation } from 'react-i18next';
function ModalDAMComponent({ show, onHide, onSelect }) {
  const { theme } = useThemeContext();
  const { i18n } = useTranslation('common');
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
          <AesirXDam onSelect={onSelect} lang={i18n?.language} theme={theme?.theme} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDAMComponent;
