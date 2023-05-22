/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

export const ProductViewModelContext = React.createContext();

export const ProductViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ProductViewModelContext.Provider value={viewModel}>
      {children}
    </ProductViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProductViewModel = () => React.useContext(ProductViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProductViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useProductViewModel()} />;
};
