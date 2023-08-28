/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { TaxGroupStore } from '../store';
import TaxGroupViewModel from './TaxGroupViewModel';

const taxGroupStore = new TaxGroupStore();
const taxGroupViewModel = new TaxGroupViewModel(taxGroupStore);

export const TaxGroupViewModelContext = React.createContext({
  model: taxGroupViewModel,
});

export const TaxGroupViewModelContextProvider = ({ children }) => {
  return (
    <TaxGroupViewModelContext.Provider value={{ model: taxGroupViewModel }}>
      {children}
    </TaxGroupViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useTaxGroupViewModel = () => React.useContext(TaxGroupViewModelContext);

/* HOC to inject store to any functional or class component */
export const withTaxGroupViewModel = (Component) => (props) => {
  return <Component {...props} {...useTaxGroupViewModel()} />;
};
