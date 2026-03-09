import type { FC, ReactNode, ChangeEvent, CSSProperties } from 'react';

export interface TableTopProps {
  // Existing props
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: ReactNode;
  filters?: ReactNode;
  className?: string;

  // New responsive props
  size?: 'sm' | 'md' | 'lg' | 'responsive';

  // Custom color props
  titleColor?: string;
  descriptionColor?: string;
  searchBgColor?: string;
  searchBorderColor?: string;
  searchFocusBorderColor?: string;

  // Search input border radius
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';

  // Custom styles
  style?: CSSProperties;

  // New props for conditional action button display
  hideActionButtons?: boolean;
  selectedActionButton?: ReactNode;
}

export const TableTop: FC<TableTopProps> = ({
  title,
  description,
  searchPlaceholder = 'Search...',
  onSearch,
  actions,
  filters,
  className = '',
  size = 'responsive',
  titleColor,
  descriptionColor,
  searchBgColor = 'white',
  searchBorderColor = '#d1d5db',
  searchFocusBorderColor = '#3b82f6',
  rounded = 'md',
  style,
  hideActionButtons = false,
  selectedActionButton,
}) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  // Size configuration
  const sizeConfig = {
    sm: {
      titleSize: 'text-lg',
      titleWeight: 'font-semibold',
      descriptionSize: 'text-xs',
      searchInputSize: 'text-xs',
      searchInputPy: 'py-1.5',
      searchPaddingLeft: 'pl-8',
      iconSize: 'h-4 w-4',
      spacing: 'space-y-2',
      gap: 'gap-2',
      maxWidth: 'max-w-sm',
      descriptionMargin: 'mt-0.5',
    },
    md: {
      titleSize: 'text-xl',
      titleWeight: 'font-semibold',
      descriptionSize: 'text-sm',
      searchInputSize: 'text-sm',
      searchInputPy: 'py-2',
      searchPaddingLeft: 'pl-10',
      iconSize: 'h-5 w-5',
      spacing: 'space-y-3',
      gap: 'gap-3',
      maxWidth: 'max-w-md',
      descriptionMargin: 'mt-1',
    },
    lg: {
      titleSize: 'text-2xl',
      titleWeight: 'font-bold',
      descriptionSize: 'text-base',
      searchInputSize: 'text-base',
      searchInputPy: 'py-2.5',
      searchPaddingLeft: 'pl-12',
      iconSize: 'h-6 w-6',
      spacing: 'space-y-4',
      gap: 'gap-4',
      maxWidth: 'max-w-lg',
      descriptionMargin: 'mt-2',
    },
    responsive: {
      titleSize: 'text-lg sm:text-xl md:text-2xl',
      titleWeight: 'font-semibold md:font-bold',
      descriptionSize: 'text-xs sm:text-sm md:text-base',
      searchInputSize: 'text-xs sm:text-sm md:text-base',
      searchInputPy: 'py-1.5 sm:py-2 md:py-2.5',
      searchPaddingLeft: 'pl-8 sm:pl-10 md:pl-12',
      iconSize: 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6',
      spacing: 'space-y-2 sm:space-y-3 md:space-y-4',
      gap: 'gap-2 sm:gap-3 md:gap-4',
      maxWidth: 'max-w-sm md:max-w-md lg:max-w-lg',
      descriptionMargin: 'mt-0.5 sm:mt-1 md:mt-2',
    },
  };

  const config = sizeConfig[size];

  // Border radius configuration
  const radiusConfig = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const radiusClass = radiusConfig[rounded];

  // Build inline styles for custom colors
  const searchInputStyle: CSSProperties = {
    backgroundColor: searchBgColor,
    borderColor: searchBorderColor,
  };

  return (
    <div
      className={`${config.spacing} mb-4 ${className}`}
      style={style}
    >
      {/* Title and Description */}
      {(title || description) && (
        <div>
          {title && (
            <h2
              className={`${config.titleSize} ${config.titleWeight}`}
              style={{ color: titleColor || '#111827' }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              className={`${config.descriptionSize} ${config.descriptionMargin}`}
              style={{ color: descriptionColor || '#6b7280' }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* Search and Actions Row */}
      <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between ${config.gap}`}>
        {/* Search Input */}
        {onSearch && (
          <div className={`flex-1 ${config.maxWidth}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`${config.iconSize} text-gray-400`}
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
                className={`block w-full ${config.searchPaddingLeft} pr-3 ${config.searchInputPy} border ${radiusClass} focus:outline-none focus:ring-2 focus:ring-opacity-50 ${config.searchInputSize} transition-colors duration-200`}
                style={searchInputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = searchFocusBorderColor;
                  e.currentTarget.style.boxShadow = `0 0 0 2px rgba(59, 130, 246, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = searchBorderColor;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Actions (Buttons) */}
        <div className={`flex items-center gap-2 w-full sm:w-auto`}>
          {hideActionButtons && selectedActionButton ? (
            selectedActionButton
          ) : (
            actions
          )}
        </div>
      </div>

      {/* Filters Row */}
      {filters && (
        <div className={`flex flex-wrap items-center ${config.gap}`}>
          {filters}
        </div>
      )}
    </div>
  );
};

export default TableTop;
