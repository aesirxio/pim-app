/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { TypeStore } from '../store';
import TypeViewModel from './TypeViewModel';

const typeStore = new TypeStore();
const typeViewModel = new TypeViewModel(typeStore);

export const TypeViewModelContext = React.createContext({
  model: typeViewModel,
});

export const TypeViewModelContextProvider = ({ children }) => {
  return (
    <TypeViewModelContext.Provider value={{ model: typeViewModel }}>
      {children}
    </TypeViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useTypeViewModel = () => React.useContext(TypeViewModelContext);

/* HOC to inject store to any functional or class component */
export const withTypeViewModel = (Component) => (props) => {
  return <Component {...props} {...useTypeViewModel()} />;
};
