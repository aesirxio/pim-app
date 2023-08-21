/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const VariantViewModelContext = React.createContext();

export const VariantViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <VariantViewModelContext.Provider value={viewModel}>
      {children}
    </VariantViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useVariantViewModel = () => React.useContext(VariantViewModelContext);

/* HOC to inject store to any functional or class component */
export const withVariantViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useVariantViewModel()} />;
};
