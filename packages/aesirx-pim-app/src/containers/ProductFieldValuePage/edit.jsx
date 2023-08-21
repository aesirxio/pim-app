/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditProductFieldValue from './ProductFieldValueEdit';
import { ProductFieldValueViewModelContextProvider } from './ProductFieldValueViewModel/ProductFieldValueViewModelContextProvider';

const EditProductFieldValueProvider = observer(
  class EditProductFieldValueProvider extends Component {
    render() {
      return (
        <ProductFieldValueViewModelContextProvider>
          <EditProductFieldValue />
        </ProductFieldValueViewModelContextProvider>
      );
    }
  }
);
export default EditProductFieldValueProvider;
