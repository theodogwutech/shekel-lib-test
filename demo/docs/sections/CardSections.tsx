import React from 'react';
import { StatCard } from '../../../src/components/StatCard';
import { DashboardCard } from '../../../src/components/DashboardCard';
import { NotificationDropdown } from '../../../src/components/NotificationDropdown';
import { ActionCard } from '../../../src/components/ActionCard';
import { Section, Example } from '../Showcase';

export const StatCardSection: React.FC = () => (
  <Section
    id="stat-card"
    title="StatCard"
    description="A stat/metric card with two visual modes. The default (simple) is a clean minimal card showing just a label + value. Passing `detailed` renders the icon/badge/progress layout."
    importStatement={`import { StatCard } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'label', type: 'string', description: 'Caption shown above the value.' },
      { name: 'value', type: 'string | number', description: 'The primary metric.' },
      { name: 'valuePrefix', type: 'string', default: '₦', description: 'Prefix (e.g. currency). Pass "" to hide.' },
      { name: 'detailed', type: 'boolean', default: 'false', description: 'When true, renders the icon + badge + progress layout.' },
      { name: 'icon', type: 'ReactNode', description: 'Icon shown in detailed mode.' },
      { name: 'iconBackgroundColor', type: 'string', description: 'BG of the icon bubble (detailed mode).' },
      { name: 'iconColor', type: 'string', description: 'Icon color (detailed mode).' },
      { name: 'badge', type: 'ReactNode', description: 'Pill badge in the top-right (detailed mode).' },
      { name: 'progressText', type: 'ReactNode', description: 'Small footer text (detailed mode).' },
      { name: 'width', type: 'string | number', default: '200', description: 'Card width.' },
      { name: 'minHeight', type: 'number | string', default: '120', description: 'Minimum card height.' },
      { name: 'selected', type: 'boolean', description: 'Adds a red focus ring. Pair with onClick for interactive cards.' },
      { name: 'onClick', type: '() => void', description: 'Makes the card clickable.' },
    ]}
  >
    <Example
      title="Simple (default)"
      code={`<div className="flex flex-wrap gap-4">
  <StatCard label="All Shipment" value={0} valuePrefix="" />
  <StatCard label="In Transit" value={128} valuePrefix="" />
  <StatCard label="Delivered" value="1,204" valuePrefix="" />
</div>`}
    >
      <div className="flex flex-wrap gap-4">
        <StatCard label="All Shipment" value={0} valuePrefix="" />
        <StatCard label="In Transit" value={128} valuePrefix="" />
        <StatCard label="Delivered" value="1,204" valuePrefix="" />
      </div>
    </Example>

    <Example
      title="With currency + selected state"
      code={`<StatCard
  label="Total Revenue"
  value="2,450,000"
  valuePrefix="₦"
  selected
  onClick={() => console.log('clicked')}
/>`}
    >
      <div className="flex flex-wrap gap-4">
        <StatCard label="Total Revenue" value="2,450,000" valuePrefix="₦" />
        <StatCard label="Selected" value="325,000" valuePrefix="₦" selected onClick={() => {}} />
      </div>
    </Example>

    <Example
      title="Detailed mode (icon + badge + progress)"
      code={`<StatCard
  label="Active Users"
  value="1,234"
  valuePrefix=""
  detailed
  badge="New"
  iconBackgroundColor="#E8F8F0"
  iconColor="#5FB894"
  progressText="↑ 12% from last month"
  icon={<UsersIcon />}
/>`}
    >
      <StatCard
        label="Active Users"
        value="1,234"
        valuePrefix=""
        detailed
        badge="New"
        width={280}
        iconBackgroundColor="#E8F8F0"
        iconColor="#5FB894"
        progressText="↑ 12% from last month"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </Example>
  </Section>
);

export const DashboardCardSection: React.FC = () => (
  <Section
    id="dashboard-card"
    title="DashboardCard"
    description="Dark gradient card for headline balances or primary account info. Built-in visibility toggle (masks value with ****), optional bottom row with ledger/account info, and optional copy-to-clipboard button."
    importStatement={`import { DashboardCard } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'label', type: 'string', description: 'Caption above the value (e.g. "Available Balance").' },
      { name: 'value', type: 'string | number', description: 'The primary value.' },
      { name: 'valuePrefix', type: 'string', default: '₦', description: 'Prefix on the value.' },
      { name: 'valueFontSize', type: 'number | string', default: '32', description: 'Value font size in px (responsive via clamp).' },
      { name: 'icon', type: 'ReactNode', description: 'Icon in the top-left bubble.' },
      { name: 'topRight', type: 'ReactNode', description: 'Action/button slot (e.g. "Fund Wallet").' },
      { name: 'showVisibilityToggle', type: 'boolean', default: 'true', description: 'Adds the eye icon that masks the value.' },
      { name: 'bottomLabel', type: 'string', default: 'Ledger Balance', description: 'Label for the bottom row.' },
      { name: 'bottomValue', type: 'string | number', description: 'Bottom-row value (e.g. account number • bank name).' },
      { name: 'ledgerBalance', type: 'string | number', description: 'Legacy alias for bottomValue.' },
      { name: 'showLedgerValuePrefix', type: 'boolean', default: 'true', description: 'Pass false for non-currency bottom values.' },
      { name: 'bottomIcon', type: 'ReactNode | null', description: 'Override the default document glyph in the bottom row, or pass null to hide.' },
      { name: 'showCopyButton', type: 'boolean', default: 'false', description: 'Show the copy-to-clipboard button on the bottom row.' },
      { name: 'copyValue', type: 'string', description: 'Value written to clipboard (falls back to bottomValue).' },
      { name: 'copyIconColor', type: 'string', default: '#EC615B', description: 'Copy icon color.' },
      { name: 'width', type: 'string | number', default: '348', description: 'Card width (pass "100%" for full-width).' },
      { name: 'backgroundPattern', type: 'wave | grid | none', default: 'wave', description: 'Decorative SVG pattern behind the card.' },
      { name: 'backgroundImage', type: 'string', description: 'URL to use as background instead of the gradient.' },
    ]}
  >
    <Example
      title="Balance card with ledger"
      code={`<DashboardCard
  label="Total Balance"
  value="2,450,000"
  valuePrefix="₦"
  ledgerBalance="1,200,000"
  showVisibilityToggle
  width="100%"
/>`}
    >
      <DashboardCard
        label="Total Balance"
        value="2,450,000"
        valuePrefix="₦"
        ledgerBalance="1,200,000"
        showVisibilityToggle
        width={348}
      />
    </Example>

    <Example
      title="Account info card with copy"
      code={`<DashboardCard
  label="Available Balance"
  value="30,281,291.00"
  valuePrefix="₦"
  valueFontSize={20}
  bottomLabel=""
  bottomValue="9999045041 • Providus Bank"
  showLedgerValuePrefix={false}
  bottomIcon={null}
  showCopyButton
  copyValue="9999045041"
  onCopy={(v) => console.log('Copied:', v)}
  width="100%"
/>`}
    >
      <DashboardCard
        label="Available Balance"
        value="30,281,291.00"
        valuePrefix="₦"
        valueFontSize={20}
        bottomLabel=""
        bottomValue="9999045041 • Providus Bank"
        showLedgerValuePrefix={false}
        bottomIcon={null}
        showCopyButton
        copyValue="9999045041"
        onCopy={() => {}}
        width={348}
      />
    </Example>
  </Section>
);

