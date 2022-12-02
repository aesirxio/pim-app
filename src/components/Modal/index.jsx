/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { withTranslation } from 'react-i18next';

import './index.scss';
import { Modal } from 'react-bootstrap';

class ModalComponent extends React.Component {
  render() {
    let { header, footer, body, show, onHide, dialogClassName, onShow } = this.props;

    return (
      <Modal show={show} onShow={onShow} onHide={onHide} centered dialogClassName={dialogClassName}>
        <Modal.Header closeButton className="px-24 border-bottom-0 text-blue-0">
          {header && <Modal.Title>{header}</Modal.Title>}
        </Modal.Header>
        <Modal.Body className="px-24 pt-24 pb-0">{body}</Modal.Body>
        {footer && <Modal.Footer className="p-24">{footer}</Modal.Footer>}
      </Modal>
    );
  }
}

export default withTranslation('common')(ModalComponent);
