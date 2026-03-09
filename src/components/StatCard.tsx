import type { FC, CSSProperties } from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  // Size customization
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  // Border radius customization
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  // Color customization - Default state
  bgColor?: string;
  borderColor?: string;
  labelColor?: string;
  valueColor?: string;
  // Color customization - Selected state
  selectedBgColor?: string;
  selectedBorderColor?: string;
  selectedLabelColor?: string;
  selectedValueColor?: string;
  // Inline styles
  style?: CSSProperties;
}

export const StatCard: FC<StatCardProps> = ({
  label,
  value,
  selected = false,
  onClick,
  className = '',
  size = 'responsive',
  rounded = 'md',
  bgColor,
  borderColor,
  labelColor,
  valueColor,
  selectedBgColor,
  selectedBorderColor,
  selectedLabelColor,
  selectedValueColor,
  style,
}) => {
  // Padding based on size
  const getPaddingClasses = () => {
    switch (size) {
      case 'sm':
        return 'p-2 sm:p-3';
      case 'md':
        return 'p-3 sm:p-4';
      case 'lg':
        return 'p-4 sm:p-6';
      case 'responsive':
        return 'p-3 sm:p-4 md:p-5 lg:p-6';
      default:
        return 'p-4';
    }
  };

  // Border radius based on rounded prop
  const getRoundedClasses = () => {
    switch (rounded) {
      case 'none':
        return 'rounded-none';
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'xl':
        return 'rounded-xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-md';
    }
  };

  // Label text size based on size prop
  const getLabelTextClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs sm:text-xs';
      case 'md':
        return 'text-sm sm:text-base';
      case 'lg':
        return 'text-base sm:text-lg';
      case 'responsive':
        return 'text-xs sm:text-sm md:text-base lg:text-lg';
      default:
        return 'text-xs sm:text-sm md:text-base';
    }
  };

  // Value text size based on size prop
  const getValueTextClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-lg sm:text-xl';
      case 'md':
        return 'text-2xl sm:text-3xl';
      case 'lg':
        return 'text-4xl sm:text-5xl';
      case 'responsive':
        return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
      default:
        return 'text-3xl';
    }
  };

  const baseClasses = `stat-card relative flex flex-col ${getPaddingClasses()} ${getRoundedClasses()} border transition-all duration-500 ease-in-out cursor-pointer overflow-hidden`;

  // Build default state classes with custom color support
  const defaultBgClass = bgColor ? '' : 'bg-white';
  const defaultBorderClass = borderColor ? '' : 'border-gray-200';
  const defaultHoverClasses = !bgColor && !borderColor ? 'hover:border-gray-300 hover:shadow-sm' : '';

  const stateClasses = selected
    ? `border-[#181918] bg-[#F4F4F4] shadow-sm scale-[1.02]`
    : `${defaultBorderClass} ${defaultBgClass} ${defaultHoverClasses}`;

  const combinedClassName = `${baseClasses} ${stateClasses} ${className}`;

  // Inline styles for custom colors
  const inlineStyles: CSSProperties = {
    ...style,
  };

  // Apply custom background color
  if (selected && selectedBgColor) {
    inlineStyles.backgroundColor = selectedBgColor;
  } else if (!selected && bgColor) {
    inlineStyles.backgroundColor = bgColor;
  }

  // Apply custom border color
  if (selected && selectedBorderColor) {
    inlineStyles.borderColor = selectedBorderColor;
  } else if (!selected && borderColor) {
    inlineStyles.borderColor = borderColor;
  }

  return (
    <div className={combinedClassName} onClick={onClick} style={inlineStyles}>
      {/* Active indicator slide effect */}
      {selected && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EC615B]/5 to-transparent animate-slide-in pointer-events-none" />
      )}

      <div className="relative z-10 transition-transform duration-300 ease-out hover:scale-[0.98] active:scale-[0.96]">
        <span
          className={`${getLabelTextClasses()} font-normal mb-2 block transition-colors duration-500 ${
            selected ? 'text-gray-700' : 'text-gray-600'
          }`}
          style={
            selected && selectedLabelColor
              ? { color: selectedLabelColor }
              : !selected && labelColor
                ? { color: labelColor }
                : undefined
          }
        >
          {label}
        </span>
        <span
          className={`${getValueTextClasses()} font-semibold stat-value block transition-all duration-500 ${
            selected ? 'text-[#181918] scale-105' : 'text-[#181918]'
          }`}
          style={
            selected && selectedValueColor
              ? { color: selectedValueColor }
              : !selected && valueColor
                ? { color: valueColor }
                : undefined
          }
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
