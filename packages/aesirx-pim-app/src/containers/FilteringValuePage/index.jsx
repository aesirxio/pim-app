import React from 'react';
import { observer } from 'mobx-react';
import { FilteringValueViewModelContextProvider } from './FilteringValueViewModel/FilteringValueViewModelContextProvider';
import ListFilteringValue from './ListFilteringValue';

const FilteringValuePage = observer(
  class FilteringValuePage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <FilteringValueViewModelContextProvider>
            <ListFilteringValue />
          </FilteringValueViewModelContextProvider>
        </div>
      );
    }
  }
);

export default FilteringValuePage;
