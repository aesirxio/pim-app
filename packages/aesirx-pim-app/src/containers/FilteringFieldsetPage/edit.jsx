/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditFilteringFieldset from './FilteringFieldsetEdit';
import { FilteringFieldsetViewModelContextProvider } from './FilteringFieldsetViewModel/FilteringFieldsetViewModelContextProvider';

const EditFilteringFieldsetProvider = observer(
  class EditFilteringFieldsetProvider extends Component {
    render() {
      return (
        <FilteringFieldsetViewModelContextProvider>
          <EditFilteringFieldset />
        </FilteringFieldsetViewModelContextProvider>
      );
    }
  }
);
export default EditFilteringFieldsetProvider;
