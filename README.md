# Shekel FE Shared Lib

A shared component library built with **Ant Design** and **Tailwind CSS** for React applications.

## Installation

```bash
npm install shekel-fe-shared-lib
```

## Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom antd
```

## Usage

### Import Components

```tsx
import { Button } from 'shekel-fe-shared-lib';
import 'shekel-fe-shared-lib/styles.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Button variant="success" fullWidth>Full Width Button</Button>
    </div>
  );
}
```

### Tailwind CSS Setup

If your project uses Tailwind CSS, you should add this library to your `tailwind.config.js` content array to enable proper purging:

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

A customizable button component that extends Ant Design's Button with Tailwind CSS styling.

#### Props

- `variant`: `'primary' | 'secondary' | 'success' | 'danger'` - Button color variant (default: `'primary'`)
- `fullWidth`: `boolean` - Whether the button should take full width (default: `false`)
- All other props from Ant Design's `ButtonProps`

#### Examples

```tsx
// Primary button
<Button variant="primary">Primary</Button>

// Success button
<Button variant="success">Success</Button>

// Full width button
<Button fullWidth>Full Width</Button>

// With onClick handler
<Button variant="danger" onClick={() => console.log('clicked')}>
  Delete
</Button>
```

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
│   │   └── index.ts
│   ├── styles.css
│   └── index.ts
├── dist/              # Built files (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## License

ISC
