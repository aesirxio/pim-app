import Table from 'components/Table';
import React from 'react';
import { withTranslation } from 'react-i18next';
const RegisteredUser = ({ t, data = [] }) => {
  const columnsTable = React.useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: 'name',
        className: 'px-24 py-2 fs-12 opacity-50 border-bottom-1 ',
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: 'EMAIL',
        accessor: 'email',
        className: 'py-2 fs-12 opacity-50 border-bottom-1 ',
      },
      {
        Header: 'DATE',
        accessor: 'date',
        className: 'py-2 fs-12 opacity-50 border-bottom-1',
        Cell: ({ value }) => {
          return <div>{value}</div>;
        },
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        className: 'px-24 py-2 fs-12 opacity-50 border-bottom-1 text-end',
        Cell: ({ value }) => {
          let color = value === 'active' ? '#3EAD8A' : '#F59E0B';
          let backgroundColor = value === 'active' ? '#D0F4E8' : '#FFEAC8';
          return (
            <div className="px-24 text-end">
              <span
                className="px-1 py-sm rounded-pill fs-12 text-capitalize"
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
  // const dataTable = React.useMemo(() => [...data], [data]);
  const dataTable = React.useMemo(
    () => [
      { name: 'Babila Ebwélé', email: 'babila@gmail.com', date: '2022-10-07', status: 'active' },
      {
        name: 'Brijamohan Mallick',
        email: 'brijamohan@gmail.com',
        date: '2022-10-02',
        status: 'active',
      },
      { name: 'Babila Ebwélé', email: 'babila@gmail.com', date: '2022-10-04', status: 'active' },
      {
        name: 'Brijamohan Mallick',
        email: 'brijamohan@gmail.com',
        date: '2022-10-07',
        status: 'waiting',
      },
      {
        name: 'Babila Ebwélé',
        email: 'babila@gmail.com',
        date: '2022-10-07',
        status: 'active',
      },
      {
        name: 'Brijamohan Mallick',
        email: 'brijamohan@gmail.com',
        date: '2022-10-07',
        status: 'active',
      },
    ],
    []
  );
  console.log(data);
  return (
    <div className="py-2 bg-white rounded-3 shadow-sm h-100">
      <div className="d-flex justify-content-between align-items-center py-16 px-24 ">
        <h2 className="mb-0 fs-4 fw-semibold text-blue-0">{t('txt_new_registered_users')}</h2>
        <a href="#" className="fs-14 text-body">
          <span className="pe-1 text-color">{t('txt_view_more')}</span>
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
      </div>
      <div className="fs-14 h-100">
        <Table columns={columnsTable} data={dataTable}></Table>
      </div>
    </div>
  );
};
export default withTranslation('common')(RegisteredUser);
