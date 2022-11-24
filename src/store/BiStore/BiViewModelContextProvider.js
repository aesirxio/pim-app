/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const BiStore = React.createContext();

export const BiStoreProvider = ({ children, viewModel }) => {
  return <BiStore.Provider value={viewModel}>{children}</BiStore.Provider>;
};

/* Hook to use store in any functional component */
export const useBiViewModel = () => React.useContext(BiStore);

/* HOC to inject store to any functional or class component */
export const withBiViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useBiViewModel()} />;
};
