/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { CustomerGroupStore } from '../store';
import CustomerGroupViewModel from './CustomerGroupViewModel';

const customerGroupStore = new CustomerGroupStore();
const customerGroupViewModel = new CustomerGroupViewModel(customerGroupStore);

export const CustomerGroupViewModelContext = React.createContext({
  model: customerGroupViewModel,
});

export const CustomerGroupViewModelContextProvider = ({ children }) => {
  return (
    <CustomerGroupViewModelContext.Provider value={{ model: customerGroupViewModel }}>
      {children}
    </CustomerGroupViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useCustomerGroupViewModel = () => React.useContext(CustomerGroupViewModelContext);

/* HOC to inject store to any functional or class component */
export const withCustomerGroupViewModel = (Component) => (props) => {
  return <Component {...props} {...useCustomerGroupViewModel()} />;
};
