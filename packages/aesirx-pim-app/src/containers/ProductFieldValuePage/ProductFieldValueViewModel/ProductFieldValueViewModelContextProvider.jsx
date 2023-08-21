/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { ProductFieldValueStore } from '../store';
import ProductFieldValueViewModel from './ProductFieldValueViewModel';

const productFieldValueStore = new ProductFieldValueStore();
const productFieldValueViewModel = new ProductFieldValueViewModel(productFieldValueStore);

export const ProductFieldValueViewModelContext = React.createContext({
  model: productFieldValueViewModel,
});

export const ProductFieldValueViewModelContextProvider = ({ children }) => {
  return (
    <ProductFieldValueViewModelContext.Provider value={{ model: productFieldValueViewModel }}>
      {children}
    </ProductFieldValueViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProductFieldValueViewModel = () =>
  React.useContext(ProductFieldValueViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProductFieldValueViewModel = (Component) => (props) => {
  return <Component {...props} {...useProductFieldValueViewModel()} />;
};
