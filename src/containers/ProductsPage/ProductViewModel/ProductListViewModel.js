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

class ProductListViewModel {
  productStore = null;
  formPropsData = {};

  successResponse = {
    state: false,
    filters: {
      'list[limit]': 2,
    },
    listPublishStatus: [],
    listProducts: [],
    pagination: {},
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

    await this.productStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    this.successResponse.state = true;
  };

  setFeatured = async (id, featured = 0) => {
    await this.productStore.updateProduct2(
      { id: id.toString(), featured: featured.toString() },
      this.callbackOnSuccessSetFeatured,
      this.callbackOnErrorHandler
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

  callbackOnSuccessSetFeatured = async (result) => {
    this.successResponse.listProducts = this.successResponse.listProducts.map((o) => {
      if (o.id == result) {
        return { ...o, featured: !o.featured };
      }
      return o;
    });
  };

  callbackOnSuccessHandler = (result) => {
    if (result?.listItems) {
      this.successResponse.listProducts = transform(result.listItems);
      this.successResponse.pagination = result.pagination;
    }
    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result.listPublishStatus;
    }
    console.log('pagination', this.successResponse.pagination);
  };

  callbackOnErrorHandler = (result) => {
    console.log('error', result);
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default ProductListViewModel;
