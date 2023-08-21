import React from 'react';
import { observer } from 'mobx-react';
import { FilteringFieldsetViewModelContextProvider } from './FilteringFieldsetViewModel/FilteringFieldsetViewModelContextProvider';
import ListFilteringFieldset from './ListFilteringFieldset';

const FilteringFieldsetPage = observer(
  class FilteringFieldsetPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <FilteringFieldsetViewModelContextProvider>
            <ListFilteringFieldset />
          </FilteringFieldsetViewModelContextProvider>
        </div>
      );
    }
  }
);

export default FilteringFieldsetPage;
