import { PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class SubTypeDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  subTypeDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  subTypeList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(subTypeStore) {
    makeAutoObservable(this);
    this.subTypeStore = subTypeStore;
  }

  setForm = (subTypeDetailViewModel) => {
    this.subTypeDetailViewModel = subTypeDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.subTypeStore.getDetail(
      this.subTypeDetailViewModel.formPropsData[PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetSubTypeSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getSubTypeList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.subTypeStore.getList(this.successResponse.filters);

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
    const data = await this.subTypeStore.create(this.subTypeDetailViewModel.formPropsData);

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
    const data = await this.subTypeStore.update(this.subTypeDetailViewModel.formPropsData);

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
      this.subTypeList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetSubTypeSuccessHandler = (result) => {
    if (result && result[PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.ID]) {
      this.subTypeDetailViewModel.formPropsData = {
        ...this.subTypeDetailViewModel.formPropsData,
        ...Object.keys(PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY[index]]:
                result[PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetSubTypeListSuccessHandler = (result) => {
    if (result) {
      this.subTypeList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.subTypeDetailViewModel.formPropsData[key], value);
      } else {
        this.subTypeDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default SubTypeDetailViewModel;
