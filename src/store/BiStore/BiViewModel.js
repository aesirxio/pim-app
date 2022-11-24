/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BiListViewModel from './BiListViewModel';
import BiFromViewModel from './BiFormViewModel';
class BiViewModel {
  biListViewModel = null;
  biFormViewModel = null;
  constructor(biStore) {
    if (biStore) {
      this.biListViewModel = new BiListViewModel(biStore);
      this.biFormViewModel = new BiFromViewModel(biStore);
    }
  }

  getBiListViewModel = () => this.biListViewModel;
  getBiFormViewModel = () => this.biFormViewModel;
}

export default BiViewModel;
