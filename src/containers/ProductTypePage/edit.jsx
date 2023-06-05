/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditProductType from './ProductTypeEdit';
import { ProductTypeViewModelContextProvider } from './ProductTypeViewModel/ProductTypeViewModelContextProvider';

const EditProductTypeProvider = observer(
  class EditProductTypeProvider extends Component {
    render() {
      return (
        <ProductTypeViewModelContextProvider>
          <EditProductType />
        </ProductTypeViewModelContextProvider>
      );
    }
  }
);
export { EditProductTypeProvider };
