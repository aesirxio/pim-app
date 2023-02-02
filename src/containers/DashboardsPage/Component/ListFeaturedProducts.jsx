import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import Table from 'components/Table';
import { observer } from 'mobx-react-lite';
import Spinner from 'components/Spinner';
// import history from 'routes/history';

const ListFeaturedProducts = observer((props) => {
  const { t } = props;
  const viewModel = props.viewModel;

  useEffect(async () => {
    viewModel.isLoading();
    viewModel.initializeData();
  }, []);

  return (
    <div className={`position-relative  ${!viewModel?.successResponse?.state ? 'mt-5' : ''} `}>
      {viewModel?.successResponse?.state ? (
        <div className={`bg-white rounded-3 shadow-sm`}>
          <div className="px-24 pt-24 pb-8px fw-bold text-uppercase">
            {t('txt_featured_product')}
          </div>
          <Table
            classNameTable={`table-striped table`}
            columns={[
              {
                Header: 'Id',
                accessor: 'id',
                width: 60,
                className:
                  'ps-24 py-2 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
                Cell: ({ value }) => {
                  return <div className="ps-24 opacity-80">{value}</div>;
                },
              },
              {
                Header: t('txt_product_name'),
                accessor: 'productInfo',
                width: 200,
                className: 'py-2 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
                Cell: ({ value }) => {
                  return (
                    <div className="d-flex align-items-center">
                      {Array.isArray(value?.image) && value?.image[0]?.download_url != null ? (
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
                        <div>{value.name}</div>
                      </div>
                    </div>
                  );
                },
              },
              {
                Header: t('txt_categories'),
                accessor: 'categories',
                className: 'py-2 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
                Cell: ({ value }) => {
                  return <>{value}</>;
                },
              },
              {
                Header: t('txt_type'),
                accessor: 'type',
                width: 100,
                className: 'py-2 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
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
                              value === 'indoor'
                                ? 'rgba(50, 177, 151, 0.15)'
                                : 'rgba(239, 55, 55, 0.15)'
                            }`,
                          }}
                        >
                          {t('txt_' + value?.toString().toLowerCase())}
                        </span>
                      </div>
                    );
                  }
                  return '';
                },
              },
              {
                Header: t('txt_author'),
                accessor: 'author',
                width: 100,
                className: 'py-2 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
                Cell: ({ value }) => {
                  return <>{value}</>;
                },
              },
              {
                Header: t('txt_last_modified'),
                accessor: 'lastModified',
                width: 100,
                className:
                  'py-2 text-gray border-bottom-1 text-uppercase fw-semi pe-2 align-middle',
                Cell: ({ value }) => {
                  return (
                    <div className="pe-2">
                      <div className="mb-1">
                        {viewModel?.listPublishStatus?.find((o) => o.value == value.status)
                          ?.label &&
                          t(
                            'txt_' +
                              viewModel?.listPublishStatus
                                ?.find((o) => o.value == value.status)
                                ?.label?.toString()
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
            ]}
            data={viewModel?.listFeaturedProducts}
            //   selection={false}
            //   pagination={viewModel?.successResponse?.pagination}
            //   selectPage={selectPageHandler}
            //   currentSelect={currentSelectHandler}
          ></Table>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
});

export default withTranslation('common')(ListFeaturedProducts);
