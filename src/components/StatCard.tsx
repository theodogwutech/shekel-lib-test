import React from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  selected = false,
  onClick,
  className = '',
}) => {
  const baseClasses =
    'stat-card relative flex flex-col p-4 rounded-lg border transition-all duration-500 ease-in-out cursor-pointer overflow-hidden';

  const stateClasses = selected
    ? 'border-[#181918] bg-[#F4F4F4] shadow-sm scale-[1.02]'
    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm';

  const combinedClassName = `${baseClasses} ${stateClasses} ${className}`;

  return (
    <div className={combinedClassName} onClick={onClick}>
      {/* Active indicator slide effect */}
      {selected && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EC615B]/5 to-transparent animate-slide-in pointer-events-none" />
      )}

      <div className="relative z-10 transition-transform duration-300 ease-out hover:scale-[0.98] active:scale-[0.96]">
        <span className={`text-sm font-normal mb-2 block transition-colors duration-500 ${selected ? 'text-gray-700' : 'text-gray-600'}`}>
          {label}
        </span>
        <span className={`text-3xl font-semibold stat-value block transition-all duration-500 ${selected ? 'text-[#181918] scale-105' : 'text-[#181918]'}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
