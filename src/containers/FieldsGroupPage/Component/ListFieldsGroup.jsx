import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { withFieldGroupViewModel } from '../FieldGroupViewModel/FieldGroupViewModelContextProvider';
import ActionsBar from 'components/ActionsBar';
import Table from 'components/Table';
import Spinner from 'components/Spinner';
import history from 'routes/history';
import { Tab, Tabs } from 'react-bootstrap';
import SelectComponent from 'components/Select';
import { notify } from 'components/Toast';

const ListFieldsGroup = observer((props) => {
  const { t } = props;
  let listSelected = [];

  const viewModel = props.viewModel;

  useEffect(() => {
    viewModel.initializeData();
  }, []);

  const columnsTable = [
    {
      Header: t('txt_field_group_name'),
      accessor: 'fieldGroups',
      width: 200,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return (
          <div className="d-flex align-items-center py-8px">
            <div>
              <div className="mb-1">{value.name}</div>
              <div className="text-green">
                <button
                  onClick={() => {
                    history.push(`/fields-group/edit/${value.id}`);
                  }}
                  className="p-0 border-0 bg-transparent d-inline-block text-green"
                >
                  {t('txt_edit')}
                </button>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      Header: t('txt_author'),
      accessor: 'createdUserName',
      width: 100,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: t('txt_last_modified'),
      accessor: 'lastModified',
      width: 100,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return (
          <div className="pe-2">
            <div className="mb-1">{value.status ? t('txt_published') : t('txt_unpublished')}</div>
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
    listSelected = arr.map((o) => o.cells[1].value.id);
  };

  const selectShowItemsHandler = (value) => {
    viewModel.isLoading();
    viewModel.getListByFilter('list[limit]', value.value);
  };

  const selectPageHandler = (value) => {
    if (value != viewModel.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter('list[limitstart]', (value - 1) * viewModel.pagination.pageLimit);
    }
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

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="fw-bold mb-1">{t('txt_fields_group')}</h2>
          <div>{t('txt_field_groups_description')}</div>
        </div>
        <ActionsBar
          buttons={[
            {
              title: t('txt_add_new_field_group'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                history.push('/fields-group/add');
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
            onChange={(o) => selectBulkActionsHandler(o)}
            arrowColor={'var(--dropdown-indicator-color)'}
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
            className={`fs-sm`}
            isBorder={true}
            placeholder={`Select`}
            arrowColor={'var(--dropdown-indicator-color)'}
          />
        </div>
      </div>

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

export default withTranslation('common')(withFieldGroupViewModel(ListFieldsGroup));
