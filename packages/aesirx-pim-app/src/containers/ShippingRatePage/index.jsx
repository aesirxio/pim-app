import React from 'react';
import { observer } from 'mobx-react';
import { ShippingRateViewModelContextProvider } from './ShippingRateViewModel/ShippingRateViewModelContextProvider';
import ListShippingRate from './ListShippingRate';

const ShippingRatePage = observer(
  class ShippingRatePage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <ShippingRateViewModelContextProvider>
            <ListShippingRate />
          </ShippingRateViewModelContextProvider>
        </div>
      );
    }
  }
);

export default ShippingRatePage;
