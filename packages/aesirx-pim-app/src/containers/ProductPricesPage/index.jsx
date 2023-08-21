import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { ProductPriceViewModelContextProvider } from './ProductPriceViewModel/ProductPriceViewModelContextProvider';
import ListProductPrice from './Component/ListProductPrice';

const ProductPrice = observer(
  class ProductPrice extends React.Component {
    render() {
      return (
        <div className="px-3 py-4">
          <ProductPriceViewModelContextProvider>
            <ListProductPrice />
          </ProductPriceViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation()(ProductPrice);
