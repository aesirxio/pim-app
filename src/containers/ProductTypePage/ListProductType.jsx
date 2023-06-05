import { AesirXSelect, Spinner, notify } from 'components';
import Table from 'components/Table';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation, withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withProductTypeViewModel } from './ProductTypeViewModel/ProductTypeViewModelContextProvider';
import { history } from 'routes/history';
import ActionsBar from 'components/ActionsBar';

const ListProductType = observer((props) => {
  const { t } = useTranslation();
  let listSelected = [];
  const viewModel = props.model.memberListViewModel;

  useEffect(() => {
    viewModel.initializeData();
  }, []);
  const columnsTable = [
    {
      Header: t('txt_product_type_name'),
      accessor: 'productType',
      width: 150,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }) => {
        return (
          <>
            <div className="d-flex align-items-center py-8px">
              <div>
                <div className="mb-1">{value.name}</div>
                <div className="text-green">
                  <button
                    onClick={() => {
                      history.push(`/members/edit/${value.id}`);
                    }}
                    className="p-0 border-0 bg-transparent d-inline-block text-green"
                  >
                    {t('txt_edit')}
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      },
    },
    {
      Header: t('txt_member_email'),
      accessor: 'memberEmail',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
    },
    {
      Header: t('txt_member_role'),
      accessor: 'memberRole',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
    },
    {
      Header: t('txt_organisation'),
      accessor: 'organisation',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
    },
    {
      Header: () => {
        return (
          <div className="text-center pe-5">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0007 0.333496C8.89099 0.333496 6.8287 0.959085 5.07457 2.13115C3.32045 3.30322 1.95328 4.96913 1.14594 6.91821C0.338606 8.86728 0.127371 11.012 0.538946 13.0811C0.950522 15.1503 1.96642 17.0509 3.45818 18.5426C4.94994 20.0344 6.85056 21.0503 8.91969 21.4619C10.9888 21.8734 13.1335 21.6622 15.0826 20.8549C17.0317 20.0475 18.6976 18.6804 19.8697 16.9262C21.0417 15.1721 21.6673 13.1098 21.6673 11.0002C21.6673 8.17119 20.5435 5.45808 18.5431 3.45769C16.5427 1.4573 13.8296 0.333496 11.0007 0.333496ZM17.9673 7.42016L9.20732 16.1735L4.03399 11.0002C3.85718 10.8234 3.75785 10.5835 3.75785 10.3335C3.75785 10.0834 3.85718 9.84364 4.03399 9.66683C4.2108 9.49002 4.45061 9.39069 4.70066 9.39069C4.9507 9.39069 5.19051 9.49002 5.36732 9.66683L9.22066 13.5202L16.6473 6.10016C16.7349 6.01261 16.8388 5.94317 16.9532 5.89579C17.0676 5.84841 17.1902 5.82402 17.314 5.82402C17.4378 5.82402 17.5604 5.84841 17.6748 5.89579C17.7892 5.94317 17.8931 6.01261 17.9807 6.10016C18.0682 6.18771 18.1376 6.29164 18.185 6.40603C18.2324 6.52042 18.2568 6.64302 18.2568 6.76683C18.2568 6.89064 18.2324 7.01324 18.185 7.12763C18.1376 7.24201 18.0682 7.34595 17.9807 7.4335L17.9673 7.42016Z"
                fill="#1AB394"
              />
            </svg>
          </div>
        );
      },
      width: 50,
      accessor: 'published',
      className: 'py-18 border-bottom-1 text-center align-middle',
      Cell: ({ value, row }) => (
        <div className="text-center pe-5">
          {value.state == 1 ? (
            <svg
              style={{ cursor: 'pointer' }}
              onClick={() => {
                publishedBtnHandler(value, row.original?.member?.name);
              }}
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0007 0.333496C8.89099 0.333496 6.8287 0.959085 5.07457 2.13115C3.32045 3.30322 1.95328 4.96913 1.14594 6.91821C0.338606 8.86728 0.127371 11.012 0.538946 13.0811C0.950522 15.1503 1.96642 17.0509 3.45818 18.5426C4.94994 20.0344 6.85056 21.0503 8.91969 21.4619C10.9888 21.8734 13.1335 21.6622 15.0826 20.8549C17.0317 20.0475 18.6976 18.6804 19.8697 16.9262C21.0417 15.1721 21.6673 13.1098 21.6673 11.0002C21.6673 8.17119 20.5435 5.45808 18.5431 3.45769C16.5427 1.4573 13.8296 0.333496 11.0007 0.333496ZM17.9673 7.42016L9.20732 16.1735L4.03399 11.0002C3.85718 10.8234 3.75785 10.5835 3.75785 10.3335C3.75785 10.0834 3.85718 9.84364 4.03399 9.66683C4.2108 9.49002 4.45061 9.39069 4.70066 9.39069C4.9507 9.39069 5.19051 9.49002 5.36732 9.66683L9.22066 13.5202L16.6473 6.10016C16.7349 6.01261 16.8388 5.94317 16.9532 5.89579C17.0676 5.84841 17.1902 5.82402 17.314 5.82402C17.4378 5.82402 17.5604 5.84841 17.6748 5.89579C17.7892 5.94317 17.8931 6.01261 17.9807 6.10016C18.0682 6.18771 18.1376 6.29164 18.185 6.40603C18.2324 6.52042 18.2568 6.64302 18.2568 6.76683C18.2568 6.89064 18.2324 7.01324 18.185 7.12763C18.1376 7.24201 18.0682 7.34595 17.9807 7.4335L17.9673 7.42016Z"
                fill={`#1AB394`}
              />
            </svg>
          ) : (
            <svg
              style={{ cursor: 'pointer' }}
              onClick={() => publishedBtnHandler(value, row.original?.member?.name)}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4681_30082)">
                <path
                  d="M12.0007 1.3335C9.89099 1.3335 7.8287 1.95909 6.07457 3.13115C4.32045 4.30322 2.95328 5.96913 2.14594 7.91821C1.33861 9.86728 1.12737 12.012 1.53895 14.0811C1.95052 16.1503 2.96642 18.0509 4.45818 19.5426C5.94994 21.0344 7.85056 22.0503 9.91969 22.4619C11.9888 22.8734 14.1335 22.6622 16.0826 21.8549C18.0317 21.0475 19.6976 19.6804 20.8697 17.9262C22.0417 16.1721 22.6673 14.1098 22.6673 12.0002C22.6673 9.17119 21.5435 6.45808 19.5431 4.45769C17.5427 2.4573 14.8296 1.3335 12.0007 1.3335ZM12.0007 21.3335C10.1547 21.3335 8.35019 20.7861 6.81533 19.7605C5.28047 18.735 4.0842 17.2773 3.37778 15.5719C2.67136 13.8664 2.48653 11.9898 2.84666 10.1793C3.20679 8.36883 4.0957 6.70579 5.40099 5.4005C6.70628 4.09521 8.36932 3.2063 10.1798 2.84617C11.9903 2.48604 13.8669 2.67087 15.5724 3.37729C17.2778 4.0837 18.7355 5.27998 19.761 6.81484C20.7866 8.3497 21.334 10.1542 21.334 12.0002C21.334 14.4755 20.3507 16.8495 18.6003 18.5998C16.85 20.3502 14.476 21.3335 12.0007 21.3335Z"
                  fill="#1AB394"
                />
                <path
                  d="M18.666 8.06691C18.5411 7.94274 18.3721 7.87305 18.196 7.87305C18.0199 7.87305 17.8509 7.94274 17.726 8.06691L10.326 15.4336L6.32597 11.4336C6.20397 11.3019 6.03464 11.224 5.85523 11.2171C5.67582 11.2102 5.50103 11.2749 5.36931 11.3969C5.23758 11.5189 5.15972 11.6882 5.15284 11.8676C5.14596 12.0471 5.21064 12.2219 5.33264 12.3536L10.326 17.3336L18.666 9.01358C18.7285 8.9516 18.7781 8.87787 18.8119 8.79663C18.8457 8.71539 18.8632 8.62825 18.8632 8.54024C18.8632 8.45223 18.8457 8.3651 18.8119 8.28386C18.7781 8.20262 18.7285 8.12888 18.666 8.06691Z"
                  fill="#1AB394"
                />
              </g>
            </svg>
          )}
        </div>
      ),
    },
    // {
    //   Header: t('txt_last_modified'),
    //   accessor: 'lastModified',
    //   className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
    //   Cell: ({ value }) => {
    //     return (
    //       <div className="pe-2">
    //         <div className="mb-1">
    //           {viewModel?.successResponse?.listPublishStatus?.find(
    //             (o) => o?.value == value.status
    //           )?.label &&
    //             t(
    //               'txt_' +
    //                 viewModel?.successResponse?.listPublishStatus
    //                   .find((o) => o?.value == value.status)
    //                   ?.label?.toString()
    //                   .toLowerCase()
    //             )}
    //         </div>
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

  const publishedBtnHandler = (value, name) => {
    viewModel.isLoading();
    const isPublished = value?.state != 1 ? 1 : 0;
    viewModel.setPublished({ id: value?.id, name: name }, isPublished);
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
        <h2 className="fw-bold">{t('txt_left_menu_member_list')}</h2>

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
                history.push('/members/add');
              },
            },
          ]}
        />
      </div>
      <div className="mb-3">
        <Tabs
          defaultActiveKey={'membersList'}
          id="tab-setting"
          onSelect={(k) => selectTabHandler(k)}
        >
          <Tab key="membersList" eventKey="membersList" title={t('txt_all_members')} />
          {/* <Tab key="superAdmin" eventKey="superAdmin" title={t('txt_super_admin')} />
          <Tab key="supplier" eventKey="supplier" title={t('txt_supplier')} />
          <Tab key="manager" eventKey="manager" title={t('txt_manager')} />
          <Tab key="productImporter" eventKey="productImporter" title={t('txt_product_importer')} />
          <Tab key="merchandiser" eventKey="merchandiser" title={t('txt_merchandiser')} /> */}
        </Tabs>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-2 my-20">
        {/* <AesirXSelect
          defaultValue={`test`}
          options={[{ label: 'Test', value: 'test' }]}
          className={`fs-sm`}
          isBorder={true}
          placeholder={t('txt_bulk_actions')}
          arrowColor={'var(--dropdown-indicator-color)'}
          size="large"
        /> */}
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
