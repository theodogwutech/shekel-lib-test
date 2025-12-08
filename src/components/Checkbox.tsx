import React, { useState } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline';
  className?: string;
  id?: string;
  name?: string;
  value?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  indeterminate = false,
  size = 'md',
  variant = 'filled',
  className = '',
  id,
  name,
  value,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newChecked = e.target.checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  const isFilled = variant === 'filled';

  const getCheckboxClasses = () => {
    if (disabled) {
      return 'cursor-not-allowed opacity-50 border-gray-300 bg-gray-100';
    }

    if (isFilled) {
      // Filled variant
      if (!checked && !indeterminate) {
        return 'border-gray-300 bg-white hover:border-gray-400';
      }
      return 'border-[#EC615B] bg-[#EC615B] hover:bg-[#D4554F] hover:border-[#D4554F]';
    } else {
      // Outline variant
      if (!checked && !indeterminate) {
        return 'border-gray-300 bg-white hover:border-gray-400';
      }
      return 'border-[#EC615B] bg-white hover:border-[#D4554F]';
    }
  };

  const getIconColor = () => {
    if (isFilled) {
      return 'text-white';
    }
    return 'text-[#EC615B]';
  };

  return (
    <div className="inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className={`
          relative flex items-center justify-center
          ${sizeClasses[size]}
          ${variant === 'outline' ? 'border' : 'border-2'}
          rounded
          transition-all duration-200 ease-out
          cursor-pointer
          ${getCheckboxClasses()}
          ${className}
        `}
      >
        {/* Checkmark Icon */}
        {checked && !indeterminate && (
          <svg
            className={`${iconSizeClasses[size]} ${getIconColor()}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}

        {/* Indeterminate Icon */}
        {indeterminate && (
          <svg
            className={`${iconSizeClasses[size]} ${getIconColor()}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="4" y="11" width="16" height="2" rx="1" />
          </svg>
        )}
      </label>
    </div>
  );
};

export default Checkbox;