export const NotificationDropdownSection: React.FC = () => (
  <Section
    id="notification-dropdown"
    title="NotificationDropdown"
    description="Bell-icon trigger with a count badge and a dropdown panel that lists notifications. Empty state is handled automatically."
    importStatement={`import { NotificationDropdown } from 'shekel-fe-shared-lib';
// NotificationItem is also exported for typing the array`}
    props={[
      { name: 'title', type: 'string', default: 'Notifications', description: 'Panel header.' },
      { name: 'count', type: 'number', description: 'Badge number over the bell.' },
      { name: 'notifications', type: 'NotificationItem[]', description: 'Items: { id, title, description, timestamp, isNew?, icon?, iconBackgroundColor?, iconColor? }.' },
      { name: 'onViewMore', type: '() => void', description: 'Called when the user clicks the footer link.' },
      { name: 'onNotificationClick', type: '(item) => void', description: 'Fires when a row is clicked.' },
      { name: 'width', type: 'string | number', description: 'Panel width.' },
    ]}
  >
    <Example
      title="With notifications"
      code={`<NotificationDropdown
  title="Notifications"
  count={5}
  notifications={[
    { id: '1', title: 'New Issue Reported', description: 'A pending issue has been raised', timestamp: '', isNew: true },
    { id: '2', title: 'Payment Received', description: '₦50,000 credited', timestamp: '2h ago' },
  ]}
  onViewMore={() => console.log('view more')}
/>`}
    >
      <NotificationDropdown
        title="Notifications"
        count={5}
        width={360}
        notifications={[
          {
            id: '1',
            title: 'New Issue Reported',
            description: 'A pending issue has been raised and sent to the admin team',
            timestamp: '',
            isNew: true,
          },
          {
            id: '2',
            title: 'Payment Received',
            description: 'Payment of ₦50,000 has been credited to your account',
            timestamp: '2h ago',
            iconBackgroundColor: '#E8F8F0',
            iconColor: '#5FB894',
          },
          {
            id: '3',
            title: 'Security Alert',
            description: 'New login detected from a different device',
            timestamp: '5h ago',
            iconBackgroundColor: '#FFF3E8',
            iconColor: '#F59E42',
          },
        ]}
        onViewMore={() => {}}
      />
    </Example>

    <Example
      title="Empty state"
      code={`<NotificationDropdown title="Notifications" count={0} notifications={[]} />`}
    >
      <NotificationDropdown title="Notifications" count={0} width={360} notifications={[]} onViewMore={() => {}} />
    </Example>
  </Section>
);

export const ActionCardSection: React.FC = () => (
  <Section
    id="action-card"
    title="ActionCard"
    description="Clickable quick-action tile — icon + label on a light rounded card. Good for dashboards with primary actions like 'Export Data', 'Create Report', etc."
    importStatement={`import { ActionCard } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'label', type: 'string', description: 'Action name.' },
      { name: 'icon', type: 'ReactNode', description: 'Icon rendered above the label.' },
      { name: 'onClick', type: '() => void', description: 'Fires on click.' },
      { name: 'disabled', type: 'boolean', description: 'Dims and prevents clicks.' },
    ]}
  >
    <Example
      title="Action tiles"
      code={`<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
  <ActionCard label="Export Data" icon={<UploadIcon />} onClick={...} />
  <ActionCard label="Import Data" icon={<DownloadIcon />} onClick={...} />
  <ActionCard label="Create Report" icon={<DocIcon />} onClick={...} />
  <ActionCard label="View Settings" icon={<GearIcon />} onClick={...} />
</div>`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
        <ActionCard
          label="Export Data"
          onClick={() => {}}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <ActionCard
          label="Import Data"
          onClick={() => {}}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <ActionCard
          label="Create Report"
          onClick={() => {}}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <ActionCard
          label="View Settings"
          onClick={() => {}}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>
    </Example>
  </Section>
);
