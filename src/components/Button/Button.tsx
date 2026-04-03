import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

export interface ButtonProps extends Omit<AntButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  className = '',
  children,
  ...props
}) => {
  const getSizeHeight = () => {
    switch (size) {
      case 'xsmall':
        return '32px';
      case 'small':
        return '40px';
      case 'medium':
        return '48px';
      case 'large':
        return '52px';
      default:
        return '52px';
    }
  };

  const getVariantStyles = () => {
    const height = getSizeHeight();

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#EC615B',
          borderColor: '#EC615B',
          color: '#FFFFFF',
          height,
          borderRadius: '8px',
        };
      case 'secondary':
        return {
          backgroundColor: '#6B7280',
          borderColor: '#6B7280',
          color: '#FFFFFF',
          height,
          borderRadius: '8px',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: '#EC615B',
          color: '#EC615B',
          height,
          borderRadius: '8px',
        };
      case 'ghost':
        return {
          backgroundColor: '#EFF2F3',
          borderColor: '#EFF2F3',
          color: '#181918',
          height,
          borderRadius: '8px',
        };
      default:
        return {};
    }
  };

  return (
    <AntButton
      className={className}
      {...props}
      style={{
        ...getVariantStyles(),
        ...props.style,
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          (e.target as HTMLElement).style.backgroundColor = '#D8524D';
        } else if (variant === 'secondary') {
          (e.target as HTMLElement).style.backgroundColor = '#4B5563';
        } else if (variant === 'outline') {
          (e.target as HTMLElement).style.backgroundColor = '#F3F4F6';
        } else if (variant === 'ghost') {
          (e.target as HTMLElement).style.backgroundColor = '#E1E4E6';
        }
        props.onMouseEnter?.(e as any);
      }}
      onMouseLeave={(e) => {
        const styles = getVariantStyles();
        (e.target as HTMLElement).style.backgroundColor = styles.backgroundColor || '';
        props.onMouseLeave?.(e as any);
      }}
    >
      {children}
    </AntButton>
  );
};
