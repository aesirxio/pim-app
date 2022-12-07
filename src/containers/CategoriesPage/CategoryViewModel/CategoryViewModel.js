/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import CategoryDetailViewModel from './CategoryDetailViewModel';
import CategoryListViewModel from './CategoryListViewModel';

class CategoryViewModel {
  categoryDetailViewModel = null;
  categoryListViewModel = null;

  constructor(categoryStore) {
    if (categoryStore) {
      this.categoryDetailViewModel = new CategoryDetailViewModel(categoryStore);
      this.categoryListViewModel = new CategoryListViewModel(categoryStore);
    }
  }

  getCategoryDetailViewModel = () => this.categoryDetailViewModel;
  getCategoryListViewModel = () => this.categoryListViewModel;
}

export default CategoryViewModel;
