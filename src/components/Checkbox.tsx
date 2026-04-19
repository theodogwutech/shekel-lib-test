import React, { useState } from 'react';
import type { FC, ChangeEvent, CSSProperties, ReactNode } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event?: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  label?: ReactNode;
  labelClassName?: string;
  labelStyle?: CSSProperties;
  labelPosition?: 'left' | 'right';
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  accentColor?: string;
  borderColor?: string;
  boxBgColor?: string;
  boxRadius?: number | string;
  style?: CSSProperties;
  required?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
}

const SIZE = {
  sm: { box: 16, icon: 10 },
  md: { box: 20, icon: 14 },
  lg: { box: 24, icon: 16 },
};

export const Checkbox: FC<CheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  indeterminate = false,
  size = 'md',
  variant = 'outline',
  label,
  labelClassName = '',
  labelStyle,
  labelPosition = 'right',
  className = '',
  id,
  name,
  value,
  accentColor = '#EC615B',
  borderColor = '#181918',
  boxBgColor = '#FFFFFF',
  boxRadius = 6,
  style,
  required,
  autoFocus,
  tabIndex,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? !!controlledChecked : internalChecked;

  const reactId = React.useId();
  const inputId = id ?? reactId;
  const active = checked || indeterminate;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked, e);
  };

  const dims = SIZE[size];
  const boxRad = typeof boxRadius === 'number' ? `${boxRadius}px` : boxRadius;
  const isFilled = variant === 'filled';
  const activeBg = isFilled ? accentColor : boxBgColor;
  const activeBorder = accentColor;

  const boxStyle: CSSProperties = {
    width: dims.box,
    height: dims.box,
    borderRadius: boxRad,
    border: `1.5px solid ${active ? activeBorder : borderColor}`,
    backgroundColor: disabled ? '#F5F5F5' : active ? activeBg : boxBgColor,
    transition: 'all 0.15s ease-out',
  };

  const iconColor = isFilled ? '#FFFFFF' : accentColor;

  const box = (
    <span
      aria-hidden
      className="relative inline-flex items-center justify-center shrink-0"
      style={boxStyle}
    >
      <input
        type="checkbox"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        className="absolute inset-0 w-full h-full opacity-0 m-0 p-0 cursor-inherit"
        style={{ appearance: 'none' }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-150 ease-out"
        style={{
          opacity: indeterminate || checked ? 1 : 0,
          transform: indeterminate || checked ? 'scale(1)' : 'scale(0.6)',
          transition: 'opacity 150ms ease-out, transform 150ms ease-out',
        }}
      >
        {indeterminate ? (
          <svg width={dims.icon} height={dims.icon} viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10" stroke={iconColor} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width={dims.icon} height={dims.icon} viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8.5l3.2 3.2L13 5"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </span>
  );

  const labelEl = label ? (
    <span className={`select-none ${labelClassName}`} style={{ color: '#181918', ...labelStyle }}>
      {label}
    </span>
  ) : null;

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center gap-2 align-middle ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      } ${className}`}
      style={style}
      onMouseDown={(e) => {
        // Prevent text selection / scroll-into-view from stealing layout
        if (e.detail > 1) e.preventDefault();
      }}
    >
      {labelPosition === 'left' && labelEl}
      {box}
      {labelPosition === 'right' && labelEl}
    </label>
  );
};

export default Checkbox;
