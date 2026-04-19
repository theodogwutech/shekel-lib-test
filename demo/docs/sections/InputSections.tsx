import React, { useState } from 'react';
import { Input } from '../../../src/components/Input/Input';
import { PasswordInput } from '../../../src/components/Input/PasswordInput';
import { CurrencyInput } from '../../../src/components/Input/CurrencyInput';
import { AmountInput } from '../../../src/components/Input/AmountInput';
import { PhoneInput } from '../../../src/components/Input/PhoneInput';
import { OTPInput } from '../../../src/components/Input/OTPInput';
import { Section, Example } from '../Showcase';
import flagNG from '../../../src/assets/flags/NG.svg';
import flagUS from '../../../src/assets/flags/US.svg';
import flagGB from '../../../src/assets/flags/GB.svg';

export const InputSection: React.FC = () => (
  <Section
    id="input"
    title="Input"
    description="Standard text input with label, error, helper text, prefix/suffix, and attached addons. Integrates with react-hook-form via control prop."
    importStatement={`import { Input } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'label', type: 'ReactNode', description: 'Text or JSX rendered above the input.' },
      { name: 'labelClassName', type: 'string', description: 'Extra class on the <label> element.' },
      { name: 'labelStyle', type: 'CSSProperties', description: 'Inline style for the label.' },
      { name: 'labelExtra', type: 'ReactNode', description: 'Content to the right of the label (e.g. "Forgot?" link).' },
      { name: 'requiredMark', type: 'ReactNode', default: '*', description: 'Override the red asterisk.' },
      { name: 'required', type: 'boolean', description: 'Shows the required mark and forwards to <input>.' },
      { name: 'error', type: 'string', description: 'Error message rendered below the input.' },
      { name: 'helperText', type: 'string', description: 'Helper text rendered below when no error.' },
      { name: 'prefix', type: 'ReactNode', description: 'Icon/text inside the left of the border.' },
      { name: 'suffix', type: 'ReactNode', description: 'Icon/text inside the right of the border.' },
      { name: 'addonBefore', type: 'ReactNode', description: 'Attached pill on the outer left.' },
      { name: 'addonAfter', type: 'ReactNode', description: 'Attached pill on the outer right.' },
      { name: 'allowClear', type: 'boolean', default: 'false', description: 'Shows an × to clear when a value exists.' },
      { name: 'accentColor', type: 'string', default: '#EC615B', description: 'Focus/hover border color.' },
      { name: 'errorColor', type: 'string', default: '#C21919', description: 'Error state color.' },
      { name: 'borderColor', type: 'string', default: '#D9D9D9', description: 'Default empty border color.' },
      { name: 'filledBorderColor', type: 'string', default: '#181918', description: 'Border color when the input has a value.' },
      { name: 'control', type: 'Control<any>', description: 'react-hook-form controller (use with `name`).' },
      { name: 'name', type: 'string', description: 'Form field name.' },
      { name: '…NativeInputProps', type: 'HTMLInputAttrs', description: 'All native input attrs — type, value, onChange, etc.' },
    ]}
  >
    <Example
      title="Basic"
      code={`<Input label="Email" placeholder="ben@shekel.africa" helperText="We'll never share your email" />`}
    >
      <Input label="Email" placeholder="ben@shekel.africa" helperText="We'll never share your email" />
    </Example>

    <Example
      title="Required + error"
      code={`<Input label="Email" placeholder="ben@shekel.africa" required error="Please enter a valid email" />`}
    >
      <Input label="Email" placeholder="ben@shekel.africa" required error="Please enter a valid email" />
    </Example>

    <Example
      title="Prefix + suffix (inside border)"
      code={`<Input
  label="Search"
  prefix={<SearchIcon />}
  allowClear
  placeholder="Type to search..."
/>`}
    >
      <Input
        label="Search"
        placeholder="Type to search..."
        allowClear
        prefix={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
        }
      />
    </Example>

    <Example
      title="Addon before/after (outside border)"
      code={`<Input label="Website" addonBefore="https://" addonAfter=".com" placeholder="shekel" />`}
    >
      <Input label="Website" addonBefore="https://" addonAfter=".com" placeholder="shekel" />
    </Example>

    <Example
      title="labelExtra — right-aligned link in the label row"
      code={`<Input
  label="Password"
  type="password"
  labelExtra={<a href="#" className="text-xs text-[#EC615B]">Forgot?</a>}
/>`}
    >
      <Input
        label="Password"
        type="password"
        labelExtra={
          <a href="#" className="text-xs text-[#EC615B] hover:underline">
            Forgot?
          </a>
        }
      />
    </Example>

    <Example
      title="Custom accent color"
      code={`<Input label="Teal-accented" accentColor="#14B8A6" placeholder="Focus me" />`}
    >
      <Input label="Teal-accented" accentColor="#14B8A6" placeholder="Focus me" />
    </Example>
  </Section>
);

export const PasswordInputSection: React.FC = () => (
  <Section
    id="password-input"
    title="PasswordInput"
    description="Password input with a visibility toggle. Dots are rendered larger (20px) and red when an error is present; revealed text is normal size."
    importStatement={`import { PasswordInput } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'visibilityToggle', type: 'boolean', default: 'true', description: 'Show/hide the eye toggle button.' },
      { name: '…InputProps', type: '-', description: 'All props from Input (except type and suffix).' },
    ]}
  >
    <Example title="Basic" code={`<PasswordInput label="Password" placeholder="Enter password" required />`}>
      <PasswordInput label="Password" placeholder="Enter password" required />
    </Example>
    <Example title="Error state (dots turn red)" code={`<PasswordInput label="Password" error="Password must be at least 8 characters" />`}>
      <PasswordInput label="Password" error="Password must be at least 8 characters" />
    </Example>
    <Example title="No toggle" code={`<PasswordInput label="Password" visibilityToggle={false} />`}>
      <PasswordInput label="Password" visibilityToggle={false} />
    </Example>
  </Section>
);

