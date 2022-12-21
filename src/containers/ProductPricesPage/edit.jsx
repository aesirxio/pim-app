/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import ProductPriceStore from 'containers/ProductPricesPage/ProductPriceStore/ProductPriceStore';
import ProductPriceViewModel from 'containers/ProductPricesPage/ProductPriceViewModel/ProductPriceViewModel';
import { ProductPriceViewModelContextProvider } from 'containers/ProductPricesPage/ProductPriceViewModel/ProductPriceViewModelContextProvider';
import EditProductPrice from './ProductPriceEdit';
const productPriceStore = new ProductPriceStore();
const productPriceViewModel = new ProductPriceViewModel(productPriceStore);

const EditProductPriceProvider = observer(
  class EditProductPriceProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <ProductPriceViewModelContextProvider viewModel={productPriceViewModel}>
          <EditProductPrice />
        </ProductPriceViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditProductPriceProvider);
