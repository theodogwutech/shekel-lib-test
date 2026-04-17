import React from 'react';
import { Input as AntInput, InputProps as AntInputProps, InputRef } from 'antd';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

export interface PasswordInputProps extends Omit<AntInputProps, 'suffix'> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  control?: Control<any>;
}

const PasswordInputBase = React.forwardRef<InputRef, Omit<PasswordInputProps, 'control'>>(({
  label,
  error,
  helperText,
  className = '',
  status,
  required,
  ...props
}, ref) => {
  const errorClass = error ? 'password-input-error-state' : '';
  const combinedClassName = `password-input-custom ${className} ${errorClass}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2" style={{ color: error ? '#C21919' : '#181918' }}>
          {label}
          {required && <span style={{ color: '#C21919' }}>*</span>}
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
        ref={ref}
        className={combinedClassName}
        status={error ? 'error' : status}
        {...props}
        style={{
          height: '44px',
          borderRadius: '12px',
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
});
PasswordInputBase.displayName = 'PasswordInputBase';

const ControlledPasswordInput: React.FC<PasswordInputProps & { control: NonNullable<PasswordInputProps['control']>; name: string }> = ({
  control,
  name,
  error: errorProp,
  ...rest
}) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <PasswordInputBase
      {...rest}
      {...field}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const PasswordInput = React.forwardRef<InputRef, PasswordInputProps>(({ control, name, ...props }, ref) => {
  if (control && name) {
    return <ControlledPasswordInput control={control} name={name} {...props} />;
  }
  return <PasswordInputBase ref={ref} name={name} {...props} />;
});
PasswordInput.displayName = 'PasswordInput';
