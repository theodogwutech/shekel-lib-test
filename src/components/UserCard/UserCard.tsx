import React from 'react';
import { Avatar } from 'antd';
import cardBorderSvg from '../../assets/card-border.svg';

export interface UserCardProps {
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  className?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  role,
  avatar,
  className = '',
}) => {
  return (
    <div
      style={{
        boxShadow: '0px -8px 30px rgba(236, 97, 91, 0.1)',
        borderRadius: '16px',
        background:
          'linear-gradient(to bottom, rgba(236, 97, 91, 0.05) 0%, rgba(255, 255, 255, 0) 50%)',
      }}
      className="relative min-h-[120px] pt-8 pb-4 pl-4 pr-4"
    >
      <img
        src={cardBorderSvg}
        alt="img-bg"
        style={{
          position: 'absolute',
          top: -8,
          left: 0,
          objectFit: 'cover',
        }}
      />
      <div
        className={`flex gap-4 items-center relative ${className}`}
        style={{
          position: 'relative',
        }}
      >
        {avatar ? (
          <Avatar src={avatar} size={80} />
        ) : (
          <Avatar
            size={80}
            style={{ backgroundColor: '#181918', fontSize: '32px', fontWeight: 600 }}
          >
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </Avatar>
        )}
        <div className="flex flex-col">
          <span
            style={{
              color: '#181918',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '1.3',
            }}
          >
            {name}
          </span>
          <span
            style={{
              color: '#181918',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '1.4',
              marginTop: '4px',
            }}
          >
            {email}
          </span>
          {role && (
            <span
              style={{
                color: '#181918',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '1.4',
                marginTop: '2px',
              }}
            >
              {role}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
