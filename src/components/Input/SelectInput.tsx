import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { hexWithAlpha, ErrorIcon } from './_theme';

export interface SelectInputOption {
  value: string | number;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  [key: string]: any;
}

export type SelectInputValue = string | number | (string | number)[] | undefined;

export interface SelectInputProps {
  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelExtra?: React.ReactNode;
  requiredMark?: React.ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  value?: SelectInputValue;
  defaultValue?: SelectInputValue;
  onChange?: (
    value: SelectInputValue,
    option?: SelectInputOption | SelectInputOption[]
  ) => void;
  options?: SelectInputOption[];
  placeholder?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  optionFilterProp?: 'label' | 'value';
  filterOption?: boolean | ((input: string, option: SelectInputOption) => boolean);
  onSearch?: (value: string) => void;
  mode?: 'single' | 'multiple';
  allowClear?: boolean;
  height?: number | string;
  borderRadius?: number | string;
  className?: string;
  style?: React.CSSProperties;
  popupClassName?: string;
  popupStyle?: React.CSSProperties;
  onBlur?: () => void;
  onFocus?: () => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  control?: Control<any>;
  name?: string;
  id?: string;
  notFoundContent?: React.ReactNode;
  status?: 'error' | 'warning';
  optionRender?: (option: SelectInputOption, info: { selected: boolean }) => React.ReactNode;
  suffixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  accentColor?: string;
  errorColor?: string;
  borderColor?: string;
  filledBorderColor?: string;
  selectedBgColor?: string;
  selectedTextColor?: string;
  optionHoverColor?: string;
  tagBgColor?: string;
  tagBorderColor?: string;
}

const defaultFilter = (
  input: string,
  option: SelectInputOption,
  prop: 'label' | 'value' = 'label'
): boolean => {
  const search = input.toLowerCase();
  const labelStr = typeof option.label === 'string' ? option.label.toLowerCase() : '';
  const valueStr = String(option.value).toLowerCase();
  if (prop === 'value') return valueStr.includes(search);
  return labelStr.includes(search) || valueStr.includes(search);
};

