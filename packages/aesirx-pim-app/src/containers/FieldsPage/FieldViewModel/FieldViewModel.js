/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import FieldDetailViewModel from './FieldDetailViewModel';
import FieldListViewModel from './FieldListViewModel';

class FieldViewModel {
  fieldDetailViewModel = null;
  fieldListViewModel = null;

  constructor(fieldStore) {
    if (fieldStore) {
      this.fieldDetailViewModel = new FieldDetailViewModel(fieldStore);
      this.fieldListViewModel = new FieldListViewModel(fieldStore);
    }
  }

  getFieldDetailViewModel = () => this.fieldDetailViewModel;
  getFieldListViewModel = () => this.fieldListViewModel;
}

export default FieldViewModel;
