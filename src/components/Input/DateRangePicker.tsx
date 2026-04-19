import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { hexWithAlpha, ErrorIcon } from './_theme';

export type DateRangeInput = Date | string | number | null | undefined;

export interface DateRangeValue {
  from: Date | null;
  to: Date | null;
}

export interface DateRangePickerProps {
  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelExtra?: React.ReactNode;
  requiredMark?: React.ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;

  value?: [DateRangeInput, DateRangeInput];
  defaultValue?: [DateRangeInput, DateRangeInput];
  onChange?: (range: [Date | null, Date | null], rangeString: [string, string]) => void;

  placeholder?: [string, string];
  format?: string;
  separator?: React.ReactNode;

  minDate?: DateRangeInput;
  maxDate?: DateRangeInput;
  disabledDate?: (date: Date) => boolean;

  allowClear?: boolean;
  firstDayOfWeek?: 0 | 1;

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
  rangeBgColor?: string;
  rangeTextColor?: string;
  singlePanel?: boolean;
  presets?: Array<{ label: React.ReactNode; value: [Date | string, Date | string] }>;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_NAMES_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAY_NAMES_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const toDate = (v: DateRangeInput): Date | null => {
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
const isBetween = (d: Date, a: Date, b: Date) => {
  const t = startOfDay(d).getTime();
  const s = Math.min(a.getTime(), b.getTime());
  const e = Math.max(a.getTime(), b.getTime());
  return t > s && t < e;
};

const CalendarIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.5 8.33464H2.5M13.3333 1.66797V5.0013M6.66667 1.66797V5.0013M6.5 18.3346H13.5C14.9001 18.3346 15.6002 18.3346 16.135 18.0622C16.6054 17.8225 16.9878 17.44 17.2275 16.9696C17.5 16.4348 17.5 15.7348 17.5 14.3346V7.33464C17.5 5.9345 17.5 5.23444 17.2275 4.69966C16.9878 4.22925 16.6054 3.8468 16.135 3.60712C15.6002 3.33464 14.9001 3.33464 13.5 3.33464H6.5C5.09987 3.33464 4.3998 3.33464 3.86502 3.60712C3.39462 3.8468 3.01217 4.22925 2.77248 4.69966C2.5 5.23444 2.5 5.9345 2.5 7.33464V14.3346C2.5 15.7348 2.5 16.4348 2.77248 16.9696C3.01217 17.44 3.39462 17.8225 3.86502 18.0622C4.3998 18.3346 5.09987 18.3346 6.5 18.3346Z"
      stroke="#181918"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ClearX: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="currentColor" />
    <path d="M4 4l4 4M8 4l-4 4" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const Arrow: React.FC<{ dir: 'left' | 'right'; double?: boolean }> = ({ dir, double }) => {
  const single = dir === 'left' ? 'M9 3l-4 4 4 4' : 'M5 3l4 4-4 4';
  const dbl = dir === 'left' ? 'M11 3l-4 4 4 4M6 3L2 7l4 4' : 'M3 3l4 4-4 4M8 3l4 4-4 4';
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d={double ? dbl : single} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

interface CalendarPaneProps {
  viewDate: Date;
  from: Date | null;
  to: Date | null;
  hoverDate: Date | null;
  onHoverDate: (d: Date | null) => void;
  onDayClick: (d: Date) => void;
  isDisabledDate: (d: Date) => boolean;
  firstDayOfWeek: 0 | 1;
  showLeftArrows: boolean;
  showRightArrows: boolean;
  onShiftMonth: (delta: number) => void;
  onShiftYear: (delta: number) => void;
  accentColor: string;
  rangeBgColor: string;
  rangeTextColor: string;
}

const CalendarPane: React.FC<CalendarPaneProps> = ({
  viewDate,
  from,
  to,
  hoverDate,
  onHoverDate,
  onDayClick,
  isDisabledDate,
  firstDayOfWeek,
  showLeftArrows,
  showRightArrows,
  onShiftMonth,
  onShiftYear,
  accentColor,
  rangeBgColor,
  rangeTextColor,
}) => {
  const dayNames = firstDayOfWeek === 1 ? DAY_NAMES_MON : DAY_NAMES_SUN;
  const today = useMemo(() => startOfDay(new Date()), []);

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
      const last = cells[cells.length - 1].date;
      const n = new Date(last);
      n.setDate(n.getDate() + 1);
      cells.push({ date: n, outside: true });
    }
    return cells;
  }, [viewDate, firstDayOfWeek]);

