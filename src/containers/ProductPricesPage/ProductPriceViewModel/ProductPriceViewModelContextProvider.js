/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const ProductPriceViewModelContext = React.createContext();

export const ProductPriceViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ProductPriceViewModelContext.Provider value={viewModel}>
      {children}
    </ProductPriceViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProductPriceViewModel = () => React.useContext(ProductPriceViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProductPriceViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useProductPriceViewModel()} />;
};
