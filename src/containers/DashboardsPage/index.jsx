/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

import DashboardStore from 'containers/DashboardsPage/DashboardStore/DashboardStore';
import DashboardViewModel from 'containers/DashboardsPage/DashboardViewModel/DashboardViewModel';
import { DashboardViewModelContextProvider } from 'containers/DashboardsPage/DashboardViewModel/DashboardViewModelContextProvider';
import Dashboard from './dashboard';
const dashboardStore = new DashboardStore();
const dashboardViewModel = new DashboardViewModel(dashboardStore);

const DashboardProvider = observer(
  class DashboardProvider extends Component {
    render() {
      return (
        <DashboardViewModelContextProvider viewModel={dashboardViewModel}>
          <Dashboard />
        </DashboardViewModelContextProvider>
      );
    }
  }
);
export default withTranslation()(DashboardProvider);
