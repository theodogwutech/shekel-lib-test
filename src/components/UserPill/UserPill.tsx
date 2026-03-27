import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export interface UserPillProps {
  name: string;
  subtitle?: string;
  avatar?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const UserPill: React.FC<UserPillProps> = ({
  name,
  subtitle,
  avatar,
  className = '',
}) => {
  const avatarSize = 30;

  return (
    <div
      className={`flex items-center ${className}`}
      style={{
        backgroundColor: '#E6E6E6',
        borderRadius: '40px',
        padding: '5px 12px 5px 5px',
        height: '40px',
        gap: '8px',
      }}
    >
      {avatar ? (
        <Avatar src={avatar} size={avatarSize} />
      ) : (
        <Avatar icon={<UserOutlined />} size={avatarSize} style={{ backgroundColor: '#6B7280' }} />
      )}
      <div className="flex flex-col">
        <span
          style={{
            color: '#181918',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '1.2',
          }}
        >
          {name}
        </span>
        {subtitle && (
          <span
            style={{
              color: '#181918',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '1.2',
              marginTop: '2px',
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
