/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import FilteringFieldDetailViewModel from './FilteringFieldDetailViewModel';
import FilteringFieldListViewModel from './FilteringFieldListViewModel';

class FilteringFieldViewModel {
  filteringFieldDetailViewModel = {};
  filteringFieldListViewModel = {};

  constructor(filteringFieldStore) {
    if (filteringFieldStore) {
      this.filteringFieldDetailViewModel = new FilteringFieldDetailViewModel(filteringFieldStore);
      this.filteringFieldListViewModel = new FilteringFieldListViewModel(filteringFieldStore);
    }
  }

  getFilteringFieldDetailViewModel = () => this.filteringFieldDetailViewModel;
  getFilteringFieldListViewModel = () => this.filteringFieldListViewModel;
}

export default FilteringFieldViewModel;
