/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
class UtilsListViewModel {
  utilsStore = null;
  formStatus = PAGE_STATUS.READY;
  utilsListViewModel = null;
  listPublishStatus = [];
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(utilsStore) {
    makeAutoObservable(this);
    this.utilsStore = utilsStore;
  }

  setForm = (utilsListViewModel) => {
    this.utilsListViewModel = utilsListViewModel;
  };

  getListPublishStatus = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.utilsStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
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
    if (result?.listPublishStatus) {
      this.listPublishStatus = result.listPublishStatus;
    }
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default UtilsListViewModel;
