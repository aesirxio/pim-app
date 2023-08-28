import React from 'react';
import { observer } from 'mobx-react';
import { TaxGroupViewModelContextProvider } from './TaxGroupViewModel/TaxGroupViewModelContextProvider';
import ListTaxGroup from './ListTaxGroup';

const TaxGroupPage = observer(
  class TaxGroupPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <TaxGroupViewModelContextProvider>
            <ListTaxGroup />
          </TaxGroupViewModelContextProvider>
        </div>
      );
    }
  }
);

export default TaxGroupPage;
