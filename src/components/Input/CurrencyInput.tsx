import React, { useState, useEffect } from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { ErrorIcon } from './_theme';

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix' | 'value' | 'onChange'
>;

export interface CurrencyInputProps extends NativeInputProps {
  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelExtra?: React.ReactNode;
  requiredMark?: React.ReactNode;
  error?: string;
  helperText?: string;
  currencySymbol?: string;
  formatAmount?: boolean;
  value?: string | number;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  control?: Control<any>;
  wrapperClassName?: string;
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  currencyPillBgColor?: string;
  currencyPillColor?: string;
  hideCurrencyPill?: boolean;
}

const formatNumber = (num: string): string => {
  const cleanNum = num.replace(/[^\d.]/g, '');
  const parts = cleanNum.split('.');
  const integerPart = parts[0] ?? '';
  const decimalPart = parts[1];
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

const unformatNumber = (formatted: string): string => formatted.replace(/,/g, '');

const CurrencyInputBase = React.forwardRef<HTMLInputElement, Omit<CurrencyInputProps, 'control'>>(
  (
    {
      label,
      labelClassName = '',
      labelStyle,
      labelExtra,
      requiredMark,
      error,
      helperText,
      currencySymbol = '₦',
      formatAmount = false,
      value: externalValue,
      onChange,
      required,
      disabled,
      id,
      className = '',
      style,
      wrapperClassName = '',
      addonAfter,
      addonBefore,
      currencyPillBgColor = '#F0F2F4',
      currencyPillColor = '#000000',
      hideCurrencyPill = false,
      ...rest
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState<string>('');
    const reactId = React.useId();
    const inputId = id ?? reactId;

    useEffect(() => {
      if (externalValue !== undefined) {
        const stringValue = String(externalValue);
        setDisplayValue(formatAmount ? formatNumber(stringValue) : stringValue);
      }
    }, [externalValue, formatAmount]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (formatAmount) {
        const rawValue = unformatNumber(inputValue);
        const formatted = formatNumber(rawValue);
        setDisplayValue(formatted);
        onChange?.(rawValue, e);
      } else {
        setDisplayValue(inputValue);
        onChange?.(inputValue, e);
      }
    };

    const isError = !!error;
    const hasValue = displayValue !== '' && displayValue !== undefined;
    const resolvedRequiredMark =
      requiredMark === undefined ? <span style={{ color: '#C21919' }}>*</span> : requiredMark;

    const borderClass = isError
      ? 'border-[#C21919] focus-within:shadow-[0_0_0_2px_rgba(194,25,25,0.1)]'
      : hasValue
        ? 'border-[#181918] hover:border-[#EC615B] focus-within:border-[#EC615B] focus-within:shadow-[0_0_0_2px_rgba(236,97,91,0.2)]'
        : 'border-[#D9D9D9] hover:border-[#EC615B] focus-within:border-[#EC615B] focus-within:shadow-[0_0_0_2px_rgba(236,97,91,0.2)]';

    return (
      <div className="w-full">
        {label && (
          <div className="flex items-center justify-between mb-2 gap-2">
            <label
              htmlFor={inputId}
              className={`block text-sm font-medium ${labelClassName}`}
              style={{ color: isError ? '#C21919' : '#181918', ...labelStyle }}
            >
              {label}
              {required && resolvedRequiredMark}
            </label>
            {labelExtra && <div className="shrink-0">{labelExtra}</div>}
          </div>
        )}
        <div
          className={`flex items-stretch w-full border rounded-[12px] transition-all duration-200 overflow-hidden ${borderClass} ${
            disabled ? 'opacity-60 cursor-not-allowed bg-[#F5F5F5]' : 'bg-white'
          } ${wrapperClassName}`}
          style={{ height: 44 }}
        >
          {addonBefore && (
            <div
              className="flex items-center justify-center shrink-0 px-3 text-sm font-medium"
              style={{ backgroundColor: currencyPillBgColor, color: currencyPillColor }}
            >
              {addonBefore}
            </div>
          )}
          {!hideCurrencyPill && (
            <div
              className="flex items-center justify-center shrink-0 font-medium"
              style={{
                width: 37,
                backgroundColor: currencyPillBgColor,
                color: currencyPillColor,
              }}
            >
              {currencySymbol}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            value={displayValue}
            onChange={handleChange}
            inputMode={formatAmount ? 'decimal' : rest.inputMode}
            className={`flex-1 min-w-0 h-full bg-transparent outline-none text-sm text-[#181918] placeholder:text-[#8C8C8C] ${className}`}
            style={{ padding: '4px 16px', ...style }}
            {...rest}
          />
          {addonAfter && (
            <div
              className="flex items-center justify-center shrink-0 px-3"
              style={{ backgroundColor: currencyPillBgColor }}
            >
              {addonAfter}
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center mt-1 text-xs gap-1" style={{ color: '#C21919' }}>
            <ErrorIcon color="#C21919" size={14} />
            {error}
          </div>
        )}
        {!error && helperText && <div className="mt-1 text-xs text-gray-500">{helperText}</div>}
      </div>
    );
  }
);
CurrencyInputBase.displayName = 'CurrencyInputBase';

const ControlledCurrencyInput: React.FC<
  CurrencyInputProps & { control: NonNullable<CurrencyInputProps['control']>; name: string }
> = ({ control, name, error: errorProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <CurrencyInputBase
      {...rest}
      name={name}
      value={field.value ?? ''}
      onChange={(value) => field.onChange(value)}
      onBlur={() => field.onBlur()}
      ref={field.ref}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ control, name, ...props }, ref) => {
    if (control && name) {
      return <ControlledCurrencyInput control={control} name={name} {...props} />;
    }
    return <CurrencyInputBase ref={ref} name={name} {...props} />;
  }
);
CurrencyInput.displayName = 'CurrencyInput';
