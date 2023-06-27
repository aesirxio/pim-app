import React from 'react';
import { observer } from 'mobx-react';
import { ProductFieldValueViewModelContextProvider } from './ProductFieldValueViewModel/ProductFieldValueViewModelContextProvider';
import ListProductFieldValue from './ListProductFieldValue';

const ProductFieldValuePage = observer(
  class ProductFieldValuePage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <ProductFieldValueViewModelContextProvider>
            <ListProductFieldValue />
          </ProductFieldValueViewModelContextProvider>
        </div>
      );
    }
  }
);

export default ProductFieldValuePage;
