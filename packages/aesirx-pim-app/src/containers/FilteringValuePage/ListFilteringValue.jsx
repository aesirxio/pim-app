import {
  Table,
  AesirXSelect,
  Spinner,
  notify,
  ActionsBar,
  AesirXSelect as SelectComponent,
} from 'aesirx-uikit';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation, withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withFilteringValueViewModel } from './FilteringValueViewModel/FilteringValueViewModelContextProvider';
import { historyPush } from 'routes/routes';
import { FilteringFieldStore } from 'containers/FilteringFieldPage/store';
import FilteringFieldViewModel from 'containers/FilteringFieldPage/FilteringFieldViewModel/FilteringFieldViewModel';

const filteringFieldStore = new FilteringFieldStore();
const filteringFieldViewModel = new FilteringFieldViewModel(filteringFieldStore);
const ListFilteringValue = observer((props) => {
  const { t } = useTranslation();
  let listSelected = [];
  const viewModel = props.model.filteringValueListViewModel;
  useEffect(() => {
    filteringFieldViewModel.filteringFieldListViewModel.initializeAllData();
    viewModel.initializeData();
  }, []);
  const columnsTable = [
    {
      Header: t('txt_name'),
      accessor: 'filteringValue',
      width: 150,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <>
            <div className="d-flex align-items-center py-8px">
              {value.level > 1 && (
                <div className="me-1 d-flex align-items-center">
                  {[...Array(value.level - 1)].map((o, index) => (
                    <span
                      key={index}
                      style={{
                        height: '2px',
                        width: '16px',
                        marginRight: '7px',
                      }}
                      className="d-inline-block bg-gray"
                    ></span>
                  ))}
                </div>
              )}
              <div>
                <div className="mb-1">{value.name}</div>
                {value.level === 1 && value?.organization_id === '0' ? (
                  <></>
                ) : (
                  <div className="text-green">
                    <button
                      onClick={() => {
                        historyPush(`/filtering-value/edit/${value.id}`);
                      }}
                      className="p-0 border-0 bg-transparent d-inline-block text-green"
                    >
                      {t('txt_edit')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        );
      },
    },
    {
      Header: t('txt_filtering_field'),
      accessor: 'field',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <div className="pe-2">
            <div>{value}</div>
          </div>
        );
      },
    },
    {
      Header: t('txt_key'),
      accessor: 'keyField',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <div className="pe-2">
            <div>{value}</div>
          </div>
        );
      },
    },
    // {
    //   Header: t('txt_last_modified'),
    //   accessor: 'lastModified',
    //   className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
    //   Cell: ({ value }) => {
    //     return (
    //       <div className="pe-2">
    //         <div>
    //           {value.dateTime} {t('txt_by')} {value.author}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
  ];

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.cells[1]?.value?.id);
  };

  const deleteFilteringValues = () => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.deleteFilteringValues(listSelected);
    }
  };

  const selectPageHandler = (value) => {
    if (value != viewModel.successResponse.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter(
        'list[start]',
        (value - 1) * viewModel.successResponse.pagination.pageLimit
      );
    }
  };

  const selectShowItemsHandler = (value) => {
    viewModel.isLoading();
    viewModel.getListByFilter('list[limit]', value?.value);
  };

  const selectTabHandler = (value) => {
    viewModel.isLoading();
    if (value != 'default') {
      viewModel.getListByFilter('filter[published]', value);
    } else {
      viewModel.getListByFilter('filter[published]', '');
    }
  };

  const selectTypeHandler = (value) => {
    viewModel.isLoading();
    viewModel.getListByFilter('filter[field]', value?.value);
  };

  return (
    <div className="px-3 py-4">
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fw-bold">{t('txt_left_menu_filtering_value')}</h2>

        <ActionsBar
          buttons={[
            {
              title: t('txt_delete'),
              icon: '/assets/images/delete.svg',
              iconColor: '#cb222c',
              textColor: '#cb222c',
              handle: async () => {
                deleteFilteringValues();
              },
            },
            {
              title: t('txt_add_new'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                historyPush('/filtering-value/add');
              },
            },
          ]}
        />
      </div>
      <div className="mb-3">
        <Tabs
          defaultActiveKey={viewModel?.successResponse?.filters['filter[published]'] ?? 'default'}
          id="tab-setting"
          onSelect={(k) => selectTabHandler(k)}
        >
          <Tab eventKey="default" title={t('txt_all_filtering_value')} />
        </Tabs>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-2 my-20">
        <div>
          <SelectComponent
            options={
              filteringFieldViewModel.filteringFieldListViewModel?.successResponse
                ?.listFilteringFieldsWithoutPagination
            }
            defaultValue={
              viewModel?.successResponse?.filters['filter[field]']
                ? {
                    label:
                      filteringFieldViewModel.filteringFieldListViewModel?.successResponse?.listFilteringFieldsWithoutPagination.find(
                        (o) => o.value == viewModel?.successResponse?.filters['filter[field]']
                      )?.label,
                    value: viewModel?.successResponse?.filters['filter[field]'],
                  }
                : null
            }
            className={`fs-sm bg-white shadow-sm rounded-2`}
            isBorder={true}
            placeholder={t('txt_all_filtering_field')}
            onChange={(o) => selectTypeHandler(o)}
            arrowColor={'var(--dropdown-indicator-color)'}
            size="large"
            minWidth={200}
            isClearable={true}
          />
        </div>
        <div className="d-flex align-items-center">
          <div className="text-gray me-2">{t('txt_showing')}</div>
          <AesirXSelect
            defaultValue={{
              label: `${viewModel?.successResponse?.filters['list[limit]']} ${t('txt_items')}`,
              value: viewModel?.successResponse?.filters['list[limit]'],
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
      <div className="bg-white rounded">
        {viewModel?.successResponse?.state ? (
          <Table
            classNameTable={`bg-white rounded table-striped table`}
            columns={columnsTable}
            data={viewModel?.successResponse?.listFilteringValues}
            pagination={viewModel?.successResponse?.pagination}
            selection={false}
            selectPage={selectPageHandler}
            currentSelect={currentSelectHandler}
          ></Table>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
});

export default withTranslation()(withFilteringValueViewModel(ListFilteringValue));
