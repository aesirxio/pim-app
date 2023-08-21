/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { ProductTypeStore } from '../store';
import ProductTypeViewModel from './ProductTypeViewModel';

const productTypeStore = new ProductTypeStore();
const productTypeViewModel = new ProductTypeViewModel(productTypeStore);

export const ProductTypeViewModelContext = React.createContext({
  model: productTypeViewModel,
});

export const ProductTypeViewModelContextProvider = ({ children }) => {
  return (
    <ProductTypeViewModelContext.Provider value={{ model: productTypeViewModel }}>
      {children}
    </ProductTypeViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProductTypeViewModel = () => React.useContext(ProductTypeViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProductTypeViewModel = (Component) => (props) => {
  return <Component {...props} {...useProductTypeViewModel()} />;
};
