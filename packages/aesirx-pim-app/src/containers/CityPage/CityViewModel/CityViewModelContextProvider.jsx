/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { CityStore } from '../store';
import CityViewModel from './CityViewModel';

const cityStore = new CityStore();
const cityViewModel = new CityViewModel(cityStore);

export const CityViewModelContext = React.createContext({
  model: cityViewModel,
});

export const CityViewModelContextProvider = ({ children }) => {
  return (
    <CityViewModelContext.Provider value={{ model: cityViewModel }}>
      {children}
    </CityViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useCityViewModel = () => React.useContext(CityViewModelContext);

/* HOC to inject store to any functional or class component */
export const withCityViewModel = (Component) => (props) => {
  return <Component {...props} {...useCityViewModel()} />;
};
