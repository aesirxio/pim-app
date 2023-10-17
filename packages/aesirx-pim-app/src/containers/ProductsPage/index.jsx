import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { ProductViewModelContextProvider } from './ProductViewModel/ProductViewModelContextProvider';
import ListProducts from './Component/ListProducts';

const ProductsPage = observer(
  class ProductsPage extends React.Component {
    formPropsData = null;
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <ProductViewModelContextProvider>
            <ListProducts />
          </ProductViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation()(ProductsPage);
