/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
class DebtorGroupListViewModel {
  debtorGroupStore = null;
  formStatus = PAGE_STATUS.READY;
  debtorGroupListViewModel = null;
  items = [];
  filter = {};
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(debtorGroupStore) {
    makeAutoObservable(this);
    this.debtorGroupStore = debtorGroupStore;
  }

  setForm = (debtorGroupListViewModel) => {
    this.debtorGroupListViewModel = debtorGroupListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.debtorGroupStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
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
    this.items = result.items;
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default DebtorGroupListViewModel;
