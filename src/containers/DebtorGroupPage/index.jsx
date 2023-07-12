import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { DebtorGroupViewModelContextProvider } from './DebtorGroupViewModel/DebtorGroupViewModelContextProvider';
import ListDebtorGroup from './Component/ListDebtorGroup';

const DebtorGroupPage = observer(
  class FieldPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <DebtorGroupViewModelContextProvider>
            <ListDebtorGroup />
          </DebtorGroupViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation()(DebtorGroupPage);
