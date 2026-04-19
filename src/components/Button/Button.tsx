import React, { useRef, useState } from 'react';

type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'text';
export type ButtonSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonShape = 'default' | 'circle' | 'square';
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ButtonProps extends NativeButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  rounded?: ButtonRounded;
  htmlType?: 'button' | 'submit' | 'reset';
  block?: boolean;
  loading?: boolean;
  loadingText?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  danger?: boolean;
  ripple?: boolean;
  hoverLift?: boolean;
  pressScale?: boolean;

  // Fine-grained color overrides (all optional)
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  disabledBgColor?: string;
  disabledTextColor?: string;
  focusRingColor?: string;
}

const SIZE_HEIGHT: Record<ButtonSize, number> = {
  xxsmall: 24,
  xsmall: 32,
  small: 40,
  medium: 48,
  large: 52,
  xlarge: 60,
};
const SIZE_FONT: Record<ButtonSize, number> = {
  xxsmall: 11,
  xsmall: 12,
  small: 13,
  medium: 14,
  large: 15,
  xlarge: 16,
};
const SIZE_PADDING: Record<ButtonSize, number> = {
  xxsmall: 8,
  xsmall: 12,
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 28,
};
const SIZE_GAP: Record<ButtonSize, number> = {
  xxsmall: 4,
  xsmall: 6,
  small: 6,
  medium: 8,
  large: 8,
  xlarge: 10,
};

const ROUNDED_MAP: Record<ButtonRounded, number | string> = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
};

const SHEKEL_RED = '#EC615B';
const SHEKEL_RED_HOVER = '#D8524D';
const SHEKEL_RED_DISABLED = '#F9CECC';

interface PaletteEntry {
  bg: string;
  border: string;
  color: string;
  hoverBg: string;
  hoverColor?: string;
  hoverBorder?: string;
  disabledBg: string;
  disabledColor?: string;
  focusRing: string;
}

const palette = (danger: boolean): Record<ButtonVariant, PaletteEntry> => {
  const accent = danger ? '#C21919' : SHEKEL_RED;
  const accentHover = danger ? '#9F1313' : SHEKEL_RED_HOVER;
  const accentDisabled = danger ? '#EABABA' : SHEKEL_RED_DISABLED;
  const ring = danger ? 'rgba(194, 25, 25, 0.2)' : 'rgba(236, 97, 91, 0.2)';
  return {
    primary: {
      bg: accent,
      border: accent,
      color: '#FFFFFF',
      hoverBg: accentHover,
      hoverBorder: accentHover,
      disabledBg: accentDisabled,
      focusRing: ring,
    },
    secondary: {
      bg: '#6B7280',
      border: '#6B7280',
      color: '#FFFFFF',
      hoverBg: '#4B5563',
      hoverBorder: '#4B5563',
      disabledBg: '#D1D5DB',
      focusRing: 'rgba(107,114,128,0.2)',
    },
    outline: {
      bg: 'transparent',
      border: accent,
      color: accent,
      hoverBg: danger ? '#FDEBEB' : '#FDECEB',
      hoverBorder: accentHover,
      hoverColor: accentHover,
      disabledBg: 'transparent',
      disabledColor: accentDisabled,
      focusRing: ring,
    },
    ghost: {
      bg: '#EFF2F3',
      border: '#EFF2F3',
      color: '#181918',
      hoverBg: '#E1E4E6',
      hoverBorder: '#E1E4E6',
      disabledBg: '#F5F5F5',
      disabledColor: '#B0B0B0',
      focusRing: 'rgba(0,0,0,0.06)',
    },
    link: {
      bg: 'transparent',
      border: 'transparent',
      color: accent,
      hoverBg: 'transparent',
      hoverBorder: 'transparent',
      hoverColor: accentHover,
      disabledBg: 'transparent',
      disabledColor: accentDisabled,
      focusRing: ring,
    },
    text: {
      bg: 'transparent',
      border: 'transparent',
      color: '#181918',
      hoverBg: 'rgba(0,0,0,0.04)',
      hoverBorder: 'transparent',
      disabledBg: 'transparent',
      disabledColor: '#B0B0B0',
      focusRing: 'rgba(0,0,0,0.08)',
    },
  };
};

