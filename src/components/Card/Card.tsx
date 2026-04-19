import React from 'react';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
}

const SHADOWS: Record<NonNullable<CardProps['shadow']>, string> = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 2px 8px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
  lg: '0 6px 16px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.04)',
  xl: '0 12px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.06)',
};

export const Card: React.FC<CardProps> = ({
  title,
  extra,
  cover,
  bordered = true,
  shadow = 'md',
  hoverable = false,
  className = '',
  bodyClassName = '',
  bodyStyle,
  headerClassName = '',
  headerStyle,
  style,
  children,
  ...rest
}) => {
  const [hovered, setHovered] = React.useState(false);
  const shadowValue = hoverable && hovered ? SHADOWS.lg : SHADOWS[shadow];

  return (
    <div
      {...rest}
      onMouseEnter={(e) => {
        if (hoverable) setHovered(true);
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (hoverable) setHovered(false);
        rest.onMouseLeave?.(e);
      }}
      className={`bg-white rounded-xl overflow-hidden transition-shadow duration-200 ${
        bordered ? 'border border-[#E6E6E6]' : ''
      } ${className}`}
      style={{
        boxShadow: shadowValue,
        ...style,
      }}
    >
      {cover && <div className="w-full">{cover}</div>}
      {(title || extra) && (
        <div
          className={`flex items-center justify-between gap-3 px-5 py-4 border-b border-[#F0F0F0] ${headerClassName}`}
          style={headerStyle}
        >
          {typeof title === 'string' ? (
            <h3 className="text-base font-semibold text-[#181918] m-0">{title}</h3>
          ) : (
            title
          )}
          {extra && <div className="shrink-0">{extra}</div>}
        </div>
      )}
      <div className={`px-5 py-5 ${bodyClassName}`} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};
