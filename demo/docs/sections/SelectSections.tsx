import React from 'react';
import { SelectInput } from '../../../src/components/Input/SelectInput';
import { DatePicker } from '../../../src/components/Input/DatePicker';
import { DateRangePicker } from '../../../src/components/Input/DateRangePicker';
import { Section, Example } from '../Showcase';

export const SelectInputSection: React.FC = () => (
  <Section
    id="select-input"
    title="SelectInput"
    description="Dropdown select with built-in search, rich options (title + description), multiple-select with tags, keyboard navigation, and antd-style dropdown animation. The panel auto-flips above the trigger when there isn't enough room below — useful for selects placed near the bottom of a modal or viewport."
    importStatement={`import { SelectInput } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'options', type: '{ value, label, description?, disabled? }[]', description: '`label` and `description` both accept ReactNode, so you can render flags, chips, or any custom markup alongside plain strings.' },
      { name: 'value / defaultValue', type: 'string | number | any[]', description: 'Controlled or uncontrolled.' },
      { name: 'mode', type: 'single | multiple', default: 'single', description: 'Multiple enables tag-style selection.' },
      { name: 'showSearch', type: 'boolean', default: 'true', description: 'Shows a search input at the top of the dropdown + allows inline typing in the trigger.' },
      { name: 'allowClear', type: 'boolean', default: 'true', description: 'Hover shows × to clear the value.' },
      { name: 'filterOption', type: '(input, option) => boolean | false', description: 'Custom filter; false disables filtering.' },
      { name: 'optionFilterProp', type: 'label | value', default: 'label', description: 'Which field the default filter matches on.' },
      { name: 'optionRender', type: '(option, { selected }) => ReactNode', description: 'Custom render for each dropdown option.' },
      { name: 'prefixIcon', type: 'ReactNode', description: 'Icon on the left inside the trigger.' },
      { name: 'suffixIcon', type: 'ReactNode', description: 'Replaces the default chevron (pass null to hide).' },
      { name: 'accentColor', type: 'string', default: '#EC615B', description: 'Selected-item + focus color.' },
      { name: 'selectedBgColor', type: 'string', description: 'Override the selected option bg tint.' },
      { name: 'tagBgColor', type: 'string', default: '#F5F5F5', description: 'Background of multi-select tags.' },
    ]}
  >
    <Example
      title="Basic single-select"
      code={`<SelectInput
  label="Country"
  defaultValue="NG"
  options={[
    { value: 'NG', label: 'Nigeria' },
    { value: 'GH', label: 'Ghana' },
    { value: 'KE', label: 'Kenya' },
  ]}
/>`}
    >
      <SelectInput
        label="Country"
        defaultValue="NG"
        options={[
          { value: 'NG', label: 'Nigeria' },
          { value: 'GH', label: 'Ghana' },
          { value: 'KE', label: 'Kenya' },
          { value: 'ZA', label: 'South Africa' },
        ]}
      />
    </Example>

    <Example
      title="Rich options with description"
      code={`<SelectInput
  label="Dealer"
  options={[
    { value: 'oliver', label: 'Oliver Motors', description: 'Oliver Andrews · ID324212' },
    { value: 'falcon', label: 'Falcon Motors', description: 'Lara Falcon · ID324213' },
    { value: 'nova',   label: 'Nova Motors',   description: 'Ethan Nova · ID324214' },
  ]}
/>`}
    >
      <SelectInput
        label="Dealer"
        placeholder="Select a dealer"
        options={[
          { value: 'oliver', label: 'Oliver Motors', description: 'Oliver Andrews · ID324212' },
          { value: 'falcon', label: 'Falcon Motors', description: 'Lara Falcon · ID324213' },
          { value: 'nova', label: 'Nova Motors', description: 'Ethan Nova · ID324214' },
          { value: 'pinnacle', label: 'Pinnacle Motors', description: 'Ada Pinnacle · ID324215' },
        ]}
      />
    </Example>

    <Example
      title="Multiple with tags"
      code={`<SelectInput label="Interests" mode="multiple" options={[...]} />`}
    >
      <SelectInput
        label="Interests"
        mode="multiple"
        placeholder="Pick one or more"
        options={[
          { value: 'tech', label: 'Technology' },
          { value: 'finance', label: 'Finance' },
          { value: 'health', label: 'Health' },
          { value: 'travel', label: 'Travel' },
        ]}
        helperText="Backspace removes the last tag"
      />
    </Example>

    <Example
      title="Custom suffix icon (calendar)"
      code={`<SelectInput
  label="Year"
  required
  showSearch={false}
  defaultValue={2019}
  suffixIcon={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  }
  options={[2019, 2020, 2021, 2022, 2023].map((y) => ({ value: y, label: String(y) }))}
/>`}
    >
      <SelectInput
        label="Year"
        required
        showSearch={false}
        defaultValue={2019}
        suffixIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        }
        options={[2019, 2020, 2021, 2022, 2023].map((y) => ({ value: y, label: String(y) }))}
      />
    </Example>

    <Example
      title="ReactNode labels (flags + custom markup)"
      code={`<SelectInput
  label="Country"
  optionFilterProp="value"
  options={[
    { value: 'NG', label: <span>🇳🇬 Nigeria</span> },
    { value: 'GH', label: <span>🇬🇭 Ghana</span> },
    { value: 'KE', label: <span>🇰🇪 Kenya</span> },
  ]}
/>`}
    >
      <SelectInput
        label="Country"
        placeholder="Select a country"
        optionFilterProp="value"
        options={[
          { value: 'NG', label: <span>🇳🇬 Nigeria</span> },
          { value: 'GH', label: <span>🇬🇭 Ghana</span> },
          { value: 'KE', label: <span>🇰🇪 Kenya</span> },
          { value: 'ZA', label: <span>🇿🇦 South Africa</span> },
        ]}
        helperText="When label is not a string, either pass optionFilterProp='value' or a custom filterOption."
      />
    </Example>
  </Section>
);

export const DatePickerSection: React.FC = () => (
  <Section
    id="date-picker"
    title="DatePicker"
    description="Single-date picker with quick year/month traversal (antd-style — click the month or year in the header to jump to a 12-month grid or a decade year grid), min/max bounds, disabled-date callback, and Today shortcut. No external date library required."
    importStatement={`import { DatePicker } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'value / defaultValue', type: 'Date | string | number | null', description: 'Accepts ISO strings, timestamps, or Date objects.' },
      { name: 'onChange', type: '(date, dateString) => void', description: 'Both the parsed Date and the formatted string are provided.' },
      { name: 'format', type: 'string', default: 'YYYY-MM-DD', description: 'Tokens: YYYY YY MMMM MMM MM M DD D.' },
      { name: 'minDate / maxDate', type: 'Date | string', description: 'Bounds for the picker.' },
      { name: 'disabledDate', type: '(date) => boolean', description: 'Per-day disable callback.' },
      { name: 'showToday', type: 'boolean', default: 'true', description: 'Shows the "Today" footer link.' },
      { name: 'firstDayOfWeek', type: '0 | 1', default: '0', description: '0 = Sunday, 1 = Monday.' },
    ]}
  >
    <Example
      title="Basic"
      code={`<DatePicker label="Date of Birth" format="DD/MM/YYYY" required />`}
    >
      <DatePicker label="Date of Birth" format="DD/MM/YYYY" required placeholder="DD/MM/YYYY" />
    </Example>
    <Example
      title="Bounded + weekends disabled"
      code={`<DatePicker label="Appointment" minDate={new Date()} disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6} />`}
    >
      <DatePicker
        label="Appointment"
        minDate={new Date()}
        disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}
        helperText="Future weekdays only"
      />
    </Example>
  </Section>
);

