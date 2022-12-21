/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxPimDashboardApiService from 'library/Pim/PimDashboard/PimDashboard';
import { runInAction } from 'mobx';

export default class DashboardStore {
  async getStatisticalData(filter, callbackOnSuccess, callbackOnError) {
    try {
      const results = true;

      if (results) {
        const getListInfoAPIService = new AesirxPimDashboardApiService();
        const respondedData = await getListInfoAPIService.getStatisticalData(filter);

        if (respondedData) {
          runInAction(() => {
            callbackOnSuccess(respondedData);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
