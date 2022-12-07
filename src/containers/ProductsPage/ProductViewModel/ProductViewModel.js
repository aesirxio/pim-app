/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ProductDetailViewModel from './ProductDetailViewModel';
import ProductListViewModel from './ProductListViewModel';

class ProductViewModel {
  productDetailViewModel = null;
  productListViewModel = null;

  constructor(productStore) {
    if (productStore) {
      this.productDetailViewModel = new ProductDetailViewModel(productStore);
      this.productListViewModel = new ProductListViewModel(productStore);
    }
  }

  getProductDetailViewModel = () => this.productDetailViewModel;
  getProductListViewModel = () => this.productListViewModel;
}

export default ProductViewModel;
