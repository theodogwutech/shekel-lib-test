import type { FC, HTMLAttributes, CSSProperties } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'responsive';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  bordered?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bgColor?: string;
  borderColor?: string;
  style?: CSSProperties;
}

export const Card: FC<CardProps> = ({
  padding = 'md',
  shadow = 'sm',
  hover = false,
  bordered = true,
  rounded = 'lg',
  className = '',
  bgColor,
  borderColor,
  style,
  children,
  ...props
}) => {
  const baseClasses = 'card transition-all duration-300 ease-out';

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    responsive: 'p-2 sm:p-3 md:p-4 lg:p-6',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const borderClass = bordered ? `border ${borderColor || 'border-gray-200'}` : '';
  const hoverClass = hover ? 'cursor-pointer' : '';
  const bgClass = bgColor ? '' : 'bg-white';

  const combinedClassName = `${baseClasses} ${bgClass} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${roundedClasses[rounded]} ${borderClass} ${hoverClass} ${className}`;

  const mergedStyle: CSSProperties = {
    ...(bgColor && { backgroundColor: bgColor }),
    ...style,
  };

  return (
    <div className={combinedClassName} style={mergedStyle} {...props}>
      <div className={hover ? 'transition-transform duration-300 ease-out hover:scale-[0.98] active:scale-[0.96]' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Card;
