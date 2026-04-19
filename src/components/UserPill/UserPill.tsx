import React from 'react';
import { Avatar } from '../_Avatar';

export interface UserPillProps {
  name: string;
  subtitle?: string;
  avatar?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  bgColor?: string;
  onClick?: () => void;
}

const SIZE_MAP = {
  small: { avatar: 24, name: 12, subtitle: 10, padding: '4px 10px 4px 4px', gap: 6 },
  medium: { avatar: 30, name: 14, subtitle: 12, padding: '5px 12px 5px 5px', gap: 8 },
  large: { avatar: 36, name: 16, subtitle: 13, padding: '6px 14px 6px 6px', gap: 10 },
};

export const UserPill: React.FC<UserPillProps> = ({
  name,
  subtitle,
  avatar,
  className = '',
  size = 'medium',
  bgColor = '#E6E6E6',
  onClick,
}) => {
  const s = SIZE_MAP[size];
  const clickable = !!onClick;
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center rounded-full transition-colors ${
        clickable ? 'cursor-pointer hover:opacity-90' : ''
      } ${className}`}
      style={{ backgroundColor: bgColor, padding: s.padding, gap: s.gap }}
    >
      <Avatar src={avatar} name={name} size={s.avatar} bgColor="#6B7280" textColor="#FFFFFF" />
      <div className="flex flex-col min-w-0">
        <span
          className="text-[#181918] truncate"
          style={{ fontSize: s.name, lineHeight: 1.2, fontWeight: 600 }}
        >
          {name}
        </span>
        {subtitle && (
          <span
            className="text-[#181918] truncate"
            style={{ fontSize: s.subtitle, lineHeight: 1.2, marginTop: 2 }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserPill;
