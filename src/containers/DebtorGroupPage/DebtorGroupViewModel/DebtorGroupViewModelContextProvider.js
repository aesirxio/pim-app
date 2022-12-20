/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const DebtorGroupViewModelContext = React.createContext();

export const DebtorGroupViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <DebtorGroupViewModelContext.Provider value={viewModel}>
      {children}
    </DebtorGroupViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useDebtorGroupViewModel = () => React.useContext(DebtorGroupViewModelContext);

/* HOC to inject store to any functional or class component */
export const withDebtorGroupViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useDebtorGroupViewModel()} />;
};
