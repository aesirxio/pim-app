/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { TaxStore } from '../store';
import TaxViewModel from './TaxViewModel';

const taxStore = new TaxStore();
const taxViewModel = new TaxViewModel(taxStore);

export const TaxViewModelContext = React.createContext({
  model: taxViewModel,
});

export const TaxViewModelContextProvider = ({ children }) => {
  return (
    <TaxViewModelContext.Provider value={{ model: taxViewModel }}>
      {children}
    </TaxViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useTaxViewModel = () => React.useContext(TaxViewModelContext);

/* HOC to inject store to any functional or class component */
export const withTaxViewModel = (Component) => (props) => {
  return <Component {...props} {...useTaxViewModel()} />;
};
