/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from 'aesirx-uikit';
import { PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY } from 'aesirx-lib';
import moment from 'moment';
class DebtorGroupListViewModel {
  debtorGroupStore = null;
  formStatus = PAGE_STATUS.READY;
  debtorGroupListViewModel = null;
  items = [];
  filter = {
    'list[limit]': 10,
  };
  pagination = {};
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
    const dataList = await this.debtorGroupStore.getList(this.successResponse.filters);
    runInAction(() => {
      if (!dataList?.error) {
        this.onSuccessHandler(dataList?.response, '');
      } else {
        this.onErrorHandler(dataList?.response);
      }
    });

    const dataPublish = await this.debtorGroupStore.getListPublishStatus();
    runInAction(() => {
      if (!dataPublish?.error) {
        this.onSuccessHandler(dataPublish?.response, '');
      } else {
        this.onErrorHandler(dataPublish?.response);
      }
      this.successResponse.state = true;
    });
  };

  initializeDataDebtorList = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.debtorGroupStore.getList(this.filter);
    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.successResponse.state = true;
    });
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
    const data = await this.debtorGroupStore.getList(this.filter);
    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.successResponse.state = true;
    });
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.debtorGroupStore.updateStatus(arr, status);
    runInAction(() => {
      if (!res?.error) {
        this.onSuccessHandler(res?.response, 'Updated successfully');
      } else {
        this.onErrorHandler(res?.response);
      }
    });
    if (res) {
      const data = await this.debtorGroupStore.getList(this.filter);
      runInAction(() => {
        if (!data?.error) {
          this.onSuccessHandler(data?.response, '');
        } else {
          this.onErrorHandler(data?.response);
        }
        this.successResponse.state = true;
      });
    }
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };

  deleteDebtorGroups = async (arr) => {
    const res = await this.debtorGroupStore.deleteDebtorGroups(arr);
    runInAction(() => {
      if (!res?.error) {
        this.onSuccessHandler(res?.response, 'Deleted successfully');
      } else {
        this.onErrorHandler(res?.response);
      }
    });
    if (res) {
      const data = await this.debtorGroupStore.getList(this.filter);
      runInAction(() => {
        if (!data?.error) {
          this.onSuccessHandler(data?.response, '');
        } else {
          this.onErrorHandler(data?.response);
        }
        this.successResponse.state = true;
      });
    }
  };

  onErrorHandler = (error) => {
    Array.isArray(error?._messages) && error?._messages[0]?.message
      ? notify(error?._messages[0]?.message, 'error')
      : error?.message && notify(error?.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
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
    this.formStatus = PAGE_STATUS.READY;
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.MODIFIED_TIME]).format(
        'DD MMM, YYYY'
      );
      return {
        id: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID],
        title: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE],
        lastModified: {
          status: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.PUBLISHED],
          lastModifiedDate: date ?? '',
          modifiedUserName: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.MODIFIED_USER_NAME],
        },
        code: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
          PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.CODE
        ],
        organisationName: o[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ORGANISATION_NAME],
      };
    });
  };

  isLoading = () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
  };
}

export default DebtorGroupListViewModel;
