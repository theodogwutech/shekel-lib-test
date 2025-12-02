import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

export interface CustomButtonProps extends Omit<AntButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 border-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 border-gray-500',
    success: 'bg-green-500 hover:bg-green-600 border-green-500',
    danger: 'bg-red-500 hover:bg-red-600 border-red-500',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClassName = `${variantClasses[variant]} ${widthClass} ${className}`;

  return (
    <AntButton
      type="primary"
      className={combinedClassName}
      {...props}
    />
  );
};

export default Button;
