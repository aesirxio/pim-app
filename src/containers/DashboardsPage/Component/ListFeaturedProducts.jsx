import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import Table from 'components/Table';
import { observer } from 'mobx-react-lite';
import Spinner from 'components/Spinner';
// import history from 'routes/history';

const ListFeaturedProducts = observer((props) => {
  const viewModel = props.viewModel;

  useEffect(async () => {
    viewModel.isLoading();
    viewModel.initializeData();
  }, []);

  const columnsTable = [
    {
      Header: 'Id',
      accessor: 'id',
      width: 60,
      className: 'ps-2 py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <div className="ps-2 opacity-80">{value}</div>;
      },
    },
    {
      Header: 'Product name',
      accessor: 'productInfo',
      width: 200,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return (
          <div className="d-flex align-items-center">
            <div className="me-2">
              <img
                style={{ objectFit: 'cover' }}
                width={64}
                height={64}
                src={value.image}
                alt={value.name}
              />
            </div>
            <div>
              <div>{value.name}</div>
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
      width: 50,
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
      Header: 'Last modified',
      accessor: 'lastModified',
      width: 100,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi pe-2',
      Cell: ({ value }) => {
        return (
          <div className="pe-2">
            <div className="mb-1">
              {viewModel?.listPublishStatus?.find((o) => o.value == value.status)?.label}
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
    <div className={`position-relative  ${!viewModel?.successResponse?.state ? 'mt-5' : ''} `}>
      {viewModel?.successResponse?.state ? (
        <div className={`bg-white rounded-3 shadow-sm`}>
          <div className="px-2 pt-3 fw-bold text-uppercase">featured products</div>
          <Table
            columns={columnsTable}
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
