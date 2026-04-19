import React from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Input } from './Input';
import type { InputProps } from './Input';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'suffix' | 'control'> {
  control?: Control<any>;
  visibilityToggle?: boolean;
}

const EyeIcon: React.FC<{ visible: boolean }> = ({ visible }) =>
  visible ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.88 9.88a3 3 0 104.24 4.24M10.73 5.08A10.43 10.43 0 0112 5c6.5 0 10 7 10 7a13.16 13.16 0 01-1.67 2.68M6.61 6.61A13.53 13.53 0 002 12s3.5 7 10 7a9.74 9.74 0 005.39-1.61"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 2l20 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );

const PasswordInputBase = React.forwardRef<HTMLInputElement, Omit<PasswordInputProps, 'control'>>(
  ({ visibilityToggle = true, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    const toggle = (
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
        className="flex items-center justify-center text-[#8C8C8C] hover:text-[#181918] transition-colors"
      >
        <EyeIcon visible={visible} />
      </button>
    );

    const isError = !!props.error;
    const errColor = props.errorColor ?? '#C21919';
    return (
      <>
        <style>{`
          .shekel-password-input::placeholder {
            transform: translateY(-2px);
          }
        `}</style>
        <Input
          ref={ref}
          {...props}
          type={visible ? 'text' : 'password'}
          suffix={visibilityToggle ? toggle : undefined}
          className={`shekel-password-input placeholder:text-sm placeholder:tracking-normal ${props.className ?? ''}`}
          style={{
            fontSize: visible ? undefined : 20,
            letterSpacing: visible ? 'normal' : '0.15em',
            color: isError && !visible ? errColor : undefined,
            caretColor: isError ? errColor : undefined,
            ...props.style,
          }}
        />
      </>
    );
  }
);
PasswordInputBase.displayName = 'PasswordInputBase';

const ControlledPasswordInput: React.FC<
  PasswordInputProps & { control: NonNullable<PasswordInputProps['control']>; name: string }
> = ({ control, name, error: errorProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <PasswordInputBase
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

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ control, name, ...props }, ref) => {
    if (control && name) {
      return <ControlledPasswordInput control={control} name={name} {...props} />;
    }
    return <PasswordInputBase ref={ref} name={name} {...props} />;
  }
);
PasswordInput.displayName = 'PasswordInput';
