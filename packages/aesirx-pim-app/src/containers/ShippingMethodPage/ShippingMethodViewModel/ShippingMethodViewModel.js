/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ShippingMethodDetailViewModel from './ShippingMethodDetailViewModel';
import ShippingMethodListViewModel from './ShippingMethodListViewModel';

class ShippingMethodViewModel {
  shippingMethodDetailViewModel = {};
  shippingMethodListViewModel = {};

  constructor(shippingMethodStore) {
    if (shippingMethodStore) {
      this.shippingMethodDetailViewModel = new ShippingMethodDetailViewModel(shippingMethodStore);
      this.shippingMethodListViewModel = new ShippingMethodListViewModel(shippingMethodStore);
    }
  }

  getShippingMethodDetailViewModel = () => this.shippingMethodDetailViewModel;
  getShippingMethodListViewModel = () => this.shippingMethodListViewModel;
}

export default ShippingMethodViewModel;
