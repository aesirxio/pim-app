/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ShippingZoneDetailViewModel from './ShippingZoneDetailViewModel';
import ShippingZoneListViewModel from './ShippingZoneListViewModel';

class ShippingZoneViewModel {
  shippingZoneDetailViewModel = {};
  shippingZoneListViewModel = {};

  constructor(shippingZoneStore) {
    if (shippingZoneStore) {
      this.shippingZoneDetailViewModel = new ShippingZoneDetailViewModel(shippingZoneStore);
      this.shippingZoneListViewModel = new ShippingZoneListViewModel(shippingZoneStore);
    }
  }

  getShippingZoneDetailViewModel = () => this.shippingZoneDetailViewModel;
  getShippingZoneListViewModel = () => this.shippingZoneListViewModel;
}

export default ShippingZoneViewModel;
