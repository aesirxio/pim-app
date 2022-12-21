/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const DashboardViewModelContext = React.createContext();

export const DashboardViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <DashboardViewModelContext.Provider value={viewModel}>
      {children}
    </DashboardViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useDashboardViewModel = () => React.useContext(DashboardViewModelContext);

/* HOC to inject store to any functional or class component */
export const withDashboardViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useDashboardViewModel()} />;
};
