/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { saveAs } from 'file-saver';
import { makeAutoObservable } from 'mobx';

class VisitorFormViewModel {
  show = false;
  showContextMenu = false;
  showDeleteModal = false;
  visitorEditdata = null;
  editMode = null;
  visitorListViewModel = null;
  formStatus = PAGE_STATUS.READY;
  visitorStore = null;

  constructor(visitorStore) {
    makeAutoObservable(this);
    this.visitorStore = visitorStore;
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
    // this.visitorEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
    // this.visitorEditdata?.[DAM_ASSETS_FIELD_KEY.NAME]
  };

  callbackOnErrorHander = (data) => {
    notify(data.message, 'error');
  };

  callbackOnSuccessHandler = (data) => {
    if (data) {
      this.visitorListViewModel.assets = this.visitorListViewModel.assets.filter((asset) => {
        return asset.id !== data.id;
      });
    }
  };
}

export default VisitorFormViewModel;
