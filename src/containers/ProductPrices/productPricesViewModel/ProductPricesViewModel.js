/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { PIM_PRICE_FIELD_KEY } from 'library/Constant/PimConstant';
import { makeAutoObservable } from 'mobx';
import moment from 'moment';

class ProductPricesViewModel {
  productPricesStore = null;

  successResponse = {
    state: false,
    filters: {
      'list[limit]': 5,
    },
    listPublishStatus: [],
    listProductPrices: [],
    pagination: {},
  };

  constructor(productPricesStore) {
    makeAutoObservable(this);
    this.productPricesStore = productPricesStore;
  }

  getListByFilter = async (key, value) => {
    value ? (this.successResponse.filters[key] = value) : delete this.successResponse.filters[key];

    //pagination
    if (key != 'limitstart' && key != 'list[limit]') {
      delete this.successResponse.filters['limitstart'];
    } else {
      if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page >= this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['limitstart'] =
          Math.ceil(this.successResponse.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page < this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['limitstart'] =
          (this.successResponse.pagination.page - 1) * value;
        console.log(this.successResponse.pagination.page);
      }
    }

    await this.productPricesStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );
    this.successResponse.state = true;
  };

  initializeData = async () => {
    await this.productPricesStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    await this.productPricesStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    this.successResponse.state = true;
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.productPricesStore.updateStatus(arr, status);
    if (res) {
      await this.productPricesStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
    this.successResponse.state = true;
  };

  updatePrices = async (listPrices) => {
    const res = await this.productPricesStore.updatePrices(listPrices);
    if (res) {
      await this.productPricesStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
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
      this.successResponse.listProductPrices = this.transform(result.listItems);
      this.successResponse.pagination = result.pagination;
    }
    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result.listPublishStatus;
    }
  };

  callbackOnErrorHandler = (result) => {
    console.log('error', result);
  };

  isLoading = () => {
    this.successResponse.state = false;
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[PIM_PRICE_FIELD_KEY.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        id: o[PIM_PRICE_FIELD_KEY.ID],
        author: o[PIM_PRICE_FIELD_KEY.CREATED_USER_NAME],
        lastModified: {
          status: o[PIM_PRICE_FIELD_KEY.PUBLISHED],
          dateTime: date ?? '',
          author: o[PIM_PRICE_FIELD_KEY.CREATED_USER_NAME],
        },
        price: o[PIM_PRICE_FIELD_KEY.CUSTOM_FIELDS][PIM_PRICE_FIELD_KEY.PRICE],
        retailPrice: o[PIM_PRICE_FIELD_KEY.CUSTOM_FIELDS][PIM_PRICE_FIELD_KEY.RETAIL_PRICE],
      };
    });
  };
}

export default ProductPricesViewModel;
