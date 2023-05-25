/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-lib';
import moment from 'moment';
import { notify } from 'aesirx-uikit';
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
  filterDate = {
    'filter[start_date]': '',
    'filter[end_date]': '',
  };
  constructor(productStore) {
    makeAutoObservable(this);
    this.productStore = productStore;
  }

  initializeData = async () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
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
    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  initializeDataListProduct = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.productStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );
    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  setFeatured = async (id, featured = 0) => {
    await this.productStore.update(
      { id: id.toString(), featured: featured.toString() },
      this.callbackOnSuccessSetFeatured,
      this.callbackOnErrorHandler
    );
    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  getListByFilter = async (key, value) => {
    value ? (this.successResponse.filters[key] = value) : delete this.successResponse.filters[key];

    //pagination
    if (key != 'list[limitstart]' && key != 'list[limit]') {
      delete this.successResponse.filters['list[limitstart]'];
    } else {
      if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page >= this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['list[limitstart]'] =
          Math.ceil(this.successResponse.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page < this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['list[limitstart]'] =
          (this.successResponse.pagination.page - 1) * value;
      }
    }

    await this.productStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.productStore.updateStatus(
      arr,
      status,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.productStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  deleteProducts = async (arr) => {
    const res = await this.productStore.deleteProducts(
      arr,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.productStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  getStatisticalDataByDate = async (startDate, endDate) => {
    this.isLoading();
    await this.productStore.getList(this.callbackOnSuccessHandler, this.callbackOnErrorHandler, {
      ...this.successResponse.filters,
      'filter[modified_date][start]': startDate,
      'filter[modified_date][end]': endDate,
    });
    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  callbackOnSuccessSetFeatured = async (result, message) => {
    this.successResponse.listProducts = this.successResponse.listProducts.map((o) => {
      if (o.id == result) {
        return { ...o, featured: !o.featured };
      }
      return o;
    });
    if (result && message) {
      notify(message, 'success');
    }
  };

  callbackOnSuccessHandler = (result, message) => {
    if (result?.listItems) {
      this.successResponse.listProducts = this.transform(result.listItems);
      this.successResponse.pagination = result.pagination;
      // Need improve response
      this.items = result.listItems;
    }
    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result.listPublishStatus;
    }
    if (result && message) {
      notify(message, 'success');
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

  callbackOnErrorHandler = (error) => {
    error._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[PIM_PRODUCT_DETAIL_FIELD_KEY.MODIFIED_TIME]).format('DD MMM, YYYY');

      // let src = o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
      //   PIM_PRODUCT_DETAIL_FIELD_KEY.THUMB_IMAGE
      // ][PIM_PRODUCT_DETAIL_FIELD_KEY.DOWNLOAD_URL]
      //   ? o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][PIM_PRODUCT_DETAIL_FIELD_KEY.THUMB_IMAGE][
      //       PIM_PRODUCT_DETAIL_FIELD_KEY.DOWNLOAD_URL
      //     ]
      //   : 'test';

      return {
        id: o[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
        productInfo: {
          image:
            o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][PIM_PRODUCT_DETAIL_FIELD_KEY.THUMB_IMAGE],
          name: o[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE],
        },
        categories: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME],
        author: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        featured: o[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED],
        type: Array.isArray(
          o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
            PIM_PRODUCT_DETAIL_FIELD_KEY.PIM_PRODUCT_TYPE
          ]
        )
          ? o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
              PIM_PRODUCT_DETAIL_FIELD_KEY.PIM_PRODUCT_TYPE
            ][0]
          : '',
        lastModified: {
          status: o[PIM_PRODUCT_DETAIL_FIELD_KEY.STATE],
          dateTime: date ?? '',
          author: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        },
      };
    });
  };

  isLoading = () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
  };
}

export default ProductListViewModel;
