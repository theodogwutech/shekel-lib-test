# Changelog

All notable changes to this project will be documented in this file.

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
