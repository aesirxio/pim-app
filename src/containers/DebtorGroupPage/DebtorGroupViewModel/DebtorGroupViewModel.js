/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import DebtorGroupDetailViewModel from './DebtorGroupDetailViewModel';
import DebtorGroupListViewModel from './DebtorGroupListViewModel';

class DebtorGroupViewModel {
  debtorGroupDetailViewModel = null;
  debtorGroupListViewModel = null;

  constructor(debtorGroupStore) {
    if (debtorGroupStore) {
      this.debtorGroupDetailViewModel = new DebtorGroupDetailViewModel(debtorGroupStore);
      this.debtorGroupListViewModel = new DebtorGroupListViewModel(debtorGroupStore);
    }
  }

  getDebtorGroupDetailViewModel = () => this.debtorGroupDetailViewModel;
  getDebtorGroupListViewModel = () => this.debtorGroupListViewModel;
}

export default DebtorGroupViewModel;
