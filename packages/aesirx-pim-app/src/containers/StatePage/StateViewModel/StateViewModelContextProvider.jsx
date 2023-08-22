/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { StateStore } from '../store';
import StateViewModel from './StateViewModel';

const stateStore = new StateStore();
const stateViewModel = new StateViewModel(stateStore);

export const StateViewModelContext = React.createContext({
  model: stateViewModel,
});

export const StateViewModelContextProvider = ({ children }) => {
  return (
    <StateViewModelContext.Provider value={{ model: stateViewModel }}>
      {children}
    </StateViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useStateViewModel = () => React.useContext(StateViewModelContext);

/* HOC to inject store to any functional or class component */
export const withStateViewModel = (Component) => (props) => {
  return <Component {...props} {...useStateViewModel()} />;
};
