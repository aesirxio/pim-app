/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const ProductPricesViewModelContext = React.createContext();

export const ProductPricesViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ProductPricesViewModelContext.Provider value={viewModel}>
      {children}
    </ProductPricesViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProductPricesViewModel = () => React.useContext(ProductPricesViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProductPricesViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useProductPricesViewModel()} />;
};
