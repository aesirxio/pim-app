/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import DebtorGroupStore from 'containers/DebtorGroupPage/DebtorGroupStore/DebtorGroupStore';
import DebtorGroupViewModel from 'containers/DebtorGroupPage/DebtorGroupViewModel/DebtorGroupViewModel';
import { DebtorGroupViewModelContextProvider } from 'containers/DebtorGroupPage/DebtorGroupViewModel/DebtorGroupViewModelContextProvider';
import EditDebtorGroup from './DebtorGroupEdit';
const debtorGroupStore = new DebtorGroupStore();
const debtorGroupViewModel = new DebtorGroupViewModel(debtorGroupStore);

const EditDebtorGroupProvider = observer(
  class EditDebtorGroupProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <DebtorGroupViewModelContextProvider viewModel={debtorGroupViewModel}>
          <EditDebtorGroup />
        </DebtorGroupViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditDebtorGroupProvider);
