/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
class FieldListViewModel {
  fieldStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldListViewModel = null;
  items = [];
  groupList = [];
  filter = {};
  successResponse = {
    state: true,
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
          index === self.findIndex((t) => t.label === value.label && t.id === value.id)
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
    this.items = result.items;
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default FieldListViewModel;