  const activeRangeEnd = to ?? hoverDate;
  const rangeLo =
    from && activeRangeEnd
      ? from.getTime() <= activeRangeEnd.getTime()
        ? from
        : activeRangeEnd
      : null;
  const rangeHi =
    from && activeRangeEnd
      ? from.getTime() <= activeRangeEnd.getTime()
        ? activeRangeEnd
        : from
      : null;

  return (
    <div style={{ width: 280 }}>
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-1" style={{ minWidth: 64 }}>
          {showLeftArrows && (
            <>
              <button
                type="button"
                onClick={() => onShiftYear(-1)}
                className="w-7 h-7 flex items-center justify-center text-[#595959] rounded"
                style={{ color: undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                aria-label="Previous year"
              >
                <Arrow dir="left" double />
              </button>
              <button
                type="button"
                onClick={() => onShiftMonth(-1)}
                className="w-7 h-7 flex items-center justify-center text-[#595959] rounded"
                style={{ color: undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                aria-label="Previous month"
              >
                <Arrow dir="left" />
              </button>
            </>
          )}
        </div>
        <div className="text-sm font-medium text-[#181918]">
          {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
        </div>
        <div className="flex items-center gap-1 justify-end" style={{ minWidth: 64 }}>
          {showRightArrows && (
            <>
              <button
                type="button"
                onClick={() => onShiftMonth(1)}
                className="w-7 h-7 flex items-center justify-center text-[#595959] rounded"
                style={{ color: undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                aria-label="Next month"
              >
                <Arrow dir="right" />
              </button>
              <button
                type="button"
                onClick={() => onShiftYear(1)}
                className="w-7 h-7 flex items-center justify-center text-[#595959] rounded"
                style={{ color: undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                aria-label="Next year"
              >
                <Arrow dir="right" double />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-7 px-1 pt-2 pb-1">
        {dayNames.map((d) => (
          <div key={d} className="text-xs text-[#8C8C8C] text-center py-1" style={{ height: 28 }}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 px-1" onMouseLeave={() => onHoverDate(null)}>
        {calendarGrid.map(({ date, outside }, i) => {
          const isFrom = !!(from && isSameDay(date, from));
          const isTo = !!(to && isSameDay(date, to));
          const inRange =
            rangeLo && rangeHi && !isSameDay(rangeLo, rangeHi)
              ? isBetween(date, rangeLo, rangeHi)
              : false;
          const isEdgeLo = rangeLo && isSameDay(date, rangeLo);
          const isEdgeHi = rangeHi && isSameDay(date, rangeHi);
          const selected = isFrom || isTo;
          const isToday = isSameDay(date, today);
          const disabledDay = isDisabledDate(date);

          return (
            <button
              key={i}
              type="button"
              disabled={disabledDay}
              onClick={() => onDayClick(date)}
              onMouseEnter={() => !disabledDay && onHoverDate(date)}
              className="flex items-center justify-center text-sm"
              style={{
                height: 32,
                backgroundColor: inRange ? rangeBgColor : undefined,
                borderTopLeftRadius: isEdgeLo ? 999 : inRange ? 0 : 999,
                borderBottomLeftRadius: isEdgeLo ? 999 : inRange ? 0 : 999,
                borderTopRightRadius: isEdgeHi ? 999 : inRange ? 0 : 999,
                borderBottomRightRadius: isEdgeHi ? 999 : inRange ? 0 : 999,
              }}
            >
              <span
                className="flex items-center justify-center rounded-full transition-colors"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: selected ? accentColor : undefined,
                  color: selected
                    ? '#FFFFFF'
                    : disabledDay
                      ? '#D9D9D9'
                      : outside
                        ? '#BFBFBF'
                        : inRange
                          ? rangeTextColor
                          : '#181918',
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
    </div>
  );
};

const DateRangePickerBase = React.forwardRef<HTMLDivElement, Omit<DateRangePickerProps, 'control'>>(
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
      placeholder = ['Start date', 'End date'],
      format = 'YYYY-MM-DD',
      separator,
      minDate,
      maxDate,
      disabledDate,
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
      rangeBgColor,
      rangeTextColor,
      singlePanel = false,
      presets,
    } = props;
    const resolvedRangeBg = rangeBgColor ?? hexWithAlpha(accentColor, 0.12);
    const resolvedRangeText = rangeTextColor ?? accentColor;

    const [isNarrow, setIsNarrow] = useState<boolean>(
      typeof window !== 'undefined' ? window.innerWidth < 640 : false
    );
    useEffect(() => {
      const handler = () => setIsNarrow(window.innerWidth < 640);
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    }, []);
    const effectiveSinglePanel = singlePanel || isNarrow;

    const isControlled = externalValue !== undefined;
    const [innerValue, setInnerValue] = useState<[Date | null, Date | null]>(() => [
      toDate(defaultValue?.[0]),
      toDate(defaultValue?.[1]),
    ]);
    const resolved: [Date | null, Date | null] = isControlled
      ? [toDate(externalValue![0]), toDate(externalValue![1])]
      : innerValue;
    const [from, to] = resolved;

    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [activeSlot, setActiveSlot] = useState<'from' | 'to'>('from');
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [viewDate, setViewDate] = useState<Date>(from ?? new Date());

    const reactId = React.useId();
    const inputId = id ?? reactId;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelPos, setPanelPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const updatePanelPos = () => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
      const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
      const panelWidth = effectiveSinglePanel ? 296 : 580;
      let left = r.left;
      if (left + panelWidth + 8 > vw) left = Math.max(8, vw - panelWidth - 8);
      setPanelPos({ top: r.bottom + 4, left });
    };

    const isError = !!error || status === 'error';
    const hasValue = !!from || !!to;
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
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        const insideWrapper = wrapperRef.current?.contains(target);
        const insidePanel = panelRef.current?.contains(target);
        if (!insideWrapper && !insidePanel) {
          if (open) {
            setOpen(false);
            onOpenChange?.(false);
            setHoverDate(null);
          }
        }
      };
      if (open) document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onOpenChange]);

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, effectiveSinglePanel]);

    const commit = (f: Date | null, t: Date | null) => {
      if (!isControlled) setInnerValue([f, t]);
      onChange?.(
        [f, t],
        [f ? formatDate(f, format) : '', t ? formatDate(t, format) : '']
      );
    };

    const handleDayClick = (d: Date) => {
      if (isDisabledDate(d)) return;
      if (activeSlot === 'from' || !from) {
        commit(d, null);
        setActiveSlot('to');
        setHoverDate(null);
      } else {
        // Ensure from <= to; swap if needed
        if (d.getTime() < from.getTime()) {
          commit(d, from);
        } else {
          commit(from, d);
        }
        setActiveSlot('from');
        setOpen(false);
        onOpenChange?.(false);
        setHoverDate(null);
      }
    };

    const handleToggle = (slot?: 'from' | 'to') => {
      if (disabled) return;
      if (slot) setActiveSlot(slot);
      const next = !open;
      setOpen(next);
      onOpenChange?.(next);
      if (next && (from || to)) setViewDate(from ?? to ?? new Date());
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      commit(null, null);
      setActiveSlot('from');
    };

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

    const fromText = from ? formatDate(from, format) : '';
    const toText = to ? formatDate(to, format) : '';

    const defaultSeparator = (
      <span className="mx-2 text-[#8C8C8C] flex items-center">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );

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
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
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
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                disabled={disabled}
                onClick={() => handleToggle('from')}
                className={`w-full text-left text-sm truncate ${
                  fromText ? 'text-[#181918]' : 'text-[#8C8C8C]'
                }`}
              >
                {fromText || placeholder[0]}
              </button>
              {open && activeSlot === 'from' && (
                <div className="absolute left-0 right-2 bottom-[-6px] h-[2px] transition-all" style={{ backgroundColor: accentColor }} />
              )}
            </div>
            {separator === undefined ? defaultSeparator : separator}
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                disabled={disabled}
                onClick={() => handleToggle('to')}
                className={`w-full text-left text-sm truncate ${
                  toText ? 'text-[#181918]' : 'text-[#8C8C8C]'
                }`}
              >
                {toText || placeholder[1]}
              </button>
              {open && activeSlot === 'to' && (
                <div className="absolute left-0 right-2 bottom-[-6px] h-[2px] transition-all" style={{ backgroundColor: accentColor }} />
              )}
            </div>
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
                @keyframes shekel-range-in { from { opacity: 0; transform: scaleY(0.9) translateY(-4px); } to { opacity: 1; transform: scaleY(1) translateY(0); } }
                .shekel-range-anim { transform-origin: top center; animation: shekel-range-in 180ms cubic-bezier(0.23, 1, 0.32, 1); }
              `}</style>
            <div
              ref={panelRef}
              className={`fixed z-[1000] bg-white flex shekel-range-anim ${popupClassName}`}
              style={{
                top: panelPos.top,
                left: panelPos.left,
                maxWidth: 'calc(100vw - 16px)',
                borderRadius: 8,
                boxShadow:
                  '0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)',
                padding: 8,
              }}
            >
              {presets && presets.length > 0 && (
                <div
                  className="flex flex-col py-1 pr-2 mr-2 border-r border-[#F0F0F0]"
                  style={{ minWidth: 120 }}
                >
                  {presets.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const f = toDate(preset.value[0]);
                        const t = toDate(preset.value[1]);
                        commit(f, t);
                        setOpen(false);
                        onOpenChange?.(false);
                      }}
                      className="text-left px-3 py-1.5 text-sm text-[#181918] rounded hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}
              <CalendarPane
                viewDate={viewDate}
                from={from}
                to={to}
                hoverDate={hoverDate}
                onHoverDate={setHoverDate}
                onDayClick={handleDayClick}
                isDisabledDate={isDisabledDate}
                firstDayOfWeek={firstDayOfWeek}
                showLeftArrows
                showRightArrows={effectiveSinglePanel}
                onShiftMonth={(delta) =>
                  setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1))
                }
                onShiftYear={(delta) =>
                  setViewDate(new Date(viewDate.getFullYear() + delta, viewDate.getMonth(), 1))
                }
                accentColor={accentColor}
                rangeBgColor={resolvedRangeBg}
                rangeTextColor={resolvedRangeText}
              />
              {!effectiveSinglePanel && (
                <>
                  <div className="w-px bg-[#F0F0F0] mx-2" />
                  <CalendarPane
                    viewDate={new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)}
                    from={from}
                    to={to}
                    hoverDate={hoverDate}
                    onHoverDate={setHoverDate}
                    onDayClick={handleDayClick}
                    isDisabledDate={isDisabledDate}
                    firstDayOfWeek={firstDayOfWeek}
                    showLeftArrows={false}
                    showRightArrows
                    onShiftMonth={(delta) =>
                      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1))
                    }
                    onShiftYear={(delta) =>
                      setViewDate(new Date(viewDate.getFullYear() + delta, viewDate.getMonth(), 1))
                    }
                    accentColor={accentColor}
                    rangeBgColor={resolvedRangeBg}
                    rangeTextColor={resolvedRangeText}
                  />
                </>
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
DateRangePickerBase.displayName = 'DateRangePickerBase';

const ControlledDateRangePicker: React.FC<
  DateRangePickerProps & { control: NonNullable<DateRangePickerProps['control']>; name: string }
> = ({ control, name, error: errorProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <DateRangePickerBase
      {...rest}
      value={field.value}
      onChange={(range, strRange) => {
        field.onChange(range);
        rest.onChange?.(range, strRange);
      }}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  ({ control, name, ...props }, ref) => {
    if (control && name) {
      return <ControlledDateRangePicker control={control} name={name} {...props} />;
    }
    return <DateRangePickerBase ref={ref} name={name} {...props} />;
  }
);
DateRangePicker.displayName = 'DateRangePicker';
