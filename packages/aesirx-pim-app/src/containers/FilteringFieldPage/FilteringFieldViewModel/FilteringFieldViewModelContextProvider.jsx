/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FilteringFieldStore } from '../store';
import FilteringFieldViewModel from './FilteringFieldViewModel';

const filteringFieldStore = new FilteringFieldStore();
const filteringFieldViewModel = new FilteringFieldViewModel(filteringFieldStore);

export const FilteringFieldViewModelContext = React.createContext({
  model: filteringFieldViewModel,
});

export const FilteringFieldViewModelContextProvider = ({ children }) => {
  return (
    <FilteringFieldViewModelContext.Provider value={{ model: filteringFieldViewModel }}>
      {children}
    </FilteringFieldViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useFilteringFieldViewModel = () => React.useContext(FilteringFieldViewModelContext);

/* HOC to inject store to any functional or class component */
export const withFilteringFieldViewModel = (Component) => (props) => {
  return <Component {...props} {...useFilteringFieldViewModel()} />;
};
