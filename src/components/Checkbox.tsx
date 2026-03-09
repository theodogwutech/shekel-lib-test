import { useState } from 'react';
import type { FC, ChangeEvent, CSSProperties } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  variant?: 'filled' | 'outline';
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  checkedColor?: string;
  uncheckedColor?: string;
  checkedBorderColor?: string;
  style?: CSSProperties;
}

export const Checkbox: FC<CheckboxProps> = ({
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
  checkedColor = '#EC615B',
  uncheckedColor = '#ffffff',
  checkedBorderColor = '#EC615B',
  style,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    responsive: 'w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
    responsive: 'w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4',
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
      return '';
    } else {
      // Outline variant
      if (!checked && !indeterminate) {
        return 'border-gray-300 bg-white hover:border-gray-400';
      }
      return '';
    }
  };

  const getCheckboxInlineStyles = (): CSSProperties | undefined => {
    if (disabled) return undefined;

    if (!checked && !indeterminate) {
      return undefined;
    }

    if (isFilled) {
      return {
        borderColor: checkedBorderColor,
        backgroundColor: checkedColor,
      };
    } else {
      return {
        borderColor: checkedBorderColor,
        backgroundColor: uncheckedColor,
      };
    }
  };

  const getIconColor = () => {
    if (isFilled && (checked || indeterminate)) {
      return 'text-white';
    }
    return '';
  };

  return (
    <div className="inline-flex items-center" style={style}>
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
        style={getCheckboxInlineStyles()}
      >
        {/* Checkmark Icon */}
        {checked && !indeterminate && (
          <svg
            className={`${iconSizeClasses[size]} ${getIconColor()}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
            style={
              !isFilled && (checked || indeterminate)
                ? { color: checkedColor }
                : undefined
            }
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
            style={
              !isFilled && (checked || indeterminate)
                ? { color: checkedColor }
                : undefined
            }
          >
            <rect x="4" y="11" width="16" height="2" rx="1" />
          </svg>
        )}
      </label>
    </div>
  );
};

export default Checkbox;
