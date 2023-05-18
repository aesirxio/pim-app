/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import 'aesirx-uikit/dist/index.css';
import 'scss/app.scss';

import { AppProvider, Menu, isLogin } from 'aesirx-uikit';
import appLanguages from 'translations';
import { authRoutes, mainRoutes, settingRoutes } from 'routes/routes';

import { AesirXDamStorage } from 'aesirx-dam-app';
import { settingMenu, profileMenu } from 'routes/menu';
import SbarLeft from 'components/SbarLeft';

const App = () => {
  return (
    <AppProvider
      appLanguages={appLanguages}
      authRoutes={authRoutes}
      mainRoutes={mainRoutes}
      settingRoutes={settingRoutes}
      profileMenu={profileMenu}
      isLogin={isLogin}
      componentBottomMenu={<AesirXDamStorage />}
      leftMenu={<SbarLeft />}
      settingMenu={<Menu dataMenu={settingMenu} />}
    />
  );
};

export default App;
