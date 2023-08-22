import React from 'react';
import { observer } from 'mobx-react';
import { ShippingZoneViewModelContextProvider } from './ShippingZoneViewModel/ShippingZoneViewModelContextProvider';
import ListShippingZone from './ListShippingZone';

const ShippingZonePage = observer(
  class ShippingZonePage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <ShippingZoneViewModelContextProvider>
            <ListShippingZone />
          </ShippingZoneViewModelContextProvider>
        </div>
      );
    }
  }
);

export default ShippingZonePage;
