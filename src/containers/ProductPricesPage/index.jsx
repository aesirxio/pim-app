import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { ProductPriceViewModelContextProvider } from './ProductPriceViewModel/ProductPriceViewModelContextProvider';
import ProductPriceStore from './ProductPriceStore/ProductPriceStore';
import ListProductPrice from './Component/ListProductPrice';
import ProductPriceListViewModel from './ProductPriceViewModel/ProductPriceListViewModel';

const productStore = new ProductPriceStore();
const productPriceViewModel = new ProductPriceListViewModel(productStore);

const ProductPrice = observer(
  class ProductPrice extends React.Component {
    render() {
      return (
        <div className="px-3 py-4">
          <ProductPriceViewModelContextProvider viewModel={productPriceViewModel}>
            <ListProductPrice />
          </ProductPriceViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation()(ProductPrice);