export const CurrencyInputSection: React.FC = () => (
  <Section
    id="currency-input"
    title="CurrencyInput"
    description="Currency input with a colored symbol pill. Supports formatting with commas, custom addons, and react-hook-form."
    importStatement={`import { CurrencyInput } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'currencySymbol', type: 'string', default: '₦', description: 'Symbol shown in the left pill.' },
      { name: 'formatAmount', type: 'boolean', default: 'false', description: 'Format with thousand-comma separators as the user types.' },
      { name: 'addonBefore', type: 'ReactNode', description: 'Additional pill before the currency.' },
      { name: 'addonAfter', type: 'ReactNode', description: 'Pill at the right (e.g. a "Max" button).' },
      { name: 'currencyPillBgColor', type: 'string', default: '#F0F2F4', description: 'Background of the symbol pill.' },
      { name: 'currencyPillColor', type: 'string', default: '#000000', description: 'Symbol text color.' },
      { name: 'hideCurrencyPill', type: 'boolean', default: 'false', description: 'Hide the symbol pill entirely.' },
      { name: 'onChange', type: '(value: string, e) => void', description: 'Fires with the raw numeric string (no commas).' },
    ]}
  >
    <Example title="Basic with formatting" code={`<CurrencyInput label="Amount" formatAmount placeholder="0.00" />`}>
      <CurrencyInput label="Amount" formatAmount placeholder="0.00" />
    </Example>
    <Example
      title='With "Max" addon'
      code={`<CurrencyInput
  label="Amount to withdraw"
  formatAmount
  placeholder="0.00"
  addonAfter={<button type="button">Max</button>}
/>`}
    >
      <CurrencyInput
        label="Amount to withdraw"
        formatAmount
        placeholder="0.00"
        addonAfter={
          <button
            type="button"
            onClick={() => alert('Set to max')}
            className="text-sm font-medium text-[#181918] hover:text-[#EC615B]"
          >
            Max
          </button>
        }
      />
    </Example>
    <Example
      title="USD with different symbol + error"
      code={`<CurrencyInput label="USD amount" currencySymbol="$" formatAmount error="Amount is required" />`}
    >
      <CurrencyInput label="USD amount" currencySymbol="$" formatAmount error="Amount is required" />
    </Example>
  </Section>
);

export const AmountInputSection: React.FC = () => (
  <Section
    id="amount-input"
    title="AmountInput"
    description="Number input with commas and optional decimal enforcement, without a currency pill. Use for quantities, percentages, amounts where the currency label lives elsewhere."
    importStatement={`import { AmountInput } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'decimals', type: 'number', default: '2', description: 'Max decimal places allowed.' },
      { name: 'enforceDecimals', type: 'boolean', default: 'false', description: 'Pad decimals with zeros on blur (e.g. 1234 → 1,234.00).' },
      { name: 'allowDecimals', type: 'boolean', default: 'true', description: 'Integer-only mode when false.' },
      { name: 'thousandSeparator', type: 'string', default: ',', description: 'Thousand separator character.' },
      { name: 'decimalSeparator', type: 'string', default: '.', description: 'Decimal separator character.' },
      { name: 'onChange', type: '(value: string, e?) => void', description: 'Fires with the raw string (no thousands separators).' },
    ]}
  >
    <Example title="Basic" code={`<AmountInput label="Amount" placeholder="0.00" />`}>
      <AmountInput label="Amount" placeholder="0.00" />
    </Example>
    <Example
      title="Enforce 2 decimals on blur"
      code={`<AmountInput label="Amount" enforceDecimals placeholder="0.00" helperText='Type "1234", tab away to see "1,234.00"' />`}
    >
      <AmountInput
        label="Amount"
        enforceDecimals
        placeholder="0.00"
        helperText='Type "1234", tab away to see "1,234.00"'
      />
    </Example>
    <Example
      title="European format"
      code={`<AmountInput label="Amount" thousandSeparator="." decimalSeparator="," enforceDecimals />`}
    >
      <AmountInput label="Amount" thousandSeparator="." decimalSeparator="," enforceDecimals placeholder="0,00" />
    </Example>
  </Section>
);

