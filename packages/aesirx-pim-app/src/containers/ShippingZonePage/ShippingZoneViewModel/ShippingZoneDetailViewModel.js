import { PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class ShippingZoneDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  shippingZoneDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  shippingZoneList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(shippingZoneStore) {
    makeAutoObservable(this);
    this.shippingZoneStore = shippingZoneStore;
  }

  setForm = (shippingZoneDetailViewModel) => {
    this.shippingZoneDetailViewModel = shippingZoneDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.shippingZoneStore.getDetail(
      this.shippingZoneDetailViewModel.formPropsData[PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetShippingZoneSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getShippingZoneList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.shippingZoneStore.getList(this.successResponse.filters);

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
    const data = await this.shippingZoneStore.create(
      this.shippingZoneDetailViewModel.formPropsData
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
    const data = await this.shippingZoneStore.update(
      this.shippingZoneDetailViewModel.formPropsData
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
      this.shippingZoneList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetShippingZoneSuccessHandler = (result) => {
    if (result && result[PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.ID]) {
      this.shippingZoneDetailViewModel.formPropsData = {
        ...this.shippingZoneDetailViewModel.formPropsData,
        ...Object.keys(PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY[index]]:
                result[PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetShippingZoneListSuccessHandler = (result) => {
    if (result) {
      this.shippingZoneList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.shippingZoneDetailViewModel.formPropsData[key], value);
      } else {
        this.shippingZoneDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default ShippingZoneDetailViewModel;
