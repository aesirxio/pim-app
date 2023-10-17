/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import CategoryStore from '../CategoryStore/CategoryStore';
import CategoryViewModel from './CategoryViewModel';

const categoryStore = new CategoryStore();
const categoryViewModel = new CategoryViewModel(categoryStore);

export const CategoryViewModelContext = React.createContext({
  model: categoryViewModel,
});

export const CategoryViewModelContextProvider = ({ children }) => {
  return (
    <CategoryViewModelContext.Provider value={{ model: categoryViewModel }}>
      {children}
    </CategoryViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useCategoryViewModel = () => React.useContext(CategoryViewModelContext);

/* HOC to inject store to any functional or class component */
export const withCategoryViewModel = (Component) => (props) => {
  return <Component {...props} {...useCategoryViewModel()} />;
};
