import React from 'react';
import { Input as AntInput, InputProps as AntInputProps, InputRef } from 'antd';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

export interface InputProps extends AntInputProps {
  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelExtra?: React.ReactNode;
  requiredMark?: React.ReactNode;
  error?: string;
  helperText?: string;
  placeholder?: string;
  control?: Control<any>;
}

const InputBase = React.forwardRef<InputRef, Omit<InputProps, 'control'>>(({
  label,
  labelClassName = '',
  labelStyle,
  labelExtra,
  requiredMark,
  error,
  helperText,
  className = '',
  status,
  required,
  id,
  ...props
}, ref) => {
  const errorClass = error ? 'input-error-state' : '';
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const resolvedRequiredMark =
    requiredMark === undefined ? <span style={{ color: '#C21919' }}>*</span> : requiredMark;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2 gap-2">
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium ${labelClassName}`}
            style={{ color: error ? '#C21919' : '#181918', ...labelStyle }}
          >
            {label}
            {required && resolvedRequiredMark}
          </label>
          {labelExtra && <div className="shrink-0">{labelExtra}</div>}
        </div>
      )}
      <style>
        {error && `
          .input-error-state .ant-input-group-addon {
            border-color: #C21919 !important;
          }
          .input-error-state .ant-input-group-addon:first-child {
            border-right: none !important;
          }
          .input-error-state .ant-input {
            border-color: #C21919 !important;
          }
          .input-error-state .ant-input:focus,
          .input-error-state .ant-input-focused {
            border-color: #C21919 !important;
            box-shadow: 0 0 0 2px rgba(194, 25, 25, 0.1) !important;
          }
        `}
      </style>
      <AntInput
        ref={ref}
        id={inputId}
        className={`${className} ${errorClass}`}
        status={error ? 'error' : status}
        required={required}
        {...props}
        style={{
          height: '44px',
          borderRadius: '12px',
          padding: '4px 11px',
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
InputBase.displayName = 'InputBase';

const ControlledInput: React.FC<InputProps & { control: NonNullable<InputProps['control']>; name: string }> = ({
  control,
  name,
  error: errorProp,
  ...rest
}) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <InputBase
      {...rest}
      {...field}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const Input = React.forwardRef<InputRef, InputProps>(({ control, name, ...props }, ref) => {
  if (control && name) {
    return <ControlledInput control={control} name={name} {...props} />;
  }
  return <InputBase ref={ref} name={name} {...props} />;
});
Input.displayName = 'Input';
