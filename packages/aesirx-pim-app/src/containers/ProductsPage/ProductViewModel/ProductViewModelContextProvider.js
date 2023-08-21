/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import ProductStore from '../ProductStore/ProductStore';
import ProductViewModel from './ProductViewModel';

const productStore = new ProductStore();
const productViewModel = new ProductViewModel(productStore);

export const ProductViewModelContext = React.createContext({
  model: productViewModel,
});

export const ProductViewModelContextProvider = ({ children }) => {
  return (
    <ProductViewModelContext.Provider value={{ model: productViewModel }}>
      {children}
    </ProductViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProductViewModel = () => React.useContext(ProductViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProductViewModel = (Component) => (props) => {
  return <Component {...props} {...useProductViewModel()} />;
};
