import { PIM_FILTERING_VALUE_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class FilteringValueDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  filteringValueDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  filteringValueList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(filteringValueStore) {
    makeAutoObservable(this);
    this.filteringValueStore = filteringValueStore;
  }

  setForm = (filteringValueDetailViewModel) => {
    this.filteringValueDetailViewModel = filteringValueDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.filteringValueStore.getDetail(
      this.filteringValueDetailViewModel.formPropsData[PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetFilteringValueSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getFilteringValueList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.filteringValueStore.getList(this.successResponse.filters);

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
    const data = await this.filteringValueStore.create(
      this.filteringValueDetailViewModel.formPropsData
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
    const data = await this.filteringValueStore.update(
      this.filteringValueDetailViewModel.formPropsData
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
      this.filteringValueList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetFilteringValueSuccessHandler = (result) => {
    if (result && result[PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.ID]) {
      this.filteringValueDetailViewModel.formPropsData = {
        ...this.filteringValueDetailViewModel.formPropsData,
        ...Object.keys(PIM_FILTERING_VALUE_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_FILTERING_VALUE_DETAIL_FIELD_KEY[index]]:
                result[PIM_FILTERING_VALUE_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetFilteringValueListSuccessHandler = (result) => {
    if (result) {
      this.filteringValueList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.filteringValueDetailViewModel.formPropsData[key], value);
      } else {
        this.filteringValueDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default FilteringValueDetailViewModel;
