import React from 'react';

export interface ActionCardProps {
  label: string;
  icon: React.ReactNode;
  iconColor?: 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'yellow';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  label,
  icon,
  iconColor = 'blue',
  onClick,
  disabled = false,
  className = '',
}) => {
  const colorStyles = {
    red: {
      background: '#FFEAE8',
      color: '#EC615B',
    },
    blue: {
      background: '#E8F4FD',
      color: '#4A9FD8',
    },
    green: {
      background: '#E8F8F0',
      color: '#5FB894',
    },
    purple: {
      background: '#F3E8FD',
      color: '#9B59D8',
    },
    orange: {
      background: '#FFF3E8',
      color: '#F59E42',
    },
    yellow: {
      background: '#FFFBE8',
      color: '#F5D742',
    },
  };

  const currentColor = colorStyles[iconColor];

  return (
    <button
      className={`bg-[#FDFDFD] border border-[#E6E6E6] rounded-[14px] p-4 md:py-2.5 md:px-[18px] flex flex-col md:flex-row items-start md:items-center justify-start gap-2 md:gap-4 cursor-pointer transition-all duration-300 ease-in-out w-full md:h-[60px] hover:border-gray-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[#E6E6E6] disabled:hover:translate-y-0 ${className}`}
      style={{
        boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = '0 0 16px 0 rgba(0, 0, 0, 0.08)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 [&>svg]:w-6 [&>svg]:h-6 transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: currentColor.background,
          color: currentColor.color,
        }}
      >
        {icon}
      </div>
      <div className="text-sm font-medium text-[#181918] transition-colors duration-200 text-left">{label}</div>
    </button>
  );
};
