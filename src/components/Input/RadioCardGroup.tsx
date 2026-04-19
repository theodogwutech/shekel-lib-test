import React from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { hexWithAlpha, ErrorIcon } from './_theme';

export interface RadioCardOption<V extends string | number = string> {
  value: V;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioCardGroupProps<V extends string | number = string> {
  options: RadioCardOption<V>[];
  value?: V;
  defaultValue?: V;
  onChange?: (value: V, option: RadioCardOption<V>) => void;

  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelExtra?: React.ReactNode;
  requiredMark?: React.ReactNode;
  required?: boolean;
  error?: string;
  helperText?: string;
  disabled?: boolean;

  layout?: 'row' | 'column';
  columns?: number;
  gap?: number | string;
  equalWidth?: boolean;
  cardHeight?: number | string;
  iconSize?: number;
  titleSize?: number;
  descriptionSize?: number;
  radioSize?: number;

  className?: string;
  style?: React.CSSProperties;
  cardClassName?: string;
  cardStyle?: React.CSSProperties;

  accentColor?: string;
  errorColor?: string;
  borderColor?: string;
  selectedBorderColor?: string;
  selectedGlowColor?: string;

  name?: string;
  control?: Control<any>;
  id?: string;
}

const RadioIcon: React.FC<{
  selected: boolean;
  disabled?: boolean;
  accentColor: string;
  size?: number;
}> = ({ selected, disabled, accentColor, size = 24 }) => {
  if (selected) {
    return (
      <span
        className="shrink-0 inline-flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          border: `2px solid ${accentColor}`,
        }}
      >
        <span
          className="block rounded-full"
          style={{
            width: Math.max(8, size - 12),
            height: Math.max(8, size - 12),
            backgroundColor: accentColor,
          }}
        />
      </span>
    );
  }
  return (
    <span
      className="shrink-0 block rounded-full"
      style={{
        width: size,
        height: size,
        border: `2px solid ${disabled ? '#D9D9D9' : '#181918'}`,
        backgroundColor: 'transparent',
      }}
    />
  );
};