export const PhoneInputSection: React.FC = () => (
  <Section
    id="phone-input"
    title="PhoneInput"
    description="Phone number input with country-code dropdown (with optional flags), format-as-you-type, and paste normalization."
    importStatement={`import { PhoneInput } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'countryCode', type: 'string', description: 'Controlled country code.' },
      { name: 'defaultCountryCode', type: 'string', default: '+234', description: 'Uncontrolled default.' },
      { name: 'countryCodes', type: '{ value, label, flag? }[]', description: 'Options for the dropdown. Add `flag: string` (URL) for circular flags.' },
      { name: 'showCountryCodeDropdown', type: 'boolean', default: 'true', description: 'False renders a static code display.' },
      { name: 'format', type: 'default | spaced | dashed | none', default: 'spaced', description: 'How the phone number is formatted.' },
      { name: 'customFormat', type: '(raw) => string', description: 'Full custom formatter.' },
    ]}
  >
    <Example title="Basic" code={`<PhoneInput label="Phone Number" placeholder="81 2345 6789" />`}>
      <PhoneInput label="Phone Number" placeholder="81 2345 6789" />
    </Example>
    <Example
      title="With flags"
      code={`<PhoneInput
  label="Phone Number"
  defaultCountryCode="+234"
  countryCodes={[
    { value: '+234', label: '+234', flag: flagNG },
    { value: '+1',   label: '+1',   flag: flagUS },
    { value: '+44',  label: '+44',  flag: flagGB },
  ]}
/>`}
    >
      <PhoneInput
        label="Phone Number"
        defaultCountryCode="+234"
        countryCodes={[
          { value: '+234', label: '+234', flag: flagNG },
          { value: '+1', label: '+1', flag: flagUS },
          { value: '+44', label: '+44', flag: flagGB },
        ]}
      />
    </Example>
    <Example
      title="Static code display"
      code={`<PhoneInput label="Phone" countryCode="+234" showCountryCodeDropdown={false} />`}
    >
      <PhoneInput label="Phone" countryCode="+234" showCountryCodeDropdown={false} placeholder="81 2345 6789" />
    </Example>
  </Section>
);

export const OTPInputSection: React.FC = () => {
  const [otp, setOtp] = useState('');
  return (
    <Section
      id="otp-input"
      title="OTPInput"
      description="Segmented input for one-time codes. Paste-from-clipboard works out of the box."
      importStatement={`import { OTPInput } from 'shekel-fe-shared-lib';`}
      props={[
        { name: 'length', type: 'number', default: '6', description: 'Number of digit boxes.' },
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'onChange', type: '(value: string) => void', description: 'Fires on each keystroke.' },
        { name: 'onComplete', type: '(value: string) => void', description: 'Fires when all boxes are filled.' },
        { name: 'error', type: 'boolean', description: 'Turns boxes red.' },
        { name: 'errorMessage', type: 'string', description: 'Rendered below when error is true.' },
        { name: 'showSeparator', type: 'boolean', default: 'true', description: 'Em-dash between halves.' },
        { name: 'boxWidth', type: 'number', default: '63', description: 'Each box width in px.' },
        { name: 'boxHeight', type: 'number', default: '44', description: 'Each box height in px.' },
      ]}
    >
      <Example
        title="Basic 6-digit"
        code={`<OTPInput length={6} value={otp} onChange={setOtp} onComplete={(v) => console.log('done', v)} />`}
      >
        <OTPInput length={6} value={otp} onChange={setOtp} />
      </Example>
      <Example title="4-digit, no separator" code={`<OTPInput length={4} showSeparator={false} />`}>
        <OTPInput length={4} showSeparator={false} />
      </Example>
      <Example title="Error state" code={`<OTPInput length={6} error errorMessage="Invalid code" />`}>
        <OTPInput length={6} error errorMessage="Invalid code" />
      </Example>
    </Section>
  );
};
