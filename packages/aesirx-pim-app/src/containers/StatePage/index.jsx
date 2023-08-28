import React from 'react';
import { observer } from 'mobx-react';
import { StateViewModelContextProvider } from './StateViewModel/StateViewModelContextProvider';
import ListState from './ListState';

const StatePage = observer(
  class StatePage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <StateViewModelContextProvider>
            <ListState />
          </StateViewModelContextProvider>
        </div>
      );
    }
  }
);

export default StatePage;
