# Shekel FE Shared Lib

A modern React component library built with **React**, **TypeScript**, **Tailwind CSS**, and **Ant Design**. Create beautiful, responsive UIs with comprehensive input components, dashboard cards, and user interface elements.

## 🚨 Version 1.0.11 Updates

**New Components Added:**
- Input components (Input, PasswordInput, PhoneInput, CurrencyInput, OTPInput)
- User components (UserPill, UserCard, UserProfileDropdown)
- Dashboard components (DashboardCard, StatCard, ActionCard)
- NotificationDropdown, TabsComponent, CountrySelector

**⚠️ Deprecation Notice:**
- `SearchInput` is deprecated. Please use the new `Input` component instead.
- See [DEPRECATION.md](./DEPRECATION.md) for migration guide.

## Installation

```bash
npm install shekel-fe-shared-lib
```

## Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom
```

## Usage

### Import Components and Styles

```tsx
import {
  Button,
  Input,
  PasswordInput,
  StatCard,
  DashboardCard,
  UserPill,
  NotificationDropdown
} from 'shekel-fe-shared-lib';
import 'shekel-fe-shared-lib/styles.css';
import 'antd/dist/reset.css'; // Required for Ant Design components

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input label="Email" placeholder="Enter your email" />
      <PasswordInput label="Password" placeholder="Enter password" />
      <StatCard
        label="Active Users"
        value={1234}
        badge="New"
        iconBackgroundColor="#E8F8F0"
        iconColor="#5FB894"
      />
      <DashboardCard
        label="Total Balance"
        value="2,450,000"
        valuePrefix="₦"
        ledgerBalance="1,200,000"
        showVisibilityToggle
      />
      <UserPill name="John Doe" subtitle="Admin" />
    </div>
  );
}
```

### Tailwind CSS Setup

If your project uses Tailwind CSS, add this library to your `tailwind.config.js` content array:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/shekel-fe-shared-lib/dist/**/*.{js,mjs}",
  ],
  // ... rest of your config
}
```

## Components

### Button

A fully customizable button component with multiple variants, sizes, and built-in loading states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'outlined' \| 'ghost' \| 'text'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `fullWidth` | `boolean` | `false` | Whether button takes full width |
| `icon` | `React.ReactNode` | `undefined` | Icon to display with button |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of the icon |
| `loading` | `boolean` | `false` | Shows loading spinner |
| All standard button HTML attributes | - | - | Extends `HTMLButtonElement` |

#### Examples

```tsx
// Primary button
<Button variant="primary">Start Tracking</Button>

// Outlined button
<Button variant="outlined">Download Report</Button>

// Button with icon
<Button
  variant="outlined"
  icon={<MapIcon />}
  iconPosition="left"
>
  Map Intelligence
</Button>

// Loading state
<Button loading>Processing...</Button>

// Full width button
<Button fullWidth variant="primary">
  Submit
</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

---

### StatCard

An animated card component perfect for displaying statistics and metrics, like shipment counts.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | The label text for the stat |
| `value` | `string \| number` | **required** | The value to display |
| `selected` | `boolean` | `false` | Whether the card is selected |
| `onClick` | `() => void` | `undefined` | Click handler |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```tsx
// Basic stat card
<StatCard label="All Shipment" value={0} />

// Selected state
<StatCard
  label="All Shipment"
  value={0}
  selected={true}
/>

// With click handler
<StatCard
  label="Queued"
  value={5}
  onClick={() => console.log('Clicked')}
/>

// Grid of stat cards
<div className="grid grid-cols-4 gap-4">
  <StatCard label="All Shipment" value={0} selected />
  <StatCard label="Queued" value={0} />
  <StatCard label="Planned" value={0} />
  <StatCard label="On ship" value={0} />
</div>
```

---

### SearchInput

A customizable search input with icon support and built-in animations.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode \| true` | `undefined` | Icon to display (true for default search icon) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of the icon |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `fullWidth` | `boolean` | `false` | Whether input takes full width |
| `onIconClick` | `() => void` | `undefined` | Click handler for icon |
| All standard input HTML attributes | - | - | Extends `HTMLInputElement` |

#### Examples

```tsx
// Basic search input with default icon
<SearchInput
  icon={true}
  placeholder="Search a shipment"
/>

// Custom icon
<SearchInput
  icon={<CustomIcon />}
  placeholder="Search..."
/>

// Full width with icon on right
<SearchInput
  icon={true}
  iconPosition="right"
  fullWidth
  placeholder="Type to search..."
/>

// Different sizes
<SearchInput size="sm" icon={true} placeholder="Small" />
<SearchInput size="md" icon={true} placeholder="Medium" />
<SearchInput size="lg" icon={true} placeholder="Large" />
```

---

### Card

