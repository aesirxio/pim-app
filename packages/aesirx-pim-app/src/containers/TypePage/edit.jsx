/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditType from './TypeEdit';
import { TypeViewModelContextProvider } from './TypeViewModel/TypeViewModelContextProvider';

const EditTypeProvider = observer(
  class EditTypeProvider extends Component {
    render() {
      return (
        <TypeViewModelContextProvider>
          <EditType />
        </TypeViewModelContextProvider>
      );
    }
  }
);
export default EditTypeProvider;
