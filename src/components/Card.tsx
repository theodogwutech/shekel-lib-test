import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  bordered?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({
  padding = 'md',
  shadow = 'sm',
  hover = false,
  bordered = true,
  rounded = 'lg',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'card bg-white transition-all duration-300 ease-out';

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
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

  const borderClass = bordered ? 'border border-gray-200' : '';
  const hoverClass = hover ? 'cursor-pointer' : '';

  const combinedClassName = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${roundedClasses[rounded]} ${borderClass} ${hoverClass} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      <div className={hover ? 'transition-transform duration-300 ease-out hover:scale-[0.98] active:scale-[0.96]' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Card;
