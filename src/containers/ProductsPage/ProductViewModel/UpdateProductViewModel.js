/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';

class UpdateProductViewModel {
  productStore = null;
  formStatus = PAGE_STATUS.READY;
  updateProductViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(productStore) {
    makeAutoObservable(this);
    this.productStore = productStore;
  }

  setAllValue = (updateProductViewModel) => {
    this.updateProductViewModel = updateProductViewModel;
  };

  setForm = (updateProductViewModel) => {
    this.updateProductViewModel = updateProductViewModel;
  };

  initializeData = () => {
    this.productStore.getDetail(
      this.updateProductViewModel.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  saveProductOnPage = () => {
    this.productStore.updateProduct(
      this.updateProductViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result.content_id;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Update successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };
}

export default UpdateProductViewModel;
