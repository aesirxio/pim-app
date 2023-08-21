/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { BrandStore } from '../store';
import BrandViewModel from './BrandViewModel';

const brandStore = new BrandStore();
const brandViewModel = new BrandViewModel(brandStore);

export const BrandViewModelContext = React.createContext({
  model: brandViewModel,
});

export const BrandViewModelContextProvider = ({ children }) => {
  return (
    <BrandViewModelContext.Provider value={{ model: brandViewModel }}>
      {children}
    </BrandViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useBrandViewModel = () => React.useContext(BrandViewModelContext);

/* HOC to inject store to any functional or class component */
export const withBrandViewModel = (Component) => (props) => {
  return <Component {...props} {...useBrandViewModel()} />;
};
