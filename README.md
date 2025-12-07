# Shekel FE Shared Lib

A modern React component library built with **Tailwind CSS** and custom animations. Create beautiful, responsive UIs without the overhead of third-party component libraries.

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
import { Button, StatCard, SearchInput, Card } from 'shekel-fe-shared-lib';
import 'shekel-fe-shared-lib/styles.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <StatCard label="Total Shipments" value={42} />
      <SearchInput icon={true} placeholder="Search..." />
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

// With icon click handler
<SearchInput
  icon={true}
  onIconClick={() => console.log('Icon clicked')}
  placeholder="Click icon to search"
/>
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

## Animations

All components include built-in CSS animations:

- **StatCard**: Fade-in-up animation with count-up effect on values
- **Card**: Smooth fade-in animation
- **Button**: Active scale and smooth transitions
- **SearchInput**: Smooth focus transitions

Additional animation classes available:
- `.shimmer` - Loading shimmer effect
- `.slide-in-right` - Slide in from right animation

---

## TypeScript Support

This library is written in TypeScript and includes full type definitions. All component props are fully typed for the best development experience.

```tsx
import type { ButtonProps, StatCardProps, SearchInputProps, CardProps } from 'shekel-fe-shared-lib';
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
│   │   ├── Button.tsx
│   │   ├── StatCard.tsx
│   │   ├── SearchInput.tsx
│   │   ├── Card.tsx
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
  Card
} from 'shekel-fe-shared-lib';
import 'shekel-fe-shared-lib/styles.css';

function TrackingDashboard() {
  const [selectedStat, setSelectedStat] = useState('all');

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

      {/* Actions and Search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="flex gap-3">
          <Button variant="outlined" icon={<DownloadIcon />}>
            Download report
          </Button>
          <Button variant="outlined" icon={<FilterIcon />}>
            Filter
          </Button>
          <SearchInput
            icon={true}
            placeholder="Search a shipment"
            className="w-80"
          />
        </div>
      </div>

      {/* Content */}
      <Card>
        <p className="text-center text-gray-500 py-12">
          Your gateway to seamless shipment tracking
        </p>
      </Card>
    </div>
  );
}
```

---

## License

ISC
