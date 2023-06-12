import { AesirXSelect, Spinner, notify } from 'aesirx-uikit';
import Table from 'components/Table';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation, withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withProductTypeViewModel } from './ProductTypeViewModel/ProductTypeViewModelContextProvider';
import ActionsBar from 'components/ActionsBar';
import { historyPush } from 'routes/routes';

const ListProductType = observer((props) => {
  const { t } = useTranslation();
  let listSelected = [];
  const viewModel = props.model.productTypeListViewModel;
  useEffect(() => {
    viewModel.initializeData();
  }, []);
  const columnsTable = [
    {
      Header: t('txt_name'),
      accessor: 'productType',
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
                        historyPush(`/product-types/edit/${value.id}`);
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
      Header: t('txt_parent_product_type'),
      accessor: 'productTypeParent',
      width: 150,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return <>{value == 'ROOT' ? 'Top level' : value}</>;
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

  const deleteProductTypes = () => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.deleteProductTypes(listSelected);
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

  return (
    <div className="px-3 py-4">
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fw-bold">{t('txt_left_menu_product_type')}</h2>

        <ActionsBar
          buttons={[
            {
              title: t('txt_delete'),
              icon: '/assets/images/delete.svg',
              iconColor: '#cb222c',
              textColor: '#cb222c',
              handle: async () => {
                deleteProductTypes();
              },
            },
            {
              title: t('txt_add_new'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                historyPush('/product-types/add');
              },
            },
          ]}
        />
      </div>
      <div className="mb-3">
        <Tabs
          defaultActiveKey={'productTypeList'}
          id="tab-setting"
          onSelect={(k) => selectTabHandler(k)}
        >
          <Tab key="productTypeList" eventKey="productTypeList" title={t('txt_all_product_type')} />
        </Tabs>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-2 my-20">
        <div></div>
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
            data={viewModel?.successResponse?.listProductTypes}
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

export default withTranslation()(withProductTypeViewModel(ListProductType));
