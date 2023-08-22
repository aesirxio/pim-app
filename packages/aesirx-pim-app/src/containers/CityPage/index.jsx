import React from 'react';
import { observer } from 'mobx-react';
import { CityViewModelContextProvider } from './CityViewModel/CityViewModelContextProvider';
import ListCity from './ListCity';

const CityPage = observer(
  class CityPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <CityViewModelContextProvider>
            <ListCity />
          </CityViewModelContextProvider>
        </div>
      );
    }
  }
);

export default CityPage;
