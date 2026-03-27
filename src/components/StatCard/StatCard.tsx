import React from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconBackgroundColor?: string;
  iconColor?: string;
  valuePrefix?: string;
  progressText?: string;
  badge?: string;
  width?: string | number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconBackgroundColor = '#E8F4FD',
  iconColor = '#4A9FD8',
  valuePrefix = '₦',
  progressText,
  badge,
  width = 347,
  className = '',
}) => {
  const defaultIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M7 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <div
      className={`bg-white border border-[#E6E6E6] rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 ease-in-out hover:border-gray-300 hover:-translate-y-1 cursor-pointer ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px 0 rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5 transition-transform duration-300 ease-in-out group-hover:scale-110"
            style={{
              backgroundColor: iconBackgroundColor,
              color: iconColor,
            }}
          >
            {icon || defaultIcon}
          </div>
          {badge && (
            <div className="bg-[#EBEBEB] text-[#181918] text-[11px] font-medium px-2 py-1 rounded-full border border-[#D1D1D1] transition-colors duration-200">
              {badge}
            </div>
          )}
        </div>
        <div className="text-sm text-[#181918] font-light transition-colors duration-200">
          {label}
        </div>
        <div className="text-[20px] font-bold text-[#181918] transition-all duration-200">
          {valuePrefix} {value}
        </div>
      </div>
      {progressText && (
        <div className="text-xs text-gray-400 font-normal mt-4 transition-colors duration-200">
          {progressText}
        </div>
      )}
    </div>
  );
};
