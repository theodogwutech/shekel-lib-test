import React from 'react';
import { UserPill } from '../../../src/components/UserPill';
import { UserCard } from '../../../src/components/UserCard';
import { UserProfileDropdown } from '../../../src/components/UserProfileDropdown';
import { Section, Example } from '../Showcase';

export const UserPillSection: React.FC = () => (
  <Section
    id="user-pill"
    title="UserPill"
    description="Compact pill showing a user's avatar, name, and optional subtitle. Good for chips in forms, chat rosters, or inline mentions."
    importStatement={`import { UserPill } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'name', type: 'string', description: 'User name (required).' },
      { name: 'subtitle', type: 'string', description: 'Secondary line under the name.' },
      { name: 'avatar', type: 'string', description: 'Image URL. If omitted, initials (or a user glyph) are shown.' },
      { name: 'size', type: 'small | medium | large', default: 'medium', description: 'Pill size preset.' },
      { name: 'bgColor', type: 'string', default: '#E6E6E6', description: 'Pill background.' },
      { name: 'onClick', type: '() => void', description: 'Fires on click (pill becomes clickable).' },
    ]}
  >
    <Example
      title="Sizes"
      code={`<UserPill name="Benjamin Oladokun" subtitle="Global Admin" />
<UserPill name="Sarah Johnson" subtitle="Manager" size="small" />
<UserPill name="John Doe" size="large" />`}
    >
      <div className="flex flex-wrap gap-3">
        <UserPill name="Benjamin Oladokun" subtitle="Global Admin" />
        <UserPill name="Sarah Johnson" subtitle="Manager" size="small" />
        <UserPill name="John Doe" size="large" />
      </div>
    </Example>
    <Example
      title="With image avatar"
      code={`<UserPill name="Ada Lovelace" subtitle="Engineer" avatar="https://i.pravatar.cc/64?img=5" />`}
    >
      <UserPill name="Ada Lovelace" subtitle="Engineer" avatar="https://i.pravatar.cc/64?img=5" />
    </Example>
  </Section>
);

export const UserCardSection: React.FC = () => (
  <Section
    id="user-card"
    title="UserCard"
    description="Decorative user info card with a gradient top and avatar + name/email/role. Fits well in account pages and settings."
    importStatement={`import { UserCard } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'name', type: 'string', description: 'User name (required).' },
      { name: 'email', type: 'string', description: 'Email (required).' },
      { name: 'role', type: 'string', description: 'Optional third line (e.g. job title).' },
      { name: 'avatar', type: 'string', description: 'Image URL. Initials fallback.' },
      { name: 'avatarBgColor / avatarTextColor', type: 'string', description: 'Initials avatar colors.' },
    ]}
  >
    <Example
      title="Basic"
      code={`<UserCard name="Benjamin Oladokun" email="benjamin@shekel.africa" role="Global Admin" />`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UserCard name="Benjamin Oladokun" email="benjamin@shekel.africa" role="Global Admin" />
        <UserCard name="Sarah Johnson" email="sarah@shekel.africa" role="Manager" />
      </div>
    </Example>
  </Section>
);

export const UserProfileDropdownSection: React.FC = () => (
  <Section
    id="user-profile-dropdown"
    title="UserProfileDropdown"
    description="Trigger pill with avatar + name + chevron, opens a floating menu on click. Used in header nav for the signed-in user."
    importStatement={`import { UserProfileDropdown } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'name', type: 'string', description: 'User name (required).' },
      { name: 'role', type: 'string', description: 'Second line under the name.' },
      { name: 'avatarUrl', type: 'string', description: 'Image URL; otherwise initials are rendered.' },
      { name: 'menuItems', type: '{ key, label, icon?, danger?, disabled?, type?: "divider", onClick? }[]', description: 'Menu items (supports dividers and danger items).' },
      { name: 'onMenuClick', type: '(key: string) => void', description: 'Fires with the clicked item key.' },
      { name: 'bgColor / hoverBgColor', type: 'string', description: 'Trigger background colors.' },
    ]}
  >
    <Example
      title="Default menu"
      code={`<UserProfileDropdown name="Benjamin Oladokun" role="Global Admin" />`}
    >
      <UserProfileDropdown name="Benjamin Oladokun" role="Global Admin" />
    </Example>
    <Example
      title="Custom menu"
      code={`<UserProfileDropdown
  name="Benjamin Oladokun"
  role="Global Admin"
  menuItems={[
    { key: '1', label: 'Profile Settings', onClick: () => console.log('profile') },
    { key: '2', label: 'Account Settings' },
    { key: '3', label: 'Security' },
    { key: 'div', type: 'divider' },
    { key: '4', label: 'Logout', danger: true },
  ]}
/>`}
    >
      <UserProfileDropdown
        name="Benjamin Oladokun"
        role="Global Admin"
        menuItems={[
          { key: '1', label: 'Profile Settings', onClick: () => {} },
          { key: '2', label: 'Account Settings' },
          { key: '3', label: 'Security' },
          { key: 'div', type: 'divider' },
          { key: '4', label: 'Logout', danger: true },
        ]}
      />
    </Example>
  </Section>
);
