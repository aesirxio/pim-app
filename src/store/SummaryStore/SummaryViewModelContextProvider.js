/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const SummaryStore = React.createContext();

export const SummaryStoreProvider = ({ children, viewModel }) => {
  return <SummaryStore.Provider value={viewModel}>{children}</SummaryStore.Provider>;
};

/* Hook to use store in any functional component */
export const useSummaryViewModel = () => React.useContext(SummaryStore);

/* HOC to inject store to any functional or class component */
export const withSummaryViewModel = (Component) => (props) => {
  return <Component {...props} parentStore={props?.viewModel} viewModel={useSummaryViewModel()} />;
};
