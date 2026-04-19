import React from 'react';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  bgColor?: string;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_MAP: Record<string, number> = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
};

const initialsFromName = (name?: string) => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('');
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  shape = 'circle',
  bgColor = '#F5F5F5',
  textColor = '#181918',
  className = '',
  style,
}) => {
  const px = typeof size === 'number' ? size : SIZE_MAP[size] ?? 32;
  const initials = initialsFromName(name);
  const fontSize = Math.max(10, Math.round(px * 0.42));
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden ${shapeClass} ${className}`}
      style={{
        width: px,
        height: px,
        backgroundColor: bgColor,
        color: textColor,
        fontSize,
        fontWeight: 600,
        ...style,
      }}
    >
      {src ? (
        <img src={src} alt={name ?? ''} className="w-full h-full object-cover" />
      ) : initials ? (
        initials
      ) : (
        <svg width={px * 0.6} height={px * 0.6} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.5 0-8 1.8-8 5v1h16v-1c0-3.2-4.5-5-8-5z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      )}
    </span>
  );
};
