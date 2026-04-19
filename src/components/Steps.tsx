import type { FC, ReactNode, CSSProperties } from 'react';

export interface StepItem {
  title: ReactNode;
  description?: ReactNode;
  status?: 'wait' | 'process' | 'finish' | 'error';
  icon?: ReactNode;
}

export interface StepsProps {
  items: StepItem[];
  current?: number;
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;

  // Colors — match the screenshot design by default
  activeColor?: string;
  inactiveColor?: string;
  errorColor?: string;

  // Structural
  showConnector?: boolean;
  connectorColor?: string;
  gap?: number | string;
  iconSize?: number;
  checkSize?: number;

  // Events
  onStepClick?: (index: number) => void;
}

const CheckIcon: FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 12.5l4.5 4.5L19 7.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XIcon: FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Steps: FC<StepsProps> = ({
  items,
  current = 0,
  direction = 'vertical',
  size = 'md',
  className = '',
  style,
  activeColor = '#EC615B',
  inactiveColor = '#181918',
  errorColor = '#C21919',
  showConnector = false,
  connectorColor,
  gap,
  iconSize: iconSizeProp,
  checkSize: checkSizeProp,
  onStepClick,
}) => {
  const iconSize = iconSizeProp ?? (size === 'sm' ? 28 : size === 'lg' ? 44 : 36);
  const checkSize = checkSizeProp ?? (size === 'sm' ? 18 : size === 'lg' ? 30 : 24);
  const iconBorderWidth = 2;
  const titleSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 18;
  const descriptionSize = size === 'sm' ? 12 : size === 'lg' ? 14 : 13;
  const resolvedGap =
    gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : direction === 'vertical' ? '28px' : '16px';

  const getStatus = (index: number, item: StepItem): NonNullable<StepItem['status']> => {
    if (item.status) return item.status;
    if (index < current) return 'finish';
    if (index === current) return 'process';
    return 'wait';
  };

  const colorForStatus = (status: StepItem['status']): string => {
    if (status === 'error') return errorColor;
    if (status === 'finish') return activeColor;
    if (status === 'process') return inactiveColor;
    return inactiveColor;
  };

  const renderIcon = (status: StepItem['status'], custom?: ReactNode): ReactNode => {
    if (custom) return custom;
    if (status === 'error') return <XIcon size={checkSize} color={errorColor} />;
    if (status === 'finish') return <CheckIcon size={checkSize} color={activeColor} />;
    if (status === 'process') return <CheckIcon size={checkSize} color={inactiveColor} />;
    return null;
  };

  const isVertical = direction === 'vertical';

  const renderStep = (item: StepItem, index: number) => {
    const status = getStatus(index, item);
    const circleColor = colorForStatus(status);
    const isLast = index === items.length - 1;
    const clickable = !!onStepClick;

    return (
      <div
        key={index}
        className={`flex ${isVertical ? 'flex-row' : 'flex-col items-center'} ${clickable ? 'cursor-pointer' : ''}`}
        onClick={clickable ? () => onStepClick!(index) : undefined}
        style={!isLast ? { marginBottom: isVertical ? resolvedGap : 0, marginRight: !isVertical ? resolvedGap : 0 } : undefined}
      >
        <div className={`flex ${isVertical ? 'flex-col items-center' : 'flex-row items-center'} shrink-0`}>
          <div
            className="rounded-full flex items-center justify-center transition-colors duration-200 shrink-0"
            style={{
              width: iconSize,
              height: iconSize,
              border: `${iconBorderWidth}px solid ${circleColor}`,
              backgroundColor: 'transparent',
            }}
          >
            {renderIcon(status, item.icon)}
          </div>
          {showConnector && !isLast && (
            <div
              className={isVertical ? 'w-px' : 'h-px'}
              style={{
                backgroundColor: connectorColor ?? '#E6E6E6',
                flex: 1,
                minHeight: isVertical ? 16 : undefined,
                minWidth: !isVertical ? 16 : undefined,
                margin: isVertical ? '6px 0' : '0 6px',
              }}
            />
          )}
        </div>
        <div
          className={isVertical ? 'flex-1 pl-4' : 'pt-2 text-center'}
          style={{ paddingBottom: isVertical && !isLast ? 2 : 0 }}
        >
          <div
            className="font-medium transition-colors duration-200"
            style={{
              fontSize: titleSize,
              lineHeight: `${iconSize}px`,
              color: status === 'wait' ? inactiveColor : '#181918',
            }}
          >
            {item.title}
          </div>
          {item.description && (
            <div
              className="transition-colors duration-200"
              style={{
                fontSize: descriptionSize,
                color: '#8C8C8C',
                marginTop: 2,
              }}
            >
              {item.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex ${isVertical ? 'flex-col' : 'flex-row items-start'} ${className}`}
      style={style}
    >
      {items.map(renderStep)}
    </div>
  );
};

export default Steps;
