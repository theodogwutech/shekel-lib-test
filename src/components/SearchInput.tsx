import type { FC, ReactNode, InputHTMLAttributes, CSSProperties } from 'react';

/**
 * @deprecated SearchInput is deprecated as of v1.0.11. Please use the new Input component instead.
 * The new Input component provides better functionality and consistent styling with Ant Design.
 */
export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  fullWidth?: boolean;
  onIconClick?: () => void;
  bgColor?: string;
  borderColor?: string;
  focusBorderColor?: string;
  iconColor?: string;
  textColor?: string;
  placeholderColor?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  style?: CSSProperties;
}

/**
 * @deprecated SearchInput is deprecated as of v1.0.11. Please use the new Input component instead.
 */
export const SearchInput: FC<SearchInputProps> = ({
  icon,
  iconPosition = 'left',
  size = 'md',
  fullWidth = false,
  className = '',
  onIconClick,
  bgColor,
  borderColor,
  focusBorderColor,
  iconColor,
  textColor,
  placeholderColor,
  rounded = 'md',
  style,
  ...props
}) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '[Shekel Shared Lib] SearchInput is deprecated as of v1.0.11. Please use the new Input component instead for better functionality and consistent styling.'
    );
  }

  const containerBaseClasses = 'relative inline-flex items-center';

  const inputBaseClasses =
    'border focus:outline-none focus:ring-1 transition-all duration-200 ease-in-out';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
    responsive: 'px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-3 text-sm sm:text-base md:text-lg',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    responsive: 'w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };

  const paddingWithIcon =
    iconPosition === 'left'
      ? size === 'sm'
        ? 'pl-9'
        : size === 'md'
        ? 'pl-10'
        : size === 'lg'
        ? 'pl-12'
        : 'pl-9 sm:pl-10 md:pl-12'
      : size === 'sm'
      ? 'pr-9'
      : size === 'md'
      ? 'pr-10'
      : size === 'lg'
      ? 'pr-12'
      : 'pr-9 sm:pr-10 md:pr-12';

  const widthClass = fullWidth ? 'w-full' : '';

  // Build custom styles for colors
  const customStyles: CSSProperties = {
    backgroundColor: bgColor,
    borderColor: borderColor || '#D1D5DB',
    color: textColor,
    ...style,
  };

  // Determine placeholder color class
  const placeholderClass = placeholderColor
    ? ''
    : 'placeholder:text-gray-400';

  // Build border and default colors
  const defaultBorderClass = borderColor ? '' : 'border-gray-300';
  const defaultTextClass = textColor ? '' : 'text-gray-900';
  const defaultFocusClass = focusBorderColor
    ? ''
    : 'focus:ring-[#EC615B] focus:border-[#EC615B]';

  const inputClassName = `${inputBaseClasses} ${!className.includes('px-') && !className.includes('py-') ? sizeClasses[size] : ''} ${
    icon ? paddingWithIcon : ''
  } ${widthClass} ${!className.includes('rounded') ? roundedClasses[rounded] : ''} ${!className.includes('border-') ? defaultBorderClass : ''} ${defaultTextClass} ${defaultFocusClass} ${placeholderClass} ${className}`;

  const iconPositionClasses = iconPosition === 'left' ? 'left-3' : 'right-3';
  const defaultIconColor = iconColor || 'text-gray-400';
  const hoverIconColor = iconColor ? '' : 'hover:text-gray-600';

  const defaultSearchIcon = (
    <svg
      className={`${iconSizeClasses[size]} ${defaultIconColor}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  return (
    <div className={`${containerBaseClasses} ${widthClass}`}>
      {icon && (
        <div
          className={`absolute ${iconPositionClasses} ${defaultIconColor} ${
            onIconClick ? 'cursor-pointer' : ''
          } ${hoverIconColor}`}
          onClick={onIconClick}
        >
          {icon === true ? defaultSearchIcon : icon}
        </div>
      )}
      <input
        type="text"
        className={inputClassName}
        style={{
          ...customStyles,
          ...(focusBorderColor && {
            '--focus-border-color': focusBorderColor,
          } as CSSProperties),
          ...(placeholderColor && {
            '--placeholder-color': placeholderColor,
          } as CSSProperties),
        }}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
