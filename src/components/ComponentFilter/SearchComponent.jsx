import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';

function SearchComponent({ ...props }) {
  const [, setValue] = useState('');
  const { t } = props;

  return (
    <span className=" d-flex align-items-center position-relative pe-3 border-end-1 w-400">
      <input
        placeholder={t('txt_search')}
        onChange={setValue}
        className="form-control border-end-0 pe-2 border-0 pe-4 fs-14 text-color"
      />
      <i className="text-green position-absolute top-0 bottom-0 end-0 pe-24 d-flex align-items-center">
        <FontAwesomeIcon icon={faSearch} />
      </i>
    </span>
  );
}

export default withTranslation('common')(SearchComponent);
