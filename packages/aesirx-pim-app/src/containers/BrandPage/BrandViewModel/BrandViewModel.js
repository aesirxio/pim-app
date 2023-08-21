/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BrandDetailViewModel from './BrandDetailViewModel';
import BrandListViewModel from './BrandListViewModel';

class BrandViewModel {
  brandDetailViewModel = {};
  brandListViewModel = {};

  constructor(brandStore) {
    if (brandStore) {
      this.brandDetailViewModel = new BrandDetailViewModel(brandStore);
      this.brandListViewModel = new BrandListViewModel(brandStore);
    }
  }

  getBrandDetailViewModel = () => this.brandDetailViewModel;
  getBrandListViewModel = () => this.brandListViewModel;
}

export default BrandViewModel;
