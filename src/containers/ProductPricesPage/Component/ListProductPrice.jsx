import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { withProductPriceViewModel } from '../ProductPriceViewModel/ProductPriceViewModelContextProvider';
import { Tab, Tabs } from 'react-bootstrap';
import SelectComponent from 'components/Select';
import Spinner from 'components/Spinner';
import Table from 'components/Table';
import '../index.scss';
import ActionsBar from 'components/ActionsBar';
import history from 'routes/history';

const ListProductPrice = observer((props) => {
  const { t } = props;
  let listSelected = [];

  const productPriceViewModel = props.viewModel;

  useEffect(() => {
    productPriceViewModel.initializeData();
  }, []);

  const selectTabHandler = (value) => {
    productPriceViewModel.isLoading();
    if (value != 'default') {
      productPriceViewModel.getListByFilter('state', {
        value: value,
        type: 'filter',
      });
    } else {
      productPriceViewModel.getListByFilter('state', '');
    }
  };

  const selectShowItemsHandler = (value) => {
    productPriceViewModel.isLoading();
    productPriceViewModel.getListByFilter('list[limit]', value.value);
  };

  const selectPageHandler = (value) => {
    if (value != productPriceViewModel.successResponse.pagination.page) {
      productPriceViewModel.isLoading();
      productPriceViewModel.getListByFilter(
        'limitstart',
        (value - 1) * productPriceViewModel.successResponse.pagination.pageLimit
      );
    }
  };

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.cells[1].value);
  };

  const selectBulkActionsHandler = (value) => {
    productPriceViewModel.isLoading();
    productPriceViewModel.updateStatus(listSelected, value.value);
  };

  const columnsTable = [
    {
      Header: 'Id',
      accessor: 'id',
      width: 60,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <div className="opacity-80">{value}</div>;
      },
    },
    {
      Header: 'Product name',
      accessor: 'title',
      width: 150,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value, row }) => {
        return (
          <>
            <div className="mb-1">{value}</div>
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
          </>
        );
      },
    },
    {
      Header: 'Debtor Group',
      accessor: 'debtorGroup',
      width: 200,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <>{value.map((o) => o.title).join(', ')}</>;
      },
    },
    {
      Header: 'Price',
      accessor: 'price',
      width: 200,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return (
          <>{parseInt(value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</>
        );
      },
    },
    {
      Header: 'Last modified',
      accessor: 'lastModified',
      width: 150,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return (
          <div className="pe-2">
            <div className="mb-1">
              {
                productPriceViewModel?.successResponse?.listPublishStatus.find(
                  (o) => o.value == value.status
                ).label
              }
            </div>
            <div>
              {value.dateTime} by {value.author}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold mb-0">{t('txt_left_menu_price_management')}</h2>
        <ActionsBar
          buttons={[
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

      {productPriceViewModel?.successResponse?.listPublishStatus.length > 0 && (
        <>
          <Tabs
            defaultActiveKey={'default'}
            id="tab-setting"
            onSelect={(k) => selectTabHandler(k)}
            className="mb-3"
          >
            <Tab eventKey={'default'} title={t('txt_all_products')} />
            {productPriceViewModel?.successResponse?.listPublishStatus.map((o) => (
              <Tab key={o.value} eventKey={o.value} title={o.label} />
            ))}
          </Tabs>

          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div className="d-flex gap-2">
              <SelectComponent
                options={productPriceViewModel?.successResponse?.listPublishStatus}
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
                  label: `${productPriceViewModel?.successResponse?.filters['list[limit]']} items`,
                  value: productPriceViewModel?.successResponse?.filters['list[limit]'],
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

      {productPriceViewModel?.successResponse?.state ? (
        <Table
          classNameTable={`bg-white rounded`}
          columns={columnsTable}
          data={productPriceViewModel?.successResponse?.listProductPrice}
          selection={false}
          pagination={productPriceViewModel?.successResponse?.pagination}
          selectPage={selectPageHandler}
          currentSelect={currentSelectHandler}
        ></Table>
      ) : (
        <Spinner />
      )}
    </>
  );
});

export default withTranslation('common')(withProductPriceViewModel(ListProductPrice));
