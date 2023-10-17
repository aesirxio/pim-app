/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import ProductPriceStore from '../ProductPriceStore/ProductPriceStore';
import ProductPriceViewModel from './ProductPriceViewModel';
const productPriceStore = new ProductPriceStore();
const productPriceViewModel = new ProductPriceViewModel(productPriceStore);

export const ProductPriceViewModelContext = React.createContext({
  model: productPriceViewModel,
});

export const ProductPriceViewModelContextProvider = ({ children }) => {
  return (
    <ProductPriceViewModelContext.Provider value={{ model: productPriceViewModel }}>
      {children}
    </ProductPriceViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProductPriceViewModel = () => React.useContext(ProductPriceViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProductPriceViewModel = (Component) => (props) => {
  return <Component {...props} {...useProductPriceViewModel()} />;
};
