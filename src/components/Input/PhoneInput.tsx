import React, { useState, useEffect } from 'react';
import { Input as AntInput, Select, InputRef } from 'antd';
import type { InputProps as AntInputProps } from 'antd';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

export interface PhoneInputProps
  extends Omit<AntInputProps, 'addonBefore' | 'value' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  countryCode?: string;
  onCountryCodeChange?: (value: string) => void;
  countryCodes?: { value: string; label: string }[];
  showCountryCodeDropdown?: boolean;
  format?: 'default' | 'spaced' | 'dashed' | 'none';
  customFormat?: (value: string) => string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control?: Control<any>;
}

const PhoneInputBase = React.forwardRef<InputRef, Omit<PhoneInputProps, 'control'>>(({
  label,
  error,
  helperText,
  className = '',
  countryCode = '+234',
  onCountryCodeChange,
  countryCodes = [
    { value: '+234', label: '+234' },
    { value: '+1', label: '+1' },
    { value: '+44', label: '+44' },
    { value: '+91', label: '+91' },
  ],
  showCountryCodeDropdown = true,
  format = 'spaced',
  customFormat,
  value,
  onChange,
  ...props
}, ref) => {
  const errorClass = error ? 'phone-input-error-state' : '';
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value !== undefined) {
      const cleaned = String(value).replace(/\D/g, '');
      const formatted = formatPhoneNumber(cleaned);
      setDisplayValue(formatted);
    }
  }, [value, format, countryCode]);

  const formatPhoneNumber = (val: string): string => {
    const cleaned = val.replace(/\D/g, '');

    if (customFormat) {
      return customFormat(cleaned);
    }

    if (format === 'none') {
      return cleaned;
    }

    let formatted = '';

    if (format === 'spaced') {
      if (cleaned.length <= 3) {
        formatted = cleaned;
      } else if (cleaned.length <= 6) {
        formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      } else {
        formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
      }
    } else if (format === 'dashed') {
      if (cleaned.length <= 3) {
        formatted = cleaned;
      } else if (cleaned.length <= 6) {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      } else {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
    } else {
      if (countryCode === '+1') {
        if (cleaned.length <= 3) {
          formatted = cleaned;
        } else if (cleaned.length <= 6) {
          formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
        } else {
          formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
        }
      } else {
        if (cleaned.length <= 3) {
          formatted = cleaned;
        } else if (cleaned.length <= 6) {
          formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
        } else {
          formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
        }
      }
    }

    return formatted;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^\d$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'Tab' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'Home' &&
      e.key !== 'End'
    ) {
      e.preventDefault();
    }
    props.onKeyDown?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;

    const cleaned = input.value.replace(/\D/g, '');
    const formatted = formatPhoneNumber(cleaned);

    setDisplayValue(formatted);

    const oldLength = displayValue.length;
    const newLength = formatted.length;
    const diff = newLength - oldLength;

    requestAnimationFrame(() => {
      const newCursorPosition = Math.max(0, Math.min(cursorPosition + diff, formatted.length));
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    });

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: cleaned },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const numericData = pastedData.replace(/\D/g, '');

    const target = e.target as HTMLInputElement;
    const start = target.selectionStart || 0;
    const currentCleaned = displayValue.replace(/\D/g, '');
    const newCleaned = currentCleaned.slice(0, start) + numericData;

    const formatted = formatPhoneNumber(newCleaned);
    setDisplayValue(formatted);

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: newCleaned },
      } as any;
      onChange(syntheticEvent);
    }

    props.onPaste?.(e);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: error ? '#C21919' : '#181918' }}
        >
          {label}
          {props.required && <span style={{ color: '#C21919' }}>*</span>}
        </label>
      )}
      <style>
        {`
          .phone-input-container {
            display: flex;
            gap: 8px;
          }

          .phone-input-error-state .ant-select-selector {
            border-color: #C21919 !important;
          }

          .phone-input-error-state .ant-select-focused .ant-select-selector {
            border-color: #C21919 !important;
            box-shadow: 0 0 0 2px rgba(194, 25, 25, 0.1) !important;
          }

          .phone-input-error-state .ant-input {
            border-color: #C21919 !important;
          }

          .phone-input-error-state .ant-input:focus {
            border-color: #C21919 !important;
            box-shadow: 0 0 0 2px rgba(194, 25, 25, 0.1) !important;
          }

          .phone-input-country-code-static {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 61px;
            height: 44px;
            border-radius: 12px;
            border: 1px solid;
            font-size: 14px;
            font-weight: 500;
            background-color: #FAFAFA;
          }

          .phone-input-error-state .phone-input-country-code-static {
            border-color: #C21919 !important;
          }
        `}
      </style>
      <div className={`phone-input-container ${errorClass}`}>
        {showCountryCodeDropdown ? (
          <Select
            value={countryCode}
            onChange={onCountryCodeChange}
            options={countryCodes}
            style={{
              width: '85px',
              borderRadius: '12px',
            }}
            className={errorClass}
            popupClassName="country-code-dropdown"
            disabled={props.disabled}
          />
        ) : (
          <div
            className="phone-input-country-code-static"
            style={{
              borderColor: error ? '#C21919' : '#D1D1D1',
              color: props.disabled ? '#00000040' : '#000000',
              backgroundColor: props.disabled ? '#f5f5f5' : '#FAFAFA',
            }}
          >
            {countryCode}
          </div>
        )}
        <AntInput
          {...props}
          ref={ref}
          value={displayValue}
          className={className}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onPaste={handlePaste}
          style={{
            flex: 1,
            height: '44px',
            borderRadius: '12px',
            borderColor: error ? '#C21919' : '#D1D1D1',
            ...props.style,
          }}
        />
      </div>
      {error && (
        <div className="flex items-center mt-1 text-xs text-[#C21919]">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
      {!error && helperText && <div className="mt-1 text-xs text-gray-500">{helperText}</div>}
    </div>
  );
});
PhoneInputBase.displayName = 'PhoneInputBase';

const ControlledPhoneInput: React.FC<PhoneInputProps & { control: NonNullable<PhoneInputProps['control']>; name: string }> = ({
  control,
  name,
  error: errorProp,
  ...rest
}) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <PhoneInputBase
      {...rest}
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      onBlur={field.onBlur}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const PhoneInput = React.forwardRef<InputRef, PhoneInputProps>(({ control, name, ...props }, ref) => {
  if (control && name) {
    return <ControlledPhoneInput control={control} name={name} {...props} />;
  }
  return <PhoneInputBase ref={ref} name={name} {...props} />;
});
PhoneInput.displayName = 'PhoneInput';
