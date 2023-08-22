/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { ShippingMethodStore } from '../store';
import ShippingMethodViewModel from './ShippingMethodViewModel';

const shippingMethodStore = new ShippingMethodStore();
const shippingMethodViewModel = new ShippingMethodViewModel(shippingMethodStore);

export const ShippingMethodViewModelContext = React.createContext({
  model: shippingMethodViewModel,
});

export const ShippingMethodViewModelContextProvider = ({ children }) => {
  return (
    <ShippingMethodViewModelContext.Provider value={{ model: shippingMethodViewModel }}>
      {children}
    </ShippingMethodViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useShippingMethodViewModel = () => React.useContext(ShippingMethodViewModelContext);

/* HOC to inject store to any functional or class component */
export const withShippingMethodViewModel = (Component) => (props) => {
  return <Component {...props} {...useShippingMethodViewModel()} />;
};
