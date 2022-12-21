/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import FieldGroupStore from 'containers/FieldsGroupPage/FieldGroupStore/FieldGroupStore';
import FieldGroupListViewModel from './FieldGroupViewModel/FieldGroupListViewModel';
import ListFieldsGroup from './Component/ListFieldsGroup';
import { FieldGroupViewModelContextProvider } from './FieldGroupViewModel/FieldGroupViewModelContextProvider';
const fieldGroupStore = new FieldGroupStore();
const fieldGroupListViewModel = new FieldGroupListViewModel(fieldGroupStore);

const FieldsGroupPage = observer(
  class FieldsGroupPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <FieldGroupViewModelContextProvider viewModel={fieldGroupListViewModel}>
            <ListFieldsGroup />
          </FieldGroupViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(FieldsGroupPage);
