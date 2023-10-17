// import PieChart from 'components/PieChartComponent';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CategoryViewModelContextProvider } from './CategoryViewModel/CategoryViewModelContextProvider';
import ListCategories from './Component/ListCategories';

const CategoriesPage = observer(
  class CategoriesPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <CategoryViewModelContextProvider>
            <ListCategories />
          </CategoryViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation()(CategoriesPage);
