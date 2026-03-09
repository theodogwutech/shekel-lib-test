import { useState, useRef, useEffect } from 'react';
import type { FC, ReactNode, CSSProperties } from 'react';

export interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  items: DropdownMenuItem[];
  trigger?: 'click' | 'hover';
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  menuBgColor?: string;
  menuItemHoverColor?: string;
  dangerColor?: string;
  borderColor?: string;
  style?: CSSProperties;
}

export const Dropdown: FC<DropdownProps> = ({
  items,
  trigger = 'click',
  placement = 'bottomLeft',
  children,
  className = '',
  overlayClassName = '',
  disabled = false,
  size = 'md',
  menuBgColor,
  menuItemHoverColor,
  dangerColor,
  borderColor,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (!disabled && trigger === 'click') {
      setIsOpen(!isOpen);
    }
  };

  const handleTriggerMouseEnter = () => {
    if (!disabled && trigger === 'hover') {
      setIsOpen(true);
    }
  };

  const handleTriggerMouseLeave = () => {
    if (!disabled && trigger === 'hover') {
      setIsOpen(false);
    }
  };

  const handleMenuItemClick = (item: DropdownMenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  const placementClasses = {
    bottomLeft: 'top-full left-0 mt-1',
    bottomRight: 'top-full right-0 mt-1',
    topLeft: 'bottom-full left-0 mb-1',
    topRight: 'bottom-full right-0 mb-1',
  };

  const animationClasses = placement.startsWith('bottom')
    ? 'dropdown-slide-down'
    : 'dropdown-slide-up';

  const sizeClasses = {
    sm: 'min-w-[120px] text-xs',
    md: 'min-w-[160px] text-sm',
    lg: 'min-w-[220px] text-base',
    responsive: 'min-w-[120px] sm:min-w-[160px] md:min-w-[200px] lg:min-w-[240px] text-xs sm:text-sm md:text-base',
  };

  const itemSizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-2.5',
    responsive: 'px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base gap-1.5 sm:gap-2 md:gap-2.5',
  };

  // Color styling helpers
  const defaultHoverColor = 'hover:bg-gray-50';
  const defaultBorderColor = 'border-gray-200';
  const defaultDangerColor = 'text-red-600';

  // Hover color handling
  const hoverColorStyle = menuItemHoverColor ? { backgroundColor: menuItemHoverColor } : {};
  const customHoverClass = menuItemHoverColor ? '' : defaultHoverColor;

  // Danger color handling
  const customDangerStyle = dangerColor ? { color: dangerColor } : {};
  const dangerHoverBgStyle = dangerColor ? { backgroundColor: dangerColor + '15' } : {};

  // Border color handling
  const finalBorderColor = borderColor || defaultBorderColor;

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleTriggerMouseEnter}
      onMouseLeave={handleTriggerMouseLeave}
      style={style}
    >
      <div
        onClick={handleTriggerClick}
        className={`inline-flex ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        {children}
      </div>

      {isOpen && !disabled && (
        <div
          className={`absolute ${placementClasses[placement]} ${animationClasses} z-50 ${sizeClasses[size]} ${overlayClassName}`}
        >
          <div
            className={`dropdown-menu rounded-lg shadow-lg border py-1 overflow-hidden ${finalBorderColor}`}
            style={{ backgroundColor: menuBgColor || '#ffffff' }}
          >
            {items.map((item) => {
              // Determine item-specific styles
              let itemStyle: React.CSSProperties = {};

              if (!item.disabled) {
                if (item.danger) {
                  // Danger items use custom danger color if provided
                  itemStyle = {
                    ...customDangerStyle,
                    ...dangerHoverBgStyle,
                  };
                } else if (menuItemHoverColor) {
                  // Custom hover color applied inline
                  itemStyle = hoverColorStyle;
                }
              }

              return (
                <div
                  key={item.key}
                  onClick={() => handleMenuItemClick(item)}
                  className={`
                    dropdown-menu-item
                    flex items-center cursor-pointer transition-all duration-200 ease-out
                    ${!overlayClassName.includes('px-') && !overlayClassName.includes('py-') ? itemSizeClasses[size] : ''}
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : customHoverClass}
                    ${item.danger ? (dangerColor ? '' : defaultDangerColor) : 'text-gray-700'}
                  `}
                  style={itemStyle}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
