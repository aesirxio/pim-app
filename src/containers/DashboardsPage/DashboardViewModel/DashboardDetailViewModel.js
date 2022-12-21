/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_FIELD_GROUP_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
class DashboardDetailViewModel {
  dashboardStore = null;
  formStatus = PAGE_STATUS.READY;
  dashboardDetailViewModel = null;
  filter = {};
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(dashboardStore) {
    makeAutoObservable(this);
    this.dashboardStore = dashboardStore;
  }

  setForm = (dashboardDetailViewModel) => {
    this.dashboardDetailViewModel = dashboardDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.dashboardStore.getStatisticalData(
      this.filter,
      this.callbackOnGetDashboardSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnCreateSuccessHandler = (result) => {
    if (result) {
      notify('Create successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Update successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetDashboardSuccessHandler = (result) => {
    if (result) {
      this.dashboardDetailViewModel.formPropsData = {
        ...this.dashboardDetailViewModel.formPropsData,
        ...Object.keys(PIM_FIELD_GROUP_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_FIELD_GROUP_DETAIL_FIELD_KEY[index]]:
                result[PIM_FIELD_GROUP_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }

    this.formStatus = PAGE_STATUS.READY;
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };
}

export default DashboardDetailViewModel;
