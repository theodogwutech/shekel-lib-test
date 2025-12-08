import React from 'react';

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
}

export const SelectedItemsList: React.FC<SelectedItemsListProps> = ({
  items,
  onRemove,
  emptyMessage = 'No items selected',
  className = '',
  itemClassName = '',
  maxHeight = '300px',
}) => {
  if (items.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 text-sm ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={`space-y-2 overflow-y-auto ${className}`}
      style={{ maxHeight }}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`
            group flex items-center justify-between
            bg-[#F4F4F4] rounded-lg px-4 py-3
            transition-all duration-300 ease-out
            hover:bg-[#EBEBEB] hover:shadow-sm
            animate-slide-in-item
            ${itemClassName}
          `}
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          <div className="flex-1 min-w-0">
            {item.sublabel && (
              <div className="text-xs text-gray-500 font-normal mb-0.5">
                {item.sublabel}
              </div>
            )}
            <div className="text-sm font-medium text-[#181918] truncate">
              {item.label}
            </div>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className={`
              ml-3 flex-shrink-0
              w-6 h-6 rounded-full
              flex items-center justify-center
              text-gray-400
              transition-all duration-200 ease-out
              hover:bg-white hover:text-[#EC615B] hover:scale-110
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-[#EC615B] focus:ring-opacity-50
            `}
            aria-label={`Remove ${item.label}`}
          >
            <svg
              className="w-4 h-4"
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
