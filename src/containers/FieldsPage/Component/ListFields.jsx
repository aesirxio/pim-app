import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import ActionsBar from 'components/ActionsBar';
import { withFieldViewModel } from '../FieldViewModel/FieldViewModelContextProvider';
import Table from 'components/Table';
import Spinner from 'components/Spinner';
import history from 'routes/history';
import { Tab, Tabs } from 'react-bootstrap';
import SelectComponent from 'components/Select';

const ListFields = observer((props) => {
  const { t } = props;
  let listSelected = [];

  const viewModel = props.viewModel;

  useEffect(() => {
    viewModel.initializeData();
  }, []);

  const columnsTable = [
    {
      Header: 'Field name',
      accessor: 'field',
      width: 200,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return (
          <div className="d-flex align-items-center">
            <div>
              <div className="mb-1">{value.name}</div>
              <div className="text-green">
                <button
                  onClick={() => {
                    history.push(`/fields/edit/${value.id}`);
                  }}
                  className="p-0 border-0 bg-transparent d-inline-block text-green"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Field group',
      accessor: 'groupName',
      width: 100,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: 'types',
      accessor: 'type',
      width: 100,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <div className="text-capitalize">{value}</div>;
      },
    },
    // {
    //   Header: 'Last modified',
    //   accessor: 'lastModified',
    //   width: 100,
    //   className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
    //   Cell: ({ value }) => {
    //     return (
    //       <div className="pe-2">
    //         {/* <div className="mb-1">
    //           {
    //             viewModel?.listPublishStatus.find((o) => o.value == value.status)
    //               .label
    //           }
    //         </div> */}
    //         <div>
    //           {value.dateTime} by {value.author}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
  ];

  const selectTabHandler = (value) => {
    viewModel.isLoading();
    if (value != 'default') {
      viewModel.getListByFilter('state', {
        value: value,
        type: 'filter',
      });
    } else {
      viewModel.getListByFilter('state', '');
    }
  };

  const selectBulkActionsHandler = ({ value }) => {
    viewModel.isLoading();
    viewModel.updateStatus(listSelected, value);
  };

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.cells[1].value.id);
  };

  const selectShowItemsHandler = (value) => {
    viewModel.isLoading();
    viewModel.getListByFilter('list[limit]', value.value);
  };

  const selectPageHandler = (value) => {
    if (value != viewModel.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter('limitstart', (value - 1) * viewModel.pagination.pageLimit);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1">{t('txt_fields')}</h2>
          <div>{t('txt_fields_description')}</div>
        </div>
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

      <Tabs
        defaultActiveKey={'default'}
        id="tab-setting"
        onSelect={(k) => selectTabHandler(k)}
        className="mb-3"
      >
        <Tab eventKey={'default'} title={t('txt_all_field_groups')} />
        <Tab key={1} eventKey={1} title={t('txt_published')} />
        <Tab key={0} eventKey={0} title={t('txt_unpublished')} />
      </Tabs>

      <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
        <div className="d-flex gap-2">
          <SelectComponent
            options={[
              { value: 1, label: t('txt_published') },
              { value: 0, label: t('txt_unpublished') },
            ]}
            className={`fs-sm`}
            isBorder={true}
            placeholder={t('txt_bulk_actions')}
            plColor={`text-color`}
            onChange={(o) => selectBulkActionsHandler(o)}
            arrowColor={'#222328'}
          />
        </div>
        <div className="d-flex align-items-center">
          <div className="opacity-50 me-2">Showing</div>
          <SelectComponent
            defaultValue={{
              label: `${viewModel?.filterList['limit']} items`,
              value: viewModel?.filterList['limit'],
            }}
            options={[...Array(9)].map((o, index) => ({
              label: `${(index + 1) * 10} items`,
              value: (index + 1) * 10,
            }))}
            onChange={(o) => selectShowItemsHandler(o)}
            className={`fs-sm`}
            isBorder={true}
            placeholder={`Select`}
            arrowColor={'#222328'}
          />
        </div>
      </div>

      {viewModel?.successResponse?.state ? (
        <Table
          classNameTable={`bg-white rounded`}
          columns={columnsTable}
          data={viewModel?.transform(viewModel?.items)}
          selection={false}
          pagination={viewModel?.pagination}
          selectPage={selectPageHandler}
          currentSelect={currentSelectHandler}
        ></Table>
      ) : (
        <Spinner />
      )}
    </>
  );
});

export default withTranslation('common')(withFieldViewModel(ListFields));
