/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_CATEGORY_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
class CategoryDetailViewModel {
  categoryStore = null;
  formStatus = PAGE_STATUS.READY;
  categoryDetailViewModel = null;
  aliasChange = '';
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(categoryStore) {
    makeAutoObservable(this);
    this.categoryStore = categoryStore;
  }

  setForm = (categoryDetailViewModel) => {
    this.categoryDetailViewModel = categoryDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoryStore.getDetail(
      this.categoryDetailViewModel.formPropsData[PIM_CATEGORY_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetCategorySuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.categoryStore.createCategory(
      this.categoryDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.categoryStore.updateCategory(
      this.categoryDetailViewModel.formPropsData,
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

  callbackOnGetCategorySuccessHandler = (result) => {
    if (result) {
      this.categoryDetailViewModel.formPropsData = {
        ...this.categoryDetailViewModel.formPropsData,
        ...Object.keys(PIM_CATEGORY_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_CATEGORY_DETAIL_FIELD_KEY[index]]: result[PIM_CATEGORY_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }

    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.categoryDetailViewModel.formPropsData[key], value);
      } else {
        this.categoryDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default CategoryDetailViewModel;
