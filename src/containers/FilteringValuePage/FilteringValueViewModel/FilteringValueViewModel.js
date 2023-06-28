/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import FilteringValueDetailViewModel from './FilteringValueDetailViewModel';
import FilteringValueListViewModel from './FilteringValueListViewModel';

class FilteringValueViewModel {
  filteringValueDetailViewModel = {};
  filteringValueListViewModel = {};

  constructor(filteringValueStore) {
    if (filteringValueStore) {
      this.filteringValueDetailViewModel = new FilteringValueDetailViewModel(filteringValueStore);
      this.filteringValueListViewModel = new FilteringValueListViewModel(filteringValueStore);
    }
  }

  getFilteringValueDetailViewModel = () => this.filteringValueDetailViewModel;
  getFilteringValueListViewModel = () => this.filteringValueListViewModel;
}

export default FilteringValueViewModel;
