/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { transform } from '../utils';

class ListProductsViewModel {
  productStore = null;

  successResponse = {
    state: false,
    data: [],
    filters: {},
  };

  constructor(productStore) {
    makeAutoObservable(this);
    this.productStore = productStore;
  }

  initializeData = async () => {
    await this.productStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );
    this.successResponse.state = true;
  };

  getListByFilter = async (key, value) => {
    value ? (this.successResponse.filters[key] = value) : delete this.successResponse.filters[key];
    await this.productStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );
    this.successResponse.state = true;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      this.successResponse.data = transform(result.listItems);
    }
  };

  callbackOnErrorHandler = (result) => {
    console.log('error', result);
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default ListProductsViewModel;
