import React from 'react';
import { Avatar } from '../_Avatar';
import cardBorderSvg from '../../assets/card-border.svg';

export interface UserCardProps {
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  className?: string;
  avatarBgColor?: string;
  avatarTextColor?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  role,
  avatar,
  className = '',
  avatarBgColor = '#181918',
  avatarTextColor = '#FFFFFF',
}) => {
  return (
    <div
      style={{
        boxShadow: '0px -8px 30px rgba(236, 97, 91, 0.1)',
        borderRadius: '16px',
        background:
          'linear-gradient(to bottom, rgba(236, 97, 91, 0.05) 0%, rgba(255, 255, 255, 0) 50%)',
      }}
      className={`relative min-h-[120px] pt-8 pb-4 px-4 ${className}`}
    >
      <img
        src={cardBorderSvg}
        alt=""
        aria-hidden
        style={{ position: 'absolute', top: -8, left: 0, objectFit: 'cover' }}
      />
      <div className="flex gap-4 items-center relative">
        <Avatar
          src={avatar}
          name={name}
          size={80}
          bgColor={avatarBgColor}
          textColor={avatarTextColor}
        />
        <div className="flex flex-col min-w-0">
          <span
            className="text-[#181918]"
            style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}
          >
            {name}
          </span>
          <span
            className="text-[#181918]"
            style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.4, marginTop: 4 }}
          >
            {email}
          </span>
          {role && (
            <span
              className="text-[#181918]"
              style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.4, marginTop: 2 }}
            >
              {role}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
