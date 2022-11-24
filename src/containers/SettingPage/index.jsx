/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
// import Spinner from '../../components/Spinner';

import SettingStore from './SettingStore/SettingStore';

import { withTranslation } from 'react-i18next';
import SettingViewModel from './SettingViewModel/SettingViewModel';
import { SettingViewModelContextProvider } from './SettingViewModel/SettingViewModelContextProvider';
// import SettingList from './SettingList/SettingList';
import './index.scss';
const settingStore = new SettingStore();

const settingViewModel = new SettingViewModel(settingStore);

const HomePage = (props) => {
  const { t } = props;

  return (
    <SettingViewModelContextProvider viewModel={settingViewModel}>
      <div className="py-4 px-3 h-100 d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
          <div className="position-relative">
            <h1 className="text-blue-0 fw-bold mb-8px fs-2">{t('txt_menu_setting')}</h1>
          </div>
        </div>
      </div>

      {/* <Suspense fallback={<Spinner />}>
          <SettingList />
        </Suspense> */}
    </SettingViewModelContextProvider>
  );
};

export default withTranslation('common')(HomePage);
