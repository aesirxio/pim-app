import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { DebtorGroupViewModelContextProvider } from './DebtorGroupViewModel/DebtorGroupViewModelContextProvider';
import DebtorGroupStore from 'containers/DebtorGroupPage/DebtorGroupStore/DebtorGroupStore';
import DebtorGroupListViewModel from 'containers/DebtorGroupPage/DebtorGroupViewModel/DebtorGroupListViewModel';
import ListDebtorGroup from './Component/ListDebtorGroup';

const debtorGroupStore = new DebtorGroupStore();
const debtorGroupListViewModel = new DebtorGroupListViewModel(debtorGroupStore);

const DebtorGroupPage = observer(
  class FieldPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <DebtorGroupViewModelContextProvider viewModel={debtorGroupListViewModel}>
            <ListDebtorGroup />
          </DebtorGroupViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(DebtorGroupPage);
