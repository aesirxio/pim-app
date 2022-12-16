/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import CategoryStore from 'containers/CategoriesPage/CategoryStore/CategoryStore';
import CategoryViewModel from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModel';
import { CategoryViewModelContextProvider } from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModelContextProvider';
import EditCategory from './CategoryEdit';
const categoryStore = new CategoryStore();
const categoryViewModel = new CategoryViewModel(categoryStore);

const EditCategoryProvider = observer(
  class EditCategoryProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <CategoryViewModelContextProvider viewModel={categoryViewModel}>
          <EditCategory />
        </CategoryViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditCategoryProvider);
