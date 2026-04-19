import React from 'react';
import {
  InputSection,
  PasswordInputSection,
  CurrencyInputSection,
  AmountInputSection,
  PhoneInputSection,
  OTPInputSection,
} from './docs/sections/InputSections';
import {
  SelectInputSection,
  DatePickerSection,
  DateRangePickerSection,
} from './docs/sections/SelectSections';
import {
  FileUploadSection,
  RadioCardGroupSection,
  ToggleSection,
  CheckboxSection,
  StepsSection,
} from './docs/sections/OtherSections';
import {
  StatCardSection,
  DashboardCardSection,
  NotificationDropdownSection,
  ActionCardSection,
} from './docs/sections/CardSections';
import {
  UserPillSection,
  UserCardSection,
  UserProfileDropdownSection,
} from './docs/sections/UserSections';
import {
  ButtonSection,
  CardSection,
  TabsSection,
  BadgeSection,
  ProgressSection,
  CountrySelectorSection,
} from './docs/sections/LayoutSections';
import { ModalSection } from './docs/sections/ModalSection';
import {
  DropdownSection,
  TableSection,
  TableTopSection,
  SelectedItemsListSection,
} from './docs/sections/DataSections';

const NAV = [
  {
    group: 'Text inputs',
    items: [
      { id: 'input', label: 'Input' },
      { id: 'password-input', label: 'PasswordInput' },
      { id: 'currency-input', label: 'CurrencyInput' },
      { id: 'amount-input', label: 'AmountInput' },
      { id: 'phone-input', label: 'PhoneInput' },
      { id: 'otp-input', label: 'OTPInput' },
    ],
  },
  {
    group: 'Selection',
    items: [
      { id: 'select-input', label: 'SelectInput' },
      { id: 'radio-card-group', label: 'RadioCardGroup' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'toggle', label: 'Toggle' },
    ],
  },
  {
    group: 'Date',
    items: [
      { id: 'date-picker', label: 'DatePicker' },
      { id: 'date-range-picker', label: 'DateRangePicker' },
    ],
  },
  {
    group: 'Cards & widgets',
    items: [
      { id: 'stat-card', label: 'StatCard' },
      { id: 'dashboard-card', label: 'DashboardCard' },
      { id: 'action-card', label: 'ActionCard' },
      { id: 'notification-dropdown', label: 'NotificationDropdown' },
    ],
  },
  {
    group: 'User',
    items: [
      { id: 'user-pill', label: 'UserPill' },
      { id: 'user-card', label: 'UserCard' },
      { id: 'user-profile-dropdown', label: 'UserProfileDropdown' },
    ],
  },
  {
    group: 'Layout & misc',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'card', label: 'Card' },
      { id: 'tabs', label: 'TabsComponent' },
      { id: 'badge', label: 'Badge' },
      { id: 'progress', label: 'Progress' },
      { id: 'country-selector', label: 'CountrySelector' },
    ],
  },
  {
    group: 'Data',
    items: [
      { id: 'table', label: 'Table' },
      { id: 'table-top', label: 'TableTop' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'selected-items-list', label: 'SelectedItemsList' },
    ],
  },
  {
    group: 'Other',
    items: [
      { id: 'modal', label: 'Modal' },
      { id: 'file-upload', label: 'FileUpload' },
      { id: 'steps', label: 'Steps' },
    ],
  },
];

const Docs: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#181918] font-['Plus_Jakarta_Sans',sans-serif]">
      <header className="bg-white border-b border-[#E6E6E6] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-bold text-[#181918]">Shekel UI</h1>
            <span className="text-sm text-[#8C8C8C]">Component documentation</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/demo2.html" className="text-[#595959] hover:text-[#181918]">
              Quick demo
            </a>
            <a href="/app.html" className="text-[#595959] hover:text-[#181918]">
              Legacy (antd)
            </a>
            <span className="text-xs text-[#8C8C8C]">v2.1.0</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 flex gap-10">
        <aside className="hidden md:block w-56 shrink-0 pt-8 sticky top-[73px] self-start h-[calc(100vh-73px)] overflow-auto">
          {NAV.map((g) => (
            <div key={g.group} className="mb-6">
              <div className="text-xs font-semibold text-[#8C8C8C] uppercase tracking-wider mb-2">
                {g.group}
              </div>
              <ul className="space-y-1">
                {g.items.map((i) => (
                  <li key={i.id}>
                    <a
                      href={`#${i.id}`}
                      className="block text-sm text-[#595959] hover:text-[#EC615B] py-1"
                    >
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <main className="flex-1 min-w-0 py-8">
          <div className="mb-12 p-6 bg-white border border-[#E6E6E6] rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Getting started</h2>
            <p className="text-sm text-[#595959] mb-4">
              Install the library and import the components you need. Every component is
              self-contained (no antd dependency), fully responsive, and styled to match the
              Shekel design system.
            </p>
            <div className="text-xs text-[#595959] bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-3 mb-4 leading-relaxed">
              <b className="text-[#181918]">Responsive defaults</b>: tabs scroll horizontally when
              overflowing, modal footers stack on mobile and the panel tightens its padding,
              DateRangePicker collapses to one panel under 640px, popup menus cap their width to
              the viewport, FileUpload stacks vertically on mobile, and RadioCardGroup flows cards
              into however many columns fit. No extra configuration required.
            </div>
            <pre className="bg-[#181918] text-[#F5F5F5] text-xs rounded-lg p-4 overflow-auto leading-relaxed">
              <code>{`# Install
npm install shekel-fe-shared-lib

# Import styles once at your app entry
import 'shekel-fe-shared-lib/styles.css';

# Use any component
import { Input, SelectInput, DatePicker } from 'shekel-fe-shared-lib';

export default function MyForm() {
  return (
    <>
      <Input label="Email" required />
      <SelectInput label="Country" options={[...]} />
      <DatePicker label="Date of Birth" />
    </>
  );
}`}</code>
            </pre>
            <p className="text-xs text-[#8C8C8C] mt-4">
              All form inputs support react-hook-form via <code className="text-[#181918]">control</code> + <code className="text-[#181918]">name</code> props.
              All components accept <code className="text-[#181918]">accentColor</code> and <code className="text-[#181918]">errorColor</code> for theming.
            </p>
          </div>

          <InputSection />
          <PasswordInputSection />
          <CurrencyInputSection />
          <AmountInputSection />
          <PhoneInputSection />
          <OTPInputSection />
          <SelectInputSection />
          <DatePickerSection />
          <DateRangePickerSection />
          <RadioCardGroupSection />
          <CheckboxSection />
          <ToggleSection />
          <StatCardSection />
          <DashboardCardSection />
          <ActionCardSection />
          <NotificationDropdownSection />
          <UserPillSection />
          <UserCardSection />
          <UserProfileDropdownSection />
          <ButtonSection />
          <CardSection />
          <TabsSection />
          <BadgeSection />
          <ProgressSection />
          <CountrySelectorSection />
          <TableSection />
          <TableTopSection />
          <DropdownSection />
          <SelectedItemsListSection />
          <ModalSection />
          <FileUploadSection />
          <StepsSection />
        </main>
      </div>

      <footer className="border-t border-[#E6E6E6] bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-xs text-[#8C8C8C] text-center">
          Shekel UI — built with React + Tailwind, no antd runtime required.
        </div>
      </footer>
    </div>
  );
};

export default Docs;
