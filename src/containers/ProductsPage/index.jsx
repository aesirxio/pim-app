// import PieChart from 'components/PieChartComponent';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import ProductStore from './ProductStore/ProductStore';
import ProductListViewModel from './ProductViewModel/ProductListViewModel';
import { ProductViewModelContextProvider } from './ProductViewModel/ProductViewModelContextProvider';
import List from './Component/List';

const productStore = new ProductStore();
const productListViewModel = new ProductListViewModel(productStore);

const ProductsPage = observer(
  class ProductsPage extends React.Component {
    formPropsData=null;
    constructor(props) {
      super(props);
    }

    render() {
      const { t } = this.props;
      return (
        <div className="px-3 py-4">
          <h2 className="fw-bold mb-3">{t('txt_title_product_management')}</h2>
          <ProductViewModelContextProvider viewModel={productListViewModel}>
            <List />
          </ProductViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(ProductsPage);
