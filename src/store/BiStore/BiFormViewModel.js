/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { saveAs } from 'file-saver';
import { makeAutoObservable } from 'mobx';

class BiFormViewModel {
  show = false;
  showContextMenu = false;
  showDeleteModal = false;
  biEditdata = null;
  editMode = null;
  biListViewModel = null;
  formStatus = PAGE_STATUS.READY;
  biStore = null;

  constructor(biStore) {
    makeAutoObservable(this);
    this.biStore = biStore;
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
    // this.biEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
    // this.biEditdata?.[DAM_ASSETS_FIELD_KEY.NAME]
  };

  callbackOnErrorHander = (data) => {
    notify(data.message, 'error');
  };

  callbackOnSuccessHandler = (data) => {
    if (data) {
      this.biListViewModel.assets = this.biListViewModel.assets.filter((asset) => {
        return asset.id !== data.id;
      });
    }
  };
}

export default BiFormViewModel;
