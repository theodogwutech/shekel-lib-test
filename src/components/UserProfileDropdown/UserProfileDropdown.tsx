import React from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

export interface UserProfileDropdownProps {
  name: string;
  role?: string;
  avatarUrl?: string;
  menuItems?: MenuProps['items'];
  onMenuClick?: (key: string) => void;
  className?: string;
  width?: string | number;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  name,
  role,
  avatarUrl,
  menuItems,
  onMenuClick,
  className = '',
  width,
}) => {
  const defaultMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'My Profile',
    },
    {
      key: 'settings',
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (onMenuClick) {
      onMenuClick(key);
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <style>
        {`
          .user-profile-dropdown {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px;
            border-radius: 50px;
            background: #EEEEEE;
            border: 1px solid #E6E6E6;
            transition: background-color 0.2s;
          }

          .user-profile-dropdown:hover {
            background-color: #E5E5E5;
          }

          .user-profile-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            color: #FFFFFF;
            background: linear-gradient(135deg, #EC615B 0%, #F59E95 100%);
            flex-shrink: 0;
            overflow: hidden;
          }

          .user-profile-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .user-profile-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }

          .user-profile-name {
            font-weight: 700;
            font-size: 14px;
            color: #000000;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
          }

          .user-profile-role {
            font-size: 12px;
            color: #666666;
            font-weight: 400;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
          }

          .user-profile-dropdown-icon {
            color: #000000;
            flex-shrink: 0;
            transition: transform 0.2s;
            margin-left: auto;
          }

          .user-profile-dropdown[aria-expanded="true"] .user-profile-dropdown-icon {
            transform: rotate(180deg);
          }
        `}
      </style>
      <Dropdown
        menu={{
          items: menuItems || defaultMenuItems,
          onClick: handleMenuClick,
        }}
        trigger={['click']}
        placement="bottomRight"
      >
        <div
          className={`user-profile-dropdown ${className}`}
          style={{ width: typeof width === 'number' ? `${width}px` : width }}
        >
          <div className="user-profile-avatar">
            {avatarUrl ? <img src={avatarUrl} alt={name} /> : getInitials(name)}
          </div>
          <div className="user-profile-info">
            <div className="user-profile-name">{name}</div>
            {role && <div className="user-profile-role">{role}</div>}
          </div>
          <svg
            className="user-profile-dropdown-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Dropdown>
    </>
  );
};
