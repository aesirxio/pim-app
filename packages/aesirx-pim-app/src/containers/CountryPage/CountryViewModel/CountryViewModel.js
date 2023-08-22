/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import CountryDetailViewModel from './CountryDetailViewModel';
import CountryListViewModel from './CountryListViewModel';

class CountryViewModel {
  countryDetailViewModel = {};
  countryListViewModel = {};

  constructor(countryStore) {
    if (countryStore) {
      this.countryDetailViewModel = new CountryDetailViewModel(countryStore);
      this.countryListViewModel = new CountryListViewModel(countryStore);
    }
  }

  getCountryDetailViewModel = () => this.countryDetailViewModel;
  getCountryListViewModel = () => this.countryListViewModel;
}

export default CountryViewModel;
