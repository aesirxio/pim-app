/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import CityDetailViewModel from './CityDetailViewModel';
import CityListViewModel from './CityListViewModel';

class CityViewModel {
  cityDetailViewModel = {};
  cityListViewModel = {};

  constructor(cityStore) {
    if (cityStore) {
      this.cityDetailViewModel = new CityDetailViewModel(cityStore);
      this.cityListViewModel = new CityListViewModel(cityStore);
    }
  }

  getCityDetailViewModel = () => this.cityDetailViewModel;
  getCityListViewModel = () => this.cityListViewModel;
}

export default CityViewModel;
