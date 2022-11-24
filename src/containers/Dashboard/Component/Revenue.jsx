import Table from 'components/Table';
import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import numberWithCommas from 'utils/formatNumber';
const Revenue = ({ t, data = [] }) => {
  const columnsTable = React.useMemo(
    () => [
      {
        Header: 'TYPE',
        accessor: 'type',
        className: 'px-24 py-2 fs-12 opacity-50 border-bottom-1 ',
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: 'PERCENTAGE (%)',
        accessor: 'percent',
        className: 'py-2 fs-12 opacity-50 border-bottom-1 ',
        Cell: ({ value }) => {
          return (
            <div className="d-flex align-items-center">
              <ProgressBar className="w-100" variant="primary" now={value} />
              <span
                className={`${value > 50 ? 'text-success' : 'text-danger'} ms-1 fs-14 fw-semibold`}
              >
                {value}%
              </span>
            </div>
          );
        },
      },
      {
        Header: 'VALUE',
        accessor: 'value',
        className: 'px-24 py-2 fs-12 opacity-50 border-bottom-1 text-end',
        Cell: ({ value }) => {
          return <div className="text-end px-24">${numberWithCommas(value)}</div>;
        },
      },
    ],
    []
  );
  console.log(data);
  // const dataTable = React.useMemo(() => [...data], [data]);
  const dataTable = React.useMemo(
    () => [
      { type: 'Starter', percent: '66', value: '5240.85' },
      { type: 'Team', percent: '15.6', value: '2524' },
      { type: 'Growth', percent: '68', value: '7865.90' },
      { type: 'Enterprise', percent: '98.5', value: '12240.85' },
    ],
    []
  );

  return (
    <div className="py-2 bg-white rounded-3 shadow-sm h-100 overflow-hidden">
      <h2 className="py-16 px-24 mb-0 fs-4 fw-semibold text-blue-0">
        {t('txt_revenue_by_subscribers')}
      </h2>
      <div className="fs-14 fw-semibold h-100">
        <Table columns={columnsTable} data={dataTable}></Table>
      </div>
    </div>
  );
};
export default withTranslation('common')(Revenue);
