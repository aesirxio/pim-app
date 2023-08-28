import { Table, AesirXSelect, Spinner, notify, ActionsBar } from 'aesirx-uikit';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation, withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withShippingZoneViewModel } from './ShippingZoneViewModel/ShippingZoneViewModelContextProvider';
import { historyPush } from 'routes/routes';

const ListShippingZone = observer((props) => {
  const { t } = useTranslation();
  let listSelected = [];
  const viewModel = props.model.shippingZoneListViewModel;
  useEffect(() => {
    viewModel.initializeData();
  }, []);
  const columnsTable = [
    {
      Header: t('txt_country'),
      accessor: 'shippingZone',
      width: 300,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <>
            <div className="py-8px">{value?.country}</div>
          </>
        );
      },
    },
    {
      Header: t('txt_city'),
      accessor: 'city',
      width: 150,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <>
            <div className="py-8px">{value}</div>
          </>
        );
      },
    },
    {
      Header: t('txt_state'),
      accessor: 'state',
      width: 150,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <>
            <div className="py-8px">{value}</div>
          </>
        );
      },
    },
    {
      Header: t('txt_zip_start'),
      accessor: 'zipStart',
      width: 100,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <>
            <div className="py-8px">{value}</div>
          </>
        );
      },
    },
    {
      Header: t('txt_zip_end'),
      accessor: 'zipEnd',
      width: 100,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <>
            <div className="py-8px">{value}</div>
          </>
        );
      },
    },
  ];

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.cells[1]?.value?.id);
  };

  const deleteShippingZones = () => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.deleteShippingZones(listSelected);
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
        <h2>{t('txt_left_menu_shipping_zone')}</h2>

        <ActionsBar
          buttons={[
            {
              title: t('txt_delete'),
              icon: '/assets/images/delete.svg',
              iconColor: '#cb222c',
              textColor: '#cb222c',
              handle: async () => {
                deleteShippingZones();
              },
            },
            {
              title: t('txt_add_new'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                historyPush('/shipping-zone/add');
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
          <Tab eventKey="default" title={t('txt_all_shipping_zone')} />
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
            data={viewModel?.successResponse?.listShippingZones}
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

export default withTranslation()(withShippingZoneViewModel(ListShippingZone));
