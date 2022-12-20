/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_PRICES_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
class ProductPricesDetailViewModel {
  productPricesStore = null;
  formStatus = PAGE_STATUS.READY;
  productPricesDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(productPricesStore) {
    makeAutoObservable(this);
    this.productPricesStore = productPricesStore;
  }

  setForm = (productPricesDetailViewModel) => {
    this.productPricesDetailViewModel = productPricesDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.productPricesStore.getDetail(
      this.productPricesDetailViewModel.formPropsData[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetProductPricesSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.productPricesStore.create(
      this.productPricesDetailViewModel.formPropsData,
      this.callbackOnCreateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.productPricesStore.update(
      this.productPricesDetailViewModel.formPropsData,
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

  callbackOnGetProductPricesSuccessHandler = (result) => {
    if (result) {
      this.productPricesDetailViewModel.formPropsData = {
        ...this.productPricesDetailViewModel.formPropsData,
        ...Object.keys(PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]]:
                result[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }

    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.productPricesDetailViewModel.formPropsData[key], value);
      } else {
        this.productPricesDetailViewModel.formPropsData[key] = value;
      }
    }
  };
}

export default ProductPricesDetailViewModel;
