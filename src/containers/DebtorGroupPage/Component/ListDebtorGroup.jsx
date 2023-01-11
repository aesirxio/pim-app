import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { withDebtorGroupViewModel } from '../DebtorGroupViewModel/DebtorGroupViewModelContextProvider';
import Table from 'components/Table';
import Spinner from 'components/Spinner';
import ActionsBar from 'components/ActionsBar';
import history from 'routes/history';
import { Tab, Tabs } from 'react-bootstrap';
import SelectComponent from 'components/Select';

const ListDebtorGroup = observer((props) => {
  const { t } = props;
  let listSelected = [];

  const viewModel = props.viewModel;

  useEffect(() => {
    viewModel.initializeData();
  }, []);

  const columnsTable = [
    {
      Header: 'Id',
      accessor: 'id',
      width: 60,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return <div className="opacity-80">{value}</div>;
      },
    },
    {
      Header: 'Debtor group name',
      accessor: 'title',
      width: 250,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value, row }) => {
        return (
          <>
            <div className="mb-1">{value}</div>
            <div className="text-green">
              <button
                onClick={() => {
                  history.push(`/debtor-group/edit/${row.cells[1].value}`);
                }}
                className="p-0 border-0 bg-transparent d-inline-block text-green"
              >
                {t('txt_edit')}
              </button>
            </div>
          </>
        );
      },
    },
    {
      Header: 'Debtor group code',
      accessor: 'code',
      width: 250,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: 'Owner Company',
      accessor: 'organisationName',
      width: 250,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: 'Last modified',
      accessor: 'lastModified',
      width: 250,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return (
          <div className="pe-2">
            <div className="mb-1">
              {viewModel?.listPublishStatus.find((o) => o.value == value.status).label}
            </div>
            <div>
              {value.lastModifiedDate} by {value.modifiedUserName}
            </div>
          </div>
        );
      },
    },
  ];

  const selectBulkActionsHandler = (value) => {
    viewModel.isLoading();
    viewModel.updateStatus(listSelected, value.value);
  };

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.cells[1].value);
  };

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
        <h2 className="fw-bold mb-0">{t('txt_debtor_group')}</h2>
        <ActionsBar
          buttons={[
            {
              title: t('txt_add_new_debtor_group'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                history.push('/debtor-group/add');
              },
            },
          ]}
        />
      </div>

      {viewModel?.listPublishStatus.length > 0 && (
        <>
          <Tabs
            defaultActiveKey={'default'}
            id="tab-setting"
            onSelect={(k) => selectTabHandler(k)}
            className="mb-3"
          >
            <Tab eventKey={'default'} title={t('txt_all_products')} />
            {viewModel?.listPublishStatus.map((o) => (
              <Tab key={o.value} eventKey={o.value} title={o.label} />
            ))}
          </Tabs>

          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div className="d-flex gap-2">
              <SelectComponent
                options={viewModel?.listPublishStatus}
                className={`fs-sm`}
                isBorder={true}
                pagination={viewModel?.pagination}
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
                  label: `${viewModel?.filter['list[limit]']} items`,
                  value: viewModel?.filter['list[limit]'],
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
        </>
      )}

      {viewModel?.successResponse?.state ? (
        <Table
          classNameTable={`bg-white rounded table-striped table`}
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

export default withTranslation('common')(withDebtorGroupViewModel(ListDebtorGroup));
