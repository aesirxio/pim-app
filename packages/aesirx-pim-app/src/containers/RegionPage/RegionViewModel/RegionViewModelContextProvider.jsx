/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { RegionStore } from '../store';
import RegionViewModel from './RegionViewModel';

const regionStore = new RegionStore();
const regionViewModel = new RegionViewModel(regionStore);

export const RegionViewModelContext = React.createContext({
  model: regionViewModel,
});

export const RegionViewModelContextProvider = ({ children }) => {
  return (
    <RegionViewModelContext.Provider value={{ model: regionViewModel }}>
      {children}
    </RegionViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useRegionViewModel = () => React.useContext(RegionViewModelContext);

/* HOC to inject store to any functional or class component */
export const withRegionViewModel = (Component) => (props) => {
  return <Component {...props} {...useRegionViewModel()} />;
};
