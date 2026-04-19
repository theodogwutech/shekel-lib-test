import React from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.SyntheticEvent) => void;

  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelPosition?: 'left' | 'right';

  disabled?: boolean;
  loading?: boolean;

  size?: 'sm' | 'md' | 'lg';
  trackWidth?: number;
  trackHeight?: number;
  knobSize?: number;

  onColor?: string;
  offColor?: string;
  knobColor?: string;
  loadingColor?: string;

  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;

  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;

  control?: Control<any>;
  autoFocus?: boolean;
  tabIndex?: number;
}

const SIZE_MAP = {
  sm: { trackWidth: 28, trackHeight: 16, knobSize: 12 },
  md: { trackWidth: 36, trackHeight: 20, knobSize: 16 },
  lg: { trackWidth: 48, trackHeight: 26, knobSize: 22 },
};

const ToggleBase = React.forwardRef<HTMLButtonElement, Omit<ToggleProps, 'control'>>(
  (props, ref) => {
    const {
      checked: externalChecked,
      defaultChecked,
      onChange,
      label,
      labelClassName = '',
      labelStyle,
      labelPosition = 'right',
      disabled,
      loading,
      size = 'md',
      trackWidth: tw,
      trackHeight: th,
      knobSize: ks,
      onColor = '#EC615B',
      offColor = '#8C9196',
      knobColor = '#FFFFFF',
      loadingColor,
      checkedIcon,
      uncheckedIcon,
      name,
      id,
      className = '',
      style,
      autoFocus,
      tabIndex,
    } = props;

    const isControlled = externalChecked !== undefined;
    const [innerChecked, setInnerChecked] = React.useState<boolean>(defaultChecked ?? false);
    const checked = isControlled ? !!externalChecked : innerChecked;

    const reactId = React.useId();
    const inputId = id ?? reactId;

    const { trackWidth: dtw, trackHeight: dth, knobSize: dks } = SIZE_MAP[size];
    const trackWidth = tw ?? dtw;
    const trackHeight = th ?? dth;
    const knobSize = ks ?? dks;
    const padding = (trackHeight - knobSize) / 2;
    const knobOffset = checked ? trackWidth - knobSize - padding : padding;

    const handleToggle = (e: React.SyntheticEvent) => {
      if (disabled || loading) return;
      const next = !checked;
      if (!isControlled) setInnerChecked(next);
      onChange?.(next, e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle(e);
      } else if (e.key === 'ArrowRight' && !checked) {
        e.preventDefault();
        handleToggle(e);
      } else if (e.key === 'ArrowLeft' && checked) {
        e.preventDefault();
        handleToggle(e);
      }
    };

    const trackBg = checked ? onColor : offColor;

    const toggleEl = (
      <button
        ref={ref}
        id={inputId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled || loading}
        disabled={disabled || loading}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`relative inline-flex items-center shrink-0 rounded-full transition-colors duration-200 ${
          disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        } ${className}`}
        style={{
          width: trackWidth,
          height: trackHeight,
          backgroundColor: loading ? loadingColor ?? trackBg : trackBg,
          ...style,
        }}
      >
        <span
          aria-hidden
          className="absolute top-1/2 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            left: knobOffset,
            transform: 'translateY(-50%)',
            width: knobSize,
            height: knobSize,
            backgroundColor: knobColor,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
          }}
        >
          {loading ? (
            <svg
              width={knobSize * 0.6}
              height={knobSize * 0.6}
              viewBox="0 0 24 24"
              fill="none"
              className="shekel-toggle-spin"
              style={{ color: trackBg }}
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
              <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : checked && checkedIcon ? (
            <span style={{ color: trackBg, fontSize: knobSize * 0.5, lineHeight: 1 }}>{checkedIcon}</span>
          ) : !checked && uncheckedIcon ? (
            <span style={{ color: trackBg, fontSize: knobSize * 0.5, lineHeight: 1 }}>{uncheckedIcon}</span>
          ) : null}
        </span>
        {name && <input type="hidden" name={name} value={checked ? 'true' : 'false'} />}
      </button>
    );

    if (!label) return toggleEl;

    return (
      <>
        <style>{`
          @keyframes shekel-toggle-spin { to { transform: rotate(360deg); } }
          .shekel-toggle-spin { animation: shekel-toggle-spin 0.8s linear infinite; transform-origin: center; }
        `}</style>
        <label
          htmlFor={inputId}
          className={`inline-flex items-center gap-3 ${
            disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'
          } ${labelClassName}`}
          style={labelStyle}
        >
          {labelPosition === 'left' && (
            <span className="text-base text-[#181918] select-none">{label}</span>
          )}
          {toggleEl}
          {labelPosition === 'right' && (
            <span className="text-base text-[#181918] select-none">{label}</span>
          )}
        </label>
      </>
    );
  }
);
ToggleBase.displayName = 'ToggleBase';

const ControlledToggle: React.FC<
  ToggleProps & { control: NonNullable<ToggleProps['control']>; name: string }
> = ({ control, name, ...rest }) => {
  const { field } = useController({ control, name });
  return (
    <ToggleBase
      {...rest}
      name={name}
      checked={!!field.value}
      onChange={(val, e) => {
        field.onChange(val);
        rest.onChange?.(val, e);
      }}
    />
  );
};

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ control, name, ...props }, ref) => {
    if (control && name) {
      return <ControlledToggle control={control} name={name} {...props} />;
    }
    return <ToggleBase ref={ref} name={name} {...props} />;
  }
);
Toggle.displayName = 'Toggle';
