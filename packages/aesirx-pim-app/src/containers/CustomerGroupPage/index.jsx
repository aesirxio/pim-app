import React from 'react';
import { observer } from 'mobx-react';
import { CustomerGroupViewModelContextProvider } from './CustomerGroupViewModel/CustomerGroupViewModelContextProvider';
import ListCustomerGroup from './ListCustomerGroup';

const CustomerGroupPage = observer(
  class CustomerGroupPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <CustomerGroupViewModelContextProvider>
            <ListCustomerGroup />
          </CustomerGroupViewModelContextProvider>
        </div>
      );
    }
  }
);

export default CustomerGroupPage;
