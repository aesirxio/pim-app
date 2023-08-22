import React from 'react';
import { observer } from 'mobx-react';
import { TaxViewModelContextProvider } from './TaxViewModel/TaxViewModelContextProvider';
import ListTax from './ListTax';

const TaxPage = observer(
  class TaxPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <TaxViewModelContextProvider>
            <ListTax />
          </TaxViewModelContextProvider>
        </div>
      );
    }
  }
);

export default TaxPage;
