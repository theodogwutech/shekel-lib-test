# Component Reference - v1.0.11

Complete list of all components available in Shekel FE Shared Lib.

## 🆕 New Components (v1.0.11)

### Input Components

#### Input
Text input component with label, helper text, and error states.
```tsx
<Input
  label="Email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  error="Email is required"
/>
```

#### PasswordInput
Password input with show/hide toggle.
```tsx
<PasswordInput
  label="Password"
  placeholder="Enter password"
/>
```

#### PhoneInput
Phone number input with country selector.
```tsx
<PhoneInput
  label="Phone Number"
  defaultCountry="NG"
  placeholder="Phone number"
/>
```

#### CurrencyInput
Currency input with automatic formatting.
```tsx
<CurrencyInput
  label="Amount"
  currencySymbol="₦"
  placeholder="Enter amount"
/>
```

#### OTPInput
One-time password input.
```tsx
<OTPInput
  label="Enter OTP"
  length={6}
  onChange={(otp) => console.log(otp)}
/>
```

---

### User Components

#### UserPill
Compact user display with avatar.
```tsx
<UserPill
  name="Benjamin Oladokun"
  subtitle="Global Admin"
  avatar="/path/to/avatar.jpg"
/>
```

#### UserCard
Full user profile card.
```tsx
<UserCard
  name="Benjamin Oladokun"
  role="Global Admin"
  email="benjamin@shekel.africa"
  phone="+234 812 039 9403"
/>
```

#### UserProfileDropdown
User profile dropdown menu.
```tsx
<UserProfileDropdown
  userName="Benjamin Oladokun"
  userRole="Global Admin"
  menuItems={[
    { key: '1', label: 'Profile', onClick: () => {} },
    { key: '2', label: 'Logout', onClick: () => {}, danger: true }
  ]}
/>
```

---

### Dashboard Components

#### DashboardCard
Metric card with ledger balance and visibility toggle.
```tsx
<DashboardCard
  label="Total Balance"
  value="2,450,000"
  valuePrefix="₦"
  ledgerBalance="1,200,000"
  showVisibilityToggle
  width={348}
  icon={<CurrencyIcon />}
/>
```

#### StatCard (Enhanced)
Stat card with badge and custom colors.
```tsx
<StatCard
  label="Active Users"
  value="1,234"
  badge="New"
  iconBackgroundColor="#E8F8F0"
  iconColor="#5FB894"
  progressText="↑ 12% from last month"
  width={347}
  icon={<UsersIcon />}
/>
```

#### ActionCard
Quick action button with icon.
```tsx
<ActionCard
  label="Export Data"
  sublabel="Download your reports"
  icon={<ExportIcon />}
  onClick={() => handleExport()}
/>
```

---

### Other Components

#### NotificationDropdown
Notification list with custom icons.
```tsx
<NotificationDropdown
  count={5}
  notifications={[
    {
      id: '1',
      title: 'New Issue',
      description: 'Issue reported',
      timestamp: '2h ago',
      isNew: true,
      iconBackgroundColor: '#E8F8F0',
      iconColor: '#5FB894'
    }
  ]}
  onViewMore={() => {}}
/>
```

#### TabsComponent
Tabs with custom Ant Design styling.
```tsx
<TabsComponent
  defaultActiveKey="1"
  items={[
    {
      key: '1',
      label: 'Overview',
      children: <div>Content</div>
    },
    {
      key: '2',
      label: 'Settings',
      children: <div>Settings</div>
    }
  ]}
/>
```

#### CountrySelector
Country selection with flags.
```tsx
<CountrySelector
  defaultCountry="NG"
  showSearch
  onCountryChange={(code) => console.log(code)}
/>
```

---

## ✅ Existing Components

See [COMPONENTS_OLD.md](./COMPONENTS_OLD.md) for detailed documentation of existing components:
- Button
- Card
- Badge
- Modal
- Checkbox
- Select
- Dropdown
- Table
- TableTop
- SelectedItemsList
- Progress
- Steps

---

## ⚠️ Deprecated Components

### SearchInput
**Status:** Deprecated (use `Input` instead)
```tsx
// ❌ Old (deprecated)
<SearchInput placeholder="Search..." />

// ✅ New (recommended)
<Input placeholder="Search..." prefix={<SearchIcon />} />
```

See [DEPRECATION.md](./DEPRECATION.md) for migration guide.

---

## Quick Stats

- **Total Components:** 24
- **New in v1.0.11:** 14
- **Deprecated:** 1
- **Active:** 23

---

For detailed usage and examples, see the demo at `/demo/App.tsx`.
