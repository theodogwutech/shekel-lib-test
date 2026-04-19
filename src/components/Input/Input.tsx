import React from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { hexWithAlpha as sharedHexWithAlpha, ErrorIcon } from './_theme';

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>;

export interface InputProps extends NativeInputProps {
  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelExtra?: React.ReactNode;
  requiredMark?: React.ReactNode;
  error?: string;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  allowClear?: boolean;
  status?: 'error' | 'warning';
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  onClear?: () => void;
  control?: Control<any>;
  accentColor?: string;
  errorColor?: string;
  borderColor?: string;
  filledBorderColor?: string;
  addonBackgroundColor?: string;
}

const hexWithAlpha = sharedHexWithAlpha;

const InputBase = React.forwardRef<HTMLInputElement, Omit<InputProps, 'control'>>(
  (props, ref) => {
    const {
      label,
      labelClassName = '',
      labelStyle,
      labelExtra,
      requiredMark,
      error,
      helperText,
      prefix,
      suffix,
      addonBefore,
      addonAfter,
      allowClear,
      status,
      className = '',
      style,
      wrapperClassName = '',
      wrapperStyle,
      onClear,
      required,
      disabled,
      readOnly,
      id,
      value,
      defaultValue,
      onChange,
      accentColor = '#EC615B',
      errorColor = '#C21919',
      borderColor: defaultBorderColor = '#D9D9D9',
      filledBorderColor = '#181918',
      addonBackgroundColor = '#FAFAFA',
      ...rest
    } = props;

    const [innerValue, setInnerValue] = React.useState<string | number | readonly string[] | undefined>(
      defaultValue
    );
    const isControlled = value !== undefined;
    const displayValue = isControlled ? value : innerValue;

    const reactId = React.useId();
    const inputId = id ?? reactId;

    const isError = !!error || status === 'error';
    const isWarning = status === 'warning';

    const resolvedRequiredMark =
      requiredMark === undefined ? <span style={{ color: '#C21919' }}>*</span> : requiredMark;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInnerValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInnerValue('');
      const synthetic = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(synthetic);
      onClear?.();
    };

    const hasValue =
      displayValue !== undefined && displayValue !== '' && displayValue !== null;

    const resolvedBorder = isError
      ? errorColor
      : isWarning
        ? '#FAAD14'
        : hasValue
          ? filledBorderColor
          : defaultBorderColor;
    const focusShadow = isError
      ? hexWithAlpha(errorColor, 0.1)
      : isWarning
        ? 'rgba(250,173,20,0.1)'
        : hexWithAlpha(accentColor, 0.2);

    const themeVars = {
      '--shekel-accent': accentColor,
      '--shekel-border': resolvedBorder,
      '--shekel-focus-shadow': focusShadow,
    } as React.CSSProperties;

    const borderBase =
      'border-[color:var(--shekel-border)] hover:border-[color:var(--shekel-accent)] focus-within:border-[color:var(--shekel-accent)]';
    const shadowBase = 'focus-within:shadow-[0_0_0_2px_var(--shekel-focus-shadow)]';
    const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed bg-[#F5F5F5]' : 'bg-white';

    const addonClasses = 'flex items-center px-3 text-sm border border-[color:var(--shekel-border)]';
    const addonStyle: React.CSSProperties = {
      backgroundColor: addonBackgroundColor,
      color: '#181918',
      whiteSpace: 'nowrap',
    };

    const showClear = allowClear && hasValue && !disabled && !readOnly;

    return (
      <div className="w-full" style={themeVars}>
        {label && (
          <div className="flex items-center justify-between mb-2 gap-2">
            <label
              htmlFor={inputId}
              className={`block text-sm font-medium ${labelClassName}`}
              style={{ color: isError ? errorColor : '#181918', ...labelStyle }}
            >
              {label}
              {required && resolvedRequiredMark}
            </label>
            {labelExtra && <div className="shrink-0">{labelExtra}</div>}
          </div>
        )}
        <div className={`flex w-full ${wrapperClassName}`} style={wrapperStyle}>
          {addonBefore && (
            <div
              className={`${addonClasses} border-r-0 rounded-l-[12px]`}
              style={addonStyle}
            >
              {addonBefore}
            </div>
          )}
          <div
            className={`flex items-center flex-1 min-w-0 border transition-all duration-200 ${borderBase} ${shadowBase} ${disabledClasses} ${
              addonBefore ? 'rounded-l-none' : 'rounded-l-[12px]'
            } ${addonAfter ? 'rounded-r-none' : 'rounded-r-[12px]'}`}
            style={{ height: 44 }}
          >
            {prefix && (
              <span className="pl-3 flex items-center text-[#181918] shrink-0">{prefix}</span>
            )}
            <input
              ref={ref}
              id={inputId}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              value={displayValue as any}
              onChange={handleChange}
              className={`flex-1 min-w-0 h-full bg-transparent outline-none text-sm text-[#181918] placeholder:text-[#8C8C8C] ${className}`}
              style={{
                padding: '4px 11px',
                paddingLeft: prefix ? 8 : 11,
                paddingRight: suffix || showClear ? 8 : 11,
                ...style,
              }}
              {...rest}
            />
            {showClear && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear"
                className="flex items-center justify-center w-5 h-5 mr-2 text-[#BFBFBF] hover:text-[#595959] transition-colors shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="6" fill="currentColor" />
                  <path
                    d="M4 4l4 4M8 4l-4 4"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
            {suffix && (
              <span className="pr-3 flex items-center text-[#181918] shrink-0">{suffix}</span>
            )}
          </div>
          {addonAfter && (
            <div
              className={`${addonClasses} border-l-0 rounded-r-[12px]`}
              style={addonStyle}
            >
              {addonAfter}
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center mt-1 text-xs gap-1" style={{ color: errorColor }}>
            <ErrorIcon color={errorColor} size={14} />
            {error}
          </div>
        )}
        {!error && helperText && <div className="mt-1 text-xs text-gray-500">{helperText}</div>}
      </div>
    );
  }
);
InputBase.displayName = 'InputBase';

const ControlledInput: React.FC<
  InputProps & { control: NonNullable<InputProps['control']>; name: string }
> = ({ control, name, error: errorProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <InputBase
      {...rest}
      name={name}
      value={field.value ?? ''}
      onChange={(e) => {
        field.onChange(e);
        rest.onChange?.(e);
      }}
      onBlur={(e) => {
        field.onBlur();
        rest.onBlur?.(e);
      }}
      ref={field.ref}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ control, name, ...props }, ref) => {
    if (control && name) {
      return <ControlledInput control={control} name={name} {...props} />;
    }
    return <InputBase ref={ref} name={name} {...props} />;
  }
);
Input.displayName = 'Input';
