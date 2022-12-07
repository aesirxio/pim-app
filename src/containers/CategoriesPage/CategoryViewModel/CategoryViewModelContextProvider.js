/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const CategoryViewModelContext = React.createContext();

export const CategoryViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <CategoryViewModelContext.Provider value={viewModel}>
      {children}
    </CategoryViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useCategoryViewModel = () => React.useContext(CategoryViewModelContext);

/* HOC to inject store to any functional or class component */
export const withCategoryViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useCategoryViewModel()} />;
};
