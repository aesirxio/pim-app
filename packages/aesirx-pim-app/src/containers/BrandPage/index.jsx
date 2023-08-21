import React from 'react';
import { observer } from 'mobx-react';
import { BrandViewModelContextProvider } from './BrandViewModel/BrandViewModelContextProvider';
import ListBrand from './ListBrand';

const BrandPage = observer(
  class BrandPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <BrandViewModelContextProvider>
            <ListBrand />
          </BrandViewModelContextProvider>
        </div>
      );
    }
  }
);

export default BrandPage;
