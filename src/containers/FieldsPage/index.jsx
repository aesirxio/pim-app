import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import FieldStore from 'containers/FieldsPage/FieldStore/FieldStore';
import ListFields from './Component/ListFields';
import FieldListViewModel from './FieldViewModel/FieldListViewModel';
import { FieldViewModelContextProvider } from './FieldViewModel/FieldViewModelContextProvider';

const fieldStore = new FieldStore();
const fieldListViewModel = new FieldListViewModel(fieldStore);

const FieldsPage = observer(
  class FieldPage extends React.Component {
    
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <FieldViewModelContextProvider viewModel={fieldListViewModel}>
            <ListFields />
          </FieldViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(FieldsPage);
