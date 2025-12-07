# Component Library Demo

This demo showcases all components from the Shekel FE Shared Library.

## Quick Start - HTML Demo

The easiest way to test the components:

1. **Open the HTML demo directly in your browser:**
   ```bash
   # Navigate to the demo folder
   cd demo

   # Open index.html in your browser
   open index.html  # macOS
   # or
   xdg-open index.html  # Linux
   # or just double-click the file in Windows
   ```

2. That's it! The HTML file loads everything from CDNs and the built library.

## Advanced - React/TypeScript Demo

If you want to test the components in a proper React environment:

### Option 1: Create React App (Vite)

```bash
# Create a new Vite React app
npm create vite@latest my-demo-app -- --template react-ts

# Navigate into the app
cd my-demo-app

# Install dependencies
npm install

# Link or install the component library
# Option A: Link locally (recommended for testing)
npm link ../

# Option B: Install from file path
npm install ../

# Copy the demo App.tsx
cp ../demo/App.tsx src/App.tsx

# Start the dev server
npm run dev
```

### Option 2: Use the Demo App Directly

You can also copy `App.tsx` into any existing React project:

```tsx
import { Button, StatCard, SearchInput, Card, Dropdown, Select } from 'shekel-fe-shared-lib';
import 'shekel-fe-shared-lib/styles.css';

// Then use the components as shown in App.tsx
```

## What's Included

The demo showcases:

### 1. **Button Component**
- 4 variants: primary, outlined, ghost, text
- 3 sizes: sm, md, lg
- Icon support
- Loading states
- Full width option

### 2. **StatCard Component**
- Animated statistics cards
- Selected state
- Click handlers
- Perfect for dashboards

### 3. **SearchInput Component**
- Icon support
- Different sizes
- Full width option
- Smooth focus transitions

### 4. **Card Component**
- Customizable padding, shadows, borders
- Hover effects
- Multiple border radius options

### 5. **Dropdown Component**
- Click or hover trigger
- Menu items with icons
- Disabled and danger states
- 4 placement options
- Ant Design-style animations

### 6. **Select Component**
- Form select dropdown
- Controlled and uncontrolled modes
- Clear button option
- Selected option highlighting
- Smooth animations

### 7. **Complete Dashboard**
A full recreation of the tracking dashboard from your screenshot.

## Testing Checklist

When testing, make sure to verify:

- [ ] All button variants render correctly
- [ ] Button hover and click animations work
- [ ] Loading state shows spinner
- [ ] Stat cards animate on load
- [ ] Stat cards show selected state when clicked
- [ ] Search input accepts text
- [ ] Search input focus ring appears
- [ ] Cards have proper shadows
- [ ] Hover cards lift on mouseover
- [ ] Dropdown opens on click/hover
- [ ] Dropdown menu items are clickable
- [ ] Dropdown closes when clicking outside
- [ ] Dropdown shows disabled items correctly
- [ ] Dropdown danger items are red
- [ ] Select opens dropdown on click
- [ ] Select chevron rotates when open
- [ ] Select options are selectable
- [ ] Select shows selected value
- [ ] Select clear button works
- [ ] All animations are smooth

## Browser Support

This library uses modern CSS and JavaScript features. Recommended browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Troubleshooting

### Components don't show styles

Make sure you import the CSS file:
```tsx
import 'shekel-fe-shared-lib/styles.css';
```

### Tailwind classes don't work

Add the library to your `tailwind.config.js`:
```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/shekel-fe-shared-lib/dist/**/*.{js,mjs}",
  ],
}
```

### TypeScript errors

Make sure you're importing the types:
```tsx
import type { ButtonProps, SelectOption } from 'shekel-fe-shared-lib';
```

## Customization

All components accept `className` prop for custom styling:

```tsx
<Button className="my-custom-class">Click me</Button>
<StatCard className="bg-blue-50" label="Custom" value={100} />
```

## Feedback

If you find any issues or have suggestions, please let us know!
