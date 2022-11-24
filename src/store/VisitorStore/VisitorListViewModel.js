/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import moment from 'moment';

class VisitorListViewModel {
  visitorStore = null;
  paginationCollections = null;
  status = PAGE_STATUS.READY;
  data = [];
  tableRowHeader = null;
  dateFilter = {
    date_start: moment().startOf('month').format('YYYY-MM-DD'),
    date_end: moment().endOf('day').format('YYYY-MM-DD'),
  };
  dataFilter = {};
  pageSize = 5;
  isList = false;
  visitorIdsSelected = null;
  isSearch = false;
  constructor(visitorStore) {
    makeAutoObservable(this);
    this.visitorStore = visitorStore;
  }

  getVisitor = (dataFilter, dateFilter) => {
    this.status = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, ...dataFilter };
    this.dateFilter = { ...this.dateFilter, ...dateFilter };
    this.visitorStore.getVisitor(
      this.dataFilter,
      this.dateFilter,
      this.callbackOnDataSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  handleFilter = (dataFilter) => {
    this.status = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, ...dataFilter };

    this.visitorStore.getVisitor(
      this.dataFilter,
      this.dateFilter,
      this.callbackOnDataSuccessHandler,
      this.callbackOnErrorHander
    );
  };
  handleFilterDateRange = (startDate, endDate) => {
    this.status = PAGE_STATUS.LOADING;
    let dateRangeFilter = {
      'filter[start_date]': moment(startDate).format('YYYY-MM-DD'),
      'filter[end_date]': moment(endDate).endOf('day').format('YYYY-MM-DD'),
    };
    this.dateFilter = { ...this.dateFilter, ...dateRangeFilter };

    this.visitorStore.getVisitor(
      this.dataFilter,
      this.dateFilter,
      this.callbackOnDataSuccessHandler,
      this.callbackOnErrorHander
    );
  };
  resetObservableProperties = () => {};

  callbackOnErrorHander = (error) => {
    this.status = PAGE_STATUS.READY;
    notify(error.message, 'error');
  };

  callbackOnDataSuccessHandler = (data) => {
    if (data) {
      this.status = PAGE_STATUS.READY;
      this.data = data;
    } else {
      this.status = PAGE_STATUS.ERROR;
      this.data = [];
    }
  };
}

export default VisitorListViewModel;
