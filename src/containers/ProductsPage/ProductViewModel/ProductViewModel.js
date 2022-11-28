/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import UpdateProductViewModel from './UpdateProductViewModel';

class ProductViewModel {
  updateProductViewModel = null;

  constructor(productStore) {
    if (productStore) {
      this.updateProductViewModel = new UpdateProductViewModel(productStore);
    }
  }

  getUpdateProductViewModel = () => this.updateProductViewModel;
}

export default ProductViewModel;