function RadioCardGroupBase<V extends string | number = string>({
  options,
  value: externalValue,
  defaultValue,
  onChange,

  label,
  labelClassName = '',
  labelStyle,
  labelExtra,
  requiredMark,
  required,
  error,
  helperText,
  disabled,

  layout = 'row',
  columns,
  gap = 16,
  equalWidth = true,
  cardHeight = 94,
  iconSize = 20,
  titleSize = 12,
  descriptionSize = 12,
  radioSize = 24,

  className = '',
  style,
  cardClassName = '',
  cardStyle,

  accentColor = '#EC615B',
  errorColor = '#C21919',
  borderColor = '#EEEEEE',
  selectedBorderColor,
  selectedGlowColor,

  name,
  id,
}: Omit<RadioCardGroupProps<V>, 'control'>) {
  const isControlled = externalValue !== undefined;
  const [innerValue, setInnerValue] = React.useState<V | undefined>(defaultValue);
  const value = isControlled ? externalValue : innerValue;

  const reactId = React.useId();
  const groupId = id ?? reactId;

  const isError = !!error;
  const resolvedRequiredMark =
    requiredMark === undefined ? <span style={{ color: errorColor }}>*</span> : requiredMark;

  const resolvedGap = typeof gap === 'number' ? `${gap}px` : gap;
  const resolvedSelectedBorder = selectedBorderColor ?? accentColor;
  const resolvedGlow = selectedGlowColor ?? hexWithAlpha(accentColor, 0.2);

  const handleSelect = (opt: RadioCardOption<V>) => {
    if (disabled || opt.disabled) return;
    if (!isControlled) setInnerValue(opt.value);
    onChange?.(opt.value, opt);
  };

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gap: resolvedGap,
    gridTemplateColumns: columns
      ? `repeat(${columns}, minmax(0, 1fr))`
      : layout === 'row'
        ? equalWidth
          ? 'repeat(auto-fit, minmax(180px, 1fr))'
          : `repeat(${options.length}, auto)`
        : '1fr',
    ...style,
  };

  return (
    <div className="w-full" id={groupId}>
      {label && (
        <div className="flex items-center justify-between mb-2 gap-2">
          <span
            className={`block text-sm font-medium ${labelClassName}`}
            style={{ color: isError ? errorColor : '#181918', ...labelStyle }}
          >
            {label}
            {required && resolvedRequiredMark}
          </span>
          {labelExtra && <div className="shrink-0">{labelExtra}</div>}
        </div>
      )}

      <div role="radiogroup" aria-labelledby={label ? groupId : undefined} className={className} style={containerStyle}>
        {options.map((opt) => {
          const selected = value === opt.value;
          const optDisabled = !!disabled || !!opt.disabled;

          return (
            <div
              key={opt.value}
              role="radio"
              aria-checked={selected}
              aria-disabled={optDisabled}
              tabIndex={optDisabled ? -1 : 0}
              onClick={() => handleSelect(opt)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(opt);
                }
              }}
              className={`relative bg-white transition-all duration-200 ${
                optDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
              } ${cardClassName}`}
              style={{
                height: typeof cardHeight === 'number' ? `${cardHeight}px` : cardHeight,
                padding: '14px 16px',
                borderRadius: 16,
                border: `1.5px solid ${selected ? resolvedSelectedBorder : borderColor}`,
                boxShadow: selected ? `0 0 0 4px ${resolvedGlow}` : 'none',
                ...cardStyle,
              }}
            >
              <div className="flex items-center gap-3 h-full">
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  {opt.icon && (
                    <div
                      className="shrink-0 text-[#181918] flex items-center"
                      style={{ height: iconSize }}
                    >
                      <span
                        className="inline-flex items-center justify-center"
                        style={{ width: iconSize, height: iconSize }}
                      >
                        {opt.icon}
                      </span>
                    </div>
                  )}
                  <div
                    className="font-semibold text-[#181918] truncate"
                    style={{ fontSize: titleSize, marginTop: opt.icon ? 6 : 0, lineHeight: 1.3 }}
                  >
                    {opt.label}
                  </div>
                  {opt.description && (
                    <div
                      className="text-[#8C8C8C] truncate"
                      style={{ fontSize: descriptionSize, marginTop: 2, lineHeight: 1.3 }}
                    >
                      {opt.description}
                    </div>
                  )}
                </div>
                <div className="shrink-0 flex items-center">
                  <RadioIcon
                    selected={selected}
                    disabled={optDisabled}
                    accentColor={accentColor}
                    size={radioSize}
                  />
                </div>
              </div>
              {name && (
                <input type="hidden" name={name} value={selected ? String(opt.value) : ''} readOnly />
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="flex items-center mt-2 text-xs gap-1" style={{ color: errorColor }}>
          <ErrorIcon color={errorColor} size={14} />
          {error}
        </div>
      )}
      {!error && helperText && <div className="mt-1 text-xs text-gray-500">{helperText}</div>}
    </div>
  );
}

function ControlledRadioCardGroup<V extends string | number = string>({
  control,
  name,
  error: errorProp,
  ...rest
}: RadioCardGroupProps<V> & { control: NonNullable<RadioCardGroupProps<V>['control']>; name: string }) {
  const { field, fieldState } = useController({ control, name });
  return (
    <RadioCardGroupBase<V>
      {...rest}
      name={name}
      value={field.value}
      onChange={(v, opt) => {
        field.onChange(v);
        rest.onChange?.(v, opt);
      }}
      error={errorProp ?? fieldState.error?.message}
    />
  );
}

export function RadioCardGroup<V extends string | number = string>({
  control,
  name,
  ...props
}: RadioCardGroupProps<V>) {
  if (control && name) {
    return <ControlledRadioCardGroup<V> control={control} name={name} {...props} />;
  }
  return <RadioCardGroupBase<V> name={name} {...props} />;
}