A versatile container component with customizable padding, shadows, and hover effects.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Shadow depth |
| `hover` | `boolean` | `false` | Enable hover elevation effect |
| `bordered` | `boolean` | `true` | Show border |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Border radius |
| `className` | `string` | `''` | Additional CSS classes |
| All standard div HTML attributes | - | - | Extends `HTMLDivElement` |

#### Examples

```tsx
// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Card with hover effect
<Card hover shadow="md">
  <p>Hover over me!</p>
</Card>

// No padding card
<Card padding="none">
  <img src="image.jpg" alt="Full width" />
</Card>

// Custom styling
<Card
  padding="lg"
  shadow="lg"
  rounded="xl"
  className="bg-gradient-to-r from-blue-500 to-purple-600"
>
  <p className="text-white">Gradient card</p>
</Card>
```

---

### Badge

A versatile badge component for labels, tags, and status indicators.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **required** | Badge content |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Badge color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `dot` | `boolean` | `false` | Show status dot |
| `icon` | `React.ReactNode` | `undefined` | Icon to display |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```tsx
// Basic badges
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>

// With status dot
<Badge variant="success" dot>Active</Badge>
<Badge variant="danger" dot>Offline</Badge>

// With icon
<Badge variant="primary" icon={<StarIcon />}>
  Featured
</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

---

### Checkbox

A customizable checkbox component with filled and outline variants.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Default checked state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | `undefined` | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Checkbox size |
| `variant` | `'filled' \| 'outline'` | `'filled'` | Visual variant |
| `className` | `string` | `''` | Additional CSS classes |
| `id`, `name`, `value` | `string` | `undefined` | Standard input attributes |

#### Examples

```tsx
// Basic checkbox
<Checkbox id="terms" />

// Controlled checkbox
const [checked, setChecked] = useState(false);
<Checkbox
  checked={checked}
  onChange={setChecked}
/>

// With label
<div className="flex items-center gap-2">
  <Checkbox id="accept" />
  <label htmlFor="accept">Accept terms</label>
</div>

// Outline variant
<Checkbox variant="outline" />

// Indeterminate state
<Checkbox indeterminate />

// Different sizes
<Checkbox size="sm" />
<Checkbox size="md" />
<Checkbox size="lg" />
```

---

### Modal

A flexible modal dialog component with animations and keyboard support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Controls modal visibility |
| `onClose` | `() => void` | **required** | Close handler |
| `title` | `string` | `undefined` | Modal title |
| `children` | `React.ReactNode` | **required** | Modal content |
| `footer` | `React.ReactNode` | `undefined` | Modal footer content |
| `width` | `string \| number` | `'520px'` | Modal width |
| `closable` | `boolean` | `true` | Show close button |
| `maskClosable` | `boolean` | `true` | Close on backdrop click |
| `centered` | `boolean` | `true` | Center modal vertically |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```tsx
// Basic modal
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
</Modal>

// With footer
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete Item"
  footer={
    <>
      <Button variant="outlined" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>This action cannot be undone.</p>
</Modal>

// Custom width
<Modal
  open={open}
  onClose={() => setOpen(false)}
  width="800px"
>
  <p>Wide modal content</p>
</Modal>
```

---

### Dropdown

A dropdown menu component with click and hover triggers.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DropdownMenuItem[]` | **required** | Menu items |
| `trigger` | `'click' \| 'hover'` | `'click'` | Trigger type |
| `placement` | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'` | Menu placement |
| `children` | `React.ReactNode` | **required** | Trigger element |
| `className` | `string` | `''` | Additional CSS classes |
| `overlayClassName` | `string` | `''` | Menu overlay classes |
| `disabled` | `boolean` | `false` | Disabled state |

#### Examples

```tsx
// Basic dropdown
<Dropdown
  items={[
    { key: '1', label: 'Edit', onClick: () => console.log('Edit') },
    { key: '2', label: 'Delete', danger: true, onClick: () => console.log('Delete') },
  ]}
>
  <Button>Actions</Button>
</Dropdown>

// With icons
<Dropdown
  items={[
    { key: '1', label: 'Profile', icon: <UserIcon /> },
    { key: '2', label: 'Settings', icon: <SettingsIcon /> },
    { key: '3', label: 'Logout', icon: <LogoutIcon />, danger: true },
  ]}
>
  <Button variant="outlined">Menu</Button>
</Dropdown>

// Hover trigger
<Dropdown trigger="hover" items={menuItems}>
  <span>Hover me</span>
</Dropdown>
```

---

### Select

A customizable select dropdown with search functionality.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | **required** | Select options |
| `value` | `string \| number` | `undefined` | Controlled value |
| `defaultValue` | `string \| number` | `undefined` | Default value (uncontrolled) |
| `placeholder` | `string` | `'Select an option'` | Placeholder text |
| `onChange` | `(value: string \| number) => void` | `undefined` | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Select size |
| `fullWidth` | `boolean` | `false` | Full width mode |
| `allowClear` | `boolean` | `false` | Show clear button |
| `showSearch` | `boolean` | `false` | Enable search |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```tsx
// Basic select
<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  placeholder="Choose an option"
/>

// With search
<Select
  options={countries}
  showSearch
  searchPlaceholder="Search countries..."
  placeholder="Select country"
/>

// Controlled select
const [value, setValue] = useState('');
<Select
  value={value}
  onChange={setValue}
  options={options}
  allowClear
/>
```

---

### Table

A feature-rich table component with pagination and sorting.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef[]` | **required** | Column definitions |
| `dataSource` | `T[]` | **required** | Table data |
| `rowKey` | `string \| ((record: T) => string)` | `'id'` | Unique row key |
| `pagination` | `PaginationConfig \| false` | Pagination config | Pagination settings |
| `loading` | `boolean` | `false` | Loading state |
| `onRow` | `(record: T, index: number) => HTMLAttributes` | `undefined` | Row props |
| `bordered` | `boolean` | `false` | Show borders |
| `striped` | `boolean` | `false` | Striped rows |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```tsx
// Basic table
const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age' },
  {
    key: 'status',
    title: 'Status',
    render: (_, record) => (
      <Badge variant={record.active ? 'success' : 'default'}>
        {record.active ? 'Active' : 'Inactive'}
      </Badge>
    )
  },
];