const Chevron: React.FC<{ open: boolean; color?: string }> = ({ open, color = '#8C8C8C' }) => (
  <span
    className={`shrink-0 flex items-center justify-center transition-transform duration-200 ${
      open ? 'rotate-180' : ''
    }`}
    style={{ width: 16, height: 16, color }}
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const ClearIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="currentColor" />
    <path d="M4 4l4 4M8 4l-4 4" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const CheckIcon: React.FC<{ color?: string }> = ({ color = '#EC615B' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-2">
    <path
      d="M3 8l3.5 3.5L13 5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SelectInputBase = React.forwardRef<HTMLDivElement, Omit<SelectInputProps, 'control'>>(
  (props, ref) => {
    const {
      label,
      labelClassName = '',
      labelStyle,
      labelExtra,
      requiredMark,
      error,
      helperText,
      required,
      disabled,
      value: externalValue,
      defaultValue,
      onChange,
      options = [],
      placeholder = 'Select an option',
      showSearch = true,
      searchPlaceholder = 'Search',
      optionFilterProp = 'label',
      filterOption,
      onSearch,
      mode = 'single',
      allowClear = true,
      height = 44,
      borderRadius = 12,
      className = '',
      style,
      popupClassName = '',
      popupStyle,
      onBlur,
      onFocus,
      onDropdownVisibleChange,
      id,
      notFoundContent = 'No results found',
      status,
      optionRender,
      suffixIcon,
      prefixIcon,
      accentColor = '#EC615B',
      errorColor = '#C21919',
      borderColor: defaultBorderColor = '#D9D9D9',
      filledBorderColor = '#181918',
      selectedBgColor,
      selectedTextColor,
      optionHoverColor = 'rgba(0, 0, 0, 0.04)',
      tagBgColor = '#F5F5F5',
      tagBorderColor = '#E8E8E8',
    } = props;
    const resolvedSelectedBg = selectedBgColor ?? hexWithAlpha(accentColor, 0.08);
    const resolvedSelectedText = selectedTextColor ?? accentColor;

    const isControlled = externalValue !== undefined;
    const [innerValue, setInnerValue] = useState<SelectInputValue>(
      defaultValue ?? (mode === 'multiple' ? [] : undefined)
    );
    const value = isControlled ? externalValue : innerValue;

    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [hovered, setHovered] = useState(false);

    const reactId = React.useId();
    const selectId = id ?? reactId;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelPos, setPanelPos] = useState<{ top: number; left: number; width: number }>({
      top: 0,
      left: 0,
      width: 0,
    });

    const updatePanelPos = useCallback(() => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
      const measured = panelRef.current?.offsetHeight ?? 0;
      const fallbackMaxHeight = 300;
      const panelH = measured || fallbackMaxHeight;
      const spaceBelow = window.innerHeight - r.bottom;
      const spaceAbove = r.top;
      const openUpward = spaceBelow < panelH && spaceAbove > spaceBelow;
      const top = openUpward ? r.top - panelH - 4 : r.bottom + 4;
      setPanelPos({ top: Math.max(4, top), left: r.left, width: r.width });
    }, []);

    useEffect(() => {
      if (!open) return;
      updatePanelPos();
      const h = () => updatePanelPos();
      window.addEventListener('resize', h);
      window.addEventListener('scroll', h, true);
      return () => {
        window.removeEventListener('resize', h);
        window.removeEventListener('scroll', h, true);
      };
    }, [open, updatePanelPos]);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const inlineInputRef = useRef<HTMLInputElement>(null);

    const isError = !!error || status === 'error';
    const resolvedRequiredMark =
      requiredMark === undefined ? <span style={{ color: '#C21919' }}>*</span> : requiredMark;

    const resolvedHeight = typeof height === 'number' ? `${height}px` : height;
    const resolvedRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

    const filterFn = useCallback(
      (input: string, option: SelectInputOption) => {
        if (filterOption === false) return true;
        if (typeof filterOption === 'function') return filterOption(input, option);
        return defaultFilter(input, option, optionFilterProp);
      },
      [filterOption, optionFilterProp]
    );

    const filteredOptions = useMemo(() => {
      if (!showSearch || !searchQuery) return options;
      return options.filter((o) => filterFn(searchQuery, o));
    }, [options, searchQuery, showSearch, filterFn]);

    useLayoutEffect(() => {
      if (!open) return;
      updatePanelPos();
    }, [open, filteredOptions.length, updatePanelPos]);

    const isMultiple = mode === 'multiple';
    const selectedValues: (string | number)[] = isMultiple
      ? Array.isArray(value)
        ? value
        : []
      : value !== undefined && value !== null && value !== ''
        ? [value as string | number]
        : [];

    const selectedOptions: SelectInputOption[] = selectedValues
      .map((v) => options.find((o) => o.value === v))
      .filter(Boolean) as SelectInputOption[];

    const hasValue = selectedValues.length > 0;

    const openPanel = () => {
      if (disabled) return;
      setOpen(true);
      onDropdownVisibleChange?.(true);
      onFocus?.();
    };
    const closePanel = () => {
      setOpen(false);
      setSearchQuery('');
      setActiveIndex(-1);
      onDropdownVisibleChange?.(false);
      onBlur?.();
    };

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        const insideWrapper = wrapperRef.current?.contains(target);
        const insidePanel = panelRef.current?.contains(target);
        if (!insideWrapper && !insidePanel) {
          if (open) closePanel();
        }
      };
      if (open) document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    useEffect(() => {
      if (open && showSearch) {
        if (inlineInputRef.current) inlineInputRef.current.focus();
        else if (searchInputRef.current) searchInputRef.current.focus();
      }
      if (open) {
        const firstSelectedIndex = filteredOptions.findIndex((o) =>
          selectedValues.includes(o.value)
        );
        setActiveIndex(firstSelectedIndex >= 0 ? firstSelectedIndex : 0);
      }
    }, [open]);

    const commitChange = (next: SelectInputValue, option?: SelectInputOption | SelectInputOption[]) => {
      if (!isControlled) setInnerValue(next);
      onChange?.(next, option);
    };

    const handleSelect = (option: SelectInputOption) => {
      if (option.disabled) return;
      if (isMultiple) {
        const current = Array.isArray(value) ? value : [];
        const isSelected = current.includes(option.value);
        const next = isSelected
          ? current.filter((v) => v !== option.value)
          : [...current, option.value];
        const nextOptions = options.filter((o) => next.includes(o.value));
        commitChange(next, nextOptions);
      } else {
        commitChange(option.value, option);
        closePanel();
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const empty: SelectInputValue = isMultiple ? [] : undefined;
      commitChange(empty, isMultiple ? [] : undefined);
    };

    const handleRemoveTag = (e: React.MouseEvent, optionValue: string | number) => {
      e.stopPropagation();
      if (!isMultiple) return;
      const current = Array.isArray(value) ? value : [];
      const next = current.filter((v) => v !== optionValue);
      const nextOptions = options.filter((o) => next.includes(o.value));
      commitChange(next, nextOptions);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!open) {
        if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          openPanel();
        }
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        closePanel();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(filteredOptions.length - 1, i + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && filteredOptions[activeIndex]) {
          handleSelect(filteredOptions[activeIndex]);
        }
      } else if (e.key === 'Backspace' && isMultiple && !searchQuery && selectedValues.length > 0) {
        const last = selectedValues[selectedValues.length - 1];
        const current = Array.isArray(value) ? value : [];
        const next = current.filter((v) => v !== last);
        const nextOptions = options.filter((o) => next.includes(o.value));
        commitChange(next, nextOptions);
      }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      onSearch?.(e.target.value);
      setActiveIndex(0);
    };

    const resolvedBorder = isError
      ? errorColor
      : open
        ? accentColor
        : hasValue
          ? filledBorderColor
          : defaultBorderColor;
    const openShadow = open ? `0 0 0 2px ${hexWithAlpha(accentColor, 0.2)}` : undefined;
    const themeVars = {
      '--shekel-accent': accentColor,
    } as React.CSSProperties;

    const showClearBtn = allowClear && hasValue && !disabled;

    return (
      <div className="w-full" ref={ref} style={themeVars}>
        {label && (
          <div className="flex items-center justify-between mb-2 gap-2">
            <label
              htmlFor={selectId}
              className={`block text-sm font-medium ${labelClassName}`}
              style={{ color: isError ? errorColor : '#181918', ...labelStyle }}
            >
              {label}
              {required && resolvedRequiredMark}
            </label>
            {labelExtra && <div className="shrink-0">{labelExtra}</div>}
          </div>
        )}
        <div className="relative" ref={wrapperRef}>
          <div
            ref={triggerRef as any}
            id={selectId}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={() => (open ? closePanel() : openPanel())}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex items-center w-full bg-white border transition-colors duration-200 hover:border-[color:var(--shekel-accent)] ${
              disabled ? 'opacity-60 cursor-not-allowed bg-[#F5F5F5]' : 'cursor-pointer'
            } ${className}`}
            style={{
              minHeight: resolvedHeight,
              borderRadius: resolvedRadius,
              padding: isMultiple && selectedValues.length > 0 ? '4px 8px 4px 8px' : '4px 11px',
              borderColor: resolvedBorder,
              boxShadow: openShadow,
              ...style,
            }}
          >
            {prefixIcon && (
              <span className="shrink-0 mr-2 flex items-center text-[#8C8C8C]">{prefixIcon}</span>
            )}
            <div className="flex-1 min-w-0 flex flex-wrap items-center gap-1 relative">
              {isMultiple &&
                selectedOptions.map((opt) => (
                  <span
                    key={opt.value}
                    className="inline-flex items-center gap-1 rounded px-2 text-xs text-[#181918] border"
                    style={{
                      height: 24,
                      lineHeight: '22px',
                      backgroundColor: tagBgColor,
                      borderColor: tagBorderColor,
                    }}
                  >
                    <span className="truncate max-w-[140px]">{opt.label}</span>
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => handleRemoveTag(e, opt.value)}
                        className="flex items-center justify-center text-[#8C8C8C] hover:text-[#181918]"
                        aria-label="Remove"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path
                            d="M2 2l6 6M8 2l-6 6"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    )}
                  </span>
                ))}

              {open && showSearch ? (
                <input
                  ref={inlineInputRef}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={
                    !isMultiple && selectedOptions[0]
                      ? typeof selectedOptions[0].label === 'string'
                        ? selectedOptions[0].label
                        : placeholder
                      : placeholder
                  }
                  className="flex-1 min-w-[40px] outline-none bg-transparent text-sm text-[#181918] placeholder:text-[#8C8C8C]"
                />
              ) : !isMultiple && selectedOptions[0] ? (
                <span className="truncate text-sm text-[#181918]">{selectedOptions[0].label}</span>
              ) : selectedOptions.length === 0 ? (
                <span className="truncate text-sm text-[#8C8C8C]">{placeholder}</span>
              ) : null}
            </div>
            <div className="flex items-center shrink-0 ml-2">
              {showClearBtn && hovered ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear"
                  className="flex items-center justify-center w-4 h-4 text-[#BFBFBF] hover:text-[#595959] transition-colors"
                >
                  <ClearIcon />
                </button>
              ) : suffixIcon !== undefined ? (
                <span className="flex items-center text-[#8C8C8C]">{suffixIcon}</span>
              ) : (
                <Chevron open={open} />
              )}
            </div>
          </div>
          {open && !disabled && typeof document !== 'undefined' && createPortal(
            <>
              <style>{`
                @keyframes shekel-dropdown-in {
                  from { opacity: 0; transform: scaleY(0.9) translateY(-4px); }
                  to { opacity: 1; transform: scaleY(1) translateY(0); }
                }
                .shekel-dropdown-anim {
                  transform-origin: top center;
                  animation: shekel-dropdown-in 180ms cubic-bezier(0.23, 1, 0.32, 1);
                }
              `}</style>
            <div
              ref={panelRef}
              className={`fixed z-[1000] bg-white overflow-hidden shekel-dropdown-anim ${popupClassName}`}
              style={{
                top: panelPos.top,
                left: panelPos.left,
                width: panelPos.width,
                borderRadius: 8,
                boxShadow:
                  '0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)',
                ...popupStyle,
              }}
            >
              {showSearch && (
                <div className="px-2 py-2 border-b border-[#F0F0F0]">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder={searchPlaceholder}
                    className="w-full outline-none text-sm bg-transparent px-2 py-1 text-[#181918] placeholder:text-[#8C8C8C]"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              <div role="listbox" className="overflow-auto flex flex-col gap-0.5" style={{ maxHeight: 256, padding: 4 }}>
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-3 text-sm text-[#8C8C8C] text-center">
                    {notFoundContent}
                  </div>
                ) : (
                  filteredOptions.map((opt, i) => {
                    const isSelected = selectedValues.includes(opt.value);
                    const isActive = i === activeIndex;
                    return (
                      <div
                        key={opt.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={opt.disabled}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(opt);
                        }}
                        onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                        className={`flex items-center justify-between transition-colors duration-150 ${
                          opt.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                        style={{
                          padding: '10px 16px',
                          minHeight: 42,
                          borderRadius: 6,
                          fontSize: 14,
                          lineHeight: '22px',
                          backgroundColor: isSelected
                            ? resolvedSelectedBg
                            : isActive && !opt.disabled
                              ? optionHoverColor
                              : 'transparent',
                          color: isSelected ? resolvedSelectedText : '#181918',
                          fontWeight: isSelected ? 600 : 400,
                        }}
                      >
                        <div className="min-w-0 flex-1">
                          {optionRender ? (
                            optionRender(opt, { selected: isSelected })
                          ) : opt.description ? (
                            <>
                              <div className="truncate font-semibold">{opt.label}</div>
                              <div className="truncate text-xs text-[#8C8C8C] font-normal mt-0.5">
                                {opt.description}
                              </div>
                            </>
                          ) : (
                            <span className="truncate">{opt.label}</span>
                          )}
                        </div>
                        {isSelected && <CheckIcon color={resolvedSelectedText} />}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            </>,
            document.body
          )}
        </div>
        {error && (
          <div className="flex items-center mt-1 text-xs gap-1" style={{ color: errorColor }}>
            <ErrorIcon color={errorColor} size={14} />
            {error}
          </div>
        )}
        {!error && helperText && <div className="mt-1 text-xs text-gray-500">{helperText}</div>}
      </div>
    );
  }
);
SelectInputBase.displayName = 'SelectInputBase';

const ControlledSelectInput: React.FC<
  SelectInputProps & { control: NonNullable<SelectInputProps['control']>; name: string }
> = ({ control, name, error: errorProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <SelectInputBase
      {...rest}
      value={field.value}
      onChange={(v, opt) => {
        field.onChange(v);
        rest.onChange?.(v, opt);
      }}
      onBlur={() => {
        field.onBlur();
        rest.onBlur?.();
      }}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const SelectInput = React.forwardRef<HTMLDivElement, SelectInputProps>(
  ({ control, name, ...props }, ref) => {
    if (control && name) {
      return <ControlledSelectInput control={control} name={name} {...props} />;
    }
    return <SelectInputBase ref={ref} name={name} {...props} />;
  }
);
SelectInput.displayName = 'SelectInput';
