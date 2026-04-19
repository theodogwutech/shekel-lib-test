import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface TabsComponentProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  className?: string;
  tabBarClassName?: string;
  contentClassName?: string;
  accentColor?: string;
  borderColor?: string;
  animated?: boolean;
}

export const TabsComponent: React.FC<TabsComponentProps> = ({
  items,
  defaultActiveKey,
  activeKey: controlledKey,
  onChange,
  className = '',
  tabBarClassName = '',
  contentClassName = '',
  accentColor = '#EC615B',
  borderColor = '#E6E6E6',
  animated = true,
}) => {
  const firstKey = items[0]?.key;
  const [innerKey, setInnerKey] = useState<string>(defaultActiveKey ?? firstKey ?? '');
  const active = controlledKey ?? innerKey;
  const prevActiveRef = useRef<string>(active);

  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [inkStyle, setInkStyle] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });
  const [slideDir, setSlideDir] = useState<'right' | 'left' | null>(null);

  const measureInk = () => {
    const el = tabRefs.current[active];
    const bar = tabBarRef.current;
    if (!el || !bar) return;
    const barRect = bar.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setInkStyle({
      left: elRect.left - barRect.left,
      width: elRect.width,
      ready: true,
    });
  };

  useLayoutEffect(() => {
    measureInk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items.length]);

  useEffect(() => {
    const handleResize = () => measureInk();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const prev = prevActiveRef.current;
    if (prev === active) return;
    const prevIdx = items.findIndex((i) => i.key === prev);
    const nextIdx = items.findIndex((i) => i.key === active);
    setSlideDir(nextIdx > prevIdx ? 'right' : 'left');
    prevActiveRef.current = active;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleSelect = (key: string, disabled?: boolean) => {
    if (disabled) return;
    if (controlledKey === undefined) setInnerKey(key);
    onChange?.(key);
  };

  const activeItem = items.find((i) => i.key === active);

  return (
    <div className={className}>
      <style>{`
        @keyframes shekel-tab-slide-in-right { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes shekel-tab-slide-in-left { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes shekel-tab-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .shekel-tab-panel-right { animation: shekel-tab-slide-in-right 220ms cubic-bezier(0.23, 1, 0.32, 1); }
        .shekel-tab-panel-left { animation: shekel-tab-slide-in-left 220ms cubic-bezier(0.23, 1, 0.32, 1); }
        .shekel-tab-panel-fade { animation: shekel-tab-fade-in 220ms ease-out; }
      `}</style>
      <style>{`
        .shekel-tabs-bar::-webkit-scrollbar { display: none; }
        .shekel-tabs-bar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
      <div
        ref={tabBarRef}
        role="tablist"
        className={`shekel-tabs-bar relative flex items-stretch gap-6 overflow-x-auto overflow-y-hidden flex-nowrap ${tabBarClassName}`}
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              ref={(el) => {
                tabRefs.current[item.key] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => handleSelect(item.key, item.disabled)}
              className="shrink-0 whitespace-nowrap relative text-sm font-medium transition-colors duration-200 bg-transparent outline-none"
              style={{
                padding: '10px 0',
                color: item.disabled ? '#BFBFBF' : isActive ? accentColor : '#181918',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!item.disabled && !isActive) e.currentTarget.style.color = accentColor;
              }}
              onMouseLeave={(e) => {
                if (!item.disabled && !isActive) e.currentTarget.style.color = '#181918';
              }}
            >
              {item.label}
            </button>
          );
        })}
        <span
          aria-hidden
          className="absolute bottom-0"
          style={{
            left: 0,
            transform: `translateX(${inkStyle.left}px)`,
            width: inkStyle.width,
            height: 2,
            backgroundColor: accentColor,
            borderRadius: 2,
            transition: inkStyle.ready && animated
              ? 'transform 280ms cubic-bezier(0.645, 0.045, 0.355, 1), width 280ms cubic-bezier(0.645, 0.045, 0.355, 1)'
              : 'none',
            opacity: inkStyle.ready ? 1 : 0,
          }}
        />
      </div>
      <div
        role="tabpanel"
        key={active}
        className={`pt-4 ${
          animated
            ? slideDir === 'right'
              ? 'shekel-tab-panel-right'
              : slideDir === 'left'
                ? 'shekel-tab-panel-left'
                : 'shekel-tab-panel-fade'
            : ''
        } ${contentClassName}`}
      >
        {activeItem?.children}
      </div>
    </div>
  );
};
