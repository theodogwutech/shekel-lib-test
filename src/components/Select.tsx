import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  allowClear?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  placeholder = 'Select an option',
  onChange,
  disabled = false,
  size = 'md',
  fullWidth = false,
  className = '',
  allowClear = false,
  showSearch = false,
  searchPlaceholder = 'Search...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number | undefined>(
    defaultValue
  );
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (showSearch && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, showSearch]);

  const handleSelect = (optionValue: string | number) => {
    if (controlledValue === undefined) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlledValue === undefined) {
      setInternalValue(undefined);
    }
    onChange?.('' as any);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = showSearch
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : 'min-w-[200px]';

  const ChevronIcon = (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ClearIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div ref={selectRef} className={`relative ${widthClass} ${className}`}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          select-trigger
          flex items-center justify-between gap-2
          border border-gray-300 rounded-lg
          bg-white
          transition-all duration-200 ease-out
          ${sizeClasses[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:border-gray-400'}
          ${isOpen ? 'border-[#EC615B] ring-2 ring-[#EC615B] ring-opacity-20' : ''}
        `}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {allowClear && value && !disabled && (
            <span
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ease-out"
            >
              {ClearIcon}
            </span>
          )}
          <span className="text-gray-400">{ChevronIcon}</span>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 dropdown-slide-down">
          <div className="select-dropdown bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-[300px] overflow-auto">
            {showSearch && (
              <div className="px-2 py-2 border-b border-gray-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EC615B] focus:border-[#EC615B] transition-all duration-200 ease-out"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={`
                    select-option
                    px-4 py-2 text-sm cursor-pointer transition-all duration-200 ease-out
                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
                    ${option.value === value ? 'bg-[#FCEAE9] text-[#EC615B] font-medium' : 'text-[#181918]'}
                  `}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
