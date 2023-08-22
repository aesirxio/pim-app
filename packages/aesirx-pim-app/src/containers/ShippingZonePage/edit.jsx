/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditShippingZone from './ShippingZoneEdit';
import { ShippingZoneViewModelContextProvider } from './ShippingZoneViewModel/ShippingZoneViewModelContextProvider';

const EditShippingZoneProvider = observer(
  class EditShippingZoneProvider extends Component {
    render() {
      return (
        <ShippingZoneViewModelContextProvider>
          <EditShippingZone />
        </ShippingZoneViewModelContextProvider>
      );
    }
  }
);
export default EditShippingZoneProvider;
