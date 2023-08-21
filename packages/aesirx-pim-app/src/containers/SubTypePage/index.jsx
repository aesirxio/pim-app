import React from 'react';
import { observer } from 'mobx-react';
import { SubTypeViewModelContextProvider } from './SubTypeViewModel/SubTypeViewModelContextProvider';
import ListSubType from './ListSubType';

const SubTypePage = observer(
  class SubTypePage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <SubTypeViewModelContextProvider>
            <ListSubType />
          </SubTypeViewModelContextProvider>
        </div>
      );
    }
  }
);

export default SubTypePage;
