/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditShippingRate from './ShippingRateEdit';
import { ShippingRateViewModelContextProvider } from './ShippingRateViewModel/ShippingRateViewModelContextProvider';

const EditShippingRateProvider = observer(
  class EditShippingRateProvider extends Component {
    render() {
      return (
        <ShippingRateViewModelContextProvider>
          <EditShippingRate />
        </ShippingRateViewModelContextProvider>
      );
    }
  }
);
export default EditShippingRateProvider;
