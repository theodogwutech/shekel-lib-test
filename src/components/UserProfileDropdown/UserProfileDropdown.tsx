import React, { useState, useRef, useEffect } from 'react';
import { Avatar } from '../_Avatar';

export interface UserProfileMenuItem {
  key: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
  type?: 'divider';
  onClick?: () => void;
}

export interface UserProfileDropdownProps {
  name: string;
  role?: string;
  avatarUrl?: string;
  menuItems?: UserProfileMenuItem[];
  onMenuClick?: (key: string) => void;
  className?: string;
  width?: string | number;
  bgColor?: string;
  hoverBgColor?: string;
}

const DEFAULT_MENU: UserProfileMenuItem[] = [
  { key: 'profile', label: 'My Profile' },
  { key: 'settings', label: 'Settings' },
  { key: '__div', type: 'divider' },
  { key: 'logout', label: 'Logout', danger: true },
];

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  name,
  role,
  avatarUrl,
  menuItems = DEFAULT_MENU,
  onMenuClick,
  className = '',
  width,
  bgColor = '#EEEEEE',
  hoverBgColor = '#E5E5E5',
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  const handleItemClick = (item: UserProfileMenuItem) => {
    if (item.disabled) return;
    item.onClick?.();
    onMenuClick?.(item.key);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative inline-block ${className}`} style={{ width }}>
      <style>{`
        @keyframes shekel-profile-in { from { opacity: 0; transform: scaleY(0.9) translateY(-4px); } to { opacity: 1; transform: scaleY(1) translateY(0); } }
        .shekel-profile-menu { transform-origin: top right; animation: shekel-profile-in 180ms cubic-bezier(0.23, 1, 0.32, 1); }
      `}</style>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-full border border-[#E6E6E6] transition-colors"
        style={{
          padding: '5px',
          backgroundColor: open ? hoverBgColor : bgColor,
          width: width ? '100%' : undefined,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBgColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = open ? hoverBgColor : bgColor)}
      >
        <Avatar
          src={avatarUrl}
          name={name}
          size={30}
          bgColor="#EC615B"
          textColor="#FFFFFF"
          style={{
            background: 'linear-gradient(135deg, #EC615B 0%, #F59E95 100%)',
          }}
        />
        <div className="flex flex-col min-w-0 text-left">
          <span className="text-sm font-bold text-[#000] truncate leading-tight">{name}</span>
          {role && <span className="text-xs text-[#666] truncate leading-tight">{role}</span>}
        </div>
        <svg
          className={`ml-auto transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="shekel-profile-menu absolute right-0 top-full mt-2 z-50 bg-white rounded-lg overflow-hidden"
          style={{
            minWidth: 180,
            maxWidth: 'calc(100vw - 16px)',
            boxShadow:
              '0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)',
            padding: 4,
          }}
        >
          {menuItems.map((item) =>
            item.type === 'divider' || item.divider ? (
              <div key={item.key} className="h-px bg-[#F0F0F0] my-1" />
            ) : (
              <button
                key={item.key}
                type="button"
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  item.disabled
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-[rgba(0,0,0,0.04)]'
                }`}
                style={{
                  color: item.danger ? '#C21919' : '#181918',
                }}
              >
                {item.icon && <span className="shrink-0 flex items-center">{item.icon}</span>}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};
