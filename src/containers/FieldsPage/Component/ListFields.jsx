import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import ActionsBar from 'components/ActionsBar';
import { withFieldViewModel } from '../FieldViewModel/FieldViewModelContextProvider';
// import Table from 'components/Table';
// import Spinner from 'components/Spinner';
import history from 'routes/history';

const ListFields = observer((props) => {
  const { t } = props;
  // let listSelected = [];

  const viewModel = props.viewModel;

  useEffect(() => {
    viewModel.initializeData();
  }, []);

  // const columnsTable = [
  //   {
  //     Header: 'Field name',
  //     accessor: 'name',
  //     width: 200,
  //     className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
  //     Cell: ({ value, row }) => {
  //       return (
  //         <div className="d-flex align-items-center">
  //           <div>
  //             <div className="mb-1">{value}</div>
  //             <div className="text-green">
  //               <button
  //                 onClick={() => {
  //                   history.push(`/fields/edit/${row.values.id}`);
  //                 }}
  //                 className="p-0 border-0 bg-transparent d-inline-block text-green"
  //               >
  //                 Edit
  //               </button>{' '}
  //               |{' '}
  //               <button className="p-0 border-0 bg-transparent d-inline-block text-green">
  //                 Duplicate
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     Header: 'Field group',
  //     accessor: 'groupName',
  //     width: 100,
  //     className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
  //     Cell: ({ value }) => {
  //       return <>{value}</>;
  //     },
  //   },
  //   {
  //     Header: 'types',
  //     accessor: 'type',
  //     width: 100,
  //     className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
  //     Cell: ({ value }) => {
  //       return <div className="text-capitalize">{value}</div>;
  //     },
  //   },
  //   {
  //     Header: 'Last modified',
  //     accessor: 'lastModified',
  //     width: 100,
  //     className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
  //     Cell: ({ value }) => {
  //       return (
  //         <div className="pe-2">
  //           {/* <div className="mb-1">
  //             {
  //               viewModel?.listPublishStatus.find((o) => o.value == value.status)
  //                 .label
  //             }
  //           </div> */}
  //           <div>
  //             {value.dateTime} by {value.author}
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  // const selectPageHandler = (value) => {
  //   if (value != viewModel.successResponse.pagination.page) {
  //     viewModel.isLoading();
  //     viewModel.getListByFilter(
  //       'limitstart',
  //       (value - 1) * viewModel.successResponse.pagination.pageLimit
  //     );
  //   }
  // };

  // const currentSelectHandler = (arr) => {
  //   listSelected = arr.map((o) => o.cells[1].value);
  // };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold mb-0">{t('txt_fields')}</h2>
        <ActionsBar
          buttons={[
            {
              title: t('txt_add_new_fields'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                history.push('/fields/add');
              },
            },
          ]}
        />
      </div>

      {/* {viewModel?.successResponse?.state ? (
        <Table
          classNameTable={`bg-white rounded`}
          columns={columnsTable}
          data={viewModel?.transform(viewModel?.items)}
          selection={false}
          pagination={viewModel?.successResponse?.pagination}
          // selectPage={selectPageHandler}
          // currentSelect={currentSelectHandler}
        ></Table>
      ) : (
        <Spinner />
      )} */}
    </>
  );
});

export default withTranslation('common')(withFieldViewModel(ListFields));
