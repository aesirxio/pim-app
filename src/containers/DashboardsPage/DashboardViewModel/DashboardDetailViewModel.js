/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_DASH_BOARD_DETAIL_FIELD_KEY, PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import moment from 'moment';
class DashboardDetailViewModel {
  dashboardStore = null;
  formStatus = PAGE_STATUS.READY;
  dashboardDetailViewModel = null;
  filter = {};
  result = {};
  filterListFeaturedProducts = {
    'list[limit]': 5,
    'filter[featured]': 1,
  };
  listPublishStatus = [];
  successResponse = {
    state: true,
    content_id: '',
  };
  listFeaturedProducts = [];

  constructor(dashboardStore) {
    makeAutoObservable(this);
    this.dashboardStore = dashboardStore;
  }

  setForm = (dashboardDetailViewModel) => {
    this.dashboardDetailViewModel = dashboardDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.dashboardStore.getStatisticalData(
      this.filter,
      this.callbackOnGetDashboardSuccessHandler,
      this.callbackOnErrorHandler
    );

    await this.dashboardStore.getListFeaturedProducts(
      this.callbackOnSuccessGetListFeaturedProductsHandler,
      this.callbackOnErrorGetListFeaturedProductsHandler,
      this.filterListFeaturedProducts
    );

    await this.dashboardStore.getListPublishStatus(
      this.callbackOnSuccessGetListFeaturedProductsHandler,
      this.callbackOnErrorGetListFeaturedProductsHandler
    );

    this.successResponse.state = true;
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

  callbackOnGetDashboardSuccessHandler = (result) => {
    if (result) {
      this.result = {
        ...Object.keys(PIM_DASH_BOARD_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_DASH_BOARD_DETAIL_FIELD_KEY[index]]:
                result[PIM_DASH_BOARD_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }

    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessGetListFeaturedProductsHandler = (result) => {
    if (result?.listItems) {
      this.listFeaturedProducts = this.transform(result.listItems);
    }

    if (result?.listPublishStatus) {
      this.listPublishStatus = result.listPublishStatus;
    }
  };

  callbackOnErrorGetListFeaturedProductsHandler = (result) => {
    console.log('error', result);
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[PIM_PRODUCT_DETAIL_FIELD_KEY.MODIFIED_TIME]).format('DD MMM, YYYY');

      return {
        id: o[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
        productInfo: {
          image:
            o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][PIM_PRODUCT_DETAIL_FIELD_KEY.THUMB_IMAGE],
          name: o[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE],
        },
        type: Array.isArray(
          o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
            PIM_PRODUCT_DETAIL_FIELD_KEY.PIM_PRODUCT_TYPE
          ]
        )
          ? o[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
              PIM_PRODUCT_DETAIL_FIELD_KEY.PIM_PRODUCT_TYPE
            ][0]
          : '',
        categories: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME],
        author: o[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        lastModified: {
          status: o[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED],
          dateTime: date ?? '',
          author: o[PIM_PRODUCT_DETAIL_FIELD_KEY.MODIFIED_USER_NAME],
        },
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default DashboardDetailViewModel;
