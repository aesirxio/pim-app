/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import moment from 'moment';
class FieldListViewModel {
  fieldStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldListViewModel = null;
  items = [];
  groupList = [];
  filter = {};
  listPublishStatus = [];
  successResponse = {
    state: false,
    content_id: '',
  };

  constructor(fieldStore) {
    makeAutoObservable(this);
    this.fieldStore = fieldStore;
  }

  setForm = (fieldListViewModel) => {
    this.fieldListViewModel = fieldListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    await this.fieldStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    this.successResponse.state = true;
  };

  getListByFilter = async (key, value) => {
    value ? (this.successResponse.filters[key] = value) : delete this.successResponse.filters[key];

    //pagination
    if (key != 'limitstart' && key != 'list[limit]') {
      delete this.successResponse.filters['limitstart'];
    } else {
      if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page >= this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['limitstart'] =
          Math.ceil(this.successResponse.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page < this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['limitstart'] =
          (this.successResponse.pagination.page - 1) * value;
      }
    }

    await this.categoryStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    this.successResponse.state = true;
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };

  getGroupList = () => {
    let groupList = this.items
      .map((field) => {
        return {
          label: field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_NAME],
          id: field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID],
        };
      })
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.label === value.label && t.id === value.id && value.id !== 0)
      );
    runInAction(() => {
      this.groupList = groupList;
    });
  };

  filterByGroup = (groupID) => {
    let itemsByGroup = this.items.filter(
      (value) => value[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID] === groupID
    );
    return itemsByGroup;
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfullyg', 'error');
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
    this.formStatus = PAGE_STATUS.READY;
    if (result?.listItems) {
      this.items = result.listItems;
    }

    if (result?.listPublishStatus) {
      this.listPublishStatus = result.listPublishStatus;
    }
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[PIM_FIELD_DETAIL_FIELD_KEY.PUBLISHED]).format('DD MMM, YYYY');
      return {
        id: o[PIM_FIELD_DETAIL_FIELD_KEY.ID],
        name: o[PIM_FIELD_DETAIL_FIELD_KEY.NAME],
        groupName: o[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_NAME],
        type: o[PIM_FIELD_DETAIL_FIELD_KEY.TYPE],
        lastModified: {
          status: o[PIM_FIELD_DETAIL_FIELD_KEY.PUBLISHED],
          dateTime: date ?? '',
          author: o[PIM_FIELD_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        },
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default FieldListViewModel;
