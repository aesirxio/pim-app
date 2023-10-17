/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from 'aesirx-uikit';
import { PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY } from 'aesirx-lib';
class DebtorGroupDetailViewModel {
  debtorGroupStore = null;
  formStatus = PAGE_STATUS.READY;
  debtorGroupDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(debtorGroupStore) {
    makeAutoObservable(this);
    this.debtorGroupStore = debtorGroupStore;
  }

  setForm = (debtorGroupDetailViewModel) => {
    this.debtorGroupDetailViewModel = debtorGroupDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.debtorGroupStore.getDetail(
      this.debtorGroupDetailViewModel.formPropsData[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID]
    );
    runInAction(() => {
      if (!data?.error) {
        this.onGetDebtorGroupSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.debtorGroupStore.create(this.debtorGroupDetailViewModel.formPropsData);

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
    const data = await this.debtorGroupStore.update(this.debtorGroupDetailViewModel.formPropsData);

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
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetDebtorGroupSuccessHandler = (result) => {
    if (result && result[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID]) {
      this.debtorGroupDetailViewModel.formPropsData = {
        ...this.debtorGroupDetailViewModel.formPropsData,
        ...Object.keys(PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]]:
                result[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.debtorGroupDetailViewModel.formPropsData[key], value);
      } else {
        this.debtorGroupDetailViewModel.formPropsData[key] = value;
      }
    }
  };
}

export default DebtorGroupDetailViewModel;
