/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect } from 'react';
import { useExpanded, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { withTranslation } from 'react-i18next';
import ComponentNoData from '../ComponentNoData';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

const Table = ({
  columns,
  data,
  pagination,
  store,
  setLoading,
  onSelect,
  dataList,
  selection = true,
  classNameTable,
  onRightClickItem,
  canSort,
  sortAPI,
}) => {
  const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input className="form-check-input p-0" type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    pageOptions,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    state: { pageIndex },
    state,
  } = useTable(
    {
      columns,
      data,
      onSelect,
      initialState: {
        pageSize: -1,
      },
    },
    (hooks) => {
      !selection &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            className: 'px-24 py-2 border-bottom-1 text-uppercase',
            width: '50px',
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div className="wrapper_checkbox px-24">
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
    useRowSelect
  );

  const handlePagination = async (pageIndex) => {
    setLoading(true);
    await store.goToPage(pageIndex);
    setLoading(false);
  };

  return (
    <>
      <div className="fs-14 text-color position-relative h-100">
        {rows.length ? (
          <table {...getTableProps()} className={`w-100 ${classNameTable}`}>
            <thead className='fs-6'>
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
                      if (column.rowSpan && canSort && !sortAPI) {
                        columnInside = column.columns[0];
                      }
                      return (
                        <th
                          key={index}
                          {...(!sortAPI && {
                            ...column.getHeaderProps(
                              canSort && !column.rowSpan
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
                          rowSpan={`${column.rowSpan ?? 1}`}
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
                              ) : !column.rowSpan ? (
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
              {rows.length > 0 &&
                rows.map((row) => {
                  prepareRow(row);
                  let newRowCells = '';

                  dataList
                    ? (newRowCells = row.cells.filter(
                        (item) => !dataList.some((other) => item.column.id === other)
                      ))
                    : (newRowCells = row.cells);

                  return (
                    <tr
                      key={row.getRowProps().key}
                      {...row.getRowProps()}
                      onContextMenu={(e) => {
                        onRightClickItem(e, row.original);
                      }}
                    >
                      {newRowCells.map((cell, index) => {
                        return (
                          <td
                            key={index}
                            {...cell.getCellProps({ style: { width: cell.column.width } })}
                            className="py-2"
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
          <div className="position-absolute top-50 start-50 translate-middle">
            <ComponentNoData icons="/assets/images/ic_project.svg" title="No Data" width="w-50" />
          </div>
        ) : null}
      </div>
      {pagination && pageOptions.length ? (
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
      ) : null}
    </>
  );
};

export default withTranslation('common')(Table);
