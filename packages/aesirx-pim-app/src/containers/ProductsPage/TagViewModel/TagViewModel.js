/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import TagListViewModel from './TagListViewModel';

class TagViewModel {
  categoryListViewModel = null;

  constructor(categoryStore) {
    if (categoryStore) {
      this.categoryListViewModel = new TagListViewModel(categoryStore);
    }
  }

  getTagListViewModel = () => this.categoryListViewModel;
}

export default TagViewModel;
