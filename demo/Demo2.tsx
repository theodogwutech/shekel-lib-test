import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../src/components/Input/Input';
import { PasswordInput } from '../src/components/Input/PasswordInput';
import { CurrencyInput } from '../src/components/Input/CurrencyInput';
import { PhoneInput } from '../src/components/Input/PhoneInput';
import { OTPInput } from '../src/components/Input/OTPInput';
import { SelectInput } from '../src/components/Input/SelectInput';
import { DatePicker } from '../src/components/Input/DatePicker';
import { DateRangePicker } from '../src/components/Input/DateRangePicker';
import { AmountInput } from '../src/components/Input/AmountInput';
import { Steps } from '../src/components/Steps';
import { FileUpload } from '../src/components/Input/FileUpload';
import { RadioCardGroup } from '../src/components/Input/RadioCardGroup';
import { Toggle } from '../src/components/Input/Toggle';
import { Checkbox } from '../src/components/Checkbox';
import flagNG from '../src/assets/flags/NG.svg';
import flagUS from '../src/assets/flags/US.svg';
import flagGB from '../src/assets/flags/GB.svg';
import flagGH from '../src/assets/flags/GH.svg';
import flagKE from '../src/assets/flags/KE.svg';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="bg-white rounded-2xl border border-[#E6E6E6] p-6 mb-6">
    <h2 className="text-lg font-semibold mb-4 text-[#181918]">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Demo2: React.FC = () => {
  const [email, setEmail] = useState('');
  const [searchValue, setSearchValue] = useState('shekel');
  const [phone, setPhone] = useState('');
  const { control, watch } = useForm({
    defaultValues: { fullName: '', username: '' },
  });

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-6 md:p-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#181918] mb-1">
            Demo 2 — Input without Antd
          </h1>
          <p className="text-sm text-gray-600">
            This page does <strong>not</strong> import <code>antd/dist/reset.css</code> and does{' '}
            <strong>not</strong> wrap in <code>ConfigProvider</code>. The Input below should look
            identical to the 2.1.x version regardless.
          </p>
        </header>

        <Section title="Basic states">
          <Input
            label="Email Address"
            placeholder="ben@shekel.africa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="We'll never share your email"
          />
          <Input
            label="Email Address (Error State)"
            placeholder="ben@shekel.africa"
            error="Please enter a valid email address"
            required
          />
          <Input
            label="Disabled Input"
            placeholder="Can't type here"
            value="locked value"
            disabled
          />
          <Input
            label="Read-only Input"
            value="read-only value"
            readOnly
          />
        </Section>

        <Section title="Required, label extras, and custom required mark">
          <Input label="Full Name" placeholder="Enter name" required />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            required
            labelExtra={
              <a href="#forgot" className="text-xs text-[#EC615B] hover:underline">
                Forgot?
              </a>
            }
          />
          <Input
            label="Middle Name"
            placeholder="Optional"
            requiredMark={
              <span className="ml-1 text-xs text-gray-400">(optional)</span>
            }
            required
          />
          <Input
            label={<span>Email <span className="text-xs text-gray-400 ml-1">(primary)</span></span>}
            placeholder="ReactNode label"
          />
        </Section>

        <Section title="Prefix and suffix (inside the border)">
          <Input
            label="Search — prefix icon + allowClear suffix"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            allowClear
            prefix={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
            }
          />
          <Input
            label="Amount — text prefix + text suffix"
            prefix={<span className="text-[#181918]">₦</span>}
            suffix={<span className="text-xs text-gray-500">NGN</span>}
            placeholder="0.00"
          />
          <Input
            label="ReactNode suffix (button)"
            placeholder="Type something"
            suffix={
              <button
                type="button"
                onClick={() => alert('Suffix action!')}
                className="text-xs font-medium text-[#EC615B] hover:underline"
              >
                Action
              </button>
            }
          />
          <Input
            label="Icon prefix + icon suffix"
            placeholder="Verified email"
            prefix={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="1.8">
                <path d="M4 6h16v12H4z" />
                <path d="m4 6 8 7 8-7" />
              </svg>
            }
            suffix={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
        </Section>

        <Section title="Addons (attached pills outside the border)">
          <Input
            label="Amount — NGN addonBefore"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            addonBefore="NGN"
            placeholder="0.00"
          />
          <Input
            label="Website — both addons"
            addonBefore="https://"
            addonAfter=".com"
            placeholder="shekel"
          />
          <Input
            label="ReactNode addonAfter (button)"
            placeholder="Enter promo code"
            addonAfter={
              <button
                type="button"
                className="px-2 py-1 -mx-3 -my-2 text-xs font-medium text-white bg-[#EC615B] rounded-r-[10px] hover:opacity-90"
                onClick={() => alert('Applied!')}
              >
                Apply
              </button>
            }
          />
        </Section>

        <Section title="react-hook-form integration">
          <Controller
            control={control}
            name="fullName"
            rules={{ required: 'Full name is required' }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Full Name (RHF)"
                placeholder="Enter name"
                required
                error={fieldState.error?.message}
              />
            )}
          />
          <Input
            control={control as any}
            name="username"
            label="Username (via control prop)"
            placeholder="@handle"
            required
          />
          <pre className="text-xs bg-[#F5F5F5] p-3 rounded-lg overflow-auto text-[#555]">
            {JSON.stringify(watch(), null, 2)}
          </pre>
        </Section>

        <Section title="Password Input">
          <PasswordInput label="Password" placeholder="Enter password" required />
          <PasswordInput
            label="Password (error)"
            placeholder="Enter password"
            error="Password must be at least 8 characters"
            required
          />
          <PasswordInput
            label="Password (no toggle)"
            placeholder="Enter password"
            visibilityToggle={false}
          />
          <PasswordInput
            label="Password (disabled)"
            placeholder="Enter password"
            disabled
          />
        </Section>

        <Section title="Currency Input">
          <CurrencyInput label="Amount" placeholder="Enter amount" />
          <CurrencyInput
            label="Amount (formatted)"
            placeholder="0.00"
            formatAmount
          />
          <CurrencyInput
            label="USD Amount"
            currencySymbol="$"
            formatAmount
            placeholder="0.00"
          />
          <CurrencyInput
            label="Amount (error)"
            error="Amount is required"
            required
          />
        </Section>

        <Section title="Phone Input">
          <PhoneInput
            label="Phone Number"
            placeholder="81 2345 6789"
            defaultCountryCode="+234"
          />
          <PhoneInput
            label="US Phone"
            placeholder="(555) 123-4567"
            defaultCountryCode="+1"
            format="default"
          />
          <PhoneInput
            label="Static country code"
            placeholder="Phone number"
            countryCode="+234"
            showCountryCodeDropdown={false}
          />
          <PhoneInput
            label="Phone (error)"
            placeholder="Phone number"
            error="Please enter a valid phone number"
            required
          />
          <PhoneInput
            label="Phone with flags"
            placeholder="81 2345 6789"
            defaultCountryCode="+234"
            countryCodes={[
              { value: '+234', label: '+234', flag: flagNG },
              { value: '+1', label: '+1', flag: flagUS },
              { value: '+44', label: '+44', flag: flagGB },
              { value: '+233', label: '+233', flag: flagGH },
              { value: '+254', label: '+254', flag: flagKE },
            ]}
          />
        </Section>

        <Section title="Select Input">
          <SelectInput
            label="Country"
            required
            placeholder="Select a country"
            defaultValue="NG"
            options={[
              { value: 'NG', label: 'Nigeria' },
              { value: 'GH', label: 'Ghana' },
              { value: 'KE', label: 'Kenya' },
              { value: 'ZA', label: 'South Africa' },
              { value: 'US', label: 'United States' },
              { value: 'GB', label: 'United Kingdom' },
            ]}
            onChange={(v) => console.log('country:', v)}
          />
          <SelectInput
            label="Account Type (searchable + error)"
            required
            showSearch
            placeholder="Pick one"
            error="This field is required"
            labelExtra={<a href="#help" className="text-xs text-[#EC615B]">Need help?</a>}
            options={[
              { value: 'savings', label: 'Savings' },
              { value: 'current', label: 'Current' },
              { value: 'domiciliary', label: 'Domiciliary' },
              { value: 'fixed', label: 'Fixed Deposit', disabled: true },
            ]}
          />
          <SelectInput
            label="Interests (multiple)"
            mode="multiple"
            allowClear
            showSearch
            placeholder="Pick one or more"
            options={[
              { value: 'tech', label: 'Technology' },
              { value: 'finance', label: 'Finance' },
              { value: 'health', label: 'Health' },
              { value: 'travel', label: 'Travel' },
              { value: 'food', label: 'Food' },
              { value: 'music', label: 'Music' },
            ]}
            helperText="Type to search, click to add, press backspace to remove"
          />
          <SelectInput
            label="Disabled Select"
            disabled
            defaultValue="NG"
            options={[{ value: 'NG', label: 'Nigeria' }]}
          />
        </Section>

        <Section title="Amount Input">
          <AmountInput label="Amount" placeholder="0.00" />
          <AmountInput
            label="Amount (enforce 2 decimals on blur)"
            placeholder="0.00"
            enforceDecimals
            helperText='Type "1234", click away → "1,234.00"'
          />
          <AmountInput
            label="Integer only (no decimals)"
            placeholder="0"
            allowDecimals={false}
          />
          <AmountInput
            label="European format (. thousand, , decimal)"
            placeholder="0,00"
            thousandSeparator="."
            decimalSeparator=","
            enforceDecimals
          />
          <AmountInput
            label="With prefix (₦)"
            placeholder="0.00"
            enforceDecimals
            prefix={<span>₦</span>}
          />
          <AmountInput
            label="Error state"
            placeholder="0.00"
            error="Amount is required"
            required
          />
        </Section>

        <Section title="Date Picker">
          <DatePicker
            label="Date of Birth"
            required
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
          />
          <DatePicker
            label="Appointment (default value)"
            defaultValue="2026-05-14"
            format="MMM D, YYYY"
          />
          <DatePicker
            label="Start Date (min today)"
            minDate={new Date()}
            format="YYYY-MM-DD"
            helperText="Can't pick past dates"
          />
          <DatePicker
            label="Weekends disabled"
            disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}
            helperText="Only weekdays selectable"
          />
          <DatePicker
            label="Error state"
            error="Please pick a valid date"
            required
          />
          <DatePicker label="Disabled" disabled defaultValue="2026-04-18" />
        </Section>

        <Section title="Date Range Picker">
          <DateRangePicker
            label="Date Range"
            required
            format="DD/MM/YYYY"
            onChange={(range, str) => console.log('range:', range, str)}
          />
          <DateRangePicker
            label="Trip dates (default value)"
            defaultValue={['2026-05-10', '2026-05-17']}
            format="MMM D, YYYY"
          />
          <DateRangePicker
            label="Future only"
            minDate={new Date()}
            helperText="Can't pick past dates"
          />
          <DateRangePicker
            label="Weekends disabled"
            disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}
          />
          <DateRangePicker
            label="Error state"
            error="Please pick a valid range"
            required
          />
          <DateRangePicker label="Disabled" disabled defaultValue={['2026-04-01', '2026-04-30']} />
          <DateRangePicker
            label="Single panel view"
            singlePanel
            helperText="Only one month at a time"
          />
          <DateRangePicker
            label="With presets"
            presets={[
              { label: 'Last 7 days', value: [new Date(Date.now() - 6 * 86400000), new Date()] },
              { label: 'Last 30 days', value: [new Date(Date.now() - 29 * 86400000), new Date()] },
              { label: 'This month', value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()] },
            ]}
          />
        </Section>

        <Section title="Toggle (switch)">
          <Toggle defaultChecked label="I will require clearing financing" />
          <Toggle label="I will require clearing financing" />
          <Toggle label="Small" size="sm" defaultChecked />
          <Toggle label="Large" size="lg" />
          <Toggle label="Disabled on" disabled defaultChecked />
          <Toggle label="Disabled off" disabled />
          <Toggle label="Loading" loading defaultChecked />
          <Toggle label="Custom colors" onColor="#14B8A6" offColor="#D1D5DB" />
        </Section>

        <Section title="Checkbox">
          <Checkbox defaultChecked label="Save Bank Information" />
          <Checkbox label="Unchecked option" />
          <Checkbox label="Disabled checked" disabled defaultChecked />
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Filled variant" variant="filled" defaultChecked />
          <Checkbox label="Small" size="sm" defaultChecked />
          <Checkbox label="Large" size="lg" defaultChecked />
          <Checkbox label="Label on left" labelPosition="left" defaultChecked />
          <Checkbox label="Custom teal" accentColor="#14B8A6" defaultChecked />
        </Section>

        <Section title="CurrencyInput — Max button addon">
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
          <CurrencyInput
            label="USD amount + From wallet addon"
            currencySymbol="$"
            formatAmount
            placeholder="0.00"
            addonAfter={
              <button
                type="button"
                className="text-xs font-medium text-[#EC615B]"
              >
                From wallet
              </button>
            }
          />
          <CurrencyInput
            label="No currency pill, custom addon"
            hideCurrencyPill
            formatAmount
            placeholder="0.00"
            addonBefore="USD"
            addonAfter={
              <span className="text-xs text-[#8C8C8C]">≈ ₦820.00</span>
            }
          />
        </Section>

        <Section title="Radio Card Group">
          <RadioCardGroup
            defaultValue="import"
            options={[
              {
                value: 'import',
                label: 'Import Funding',
                description: 'Buying from overseas or auctions.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 17l1.5-1.5a3 3 0 014 0L10 17M10 17l1.5-1.5a3 3 0 014 0L17 17M17 17l1-1a3 3 0 014 0M12 3v10M6 10l6-7 6 7M7 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                value: 'local',
                label: 'Local Funding',
                description: 'Buying within the country.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 17h14M5 17l-1-6a2 2 0 012-2h12a2 2 0 012 2l-1 6M5 17v2a1 1 0 001 1h1a1 1 0 001-1v-2M19 17v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2M7 14h2M15 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                value: 'clearing',
                label: 'Clearing Funding',
                description: 'Funding related to vehicle clearing.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
            ]}
            onChange={(v) => console.log('funding:', v)}
          />
          <div className="mt-6">
            <div className="text-xs text-gray-500 uppercase mb-3">Without icons</div>
            <RadioCardGroup
              defaultValue="monthly"
              options={[
                { value: 'monthly', label: 'Monthly', description: '₦5,000 / month' },
                { value: 'yearly', label: 'Yearly', description: '₦50,000 / year' },
                { value: 'lifetime', label: 'Lifetime', description: 'One-time payment' },
              ]}
            />
          </div>
          <div className="mt-6">
            <div className="text-xs text-gray-500 uppercase mb-3">Label only (no description)</div>
            <RadioCardGroup
              defaultValue="card"
              options={[
                { value: 'card', label: 'Card' },
                { value: 'transfer', label: 'Bank transfer' },
                { value: 'ussd', label: 'USSD' },
              ]}
            />
          </div>
        </Section>

        <Section title="File Upload">
          <FileUpload
            label="CAC Document"
            required
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            maxSize={2 * 1024 * 1024}
            fileTypesLabel="PDF, JPG, PNG and DOC"
          />
          <FileUpload
            label="Profile Picture"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            fileTypesLabel="JPG, PNG"
          />
          <FileUpload
            label="Bulk documents (grid preview)"
            accept=".pdf,.jpg,.png,.doc,.docx"
            multiple
            maxFiles={6}
            previewLayout="grid"
            fileTypesLabel="PDF, JPG, PNG and DOC"
            maxSize={2 * 1024 * 1024}
          />
          <FileUpload
            label="With simulated upload"
            accept=".pdf,.png,.jpg"
            maxSize={2 * 1024 * 1024}
            fileTypesLabel="PDF, JPG, PNG"
            onUpload={async (_file, { onProgress }) => {
              for (let i = 0; i <= 100; i += 10) {
                await new Promise((r) => setTimeout(r, 100));
                onProgress(i);
              }
              return { url: 'https://example.com/fake-uploaded' };
            }}
          />
          <FileUpload
            label="With error"
            error="Please upload your document"
            required
            accept=".pdf"
            fileTypesLabel="PDF"
          />
          <FileUpload label="Disabled" disabled fileTypesLabel="PDF, JPG, PNG" />
        </Section>

        <Section title="Steps (vertical)">
          <div className="max-w-md">
            <Steps
              current={0}
              items={[
                { title: 'Dealer Information' },
                { title: 'Verification Document' },
                { title: 'Lot Registration' },
              ]}
            />
          </div>
        </Section>

        <Section title="Steps — other states & variants">
          <div className="max-w-md space-y-8">
            <div>
              <h3 className="text-xs text-gray-500 uppercase mb-3">Middle step active</h3>
              <Steps
                current={1}
                items={[
                  { title: 'Account created' },
                  { title: 'Personal info' },
                  { title: 'Review' },
                ]}
              />
            </div>
            <div>
              <h3 className="text-xs text-gray-500 uppercase mb-3">With descriptions + connectors</h3>
              <Steps
                current={1}
                showConnector
                items={[
                  { title: 'Basic info', description: 'Completed on Apr 17' },
                  { title: 'Documents', description: 'Upload proof of identity' },
                  { title: 'Approval', description: 'Reviewed by compliance' },
                ]}
              />
            </div>
            <div>
              <h3 className="text-xs text-gray-500 uppercase mb-3">With error state</h3>
              <Steps
                current={1}
                items={[
                  { title: 'Started' },
                  { title: 'Validation', status: 'error', description: 'Some fields are invalid' },
                  { title: 'Done' },
                ]}
              />
            </div>
            <div>
              <h3 className="text-xs text-gray-500 uppercase mb-3">Horizontal</h3>
              <Steps
                current={1}
                direction="horizontal"
                showConnector
                items={[
                  { title: 'Cart' },
                  { title: 'Shipping' },
                  { title: 'Payment' },
                  { title: 'Done' },
                ]}
              />
            </div>
            <div>
              <h3 className="text-xs text-gray-500 uppercase mb-3">Custom accent (teal)</h3>
              <Steps
                current={2}
                activeColor="#14B8A6"
                items={[
                  { title: 'Step 1' },
                  { title: 'Step 2' },
                  { title: 'Step 3' },
                ]}
              />
            </div>
          </div>
        </Section>

        <Section title="Customization — alternate accent colors">
          <Input label="Blue accent" accentColor="#1890FF" placeholder="Focus me" />
          <Input label="Green accent + custom error" accentColor="#10B981" errorColor="#F59E0B" error="Warning-style error" />
          <SelectInput
            label="Purple select"
            accentColor="#8B5CF6"
            options={[
              { value: 'a', label: 'Alpha' },
              { value: 'b', label: 'Beta' },
              { value: 'c', label: 'Gamma' },
            ]}
          />
          <DatePicker label="Teal date picker" accentColor="#14B8A6" />
          <DateRangePicker label="Indigo range" accentColor="#6366F1" />
        </Section>

        <Section title="OTP Input">
          <OTPInput length={6} />
          <OTPInput length={4} showSeparator={false} />
          <OTPInput length={6} error errorMessage="Invalid OTP" />
          <OTPInput length={6} disabled />
        </Section>

        <Section title="Interaction checks">
          <p className="text-xs text-gray-600">
            Hover, focus, type, clear, blur — the border should fade to <span className="text-[#EC615B] font-medium">#EC615B</span> on
            hover/focus with a soft shadow. Error-state inputs should stay red.
          </p>
          <Input label="Hover me" placeholder="Move your mouse here" />
          <Input label="Focus me" placeholder="Click me" />
          <Input label="Clear me" defaultValue="type and clear" allowClear />
        </Section>

        <footer className="text-xs text-gray-500 mt-8 text-center">
          If any of these look different from what you see on 2.1.x in a consumer app with antd fully set up,
          tell Claude — that's the deviation to fix.
        </footer>
      </div>
    </div>
  );
};

export default Demo2;
