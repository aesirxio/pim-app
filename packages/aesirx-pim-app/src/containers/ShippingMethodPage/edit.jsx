/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditShippingMethod from './ShippingMethodEdit';
import { ShippingMethodViewModelContextProvider } from './ShippingMethodViewModel/ShippingMethodViewModelContextProvider';

const EditShippingMethodProvider = observer(
  class EditShippingMethodProvider extends Component {
    render() {
      return (
        <ShippingMethodViewModelContextProvider>
          <EditShippingMethod />
        </ShippingMethodViewModelContextProvider>
      );
    }
  }
);
export default EditShippingMethodProvider;
