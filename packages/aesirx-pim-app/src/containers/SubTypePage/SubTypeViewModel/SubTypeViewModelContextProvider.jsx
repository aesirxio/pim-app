/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { SubTypeStore } from '../store';
import SubTypeViewModel from './SubTypeViewModel';

const subTypeStore = new SubTypeStore();
const subTypeViewModel = new SubTypeViewModel(subTypeStore);

export const SubTypeViewModelContext = React.createContext({
  model: subTypeViewModel,
});

export const SubTypeViewModelContextProvider = ({ children }) => {
  return (
    <SubTypeViewModelContext.Provider value={{ model: subTypeViewModel }}>
      {children}
    </SubTypeViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useSubTypeViewModel = () => React.useContext(SubTypeViewModelContext);

/* HOC to inject store to any functional or class component */
export const withSubTypeViewModel = (Component) => (props) => {
  return <Component {...props} {...useSubTypeViewModel()} />;
};
