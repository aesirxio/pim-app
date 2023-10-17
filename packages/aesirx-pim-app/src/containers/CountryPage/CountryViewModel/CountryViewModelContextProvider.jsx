/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { CountryStore } from '../store';
import CountryViewModel from './CountryViewModel';

const countryStore = new CountryStore();
const countryViewModel = new CountryViewModel(countryStore);

export const CountryViewModelContext = React.createContext({
  model: countryViewModel,
});

export const CountryViewModelContextProvider = ({ children }) => {
  return (
    <CountryViewModelContext.Provider value={{ model: countryViewModel }}>
      {children}
    </CountryViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useCountryViewModel = () => React.useContext(CountryViewModelContext);

/* HOC to inject store to any functional or class component */
export const withCountryViewModel = (Component) => (props) => {
  return <Component {...props} {...useCountryViewModel()} />;
};
