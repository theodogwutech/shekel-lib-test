import React from 'react';
import emptyNotificationSvg from '../../assets/empty-notification.svg';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isNew?: boolean;
  icon?: React.ReactNode;
  iconBackgroundColor?: string;
  iconColor?: string;
  onClick?: () => void;
}

export interface NotificationDropdownProps {
  title: string;
  count?: number;
  notifications: NotificationItem[];
  onViewMore?: () => void;
  className?: string;
  maxHeight?: string | number;
  width?: string | number;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  count,
  notifications,
  onViewMore,
  className = '',
  width = 380,
  maxHeight = 400,
}) => {
  const defaultIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        maxWidth: 'calc(100vw - 16px)',
      }}
    >
      {/* Tab Section */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#181918]">Issues</span>
          {count !== undefined && (
            <span className="flex flex-col items-center justify-center h-[22px] w-[22px] bg-[#FAE5B7] text-[#6C4D0B] border border-[#EFAC18] text-[11px] font-medium px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        {onViewMore && (
          <button
            onClick={onViewMore}
            className="text-xs text-[#EC615B] font-normal hover:text-[#EC615B] transition-colors duration-200"
          >
            View More
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }}
      >
        {notifications.length === 0 ? (
          <div className="px-4 py-16 flex flex-col items-center justify-center">
            <img
              src={emptyNotificationSvg}
              alt="No notifications"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-sm font-medium text-[#181918] mb-1">
              No issues available
            </h4>
            <p className="text-xs text-gray-500 font-light">
              All recent activities will appear here
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={notification.onClick}
              className="flex gap-3 px-4 py-3 border-b border-[#E6E6E6] hover:bg-[#FDEFEF] transition-colors duration-200 cursor-pointer"
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5"
                style={{
                  backgroundColor: notification.iconBackgroundColor || '#FCE7E6',
                  color: notification.iconColor || '#EC615B',
                }}
              >
                {notification.icon || defaultIcon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-[#181918] mb-1">{notification.title}</h4>
                <p className="text-xs text-[#181918] font-light line-clamp-2">
                  {notification.description}
                </p>
              </div>

              {/* Timestamp/Badge */}
              <div className="flex-shrink-0">
                {notification.isNew ? (
                  <span className="text-[#EC615B] text-xs font-medium px-2 py-1 rounded">New</span>
                ) : (
                  <span className="text-xs text-gray-400">{notification.timestamp}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
