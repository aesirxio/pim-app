/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { saveAs } from 'file-saver';
import { makeAutoObservable } from 'mobx';

class SummaryFormViewModel {
  show = false;
  showContextMenu = false;
  showDeleteModal = false;
  summaryEditdata = null;
  editMode = null;
  summaryListViewModel = null;
  formStatus = PAGE_STATUS.READY;
  summaryStore = null;

  constructor(summaryStore) {
    makeAutoObservable(this);
    this.summaryStore = summaryStore;
  }

  openContextMenu = () => {
    this.showContextMenu = true;
  };

  closeContextMenu = () => {
    this.showContextMenu = false;
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  openDeleteModal = () => {
    this.showDeleteModal = true;
  };

  closeDeleteModal = () => {
    this.showDeleteModal = false;
  };

  downloadFile = () => {
    saveAs();
    // this.summaryEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
    // this.summaryEditdata?.[DAM_ASSETS_FIELD_KEY.NAME]
  };

  callbackOnErrorHander = (data) => {
    notify(data.message, 'error');
  };

  callbackOnSuccessHandler = (data) => {
    if (data) {
      this.summaryListViewModel.assets = this.summaryListViewModel.assets.filter((asset) => {
        return asset.id !== data.id;
      });
    }
  };
}

export default SummaryFormViewModel;
