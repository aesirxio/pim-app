/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect } from 'react';
import {
  useExpanded,
  usePagination,
  useRowSelect,
  useRowState,
  useSortBy,
  useTable,
} from 'react-table';
import { withTranslation } from 'react-i18next';
import ComponentNoData from '../ComponentNoData';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortDown,
  faSortUp,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

function useInstance(instance) {
  const { allColumns } = instance;

  let rowSpanHeaders = [];

  allColumns.forEach((column) => {
    const { id, enableRowSpan } = column;

    if (enableRowSpan !== undefined) {
      rowSpanHeaders = [...rowSpanHeaders, { id, topCellValue: null, topCellIndex: 0 }];
    }
  });

  Object.assign(instance, { rowSpanHeaders });
}

const Table = ({
  columns,
  data,
  store,
  setLoading,
  onSelect,
  dataList,
  selection = true,
  classNameTable,
  onRightClickItem,
  sortAPI,
  canSort,
  pagination,
  selectPage,
  currentSelect,
  ...props
}) => {
  const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input className="form-check-input d-block" type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    // pageOptions,
    // previousPage,
    // canPreviousPage,
    // canNextPage,
    // gotoPage,
    // nextPage,
    // state: { pageIndex },
    // state,
    rowSpanHeaders,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      onSelect,
    },
    (hooks) => {
      hooks.useInstance.push(useInstance);
      !selection &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            className: 'border-bottom-1 text-uppercase py-2 ps-16 align-middle',
            width: 10,
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div className="wrapper_checkbox ms-8px">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useRowState
  );
  // const handlePagination = async (pageIndex) => {
  //   setLoading(true);
  //   await store.goToPage(pageIndex);
  //   setLoading(false);
  // };

  currentSelect && currentSelect(selectedFlatRows);
  const { t } = props;
  return (
    <>
      <div className="fs-14 text-color position-relative h-100">
        {rows.length ? (
          <table {...getTableProps()} className={`w-100 ${classNameTable}`}>
            <thead className="fs-6">
              {headerGroups.map((headerGroup, index) => {
                let newHeaderGroup = '';

                dataList
                  ? (newHeaderGroup = headerGroup.headers.filter(
                      (item) => !dataList.some((other) => item.id === other)
                    ))
                  : (newHeaderGroup = headerGroup.headers);

                return (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {newHeaderGroup.map((column, index) => {
                      let sortParams = column.sortParams ?? column.id;
                      let columnInside = '';
                      if (column.rowSpanHeader && canSort && !sortAPI) {
                        columnInside = column.columns[0];
                      }
                      return (
                        <th
                          key={index}
                          {...(!sortAPI && {
                            ...column.getHeaderProps(
                              canSort && !column.rowSpanHeader
                                ? column.getSortByToggleProps()
                                : columnInside && columnInside.getSortByToggleProps()
                            ),
                          })}
                          className={`${column.className} ${
                            sortAPI && sortParams !== 'number' && sortParams !== 'selection'
                              ? 'cursor-pointer'
                              : ''
                          }`}
                          {...(sortAPI &&
                            sortParams !== 'number' &&
                            sortParams !== 'selection' && {
                              onClick: async () => {
                                setLoading(true);
                                if (store.sortBy.id === sortParams && store.sortBy.desc) {
                                  store.sortBy = { desc: true };
                                } else if (store.sortBy.id !== sortParams) {
                                  store.sortBy = { id: sortParams, desc: false };
                                } else {
                                  store.sortBy = { id: sortParams, desc: !store.sortBy.desc };
                                }
                                await store.getItems();
                                setLoading(false);
                              },
                            })}
                          rowSpan={`${column.rowSpanHeader ?? 1}`}
                        >
                          {column.render('Header')}
                          {canSort && (
                            <span className="position-relative">
                              {sortAPI ? (
                                store?.sortBy?.id === sortParams &&
                                sortParams !== 'number' &&
                                sortParams !== 'selection' ? (
                                  store?.sortBy?.desc ? (
                                    <FontAwesomeIcon
                                      className="sort-icon sort-icon-down ms-sm"
                                      icon={faSortDown}
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      className="sort-icon sort-icon-up ms-sm mb-nsm"
                                      icon={faSortUp}
                                    />
                                  )
                                ) : (
                                  ''
                                )
                              ) : !column.rowSpanHeader ? (
                                column.isSorted &&
                                sortParams !== 'number' &&
                                sortParams !== 'selection' ? (
                                  column.isSortedDesc ? (
                                    <FontAwesomeIcon
                                      className="sort-icon sort-icon-down ms-sm"
                                      icon={faSortDown}
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      className="sort-icon sort-icon-up ms-sm mb-nsm"
                                      icon={faSortUp}
                                    />
                                  )
                                ) : (
                                  ''
                                )
                              ) : columnInside.isSorted &&
                                // Column have rowSpan
                                sortParams !== 'number' &&
                                sortParams !== 'selection' ? (
                                columnInside.isSortedDesc ? (
                                  <FontAwesomeIcon
                                    className="sort-icon sort-icon-down ms-sm"
                                    icon={faSortDown}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    className="sort-icon sort-icon-up ms-sm mb-nsm"
                                    icon={faSortUp}
                                  />
                                )
                              ) : (
                                ''
                              )}
                            </span>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                for (let j = 0; j < row.allCells.length; j++) {
                  let cell = row.allCells[j];
                  let rowSpanHeader = rowSpanHeaders.find((x) => x.id === cell.column.id);

                  if (rowSpanHeader !== undefined) {
                    if (
                      rowSpanHeader.topCellValue === null ||
                      rowSpanHeader.topCellValue !== cell.value
                    ) {
                      cell.isRowSpanned = false;
                      rowSpanHeader.topCellValue = cell.value;
                      rowSpanHeader.topCellIndex = i;
                      cell.rowSpan = 1;
                    } else {
                      rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++;
                      cell.isRowSpanned = true;
                    }
                  }
                }
                return null;
              })}
              {rows.length > 0 &&
                rows.map((row) => {
                  return (
                    <tr
                      key={row.getRowProps().key}
                      {...row.getRowProps()}
                      onContextMenu={(e) => {
                        onRightClickItem(e, row.original);
                      }}
                    >
                      {row.cells.map((cell, index) => {
                        if (cell.isRowSpanned) return null;
                        else
                          return (
                            <td
                              key={index}
                              rowSpan={cell.rowSpan}
                              {...cell.getCellProps({ style: { width: cell.column.width } })}
                              className="py-16 fs-14 align-middle border-bottom-0"
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : null}

        {rows.length === 0 ? (
          <div className="py-5">
            <ComponentNoData icons="/assets/images/ic_project.svg" title="No Data" width="w-50" />
          </div>
        ) : null}
      </div>
      {/* {pagination && pageOptions.length ? (
        <div className="mt-2 text-center pagination">
          <button
            className="border-1 bg-white opacity-50 text-body btn"
            onClick={async () => {
              previousPage();
              handlePagination(pageIndex);
            }}
            disabled={!canPreviousPage}
          >
            <span className="material-icons fs-4 align-middle">arrow_back_ios</span>
          </button>
          {pageOptions.map((item, key) => {
            return (
              <button
                key={key}
                onClick={() => {
                  gotoPage(item);
                  handlePagination(item + 1);
                }}
                className={`btn border-1  ${
                  item === state.pageIndex
                    ? 'btn-primary text-white border-primary'
                    : 'bg-white opacity-50 number'
                } ${
                  pageIndex === 0
                    ? item < pageIndex + 5
                      ? 'visible_number'
                      : ''
                    : pageIndex === 1
                    ? item < pageIndex + 4
                      ? 'visible_number'
                      : ''
                    : item === pageIndex - 2 ||
                      item === pageIndex - 1 ||
                      item === pageIndex + 1 ||
                      item === pageIndex + 2
                    ? 'visible_number'
                    : ''
                }`}
              >
                {item + 1}
              </button>
            );
          })}
          <button
            className="border-1 bg-white opacity-50 text-body btn"
            onClick={() => {
              nextPage();
              handlePagination(pageIndex + 2);
            }}
            disabled={!canNextPage}
          >
            <span className="material-icons fs-4 align-middle">arrow_forward_ios</span>
          </button>
        </div>
      ) : null} */}

      {pagination && pagination.totalPages > 1 && (
        <div className="d-flex justify-content-between mt-3">
          <div>
            {t('txt_totals')}{' '}
            {pagination.totalPages > pagination.page
              ? pagination.pageLimit * pagination.page
              : pagination.totalItems}{' '}
            / {pagination.totalItems}
          </div>
          <div className="d-flex gap-0">
            <div
              onClick={() => pagination.page > 1 && selectPage(pagination.page - 1)}
              className="cursor-pointer border d-flex align-items-center justify-content-center border-end-0"
              style={{
                width: '38px',
                height: '38px',
                color: '#526269',
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            {[...Array(pagination.totalPages)].map((x, index) => (
              <div
                onClick={() => selectPage(index + 1)}
                key={index}
                className={`cursor-pointer border d-flex align-items-center justify-content-center border-end-0`}
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: pagination.page == index + 1 && '#526269',
                  color: pagination.page == index + 1 ? '#fff' : '#526269',
                }}
              >
                {index + 1}
              </div>
            ))}
            <div
              onClick={() =>
                pagination.page < pagination.totalPages && selectPage(pagination.page + 1)
              }
              className="cursor-pointer border d-flex align-items-center justify-content-center"
              style={{
                width: '38px',
                height: '38px',
                color: '#526269',
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withTranslation('common')(Table);
