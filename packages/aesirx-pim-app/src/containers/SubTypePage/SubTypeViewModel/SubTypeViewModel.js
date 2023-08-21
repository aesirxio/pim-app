/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import SubTypeDetailViewModel from './SubTypeDetailViewModel';
import SubTypeListViewModel from './SubTypeListViewModel';

class SubTypeViewModel {
  subTypeDetailViewModel = {};
  subTypeListViewModel = {};

  constructor(subTypeStore) {
    if (subTypeStore) {
      this.subTypeDetailViewModel = new SubTypeDetailViewModel(subTypeStore);
      this.subTypeListViewModel = new SubTypeListViewModel(subTypeStore);
    }
  }

  getSubTypeDetailViewModel = () => this.subTypeDetailViewModel;
  getSubTypeListViewModel = () => this.subTypeListViewModel;
}

export default SubTypeViewModel;
