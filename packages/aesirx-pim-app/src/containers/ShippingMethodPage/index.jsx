import React from 'react';
import { observer } from 'mobx-react';
import { ShippingMethodViewModelContextProvider } from './ShippingMethodViewModel/ShippingMethodViewModelContextProvider';
import ListShippingMethod from './ListShippingMethod';

const ShippingMethodPage = observer(
  class ShippingMethodPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <ShippingMethodViewModelContextProvider>
            <ListShippingMethod />
          </ShippingMethodViewModelContextProvider>
        </div>
      );
    }
  }
);

export default ShippingMethodPage;
