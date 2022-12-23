import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { withProductViewModel } from '../ProductViewModel/ProductViewModelContextProvider';
import Table from 'components/Table';
import SelectComponent from 'components/Select';
import { Tab, Tabs } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Spinner from 'components/Spinner';
import history from 'routes/history';
import ActionsBar from 'components/ActionsBar';

const ListProducts = observer((props) => {
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
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <div className="opacity-80">{value}</div>;
      },
    },
    {
      Header: 'Product name',
      accessor: 'productInfo',
      width: 300,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value, row }) => {
        return (
          <div className="d-flex align-items-center">
            {Array.isArray(value?.image) ? (
              <div className="me-2">
                <img
                  style={{ objectFit: 'cover' }}
                  width={64}
                  height={64}
                  src={value?.image[0]?.download_url}
                  alt={value.name}
                />
              </div>
            ) : (
              <div className="me-2">
                <div
                  style={{ width: '64px', height: '64px' }}
                  className="border d-flex align-items-center justify-content-center text-center"
                >
                  No Image
                </div>
              </div>
            )}
            <div>
              <div className="mb-1">{value.name}</div>
              <div className="text-green">
                <button
                  onClick={() => {
                    history.push(`/products/edit/${row.values.id}`);
                  }}
                  className="p-0 border-0 bg-transparent d-inline-block text-green"
                >
                  {t('txt_edit')}
                </button>{' '}
                {/* |{' '}
                <button className="p-0 border-0 bg-transparent d-inline-block text-green">
                  Duplicate
                </button> */}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Categories',
      accessor: 'categories',
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: 'Type',
      accessor: 'type',
      width: 100,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        if (value) {
          return (
            <div
              className={`text-uppercase fw-semi ${
                value === 'indoor' ? 'text-success' : 'text-danger'
              }`}
              role={`alert`}
            >
              <span
                className="d-inline-block p-1 rounded"
                style={{
                  backgroundColor: `${
                    value === 'indoor' ? 'rgba(50, 177, 151, 0.15)' : 'rgba(239, 55, 55, 0.15)'
                  }`,
                }}
              >
                {value}
              </span>
            </div>
          );
        }
        return '';
      },
    },
    {
      Header: 'Author',
      accessor: 'author',
      width: 100,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: () => {
        return (
          <div className="text-center pe-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.2831 7.27584L13.3323 6.411L10.6722 1.01803C10.5995 0.87037 10.48 0.750839 10.3323 0.678183C9.96199 0.49537 9.51199 0.647714 9.32684 1.01803L6.66668 6.411L0.715901 7.27584C0.551838 7.29928 0.401838 7.37662 0.286995 7.49381C0.148155 7.63651 0.0716479 7.8285 0.0742847 8.02758C0.0769216 8.22666 0.158487 8.41655 0.301057 8.55553L4.60653 12.7532L3.58934 18.6805C3.56549 18.8184 3.58074 18.9602 3.63338 19.0899C3.68602 19.2195 3.77394 19.3318 3.88716 19.4141C4.00038 19.4963 4.13437 19.5452 4.27395 19.5551C4.41352 19.5651 4.5531 19.5357 4.67684 19.4704L9.99949 16.6719L15.3222 19.4704C15.4675 19.5477 15.6362 19.5735 15.7979 19.5454C16.2057 19.4751 16.48 19.0883 16.4097 18.6805L15.3925 12.7532L19.6979 8.55553C19.8151 8.44068 19.8925 8.29068 19.9159 8.12662C19.9792 7.71646 19.6932 7.33678 19.2831 7.27584Z"
                fill="#1AB394"
              />
            </svg>
          </div>
        );
      },
      width: 50,
      accessor: 'featured',
      className: 'py-2 border-bottom-1 text-center',
      Cell: ({ row }) => (
        <div className="text-center pe-5">
          <svg
            style={{ cursor: 'pointer' }}
            onClick={() => featuredBtnHandler(row)}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2831 7.27584L13.3323 6.411L10.6722 1.01803C10.5995 0.87037 10.48 0.750839 10.3323 0.678183C9.96199 0.49537 9.51199 0.647714 9.32684 1.01803L6.66668 6.411L0.715901 7.27584C0.551838 7.29928 0.401838 7.37662 0.286995 7.49381C0.148155 7.63651 0.0716479 7.8285 0.0742847 8.02758C0.0769216 8.22666 0.158487 8.41655 0.301057 8.55553L4.60653 12.7532L3.58934 18.6805C3.56549 18.8184 3.58074 18.9602 3.63338 19.0899C3.68602 19.2195 3.77394 19.3318 3.88716 19.4141C4.00038 19.4963 4.13437 19.5452 4.27395 19.5551C4.41352 19.5651 4.5531 19.5357 4.67684 19.4704L9.99949 16.6719L15.3222 19.4704C15.4675 19.5477 15.6362 19.5735 15.7979 19.5454C16.2057 19.4751 16.48 19.0883 16.4097 18.6805L15.3925 12.7532L19.6979 8.55553C19.8151 8.44068 19.8925 8.29068 19.9159 8.12662C19.9792 7.71646 19.6932 7.33678 19.2831 7.27584Z"
              fill={`${row.values.featured ? '#1AB394' : 'transparent'}`}
              stroke={`${row.values.featured ? 'transparent' : '#C0C0C0'}`}
            />
          </svg>
        </div>
      ),
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
                viewModel?.successResponse?.listPublishStatus.find((o) => o.value == value.status)
                  ?.label
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

  const selectPageHandler = (value) => {
    if (value != viewModel.successResponse.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter(
        'limitstart',
        (value - 1) * viewModel.successResponse.pagination.pageLimit
      );
    }
  };

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.cells[1].value);
  };

  const featuredBtnHandler = (row) => {
    viewModel.isLoading();
    const isFeatured = !row.values.featured;
    viewModel.setFeatured(row.values.id, isFeatured);
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

  const selectTypeHandler = (value) => {
    viewModel.isLoading();
    viewModel.getListByFilter('pim_product_type', {
      value: value.value,
      type: 'custom_fields',
    });
  };

  const selectShowItemsHandler = (value) => {
    viewModel.isLoading();
    viewModel.getListByFilter('list[limit]', value.value);
  };

  const selectBulkActionsHandler = (value) => {
    viewModel.isLoading();
    viewModel.updateStatus(listSelected, value.value);
  };

  const selectCategoryHandler = (value) => {
    console.log(value.value);
    viewModel.isLoading();
    viewModel.getListByFilter('filter[category]', value.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold mb-0">{t('txt_title_product_management')}</h2>
        <ActionsBar
          buttons={[
            {
              title: t('txt_add_new'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                history.push('/products/add');
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
              <Tab key={o.value} eventKey={o.value} title={o.label} />
            ))}
          </Tabs>

          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div className="d-flex gap-2">
              <SelectComponent
                options={viewModel?.successResponse?.listPublishStatus}
                className={`fs-sm`}
                isBorder={true}
                placeholder={t('txt_bulk_actions')}
                plColor={`text-color`}
                onChange={(o) => selectBulkActionsHandler(o)}
                arrowColor={'#222328'}
              />
              <SelectComponent
                options={[
                  { label: 'indoor', value: 'indoor' },
                  { label: 'outdoor', value: 'outdoor' },
                ]}
                className={`fs-sm`}
                isBorder={true}
                placeholder={`Product Type`}
                plColor={`text-color`}
                onChange={(o) => selectTypeHandler(o)}
                arrowColor={'#222328'}
              />
              <SelectComponent
                options={viewModel?.successResponse?.listCategories}
                className={`fs-sm`}
                isBorder={true}
                placeholder={t('txt_all_categories')}
                plColor={`text-color`}
                onChange={(o) => selectCategoryHandler(o)}
                arrowColor={'#222328'}
              />
            </div>
            <div className="d-flex align-items-center">
              <div className="opacity-50 me-2">Showing</div>
              <SelectComponent
                defaultValue={{
                  label: `${viewModel?.successResponse?.filters['list[limit]']} items`,
                  value: viewModel?.successResponse?.filters['list[limit]'],
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
          classNameTable={`bg-white rounded`}
          columns={columnsTable}
          data={viewModel?.successResponse?.listProducts}
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

export default withTranslation('common')(withProductViewModel(ListProducts));
