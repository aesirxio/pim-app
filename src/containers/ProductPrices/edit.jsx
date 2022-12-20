/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import ProductPriceStore from 'containers/ProductPrices/productPricesStore/ProductPricesStore';
import ProductPricesViewModel from 'containers/ProductPrices/productPricesViewModel/ProductPricesViewModel';
import { ProductPricesViewModelContextProvider } from 'containers/ProductPrices/productPricesViewModel/ProductPricesViewModelContextProvider';
import EditProductPrice from './ProductPriceEdit';
const productPriceStore = new ProductPriceStore();
const productPriceViewModel = new ProductPricesViewModel(productPriceStore);

const EditProductPriceProvider = observer(
  class EditProductPriceProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <ProductPricesViewModelContextProvider viewModel={productPriceViewModel}>
          <EditProductPrice />
        </ProductPricesViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditProductPriceProvider);
