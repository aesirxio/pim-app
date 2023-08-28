/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditCustomerGroup from './CustomerGroupEdit';
import { CustomerGroupViewModelContextProvider } from './CustomerGroupViewModel/CustomerGroupViewModelContextProvider';

const EditCustomerGroupProvider = observer(
  class EditCustomerGroupProvider extends Component {
    render() {
      return (
        <CustomerGroupViewModelContextProvider>
          <EditCustomerGroup />
        </CustomerGroupViewModelContextProvider>
      );
    }
  }
);
export default EditCustomerGroupProvider;
