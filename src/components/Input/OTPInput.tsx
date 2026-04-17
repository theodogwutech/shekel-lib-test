import React, { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { Input, InputRef } from 'antd';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

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
  control?: Control<any>;
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
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(InputRef | null)[]>([]);

  useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      const filledOtp = [...otpArray, ...Array(length - otpArray.length).fill('')];
      setOtp(filledOtp);
    }
  }, [value, length]);

  const handleChange = (index: number, val: string) => {
    if (val && !/^\d+$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChange?.(otpString);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      onComplete?.(otpString);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
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

    if (newOtp.every((digit) => digit !== '')) {
      onComplete?.(otpString);
    }
  };

  return (
    <div className="w-full">
      <div className={`flex gap-2 justify-center ${className}`} onBlur={onBlur}>
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <Input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              placeholder=""
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={disabled}
              maxLength={1}
              className="text-center text-lg font-semibold otp-input-field"
              style={{
                width: '63px',
                height: '44px',
                borderRadius: '12px',
                borderColor: error ? '#C21919' : '#D1D1D1',
              }}
            />
            {index === Math.floor(length / 2) - 1 && (
              <div className="flex items-center justify-center px-1">
                <span className="text-gray-400 text-xl">—</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {error && errorMessage && (
        <div className="flex items-center justify-center mt-2 text-xs text-[#C21919]">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

const ControlledOTPInput: React.FC<OTPInputProps & { control: NonNullable<OTPInputProps['control']>; name: string }> = ({
  control,
  name,
  error: errorProp,
  errorMessage: errorMessageProp,
  ...rest
}) => {
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
