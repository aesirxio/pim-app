/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditFilteringField from './FilteringFieldEdit';
import { FilteringFieldViewModelContextProvider } from './FilteringFieldViewModel/FilteringFieldViewModelContextProvider';

const EditFilteringFieldProvider = observer(
  class EditFilteringFieldProvider extends Component {
    render() {
      return (
        <FilteringFieldViewModelContextProvider>
          <EditFilteringField />
        </FilteringFieldViewModelContextProvider>
      );
    }
  }
);
export default EditFilteringFieldProvider;
