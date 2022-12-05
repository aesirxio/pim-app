/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ProductDetailViewModel from './ProductDetailViewModel';

class ProductViewModel {
  productDetailViewModel = null;

  constructor(productStore) {
    if (productStore) {
      this.productDetailViewModel = new ProductDetailViewModel(productStore);
    }
  }

  getProductDetailViewModel = () => this.productDetailViewModel;
}

export default ProductViewModel;
