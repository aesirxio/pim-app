import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { ProductPricesViewModelContextProvider } from './productPricesViewModel/ProductPricesViewModelContextProvider';
import ProductPricesStore from './productPricesStore/ProductPricesStore';
import ProductPricesViewModel from './productPricesViewModel/ProductPricesViewModel';
import ListProductPrices from './Component/ListProductPrices';


const productStore = new ProductPricesStore();
const productPricesViewModel = new ProductPricesViewModel(productStore);

const ProductPrices = observer(
  class ProductPrices extends React.Component {
    render() {
      return (
        <div className="px-3 py-4">
          <ProductPricesViewModelContextProvider viewModel={productPricesViewModel}>
            <ListProductPrices />
          </ProductPricesViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(ProductPrices);
