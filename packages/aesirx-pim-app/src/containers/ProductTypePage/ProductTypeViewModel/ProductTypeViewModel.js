/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ProductTypeDetailViewModel from './ProductTypeDetailViewModel';
import ProductTypeListViewModel from './ProductTypeListViewModel';

class ProductTypeViewModel {
  productTypeDetailViewModel = {};
  productTypeListViewModel = {};

  constructor(productTypeStore) {
    if (productTypeStore) {
      this.productTypeDetailViewModel = new ProductTypeDetailViewModel(productTypeStore);
      this.productTypeListViewModel = new ProductTypeListViewModel(productTypeStore);
    }
  }

  getProductTypeDetailViewModel = () => this.productTypeDetailViewModel;
  getProductTypeListViewModel = () => this.productTypeListViewModel;
}

export default ProductTypeViewModel;
