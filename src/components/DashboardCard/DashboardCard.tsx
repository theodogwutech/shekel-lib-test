import React, { useState } from 'react';

export interface DashboardCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  showVisibilityToggle?: boolean;
  onVisibilityToggle?: () => void;
  valuePrefix?: string;
  ledgerBalance?: string | number;
  backgroundPattern?: 'wave' | 'grid' | 'none';
  width?: string | number;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  label,
  value,
  icon,
  showVisibilityToggle = true,
  onVisibilityToggle,
  valuePrefix = '₦',
  ledgerBalance,
  backgroundPattern = 'wave',
  width = 348,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    if (onVisibilityToggle) {
      onVisibilityToggle();
    }
  };
  const defaultIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M7 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <>
      <style>
        {`
          .dashboard-card-bg {
            background: radial-gradient(circle at 50% 136%, #7A7F7A 0%, #181918 100%);
          }

          .dashboard-card-pattern {
            background-image: url('/images/card-pattern.svg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
        `}
      </style>
      <div
        className={`dashboard-card-bg relative overflow-hidden min-h-[160px] flex flex-col justify-between rounded-[20px] px-[22px] pt-3 pb-1 transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer ${className}`}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
          transition: 'all 0.3s ease-in-out',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 24px 0 rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
        }}
      >
        {backgroundPattern !== 'none' && (
          <div className="dashboard-card-pattern absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none transition-opacity duration-300" />
        )}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#616161] rounded-full flex items-center justify-center text-white transition-transform duration-300 ease-in-out hover:scale-110">
              {icon || defaultIcon}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-[#E6E6E6] font-light transition-colors duration-200">{label}</span>
            {showVisibilityToggle && (
              <button
                className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
                onClick={handleToggleVisibility}
                aria-label="Toggle visibility"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.61342 8.47806C1.52262 8.3343 1.47723 8.26242 1.45182 8.15155C1.43273 8.06827 1.43273 7.93694 1.45182 7.85366C1.47723 7.74279 1.52262 7.67091 1.61341 7.52715C2.36369 6.33916 4.59693 3.33594 8.00027 3.33594C11.4036 3.33594 13.6369 6.33916 14.3871 7.52715C14.4779 7.67091 14.5233 7.74279 14.5487 7.85366C14.5678 7.93694 14.5678 8.06827 14.5487 8.15155C14.5233 8.26242 14.4779 8.3343 14.3871 8.47806C13.6369 9.66604 11.4036 12.6693 8.00027 12.6693C4.59693 12.6693 2.36369 9.66604 1.61342 8.47806Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.00027 10.0026C9.10484 10.0026 10.0003 9.10717 10.0003 8.0026C10.0003 6.89803 9.10484 6.0026 8.00027 6.0026C6.8957 6.0026 6.00027 6.89803 6.00027 8.0026C6.00027 9.10717 6.8957 10.0026 8.00027 10.0026Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="text-[32px] font-bold text-white transition-all duration-200">
            {isVisible ? `${valuePrefix} ${value}` : '****'}
          </div>
          {ledgerBalance && (
            <div className="mb-1">
              <div className="w-full h-px bg-white/10 mb-2 transition-opacity duration-300"></div>
              <div className="flex items-center gap-2 transition-all duration-200">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.0026 13.3307H3.46927C2.72253 13.3307 2.34917 13.3307 2.06395 13.1854C1.81307 13.0576 1.60909 12.8536 1.48126 12.6027C1.33594 12.3175 1.33594 11.9441 1.33594 11.1974V4.7974C1.33594 4.05066 1.33594 3.67729 1.48126 3.39208C1.60909 3.14119 1.81307 2.93722 2.06395 2.80939C2.34917 2.66406 2.72253 2.66406 3.46927 2.66406H3.73594C5.22941 2.66406 5.97615 2.66406 6.54658 2.95471C7.04834 3.21037 7.45629 3.61832 7.71195 4.12009C8.0026 4.69052 8.0026 5.43726 8.0026 6.93073M8.0026 13.3307V6.93073M8.0026 13.3307H12.5359C13.2827 13.3307 13.656 13.3307 13.9413 13.1854C14.1921 13.0576 14.3961 12.8536 14.5239 12.6027C14.6693 12.3175 14.6693 11.9441 14.6693 11.1974V4.7974C14.6693 4.05066 14.6693 3.67729 14.5239 3.39208C14.3961 3.14119 14.1921 2.93722 13.9413 2.80939C13.656 2.66406 13.2827 2.66406 12.5359 2.66406H12.2693C10.7758 2.66406 10.0291 2.66406 9.45863 2.95471C8.95686 3.21037 8.54892 3.61832 8.29325 4.12009C8.0026 4.69052 8.0026 5.43726 8.0026 6.93073"
                    stroke="#EC615B"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs text-[#E6E6E6] font-light transition-all duration-200">
                  Ledger Balance {isVisible ? `${valuePrefix} ${ledgerBalance}` : '****'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
