import { PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class FilteringFieldsetDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  filteringFieldsetDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  filteringFieldsetList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(filteringFieldsetStore) {
    makeAutoObservable(this);
    this.filteringFieldsetStore = filteringFieldsetStore;
  }

  setForm = (filteringFieldsetDetailViewModel) => {
    this.filteringFieldsetDetailViewModel = filteringFieldsetDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.filteringFieldsetStore.getDetail(
      this.filteringFieldsetDetailViewModel.formPropsData[
        PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY.ID
      ]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetFilteringFieldsetSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getFilteringFieldsetList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.filteringFieldsetStore.getList(this.successResponse.filters);

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
    const data = await this.filteringFieldsetStore.create(
      this.filteringFieldsetDetailViewModel.formPropsData
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
    const data = await this.filteringFieldsetStore.update(
      this.filteringFieldsetDetailViewModel.formPropsData
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
      this.filteringFieldsetList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetFilteringFieldsetSuccessHandler = (result) => {
    if (result && result[PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY.ID]) {
      this.filteringFieldsetDetailViewModel.formPropsData = {
        ...this.filteringFieldsetDetailViewModel.formPropsData,
        ...Object.keys(PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY[index]]:
                result[PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetFilteringFieldsetListSuccessHandler = (result) => {
    if (result) {
      this.filteringFieldsetList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.filteringFieldsetDetailViewModel.formPropsData[key], value);
      } else {
        this.filteringFieldsetDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default FilteringFieldsetDetailViewModel;
