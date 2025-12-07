import React from 'react';

export interface StepItem {
  title: string;
  description?: string;
  status?: 'wait' | 'process' | 'finish' | 'error';
  icon?: React.ReactNode;
}

export interface StepsProps {
  items: StepItem[];
  current?: number;
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
}

export const Steps: React.FC<StepsProps> = ({
  items,
  current = 0,
  direction = 'vertical',
  size = 'md',
  variant = 'default',
  className = '',
}) => {
  const getStepStatus = (index: number, item: StepItem): StepItem['status'] => {
    if (item.status) return item.status;
    if (index < current) return 'finish';
    if (index === current) return 'process';
    return 'wait';
  };

  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const descriptionSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const renderIcon = (status: StepItem['status'], icon?: React.ReactNode) => {
    if (icon) return icon;

    if (status === 'finish') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (status === 'error') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return null;
  };

  const getStatusClasses = (status: StepItem['status']) => {
    const isOutline = variant === 'outline';

    switch (status) {
      case 'finish':
        return {
          icon: isOutline
            ? 'bg-white text-green-500 border-green-500'
            : 'bg-green-500 text-white border-green-500',
          title: 'text-gray-900',
          description: 'text-gray-600',
          line: 'bg-green-500',
        };
      case 'process':
        return {
          icon: isOutline
            ? 'bg-white text-blue-500 border-blue-500'
            : 'bg-blue-500 text-white border-blue-500',
          title: 'text-gray-900 font-semibold',
          description: 'text-gray-700',
          line: 'bg-gray-300',
        };
      case 'error':
        return {
          icon: isOutline
            ? 'bg-white text-red-500 border-red-500'
            : 'bg-red-500 text-white border-red-500',
          title: 'text-red-600',
          description: 'text-red-500',
          line: 'bg-gray-300',
        };
      default:
        return {
          icon: 'bg-white text-gray-400 border-gray-300',
          title: 'text-gray-500',
          description: 'text-gray-400',
          line: 'bg-gray-300',
        };
    }
  };

  if (direction === 'horizontal') {
    return (
      <div className={`flex items-start ${className}`}>
        {items.map((item, index) => {
          const status = getStepStatus(index, item);
          const statusClasses = getStatusClasses(status);
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex flex-1 items-start">
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center ${iconSizeClasses[size]} rounded-full border-2 transition-all duration-300 ${statusClasses.icon}`}
                >
                  {renderIcon(status, item.icon)}
                </div>
                <div className="mt-2 text-center">
                  <div className={`${textSizeClasses[size]} ${statusClasses.title} transition-colors duration-300`}>
                    {item.title}
                  </div>
                  {item.description && (
                    <div className={`${descriptionSizeClasses[size]} ${statusClasses.description} mt-1 transition-colors duration-300`}>
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
              {!isLast && (
                <div className={`flex-1 h-0.5 mt-4 mx-2 ${statusClasses.line} transition-colors duration-300`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item, index) => {
        const status = getStepStatus(index, item);
        const statusClasses = getStatusClasses(status);
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`flex items-center justify-center ${iconSizeClasses[size]} rounded-full border-2 transition-all duration-300 ${statusClasses.icon}`}
              >
                {renderIcon(status, item.icon)}
              </div>
              {!isLast && (
                <div className={`w-0.5 flex-1 my-1 ${statusClasses.line} transition-colors duration-300`} style={{ minHeight: '20px' }} />
              )}
            </div>
            <div className="flex-1 pb-6">
              <div className={`${textSizeClasses[size]} ${statusClasses.title} transition-colors duration-300`}>
                {item.title}
              </div>
              {item.description && (
                <div className={`${descriptionSizeClasses[size]} ${statusClasses.description} mt-1 transition-colors duration-300`}>
                  {item.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
