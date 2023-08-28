/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ShippingRateDetailViewModel from './ShippingRateDetailViewModel';
import ShippingRateListViewModel from './ShippingRateListViewModel';

class ShippingRateViewModel {
  shippingRateDetailViewModel = {};
  shippingRateListViewModel = {};

  constructor(shippingRateStore) {
    if (shippingRateStore) {
      this.shippingRateDetailViewModel = new ShippingRateDetailViewModel(shippingRateStore);
      this.shippingRateListViewModel = new ShippingRateListViewModel(shippingRateStore);
    }
  }

  getShippingRateDetailViewModel = () => this.shippingRateDetailViewModel;
  getShippingRateListViewModel = () => this.shippingRateListViewModel;
}

export default ShippingRateViewModel;
