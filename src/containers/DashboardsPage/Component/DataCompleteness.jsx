import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
const DataCompleteness = ({ t }) => {
  const dataCompleteness = [
    {
      name: 'PRODUCT',
      value: '70',
    },
    {
      name: 'BRANDS',
      value: '58',
    },
    {
      name: 'CATEGORIES',
      value: '65',
    },
  ];

  return (
    <div className="p-24 bg-white rounded-3 shadow-sm h-100">
      <h5 className="fw-bold text-blue-0 text-uppercase fs-6 mb-24">
        {t('txt_overall_data_completeness')}
      </h5>
      {dataCompleteness.map((item, key) => {
        return (
          <div key={key} className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-8px">
              <span className="fs-sm text-uppercase">{item.name}</span>
              <span className="fs-sm text-uppercase">{item.value}%</span>
            </div>
            <ProgressBar className="w-100" variant="green" now={item.value} />
          </div>
        );
      })}
    </div>
  );
};
export default withTranslation('common')(DataCompleteness);
