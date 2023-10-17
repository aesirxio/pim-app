/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import DebtorGroupStore from '../DebtorGroupStore/DebtorGroupStore';
import DebtorGroupViewModel from './DebtorGroupViewModel';
const debtorGroupStore = new DebtorGroupStore();
const debtorGroupViewModel = new DebtorGroupViewModel(debtorGroupStore);

export const DebtorGroupViewModelContext = React.createContext({
  model: debtorGroupViewModel,
});

export const DebtorGroupViewModelContextProvider = ({ children }) => {
  return (
    <DebtorGroupViewModelContext.Provider value={{ model: debtorGroupViewModel }}>
      {children}
    </DebtorGroupViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useDebtorGroupViewModel = () => React.useContext(DebtorGroupViewModelContext);

/* HOC to inject store to any functional or class component */
export const withDebtorGroupViewModel = (Component) => (props) => {
  return <Component {...props} {...useDebtorGroupViewModel()} />;
};
