/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditTax from './TaxEdit';
import { TaxViewModelContextProvider } from './TaxViewModel/TaxViewModelContextProvider';

const EditTaxProvider = observer(
  class EditTaxProvider extends Component {
    render() {
      return (
        <TaxViewModelContextProvider>
          <EditTax />
        </TaxViewModelContextProvider>
      );
    }
  }
);
export default EditTaxProvider;
