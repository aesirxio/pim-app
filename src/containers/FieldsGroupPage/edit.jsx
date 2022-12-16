/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import FieldGroupStore from 'containers/FieldsGroupPage/FieldGroupStore/FieldGroupStore';
import FieldGroupViewModel from 'containers/FieldsGroupPage/FieldGroupViewModel/FieldGroupViewModel';
import { FieldGroupViewModelContextProvider } from 'containers/FieldsGroupPage/FieldGroupViewModel/FieldGroupViewModelContextProvider';
import EditFieldGroup from './FieldGroupEdit';
const fieldStore = new FieldGroupStore();
const fieldViewModel = new FieldGroupViewModel(fieldStore);

const EditFieldGroupProvider = observer(
  class EditFieldGroupProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <FieldGroupViewModelContextProvider viewModel={fieldViewModel}>
          <EditFieldGroup />
        </FieldGroupViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditFieldGroupProvider);
