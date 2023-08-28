/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import TaxDetailViewModel from './TaxDetailViewModel';
import TaxListViewModel from './TaxListViewModel';

class TaxViewModel {
  taxDetailViewModel = {};
  taxListViewModel = {};

  constructor(taxStore) {
    if (taxStore) {
      this.taxDetailViewModel = new TaxDetailViewModel(taxStore);
      this.taxListViewModel = new TaxListViewModel(taxStore);
    }
  }

  getTaxDetailViewModel = () => this.taxDetailViewModel;
  getTaxListViewModel = () => this.taxListViewModel;
}

export default TaxViewModel;
