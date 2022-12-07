/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
class FieldListViewModel {
  fieldStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldListViewModel = null;
  items = [];
  filter = {};
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(fieldStore) {
    makeAutoObservable(this);
    this.fieldStore = fieldStore;
  }

  setForm = (fieldListViewModel) => {
    this.fieldListViewModel = fieldListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldStore.getList(
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

export default FieldListViewModel;
