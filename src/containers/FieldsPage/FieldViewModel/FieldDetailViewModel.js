/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
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

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.fieldStore.create(
      this.fieldDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.fieldStore.update(
      this.fieldDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    error._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result, message) => {
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetFieldSuccessHandler = (result) => {
    if (result) {
      this.fieldDetailViewModel.formPropsData = {
        ...this.fieldDetailViewModel.formPropsData,
        ...Object.keys(PIM_FIELD_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_FIELD_DETAIL_FIELD_KEY[index]]: result[PIM_FIELD_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }

    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value, arrayIndex) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if (arrayIndex !== undefined) {
          Object.assign(this.fieldDetailViewModel.formPropsData[key][arrayIndex], value);
        } else {
          Object.assign(this.fieldDetailViewModel.formPropsData[key], value);
        }
      } else {
        this.fieldDetailViewModel.formPropsData[key] = value;
      }
    }
  };
}

export default FieldDetailViewModel;
