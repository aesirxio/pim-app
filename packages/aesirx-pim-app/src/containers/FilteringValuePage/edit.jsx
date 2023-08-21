/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditFilteringValue from './FilteringValueEdit';
import { FilteringValueViewModelContextProvider } from './FilteringValueViewModel/FilteringValueViewModelContextProvider';

const EditFilteringValueProvider = observer(
  class EditFilteringValueProvider extends Component {
    render() {
      return (
        <FilteringValueViewModelContextProvider>
          <EditFilteringValue />
        </FilteringValueViewModelContextProvider>
      );
    }
  }
);
export default EditFilteringValueProvider;
