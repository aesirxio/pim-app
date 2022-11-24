/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const VisitorStore = React.createContext();

export const VisitorStoreProvider = ({ children, viewModel }) => {
  return <VisitorStore.Provider value={viewModel}>{children}</VisitorStore.Provider>;
};

/* Hook to use store in any functional component */
export const useVisitorViewModel = () => React.useContext(VisitorStore);

/* HOC to inject store to any functional or class component */
export const withVisitorViewModel = (Component) => (props) => {
  return <Component {...props} parentStore={props?.viewModel} viewModel={useVisitorViewModel()} />;
};
