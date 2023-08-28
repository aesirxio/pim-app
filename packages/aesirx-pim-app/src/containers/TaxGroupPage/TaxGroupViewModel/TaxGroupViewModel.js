/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import TaxGroupDetailViewModel from './TaxGroupDetailViewModel';
import TaxGroupListViewModel from './TaxGroupListViewModel';

class TaxGroupViewModel {
  taxGroupDetailViewModel = {};
  taxGroupListViewModel = {};

  constructor(taxGroupStore) {
    if (taxGroupStore) {
      this.taxGroupDetailViewModel = new TaxGroupDetailViewModel(taxGroupStore);
      this.taxGroupListViewModel = new TaxGroupListViewModel(taxGroupStore);
    }
  }

  getTaxGroupDetailViewModel = () => this.taxGroupDetailViewModel;
  getTaxGroupListViewModel = () => this.taxGroupListViewModel;
}

export default TaxGroupViewModel;
