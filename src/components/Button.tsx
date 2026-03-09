import type { ButtonHTMLAttributes, CSSProperties, FC, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  style?: CSSProperties;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  hoverColor,
  bgColor,
  textColor,
  borderColor,
  hoverBgColor,
  hoverTextColor,
  rounded = 'lg',
  style,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-normal transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const variantClasses = {
    primary: 'bg-[#EC615B] hover:bg-[#D4554F] text-white focus:ring-[#EC615B] shadow-sm hover:shadow-md',
    outlined: 'border border-gray-300 bg-white hover:bg-gray-50 text-[#181918] focus:ring-gray-300',
    ghost: 'bg-gray-100 hover:bg-gray-200 text-[#181918] focus:ring-gray-300',
    text: 'text-[#181918] hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
    responsive: 'px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3 lg:text-lg gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  // Determine variant classes, but they can be overridden by custom color props
  let variantClassesToUse = variantClasses[variant];

  // If custom colors are provided, remove variant styling and use custom styles
  if (bgColor || textColor || borderColor) {
    variantClassesToUse = '';
  }

  const combinedClassName = `${baseClasses} ${variantClassesToUse} ${sizeClasses[size]} ${roundedClasses[rounded]} ${widthClass} ${className}`;

  const renderIcon = () => {
    if (loading) {
      return (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    }
    return icon;
  };

  // Merge custom styles with generated inline styles
  const inlineStyles: CSSProperties = {
    ...style,
  };

  // Apply custom color props as inline styles
  if (bgColor) inlineStyles.backgroundColor = bgColor;
  if (textColor) inlineStyles.color = textColor;
  if (borderColor) inlineStyles.borderColor = borderColor;

  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      style={inlineStyles}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          if (hoverBgColor) {
            e.currentTarget.style.backgroundColor = hoverBgColor;
          } else if (hoverColor) {
            e.currentTarget.style.backgroundColor = hoverColor;
          }
          if (hoverTextColor) {
            e.currentTarget.style.color = hoverTextColor;
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          if (bgColor || hoverBgColor || hoverColor) {
            e.currentTarget.style.backgroundColor = bgColor || '';
          }
          if (textColor || hoverTextColor) {
            e.currentTarget.style.color = textColor || '';
          }
        }
      }}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button;
