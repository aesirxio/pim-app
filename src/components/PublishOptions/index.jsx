import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import UtilsStore from 'store/UtilsStore/UtilsStore';
import { observer } from 'mobx-react';
import { UtilsViewModelContextProvider } from 'store/UtilsStore/UtilsViewModelContextProvider';
import UtilsListViewModel from 'store/UtilsStore/UtilsListViewModel';
import PublishOptionsDetail from './PublishOptions';
const utilsStore = new UtilsStore();
const utilsListViewModel = new UtilsListViewModel(utilsStore);

const PublishOptions = observer(
  class PublishOptions extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <UtilsViewModelContextProvider viewModel={utilsListViewModel}>
          <PublishOptionsDetail {...this.props} />
        </UtilsViewModelContextProvider>
      );
    }
  }
);
export default withTranslation()(PublishOptions);
