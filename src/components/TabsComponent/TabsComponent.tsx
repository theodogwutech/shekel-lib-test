import React from 'react';
import { Tabs } from 'antd';

export interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
}

export interface TabsComponentProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  className?: string;
}

export const TabsComponent: React.FC<TabsComponentProps> = ({
  items,
  defaultActiveKey,
  activeKey,
  onChange,
  className = '',
}) => {
  return (
    <div className={className}>
      <style>
        {`
          .custom-tabs .ant-tabs-nav {
            margin-bottom: 0 !important;
          }

          .custom-tabs .ant-tabs-nav::before {
            border-bottom: 1px solid #E6E6E6 !important;
          }

          .custom-tabs .ant-tabs-tab {
            padding: 10px 0 !important;
            margin-right: 20px !important;
            color: #181918 !important;
            font-size: 14px !important;
            font-weight: 400 !important;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
          }

          .custom-tabs .ant-tabs-tab:hover {
            color: #EC615B !important;
          }

          .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #EC615B !important;
            font-weight: 400 !important;
          }

          .custom-tabs .ant-tabs-ink-bar {
            background: #EC615B !important;
            height: 2px !important;
          }

          .custom-tabs .ant-tabs-tab-btn {
            transition: color 0.3s ease !important;
          }

          .custom-tabs .ant-tabs-content-holder {
            padding-top: 16px;
          }
        `}
      </style>
      <Tabs
        className="custom-tabs"
        items={items}
        defaultActiveKey={defaultActiveKey}
        activeKey={activeKey}
        onChange={onChange}
      />
    </div>
  );
};
