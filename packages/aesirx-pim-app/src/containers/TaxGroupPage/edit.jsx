/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditTaxGroup from './TaxGroupEdit';
import { TaxGroupViewModelContextProvider } from './TaxGroupViewModel/TaxGroupViewModelContextProvider';

const EditTaxGroupProvider = observer(
  class EditTaxGroupProvider extends Component {
    render() {
      return (
        <TaxGroupViewModelContextProvider>
          <EditTaxGroup />
        </TaxGroupViewModelContextProvider>
      );
    }
  }
);
export default EditTaxGroupProvider;
