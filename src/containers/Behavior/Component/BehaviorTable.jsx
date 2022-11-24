import Table from 'components/Table';
import React from 'react';
import { withTranslation } from 'react-i18next';
const BehaviorTable = () => {
  const columnsTable = React.useMemo(
    () => [
      {
        Header: 'Campaign',
        accessor: 'campagin-parent',
        className: 'px-3 py-16 fs-sm fw-semibold bg-gray-700 rounded-top-start-3',
        rowSpan: '2',
        columns: [
          {
            Header: '',
            accessor: 'campagin',
            className: 'd-none',
          },
        ],
      },
      {
        Header: 'Behavior',
        className: 'px-3 py-16 fs-sm fw-semibold bg-gray-500',
        columns: [
          {
            Header: 'Bounce Rate',
            accessor: 'bounceRate',
            className: 'px-3 py-16 fs-sm fw-semibold bg-gray-400',
          },
          {
            Header: 'Pages/Session',
            accessor: 'pagesSession',
            className: 'px-3 py-16 fs-sm fw-semibold bg-gray-300',
          },
          {
            Header: 'Avg. Session Duration',
            accessor: 'avgSessionDuration',
            className: 'px-3 py-16 fs-sm fw-semibold bg-gray-300',
          },
        ],
      },
      {
        Header: 'Conversion Rate',
        className: 'px-3 py-16 fs-sm fw-semibold bg-gray-400  rounded-top-end-3',
        columns: [
          {
            Header: 'Goal Conversion Rate',
            accessor: 'goalConversion',
            className: 'px-3 py-16 fs-sm fw-semibold bg-gray-200',
          },
          {
            Header: 'Goal Complement',
            accessor: 'goalComplement',
            className: 'px-3 py-16 fs-sm fw-semibold bg-gray-200',
          },
        ],
      },
    ],
    []
  );
  const dataTable = React.useMemo(
    () => [
      {
        campagin: 'UTM 1',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
      {
        campagin: 'UTM 2',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
      {
        campagin: 'UTM 3',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
      {
        campagin: 'UTM 4',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
      {
        campagin: 'UTM 5',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
      {
        campagin: 'UTM 6',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
      {
        campagin: 'UTM 7',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
      {
        campagin: 'UTM 8',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
      {
        campagin: 'UTM 9',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
      {
        campagin: 'UTM 10',
        bounceRate: '66.24%',
        pagesSession: '1.87',
        avgSessionDuration: '00:10:32',
        goalConversion: '12.80%',
        goalComplement: '12',
      },
    ],
    []
  );
  return (
    <div className="bg-white rounded-3 shadow-sm h-100">
      <div className="fs-14">
        <Table
          classNameTable={'text-center mb-0'}
          columns={columnsTable}
          data={dataTable}
          canSort={true}
        ></Table>
      </div>
    </div>
  );
};
export default withTranslation('common')(BehaviorTable);
