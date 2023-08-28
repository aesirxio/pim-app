/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import CustomerGroupDetailViewModel from './CustomerGroupDetailViewModel';
import CustomerGroupListViewModel from './CustomerGroupListViewModel';

class CustomerGroupViewModel {
  customerGroupDetailViewModel = {};
  customerGroupListViewModel = {};

  constructor(customerGroupStore) {
    if (customerGroupStore) {
      this.customerGroupDetailViewModel = new CustomerGroupDetailViewModel(customerGroupStore);
      this.customerGroupListViewModel = new CustomerGroupListViewModel(customerGroupStore);
    }
  }

  getCustomerGroupDetailViewModel = () => this.customerGroupDetailViewModel;
  getCustomerGroupListViewModel = () => this.customerGroupListViewModel;
}

export default CustomerGroupViewModel;
