import { PIM_COUNTRY_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class CountryDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  countryDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  countryList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(countryStore) {
    makeAutoObservable(this);
    this.countryStore = countryStore;
  }

  setForm = (countryDetailViewModel) => {
    this.countryDetailViewModel = countryDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.countryStore.getDetail(
      this.countryDetailViewModel.formPropsData[PIM_COUNTRY_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetCountrySuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getCountryList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.countryStore.getList(this.successResponse.filters);

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
    const data = await this.countryStore.create(this.countryDetailViewModel.formPropsData);

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
    const data = await this.countryStore.update(this.countryDetailViewModel.formPropsData);

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
      this.countryList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetCountrySuccessHandler = (result) => {
    if (result && result[PIM_COUNTRY_DETAIL_FIELD_KEY.ID]) {
      this.countryDetailViewModel.formPropsData = {
        ...this.countryDetailViewModel.formPropsData,
        ...Object.keys(PIM_COUNTRY_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_COUNTRY_DETAIL_FIELD_KEY[index]]: result[PIM_COUNTRY_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetCountryListSuccessHandler = (result) => {
    if (result) {
      this.countryList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.countryDetailViewModel.formPropsData[key], value);
      } else {
        this.countryDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default CountryDetailViewModel;