const Spinner: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    style={{ animation: 'shekel-btn-spin 0.8s linear infinite', transformOrigin: 'center' }}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
    <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'large',
      shape = 'default',
      rounded,
      htmlType = 'button',
      block,
      loading,
      loadingText,
      icon,
      iconPosition = 'left',
      danger = false,
      ripple = true,
      hoverLift = false,
      pressScale = true,
      disabled,
      className = '',
      style,
      children,
      bgColor,
      textColor,
      borderColor,
      hoverBgColor,
      hoverTextColor,
      hoverBorderColor,
      disabledBgColor,
      disabledTextColor,
      focusRingColor,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [focusVisible, setFocusVisible] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const v = palette(danger)[variant];
    const height = SIZE_HEIGHT[size];
    const fontSize = SIZE_FONT[size];
    const gap = SIZE_GAP[size];
    const isIconOnly = shape === 'circle' || shape === 'square';
    const iconBoxPadding = isIconOnly ? 0 : SIZE_PADDING[size];
    const resolvedRadius =
      rounded !== undefined
        ? ROUNDED_MAP[rounded]
        : shape === 'circle'
          ? 9999
          : shape === 'square'
            ? 8
            : 8;

    const isDisabled = disabled || loading;
    const iconSize = Math.max(12, Math.round(fontSize * 1.2));

    const finalBg = isDisabled
      ? disabledBgColor ?? v.disabledBg
      : hovered
        ? hoverBgColor ?? v.hoverBg
        : bgColor ?? v.bg;
    const finalBorder = isDisabled
      ? disabledBgColor ?? v.disabledBg
      : hovered
        ? hoverBorderColor ?? v.hoverBorder ?? v.border
        : borderColor ?? v.border;
    const finalColor = isDisabled
      ? disabledTextColor ?? v.disabledColor ?? v.color
      : hovered
        ? hoverTextColor ?? v.hoverColor ?? v.color
        : textColor ?? v.color;

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPressed(true);
      if (ripple && !isDisabled && btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;
        const id = Date.now() + Math.random();
        setRipples((r) => [...r, { id, x, y, size }]);
        setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 600);
      }
      props.onMouseDown?.(e);
    };
    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPressed(false);
      props.onMouseUp?.(e);
    };
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(true);
      props.onMouseEnter?.(e);
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(false);
      setPressed(false);
      props.onMouseLeave?.(e);
    };

    const transformParts: string[] = [];
    if (hoverLift && hovered && !isDisabled) transformParts.push('translateY(-1px)');
    if (pressScale && pressed && !isDisabled) transformParts.push('scale(0.97)');
    const finalTransform = transformParts.length ? transformParts.join(' ') : 'none';

    const boxShadow = focusVisible
      ? `0 0 0 3px ${focusRingColor ?? v.focusRing}`
      : hoverLift && hovered && !isDisabled
        ? '0 4px 12px rgba(0,0,0,0.08)'
        : 'none';

    return (
      <>
        <style>{`
          @keyframes shekel-btn-spin { to { transform: rotate(360deg); } }
          @keyframes shekel-btn-ripple { to { transform: scale(1); opacity: 0; } }
        `}</style>
        <button
          ref={(el) => {
            btnRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
          }}
          type={htmlType}
          disabled={isDisabled}
          aria-busy={loading}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onFocus={(e) => {
            const target = e.target as HTMLButtonElement & { matches?: (sel: string) => boolean };
            if (target.matches?.(':focus-visible')) setFocusVisible(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocusVisible(false);
            props.onBlur?.(e);
          }}
          className={`inline-flex items-center justify-center font-medium select-none relative overflow-hidden ${
            block ? 'w-full' : ''
          } ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
          style={{
            height,
            width: isIconOnly ? height : block ? '100%' : undefined,
            padding: isIconOnly ? 0 : `0 ${iconBoxPadding}px`,
            borderRadius: resolvedRadius,
            border:
              variant === 'link' || variant === 'text' ? 'none' : `1px solid ${finalBorder}`,
            backgroundColor: finalBg,
            color: finalColor,
            fontSize,
            gap,
            transform: finalTransform,
            boxShadow,
            opacity: variant === 'outline' && isDisabled ? 0.55 : 1,
            transition:
              'background-color 180ms cubic-bezier(0.23, 1, 0.32, 1), color 150ms ease-out, border-color 180ms cubic-bezier(0.23, 1, 0.32, 1), transform 120ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 180ms ease-out',
            textDecoration: variant === 'link' && hovered && !isDisabled ? 'underline' : undefined,
            ...style,
          }}
          {...props}
        >
          {loading && iconPosition === 'left' && <Spinner size={iconSize} />}
          {!loading && icon && iconPosition === 'left' && (
            <span className="inline-flex items-center" style={{ width: iconSize, height: iconSize }}>
              {icon}
            </span>
          )}
          {!isIconOnly && (loading && loadingText ? loadingText : children)}
          {isIconOnly && !loading && (icon ?? children)}
          {!loading && icon && iconPosition === 'right' && (
            <span className="inline-flex items-center" style={{ width: iconSize, height: iconSize }}>
              {icon}
            </span>
          )}
          {loading && iconPosition === 'right' && <Spinner size={iconSize} />}

          {ripple && ripples.map((r) => (
            <span
              key={r.id}
              aria-hidden
              style={{
                position: 'absolute',
                left: r.x - r.size / 2,
                top: r.y - r.size / 2,
                width: r.size,
                height: r.size,
                borderRadius: '50%',
                backgroundColor: 'currentColor',
                opacity: 0.25,
                pointerEvents: 'none',
                transform: 'scale(0)',
                animation: 'shekel-btn-ripple 500ms ease-out forwards',
              }}
            />
          ))}
        </button>
      </>
    );
  }
);
Button.displayName = 'Button';
