/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
class FieldGroupDetailViewModel {
  fieldGroupStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldGroupDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(fieldGroupStore) {
    makeAutoObservable(this);
    this.fieldGroupStore = fieldGroupStore;
  }

  setForm = (fieldGroupDetailViewModel) => {
    this.fieldGroupDetailViewModel = fieldGroupDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldGroupStore.getDetail(
      this.fieldGroupDetailViewModel.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetFieldGroupSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.fieldGroupStore.create(
      this.fieldGroupDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnCreateSuccessHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldGroupStore.update(
      this.fieldGroupDetailViewModel.formPropsData,
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

  callbackOnGetFieldGroupSuccessHandler = (result) => {
    if (result) {
      this.fieldGroupDetailViewModel = {
        ...this.fieldGroupDetailViewModel,
        formPropsData: {
          ...this.fieldGroupDetailViewModel.formPropsData,
          ...Object.keys(PIM_FIELD_DETAIL_FIELD_KEY)
            .map((index) => {
              return {
                [PIM_FIELD_DETAIL_FIELD_KEY[index]]: result[PIM_FIELD_DETAIL_FIELD_KEY[index]],
              };
            })
            .reduce((prev, cur) => ({ ...prev, ...cur })),
        },
      };
    }

    this.formStatus = PAGE_STATUS.READY;
  };

  initFormPropsData = () => {
    this.fieldGroupDetailViewModel = {
      ...this.fieldGroupDetailViewModel,
      formPropsData: {
        ...this.fieldGroupDetailViewModel.formPropsData,
      },
    };
  };

  handleFormPropsData = (key, value) => {
    if (key && value) {
      this.fieldGroupDetailViewModel.formPropsData[key] = value;
    }
  };
}

export default FieldGroupDetailViewModel;
