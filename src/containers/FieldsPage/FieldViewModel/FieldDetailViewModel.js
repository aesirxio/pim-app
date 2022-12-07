/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
class FieldDetailViewModel {
  fieldStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(fieldStore) {
    makeAutoObservable(this);
    this.fieldStore = fieldStore;
  }

  setForm = (fieldDetailViewModel) => {
    this.fieldDetailViewModel = fieldDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldStore.getDetail(
      this.fieldDetailViewModel.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetFieldSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  createField = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.fieldStore.createField(
      this.fieldDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnCreateSuccessHandler
    );
  };

  updateField = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldStore.updateField(
      this.fieldDetailViewModel.formPropsData,
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
    if (result) {
      notify('Update successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetFieldSuccessHandler = (result) => {
    if (result) {
      Object.keys(PIM_FIELD_DETAIL_FIELD_KEY).forEach((index) => {
        this.fieldDetailViewModel.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY[index]] =
          result[PIM_FIELD_DETAIL_FIELD_KEY[index]];
      });
    }

    this.formStatus = PAGE_STATUS.READY;
  };
}

export default FieldDetailViewModel;
