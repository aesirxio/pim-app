/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditBrand from './BrandEdit';
import { BrandViewModelContextProvider } from './BrandViewModel/BrandViewModelContextProvider';

const EditBrandProvider = observer(
  class EditBrandProvider extends Component {
    render() {
      return (
        <BrandViewModelContextProvider>
          <EditBrand />
        </BrandViewModelContextProvider>
      );
    }
  }
);
export default EditBrandProvider;
