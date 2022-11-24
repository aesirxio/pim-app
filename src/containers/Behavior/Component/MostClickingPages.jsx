import HeaderFilterComponent from 'components/HeaderFilterComponent';
import Table from 'components/Table';
import React from 'react';
import { withTranslation } from 'react-i18next';
const MostClickingPages = (props) => {
  const columnsTable = React.useMemo(
    () => [
      {
        Header: 'PAGE',
        accessor: 'page',
        className: 'py-1 fs-sm opacity-50 border-bottom-1',
        Cell: ({ value }) => {
          return <div className="opacity-80">{value}</div>;
        },
      },
      {
        Header: 'PAGEVIEW',
        accessor: 'pageView',
        className: 'py-1 fs-sm opacity-50 border-bottom-1',
        Cell: ({ value }) => {
          return <div className="opacity-80">{value}</div>;
        },
      },
      {
        Header: 'AVG. TIME ON PAGE',
        accessor: 'avgTime',
        className: 'py-1 fs-sm opacity-50 border-bottom-1 text-end',
        Cell: ({ value }) => {
          return <div className="text-end opacity-80">{value}</div>;
        },
      },
    ],
    []
  );
  const dataTable = React.useMemo(
    () => [
      {
        page: '/package.html',
        pageView: '66.845',
        avgTime: '00:10:32',
      },
      {
        page: '/package.html',
        pageView: '66.845',
        avgTime: '00:10:32',
      },
      {
        page: '/package.html',
        pageView: '66.845',
        avgTime: '00:10:32',
      },
      {
        page: '/package.html',
        pageView: '66.845',
        avgTime: '00:10:32',
      },
      {
        page: '/package.html',
        pageView: '66.845',
        avgTime: '00:10:32',
      },
    ],
    []
  );
  const { t } = props;
  return (
    <div className="bg-white rounded-3 shadow-sm h-100 py-3 px-24">
      <HeaderFilterComponent chartTitle={t('txt_most_clingking_pages')} filterButtons={true} />
      <div className="fs-14">
        <Table columns={columnsTable} data={dataTable}></Table>
      </div>
    </div>
  );
};
export default withTranslation('common')(MostClickingPages);
