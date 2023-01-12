/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ComponentSVG from 'components/ComponentSVG';
import React from 'react';
const EditHeader = ({ props, title, isEdit, redirectUrl }) => {
  const { t, history } = props;
  return (
    <div className="position-relative">
      <h2 className="text-blue-0 fw-bold mb-8px d-flex align-items-center">
        <div
          className="p-sm ps-0 cursor-pointer d-flex"
          onClick={() => {
            history.push(redirectUrl);
          }}
        >
          <ComponentSVG url="/assets/images/back.svg" className={'bg-success'} />
        </div>
        {isEdit ? t('txt_edit') : t('txt_add_new')} {title}
      </h2>
    </div>
  );
};
export default EditHeader;
