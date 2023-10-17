/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const TagViewModelContext = React.createContext();

export const TagViewModelContextProvider = ({ children, viewModel }) => {
  return <TagViewModelContext.Provider value={viewModel}>{children}</TagViewModelContext.Provider>;
};

/* Hook to use store in any functional component */
export const useTagViewModel = () => React.useContext(TagViewModelContext);

/* HOC to inject store to any functional or class component */
export const withTagViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useTagViewModel()} />;
};
