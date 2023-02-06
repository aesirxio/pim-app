import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import FieldStore from 'containers/FieldsPage/FieldStore/FieldStore';
import FieldViewModel from 'containers/FieldsPage/FieldViewModel/FieldViewModel';
import { observer } from 'mobx-react';
import { FieldViewModelContextProvider } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';

import FieldsList from 'components/Fields';

const fieldStore = new FieldStore();
const fieldViewModel = new FieldViewModel(fieldStore);
const FieldsTab = observer(
  class FieldsTab extends Component {
    groupList = [];
    constructor(props) {
      super(props);
      this.fieldListViewModel = fieldViewModel ? fieldViewModel.getFieldListViewModel() : null;
      this.state = {
        defaultActive: '',
      };
    }

    render() {
      const { detailViewModal, formPropsData, validator } = this.props;
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          <FieldViewModelContextProvider viewModel={fieldViewModel}>
            <FieldsList
              detailViewModal={detailViewModal}
              formPropsData={formPropsData}
              validator={validator}
              fieldClass={'col-lg-6'}
              requiredField={this.props.requiredField}
              typeId={59}
              fieldByGroup={true}
            />
          </FieldViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(FieldsTab);
