import React from 'react';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onIconClick?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  iconPosition = 'left',
  size = 'md',
  fullWidth = false,
  className = '',
  onIconClick,
  ...props
}) => {
  const containerBaseClasses = 'relative inline-flex items-center';

  const inputBaseClasses =
    'border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out placeholder:text-gray-400';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const paddingWithIcon =
    iconPosition === 'left'
      ? size === 'sm'
        ? 'pl-9'
        : size === 'md'
        ? 'pl-10'
        : 'pl-12'
      : size === 'sm'
      ? 'pr-9'
      : size === 'md'
      ? 'pr-10'
      : 'pr-12';

  const widthClass = fullWidth ? 'w-full' : '';

  const inputClassName = `${inputBaseClasses} ${sizeClasses[size]} ${
    icon ? paddingWithIcon : ''
  } ${widthClass} ${className}`;

  const iconPositionClasses = iconPosition === 'left' ? 'left-3' : 'right-3';

  const defaultSearchIcon = (
    <svg
      className={iconSizeClasses[size]}
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
          className={`absolute ${iconPositionClasses} text-gray-400 ${
            onIconClick ? 'cursor-pointer hover:text-gray-600' : ''
          }`}
          onClick={onIconClick}
        >
          {icon === true ? defaultSearchIcon : icon}
        </div>
      )}
      <input type="text" className={inputClassName} {...props} />
    </div>
  );
};

export default SearchInput;
