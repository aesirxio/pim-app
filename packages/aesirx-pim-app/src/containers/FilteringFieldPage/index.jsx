import React from 'react';
import { observer } from 'mobx-react';
import { FilteringFieldViewModelContextProvider } from './FilteringFieldViewModel/FilteringFieldViewModelContextProvider';
import ListFilteringField from './ListFilteringField';

const FilteringFieldPage = observer(
  class FilteringFieldPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <FilteringFieldViewModelContextProvider>
            <ListFilteringField />
          </FilteringFieldViewModelContextProvider>
        </div>
      );
    }
  }
);

export default FilteringFieldPage;
