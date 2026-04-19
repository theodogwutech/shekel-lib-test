import React, { useState, useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { hexWithAlpha, ErrorIcon } from './_theme';

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: PhoneCodeOption[];
  disabled?: boolean;
  error?: boolean;
  accentColor: string;
  errorColor: string;
}

const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  value,
  onChange,
  options,
  disabled,
  error,
  accentColor,
  errorColor,
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) setActiveIndex(options.findIndex((o) => o.value === value));
  }, [open, value, options]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        onChange(options[activeIndex].value);
        setOpen(false);
      }
    }
  };

  const selected = options.find((o) => o.value === value) ?? options[0];
  const borderColor = error ? errorColor : open ? accentColor : '#D9D9D9';
  const triggerStyle: React.CSSProperties = {
    height: 44,
    borderColor,
    boxShadow: open ? `0 0 0 2px ${hexWithAlpha(accentColor, 0.2)}` : undefined,
  };
  const hasAnyFlag = options.some((o) => !!o.flag);
  const triggerWidth = hasAnyFlag ? 108 : 85;

  return (
    <div ref={wrapperRef} className="relative" style={{ width: triggerWidth }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center justify-between w-full bg-[#FAFAFA] border rounded-[12px] pl-3 pr-2 text-sm text-[#181918] transition-all duration-200 ${
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        }`}
        style={triggerStyle}
      >
        <span className="flex items-center min-w-0 gap-1.5">
          {selected?.flag && (
            <img
              src={selected.flag}
              alt=""
              aria-hidden
              className="shrink-0 object-cover rounded-full"
              style={{ width: 22, height: 22 }}
            />
          )}
          <span className="truncate">{selected?.label ?? value}</span>
        </span>
        <span
          className={`shrink-0 ml-1 flex items-center justify-center text-[#8C8C8C] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          style={{ width: 12, height: 12 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 4.5l3.5 3.5 3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-50 bg-white overflow-auto max-h-60"
          style={{
            width: hasAnyFlag ? 180 : 120,
            marginTop: 4,
            padding: 4,
            borderRadius: 8,
            boxShadow:
              '0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)',
          }}
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isActive = i === activeIndex;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className="flex items-center justify-between cursor-pointer transition-colors duration-150"
                style={{
                  padding: '5px 12px',
                  minHeight: 32,
                  borderRadius: 4,
                  fontSize: 14,
                  lineHeight: '22px',
                  backgroundColor: isSelected
                    ? hexWithAlpha(accentColor, 0.08)
                    : isActive
                      ? 'rgba(0, 0, 0, 0.04)'
                      : 'transparent',
                  color: isSelected ? accentColor : '#181918',
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <span className="flex items-center min-w-0 gap-2">
                  {opt.flag && (
                    <img
                      src={opt.flag}
                      alt=""
                      aria-hidden
                      className="shrink-0 object-cover rounded-full"
                      style={{ width: 24, height: 24 }}
                    />
                  )}
                  <span className="truncate">{opt.label}</span>
                </span>
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 ml-2">
                    <path
                      d="M2 6l3 3 5-6"
                      stroke={accentColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix' | 'value' | 'onChange'
>;

export interface PhoneCodeOption {
  value: string;
  label: string;
  flag?: string;
}

export interface PhoneInputProps extends NativeInputProps {
  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelExtra?: React.ReactNode;
  requiredMark?: React.ReactNode;
  error?: string;
  helperText?: string;
  countryCode?: string;
  defaultCountryCode?: string;
  onCountryCodeChange?: (value: string) => void;
  countryCodes?: PhoneCodeOption[];
  showCountryCodeDropdown?: boolean;
  format?: 'default' | 'spaced' | 'dashed' | 'none';
  customFormat?: (value: string) => string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control?: Control<any>;
  wrapperClassName?: string;
  accentColor?: string;
  errorColor?: string;
  borderColor?: string;
  filledBorderColor?: string;
}

const PhoneInputBase = React.forwardRef<HTMLInputElement, Omit<PhoneInputProps, 'control'>>(
  (
    {
      label,
      labelClassName = '',
      labelStyle,
      labelExtra,
      requiredMark,
      error,
      helperText,
      className = '',
      countryCode,
      defaultCountryCode = '+234',
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
      required,
      disabled,
      id,
      wrapperClassName = '',
      style,
      onKeyDown,
      onPaste,
      accentColor = '#EC615B',
      errorColor = '#C21919',
      borderColor: defaultBorderColor = '#D9D9D9',
      filledBorderColor = '#181918',
      ...rest
    },
    ref
  ) => {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const [displayValue, setDisplayValue] = useState('');
    const innerRef = useRef<HTMLInputElement | null>(null);

    const isCodeControlled = countryCode !== undefined;
    const [innerCode, setInnerCode] = useState<string>(defaultCountryCode);
    const activeCode = isCodeControlled ? (countryCode as string) : innerCode;

    const handleCodeChange = (next: string) => {
      if (!isCodeControlled) setInnerCode(next);
      onCountryCodeChange?.(next);
    };

    useEffect(() => {
      if (value !== undefined) {
        const cleaned = String(value).replace(/\D/g, '');
        setDisplayValue(formatPhoneNumber(cleaned));
      }
    }, [value, format, activeCode]);

    const formatPhoneNumber = (val: string): string => {
      const cleaned = val.replace(/\D/g, '');
      if (customFormat) return customFormat(cleaned);
      if (format === 'none') return cleaned;

      if (format === 'spaced') {
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
      }
      if (format === 'dashed') {
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
      if (activeCode === '+1') {
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        !/^\d$/.test(e.key) &&
        !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key) &&
        !(e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
      }
      onKeyDown?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const cursorPosition = input.selectionStart || 0;
      const cleaned = input.value.replace(/\D/g, '');
      const formatted = formatPhoneNumber(cleaned);
      const oldLength = displayValue.length;
      const newLength = formatted.length;
      const diff = newLength - oldLength;

      setDisplayValue(formatted);

      requestAnimationFrame(() => {
        const newCursor = Math.max(0, Math.min(cursorPosition + diff, formatted.length));
        input.setSelectionRange(newCursor, newCursor);
      });

      if (onChange) {
        const synthetic = { ...e, target: { ...e.target, value: cleaned } } as React.ChangeEvent<HTMLInputElement>;
        onChange(synthetic);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text/plain').replace(/\D/g, '');
      const target = e.target as HTMLInputElement;
      const start = target.selectionStart || 0;
      const currentCleaned = displayValue.replace(/\D/g, '');
      const newCleaned = currentCleaned.slice(0, start) + pasted;
      const formatted = formatPhoneNumber(newCleaned);
      setDisplayValue(formatted);
      if (onChange) {
        const synthetic = { ...e, target: { ...e.target, value: newCleaned } } as any;
        onChange(synthetic);
      }
      onPaste?.(e);
    };

    const isError = !!error;
    const resolvedRequiredMark =
      requiredMark === undefined ? <span style={{ color: '#C21919' }}>*</span> : requiredMark;

    const hasValue = displayValue !== '';
    const resolvedBorder = isError ? errorColor : hasValue ? filledBorderColor : defaultBorderColor;
    const focusShadow = isError ? hexWithAlpha(errorColor, 0.1) : hexWithAlpha(accentColor, 0.2);
    const themeVars = {
      '--shekel-accent': accentColor,
      '--shekel-border': resolvedBorder,
      '--shekel-focus-shadow': focusShadow,
    } as React.CSSProperties;
    const phoneBorder =
      'border-[color:var(--shekel-border)] hover:border-[color:var(--shekel-accent)] focus-within:border-[color:var(--shekel-accent)]';
    const phoneShadow = 'focus-within:shadow-[0_0_0_2px_var(--shekel-focus-shadow)]';

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
        <div className={`flex gap-2 ${wrapperClassName}`}>
          {showCountryCodeDropdown ? (
            <CountryCodeSelect
              value={activeCode}
              onChange={handleCodeChange}
              options={countryCodes}
              disabled={disabled}
              error={isError}
              accentColor={accentColor}
              errorColor={errorColor}
            />
          ) : (
            <div
              className="flex items-center justify-center border rounded-[12px] text-sm font-medium"
              style={{
                width: 61,
                height: 44,
                borderColor: isError ? errorColor : defaultBorderColor,
                backgroundColor: disabled ? '#F5F5F5' : '#FAFAFA',
                color: disabled ? '#00000040' : '#000000',
              }}
            >
              {activeCode}
            </div>
          )}
          <div
            className={`flex items-center flex-1 min-w-0 border rounded-[12px] transition-all duration-200 ${phoneBorder} ${phoneShadow} ${
              disabled ? 'opacity-60 cursor-not-allowed bg-[#F5F5F5]' : 'bg-white'
            }`}
            style={{ height: 44 }}
          >
            <input
              ref={(el) => {
                innerRef.current = el;
                if (typeof ref === 'function') ref(el);
                else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
              }}
              id={inputId}
              type="tel"
              inputMode="tel"
              required={required}
              disabled={disabled}
              value={displayValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              className={`flex-1 min-w-0 h-full bg-transparent outline-none text-sm text-[#181918] placeholder:text-[#8C8C8C] ${className}`}
              style={{ padding: '4px 11px', ...style }}
              {...rest}
            />
          </div>
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
PhoneInputBase.displayName = 'PhoneInputBase';

const ControlledPhoneInput: React.FC<
  PhoneInputProps & { control: NonNullable<PhoneInputProps['control']>; name: string }
> = ({ control, name, error: errorProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <PhoneInputBase
      {...rest}
      name={name}
      value={field.value ?? ''}
      onChange={(e) => field.onChange(e.target.value)}
      onBlur={() => field.onBlur()}
      ref={field.ref}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ control, name, ...props }, ref) => {
    if (control && name) {
      return <ControlledPhoneInput control={control} name={name} {...props} />;
    }
    return <PhoneInputBase ref={ref} name={name} {...props} />;
  }
);
PhoneInput.displayName = 'PhoneInput';
