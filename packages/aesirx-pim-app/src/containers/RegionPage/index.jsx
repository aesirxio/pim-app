import React from 'react';
import { observer } from 'mobx-react';
import { RegionViewModelContextProvider } from './RegionViewModel/RegionViewModelContextProvider';
import ListRegion from './ListRegion';

const RegionPage = observer(
  class RegionPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <RegionViewModelContextProvider>
            <ListRegion />
          </RegionViewModelContextProvider>
        </div>
      );
    }
  }
);

export default RegionPage;
