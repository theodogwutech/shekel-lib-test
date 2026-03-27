import React from 'react';
import { Input as AntInput } from 'antd';
import type { PasswordProps as AntPasswordProps } from 'antd/es/input';

export interface PasswordInputProps extends AntPasswordProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  helperText,
  className = '',
  status,
  ...props
}) => {
  const errorClass = error ? 'password-input-error-state' : '';
  const combinedClassName = `password-input-custom ${className} ${errorClass}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2" style={{ color: error ? '#C21919' : '#181918' }}>
          {label}
          {props.required && <span style={{ color: '#C21919' }}>*</span>}
        </label>
      )}
      <style>
        {error && `
          .password-input-error-state .ant-input-group-addon {
            border-color: #C21919 !important;
          }
          .password-input-error-state .ant-input-group-addon:first-child {
            border-right: none !important;
          }
          .password-input-error-state .ant-input,
          .password-input-error-state .ant-input-password .ant-input {
            border-color: #C21919 !important;
          }
          .password-input-error-state .ant-input:focus,
          .password-input-error-state .ant-input-focused,
          .password-input-error-state .ant-input-password .ant-input:focus {
            border-color: #C21919 !important;
            box-shadow: 0 0 0 2px rgba(194, 25, 25, 0.1) !important;
          }
        `}
      </style>
      <AntInput.Password
        className={combinedClassName}
        status={error ? 'error' : status}
        {...props}
        style={{
          height: '44px',
          borderRadius: '12px',
          borderColor: error ? '#C21919' : '#D1D1D1',
          ...props.style,
        }}
      />
      {error && (
        <div className="flex items-center mt-1 text-xs text-[#C21919]">
          <svg
            className="w-3 h-3 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
      {!error && helperText && (
        <div className="mt-1 text-xs text-gray-500">{helperText}</div>
      )}
    </div>
  );
};
