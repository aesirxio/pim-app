/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { VariantViewModelContextProvider } from './VariantViewModel/VariantViewModelContextProvider';
import EditVariant from './VariantEdit';
import VariantStore from './VariantStore/VariantStore';
import VariantDetailViewModel from './VariantViewModel/VariantDetailViewModel';

const variantStore = new VariantStore();
const variantDetailViewModel = new VariantDetailViewModel(variantStore);

const EditVariantProvider = observer(
  class EditProductProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <VariantViewModelContextProvider viewModel={variantDetailViewModel}>
          <EditVariant />
        </VariantViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditVariantProvider);
