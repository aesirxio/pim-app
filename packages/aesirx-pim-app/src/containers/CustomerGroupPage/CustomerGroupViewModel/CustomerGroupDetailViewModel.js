import { PIM_CUSTOMER_GROUP_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class CustomerGroupDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  customerGroupDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  customerGroupList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(customerGroupStore) {
    makeAutoObservable(this);
    this.customerGroupStore = customerGroupStore;
  }

  setForm = (customerGroupDetailViewModel) => {
    this.customerGroupDetailViewModel = customerGroupDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.customerGroupStore.getDetail(
      this.customerGroupDetailViewModel.formPropsData[PIM_CUSTOMER_GROUP_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetCustomerGroupSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getCustomerGroupList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.customerGroupStore.getList(this.successResponse.filters);

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
    const data = await this.customerGroupStore.create(
      this.customerGroupDetailViewModel.formPropsData
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
    const data = await this.customerGroupStore.update(
      this.customerGroupDetailViewModel.formPropsData
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
      this.customerGroupList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetCustomerGroupSuccessHandler = (result) => {
    if (result && result[PIM_CUSTOMER_GROUP_DETAIL_FIELD_KEY.ID]) {
      this.customerGroupDetailViewModel.formPropsData = {
        ...this.customerGroupDetailViewModel.formPropsData,
        ...Object.keys(PIM_CUSTOMER_GROUP_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_CUSTOMER_GROUP_DETAIL_FIELD_KEY[index]]:
                result[PIM_CUSTOMER_GROUP_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetCustomerGroupListSuccessHandler = (result) => {
    if (result) {
      this.customerGroupList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.customerGroupDetailViewModel.formPropsData[key], value);
      } else {
        this.customerGroupDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default CustomerGroupDetailViewModel;
