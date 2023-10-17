import React from 'react';
import { observer } from 'mobx-react';
import { TypeViewModelContextProvider } from './TypeViewModel/TypeViewModelContextProvider';
import ListType from './ListType';

const TypePage = observer(
  class TypePage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <TypeViewModelContextProvider>
            <ListType />
          </TypeViewModelContextProvider>
        </div>
      );
    }
  }
);

export default TypePage;
