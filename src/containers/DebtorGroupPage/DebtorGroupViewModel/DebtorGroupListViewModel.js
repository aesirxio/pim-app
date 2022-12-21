/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import moment from 'moment';
class DebtorGroupListViewModel {
  debtorGroupStore = null;
  formStatus = PAGE_STATUS.READY;
  debtorGroupListViewModel = null;
  items = [];
  filter = {};
  listPublishStatus = [];
  successResponse = {
    state: false,
    content_id: '',
  };

  constructor(debtorGroupStore) {
    makeAutoObservable(this);
    this.debtorGroupStore = debtorGroupStore;
  }

  setForm = (debtorGroupListViewModel) => {
    this.debtorGroupListViewModel = debtorGroupListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.debtorGroupStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    await this.debtorGroupStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    this.successResponse.state = true;
  };

  getListByFilter = async (key, value) => {
    value ? (this.filter[key] = value) : delete this.filter[key];

    await this.debtorGroupStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    this.successResponse.state = true;
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnCreateSuccessHandler = (result) => {
    if (result) {
      notify('Create successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result?.items) {
      this.items = result.items;
    }
    if (result?.listPublishStatus) {
      this.listPublishStatus = result.listPublishStatus;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.PUBLISHED]).format('DD MMM, YYYY');
      return {
        id: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID],
        title: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE],
        lastModified: {
          status: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.PUBLISHED],
          dateTime: date ?? '',
          author: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        },
        code: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
          PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.CODE
        ],
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default DebtorGroupListViewModel;
