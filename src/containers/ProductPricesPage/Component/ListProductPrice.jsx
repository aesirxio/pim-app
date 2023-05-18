import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { withProductPriceViewModel } from '../ProductPriceViewModel/ProductPriceViewModelContextProvider';
import { Tab, Tabs } from 'react-bootstrap';
import { AesirXSelect as SelectComponent } from 'aesirx-uikit';
import { Spinner } from 'aesirx-uikit';
import Table from 'components/Table';
import '../index.scss';
import ActionsBar from 'components/ActionsBar';
import { history } from 'aesirx-uikit';
import { notify } from 'aesirx-uikit';

const ListProductPrice = observer((props) => {
  const { t } = props;
  let listSelected = [];

  const viewModel = props.viewModel;

  viewModel.initializeData();

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
    if (value != viewModel.successResponse.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter(
        'list[limitstart]',
        (value - 1) * viewModel.successResponse.pagination.pageLimit
      );
    }
  };

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.cells[1].value);
  };

  const selectBulkActionsHandler = (value) => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.updateStatus(listSelected, value.value);
    }
  };

  const deleteProductPrices = () => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.deleteProductPrices(listSelected);
    }
  };

  const columnsTable = [
    {
      Header: 'Id',
      accessor: 'id',
      width: 60,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: t('txt_product_name'),
      accessor: 'productInfo',
      width: 150,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value, row }) => {
        return (
          <div className="d-flex align-items-center">
            {value.thumbImageUrl != '' ? (
              <div className="me-2">
                <img
                  style={{ objectFit: 'cover' }}
                  width={64}
                  height={64}
                  src={value.thumbImageUrl}
                  alt={value.title}
                />
              </div>
            ) : (
              <div className="me-2">
                <div
                  style={{ width: '64px', height: '64px' }}
                  className="border d-flex align-items-center justify-content-center text-center text-uppercase fw-bold opacity-50"
                >
                  No Image
                </div>
              </div>
            )}
            <div>
              <div className="mb-1">{value.title}</div>
              <div className="text-green">
                <button
                  onClick={() => {
                    history.push(`/prices/edit/${row.cells[1].value}`);
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
      Header: t('txt_debtor_group'),
      accessor: 'debtorGroup',
      width: 200,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return <>{value.map((o) => o.title).join(', ')}</>;
      },
    },
    {
      Header: t('txt_price'),
      accessor: 'price',
      width: 200,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return (
          <>{parseInt(value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</>
        );
      },
    },
    {
      Header: t('txt_last_modified'),
      accessor: 'lastModified',
      width: 150,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return (
          <div className="pe-2">
            <div className="mb-1">
              {viewModel?.successResponse?.listPublishStatus?.find((o) => o.value == value.status)
                ?.label &&
                t(
                  'txt_' +
                    viewModel?.successResponse?.listPublishStatus
                      .find((o) => o.value == value.status)
                      .label?.toString()
                      .toLowerCase()
                )}
            </div>
            <div>
              {value.dateTime} {t('txt_by')} {value.author}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h2 className="fw-bold mb-0">{t('txt_left_menu_price_management')}</h2>
        <ActionsBar
          buttons={[
            {
              title: t('txt_delete'),
              icon: '/assets/images/delete.svg',
              iconColor: '#cb222c',
              textColor: '#cb222c',
              handle: async () => {
                deleteProductPrices();
              },
            },
            {
              title: t('txt_add_new_prices'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                history.push('/prices/add');
              },
            },
          ]}
        />
      </div>

      {viewModel?.successResponse?.listPublishStatus.length > 0 && (
        <>
          <Tabs
            defaultActiveKey={'default'}
            id="tab-setting"
            onSelect={(k) => selectTabHandler(k)}
            className="mb-3"
          >
            <Tab eventKey={'default'} title={t('txt_all_products')} />
            {viewModel?.successResponse?.listPublishStatus.map((o) => (
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
                options={viewModel?.successResponse?.listPublishStatus.map((o) => {
                  return { ...o, label: t(`txt_${o.label.toLowerCase()}`) };
                })}
                className={`fs-sm bg-white shadow-sm rounded-2`}
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
              />
            </div>
          </div>
        </>
      )}

      {viewModel?.successResponse?.state ? (
        <Table
          classNameTable={`bg-white rounded table-striped table`}
          columns={columnsTable}
          data={viewModel?.successResponse?.listProductPrice}
          selection={false}
          pagination={viewModel?.successResponse?.pagination}
          selectPage={selectPageHandler}
          currentSelect={currentSelectHandler}
        ></Table>
      ) : (
        <Spinner />
      )}
    </>
  );
});

export default withTranslation()(withProductPriceViewModel(ListProductPrice));
