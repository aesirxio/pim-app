import { PIM_SHIPPING_RATE_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class ShippingRateDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  shippingRateDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  shippingRateList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(shippingRateStore) {
    makeAutoObservable(this);
    this.shippingRateStore = shippingRateStore;
  }

  setForm = (shippingRateDetailViewModel) => {
    this.shippingRateDetailViewModel = shippingRateDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.shippingRateStore.getDetail(
      this.shippingRateDetailViewModel.formPropsData[PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetShippingRateSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getShippingRateList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.shippingRateStore.getList(this.successResponse.filters);

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.shippingRateStore.create(
      this.shippingRateDetailViewModel.formPropsData
    );

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, 'Created successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
    return data;
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.shippingRateStore.update(
      this.shippingRateDetailViewModel.formPropsData
    );

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, 'Updated successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
    return data;
  };

  onErrorHandler = (error) => {
    Array.isArray(error?._messages) && error?._messages[0]?.message
      ? notify(error?._messages[0]?.message, 'error')
      : error?.message && notify(error?.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error?.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  onSuccessHandler = (result, message) => {
    if (result && message) {
      notify(message, 'success');
    }
    if (result?.listItems) {
      this.shippingRateList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetShippingRateSuccessHandler = (result) => {
    if (result && result[PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.ID]) {
      this.shippingRateDetailViewModel.formPropsData = {
        ...this.shippingRateDetailViewModel.formPropsData,
        ...Object.keys(PIM_SHIPPING_RATE_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_SHIPPING_RATE_DETAIL_FIELD_KEY[index]]:
                result[PIM_SHIPPING_RATE_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetShippingRateListSuccessHandler = (result) => {
    if (result) {
      this.shippingRateList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.shippingRateDetailViewModel.formPropsData[key], value);
      } else {
        this.shippingRateDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default ShippingRateDetailViewModel;
