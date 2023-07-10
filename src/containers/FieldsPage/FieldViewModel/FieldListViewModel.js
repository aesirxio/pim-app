/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from 'aesirx-uikit';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'aesirx-lib';
// import moment from 'moment';
class FieldListViewModel {
  fieldStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldListViewModel = null;
  items = [];
  itemsRelated = [];
  pagination = {};
  groupList = [];
  filter = {};
  filterList = {
    limit: 10,
  };
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
    runInAction(() => {
      this.successResponse.state = false;
    });

    const data = await this.fieldStore.getList(this.filter, this.filterList);
    const listPublish = await this.fieldStore.getListPublishStatus(
      this.onSuccessHandler,
      this.onErrorHandler
    );

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      if (!listPublish?.error) {
        this.onSuccessHandler(listPublish?.response, '');
      } else {
        this.onErrorHandler(listPublish?.response);
      }
      this.successResponse.state = true;
    });
  };

  initializeDataCustom = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.fieldStore.getList(this.filter, this.filterList);

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.formStatus = PAGE_STATUS.READY;
    });
  };

  initializeDataRelated = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });

    const dataItem = await this.fieldStore.getList(
      { 'filter[fieldtypes]': 'item_related' },
      {
        limit: 9999,
      }
    );
    const dataCategory = await this.fieldStore.getList(
      { 'filter[fieldtypes]': 'category_related' },
      {
        limit: 9999,
      }
    );

    runInAction(() => {
      if (!dataItem?.error && !dataCategory?.error) {
        this.onSuccessRelatedHandler(dataItem?.response, dataCategory?.response);
      } else {
        this.onErrorHandler(dataItem?.response);
      }
      this.formStatus = PAGE_STATUS.READY;
    });
  };

  getListByFilter = async (key, value) => {
    value ? (this.filter[key] = value) : delete this.filter[key];

    //pagination
    if (key != 'list[limitstart]' && key != 'list[limit]') {
      delete this.filter['list[limitstart]'];
    } else {
      if (key == 'list[limit]' && value * this.pagination.page >= this.pagination.totalItems) {
        this.filterList = {};
        this.filter['list[limitstart]'] = Math.ceil(this.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.pagination.page < this.pagination.totalItems
      ) {
        this.filterList = {};
        this.filter['list[limitstart]'] = (this.pagination.page - 1) * value;
      }
    }

    const data = await this.fieldStore.getList(this.filter, this.filterList);

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.successResponse.state = true;
    });
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };
  handleFilterList = (filterList) => {
    this.filterList = { ...this.filterList, ...filterList };
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

  updateStatus = async (arr, status = 0) => {
    const res = await this.fieldStore.updateStatus(arr, status);

    if (res) {
      const data = await this.fieldStore.getList(this.filter, this.filterList);
      runInAction(() => {
        if (!data?.error) {
          this.onSuccessHandler(data?.response, 'Updated successfully');
        } else {
          this.onErrorHandler(data?.response);
        }
      });
    }
    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  deleteFields = async (arr) => {
    const res = await this.fieldStore.deleteFields(arr);

    if (res) {
      const data = await this.fieldStore.getList(this.filter, this.filterList);
      runInAction(() => {
        if (!data?.error) {
          this.onSuccessHandler(data?.response, 'Deleted successfully');
        } else {
          this.onErrorHandler(data?.response);
        }
      });
    }
    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  onErrorHandler = (error) => {
    Array.isArray(error?._messages) && error?._messages[0]?.message
      ? notify(error?._messages[0]?.message, 'error')
      : error?.message && notify(error?.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
  };

  onSuccessHandler = (result, message) => {
    if (result?.items) {
      this.items = result.items;
      this.pagination = result.pagination;
    }

    if (result?.listPublishStatus) {
      this.listPublishStatus = result.listPublishStatus;
    }
    if (result && message) {
      notify(message, 'success');
    }
  };

  onSuccessRelatedHandler = (dataItem, dataCategory) => {
    if (dataItem?.items && dataCategory?.items) {
      this.itemsRelated = [
        { key: 'item_related', options: dataItem.items },
        { key: 'category_related', options: dataCategory.items },
      ];
    }
  };

  transform = (data) => {
    return data.map((o) => {
      // const date = moment(o[PIM_FIELD_DETAIL_FIELD_KEY.PUBLISHED]).format('DD MMM, YYYY');
      return {
        field: {
          id: o[PIM_FIELD_DETAIL_FIELD_KEY.ID],
          name: o[PIM_FIELD_DETAIL_FIELD_KEY.NAME],
        },
        groupName: o[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_NAME],
        type: o[PIM_FIELD_DETAIL_FIELD_KEY.TYPE],
        // lastModified: {
        //   status: o[PIM_FIELD_DETAIL_FIELD_KEY.PUBLISHED],
        //   dateTime: date ?? '',
        //   author: o[PIM_FIELD_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        // },
      };
    });
  };

  isLoading = () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
  };

  resetRelatedItemsList = () => {
    runInAction(() => {
      this.itemsRelated = [];
    });
  };
}

export default FieldListViewModel;
