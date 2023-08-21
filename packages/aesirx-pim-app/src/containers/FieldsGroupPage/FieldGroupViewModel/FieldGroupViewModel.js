/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import FieldGroupDetailViewModel from './FieldGroupDetailViewModel';
import FieldGroupListViewModel from './FieldGroupListViewModel';

class FieldGroupViewModel {
  fieldGroupDetailViewModel = null;
  fieldGroupListViewModel = null;

  constructor(fieldGroupStore) {
    if (fieldGroupStore) {
      this.fieldGroupDetailViewModel = new FieldGroupDetailViewModel(fieldGroupStore);
      this.fieldGroupListViewModel = new FieldGroupListViewModel(fieldGroupStore);
    }
  }

  getFieldGroupDetailViewModel = () => this.fieldGroupDetailViewModel;
  getFieldGroupListViewModel = () => this.fieldGroupListViewModel;
}

export default FieldGroupViewModel;
