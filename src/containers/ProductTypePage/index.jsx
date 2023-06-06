import React from 'react';
import { observer } from 'mobx-react';
import { ProductTypeViewModelContextProvider } from './ProductTypeViewModel/ProductTypeViewModelContextProvider';
import ListProductType from './ListProductType';

const ProductTypePage = observer(
  class ProductTypePage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <ProductTypeViewModelContextProvider>
            <ListProductType />
          </ProductTypeViewModelContextProvider>
        </div>
      );
    }
  }
);

export default ProductTypePage;
