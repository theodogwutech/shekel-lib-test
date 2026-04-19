import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { hexWithAlpha, ErrorIcon } from './_theme';

export type DateInput = Date | string | number | null | undefined;

export interface DatePickerProps {
  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelExtra?: React.ReactNode;
  requiredMark?: React.ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;

  value?: DateInput;
  defaultValue?: DateInput;
  onChange?: (date: Date | null, dateString: string) => void;

  placeholder?: string;
  format?: string; // e.g. "YYYY-MM-DD", "DD/MM/YYYY", "MMM D, YYYY"

  minDate?: DateInput;
  maxDate?: DateInput;
  disabledDate?: (date: Date) => boolean;

  showToday?: boolean;
  allowClear?: boolean;
  firstDayOfWeek?: 0 | 1; // 0 = Sunday, 1 = Monday

  height?: number | string;
  borderRadius?: number | string;

  className?: string;
  style?: React.CSSProperties;
  popupClassName?: string;

  onOpenChange?: (open: boolean) => void;

  control?: Control<any>;
  name?: string;
  id?: string;
  status?: 'error' | 'warning';
  accentColor?: string;
  errorColor?: string;
  borderColor?: string;
  filledBorderColor?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_NAMES_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAY_NAMES_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const toDate = (v: DateInput): Date | null => {
  if (v === null || v === undefined || v === '') return null;
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

const pad = (n: number, len = 2) => String(n).padStart(len, '0');

const formatDate = (date: Date, format: string): string => {
  const y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  return format
    .replace(/YYYY/g, String(y))
    .replace(/YY/g, String(y).slice(-2))
    .replace(/MMMM/g, MONTH_NAMES[date.getMonth()])
    .replace(/MMM/g, MONTH_NAMES[date.getMonth()].slice(0, 3))
    .replace(/MM/g, pad(M))
    .replace(/M/g, String(M))
    .replace(/DD/g, pad(D))
    .replace(/D/g, String(D));
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfDay = (d: Date) => {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
};

const CalendarIcon: React.FC<{ color?: string; size?: number }> = ({ color = '#181918', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.5 8.33464H2.5M13.3333 1.66797V5.0013M6.66667 1.66797V5.0013M6.5 18.3346H13.5C14.9001 18.3346 15.6002 18.3346 16.135 18.0622C16.6054 17.8225 16.9878 17.44 17.2275 16.9696C17.5 16.4348 17.5 15.7348 17.5 14.3346V7.33464C17.5 5.9345 17.5 5.23444 17.2275 4.69966C16.9878 4.22925 16.6054 3.8468 16.135 3.60712C15.6002 3.33464 14.9001 3.33464 13.5 3.33464H6.5C5.09987 3.33464 4.3998 3.33464 3.86502 3.60712C3.39462 3.8468 3.01217 4.22925 2.77248 4.69966C2.5 5.23444 2.5 5.9345 2.5 7.33464V14.3346C2.5 15.7348 2.5 16.4348 2.77248 16.9696C3.01217 17.44 3.39462 17.8225 3.86502 18.0622C4.3998 18.3346 5.09987 18.3346 6.5 18.3346Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronLeft: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DoubleChevronLeft: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M11 3l-4 4 4 4M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DoubleChevronRight: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 3l4 4-4 4M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ClearX: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="currentColor" />
    <path d="M4 4l4 4M8 4l-4 4" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const DatePickerBase = React.forwardRef<HTMLDivElement, Omit<DatePickerProps, 'control'>>(
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
      placeholder = 'Select date',
      format = 'YYYY-MM-DD',
      minDate,
      maxDate,
      disabledDate,
      showToday = true,
      allowClear = true,
      firstDayOfWeek = 0,
      height = 44,
      borderRadius = 12,
      className = '',
      style,
      popupClassName = '',
      onOpenChange,
      id,
      status,
      accentColor = '#EC615B',
      errorColor = '#C21919',
      borderColor: defaultBorderColor = '#D9D9D9',
      filledBorderColor = '#181918',
    } = props;

    const isControlled = externalValue !== undefined;
    const [innerValue, setInnerValue] = useState<Date | null>(toDate(defaultValue));
    const resolvedValue = isControlled ? toDate(externalValue) : innerValue;

    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [viewDate, setViewDate] = useState<Date>(resolvedValue ?? new Date());

    const reactId = React.useId();
    const inputId = id ?? reactId;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelPos, setPanelPos] = useState<{ top: number; left: number; width: number }>({
      top: 0,
      left: 0,
      width: 280,
    });

    const updatePanelPos = () => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
      const panelWidth = 280;
      const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
      let left = r.left;
      if (left + panelWidth + 8 > vw) left = Math.max(8, vw - panelWidth - 8);
      const panelHeight = 340;
      let top = r.bottom + 4;
      if (top + panelHeight + 8 > vh && r.top > panelHeight + 8) {
        top = r.top - panelHeight - 4;
      }
      setPanelPos({ top, left, width: panelWidth });
    };

    useEffect(() => {
      if (!open) return;
      updatePanelPos();
      const handler = () => updatePanelPos();
      window.addEventListener('resize', handler);
      window.addEventListener('scroll', handler, true);
      return () => {
        window.removeEventListener('resize', handler);
        window.removeEventListener('scroll', handler, true);
      };
    }, [open]);

    const isError = !!error || status === 'error';
    const hasValue = resolvedValue !== null;
    const resolvedRequiredMark =
      requiredMark === undefined ? <span style={{ color: '#C21919' }}>*</span> : requiredMark;
    const resolvedHeight = typeof height === 'number' ? `${height}px` : height;
    const resolvedRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

    const min = useMemo(() => (minDate ? startOfDay(toDate(minDate)!) : null), [minDate]);
    const max = useMemo(() => (maxDate ? startOfDay(toDate(maxDate)!) : null), [maxDate]);

    const isDisabledDate = (d: Date): boolean => {
      const day = startOfDay(d);
      if (min && day < min) return true;
      if (max && day > max) return true;
      if (disabledDate && disabledDate(day)) return true;
      return false;
    };

    useEffect(() => {
      if (resolvedValue) setViewDate(resolvedValue);
    }, [resolvedValue?.getTime()]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        const insideWrapper = wrapperRef.current?.contains(target);
        const insidePanel = panelRef.current?.contains(target);
        if (!insideWrapper && !insidePanel) {
          if (open) {
            setOpen(false);
            onOpenChange?.(false);
          }
        }
      };
      if (open) document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onOpenChange]);

