/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { SVGComponent } from 'aesirx-uikit';
import React from 'react';
import { historyPush } from 'routes/routes';

const EditHeader = ({ props, title, isEdit, redirectUrl }) => {
  const { t } = props;
  return (
    <div className="position-relative">
      <h2 className="fw-bold mb-8px d-flex align-items-center">
        <div
          className="p-sm ps-0 cursor-pointer d-flex"
          onClick={() => {
            historyPush(redirectUrl);
          }}
        >
          <SVGComponent url="/assets/images/back.svg" className={'bg-success'} />
        </div>
        {isEdit ? t('txt_edit') : t('txt_add_new')} {title}
      </h2>
    </div>
  );
};
export default EditHeader;
