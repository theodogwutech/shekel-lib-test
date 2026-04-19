import React, { useState, useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Input } from './Input';
import type { InputProps } from './Input';

export interface AmountInputProps
  extends Omit<InputProps, 'onChange' | 'value' | 'control' | 'type'> {
  value?: string | number;
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  decimals?: number;
  enforceDecimals?: boolean;
  allowDecimals?: boolean;
  thousandSeparator?: string;
  decimalSeparator?: string;
  control?: Control<any>;
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildFormat = (
  raw: string,
  opts: {
    decimals: number;
    allowDecimals: boolean;
    thousandSep: string;
    decimalSep: string;
  }
): string => {
  const { decimals, allowDecimals, thousandSep, decimalSep } = opts;
  if (!raw) return '';

  const parts = raw.split('.');
  const integerPart = parts[0].replace(/\D/g, '');
  const decimalPart = parts[1] !== undefined ? parts[1].replace(/\D/g, '').slice(0, decimals) : undefined;

  const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);

  if (!allowDecimals) return formattedInt;
  if (decimalPart === undefined) return formattedInt;
  return `${formattedInt}${decimalSep}${decimalPart}`;
};

const toRawNumber = (
  display: string,
  opts: { thousandSep: string; decimalSep: string }
): string => {
  if (!display) return '';
  const { thousandSep, decimalSep } = opts;
  const noThousand = display.split(escapeRegex(thousandSep)).join('');
  // Convert local decimal separator → '.' for the raw value
  if (decimalSep === '.') return noThousand;
  return noThousand.replace(decimalSep, '.');
};

const padDecimals = (raw: string, decimals: number): string => {
  if (!raw) return '';
  const parts = raw.split('.');
  const intPart = parts[0] || '0';
  let decPart = parts[1] ?? '';
  if (decPart.length < decimals) decPart = decPart.padEnd(decimals, '0');
  else decPart = decPart.slice(0, decimals);
  return decimals > 0 ? `${intPart}.${decPart}` : intPart;
};

const AmountInputBase = React.forwardRef<HTMLInputElement, Omit<AmountInputProps, 'control'>>(
  (
    {
      value: externalValue,
      onChange,
      decimals = 2,
      enforceDecimals = false,
      allowDecimals = true,
      thousandSeparator = ',',
      decimalSeparator = '.',
      onBlur,
      onFocus,
      inputMode,
      ...props
    },
    ref
  ) => {
    const formatOpts = {
      decimals,
      allowDecimals,
      thousandSep: thousandSeparator,
      decimalSep: decimalSeparator,
    };
    const rawOpts = { thousandSep: thousandSeparator, decimalSep: decimalSeparator };

    const [displayValue, setDisplayValue] = useState<string>(() => {
      if (externalValue === undefined || externalValue === null || externalValue === '') return '';
      const raw = String(externalValue);
      const padded = enforceDecimals && allowDecimals ? padDecimals(raw, decimals) : raw;
      return buildFormat(padded, formatOpts);
    });

    const innerRef = useRef<HTMLInputElement | null>(null);
    const setRef = (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    useEffect(() => {
      if (externalValue === undefined) return;
      const raw = externalValue === null || externalValue === '' ? '' : String(externalValue);
      const padded = enforceDecimals && allowDecimals && raw ? padDecimals(raw, decimals) : raw;
      setDisplayValue(buildFormat(padded, formatOpts));
    }, [externalValue, enforceDecimals, allowDecimals, decimals, thousandSeparator, decimalSeparator]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const cursor = input.selectionStart ?? 0;
      const before = displayValue;

      const rawIn = toRawNumber(input.value, rawOpts);

      // Only digits and at most one decimal separator
      const cleaned = (() => {
        if (!allowDecimals) return rawIn.replace(/\D/g, '');
        const [intP, ...rest] = rawIn.split('.');
        const intOnly = intP.replace(/\D/g, '');
        if (rest.length === 0) return intOnly;
        const decOnly = rest.join('').replace(/\D/g, '').slice(0, decimals);
        return `${intOnly}.${decOnly}`;
      })();

      const formatted = buildFormat(cleaned, formatOpts);
      setDisplayValue(formatted);

      // Re-position cursor
      const diff = formatted.length - before.length;
      requestAnimationFrame(() => {
        if (!innerRef.current) return;
        const next = Math.max(0, Math.min(formatted.length, cursor + diff));
        innerRef.current.setSelectionRange(next, next);
      });

      onChange?.(cleaned, e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (enforceDecimals && allowDecimals && displayValue) {
        const raw = toRawNumber(displayValue, rawOpts);
        const padded = padDecimals(raw, decimals);
        const formatted = buildFormat(padded, formatOpts);
        setDisplayValue(formatted);
        onChange?.(padded);
      }
      onBlur?.(e);
    };

    return (
      <Input
        ref={setRef}
        {...props}
        value={displayValue}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        inputMode={inputMode ?? (allowDecimals ? 'decimal' : 'numeric')}
      />
    );
  }
);
AmountInputBase.displayName = 'AmountInputBase';

const ControlledAmountInput: React.FC<
  AmountInputProps & { control: NonNullable<AmountInputProps['control']>; name: string }
> = ({ control, name, error: errorProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <AmountInputBase
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

export const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  ({ control, name, ...props }, ref) => {
    if (control && name) {
      return <ControlledAmountInput control={control} name={name} {...props} />;
    }
    return <AmountInputBase ref={ref} name={name} {...props} />;
  }
);
AmountInput.displayName = 'AmountInput';
