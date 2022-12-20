/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ProductPriceDetailViewModel from './ProductPriceDetailViewModel';
import ProductPriceListViewModel from './ProductPriceListViewModel';

class ProductPriceViewModel {
  productPriceDetailViewModel = null;
  productPriceListViewModel = null;

  constructor(productPriceStore) {
    if (productPriceStore) {
      this.productPriceDetailViewModel = new ProductPriceDetailViewModel(productPriceStore);
      this.productPriceListViewModel = new ProductPriceListViewModel(productPriceStore);
    }
  }

  getProductPriceDetailViewModel = () => this.productPriceDetailViewModel;
  getProductPriceListViewModel = () => this.productPriceListViewModel;
}

export default ProductPriceViewModel;
