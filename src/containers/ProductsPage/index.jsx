// import PieChart from 'components/PieChartComponent';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import ProductStore from './ProductStore/ProductStore';
import ListProductsViewModel from './ProductViewModel/ListProductsViewModel';
import { ProductViewModelContextProvider } from './ProductViewModel/ProductViewModelContextProvider';
import List from './Component/List';

const productStore = new ProductStore();
const listProductsViewModel = new ListProductsViewModel(productStore);

const ProductsPage = observer(
  class ProductsPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { t } = this.props;
      return (
        <div className="px-3 py-4">
          <h2 className="fw-bold mb-3">{t('txt_title_product_management')}</h2>
          <ProductViewModelContextProvider viewModel={listProductsViewModel}>
            <List />
          </ProductViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(ProductsPage);
