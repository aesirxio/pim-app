import React from 'react';
import { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import SelectComponent from 'components/Select';
import { withTranslation } from 'react-i18next';

const HeaderFilterComponent = ({
  chartTitle,
  isSelection,
  viewMoreLink,
  filterButtons,
  ...props
}) => {
  const [view, setView] = useState('days');
  const { t } = props;
  return (
    <div className="d-flex justify-content-between mb-24">
      <div className="d-flex align-items-center">
        <h4 className="me-24 mb-0 text-blue-0">{chartTitle}</h4>
        {isSelection && (
          <SelectComponent
            defaultValue={{ label: 'Session', value: 'session' }}
            options={[
              { label: 'Session', value: 'session' },
              { label: 'Localhost', value: 'localhost' },
            ]}
            className={`fs-sm`}
            isBorder={true}
            plColor={'#808495'}
          />
        )}
      </div>
      {viewMoreLink && (
        <a href={viewMoreLink} className="fs-14 text-body">
          <span className="pe-1 text-color">{t('txt_view_detail')}</span>
          <span
            className="icon arrow d-inline-block align-text-bottom ms-auto bg-success"
            style={{
              WebkitMaskImage: `url(/assets/images/arrow-right.svg)`,
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              width: '10px',
              height: '16px',
            }}
          ></span>
        </a>
      )}
      {filterButtons && (
        <ButtonGroup>
          {/* <Button
            onClick={() => setView('hours')}
            className={`${view == 'hours' && 'text-white'} py-1 px-15 fs-12 lh-sm shadow-none`}
            variant={view == 'hours' ? 'dark' : 'outline-secondary'}
          >
            {t('txt_hours')}
          </Button> */}
          <Button
            onClick={() => setView('days')}
            className={`${view == 'days' && 'text-white'} py-1 px-15 fs-12 lh-sm shadow-none`}
            variant={view == 'days' ? 'dark' : 'outline-secondary'}
          >
            {t('txt_days')}
          </Button>
          {/* <Button
            onClick={() => setView('weeks')}
            className={`${view == 'weeks' && 'text-white'} py-1 px-15 fs-12 lh-sm shadow-none`}
            variant={view == 'weeks' ? 'dark' : 'outline-secondary'}
          >
            {t('txt_weeks')}
          </Button>
          <Button
            onClick={() => setView('months')}
            className={`${view == 'months' && 'text-white'} py-1 px-15 fs-12 lh-sm shadow-none`}
            variant={view == 'months' ? 'dark' : 'outline-secondary'}
          >
            {t('txt_months')}
          </Button> */}
        </ButtonGroup>
      )}
    </div>
  );
};

export default withTranslation('common')(HeaderFilterComponent);
