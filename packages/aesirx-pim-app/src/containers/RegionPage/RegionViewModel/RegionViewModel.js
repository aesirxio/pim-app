/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import RegionDetailViewModel from './RegionDetailViewModel';
import RegionListViewModel from './RegionListViewModel';

class RegionViewModel {
  regionDetailViewModel = {};
  regionListViewModel = {};

  constructor(regionStore) {
    if (regionStore) {
      this.regionDetailViewModel = new RegionDetailViewModel(regionStore);
      this.regionListViewModel = new RegionListViewModel(regionStore);
    }
  }

  getRegionDetailViewModel = () => this.regionDetailViewModel;
  getRegionListViewModel = () => this.regionListViewModel;
}

export default RegionViewModel;
