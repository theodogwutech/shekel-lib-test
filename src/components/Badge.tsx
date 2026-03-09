import type { FC, ReactNode, CSSProperties } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  dot?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  style?: CSSProperties;
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  iconPosition = 'left',
  className = '',
  bgColor,
  textColor,
  borderColor,
  rounded = 'full',
  style,
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-[#181918]',
    primary: 'bg-[#FCEAE9] text-[#EC615B]',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
    responsive: 'px-1.5 py-0.5 text-[10px] sm:px-2 sm:py-0.5 sm:text-xs md:px-2.5 md:py-1 md:text-sm lg:px-3 lg:py-1.5 lg:text-base',
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    responsive: 'w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5',
  };

  const dotColorClasses = {
    default: 'bg-gray-600',
    primary: 'bg-[#EC615B]',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
    info: 'bg-cyan-600',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
    responsive: 'w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const customStyles: CSSProperties = {
    ...(bgColor && { backgroundColor: bgColor }),
    ...(textColor && { color: textColor }),
    ...(borderColor && { borderColor, borderWidth: '1px', borderStyle: 'solid' }),
    ...style,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium transition-all duration-200 ${!bgColor ? variantClasses[variant] : ''} ${sizeClasses[size]} ${roundedClasses[rounded]} ${className}`}
      style={customStyles}
    >
      {dot && (
        <span className={`rounded-full ${dotSizeClasses[size]} ${dotColorClasses[variant]}`} />
      )}
      {icon && iconPosition === 'left' && (
        <span className={`inline-flex items-center ${iconSizeClasses[size]}`}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={`inline-flex items-center ${iconSizeClasses[size]}`}>
          {icon}
        </span>
      )}
    </span>
  );
};

export default Badge;
