import type { FC, ReactNode } from 'react';

export interface ProgressProps {
  percent?: number;
  status?: 'normal' | 'success' | 'exception' | 'active';
  showInfo?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  className?: string;
  format?: (percent: number) => ReactNode;
  bgColor?: string;
  successColor?: string;
  exceptionColor?: string;
  trackColor?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const Progress: FC<ProgressProps> = ({
  percent = 0,
  status = 'normal',
  showInfo = true,
  strokeColor,
  strokeWidth,
  size = 'md',
  className = '',
  format,
  bgColor,
  successColor,
  exceptionColor,
  trackColor,
  rounded = 'full',
}) => {
  const clampedPercent = Math.min(100, Math.max(0, percent));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
    responsive: 'h-1.5 sm:h-2 md:h-3 lg:h-4',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    responsive: 'text-xs sm:text-sm md:text-base lg:text-lg',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const getStatusColor = () => {
    if (strokeColor) return strokeColor;

    switch (status) {
      case 'success':
        return successColor || 'bg-green-500';
      case 'exception':
        return exceptionColor || 'bg-red-500';
      case 'active':
        return bgColor || 'bg-[#EC615B]';
      default:
        if (clampedPercent === 100) return successColor || 'bg-green-500';
        return bgColor || 'bg-[#EC615B]';
    }
  };

  const getTrackColor = () => {
    return trackColor || 'bg-gray-200';
  };

  const getStatusIcon = () => {
    if (status === 'success' || clampedPercent === 100) {
      return (
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (status === 'exception') {
      return (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return null;
  };

  const formatPercent = () => {
    if (format) return format(clampedPercent);
    return `${Math.round(clampedPercent)}%`;
  };

  const height = strokeWidth ? `${strokeWidth}px` : undefined;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1">
        <div
          className={`w-full overflow-hidden ${heightClasses[size]} ${roundedClasses[rounded]} ${getTrackColor()}`}
          style={{ height }}
        >
          <div
            className={`${getStatusColor()} ${heightClasses[size]} ${roundedClasses[rounded]} transition-all duration-300 ease-out ${
              status === 'active' ? 'progress-active' : ''
            }`}
            style={{
              width: `${clampedPercent}%`,
              height,
            }}
          />
        </div>
      </div>

      {showInfo && (
        <div className={`flex items-center gap-1 ${textSizeClasses[size]} text-gray-600 font-normal`}>
          {getStatusIcon() || formatPercent()}
        </div>
      )}
    </div>
  );
};

export default Progress;
