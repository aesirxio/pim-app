/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditSubType from './SubTypeEdit';
import { SubTypeViewModelContextProvider } from './SubTypeViewModel/SubTypeViewModelContextProvider';

const EditSubTypeProvider = observer(
  class EditSubTypeProvider extends Component {
    render() {
      return (
        <SubTypeViewModelContextProvider>
          <EditSubType />
        </SubTypeViewModelContextProvider>
      );
    }
  }
);
export default EditSubTypeProvider;
