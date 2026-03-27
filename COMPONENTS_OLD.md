# Component Documentation

Comprehensive documentation for all components in the Shekel Frontend Shared Library.

## Table of Contents

1. [Badge](#badge)
2. [Button](#button)
3. [Card](#card)
4. [Checkbox](#checkbox)
5. [Dropdown](#dropdown)
6. [Modal](#modal)
7. [Progress](#progress)
8. [SearchInput](#searchinput)
9. [Select](#select)
10. [SelectedItemsList](#selecteditemslist)
11. [StatCard](#statcard)
12. [Steps](#steps)
13. [Table](#table)
14. [TableTop](#tabletop)

---

## Badge

A versatile badge component for displaying small labels, tags, or status indicators with icons and dots.

### Description

The Badge component provides a flexible way to display categorized information, status indicators, or labels. It supports multiple variants, sizes, icons, and customization options including responsive sizing.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Content to display inside the badge |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Color variant of the badge |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Size of the badge |
| `dot` | `boolean` | `false` | Show a colored dot indicator |
| `icon` | `ReactNode` | `undefined` | Icon element to display |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of the icon |
| `className` | `string` | `''` | Additional CSS classes |
| `bgColor` | `string` | `undefined` | Custom background color (overrides variant) |
| `textColor` | `string` | `undefined` | Custom text color |
| `borderColor` | `string` | `undefined` | Custom border color |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | Border radius style |
| `style` | `CSSProperties` | `undefined` | Inline styles |

### Responsive Features

When `size="responsive"`, the badge automatically adjusts its padding, text size, and spacing based on screen size:
- Mobile: Extra small (10px text, minimal padding)
- Small screens: Small size
- Medium screens: Medium size
- Large screens: Large size

### Customization Options

- **Variants**: Choose from 6 pre-defined color schemes
- **Custom Colors**: Override any variant with custom background, text, and border colors
- **Icons**: Add icons on either side of the badge content
- **Dot Indicator**: Display a colored dot that matches the variant
- **Border Radius**: Control corner rounding from sharp to fully rounded

### Usage Examples

#### Basic Usage

```tsx
import { Badge } from 'shekel-fe-shared-lib';

function App() {
  return (
    <div>
      <Badge>Default Badge</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  );
}
```

#### Responsive Sizing

```tsx
<Badge size="responsive" variant="primary">
  Responsive Badge
</Badge>
```

#### With Icon

```tsx
import { CheckCircleIcon } from '@heroicons/react/24/solid';

<Badge
  variant="success"
  icon={<CheckCircleIcon />}
  iconPosition="left"
>
  Verified
</Badge>
```

#### With Dot Indicator

```tsx
<Badge variant="success" dot>
  Active
</Badge>
```

#### Custom Colors

```tsx
<Badge
  bgColor="#FFE5E5"
  textColor="#CC0000"
  borderColor="#CC0000"
>
  Custom Badge
</Badge>
```

#### Advanced Customization

```tsx
<Badge
  size="lg"
  variant="primary"
  rounded="lg"
  icon={<StarIcon />}
  iconPosition="right"
  className="shadow-md"
>
  Premium Feature
</Badge>
```

---

## Button

A feature-rich button component with multiple variants, sizes, loading states, and extensive customization options.

### Description

The Button component is a versatile interactive element that supports different visual styles, sizes, icons, loading states, and custom hover effects. It extends standard HTML button attributes for maximum flexibility.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'outlined' \| 'ghost' \| 'text'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Button size |
| `fullWidth` | `boolean` | `false` | Whether button takes full width |
| `icon` | `ReactNode` | `undefined` | Icon element to display |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of the icon |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `hoverColor` | `string` | `undefined` | Custom hover background color |
| `bgColor` | `string` | `undefined` | Custom background color |
| `textColor` | `string` | `undefined` | Custom text color |
| `borderColor` | `string` | `undefined` | Custom border color |
| `hoverBgColor` | `string` | `undefined` | Custom hover background color (alias for hoverColor) |
| `hoverTextColor` | `string` | `undefined` | Custom hover text color |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'lg'` | Border radius style |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `undefined` | Inline styles |
| `children` | `ReactNode` | Required | Button content |

### Responsive Features

When `size="responsive"`, the button adapts to screen sizes:
- Mobile: Extra small (xs text, minimal padding)
- Small screens: Small size
- Medium screens: Medium size
- Large screens: Large size

### Customization Options

- **4 Variants**: Primary (filled), Outlined, Ghost, and Text styles
- **Loading State**: Automatic spinner replacement when loading
- **Custom Hover**: Define custom hover background and text colors
- **Icons**: Add icons on either side with automatic spacing
- **Scale Animation**: Active/hover scale effects for better UX
- **Full Width**: Stretch to container width

### Usage Examples

#### Basic Usage

```tsx
import { Button } from 'shekel-fe-shared-lib';

function App() {
  return (
    <div>
      <Button onClick={() => console.log('clicked')}>
        Click Me
      </Button>
    </div>
  );
}
```

#### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="text">Text</Button>
```

#### Responsive Sizing

```tsx
<Button size="responsive">
  Responsive Button
</Button>
```

#### With Loading State

```tsx
const [loading, setLoading] = useState(false);

<Button
  loading={loading}
  onClick={async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  }}
>
  Submit
</Button>
```

#### With Icon

```tsx
import { PlusIcon } from '@heroicons/react/24/outline';

<Button icon={<PlusIcon />} iconPosition="left">
  Add Item
</Button>
```

#### Custom Colors

```tsx
<Button
  bgColor="#7C3AED"
  textColor="#FFFFFF"
  hoverBgColor="#6D28D9"
>
  Custom Purple
</Button>
```

#### Advanced Customization

```tsx
<Button
  variant="outlined"
  size="lg"
  fullWidth
  rounded="full"
  icon={<ArrowRightIcon />}
  iconPosition="right"
  borderColor="#EC615B"
  textColor="#EC615B"
  hoverBgColor="#EC615B"
  hoverTextColor="#FFFFFF"
>
  Get Started
</Button>
```

---

## Card

A container component for grouping related content with flexible styling options.

### Description

The Card component provides a clean, customizable container for content. It supports shadows, borders, hover effects, and responsive padding for various use cases.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Internal padding size |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Shadow elevation |
| `hover` | `boolean` | `false` | Enable hover scale effect |
| `bordered` | `boolean` | `true` | Show border |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Border radius style |
| `bgColor` | `string` | `undefined` | Custom background color |
| `borderColor` | `string` | `undefined` | Custom border color |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `undefined` | Inline styles |
| `children` | `ReactNode` | Required | Card content |

### Responsive Features

When `padding="responsive"`, the card adjusts its internal padding:
- Mobile: 2 (8px)
- Small screens: 3 (12px)
- Medium screens: 4 (16px)
- Large screens: 6 (24px)

### Customization Options

- **Shadows**: 4 shadow levels from none to large
- **Padding**: 5 padding sizes including responsive
- **Borders**: Enable/disable with custom colors
- **Hover Effects**: Optional scale animation on hover
- **Custom Colors**: Override background and border colors

### Usage Examples

#### Basic Usage

```tsx
import { Card } from 'shekel-fe-shared-lib';

function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>Card content goes here.</p>
    </Card>
  );
}
```

#### Responsive Padding

```tsx
<Card padding="responsive">
  Responsive padding that adapts to screen size
</Card>
```

#### With Hover Effect

```tsx
<Card hover shadow="md">
  <h3>Hover me!</h3>
  <p>This card scales slightly on hover.</p>
</Card>
```

#### Custom Colors

```tsx
<Card
  bgColor="#F0F9FF"
  borderColor="#0EA5E9"
>
  Custom colored card
</Card>
```

#### Advanced Customization

```tsx
<Card
  padding="lg"
  shadow="lg"
  rounded="xl"
  hover
  bordered={false}
  bgColor="#FAFAFA"
  className="custom-class"
>
  <h2>Premium Card</h2>
  <p>Full customization example</p>
</Card>
```

---

## Checkbox

A customizable checkbox component with support for controlled/uncontrolled states, indeterminate state, and custom colors.

### Description

The Checkbox component provides a fully accessible checkbox input with visual customization options. It supports both filled and outlined variants, multiple sizes, and custom colors.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | `undefined` | Callback when checked state changes |
| `disabled` | `boolean` | `false` | Disable checkbox interaction |
| `indeterminate` | `boolean` | `false` | Show indeterminate state (dash) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Checkbox size |
| `variant` | `'filled' \| 'outline'` | `'filled'` | Visual style variant |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | `undefined` | HTML id attribute |
| `name` | `string` | `undefined` | HTML name attribute |
| `value` | `string` | `undefined` | HTML value attribute |
| `checkedColor` | `string` | `'#EC615B'` | Background color when checked (filled variant) |
| `uncheckedColor` | `string` | `'#ffffff'` | Background color when unchecked |
| `checkedBorderColor` | `string` | `'#EC615B'` | Border color when checked |
| `style` | `CSSProperties` | `undefined` | Inline styles |

### Responsive Features

When `size="responsive"`, the checkbox adapts its size:
- Mobile: 4x4 (16px)
- Small screens: 5x5 (20px)
- Large screens: 6x6 (24px)

### Customization Options

- **Variants**: Filled (solid background) or Outline (border only)
- **Indeterminate State**: Show a dash for partial selections
- **Custom Colors**: Control checked/unchecked colors and borders
- **Controlled/Uncontrolled**: Works in both modes
- **Accessibility**: Proper ARIA labels and keyboard support

### Usage Examples

#### Basic Usage

```tsx
import { Checkbox } from 'shekel-fe-shared-lib';

function App() {
  return (
    <div>
      <Checkbox defaultChecked />
      <label>Accept terms</label>
    </div>
  );
}
```

#### Controlled Checkbox

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={setChecked}
  id="agree"
/>
<label htmlFor="agree">I agree</label>
```

#### Responsive Sizing

```tsx
<Checkbox size="responsive" defaultChecked />
```

#### Indeterminate State

```tsx
<Checkbox indeterminate />
```

#### Custom Colors

```tsx
<Checkbox
  checkedColor="#10B981"
  checkedBorderColor="#059669"
  variant="filled"
/>
```

#### Outline Variant

```tsx
<Checkbox
  variant="outline"
  checkedColor="#3B82F6"
  checkedBorderColor="#2563EB"
/>
```

#### Advanced Customization

```tsx
const [items, setItems] = useState([
  { id: 1, checked: true },
  { id: 2, checked: false },
  { id: 3, checked: true }
]);

const allChecked = items.every(item => item.checked);
const someChecked = items.some(item => item.checked);

<div>
  <Checkbox
    checked={allChecked}
    indeterminate={someChecked && !allChecked}
    onChange={(checked) => {
      setItems(items.map(item => ({ ...item, checked })));
    }}
  />
  <label>Select All</label>
</div>
```

---

## Dropdown

A customizable dropdown menu component with support for click or hover triggers, multiple placements, and custom styling.

### Description

The Dropdown component provides a flexible menu that can be triggered by clicking or hovering. It supports custom colors, sizes, and item configurations including disabled and danger states.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DropdownMenuItem[]` | Required | Array of menu items |
| `trigger` | `'click' \| 'hover'` | `'click'` | How to open the dropdown |
| `placement` | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'` | Menu position relative to trigger |
| `children` | `ReactNode` | Required | Trigger element |
| `className` | `string` | `''` | Additional CSS classes |
| `overlayClassName` | `string` | `''` | Classes for menu overlay |
| `disabled` | `boolean` | `false` | Disable dropdown interaction |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Menu size |
| `menuBgColor` | `string` | `'#ffffff'` | Menu background color |
| `menuItemHoverColor` | `string` | `undefined` | Item hover background color |
| `dangerColor` | `string` | `undefined` | Color for danger items |
| `borderColor` | `string` | `undefined` | Menu border color |
| `style` | `CSSProperties` | `undefined` | Inline styles |

### DropdownMenuItem Interface

```typescript
interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}
```

### Responsive Features

When `size="responsive"`, the dropdown menu adapts:
- Mobile: Minimum width 120px, extra small text
- Small screens: Minimum width 160px, small text
- Medium screens: Minimum width 200px, base text
- Large screens: Minimum width 240px, base text

### Customization Options

- **Trigger Types**: Click or hover activation
- **Placements**: 4 positions (top/bottom, left/right)
- **Custom Colors**: Menu background, hover, danger, and border
- **Item States**: Disabled and danger states for items
- **Icons**: Add icons to menu items
- **Auto-close**: Clicks outside automatically close

### Usage Examples

#### Basic Usage

```tsx
import { Dropdown, Button } from 'shekel-fe-shared-lib';

const items = [
  { key: '1', label: 'Profile', onClick: () => console.log('Profile') },
  { key: '2', label: 'Settings', onClick: () => console.log('Settings') },
  { key: '3', label: 'Logout', onClick: () => console.log('Logout'), danger: true }
];

function App() {
  return (
    <Dropdown items={items}>
      <Button>Menu</Button>
    </Dropdown>
  );
}
```

#### Responsive Sizing

```tsx
<Dropdown items={items} size="responsive">
  <Button>Actions</Button>
</Dropdown>
```

#### Hover Trigger

```tsx
<Dropdown items={items} trigger="hover" placement="bottomRight">
  <Button variant="ghost">Hover Me</Button>
</Dropdown>
```

#### With Icons

```tsx
import { UserIcon, CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const items = [
  {
    key: '1',
    label: 'Profile',
    icon: <UserIcon className="w-4 h-4" />,
    onClick: () => navigate('/profile')
  },
  {
    key: '2',
    label: 'Settings',
    icon: <CogIcon className="w-4 h-4" />,
    onClick: () => navigate('/settings')
  },
  {
    key: '3',
    label: 'Logout',
    icon: <ArrowRightOnRectangleIcon className="w-4 h-4" />,
    danger: true,
    onClick: handleLogout
  }
];

<Dropdown items={items}>
  <Button>Account</Button>
</Dropdown>
```

#### Custom Colors

```tsx
<Dropdown
  items={items}
  menuBgColor="#F9FAFB"
  menuItemHoverColor="#EEF2FF"
  dangerColor="#DC2626"
  borderColor="#E5E7EB"
>
  <Button>Custom Menu</Button>
</Dropdown>
```

#### Advanced Customization

```tsx
const items = [
  {
    key: '1',
    label: 'Edit',
    icon: <PencilIcon className="w-4 h-4" />
  },
  {
    key: '2',
    label: 'Duplicate',
    icon: <DocumentDuplicateIcon className="w-4 h-4" />
  },
  {
    key: '3',
    label: 'Archive',
    icon: <ArchiveBoxIcon className="w-4 h-4" />,
    disabled: true
  },
  {
    key: '4',
    label: 'Delete',
    icon: <TrashIcon className="w-4 h-4" />,
    danger: true,
    onClick: handleDelete
  }
];

<Dropdown
  items={items}
  size="lg"
  placement="bottomRight"
  menuBgColor="#FFFFFF"
  menuItemHoverColor="#F3F4F6"
  dangerColor="#EF4444"
>
  <Button variant="ghost" icon={<EllipsisVerticalIcon />} />
</Dropdown>
```

---

## Modal

A full-featured modal dialog component with animations, customizable sizes, and flexible content areas.

### Description

The Modal component provides an overlay dialog for displaying content above the main page. It includes built-in animations, keyboard support (ESC to close), and highly customizable appearance.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | Required | Control modal visibility |
| `onClose` | `() => void` | Required | Callback when modal should close |
| `title` | `string` | `undefined` | Modal title |
| `children` | `ReactNode` | Required | Modal body content |
| `footer` | `ReactNode` | `undefined` | Modal footer content |
| `width` | `string \| number` | `undefined` | Custom modal width |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'responsive'` | `'md'` | Predefined modal size |
| `closable` | `boolean` | `true` | Show close button |
| `maskClosable` | `boolean` | `true` | Close on backdrop click |
| `centered` | `boolean` | `true` | Center modal vertically |
| `className` | `string` | `''` | Additional CSS classes |
| `bgColor` | `string` | `'#ffffff'` | Modal background color |
| `headerBgColor` | `string` | `'#ffffff'` | Header background color |
| `overlayColor` | `string` | `'rgba(0, 0, 0, 0.5)'` | Backdrop color |
| `bodyClassName` | `string` | `''` | Classes for body section |
| `headerClassName` | `string` | `''` | Classes for header section |
| `maxHeight` | `string \| number` | `'70vh'` | Maximum body height |

### Responsive Features

When `size="responsive"`, the modal adapts to screen size:
- Mobile: 90vw width
- Medium screens and up: lg size (512px)

Built-in size presets:
- `sm`: 384px
- `md`: 448px
- `lg`: 512px
- `xl`: 600px
- `full`: 100% width

### Customization Options

- **Animations**: Smooth fade-in/scale-up entrance and exit
- **Keyboard Support**: ESC key to close (when closable)
- **Backdrop Click**: Optional click outside to close
- **Custom Sizes**: Use size presets or custom width
- **Scrollable Body**: Overflow handling with max height
- **Custom Colors**: Control modal, header, and overlay colors
- **Footer Actions**: Flexible footer for action buttons

### Usage Examples

#### Basic Usage

```tsx
import { Modal, Button } from 'shekel-fe-shared-lib';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Title"
      >
        <p>Modal content goes here.</p>
      </Modal>
    </div>
  );
}
```

#### Responsive Sizing

```tsx
<Modal
  open={open}
  onClose={handleClose}
  size="responsive"
  title="Responsive Modal"
>
  This modal adapts to screen size
</Modal>
```

#### Custom Size

```tsx
<Modal
  open={open}
  onClose={handleClose}
  width={800}
  title="Wide Modal"
>
  Custom width modal
</Modal>
```

#### With Footer

```tsx
<Modal
  open={open}
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost" onClick={handleClose}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  Are you sure you want to proceed?
</Modal>
```

#### Custom Colors

```tsx
<Modal
  open={open}
  onClose={handleClose}
  title="Custom Styled Modal"
  bgColor="#F9FAFB"
  headerBgColor="#EEF2FF"
  overlayColor="rgba(0, 0, 0, 0.7)"
>
  Custom colored modal
</Modal>
```

#### Advanced Customization

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete Confirmation"
  size="md"
  closable={true}
  maskClosable={false}
  centered={true}
  maxHeight="80vh"
  headerBgColor="#FEF2F2"
  footer={
    <div className="flex gap-2 w-full justify-end">
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button
        bgColor="#DC2626"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  }
>
  <div className="space-y-4">
    <p className="text-gray-700">
      This action cannot be undone. Are you sure you want to delete this item?
    </p>
    <div className="bg-red-50 p-3 rounded-lg">
      <p className="text-sm text-red-800">
        Warning: All associated data will be permanently removed.
      </p>
    </div>
  </div>
</Modal>
```

---

## Progress

A progress bar component with multiple states, customizable colors, and optional percentage display.

### Description

The Progress component visualizes task completion or loading states. It supports different status indicators, custom colors, size variations, and custom formatting.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `percent` | `number` | `0` | Progress percentage (0-100) |
| `status` | `'normal' \| 'success' \| 'exception' \| 'active'` | `'normal'` | Progress status |
| `showInfo` | `boolean` | `true` | Show percentage or status icon |
| `strokeColor` | `string` | `undefined` | Progress bar color (overrides status) |
| `strokeWidth` | `number` | `undefined` | Custom bar height in pixels |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Progress bar size |
| `className` | `string` | `''` | Additional CSS classes |
| `format` | `(percent: number) => ReactNode` | `undefined` | Custom formatter for percentage text |
| `bgColor` | `string` | `undefined` | Custom background color for progress bar |
| `successColor` | `string` | `undefined` | Color when status is success or 100% |
| `exceptionColor` | `string` | `undefined` | Color when status is exception |
| `trackColor` | `string` | `undefined` | Background track color |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | Border radius style |

### Responsive Features

When `size="responsive"`, the progress bar adapts:
- Mobile: 1.5 (6px) height, xs text
- Small screens: 2 (8px) height, sm text
- Medium screens: 3 (12px) height, base text
- Large screens: 4 (16px) height, lg text

### Customization Options

- **Status States**: Normal, Success, Exception, Active (animated)
- **Custom Colors**: Override any color with custom values
- **Custom Format**: Display custom text instead of percentage
- **Icon Indicators**: Success/exception show icons instead of percentages
- **Auto-success**: Automatically shows success at 100%
- **Active Animation**: Animated gradient for in-progress state

### Usage Examples

#### Basic Usage

```tsx
import { Progress } from 'shekel-fe-shared-lib';

function App() {
  return <Progress percent={60} />;
}
```

#### Different Statuses

```tsx
<Progress percent={100} status="success" />
<Progress percent={70} status="active" />
<Progress percent={50} status="exception" />
```

#### Responsive Sizing

```tsx
<Progress percent={75} size="responsive" />
```

#### Custom Colors

```tsx
<Progress
  percent={80}
  strokeColor="#8B5CF6"
  trackColor="#EDE9FE"
/>
```

#### Custom Formatting

```tsx
<Progress
  percent={65}
  format={(percent) => `${percent}% Complete`}
/>
```

#### Without Info

```tsx
<Progress percent={45} showInfo={false} />
```

#### Advanced Customization

```tsx
const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(timer);
        return 100;
      }
      return prev + 10;
    });
  }, 500);

  return () => clearInterval(timer);
}, []);

<Progress
  percent={progress}
  status={progress === 100 ? 'success' : progress > 0 ? 'active' : 'normal'}
  size="lg"
  strokeColor={progress < 30 ? '#EF4444' : progress < 70 ? '#F59E0B' : '#10B981'}
  format={(percent) => percent === 100 ? 'Done!' : `${percent}%`}
  rounded="lg"
/>
```

---

## SearchInput

A search input component with icon support, customizable styling, and responsive sizing.

### Description

The SearchInput component provides a text input specifically designed for search functionality. It includes a built-in search icon, custom positioning, and extensive styling options.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | `undefined` | Custom icon (true for default search icon) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Input size |
| `fullWidth` | `boolean` | `false` | Take full container width |
| `onIconClick` | `() => void` | `undefined` | Callback when icon is clicked |
| `bgColor` | `string` | `undefined` | Background color |
| `borderColor` | `string` | `undefined` | Border color |
| `focusBorderColor` | `string` | `undefined` | Border color when focused |
| `iconColor` | `string` | `undefined` | Icon color |
| `textColor` | `string` | `undefined` | Text color |
| `placeholderColor` | `string` | `undefined` | Placeholder text color |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border radius style |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `undefined` | Inline styles |

Extends all standard `InputHTMLAttributes<HTMLInputElement>` except `size`.

### Responsive Features

When `size="responsive"`, the input adapts:
- Mobile: Small padding, small text, small icon
- Small screens: Medium padding, medium text, medium icon
- Medium screens: Large padding, large text, large icon

### Customization Options

- **Icon Support**: Default search icon or custom icon
- **Icon Position**: Left or right side
- **Clickable Icon**: Optional click handler for icon
- **Custom Colors**: Full color customization including focus states
- **Border Radius**: From sharp to fully rounded
- **Full Width**: Stretch to container

### Usage Examples

#### Basic Usage

```tsx
import { SearchInput } from 'shekel-fe-shared-lib';

function App() {
  return (
    <SearchInput
      placeholder="Search..."
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
```

#### With Default Icon

```tsx
<SearchInput
  icon={true}
  placeholder="Search products..."
/>
```

#### Responsive Sizing

```tsx
<SearchInput
  size="responsive"
  fullWidth
  icon={true}
  placeholder="Search..."
/>
```

#### Custom Icon

```tsx
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

<SearchInput
  icon={<MagnifyingGlassIcon />}
  iconPosition="right"
  placeholder="Search..."
/>
```

#### Clickable Icon

```tsx
<SearchInput
  icon={true}
  onIconClick={handleSearchSubmit}
  placeholder="Press icon to search"
/>
```

#### Custom Colors

```tsx
<SearchInput
  icon={true}
  bgColor="#F9FAFB"
  borderColor="#D1D5DB"
  focusBorderColor="#3B82F6"
  iconColor="#6B7280"
  textColor="#111827"
  placeholderColor="#9CA3AF"
/>
```

#### Advanced Customization

```tsx
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);

const handleSearch = async (value: string) => {
  setQuery(value);
  if (value.length > 2) {
    const data = await searchAPI(value);
    setResults(data);
  }
};

<div className="relative">
  <SearchInput
    value={query}
    onChange={(e) => handleSearch(e.target.value)}
    icon={true}
    size="lg"
    fullWidth
    rounded="full"
    bgColor="#FFFFFF"
    borderColor="#E5E7EB"
    focusBorderColor="#EC615B"
    placeholder="Search for anything..."
  />
  {results.length > 0 && (
    <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg">
      {results.map(result => (
        <div key={result.id} className="p-3 hover:bg-gray-50">
          {result.name}
        </div>
      ))}
    </div>
  )}
</div>
```

---

## Select

A feature-rich select dropdown component with search, clear functionality, and extensive customization.

### Description

The Select component provides a customizable dropdown for selecting from a list of options. It supports search filtering, clear functionality, custom colors, and both controlled and uncontrolled modes.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | Required | Array of selectable options |
| `value` | `string \| number` | `undefined` | Controlled selected value |
| `defaultValue` | `string \| number` | `undefined` | Initial value (uncontrolled) |
| `placeholder` | `string` | `'Select an option'` | Placeholder text |
| `onChange` | `(value: string \| number) => void` | `undefined` | Callback when value changes |
| `disabled` | `boolean` | `false` | Disable select interaction |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Select size |
| `fullWidth` | `boolean` | `false` | Take full container width |
| `className` | `string` | `''` | Additional CSS classes |
| `allowClear` | `boolean` | `false` | Show clear button when value selected |
| `showSearch` | `boolean` | `false` | Enable search filtering |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `bgColor` | `string` | `undefined` | Background color |
| `borderColor` | `string` | `undefined` | Border color |
| `focusBorderColor` | `string` | `'#EC615B'` | Border color when focused |
| `selectedBgColor` | `string` | `undefined` | Background color for selected option |
| `selectedTextColor` | `string` | `undefined` | Text color for selected option |
| `hoverBgColor` | `string` | `undefined` | Hover background color for options |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'lg'` | Border radius style |
| `style` | `CSSProperties` | `undefined` | Inline styles |

### SelectOption Interface

```typescript
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
```

### Responsive Features

When `size="responsive"`, the select adapts:
- Mobile: Small padding, small text
- Small screens: Medium padding, medium text
- Medium screens: Large padding, large text

### Customization Options

- **Search Filtering**: Optional search input to filter options
- **Clear Button**: Optional clear selected value
- **Disabled Options**: Individual options can be disabled
- **Custom Colors**: Full color control including hover and selected states
- **Controlled/Uncontrolled**: Works in both modes
- **Auto-close**: Click outside to close dropdown

### Usage Examples

#### Basic Usage

```tsx
import { Select } from 'shekel-fe-shared-lib';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
];

function App() {
  return (
    <Select
      options={options}
      placeholder="Select an option"
    />
  );
}
```

#### Controlled Select

```tsx
const [value, setValue] = useState('');

<Select
  options={options}
  value={value}
  onChange={setValue}
/>
```

#### Responsive Sizing

```tsx
<Select
  options={options}
  size="responsive"
  fullWidth
/>
```

#### With Search

```tsx
<Select
  options={longOptionsList}
  showSearch
  searchPlaceholder="Type to search..."
  placeholder="Search and select"
/>
```

#### With Clear Button

```tsx
<Select
  options={options}
  allowClear
  placeholder="Select country"
/>
```

#### Disabled Options

```tsx
const options = [
  { value: '1', label: 'Available' },
  { value: '2', label: 'Unavailable', disabled: true },
  { value: '3', label: 'Available' }
];

<Select options={options} />
```

#### Custom Colors

```tsx
<Select
  options={options}
  bgColor="#F9FAFB"
  borderColor="#D1D5DB"
  focusBorderColor="#8B5CF6"
  selectedBgColor="#EDE9FE"
  selectedTextColor="#7C3AED"
  hoverBgColor="#F3F4F6"
/>
```

#### Advanced Customization

```tsx
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  // ... more countries
];

const [country, setCountry] = useState('');

<Select
  options={countries}
  value={country}
  onChange={setCountry}
  size="lg"
  fullWidth
  allowClear
  showSearch
  searchPlaceholder="Search countries..."
  placeholder="Select your country"
  bgColor="#FFFFFF"
  borderColor="#E5E7EB"
  focusBorderColor="#EC615B"
  selectedBgColor="#FCEAE9"
  selectedTextColor="#EC615B"
  hoverBgColor="#F9FAFB"
  rounded="lg"
/>
```

---

## SelectedItemsList

A component for displaying a list of selected items with remove functionality and customizable appearance.

### Description

The SelectedItemsList component displays a scrollable list of selected items, each with a label, optional sublabel, and a remove button. It features smooth animations and extensive customization options.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SelectedItem[]` | Required | Array of selected items |
| `onRemove` | `(id: string \| number) => void` | Required | Callback when item is removed |
| `emptyMessage` | `string` | `'No items selected'` | Message when list is empty |
| `className` | `string` | `''` | Additional CSS classes for container |
| `itemClassName` | `string` | `''` | Additional CSS classes for items |
| `maxHeight` | `string` | `'300px'` | Maximum list height (scrollable) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | List item size |
| `bgColor` | `string` | `undefined` | Item background color |
| `hoverBgColor` | `string` | `undefined` | Item hover background color |
| `textColor` | `string` | `undefined` | Label text color |
| `sublabelColor` | `string` | `undefined` | Sublabel text color |
| `removeButtonColor` | `string` | `undefined` | Remove button color |
| `removeButtonHoverColor` | `string` | `undefined` | Remove button hover color |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border radius style |
| `style` | `CSSProperties` | `undefined` | Inline styles |

### SelectedItem Interface

```typescript
interface SelectedItem {
  id: string | number;
  label: string;
  sublabel?: string;
}
```

### Responsive Features

When `size="responsive"`, list items adapt:
- Mobile: Small padding, xs/10px text
- Small screens: Medium padding, sm/xs text
- Medium screens: Medium-large padding, base/sm text
- Large screens: Large padding, base/sm text

### Customization Options

- **Sublabels**: Optional secondary text for each item
- **Smooth Animations**: Slide-in animations for items
- **Hover Effects**: Scale and color change on hover
- **Custom Colors**: Full control over all color aspects
- **Scrollable**: Fixed max height with overflow scroll
- **Empty State**: Customizable empty message

### Usage Examples

#### Basic Usage

```tsx
import { SelectedItemsList } from 'shekel-fe-shared-lib';

const items = [
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' }
];

function App() {
  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <SelectedItemsList
      items={items}
      onRemove={handleRemove}
    />
  );
}
```

#### With Sublabels

```tsx
const items = [
  { id: 1, label: 'John Doe', sublabel: 'john@example.com' },
  { id: 2, label: 'Jane Smith', sublabel: 'jane@example.com' }
];

<SelectedItemsList
  items={items}
  onRemove={handleRemove}
/>
```

#### Responsive Sizing

```tsx
<SelectedItemsList
  items={items}
  onRemove={handleRemove}
  size="responsive"
/>
```

#### Custom Colors

```tsx
<SelectedItemsList
  items={items}
  onRemove={handleRemove}
  bgColor="#EEF2FF"
  hoverBgColor="#E0E7FF"
  textColor="#1E40AF"
  sublabelColor="#6B7280"
  removeButtonColor="#9CA3AF"
  removeButtonHoverColor="#DC2626"
/>
```

#### Custom Height

```tsx
<SelectedItemsList
  items={items}
  onRemove={handleRemove}
  maxHeight="500px"
/>
```

#### Advanced Customization

```tsx
const [selectedUsers, setSelectedUsers] = useState([
  {
    id: 1,
    label: 'Alice Johnson',
    sublabel: 'alice.johnson@company.com'
  },
  {
    id: 2,
    label: 'Bob Smith',
    sublabel: 'bob.smith@company.com'
  },
  {
    id: 3,
    label: 'Carol Williams',
    sublabel: 'carol.williams@company.com'
  }
]);

const handleRemoveUser = (id) => {
  setSelectedUsers(prev => prev.filter(user => user.id !== id));
};

<div className="space-y-2">
  <h3 className="text-lg font-semibold">Selected Team Members</h3>
  <SelectedItemsList
    items={selectedUsers}
    onRemove={handleRemoveUser}
    emptyMessage="No team members selected"
    size="lg"
    maxHeight="400px"
    bgColor="#F0F9FF"
    hoverBgColor="#E0F2FE"
    textColor="#0C4A6E"
    sublabelColor="#64748B"
    removeButtonColor="#94A3B8"
    removeButtonHoverColor="#DC2626"
    rounded="lg"
  />
</div>
```

---

## StatCard

An interactive statistics card component with selection states and smooth animations.

### Description

The StatCard component displays a key metric with a label and value. It supports selection states with visual feedback, making it ideal for dashboard filters or metric displays.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | Required | Stat label/description |
| `value` | `string \| number` | Required | Stat value to display |
| `selected` | `boolean` | `false` | Whether card is selected |
| `onClick` | `() => void` | `undefined` | Click handler |
| `className` | `string` | `''` | Additional CSS classes |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'responsive'` | Card size |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius style |
| `bgColor` | `string` | `undefined` | Default background color |
| `borderColor` | `string` | `undefined` | Default border color |
| `labelColor` | `string` | `undefined` | Default label text color |
| `valueColor` | `string` | `undefined` | Default value text color |
| `selectedBgColor` | `string` | `undefined` | Selected background color |
| `selectedBorderColor` | `string` | `undefined` | Selected border color |
| `selectedLabelColor` | `string` | `undefined` | Selected label text color |
| `selectedValueColor` | `string` | `undefined` | Selected value text color |
| `style` | `CSSProperties` | `undefined` | Inline styles |

### Responsive Features

When `size="responsive"`, the card adapts:
- Mobile: Small padding (12px), small text
- Small screens: Medium padding (16px), medium text
- Medium screens: Medium-large padding (20px), larger text
- Large screens: Large padding (24px), largest text

Size presets:
- `sm`: Compact card with small text
- `md`: Medium card with standard text
- `lg`: Large card with big text
- `responsive`: Adaptive sizing

### Customization Options

- **Selection State**: Visual feedback when selected
- **Smooth Animations**: Scale and color transitions
- **Gradient Effect**: Animated gradient on selection
- **Custom Colors**: Separate colors for default and selected states
- **Click Handler**: Optional interactive functionality
- **Responsive Sizing**: Adapts to all screen sizes

### Usage Examples

#### Basic Usage

```tsx
import { StatCard } from 'shekel-fe-shared-lib';

function App() {
  return (
    <StatCard
      label="Total Sales"
      value="$12,345"
    />
  );
}
```

#### Interactive Selection

```tsx
const [selected, setSelected] = useState(null);

<div className="grid grid-cols-3 gap-4">
  <StatCard
    label="Today"
    value="1,234"
    selected={selected === 'today'}
    onClick={() => setSelected('today')}
  />
  <StatCard
    label="This Week"
    value="8,567"
    selected={selected === 'week'}
    onClick={() => setSelected('week')}
  />
  <StatCard
    label="This Month"
    value="34,890"
    selected={selected === 'month'}
    onClick={() => setSelected('month')}
  />
</div>
```

#### Responsive Sizing

```tsx
<StatCard
  label="Revenue"
  value="$45,678"
  size="responsive"
/>
```

#### Custom Colors

```tsx
<StatCard
  label="Active Users"
  value="2,456"
  bgColor="#EEF2FF"
  borderColor="#C7D2FE"
  labelColor="#4F46E5"
  valueColor="#312E81"
  selectedBgColor="#C7D2FE"
  selectedBorderColor="#4F46E5"
/>
```

#### Different Sizes

```tsx
<div className="space-y-4">
  <StatCard label="Small" value="123" size="sm" />
  <StatCard label="Medium" value="456" size="md" />
  <StatCard label="Large" value="789" size="lg" />
</div>
```

#### Advanced Customization

```tsx
const metrics = [
  { id: 'revenue', label: 'Total Revenue', value: '$125,430' },
  { id: 'orders', label: 'Orders', value: '1,234' },
  { id: 'customers', label: 'Customers', value: '856' },
  { id: 'conversion', label: 'Conversion Rate', value: '3.2%' }
];

const [selectedMetric, setSelectedMetric] = useState('revenue');

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {metrics.map(metric => (
    <StatCard
      key={metric.id}
      label={metric.label}
      value={metric.value}
      selected={selectedMetric === metric.id}
      onClick={() => setSelectedMetric(metric.id)}
      size="responsive"
      rounded="lg"
      bgColor="#FFFFFF"
      borderColor="#E5E7EB"
      selectedBgColor="#FCEAE9"
      selectedBorderColor="#EC615B"
      selectedValueColor="#EC615B"
    />
  ))}
</div>
```

---

## Steps

A step indicator component for displaying progress through a multi-step process.

### Description

The Steps component visualizes progress through a sequence of steps. It supports horizontal and vertical layouts, custom icons, multiple status states, and extensive customization.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `StepItem[]` | Required | Array of step items |
| `current` | `number` | `0` | Current active step index |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Steps size |
| `variant` | `'default' \| 'outline'` | `'default'` | Visual style variant |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `undefined` | Inline styles |
| `finishColor` | `string` | `undefined` | Color for finished steps |
| `processColor` | `string` | `undefined` | Color for current step |
| `waitColor` | `string` | `undefined` | Color for waiting steps |
| `errorColor` | `string` | `undefined` | Color for error steps |
| `lineColor` | `string` | `undefined` | Color for connecting lines |

### StepItem Interface

```typescript
interface StepItem {
  title: string;
  description?: string;
  status?: 'wait' | 'process' | 'finish' | 'error';
  icon?: ReactNode;
}
```

### Responsive Features

When `size="responsive"`, steps adapt:
- Mobile: Small icons and text
- Small screens: Medium icons and text
- Medium screens: Standard icons and text
- Large screens: Large icons and text

### Customization Options

- **Layouts**: Horizontal or vertical orientation
- **Status States**: Wait, Process, Finish, Error
- **Custom Icons**: Override default icons per step
- **Variants**: Filled or outline style
- **Custom Colors**: Control all state colors
- **Descriptions**: Optional detail text per step
- **Auto Status**: Automatically determines status based on current prop

### Usage Examples

#### Basic Usage

```tsx
import { Steps } from 'shekel-fe-shared-lib';

const steps = [
  { title: 'Login', description: 'Enter your credentials' },
  { title: 'Verification', description: 'Verify your identity' },
  { title: 'Complete', description: 'Setup complete' }
];

function App() {
  const [current, setCurrent] = useState(0);

  return (
    <Steps items={steps} current={current} />
  );
}
```

#### Horizontal Layout

```tsx
<Steps
  items={steps}
  current={1}
  direction="horizontal"
/>
```

#### Responsive Sizing

```tsx
<Steps
  items={steps}
  current={1}
  size="responsive"
/>
```

#### With Custom Icons

```tsx
import { UserIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Account',
    icon: <UserIcon className="w-5 h-5" />
  },
  {
    title: 'Security',
    icon: <ShieldCheckIcon className="w-5 h-5" />
  },
  {
    title: 'Done',
    icon: <CheckCircleIcon className="w-5 h-5" />
  }
];

<Steps items={steps} current={1} />
```

#### Error State

```tsx
const steps = [
  { title: 'Step 1', status: 'finish' },
  { title: 'Step 2', status: 'error', description: 'Something went wrong' },
  { title: 'Step 3', status: 'wait' }
];

<Steps items={steps} current={1} />
```

#### Custom Colors

```tsx
<Steps
  items={steps}
  current={1}
  finishColor="#10B981"
  processColor="#3B82F6"
  waitColor="#9CA3AF"
  errorColor="#EF4444"
  lineColor="#D1D5DB"
/>
```

#### Outline Variant

```tsx
<Steps
  items={steps}
  current={1}
  variant="outline"
/>
```

#### Advanced Customization

```tsx
const [currentStep, setCurrentStep] = useState(0);
const [stepStatuses, setStepStatuses] = useState({});

const steps = [
  {
    title: 'Order Placed',
    description: 'Your order has been received',
    icon: <ShoppingCartIcon className="w-5 h-5" />
  },
  {
    title: 'Processing',
    description: 'Preparing your items',
    icon: <CogIcon className="w-5 h-5" />
  },
  {
    title: 'Shipped',
    description: 'Out for delivery',
    icon: <TruckIcon className="w-5 h-5" />
  },
  {
    title: 'Delivered',
    description: 'Order completed',
    icon: <CheckCircleIcon className="w-5 h-5" />
  }
];

const stepsWithStatus = steps.map((step, index) => ({
  ...step,
  status: stepStatuses[index] || undefined
}));

<div className="space-y-6">
  <Steps
    items={stepsWithStatus}
    current={currentStep}
    direction="horizontal"
    size="responsive"
    finishColor="#10B981"
    processColor="#EC615B"
    variant="default"
  />

  <div className="flex gap-2">
    <Button
      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
      disabled={currentStep === 0}
    >
      Previous
    </Button>
    <Button
      onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
      disabled={currentStep === steps.length - 1}
    >
      Next
    </Button>
  </div>
</div>
```

---

## Table

A comprehensive table component with pagination, sorting, custom rendering, and responsive sizing.

### Description

The Table component provides a feature-rich data table with built-in pagination, loading states, custom cell rendering, and extensive styling options. It's designed for displaying and managing tabular data.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<T>[]` | Required | Column definitions |
| `dataSource` | `T[]` | Required | Array of data objects |
| `rowKey` | `string \| ((record: T) => string)` | `'id'` | Unique key for each row |
| `pagination` | `PaginationConfig \| false` | `undefined` | Pagination configuration or false to disable |
| `loading` | `boolean` | `false` | Show loading state |
| `onRow` | `(record: T, index: number) => HTMLAttributes<HTMLTableRowElement>` | `undefined` | Row event handlers |
| `className` | `string` | `''` | Additional CSS classes |
| `bordered` | `boolean` | `false` | Show column borders |
| `striped` | `boolean` | `false` | Alternate row colors |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'md'` | Table size |
| `headerBgColor` | `string` | `undefined` | Header background color |
| `headerTextColor` | `string` | `undefined` | Header text color |
| `rowHoverColor` | `string` | `undefined` | Row hover background color |
| `borderColor` | `string` | `undefined` | Border color |
| `stripedRowColor` | `string` | `undefined` | Striped row background color |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Border radius style |
| `style` | `CSSProperties` | `undefined` | Inline styles |

### ColumnDef Interface

```typescript
interface ColumnDef<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}
```

### PaginationConfig Interface

```typescript
interface PaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showTotal?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

### Responsive Features

When `size="responsive"`, the table adapts:
- Mobile: Compact padding, small text
- Small screens: Medium padding, small text
- Medium screens: Standard padding, standard text

### Customization Options

- **Custom Rendering**: Full control over cell content
- **Pagination**: Built-in pagination with size changer
- **Loading State**: Automatic loading spinner
- **Row Events**: Click, hover, and other row events
- **Column Alignment**: Left, center, or right alignment
- **Bordered/Striped**: Optional visual enhancements
- **Custom Colors**: Full color customization

### Usage Examples

#### Basic Usage

```tsx
import { Table } from 'shekel-fe-shared-lib';

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age' },
  { key: 'email', title: 'Email', dataIndex: 'email' }
];

const data = [
  { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com' }
];

function App() {
  return (
    <Table
      columns={columns}
      dataSource={data}
    />
  );
}
```

#### With Pagination

```tsx
<Table
  columns={columns}
  dataSource={data}
  pagination={{
    pageSize: 10,
    showSizeChanger: true,
    showTotal: true
  }}
/>
```

#### Custom Cell Rendering

```tsx
const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name'
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (status) => (
      <Badge variant={status === 'active' ? 'success' : 'default'}>
        {status}
      </Badge>
    )
  },
  {
    key: 'actions',
    title: 'Actions',
    align: 'right',
    render: (_, record) => (
      <Button size="sm" onClick={() => handleEdit(record.id)}>
        Edit
      </Button>
    )
  }
];

<Table columns={columns} dataSource={data} />
```

#### Responsive Sizing

```tsx
<Table
  columns={columns}
  dataSource={data}
  size="responsive"
/>
```

#### Loading State

```tsx
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  fetchData().then(result => {
    setData(result);
    setLoading(false);
  });
}, []);

<Table
  columns={columns}
  dataSource={data}
  loading={loading}
/>
```

#### Striped Rows

```tsx
<Table
  columns={columns}
  dataSource={data}
  striped
/>
```

#### Custom Colors

```tsx
<Table
  columns={columns}
  dataSource={data}
  headerBgColor="#F0F9FF"
  headerTextColor="#0C4A6E"
  rowHoverColor="#E0F2FE"
  borderColor="#BAE6FD"
  stripedRowColor="#F9FAFB"
/>
```

#### Advanced Customization

```tsx
const columns = [
  {
    key: 'user',
    title: 'User',
    dataIndex: 'name',
    render: (name, record) => (
      <div className="flex items-center gap-3">
        <img
          src={record.avatar}
          alt={name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      </div>
    )
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    render: (role) => (
      <Badge variant={role === 'admin' ? 'primary' : 'default'}>
        {role}
      </Badge>
    )
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    render: (status) => (
      <Badge
        variant={status === 'active' ? 'success' : 'default'}
        dot
      >
        {status}
      </Badge>
    )
  },
  {
    key: 'lastSeen',
    title: 'Last Seen',
    dataIndex: 'lastSeen',
    render: (date) => new Date(date).toLocaleDateString()
  },
  {
    key: 'actions',
    title: '',
    align: 'right',
    render: (_, record) => (
      <Dropdown
        items={[
          { key: 'edit', label: 'Edit', onClick: () => handleEdit(record.id) },
          { key: 'delete', label: 'Delete', danger: true, onClick: () => handleDelete(record.id) }
        ]}
      >
        <Button variant="ghost" size="sm" icon={<EllipsisHorizontalIcon />} />
      </Dropdown>
    )
  }
];

<Table
  columns={columns}
  dataSource={users}
  pagination={{
    pageSize: 15,
    showSizeChanger: true,
    pageSizeOptions: [10, 15, 25, 50],
    showTotal: true
  }}
  size="responsive"
  striped
  rounded="lg"
  headerBgColor="#F5F6F7"
  headerTextColor="#333333"
  rowHoverColor="#F3F4F6"
  onRow={(record) => ({
    onClick: () => handleRowClick(record)
  })}
/>
```

---

## TableTop

A table toolbar component with search, filters, and action buttons.

### Description

The TableTop component provides a standard toolbar for tables, featuring a title, description, search input, action buttons, and filter controls. It's designed to work seamlessly with the Table component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Toolbar title |
| `description` | `string` | `undefined` | Toolbar description |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `onSearch` | `(value: string) => void` | `undefined` | Search callback |
| `actions` | `ReactNode` | `undefined` | Action buttons (right side) |
| `filters` | `ReactNode` | `undefined` | Filter controls (bottom row) |
| `className` | `string` | `''` | Additional CSS classes |
| `size` | `'sm' \| 'md' \| 'lg' \| 'responsive'` | `'responsive'` | Toolbar size |
| `titleColor` | `string` | `undefined` | Title text color |
| `descriptionColor` | `string` | `undefined` | Description text color |
| `searchBgColor` | `string` | `'white'` | Search input background |
| `searchBorderColor` | `string` | `'#d1d5db'` | Search input border |
| `searchFocusBorderColor` | `string` | `'#3b82f6'` | Search input focus border |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Search input border radius |
| `style` | `CSSProperties` | `undefined` | Inline styles |

### Responsive Features

When `size="responsive"`, the toolbar adapts:
- Mobile: Compact spacing, small text, stacked layout
- Small screens: Medium spacing, standard text
- Medium screens: Generous spacing, larger text
- Large screens: Maximum spacing, largest text

The layout automatically stacks vertically on mobile and flows horizontally on larger screens.

### Customization Options

- **Search**: Built-in search with icon
- **Actions**: Flexible action button area
- **Filters**: Dedicated filter controls row
- **Responsive Layout**: Auto-adapts to screen size
- **Custom Colors**: Control all text and input colors
- **Optional Sections**: Only render what you need

### Usage Examples

#### Basic Usage

```tsx
import { TableTop, Table } from 'shekel-fe-shared-lib';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <TableTop
        title="Users"
        onSearch={setSearchQuery}
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
```

#### With Description

```tsx
<TableTop
  title="Customer Database"
  description="Manage and view all customer information"
  onSearch={handleSearch}
/>
```

#### With Actions

```tsx
<TableTop
  title="Products"
  onSearch={handleSearch}
  actions={
    <>
      <Button variant="outlined">Import</Button>
      <Button icon={<PlusIcon />}>Add Product</Button>
    </>
  }
/>
```

#### Responsive Sizing

```tsx
<TableTop
  title="Orders"
  size="responsive"
  onSearch={handleSearch}
/>
```

#### With Filters

```tsx
<TableTop
  title="Transactions"
  onSearch={handleSearch}
  filters={
    <>
      <Select
        options={statusOptions}
        placeholder="Status"
        onChange={handleStatusFilter}
      />
      <Select
        options={categoryOptions}
        placeholder="Category"
        onChange={handleCategoryFilter}
      />
    </>
  }
/>
```

#### Custom Colors

```tsx
<TableTop
  title="Reports"
  description="View and analyze reports"
  onSearch={handleSearch}
  titleColor="#1F2937"
  descriptionColor="#6B7280"
  searchBgColor="#F9FAFB"
  searchBorderColor="#E5E7EB"
  searchFocusBorderColor="#EC615B"
/>
```

#### Advanced Customization

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [status, setStatus] = useState('all');
const [dateRange, setDateRange] = useState('week');

<div className="space-y-4">
  <TableTop
    title="Sales Dashboard"
    description="Track and manage all sales activities"
    size="responsive"
    onSearch={setSearchQuery}
    searchPlaceholder="Search by order ID, customer name..."
    rounded="lg"
    titleColor="#111827"
    descriptionColor="#6B7280"
    searchBgColor="#FFFFFF"
    searchBorderColor="#D1D5DB"
    searchFocusBorderColor="#EC615B"
    actions={
      <div className="flex gap-2">
        <Button variant="outlined" icon={<ArrowDownTrayIcon />}>
          Export
        </Button>
        <Button icon={<PlusIcon />}>
          New Sale
        </Button>
      </div>
    }
    filters={
      <div className="flex flex-wrap gap-3">
        <Select
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'pending', label: 'Pending' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' }
          ]}
          value={status}
          onChange={setStatus}
          size="sm"
        />
        <Select
          options={[
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' },
            { value: 'year', label: 'This Year' }
          ]}
          value={dateRange}
          onChange={setDateRange}
          size="sm"
        />
        <Button variant="ghost" size="sm" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>
    }
  />

  <Table
    columns={columns}
    dataSource={filteredData}
    pagination={{
      pageSize: 20,
      showSizeChanger: true
    }}
  />
</div>
```

---

## Installation

To use these components, first install the package:

```bash
npm install shekel-fe-shared-lib
```

Or with yarn:

```bash
yarn add shekel-fe-shared-lib
```

## Importing Components

You can import components individually or all at once:

```typescript
// Individual imports
import { Button, Badge, Card } from 'shekel-fe-shared-lib';

// All components
import * from 'shekel-fe-shared-lib';
```

## TypeScript Support

All components are written in TypeScript and include full type definitions. Import types as needed:

```typescript
import type { ButtonProps, BadgeProps, TableProps } from 'shekel-fe-shared-lib';
```

## Styling

The components use Tailwind CSS for styling. Make sure your project is configured with Tailwind CSS. The library uses a custom color palette with `#EC615B` as the primary color.

## Browser Support

The components support all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

For bug reports and feature requests, please visit the repository issues page.

## License

See the LICENSE file in the repository for licensing information.
