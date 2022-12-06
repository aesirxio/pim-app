/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
class TagListViewModel {
  tagStore = null;
  formStatus = PAGE_STATUS.READY;
  tagListViewModel = null;
  items = [];
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(tagStore) {
    makeAutoObservable(this);
    this.tagStore = tagStore;
  }

  setForm = (tagListViewModel) => {
    this.tagListViewModel = tagListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.tagStore.getList(this.callbackOnSuccessHandler, this.callbackOnErrorHandler);
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

export default TagListViewModel;
