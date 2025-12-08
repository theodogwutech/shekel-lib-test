import React, { useState } from 'react';
import { Select } from './Select';

export interface ColumnDef<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface TableProps<T = any> {
  columns: ColumnDef<T>[];
  dataSource: T[];
  rowKey?: string | ((record: T) => string);
  pagination?: PaginationConfig | false;
  loading?: boolean;
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
  className?: string;
  bordered?: boolean;
  striped?: boolean;
}

export interface PaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showTotal?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Table = <T extends Record<string, any>>({
  columns,
  dataSource,
  rowKey = 'id',
  pagination,
  loading = false,
  onRow,
  className = '',
  bordered = false,
  striped = false,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(
    pagination && typeof pagination === 'object' ? pagination.current || 1 : 1
  );
  const [pageSize, setPageSize] = useState(
    pagination && typeof pagination === 'object' ? pagination.pageSize || 10 : 10
  );

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || String(index);
  };

  const getValue = (record: T, dataIndex?: string) => {
    if (!dataIndex) return record;
    return dataIndex.split('.').reduce((obj, key) => obj?.[key], record);
  };

  // Pagination logic
  const paginatedData =
    pagination === false
      ? dataSource
      : dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (pagination && typeof pagination === 'object' && pagination.onChange) {
      pagination.onChange(page, pageSize);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    if (pagination && typeof pagination === 'object' && pagination.onChange) {
      pagination.onChange(1, newPageSize);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-2xl border border-[#EEEEEE]">
        <table className={`w-full ${bordered ? 'border-collapse' : ''} ${className}`}>
          <thead className="bg-[#F5F6F7]">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider ${
                    bordered && idx !== columns.length - 1 ? 'border-r border-[#EEEEEE]' : ''
                  } ${
                    column.align === 'center'
                      ? 'text-center'
                      : column.align === 'right'
                      ? 'text-right'
                      : ''
                  }`}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-[#333333]">
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-[#333333]">
                  No data
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => {
                const rowProps = onRow ? onRow(record, index) : {};
                return (
                  <tr
                    key={getRowKey(record, index)}
                    className={`${
                      striped && index % 2 === 1 ? 'bg-[#F5F6F7]' : ''
                    } hover:bg-gray-50 transition-colors duration-200 ease-out`}
                    {...rowProps}
                  >
                    {columns.map((column, colIdx) => {
                      const value = getValue(record, column.dataIndex);
                      const content = column.render ? column.render(value, record, index) : value;

                      return (
                        <td
                          key={column.key}
                          className={`px-4 py-4 text-sm text-gray-900 ${
                            bordered && colIdx !== columns.length - 1
                              ? 'border-r border-[#EEEEEE]'
                              : ''
                          } ${
                            column.align === 'center'
                              ? 'text-center'
                              : column.align === 'right'
                              ? 'text-right'
                              : ''
                          }`}
                        >
                          {content as React.ReactNode}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination !== false && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dataSource.length}
          onChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          showSizeChanger={
            pagination && typeof pagination === 'object' ? pagination.showSizeChanger : true
          }
          pageSizeOptions={
            pagination && typeof pagination === 'object'
              ? pagination.pageSizeOptions
              : [10, 20, 50, 100]
          }
          showTotal={pagination && typeof pagination === 'object' ? pagination.showTotal : true}
          size={pagination && typeof pagination === 'object' ? pagination.size : 'md'}
        />
      )}
    </div>
  );
};

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showTotal?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageSize,
  total,
  onChange,
  onPageSizeChange,
  showSizeChanger = true,
  pageSizeOptions = [10, 20, 50, 100],
  showTotal = true,
  size = 'md',
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  const sizeClasses = {
    sm: {
      button: 'px-2.5 py-1 text-xs',
      icon: 'h-3.5 w-3.5',
      nav: 'px-1.5 py-1.5',
    },
    md: {
      button: 'px-4 py-2 text-sm',
      icon: 'h-5 w-5',
      nav: 'px-2 py-2',
    },
    lg: {
      button: 'px-5 py-2.5 text-base',
      icon: 'h-6 w-6',
      nav: 'px-3 py-3',
    },
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#EEEEEE] sm:px-6 mt-4">
      {showTotal && (
        <div className="text-sm text-[#181918]">
          {startItem}-{endItem} of {total} items
        </div>
      )}

      <div className="flex items-center gap-2">
        {showSizeChanger && (
          <Select
            value={pageSize.toString()}
            onChange={(value) => onPageSizeChange(Number(value))}
            options={pageSizeOptions.map((size) => ({
              value: size.toString(),
              label: `${size} / page`,
            }))}
            size="sm"
            className="w-32"
          />
        )}

        <nav className="inline-flex gap-1 items-center" aria-label="Pagination">
          <button
            onClick={() => onChange(current - 1)}
            disabled={current === 1}
            className={`relative inline-flex items-center justify-center rounded-md ${sizeClasses[size].nav} text-[#181918] hover:bg-gray-100 focus:z-20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-300 ease-out hover:scale-110 active:scale-95`}
          >
            <svg className={sizeClasses[size].icon} viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className={`relative inline-flex items-center justify-center ${sizeClasses[size].button} font-normal text-[#181918]`}
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onChange(page as number)}
                className={`relative inline-flex items-center justify-center rounded-md ${sizeClasses[size].button} font-medium transition-all duration-300 ease-out focus:z-20 hover:scale-105 active:scale-95 ${
                  current === page
                    ? 'bg-[#EC615B] text-white shadow-sm'
                    : 'text-[#181918] hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => onChange(current + 1)}
            disabled={current === totalPages}
            className={`relative inline-flex items-center justify-center rounded-md ${sizeClasses[size].nav} text-[#181918] hover:bg-gray-100 focus:z-20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-300 ease-out hover:scale-110 active:scale-95`}
          >
            <svg className={sizeClasses[size].icon} viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Table;
