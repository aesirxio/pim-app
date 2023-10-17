/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ProductFieldValueDetailViewModel from './ProductFieldValueDetailViewModel';
import ProductFieldValueListViewModel from './ProductFieldValueListViewModel';

class ProductFieldValueViewModel {
  productFieldValueDetailViewModel = {};
  productFieldValueListViewModel = {};

  constructor(productFieldValueStore) {
    if (productFieldValueStore) {
      this.productFieldValueDetailViewModel = new ProductFieldValueDetailViewModel(
        productFieldValueStore
      );
      this.productFieldValueListViewModel = new ProductFieldValueListViewModel(
        productFieldValueStore
      );
    }
  }

  getProductFieldValueDetailViewModel = () => this.productFieldValueDetailViewModel;
  getProductFieldValueListViewModel = () => this.productFieldValueListViewModel;
}

export default ProductFieldValueViewModel;
