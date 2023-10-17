import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { withDebtorGroupViewModel } from '../DebtorGroupViewModel/DebtorGroupViewModelContextProvider';
import { Table, Spinner, notify, AesirXSelect as SelectComponent, ActionsBar } from 'aesirx-uikit';

import { Tab, Tabs } from 'react-bootstrap';
import { historyPush } from 'routes/routes';

const ListDebtorGroup = observer((props) => {
  const { t } = props;
  let listSelected = [];

  const viewModel = props.model?.debtorGroupListViewModel;

  useEffect(() => {
    viewModel.initializeData();
  }, []);

  const columnsTable = [
    {
      Header: 'Id',
      accessor: 'id',
      width: 60,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return <div className="opacity-80">{value}</div>;
      },
    },
    {
      Header: t('txt_debtor_group_name'),
      accessor: 'title',
      width: 250,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value, row }) => {
        return (
          <div className="py-8px">
            <div className="mb-1">{value}</div>
            <div className="text-green">
              <button
                onClick={() => {
                  historyPush(`/debtor-group/edit/${row.cells[1].value}`);
                }}
                className="p-0 border-0 bg-transparent d-inline-block text-green"
              >
                {t('txt_edit')}
              </button>
            </div>
          </div>
        );
      },
    },
    {
      Header: t('txt_debtor_group_code'),
      accessor: 'code',
      width: 250,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: t('txt_owner_company'),
      accessor: 'organisationName',
      width: 250,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: t('txt_last_modified'),
      accessor: 'lastModified',
      width: 250,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <div className="pe-2">
            <div className="mb-1">
              {viewModel?.listPublishStatus?.find((o) => o.value == value.status)?.label &&
                t(
                  'txt_' +
                    viewModel?.listPublishStatus
                      .find((o) => o.value == value.status)
                      .label?.toString()
                      .toLowerCase()
                )}
            </div>
            <div>
              {value.lastModifiedDate} {t('txt_by')} {value.modifiedUserName}
            </div>
          </div>
        );
      },
    },
  ];

  const selectBulkActionsHandler = (value) => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.updateStatus(listSelected, value.value);
    }
  };

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.cells[1].value);
  };

  const selectTabHandler = (value) => {
    viewModel.isLoading();
    if (value != 'default') {
      viewModel.getListByFilter('filter[state]', value);
    } else {
      viewModel.getListByFilter('filter[state]', '');
    }
  };

  const selectShowItemsHandler = (value) => {
    viewModel.isLoading();
    viewModel.getListByFilter('list[limit]', value?.value);
  };

  const selectPageHandler = (value) => {
    if (value != viewModel.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter('list[limitstart]', (value - 1) * viewModel.pagination.pageLimit);
    }
  };

  const deleteDebtorGroups = () => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.deleteDebtorGroups(listSelected);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h2 className="mb-0">{t('txt_debtor_group')}</h2>
        <ActionsBar
          buttons={[
            {
              title: t('txt_delete'),
              icon: '/assets/images/delete.svg',
              iconColor: '#cb222c',
              textColor: '#cb222c',
              handle: async () => {
                deleteDebtorGroups();
              },
            },
            {
              title: t('txt_add_new_debtor_group'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                historyPush('/debtor-group/add');
              },
            },
          ]}
        />
      </div>

      {viewModel?.listPublishStatus.length > 0 && (
        <>
          <Tabs
            defaultActiveKey={viewModel?.filter['filter[state]'] ?? 'default'}
            id="tab-setting"
            onSelect={(k) => selectTabHandler(k)}
            className="mb-3"
          >
            <Tab eventKey={'default'} title={t('txt_all_products')} />
            {viewModel?.listPublishStatus.map((o) => (
              <Tab
                key={o.value}
                eventKey={o.value}
                title={t(`txt_${o?.label && o.label?.toString().toLowerCase()}`)}
              />
            ))}
          </Tabs>

          <div className="d-flex align-items-center justify-content-between gap-2 my-20">
            <div className="d-flex gap-2">
              <SelectComponent
                options={viewModel?.listPublishStatus}
                className={`fs-sm bg-white shadow-sm rounded-2`}
                isBorder={true}
                pagination={viewModel?.pagination}
                placeholder={t('txt_bulk_actions')}
                onChange={(o) => selectBulkActionsHandler(o)}
                arrowColor={'var(--dropdown-indicator-color)'}
                size="large"
              />
            </div>
            <div className="d-flex align-items-center">
              <div className="text-gray me-2">{t('txt_showing')}</div>
              <SelectComponent
                defaultValue={{
                  label: `${viewModel?.filter['list[limit]']} ${t('txt_items')}`,
                  value: viewModel?.filter['list[limit]'],
                }}
                options={[...Array(9)].map((o, index) => ({
                  label: `${(index + 1) * 10} ${t('txt_items')}`,
                  value: (index + 1) * 10,
                }))}
                onChange={(o) => selectShowItemsHandler(o)}
                className={`fs-sm bg-white shadow-sm rounded-2`}
                isBorder={true}
                placeholder={`Select`}
                arrowColor={'var(--dropdown-indicator-color)'}
                size="large"
              />
            </div>
          </div>
        </>
      )}

      {viewModel?.successResponse?.state ? (
        <Table
          canSort={true}
          sortAPI={false}
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

export default withTranslation()(withDebtorGroupViewModel(ListDebtorGroup));