<Table
  columns={columns}
  dataSource={data}
  pagination={{ pageSize: 10 }}
/>

// With row click
<Table
  columns={columns}
  dataSource={data}
  onRow={(record) => ({
    onClick: () => console.log('Row clicked', record),
    className: 'cursor-pointer'
  })}
/>
```

---

### TableTop

A table header component with search, filters, and actions.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Table title |
| `description` | `string` | `undefined` | Table description |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `onSearch` | `(value: string) => void` | `undefined` | Search handler |
| `actions` | `React.ReactNode` | `undefined` | Action buttons |
| `filters` | `React.ReactNode` | `undefined` | Filter components |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```tsx
<TableTop
  title="Users"
  description="Manage your users"
  onSearch={handleSearch}
  actions={
    <>
      <Button variant="outlined">Export</Button>
      <Button variant="primary">Add User</Button>
    </>
  }
  filters={
    <>
      <Select options={statusOptions} placeholder="Status" />
      <Select options={roleOptions} placeholder="Role" />
    </>
  }
/>
```

---

### Steps

A step indicator component for multi-step processes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `StepItem[]` | **required** | Step items |
| `current` | `number` | `0` | Current step index |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Step size |
| `variant` | `'default' \| 'outline'` | `'default'` | Visual variant |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```tsx
// Vertical steps
<Steps
  current={1}
  items={[
    { title: 'Account', description: 'Create your account' },
    { title: 'Profile', description: 'Fill your profile' },
    { title: 'Complete', description: 'All done!' },
  ]}
/>

// Horizontal steps
<Steps
  direction="horizontal"
  current={2}
  items={[
    { title: 'Cart' },
    { title: 'Shipping' },
    { title: 'Payment' },
    { title: 'Confirm' },
  ]}
/>

// With custom status
<Steps
  items={[
    { title: 'Step 1', status: 'finish' },
    { title: 'Step 2', status: 'process' },
    { title: 'Step 3', status: 'error' },
  ]}
/>
```

---

### Progress

A progress bar component with multiple status variants.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `percent` | `number` | `0` | Progress percentage (0-100) |
| `status` | `'normal' \| 'success' \| 'exception' \| 'active'` | `'normal'` | Progress status |
| `showInfo` | `boolean` | `true` | Show percentage text |
| `strokeColor` | `string` | `undefined` | Custom bar color |
| `strokeWidth` | `number` | `undefined` | Custom bar height |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Progress size |
| `format` | `(percent: number) => ReactNode` | `undefined` | Custom format function |
| `className` | `string` | `''` | Additional CSS classes |

#### Examples

```tsx
// Basic progress
<Progress percent={60} />

// Success status
<Progress percent={100} status="success" />

// Error status
<Progress percent={45} status="exception" />

// Active animation
<Progress percent={75} status="active" />

// Custom format
<Progress
  percent={60}
  format={(percent) => `${percent}% Complete`}
/>

// Different sizes
<Progress percent={50} size="sm" />
<Progress percent={50} size="md" />
<Progress percent={50} size="lg" />
```

---

### SelectedItemsList

A list component for displaying and managing selected items.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SelectedItem[]` | **required** | Selected items |
| `onRemove` | `(id: string \| number) => void` | **required** | Remove handler |
| `emptyMessage` | `string` | `'No items selected'` | Empty state message |
| `className` | `string` | `''` | Additional CSS classes |
| `itemClassName` | `string` | `''` | Item CSS classes |
| `maxHeight` | `string` | `'300px'` | Max list height |

