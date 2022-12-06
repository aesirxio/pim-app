/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import CategoryDetailViewModel from './CategoryDetailViewModel';

class CategoryViewModel {
  categoryDetailViewModel = null;

  constructor(categoryStore) {
    if (categoryStore) {
      this.categoryDetailViewModel = new CategoryDetailViewModel(categoryStore);
    }
  }

  getCategoryDetailViewModel = () => this.categoryDetailViewModel;
}

export default CategoryViewModel;
