import React from 'react';
import { useTranslation } from 'react-i18next';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { observer } from 'mobx-react';

const Search = observer(() => {
  const { t } = useTranslation('common');

  const [isLoading, setIsLoading] = useState(false);
  // const [options, setOptions] = useState([]);
  const options = [];
  const handleSearch = async () => {
    setIsLoading(true);

    try {
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleChange = () => {};

  const handleKeyDown = () => {};
  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <div className="input-group d-flex mb-0 pe-2 wr_input_search bg-gray-100">
      <button
        type="button"
        id="button-search"
        className="btn btn_search border-0 col-auto text-green"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>

      <AsyncTypeahead
        filterBy={filterBy}
        id="async-search"
        isLoading={isLoading}
        labelKey="name"
        minLength={1}
        onSearch={handleSearch}
        options={options}
        className="col bg-gray-100"
        inputProps={{
          className: 'border-0 w-100 shadow-none bg-gray-100',
        }}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={t('txt_search_all_content')}
        renderMenuItemChildren={(option) => (
          <>
            <span>{option.name}</span>
          </>
        )}
      />
    </div>
  );
});

export default Search;