export const DateRangePickerSection: React.FC = () => (
  <Section
    id="date-range-picker"
    title="DateRangePicker"
    description="Two-month calendar with range selection, hover preview, active-slot underline, optional presets sidebar, and optional single-panel mode for narrow containers."
    importStatement={`import { DateRangePicker } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'value / defaultValue', type: '[from, to]', description: 'Tuple of dates (same accepted types as DatePicker).' },
      { name: 'onChange', type: '(range, rangeString) => void', description: 'Both date tuple and formatted strings are provided.' },
      { name: 'singlePanel', type: 'boolean', default: 'false', description: 'Render a single calendar instead of two side-by-side.' },
      { name: 'presets', type: '{ label, value: [from, to] }[]', description: 'Shortcut buttons on the left of the panel.' },
      { name: 'separator', type: 'ReactNode', description: 'Replace the default arrow between start and end.' },
      { name: 'placeholder', type: '[string, string]', default: "['Start date', 'End date']", description: 'Tuple of placeholders.' },
      { name: 'rangeBgColor', type: 'string', description: 'Override the in-range highlight background (defaults to light tint of accent).' },
    ]}
  >
    <Example title="Basic" code={`<DateRangePicker label="Date range" format="DD/MM/YYYY" />`}>
      <DateRangePicker label="Date range" format="DD/MM/YYYY" />
    </Example>
    <Example
      title="With presets"
      code={`<DateRangePicker
  label="Reporting period"
  presets={[
    { label: 'Last 7 days',  value: [new Date(Date.now() - 6 * 86400000), new Date()] },
    { label: 'Last 30 days', value: [new Date(Date.now() - 29 * 86400000), new Date()] },
  ]}
/>`}
    >
      <DateRangePicker
        label="Reporting period"
        presets={[
          { label: 'Last 7 days', value: [new Date(Date.now() - 6 * 86400000), new Date()] },
          { label: 'Last 30 days', value: [new Date(Date.now() - 29 * 86400000), new Date()] },
          { label: 'This month', value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()] },
        ]}
      />
    </Example>
    <Example
      title="Single panel (compact)"
      code={`<DateRangePicker label="Trip" singlePanel />`}
    >
      <DateRangePicker label="Trip" singlePanel />
    </Example>
  </Section>
);
