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
    'stat-card flex flex-col p-4 rounded-lg border transition-all duration-300 ease-out cursor-pointer';

  const stateClasses = selected
    ? 'border-gray-900 bg-white shadow-sm'
    : 'border-gray-200 bg-white hover:border-gray-300';

  const combinedClassName = `${baseClasses} ${stateClasses} ${className}`;

  return (
    <div className={combinedClassName} onClick={onClick}>
      <div className="transition-transform duration-300 ease-out hover:scale-[0.98] active:scale-[0.96]">
        <span className="text-sm text-gray-600 font-normal mb-2 block">{label}</span>
        <span className="text-3xl font-semibold text-gray-900 stat-value block">{value}</span>
      </div>
    </div>
  );
};

export default StatCard;
