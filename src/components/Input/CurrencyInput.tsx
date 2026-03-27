import React, { useState, useEffect } from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';

export interface CurrencyInputProps extends Omit<AntInputProps, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  currencySymbol?: string;
  formatAmount?: boolean;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  error,
  helperText,
  className = '',
  status,
  currencySymbol = '₦',
  formatAmount = false,
  onChange,
  value: externalValue,
  ...props
}) => {
  const errorClass = error ? 'currency-input-error-state' : '';
  const [displayValue, setDisplayValue] = useState<string>('');

  // Format number with commas
  const formatNumber = (num: string): string => {
    // Remove all non-digit characters except decimal point
    const cleanNum = num.replace(/[^\d.]/g, '');

    // Split into integer and decimal parts
    const parts = cleanNum.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Add commas to integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine with decimal part if exists
    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  };

  // Remove formatting to get raw value
  const unformatNumber = (formatted: string): string => {
    return formatted.replace(/,/g, '');
  };

  // Update display value when external value changes
  useEffect(() => {
    if (externalValue !== undefined) {
      const stringValue = String(externalValue);
      setDisplayValue(formatAmount ? formatNumber(stringValue) : stringValue);
    }
  }, [externalValue, formatAmount]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (formatAmount) {
      const rawValue = unformatNumber(inputValue);
      const formatted = formatNumber(rawValue);
      setDisplayValue(formatted);

      if (onChange) {
        onChange(rawValue, e);
      }
    } else {
      setDisplayValue(inputValue);
      if (onChange) {
        onChange(inputValue, e);
      }
    }
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
          .currency-input-wrapper.ant-input-affix-wrapper {
            display: flex;
            align-items: center;
            padding: 0;
            height: 44px;
            border-radius: 12px;
          }

          .currency-input-wrapper .ant-input-prefix {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 37px;
            height: 41px;
            background-color: #F0F2F4;
            margin: 0;
            border-radius: 12px 0 0 12px;
            color: #000000;
            flex-shrink: 0;
            margin-right: 10px;
          }

          .currency-input-wrapper .ant-input {
            padding: 11px 16px 11px 20px;
            height: 44px;
          }

          .currency-input-error-state.ant-input-affix-wrapper {
            border-color: #C21919 !important;
          }

          .currency-input-error-state.ant-input-affix-wrapper:focus,
          .currency-input-error-state.ant-input-affix-wrapper-focused {
            border-color: #C21919 !important;
            box-shadow: 0 0 0 2px rgba(194, 25, 25, 0.1) !important;
          }
        `}
      </style>
      <AntInput
        className={`currency-input-wrapper ${className} ${errorClass}`}
        status={error ? 'error' : status}
        prefix={<span>{currencySymbol}</span>}
        {...props}
        value={formatAmount ? displayValue : externalValue}
        onChange={handleChange}
        style={{
          borderColor: error ? '#C21919' : '#D1D1D1',
          ...props.style,
        }}
      />
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
};
