/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import ProductStore from 'containers/ProductsPage/ProductStore/ProductStore';
import ProductViewModel from 'containers/ProductsPage/ProductViewModel/ProductViewModel';
import { ProductViewModelContextProvider } from 'containers/ProductsPage/ProductViewModel/ProductViewModelContextProvider';
import EditProduct from './ProductEdit';
const productStore = new ProductStore();
const productViewModel = new ProductViewModel(productStore);

const EditProductProvider = observer(
  class EditProductProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <ProductViewModelContextProvider viewModel={productViewModel}>
          <EditProduct />
        </ProductViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditProductProvider);
