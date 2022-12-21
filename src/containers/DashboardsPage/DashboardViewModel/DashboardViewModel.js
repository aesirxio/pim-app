/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import DashboardDetailViewModel from './DashboardDetailViewModel';

class DashboardViewModel {
  dashboardDetailViewModel = null;
  dashboardListViewModel = null;

  constructor(dashboardStore) {
    if (dashboardStore) {
      this.dashboardDetailViewModel = new DashboardDetailViewModel(dashboardStore);
    }
  }

  getDashboardDetailViewModel = () => this.dashboardDetailViewModel;
}

export default DashboardViewModel;
