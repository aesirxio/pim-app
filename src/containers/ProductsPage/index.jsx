import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import ProductStore from './ProductStore/ProductStore';
import ProductListViewModel from './ProductViewModel/ProductListViewModel';
import { ProductViewModelContextProvider } from './ProductViewModel/ProductViewModelContextProvider';
import ListProducts from './Component/ListProducts';

const productStore = new ProductStore();
const productListViewModel = new ProductListViewModel(productStore);

const ProductsPage = observer(
  class ProductsPage extends React.Component {
    formPropsData = null;
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <ProductViewModelContextProvider viewModel={productListViewModel}>
            <ListProducts />
          </ProductViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(ProductsPage);
