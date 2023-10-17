import React from 'react';
import { observer } from 'mobx-react';
import { CountryViewModelContextProvider } from './CountryViewModel/CountryViewModelContextProvider';
import ListCountry from './ListCountry';

const CountryPage = observer(
  class CountryPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <CountryViewModelContextProvider>
            <ListCountry />
          </CountryViewModelContextProvider>
        </div>
      );
    }
  }
);

export default CountryPage;
