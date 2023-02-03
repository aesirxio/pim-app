/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_PRICES_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
class ProductPriceDetailViewModel {
  productPriceStore = null;
  formStatus = PAGE_STATUS.READY;
  productPriceDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(productPriceStore) {
    makeAutoObservable(this);
    this.productPriceStore = productPriceStore;
  }

  setForm = (productPriceDetailViewModel) => {
    this.productPriceDetailViewModel = productPriceDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.productPriceStore.getDetail(
      this.productPriceDetailViewModel.formPropsData[PIM_PRICES_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetProductPriceSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.productPriceStore.create(
      this.productPriceDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.productPriceStore.update(
      this.productPriceDetailViewModel.formPropsData,
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

  callbackOnGetProductPriceSuccessHandler = (result) => {
    if (result) {
      this.productPriceDetailViewModel.formPropsData = {
        ...this.productPriceDetailViewModel.formPropsData,
        ...Object.keys(PIM_PRICES_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_PRICES_DETAIL_FIELD_KEY[index]]: result[PIM_PRICES_DETAIL_FIELD_KEY[index]],
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
        Object.assign(this.productPriceDetailViewModel.formPropsData[key], value);
      } else {
        this.productPriceDetailViewModel.formPropsData[key] = value;
      }
    }
  };
}

export default ProductPriceDetailViewModel;
