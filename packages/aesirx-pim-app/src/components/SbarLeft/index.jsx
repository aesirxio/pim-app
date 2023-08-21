/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { mainMenu, menuSetup } from 'routes/menu';
import { Menu } from 'aesirx-uikit';
import { useTranslation } from 'react-i18next';

const SbarLeft = () => {
  const { t } = useTranslation();

  return (
    <>
      <Menu dataMenu={mainMenu} />

      <div className="border-top border-dark-blue">
        <Menu dataMenu={menuSetup} title={t('txt_set_up')} />
      </div>
    </>
  );
};

export default SbarLeft;
