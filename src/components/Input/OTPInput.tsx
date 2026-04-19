import React, { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { hexWithAlpha, ErrorIcon } from './_theme';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onComplete?: (value: string) => void;
  name?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  boxClassName?: string;
  showSeparator?: boolean;
  control?: Control<any>;
  accentColor?: string;
  errorColor?: string;
  borderColor?: string;
  filledBorderColor?: string;
  boxWidth?: number | string;
  boxHeight?: number | string;
}

const OTPInputBase: React.FC<Omit<OTPInputProps, 'control'>> = ({
  length = 6,
  value = '',
  onChange,
  onBlur,
  onComplete,
  error = false,
  errorMessage,
  disabled = false,
  className = '',
  boxClassName = '',
  showSeparator = true,
  accentColor = '#EC615B',
  errorColor = '#C21919',
  borderColor = '#D9D9D9',
  filledBorderColor = '#181918',
  boxWidth = 63,
  boxHeight = 44,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      const filledOtp = [...otpArray, ...Array(length - otpArray.length).fill('')];
      setOtp(filledOtp);
    } else {
      setOtp(Array(length).fill(''));
    }
  }, [value, length]);

  const handleChange = (index: number, val: string) => {
    if (val && !/^\d+$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    const otpString = newOtp.join('');
    onChange?.(otpString);
    if (val && index < length - 1) inputRefs.current[index + 1]?.focus();
    if (newOtp.every((digit) => digit !== '')) onComplete?.(otpString);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    if (!/^\d+$/.test(pastedData)) return;
    const pastedArray = pastedData.split('').slice(0, length);
    const newOtp = [...pastedArray, ...Array(length - pastedArray.length).fill('')];
    setOtp(newOtp);
    const otpString = newOtp.join('');
    onChange?.(otpString);
    const nextIndex = Math.min(pastedArray.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
    if (newOtp.every((digit) => digit !== '')) onComplete?.(otpString);
  };

  const resolvedBoxBorder = (filled: boolean) =>
    error ? errorColor : filled ? filledBorderColor : borderColor;
  const focusShadow = error ? hexWithAlpha(errorColor, 0.1) : hexWithAlpha(accentColor, 0.2);
  const boxBaseClass =
    'border-[color:var(--shekel-box-border)] hover:border-[color:var(--shekel-accent)] focus-within:border-[color:var(--shekel-accent)]';
  const boxShadow = 'focus-within:shadow-[0_0_0_2px_var(--shekel-focus-shadow)]';

  return (
    <div className="w-full">
      <div
        className={`flex flex-nowrap gap-2 justify-center w-full ${className}`}
        onBlur={onBlur}
      >
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex-1 min-w-0 border rounded-[12px] transition-all duration-200 ${boxBaseClass} ${boxShadow} ${
                disabled ? 'opacity-60 cursor-not-allowed bg-[#F5F5F5]' : 'bg-white'
              } ${boxClassName}`}
              style={{
                maxWidth: typeof boxWidth === 'number' ? `${boxWidth}px` : boxWidth,
                height: typeof boxHeight === 'number' ? `${boxHeight}px` : boxHeight,
                aspectRatio: '63 / 44',
                ['--shekel-box-border' as any]: resolvedBoxBorder(digit !== ''),
                ['--shekel-accent' as any]: accentColor,
                ['--shekel-focus-shadow' as any]: focusShadow,
              }}
            >
              <input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={disabled}
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
                className="w-full h-full bg-transparent outline-none text-center text-lg font-semibold text-[#181918]"
              />
            </div>
            {showSeparator && index === Math.floor(length / 2) - 1 && (
              <div className="flex items-center justify-center shrink-0 px-1">
                <span className="text-gray-400 text-xl">—</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {error && errorMessage && (
        <div className="flex items-center justify-center mt-2 text-xs gap-1" style={{ color: errorColor }}>
          <ErrorIcon color={errorColor} size={14} />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

const ControlledOTPInput: React.FC<
  OTPInputProps & { control: NonNullable<OTPInputProps['control']>; name: string }
> = ({ control, name, error: errorProp, errorMessage: errorMessageProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  const hasError = errorProp ?? !!fieldState.error;
  return (
    <OTPInputBase
      {...rest}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={hasError}
      errorMessage={errorMessageProp ?? fieldState.error?.message}
    />
  );
};

export const OTPInput: React.FC<OTPInputProps> = ({ control, name, ...props }) => {
  if (control && name) {
    return <ControlledOTPInput control={control} name={name} {...props} />;
  }
  return <OTPInputBase {...props} />;
};
