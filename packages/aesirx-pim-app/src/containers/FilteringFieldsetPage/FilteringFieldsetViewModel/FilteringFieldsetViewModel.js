/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import FilteringFieldsetDetailViewModel from './FilteringFieldsetDetailViewModel';
import FilteringFieldsetListViewModel from './FilteringFieldsetListViewModel';

class FilteringFieldsetViewModel {
  filteringFieldsetDetailViewModel = {};
  filteringFieldsetListViewModel = {};

  constructor(filteringFieldsetStore) {
    if (filteringFieldsetStore) {
      this.filteringFieldsetDetailViewModel = new FilteringFieldsetDetailViewModel(
        filteringFieldsetStore
      );
      this.filteringFieldsetListViewModel = new FilteringFieldsetListViewModel(
        filteringFieldsetStore
      );
    }
  }

  getFilteringFieldsetDetailViewModel = () => this.filteringFieldsetDetailViewModel;
  getFilteringFieldsetListViewModel = () => this.filteringFieldsetListViewModel;
}

export default FilteringFieldsetViewModel;
