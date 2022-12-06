/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
class CategoryDetailViewModel {
  categoryStore = null;
  formStatus = PAGE_STATUS.READY;
  categoryDetailViewModel = null;
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
      this.categoryDetailViewModel.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetCategorySuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  createCategory = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.categoryStore.createCategory(
      this.categoryDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnCreateSuccessHandler
    );
  };

  updateCategory = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoryStore.updateCategory(
      this.categoryDetailViewModel.formPropsData,
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

  callbackOnGetCategorySuccessHandler = (result) => {
    if (result) {
      Object.keys(PIM_PRODUCT_DETAIL_FIELD_KEY).forEach((index) => {
        this.categoryDetailViewModel.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY[index]] =
          result[PIM_PRODUCT_DETAIL_FIELD_KEY[index]];
      });
    }

    this.formStatus = PAGE_STATUS.READY;
  };
}

export default CategoryDetailViewModel;
