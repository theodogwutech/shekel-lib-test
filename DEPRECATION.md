# Deprecation Notice - v1.0.11

As of version **1.0.11**, the following components have been deprecated in favor of new, improved alternatives. The deprecated components will continue to work but will be removed in a future major version.

## Deprecated Components

### SearchInput
**Status:** Deprecated
**Replacement:** `Input`
**Reason:** The new `Input` component provides better functionality, consistent styling with Ant Design, and includes additional input types (Password, Phone, Currency, OTP).

#### Migration Guide

**Before (SearchInput):**
```tsx
import { SearchInput } from 'shekel-fe-shared-lib';

<SearchInput
  placeholder="Search..."
  icon={<SearchIcon />}
  iconPosition="left"
/>
```

**After (Input):**
```tsx
import { Input } from 'shekel-fe-shared-lib';

<Input
  placeholder="Search..."
  prefix={<SearchIcon />}
/>
```

---

## New Components in v1.0.11

The following components are now available:

### Input Components
- **Input** - Text input with label, helper text, and error states
- **PasswordInput** - Password input with show/hide toggle
- **PhoneInput** - Phone number input with country selector
- **CurrencyInput** - Currency input with automatic formatting
- **OTPInput** - One-time password input with individual digit boxes

### User Components
- **UserPill** - Compact user display with avatar
- **UserCard** - Full user card with profile information
- **UserProfileDropdown** - User profile dropdown menu

### Dashboard Components
- **DashboardCard** - Metric cards with ledger balance and visibility toggle
- **StatCard** - Enhanced stat cards with badge, custom colors, and width options
- **ActionCard** - Quick action buttons with icons

### Other Components
- **NotificationDropdown** - Notification list with custom icons and empty state
- **TabsComponent** - Tabs with custom Ant Design styling
- **CountrySelector** - Country selection with flags and search

---

## Migration Timeline

- **v1.0.11** (Current) - Deprecated components marked with warnings
- **v2.0.0** (Future) - Deprecated components will be removed

---

## Need Help?

If you need assistance migrating from deprecated components, please:
1. Check the migration examples above
2. Review the demo at `/demo/App.tsx` for complete examples
3. Contact the development team for support

---

**Last Updated:** March 15, 2026
**Version:** 1.0.11
