// import PieChart from 'components/PieChartComponent';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CategoryViewModelContextProvider } from './CategoryViewModel/CategoryViewModelContextProvider';
import CategoryStore from './CategoryStore/CategoryStore';
import CategoryListViewModel from './CategoryViewModel/CategoryListViewModel';
import ListCategories from './Component/ListCategories';

const categoryStore = new CategoryStore();
const categoryListViewModel = new CategoryListViewModel(categoryStore);

const CategoriesPage = observer(
  class CategoriesPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <CategoryViewModelContextProvider viewModel={categoryListViewModel}>
            <ListCategories />
          </CategoryViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(CategoriesPage);
