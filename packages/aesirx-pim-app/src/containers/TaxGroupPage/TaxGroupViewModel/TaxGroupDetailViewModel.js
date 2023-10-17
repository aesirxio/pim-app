import { PIM_TAX_GROUP_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class TaxGroupDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  taxGroupDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  taxGroupList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(taxGroupStore) {
    makeAutoObservable(this);
    this.taxGroupStore = taxGroupStore;
  }

  setForm = (taxGroupDetailViewModel) => {
    this.taxGroupDetailViewModel = taxGroupDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.taxGroupStore.getDetail(
      this.taxGroupDetailViewModel.formPropsData[PIM_TAX_GROUP_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetTaxGroupSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getTaxGroupList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.taxGroupStore.getList(this.successResponse.filters);

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
    const data = await this.taxGroupStore.create(this.taxGroupDetailViewModel.formPropsData);

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
    const data = await this.taxGroupStore.update(this.taxGroupDetailViewModel.formPropsData);

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
      this.taxGroupList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetTaxGroupSuccessHandler = (result) => {
    if (result && result[PIM_TAX_GROUP_DETAIL_FIELD_KEY.ID]) {
      this.taxGroupDetailViewModel.formPropsData = {
        ...this.taxGroupDetailViewModel.formPropsData,
        ...Object.keys(PIM_TAX_GROUP_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_TAX_GROUP_DETAIL_FIELD_KEY[index]]:
                result[PIM_TAX_GROUP_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetTaxGroupListSuccessHandler = (result) => {
    if (result) {
      this.taxGroupList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.taxGroupDetailViewModel.formPropsData[key], value);
      } else {
        this.taxGroupDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default TaxGroupDetailViewModel;
