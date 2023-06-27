import { PIM_FILTERING_FIELD_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class FilteringFieldDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  filteringFieldDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  filteringFieldList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(filteringFieldStore) {
    makeAutoObservable(this);
    this.filteringFieldStore = filteringFieldStore;
  }

  setForm = (filteringFieldDetailViewModel) => {
    this.filteringFieldDetailViewModel = filteringFieldDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.filteringFieldStore.getDetail(
      this.filteringFieldDetailViewModel.formPropsData[PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetFilteringFieldSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getFilteringFieldList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.filteringFieldStore.getList(this.successResponse.filters);

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
    const data = await this.filteringFieldStore.create(
      this.filteringFieldDetailViewModel.formPropsData
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
    const data = await this.filteringFieldStore.update(
      this.filteringFieldDetailViewModel.formPropsData
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
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  onSuccessHandler = (result, message) => {
    if (result && message) {
      notify(message, 'success');
    }
    if (result?.listItems) {
      this.filteringFieldList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetFilteringFieldSuccessHandler = (result) => {
    if (result && result[PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.ID]) {
      this.filteringFieldDetailViewModel.formPropsData = {
        ...this.filteringFieldDetailViewModel.formPropsData,
        ...Object.keys(PIM_FILTERING_FIELD_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_FILTERING_FIELD_DETAIL_FIELD_KEY[index]]:
                result[PIM_FILTERING_FIELD_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetFilteringFieldListSuccessHandler = (result) => {
    if (result) {
      this.filteringFieldList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.filteringFieldDetailViewModel.formPropsData[key], value);
      } else {
        this.filteringFieldDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default FilteringFieldDetailViewModel;
