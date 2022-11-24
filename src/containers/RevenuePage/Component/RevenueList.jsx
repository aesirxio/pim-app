import React from 'react';
import Table from 'components/Table';
import { withTranslation } from 'react-i18next';
import ComponentFilter from 'components/ComponentFilter';

const RevenueList = ({ ...props }) => {
  const { t } = props;
  const columnsTable = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        className: 'py-2 fs-12 opacity-50 border-bottom-1 text-uppercase ',
      },
      {
        Header: t('txt_name'),
        accessor: 'name',
        className: 'py-2 fs-12 opacity-50 border-bottom-1 text-uppercase ',
      },
      {
        Header: t('txt_email'),
        accessor: 'email',
        className: 'py-2 fs-12 opacity-50 border-bottom-1 text-uppercase ',
      },
      {
        Header: t('txt_date'),
        accessor: 'date',
        className: 'py-2 fs-12 opacity-50 border-bottom-1 text-uppercase',
      },
      {
        Header: t('txt_value'),
        accessor: 'value',
        className: 'py-2 fs-12 opacity-50 border-bottom-1 text-uppercase',
        Cell: ({ value }) => {
          return <div className="fw-bold">{value}</div>;
        },
      },
      {
        Header: t('txt_description'),
        accessor: 'description',
        className: 'py-2 fs-12 opacity-50 border-bottom-1 text-uppercase',
        Cell: ({ value }) => {
          return <div className="fw-bold">{value}</div>;
        },
      },
      {
        Header: t('txt_Status'),
        accessor: 'status',
        className: 'px-24 py-2 fs-12 opacity-50 border-bottom-1 text-uppercase text-end',
        Cell: ({ value }) => {
          let color = value === 'Active' ? '#3EAD8A' : '#F59E0B';
          let backgroundColor = value === 'Active' ? '#D0F4E8' : '#FFEAC8';
          return (
            <div className="text-end px-24">
              <span
                className="px-1 py-sm rounded-pill fs-12"
                style={{ backgroundColor: backgroundColor }}
              >
                <span style={{ color: color }}>{value}</span>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  const dataTable = React.useMemo(
    () => [
      {
        id: '#123121',
        name: 'Babila Ebwéléawdawdaw',
        email: 'babila@gmail.com',
        date: '2022-10-07',
        status: 'Active',
        value: '$49',
        description: 'Starter',
      },
      {
        id: '#123122',
        name: 'Brijamohan Mallick',
        email: 'brijamohan@gmail.com',
        date: '2022-10-02',
        status: 'Active',
        value: '$1000',
        description: 'Enterprise',
      },
      {
        id: '#123123',
        name: 'Babila Ebwélé231a',
        email: 'babila@gmail.com',
        date: '2022-10-04',
        status: 'Active',
        value: '$49',
        description: 'Starter',
      },
      {
        id: '#123124',
        name: 'Brijamohan Mallick',
        email: 'brijamohan@gmail.com',
        date: '2022-10-07',
        status: 'Waiting',
        value: '$99',
        description: 'Team',
      },
      {
        id: '#123125',
        name: 'Babila Ebwélé',
        email: 'babila@gmail.com',
        date: '2022-10-07',
        status: 'Active',
        value: '$1000',
        description: 'Enterprise',
      },
      {
        id: '#123127',
        name: 'Brijamohan Mallick',
        email: 'brijamohan@gmail.com',
        date: '2022-10-07',
        status: 'Active',
        value: '$49',
        description: 'Starter',
      },
    ],
    []
  );
  return (
    <>
      <ComponentFilter isSearch isAction isDate />
      <Table columns={columnsTable} data={dataTable} selection={false}></Table>
    </>
  );
};

export default withTranslation('common')(RevenueList);
