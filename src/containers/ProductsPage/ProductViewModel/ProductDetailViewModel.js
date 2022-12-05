/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';

class ProductDetailViewModel {
  productStore = null;
  formStatus = PAGE_STATUS.READY;
  productDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(productStore) {
    makeAutoObservable(this);
    this.productStore = productStore;
  }

  setForm = (productDetailViewModel) => {
    this.productDetailViewModel = productDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.productStore.getDetail(
      this.productDetailViewModel.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetProductSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  createProduct = () => {
    this.productStore.createProduct(
      this.productDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnCreateSuccessHandler
    );
  };

  updateProduct = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.productStore.updateProduct(
      this.productDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
  };

  callbackOnCreateSuccessHandler = (result) => {
    if (result) {
      notify('Create successfully', 'success');
    }
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Update successfully', 'success');
    }
  };

  callbackOnGetProductSuccessHandler = (result) => {
    if (result) {
      Object.keys(PIM_PRODUCT_DETAIL_FIELD_KEY).forEach((index) => {
        this.productDetailViewModel.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY[index]] =
          result[PIM_PRODUCT_DETAIL_FIELD_KEY[index]];
      });
    }
  };
}

export default ProductDetailViewModel;