#### Examples

```tsx
// Basic usage
const [selectedItems, setSelectedItems] = useState([
  { id: 1, label: 'Item 1', sublabel: 'Category A' },
  { id: 2, label: 'Item 2', sublabel: 'Category B' },
]);

<SelectedItemsList
  items={selectedItems}
  onRemove={(id) => {
    setSelectedItems(items => items.filter(item => item.id !== id));
  }}
/>

// Custom styling
<SelectedItemsList
  items={selectedItems}
  onRemove={handleRemove}
  maxHeight="500px"
  emptyMessage="No files selected"
  className="my-4"
/>
```

---

## Animations

All components include built-in CSS animations:

- **StatCard**: Fade-in-up animation with count-up effect on values
- **Card**: Smooth fade-in animation
- **Button**: Active scale and smooth transitions
- **SearchInput**: Smooth focus transitions
- **Modal**: Fade and scale animations
- **Dropdown**: Slide animations
- **Progress**: Active state animation

Additional animation classes available:
- `.shimmer` - Loading shimmer effect
- `.slide-in-right` - Slide in from right animation
- `.dropdown-slide-down` - Dropdown slide down animation
- `.dropdown-slide-up` - Dropdown slide up animation

---

## TypeScript Support

This library is written in TypeScript and includes full type definitions. All component props are fully typed for the best development experience.

```tsx
import type {
  ButtonProps,
  StatCardProps,
  SearchInputProps,
  CardProps,
  BadgeProps,
  CheckboxProps,
  ModalProps,
  DropdownProps,
  DropdownMenuItem,
  SelectProps,
  SelectOption,
  TableProps,
  ColumnDef,
  PaginationConfig,
  TableTopProps,
  StepsProps,
  StepItem,
  ProgressProps,
  SelectedItemsListProps,
  SelectedItem,
} from 'shekel-fe-shared-lib';
```

---

## Development

### Build

```bash
npm run build
```

### Project Structure

```
shekel-fe-shared-lib/
├── src/
│   ├── components/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Modal.tsx
│   │   ├── Progress.tsx
│   │   ├── SearchInput.tsx
│   │   ├── Select.tsx
│   │   ├── SelectedItemsList.tsx
│   │   ├── StatCard.tsx
│   │   ├── Steps.tsx
│   │   ├── Table.tsx
│   │   ├── TableTop.tsx
│   │   └── index.ts
│   ├── styles.css
│   └── index.ts
├── dist/              # Built files (generated)
│   ├── index.mjs      # ES module
│   ├── index.cjs      # CommonJS
│   ├── shekel-fe-shared-lib.css
│   └── types/         # TypeScript definitions
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Examples

### Complete Tracking Dashboard Layout

```tsx
import {
  Button,
  StatCard,
  SearchInput,
  Card,
  Table,
  TableTop,
  Badge,
  Dropdown
} from 'shekel-fe-shared-lib';
import 'shekel-fe-shared-lib/styles.css';

function TrackingDashboard() {
  const [selectedStat, setSelectedStat] = useState('all');

  const columns = [
    { key: 'id', title: 'ID', dataIndex: 'id' },
    { key: 'name', title: 'Name', dataIndex: 'name' },
    {
      key: 'status',
      title: 'Status',
      render: (_, record) => (
        <Badge variant={record.status === 'active' ? 'success' : 'default'}>
          {record.status}
        </Badge>
      )
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tracking</h1>
        <div className="flex gap-3">
          <Button variant="outlined" icon={<MapIcon />}>
            Map Intelligence
          </Button>
          <Button variant="primary">
            Start Tracking
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-8 gap-3 mb-6">
        <StatCard
          label="All Shipment"
          value={0}
          selected={selectedStat === 'all'}
          onClick={() => setSelectedStat('all')}
        />
        <StatCard label="Queued" value={0} />
        <StatCard label="Planned" value={0} />
        <StatCard label="On ship" value={0} />
        <StatCard label="Delayed" value={0} />
        <StatCard label="Arrived" value={0} />
        <StatCard label="Released" value={0} />
        <StatCard label="Demurrage" value={0} />
      </div>

      {/* Table with search and actions */}
      <TableTop
        title="Recent Activity"
        onSearch={handleSearch}
        actions={
          <>
            <Button variant="outlined" icon={<DownloadIcon />}>
              Download report
            </Button>
            <Button variant="outlined" icon={<FilterIcon />}>
              Filter
            </Button>
          </>
        }
      />

      <Table
        columns={columns}
        dataSource={shipments}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
```

---

## License

ISC
