/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_FIELD_GROUP_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import moment from 'moment';

class FieldGroupListViewModel {
  fieldGroupStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldGroupListViewModel = null;
  items = [];
  filter = {
    'list[limit]': 10,
  };
  pagination = {};
  successResponse = {
    state: false,
    content_id: '',
  };

  constructor(fieldGroupStore) {
    makeAutoObservable(this);
    this.fieldGroupStore = fieldGroupStore;
  }

  setForm = (fieldGroupListViewModel) => {
    this.fieldGroupListViewModel = fieldGroupListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldGroupStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };

  getListByFilter = async (key, value) => {
    value ? (this.filter[key] = value) : delete this.filter[key];

    //pagination
    if (key != 'list[limitstart]' && key != 'list[limit]') {
      delete this.filter['list[limitstart]'];
    } else {
      if (key == 'list[limit]' && value * this.pagination.page >= this.pagination.totalItems) {
        this.filter['list[limitstart]'] = Math.ceil(this.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.pagination.page < this.pagination.totalItems
      ) {
        this.filter['list[limitstart]'] = (this.pagination.page - 1) * value;
      }
    }

    await this.fieldGroupStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    this.successResponse.state = true;
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.fieldGroupStore.updateStatus(
      arr,
      status,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.fieldGroupStore.getList(
        this.filter,
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler
      );
    }
    this.successResponse.state = true;
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
    if (result?.items) {
      this.items = result.items;
      this.pagination = result.pagination;
    }
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.MODIFIED_DATE]).format('DD MMM, YYYY');
      return {
        fieldGroups: {
          name: o[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.NAME],
          id: o[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ID],
        },
        createdUserName: o[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        lastModified: {
          status: o[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.STATE],
          lastModifiedDate: date ?? '',
          modifiedUserName: o[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.MODIFIED_USER_NAME],
        },
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default FieldGroupListViewModel;
