/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'aesirx-uikit';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
class UtilsListViewModel {
  utilsStore = null;
  formStatus = PAGE_STATUS.READY;
  utilsListViewModel = null;
  listPublishStatus = [];
  listContentType = [];
  filter = {};
  listFieldType = [];
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
  getListContentType = async (filter) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.utilsStore.getListContentType(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      filter
    );
  };
  getListFieldType = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.utilsStore.getListFieldType(
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
    if (result?.listContentType) {
      this.listContentType = result.listContentType;
    }
    if (result?.listFieldType) {
      let usableFields = [
        'aesir_dam_asset',
        'checkbox',
        'editor',
        'radio',
        'number',
        'select',
        'text',
      ];
      this.listFieldType = result.listFieldType?.filter((item) => {
        return usableFields?.includes(item?.value);
      });
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };
}

export default UtilsListViewModel;
