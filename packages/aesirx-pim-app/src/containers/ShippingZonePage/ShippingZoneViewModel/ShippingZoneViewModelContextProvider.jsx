/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { ShippingZoneStore } from '../store';
import ShippingZoneViewModel from './ShippingZoneViewModel';

const shippingZoneStore = new ShippingZoneStore();
const shippingZoneViewModel = new ShippingZoneViewModel(shippingZoneStore);

export const ShippingZoneViewModelContext = React.createContext({
  model: shippingZoneViewModel,
});

export const ShippingZoneViewModelContextProvider = ({ children }) => {
  return (
    <ShippingZoneViewModelContext.Provider value={{ model: shippingZoneViewModel }}>
      {children}
    </ShippingZoneViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useShippingZoneViewModel = () => React.useContext(ShippingZoneViewModelContext);

/* HOC to inject store to any functional or class component */
export const withShippingZoneViewModel = (Component) => (props) => {
  return <Component {...props} {...useShippingZoneViewModel()} />;
};
