/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FilteringValueStore } from '../store';
import FilteringValueViewModel from './FilteringValueViewModel';

const filteringValueStore = new FilteringValueStore();
const filteringValueViewModel = new FilteringValueViewModel(filteringValueStore);

export const FilteringValueViewModelContext = React.createContext({
  model: filteringValueViewModel,
});

export const FilteringValueViewModelContextProvider = ({ children }) => {
  return (
    <FilteringValueViewModelContext.Provider value={{ model: filteringValueViewModel }}>
      {children}
    </FilteringValueViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useFilteringValueViewModel = () => React.useContext(FilteringValueViewModelContext);

/* HOC to inject store to any functional or class component */
export const withFilteringValueViewModel = (Component) => (props) => {
  return <Component {...props} {...useFilteringValueViewModel()} />;
};
