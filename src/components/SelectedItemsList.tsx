import type { FC, CSSProperties } from 'react';

export interface SelectedItem {
  id: string | number;
  label: string;
  sublabel?: string;
}

export interface SelectedItemsListProps {
  items: SelectedItem[];
  onRemove: (id: string | number) => void;
  emptyMessage?: string;
  className?: string;
  itemClassName?: string;
  maxHeight?: string;
  // New size and responsive props
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  // New custom color props
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
  sublabelColor?: string;
  removeButtonColor?: string;
  removeButtonHoverColor?: string;
  // New border radius prop
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  // New style prop
  style?: CSSProperties;
}

// Helper function to get size-based classes
const getSizeClasses = (size: 'sm' | 'md' | 'lg' | 'responsive' = 'md') => {
  const baseClasses = {
    sm: {
      container: 'space-y-1',
      item: 'px-2 py-1.5',
      label: 'text-xs',
      sublabel: 'text-[10px]',
      button: 'w-5 h-5',
      icon: 'w-3 h-3',
    },
    md: {
      container: 'space-y-2',
      item: 'px-4 py-3',
      label: 'text-sm',
      sublabel: 'text-xs',
      button: 'w-6 h-6',
      icon: 'w-4 h-4',
    },
    lg: {
      container: 'space-y-3',
      item: 'px-5 py-4',
      label: 'text-base',
      sublabel: 'text-sm',
      button: 'w-7 h-7',
      icon: 'w-5 h-5',
    },
    responsive: {
      container: 'space-y-1 sm:space-y-2 md:space-y-3',
      item: 'px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4',
      label: 'text-xs sm:text-sm md:text-base',
      sublabel: 'text-[10px] sm:text-xs md:text-sm',
      button: 'w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7',
      icon: 'w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5',
    },
  };

  return baseClasses[size];
};

// Helper function to get rounded corner classes
const getRoundedClasses = (rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md') => {
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };

  return roundedMap[rounded];
};

export const SelectedItemsList: FC<SelectedItemsListProps> = ({
  items,
  onRemove,
  emptyMessage = 'No items selected',
  className = '',
  itemClassName = '',
  maxHeight = '300px',
  size = 'md',
  bgColor,
  hoverBgColor,
  textColor,
  sublabelColor,
  removeButtonColor,
  removeButtonHoverColor,
  rounded = 'md',
  style,
}) => {
  const sizeClasses = getSizeClasses(size);
  const roundedClass = getRoundedClasses(rounded);

  // Default colors
  const defaultBgColor = '#F4F4F4';
  const defaultHoverBgColor = '#EBEBEB';
  const defaultTextColor = '#181918';
  const defaultSublabelColor = '#999999';
  const defaultRemoveButtonColor = '#9CA3AF';
  const defaultRemoveButtonHoverColor = '#EC615B';

  // Get final colors (use provided or default)
  const finalBgColor = bgColor || defaultBgColor;
  const finalHoverBgColor = hoverBgColor || defaultHoverBgColor;
  const finalTextColor = textColor || defaultTextColor;
  const finalSublabelColor = sublabelColor || defaultSublabelColor;
  const finalRemoveButtonColor = removeButtonColor || defaultRemoveButtonColor;
  const finalRemoveButtonHoverColor = removeButtonHoverColor || defaultRemoveButtonHoverColor;

  if (items.length === 0) {
    return (
      <div
        className={`text-center py-8 text-gray-500 text-sm ${className}`}
        style={{
          color: finalSublabelColor,
          ...style,
        }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={`overflow-y-auto ${sizeClasses.container} ${className}`}
      style={{ maxHeight, ...style }}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`
            group flex items-center justify-between
            ${roundedClass}
            transition-all duration-300 ease-out
            hover:shadow-sm
            animate-slide-in-item
            ${itemClassName}
          `}
          style={{
            backgroundColor: finalBgColor,
            animationDelay: `${index * 50}ms`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = finalHoverBgColor;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = finalBgColor;
          }}
        >
          <div className={`flex-1 min-w-0 ${sizeClasses.item}`}>
            {item.sublabel && (
              <div
                className={`font-normal mb-0.5 ${sizeClasses.sublabel}`}
                style={{ color: finalSublabelColor }}
              >
                {item.sublabel}
              </div>
            )}
            <div
              className={`font-medium truncate ${sizeClasses.label}`}
              style={{ color: finalTextColor }}
            >
              {item.label}
            </div>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className={`
              ml-3 flex-shrink-0 rounded-full
              flex items-center justify-center
              transition-all duration-200 ease-out
              hover:scale-110
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${sizeClasses.button}
            `}
            style={{
              color: finalRemoveButtonColor,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
              (e.currentTarget as HTMLElement).style.color = finalRemoveButtonHoverColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.color = finalRemoveButtonColor;
            }}
            aria-label={`Remove ${item.label}`}
          >
            <svg
              className={sizeClasses.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedItemsList;
