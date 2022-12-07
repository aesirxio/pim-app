/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const FieldViewModelContext = React.createContext();

export const FieldViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <FieldViewModelContext.Provider value={viewModel}>{children}</FieldViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useFieldViewModel = () => React.useContext(FieldViewModelContext);

/* HOC to inject store to any functional or class component */
export const withFieldViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useFieldViewModel()} />;
};
