/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import moment from 'moment';

class BiListViewModel {
  biStore = null;
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
  activeDomain = 'dam.aesirx.io';
  isSearch = false;
  constructor(biStore) {
    makeAutoObservable(this);
    this.biStore = biStore;
  }

  getDashboard = (dataFilter) => {
    this.status = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, dataFilter };
    this.biStore.getDashboard(
      this.dataFilter,
      this.callbackOnDataSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  getListDomain = (dataFilter, listDomains) => {
    this.status = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, ...dataFilter };
    this.biStore.getListDomain(
      this.dataFilter,
      listDomains,
      this.callbackOnDataSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  setActiveDomain = (domain) => {
    this.activeDomain = domain;
  };

  handleFilter = (dataFilter) => {
    this.status = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, ...dataFilter };

    this.biStore.getListDomain(
      this.dataFilter,
      this.callbackOnDataSuccessHandler,
      this.callbackOnErrorHander
    );
  };
  handleFilterDateRange = (startDate, endDate) => {
    this.status = PAGE_STATUS.LOADING;
    let dateRangeFilter = {
      'filter[start_date]': moment(startDate).format('YYYY-MM-DD'),
      'filter[end_date]': moment(endDate).format('YYYY-MM-DD'),
    };
    this.dataFilter = { ...this.dataFilter, ...dateRangeFilter };

    this.biStore.getDashboard(
      this.dataFilter,
      this.callbackOnDataSuccessHandler,
      this.callbackOnErrorHander
    );
  };
  resetObservableProperties = () => {};

  callbackOnErrorHander = (error) => {
    if (error.message === 'isCancle') {
      this.status = PAGE_STATUS.READY;
    } else notify(error.message, 'error');
  };

  callbackOnDataSuccessHandler = (data) => {
    if (data) {
      this.status = PAGE_STATUS.READY;
      this.data = data;
    } else {
      this.status = PAGE_STATUS.ERROR;
    }
  };
}

export default BiListViewModel;
