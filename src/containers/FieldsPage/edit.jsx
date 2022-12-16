/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import FieldStore from 'containers/FieldsPage/FieldStore/FieldStore';
import FieldViewModel from 'containers/FieldsPage/FieldViewModel/FieldViewModel';
import { FieldViewModelContextProvider } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import EditField from './FieldEdit';
const fieldStore = new FieldStore();
const fieldViewModel = new FieldViewModel(fieldStore);

const EditFieldProvider = observer(
  class EditFieldProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <FieldViewModelContextProvider viewModel={fieldViewModel}>
          <EditField />
        </FieldViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditFieldProvider);
