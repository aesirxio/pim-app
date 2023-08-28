/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { ShippingRateStore } from '../store';
import ShippingRateViewModel from './ShippingRateViewModel';

const shippingRateStore = new ShippingRateStore();
const shippingRateViewModel = new ShippingRateViewModel(shippingRateStore);

export const ShippingRateViewModelContext = React.createContext({
  model: shippingRateViewModel,
});

export const ShippingRateViewModelContextProvider = ({ children }) => {
  return (
    <ShippingRateViewModelContext.Provider value={{ model: shippingRateViewModel }}>
      {children}
    </ShippingRateViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useShippingRateViewModel = () => React.useContext(ShippingRateViewModelContext);

/* HOC to inject store to any functional or class component */
export const withShippingRateViewModel = (Component) => (props) => {
  return <Component {...props} {...useShippingRateViewModel()} />;
};
