/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FilteringFieldsetStore } from '../store';
import FilteringFieldsetViewModel from './FilteringFieldsetViewModel';

const filteringFieldsetStore = new FilteringFieldsetStore();
const filteringFieldsetViewModel = new FilteringFieldsetViewModel(filteringFieldsetStore);

export const FilteringFieldsetViewModelContext = React.createContext({
  model: filteringFieldsetViewModel,
});

export const FilteringFieldsetViewModelContextProvider = ({ children }) => {
  return (
    <FilteringFieldsetViewModelContext.Provider value={{ model: filteringFieldsetViewModel }}>
      {children}
    </FilteringFieldsetViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useFilteringFieldsetViewModel = () =>
  React.useContext(FilteringFieldsetViewModelContext);

/* HOC to inject store to any functional or class component */
export const withFilteringFieldsetViewModel = (Component) => (props) => {
  return <Component {...props} {...useFilteringFieldsetViewModel()} />;
};
