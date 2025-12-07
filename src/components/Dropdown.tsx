import React, { useState, useRef, useEffect } from 'react';

export interface DropdownMenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  items: DropdownMenuItem[];
  trigger?: 'click' | 'hover';
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  trigger = 'click',
  placement = 'bottomLeft',
  children,
  className = '',
  overlayClassName = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleTriggerMouseEnter}
      onMouseLeave={handleTriggerMouseLeave}
    >
      <div
        onClick={handleTriggerClick}
        className={`inline-flex ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        {children}
      </div>

      {isOpen && !disabled && (
        <div
          className={`absolute ${placementClasses[placement]} ${animationClasses} z-50 min-w-[160px] ${overlayClassName}`}
        >
          <div className="dropdown-menu bg-white rounded-lg shadow-lg border border-gray-200 py-1 overflow-hidden">
            {items.map((item) => (
              <div
                key={item.key}
                onClick={() => handleMenuItemClick(item)}
                className={`
                  dropdown-menu-item
                  flex items-center gap-2 px-4 py-2 text-sm cursor-pointer transition-all duration-200 ease-out
                  ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
                  ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'}
                `}
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
