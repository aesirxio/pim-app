/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
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
    await this.debtorGroupStore.getDetail(
      this.debtorGroupDetailViewModel.formPropsData[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetDebtorGroupSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.debtorGroupStore.create(
      this.debtorGroupDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.debtorGroupStore.update(
      this.debtorGroupDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    error._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result, message) => {
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetDebtorGroupSuccessHandler = (result) => {
    if (result) {
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
    }

    this.formStatus = PAGE_STATUS.READY;
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
