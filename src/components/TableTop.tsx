import React from 'react';

export interface TableTopProps {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  className?: string;
}

export const TableTop: React.FC<TableTopProps> = ({
  title,
  description,
  searchPlaceholder = 'Search...',
  onSearch,
  actions,
  filters,
  className = '',
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className={`space-y-4 mb-4 ${className}`}>
      {/* Title and Description */}
      {(title || description) && (
        <div>
          {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      )}

      {/* Search and Actions Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Input */}
        {onSearch && (
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        )}

        {/* Actions (Buttons) */}
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Filters Row */}
      {filters && (
        <div className="flex items-center gap-3">
          {filters}
        </div>
      )}
    </div>
  );
};

export default TableTop;
