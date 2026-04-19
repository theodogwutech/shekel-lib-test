# Changelog

All notable changes to this project will be documented in this file.

## [3.0.0] - 2026-04-19

> Major release. The library is now **antd-free** and self-contained. Consumers don't need to install `antd`, `@ant-design/icons`, or set up `antd/dist/reset.css` + `ConfigProvider` anymore.

### Why a major version
A lot of component internals changed while the public APIs mostly held their shape. Because we no longer import antd's types (`InputProps`, `ButtonProps`, `SelectProps`, etc.), any consumer code that leaned on those specific antd-extended types will need to switch to our own exported prop interfaces. The defaults are designed to be drop-in for everyday usage. Apps pinned to `^2.x` won't auto-upgrade — upgrade deliberately when you're ready.

### Removed antd
- `antd` and `@ant-design/icons` are no longer peer dependencies
- `ShekelProvider` no longer wraps `ConfigProvider` — it sets CSS variables + a lightweight React context. Existing usage still works.

### Rewritten without antd
`Input`, `PasswordInput`, `CurrencyInput`, `AmountInput` (new), `PhoneInput`, `OTPInput`, `SelectInput`, `DatePicker`, `DateRangePicker` (new), `FileUpload` (new), `RadioCardGroup` (new), `Toggle` (new), `Checkbox`, `Steps`, `UserPill`, `UserCard`, `UserProfileDropdown`, `Button`, `Card`, `TabsComponent`, `CountrySelector`, `Modal`.

### Highlights
- **Portal-rendered dropdowns** for `DatePicker`, `DateRangePicker`, `SelectInput` — no more clipping inside cards/modals with `overflow: hidden`
- **Antd-style tab ink bar** — sliding underline animation on `TabsComponent`
- **Full-featured `Modal`**: 3×3 `placement` grid, `motion` variants, `backdrop: normal/blur/none`, `bare` mode for empty canvases, focus trap, body scroll lock, async `onOk`, `submitOnEnter`
- **Enhanced `Button`**: 6 sizes, 6 variants + `danger`, 3 shapes, 6 `rounded` presets, ripple, hover lift, press scale, granular color overrides
- **`FileUpload`**: drag-and-drop, type/size validation, async upload with progress, list + grid preview, `onPreview` hook
- **`RadioCardGroup`**, **`Toggle`**, **`AmountInput`**, **`DateRangePicker`** — all new
- Every form input supports `accentColor`, `errorColor`, `borderColor`, `filledBorderColor` for theming
- Refreshed error icon across all inputs (outlined circle with `!`, `#C21919`)

### Responsive defaults
- `Modal`: overlay padding tightens, footer buttons stack full-width on mobile
- `TabsComponent`: horizontal scroll when tabs overflow
- `DateRangePicker`: auto single-panel under 640px
- `FileUpload`: stacks vertically on mobile
- `OTPInput`: boxes flex-shrink proportionally
- `RadioCardGroup`: flows 1/2/3/4 columns based on available width
- All popovers cap their width at `calc(100vw - 16px)`

### Docs
- New `/docs.html` (now the default entry) with sidebar nav, live examples, code snippets, prop tables for 28+ components
- Legacy antd demo still available at `/app.html`; quick playground at `/demo2.html`

### Breaking changes
- `Button` no longer extends `AntButtonProps`. Exports include `ButtonVariant`, `ButtonSize`, `ButtonShape`, `ButtonRounded`.
- `Modal` prop shape expanded significantly; simple usage (`open`/`onClose`/`title`/`onOk`) still works
- `Steps`: process state is now dark (not red); finish state is red with check
- `UserProfileDropdown.menuItems` uses the library's own `UserProfileMenuItem` type
- `CountrySelector` is now a wrapper around `SelectInput` (was antd `Select`)
- Input refs are `HTMLInputElement` (was antd `InputRef`)
- `TabsComponent` tab `label` is `ReactNode` (was `string`)

### Install
```sh
npm install shekel-fe-shared-lib@^3.0.0
```

```tsx
import 'shekel-fe-shared-lib/styles.css';
import { Input, Modal, Button } from 'shekel-fe-shared-lib';
```

---

## [1.0.11] - 2026-03-15

### Added

#### Input Components
- **Input** - Text input component with label, helper text, error states, and Ant Design integration
- **PasswordInput** - Password input with show/hide toggle functionality
- **PhoneInput** - Phone number input with integrated country selector
- **CurrencyInput** - Currency input with automatic thousand separator formatting
- **OTPInput** - One-time password input with individual digit boxes

#### User Components
- **UserPill** - Compact user display component with avatar and subtitle
- **UserCard** - Full user profile card with gradient background and profile information
- **UserProfileDropdown** - Dropdown menu for user profile actions and settings

#### Dashboard Components
- **DashboardCard** - Enhanced metric cards with:
  - Ledger balance display
  - Visibility toggle for sensitive data
  - Custom background patterns
  - Customizable width
  - Hover animations with uniform shadows
- **ActionCard** - Quick action buttons with:
  - Icon support
  - Label and sublabel
  - Hover effects
  - Click handlers
- **StatCard** (Enhanced) - Updated with:
  - Badge support (top-right corner)
  - Custom hex colors for icons (iconBackgroundColor, iconColor)
  - Customizable width
  - Progress text
  - Hover animations

#### Other Components
- **NotificationDropdown** - Notification list component with:
  - Custom icons with configurable colors
  - Empty state with illustration
  - Count badge
  - "View More" action
  - Scrollable list
  - Individual notification click handlers
- **TabsComponent** - Ant Design tabs with custom styling:
  - Coral/red active tab color (#EC615B)
  - Reduced spacing for compact layout
  - Smooth transitions
- **CountrySelector** - Country selection dropdown with:
  - Flag icons
  - Search functionality (optional)
  - Round flag display
  - Custom country lists

### Changed
- Updated **Button** component with improved variants and styling
- Updated **Card** component with better props and layout
- Updated **StatCard** component with new features (see above)
- Added **Plus Jakarta Sans** font as default font family
- Updated styles with Ant Design input customizations
- Enhanced Tailwind configuration with custom font family

### Deprecated
- **SearchInput** - Deprecated in favor of the new `Input` component
  - Migration guide available in DEPRECATION.md
  - Console warnings added in development mode
  - Will be removed in v2.0.0

### Dependencies
- Added `antd` ^6.3.1 as a dependency

### Documentation
- Created DEPRECATION.md with migration guides
- Updated README.md with new component examples
- Created comprehensive demo showcasing all new components
- Added usage examples for all new components

### Assets
- Added flag images for country selector
- Added empty state SVG for notifications
- Added card background pattern SVG

---

## [1.0.10] - Previous Release

Previous version with original component set.

---

## Migration Guide

To upgrade from v1.0.10 to v1.0.11:

1. Install the new version:
   ```bash
   npm install shekel-fe-shared-lib@latest
   ```

2. Install Ant Design peer dependency (if not already installed):
   ```bash
   npm install antd
   ```

3. Import Ant Design styles in your app:
   ```tsx
   import 'antd/dist/reset.css';
   ```

4. Replace deprecated components:
   - Replace `SearchInput` with `Input`
   - See DEPRECATION.md for detailed migration steps

5. Test your application to ensure all components work correctly

---

For more information about deprecated components and migration paths, see [DEPRECATION.md](./DEPRECATION.md).
