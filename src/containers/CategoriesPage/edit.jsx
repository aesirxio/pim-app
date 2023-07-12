/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Spinner } from 'aesirx-uikit';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { CategoryViewModelContextProvider } from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModelContextProvider';
import EditCategory from './CategoryEdit';

const EditCategoryProvider = observer(
  class EditCategoryProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <CategoryViewModelContextProvider>
          <EditCategory />
        </CategoryViewModelContextProvider>
      );
    }
  }
);
export default withTranslation()(EditCategoryProvider);
