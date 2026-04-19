import React from 'react';

export const SHEKEL_DEFAULTS = {
  accent: '#EC615B',
  error: '#C21919',
  warning: '#FAAD14',
  border: '#D9D9D9',
  filledBorder: '#181918',
  text: '#181918',
  placeholder: '#8C8C8C',
  addonBg: '#FAFAFA',
  disabledBg: '#F5F5F5',
  hoverBg: 'rgba(0, 0, 0, 0.04)',
};

export const hexWithAlpha = (hex: string, alpha: number): string => {
  if (hex.startsWith('rgb')) return hex;
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export interface ErrorIconProps {
  color?: string;
  size?: number;
  className?: string;
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({ color = '#C21919', size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M6.9974 9.33464V7.0013M6.9974 4.66797H7.00323M12.8307 7.0013C12.8307 10.223 10.2191 12.8346 6.9974 12.8346C3.77573 12.8346 1.16406 10.223 1.16406 7.0013C1.16406 3.77964 3.77573 1.16797 6.9974 1.16797C10.2191 1.16797 12.8307 3.77964 12.8307 7.0013Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
