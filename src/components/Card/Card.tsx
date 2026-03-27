import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';

export interface CardProps extends AntCardProps {
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({
  shadow = 'md',
  className = '',
  children,
  ...props
}) => {
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const combinedClassName = `${shadowClasses[shadow]} rounded-lg ${className}`;

  return (
    <AntCard
      className={combinedClassName}
      {...props}
    >
      {children}
    </AntCard>
  );
};