    const commit = (next: Date | null) => {
      if (!isControlled) setInnerValue(next);
      onChange?.(next, next ? formatDate(next, format) : '');
    };

    const handleToggle = () => {
      if (disabled) return;
      const next = !open;
      setOpen(next);
      onOpenChange?.(next);
      if (next && resolvedValue) setViewDate(resolvedValue);
    };

    const handleDayClick = (day: Date) => {
      if (isDisabledDate(day)) return;
      commit(day);
      setOpen(false);
      onOpenChange?.(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      commit(null);
    };

    const today = useMemo(() => startOfDay(new Date()), []);

    const resolvedBorder = isError
      ? errorColor
      : open
        ? accentColor
        : hasValue
          ? filledBorderColor
          : defaultBorderColor;
    const openShadow = open ? `0 0 0 2px ${hexWithAlpha(accentColor, 0.2)}` : undefined;
    const themeVars = { '--shekel-accent': accentColor } as React.CSSProperties;

    const showClearBtn = allowClear && hasValue && !disabled && hovered;

    const dayNames = firstDayOfWeek === 1 ? DAY_NAMES_MON : DAY_NAMES_SUN;

    const calendarGrid = useMemo(() => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const shift = firstDayOfWeek === 1 ? (firstDay === 0 ? 6 : firstDay - 1) : firstDay;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevMonthDays = new Date(year, month, 0).getDate();

      const cells: { date: Date; outside: boolean }[] = [];
      for (let i = shift - 1; i >= 0; i--) {
        cells.push({ date: new Date(year, month - 1, prevMonthDays - i), outside: true });
      }
      for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ date: new Date(year, month, d), outside: false });
      }
      while (cells.length < 42) {
        const lastDate = cells[cells.length - 1].date;
        const next = new Date(lastDate);
        next.setDate(next.getDate() + 1);
        cells.push({ date: next, outside: true });
      }
      return cells;
    }, [viewDate, firstDayOfWeek]);

    const goMonth = (delta: number) => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1));
    };
    const goYear = (delta: number) => {
      setViewDate(new Date(viewDate.getFullYear() + delta, viewDate.getMonth(), 1));
    };

    const displayText = resolvedValue ? formatDate(resolvedValue, format) : '';

    return (
      <div className="w-full" ref={ref} style={themeVars}>
        {label && (
          <div className="flex items-center justify-between mb-2 gap-2">
            <label
              htmlFor={inputId}
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
            id={inputId}
            role="combobox"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={handleToggle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onKeyDown={(e) => {
              if (disabled) return;
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                handleToggle();
              }
              if (e.key === 'Escape' && open) {
                e.preventDefault();
                setOpen(false);
                onOpenChange?.(false);
              }
            }}
            className={`flex items-center w-full bg-white border transition-colors duration-200 hover:border-[color:var(--shekel-accent)] ${
              disabled ? 'opacity-60 cursor-not-allowed bg-[#F5F5F5]' : 'cursor-pointer'
            } ${className}`}
            style={{
              height: resolvedHeight,
              borderRadius: resolvedRadius,
              padding: '4px 11px',
              borderColor: resolvedBorder,
              boxShadow: openShadow,
              ...style,
            }}
          >
            <span
              className={`flex-1 min-w-0 truncate text-sm ${
                resolvedValue ? 'text-[#181918]' : 'text-[#8C8C8C]'
              }`}
            >
              {displayText || placeholder}
            </span>
            <div className="flex items-center shrink-0 ml-2">
              {showClearBtn ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear"
                  className="flex items-center justify-center w-4 h-4 text-[#BFBFBF] hover:text-[#595959] transition-colors"
                >
                  <ClearX />
                </button>
              ) : (
                <CalendarIcon />
              )}
            </div>
          </div>
          {open && !disabled && typeof document !== 'undefined' && createPortal(
            <>
              <style>{`
                @keyframes shekel-picker-in { from { opacity: 0; transform: scaleY(0.9) translateY(-4px); } to { opacity: 1; transform: scaleY(1) translateY(0); } }
                .shekel-picker-anim { transform-origin: top center; animation: shekel-picker-in 180ms cubic-bezier(0.23, 1, 0.32, 1); }
              `}</style>
            <div
              ref={panelRef}
              className={`fixed z-[1000] bg-white shekel-picker-anim ${popupClassName}`}
              style={{
                top: panelPos.top,
                left: panelPos.left,
                width: panelPos.width,
                maxWidth: 'calc(100vw - 16px)',
                borderRadius: 8,
                boxShadow:
                  '0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)',
                padding: 8,
              }}
            >
              <div className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => goYear(-1)}
                    aria-label="Previous year"
                    className="w-7 h-7 flex items-center justify-center text-[#595959] hover:text-[color:var(--shekel-accent)] rounded transition-colors"
                  >
                    <DoubleChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => goMonth(-1)}
                    aria-label="Previous month"
                    className="w-7 h-7 flex items-center justify-center text-[#595959] hover:text-[color:var(--shekel-accent)] rounded transition-colors"
                  >
                    <ChevronLeft />
                  </button>
                </div>
                <div className="text-sm font-medium text-[#181918]">
                  {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => goMonth(1)}
                    aria-label="Next month"
                    className="w-7 h-7 flex items-center justify-center text-[#595959] hover:text-[color:var(--shekel-accent)] rounded transition-colors"
                  >
                    <ChevronRight />
                  </button>
                  <button
                    type="button"
                    onClick={() => goYear(1)}
                    aria-label="Next year"
                    className="w-7 h-7 flex items-center justify-center text-[#595959] hover:text-[color:var(--shekel-accent)] rounded transition-colors"
                  >
                    <DoubleChevronRight />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-0 px-1 pt-2 pb-1">
                {dayNames.map((d) => (
                  <div
                    key={d}
                    className="text-xs text-[#8C8C8C] text-center py-1"
                    style={{ height: 28 }}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0 px-1">
                {calendarGrid.map(({ date, outside }, i) => {
                  const selected = resolvedValue && isSameDay(date, resolvedValue);
                  const isToday = isSameDay(date, today);
                  const disabledDay = isDisabledDate(date);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={disabledDay}
                      onClick={() => handleDayClick(date)}
                      className="flex items-center justify-center text-sm transition-colors"
                      style={{
                        height: 32,
                        margin: '1px 0',
                      }}
                    >
                      <span
                        className={`flex items-center justify-center rounded-full transition-colors ${
                          disabledDay
                            ? 'text-[#D9D9D9] cursor-not-allowed'
                            : outside
                              ? 'text-[#BFBFBF] hover:bg-[#F5F5F5]'
                              : 'text-[#181918] hover:bg-[#F5F5F5]'
                        }`}
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: selected ? accentColor : undefined,
                          color: selected ? '#FFFFFF' : undefined,
                          fontWeight: selected ? 600 : 400,
                          border: isToday && !selected ? `1px solid ${accentColor}` : undefined,
                        }}
                      >
                        {date.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>
              {showToday && (
                <div className="border-t border-[#F0F0F0] mt-2 pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isDisabledDate(today)) handleDayClick(today);
                    }}
                    disabled={isDisabledDate(today)}
                    className="text-sm hover:underline disabled:text-[#D9D9D9] disabled:no-underline"
                    style={{ color: accentColor }}
                  >
                    Today
                  </button>
                </div>
              )}
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
DatePickerBase.displayName = 'DatePickerBase';

const ControlledDatePicker: React.FC<
  DatePickerProps & { control: NonNullable<DatePickerProps['control']>; name: string }
> = ({ control, name, error: errorProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <DatePickerBase
      {...rest}
      value={field.value}
      onChange={(date, dateString) => {
        field.onChange(date);
        rest.onChange?.(date, dateString);
      }}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ control, name, ...props }, ref) => {
    if (control && name) {
      return <ControlledDatePicker control={control} name={name} {...props} />;
    }
    return <DatePickerBase ref={ref} name={name} {...props} />;
  }
);
DatePicker.displayName = 'DatePicker';
