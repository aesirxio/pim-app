/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import TypeDetailViewModel from './TypeDetailViewModel';
import TypeListViewModel from './TypeListViewModel';

class TypeViewModel {
  typeDetailViewModel = {};
  typeListViewModel = {};

  constructor(typeStore) {
    if (typeStore) {
      this.typeDetailViewModel = new TypeDetailViewModel(typeStore);
      this.typeListViewModel = new TypeListViewModel(typeStore);
    }
  }

  getTypeDetailViewModel = () => this.typeDetailViewModel;
  getTypeListViewModel = () => this.typeListViewModel;
}

export default TypeViewModel;
