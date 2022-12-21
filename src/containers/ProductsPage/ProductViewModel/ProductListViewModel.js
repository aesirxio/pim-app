/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import moment from 'moment';
class ProductListViewModel {
  productStore = null;
  formStatus = PAGE_STATUS.READY;
  items = [];
  successResponse = {
    state: false,
    filters: {
      'list[limit]': 10,
    },
    listPublishStatus: [],
    listProducts: [],
    listCategories: [],
    pagination: {},
  };

  constructor(productStore) {
    makeAutoObservable(this);
    this.productStore = productStore;
  }

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.productStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    await this.productStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    await this.productStore.getListCategories(
      this.callbackOnSuccessGetCategoriesHandler,
      this.callbackOnErrorHandler
    );

    this.successResponse.state = true;
  };

  setFeatured = async (id, featured = 0) => {
    await this.productStore.updateProduct(
      { id: id.toString(), featured: featured.toString() },
      this.callbackOnSuccessSetFeatured,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

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

    await this.productStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );
    this.successResponse.state = true;
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.productStore.updateStatus(arr, status);
    if (res) {
      await this.productStore.getList(
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
      this.successResponse.listProducts = this.transform(result.listItems);
      this.successResponse.pagination = result.pagination;
      // Need improve response
      this.items = result.listItems;
    }
    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result.listPublishStatus;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessGetCategoriesHandler = (result) => {
    this.successResponse.listCategories = result.listItems.map((o) => {
      let dash = '';
      for (let index = 1; index < o.level; index++) {
        dash += '- ';
      }
      return { value: o.id, label: `${dash}${o.title}` };
    });
  };

  callbackOnErrorHandler = (result) => {
    console.log('error', result);
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED_UP]).format('DD MMM, YYYY');
      return {
        id: o[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
        productInfo: {
          name: o[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE],
          image: '',
        },
        categories: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME],
        author: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        featured: o[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED],
        type: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
          PIM_PRODUCT_DETAIL_FIELD_KEY.PIM_PRODUCT_TYPE
        ],
        lastModified: {
          status: o[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED],
          dateTime: date ?? '',
          author: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        },
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default ProductListViewModel;
