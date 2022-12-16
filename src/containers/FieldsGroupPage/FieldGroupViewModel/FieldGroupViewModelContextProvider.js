/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const FieldGroupViewModelContext = React.createContext();

export const FieldGroupViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <FieldGroupViewModelContext.Provider value={viewModel}>
      {children}
    </FieldGroupViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useFieldGroupViewModel = () => React.useContext(FieldGroupViewModelContext);

/* HOC to inject store to any functional or class component */
export const withFieldGroupViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useFieldGroupViewModel()} />;
};
