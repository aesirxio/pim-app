import { PIM_STATE_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class StateDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  stateDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  stateList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(stateStore) {
    makeAutoObservable(this);
    this.stateStore = stateStore;
  }

  setForm = (stateDetailViewModel) => {
    this.stateDetailViewModel = stateDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.stateStore.getDetail(
      this.stateDetailViewModel.formPropsData[PIM_STATE_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetStateSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getStateList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.stateStore.getList(this.successResponse.filters);

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
    const data = await this.stateStore.create(this.stateDetailViewModel.formPropsData);

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
    const data = await this.stateStore.update(this.stateDetailViewModel.formPropsData);

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
      this.stateList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetStateSuccessHandler = (result) => {
    if (result && result[PIM_STATE_DETAIL_FIELD_KEY.ID]) {
      this.stateDetailViewModel.formPropsData = {
        ...this.stateDetailViewModel.formPropsData,
        ...Object.keys(PIM_STATE_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_STATE_DETAIL_FIELD_KEY[index]]: result[PIM_STATE_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetStateListSuccessHandler = (result) => {
    if (result) {
      this.stateList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.stateDetailViewModel.formPropsData[key], value);
      } else {
        this.stateDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default StateDetailViewModel;
