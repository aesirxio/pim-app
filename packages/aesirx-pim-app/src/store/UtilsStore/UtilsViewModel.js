/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import UtilsListViewModel from './UtilsListViewModel';

class UtilsViewModel {
  utilsDetailViewModel = null;
  utilsListViewModel = null;

  constructor(utilsStore) {
    if (utilsStore) {
      this.utilsListViewModel = new UtilsListViewModel(utilsStore);
    }
  }

  getUtilsListViewModel = () => this.utilsListViewModel;
}

export default UtilsViewModel;
