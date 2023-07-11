/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

import { ProductViewModelContextProvider } from 'containers/ProductsPage/ProductViewModel/ProductViewModelContextProvider';
import EditProduct from './ProductEdit';

const EditProductProvider = observer(
  class EditProductProvider extends Component {
    render() {
      return (
        <ProductViewModelContextProvider>
          <EditProduct />
        </ProductViewModelContextProvider>
      );
    }
  }
);
export default withTranslation()(EditProductProvider);
