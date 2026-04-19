import React from 'react';
import { Button } from '../../../src/components/Button';
import { Card } from '../../../src/components/Card';
import { TabsComponent } from '../../../src/components/TabsComponent';
import { Badge } from '../../../src/components/Badge';
import { Progress } from '../../../src/components/Progress';
import { CountrySelector } from '../../../src/components/CountrySelector';
import { Section, Example } from '../Showcase';

const PlusIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ArrowRightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TrashIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const HeartIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ButtonSection: React.FC = () => (
  <Section
    id="button"
    title="Button"
    description="Rich button with 6 variants, 6 sizes, 3 shapes, icon slots, loading, ripple effect, hover lift, press scale, keyboard-focus ring, and granular color overrides. Microinteractions tuned to feel snappy."
    importStatement={`import { Button } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'variant', type: 'primary | secondary | outline | ghost | link | text', default: 'primary', description: 'Visual style.' },
      { name: 'size', type: 'xxsmall | xsmall | small | medium | large | xlarge', default: 'large', description: 'Button height (24 / 32 / 40 / 48 / 52 / 60px).' },
      { name: 'shape', type: 'default | circle | square', default: 'default', description: 'circle/square render as icon-only, width === height.' },
      { name: 'rounded', type: 'none | sm | md | lg | xl | full', description: 'Corner radius override (full = pill).' },
      { name: 'danger', type: 'boolean', description: 'Apply danger palette (red) — works across all variants.' },
      { name: 'htmlType', type: 'button | submit | reset', default: 'button', description: 'Native type attr.' },
      { name: 'block', type: 'boolean', description: 'Full-width button.' },
      { name: 'loading', type: 'boolean', description: 'Shows spinner; disables clicks.' },
      { name: 'loadingText', type: 'ReactNode', description: 'Replaces children while loading.' },
      { name: 'icon', type: 'ReactNode', description: 'Icon rendered alongside children (or alone for circle/square shapes).' },
      { name: 'iconPosition', type: 'left | right', default: 'left', description: 'Where to put the icon.' },
      { name: 'ripple', type: 'boolean', default: 'true', description: 'Material-style ripple on click.' },
      { name: 'hoverLift', type: 'boolean', default: 'false', description: 'Raises the button on hover (translateY + shadow).' },
      { name: 'pressScale', type: 'boolean', default: 'true', description: 'Scales down slightly on press for tactile feel.' },
      { name: 'disabled', type: 'boolean', description: 'Disabled state.' },
      { name: 'bgColor / textColor / borderColor', type: 'string', description: 'Resting color overrides.' },
      { name: 'hoverBgColor / hoverTextColor / hoverBorderColor', type: 'string', description: 'Hover color overrides.' },
      { name: 'disabledBgColor / disabledTextColor', type: 'string', description: 'Disabled color overrides.' },
      { name: 'focusRingColor', type: 'string', description: 'Override the keyboard focus ring color.' },
    ]}
  >
    <Example
      title="Variants"
      code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="text">Text</Button>
<Button variant="primary" danger>Danger</Button>
<Button variant="primary" disabled>Disabled</Button>`}
    >
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="text">Text</Button>
        <Button variant="primary" danger>
          Danger
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </Example>

    <Example
      title="Sizes (six presets)"
      code={`<Button size="xxsmall">24px</Button>
<Button size="xsmall">32px</Button>
<Button size="small">40px</Button>
<Button size="medium">48px</Button>
<Button size="large">52px</Button>
<Button size="xlarge">60px</Button>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button size="xxsmall">XXSmall</Button>
        <Button size="xsmall">XSmall</Button>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
        <Button size="xlarge">XLarge</Button>
      </div>
    </Example>

    <Example
      title="Shapes — icon-only"
      code={`<Button shape="circle" icon={<PlusIcon />} aria-label="Add" />
<Button shape="square" icon={<TrashIcon />} variant="outline" danger aria-label="Delete" />
<Button shape="circle" size="small" icon={<HeartIcon />} variant="ghost" aria-label="Favorite" />`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button shape="circle" icon={PlusIcon} aria-label="Add" />
        <Button shape="square" icon={TrashIcon} variant="outline" danger aria-label="Delete" />
        <Button shape="circle" size="small" icon={HeartIcon} variant="ghost" aria-label="Favorite" />
        <Button shape="circle" size="xlarge" icon={ArrowRightIcon} aria-label="Next" />
      </div>
    </Example>

    <Example
      title="Rounded (pill + other radii)"
      code={`<Button rounded="none">Square</Button>
<Button rounded="sm">Small</Button>
<Button rounded="md">Medium</Button>
<Button rounded="xl">XL</Button>
<Button rounded="full">Pill</Button>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button rounded="none">Square</Button>
        <Button rounded="sm">Small</Button>
        <Button rounded="md">Medium</Button>
        <Button rounded="xl">XL</Button>
        <Button rounded="full">Pill</Button>
      </div>
    </Example>

    <Example
      title="Icon placement + loading"
      code={`<Button icon={<PlusIcon />}>Add item</Button>
<Button icon={<ArrowRightIcon />} iconPosition="right">Continue</Button>
<Button loading>Saving...</Button>
<Button loading loadingText="Processing..." variant="outline">Submit</Button>`}
    >
      <div className="flex flex-wrap gap-3">
        <Button icon={PlusIcon}>Add item</Button>
        <Button icon={ArrowRightIcon} iconPosition="right">
          Continue
        </Button>
        <Button loading>Saving...</Button>
        <Button loading loadingText="Processing..." variant="outline">
          Submit
        </Button>
      </div>
    </Example>

    <Example
      title="Microinteractions — hover lift + press scale + ripple"
      code={`<Button hoverLift>Hover to lift</Button>
<Button hoverLift variant="outline">Hover + press</Button>
<Button ripple={false}>No ripple</Button>
<Button pressScale={false}>No press scale</Button>`}
    >
      <div className="flex flex-wrap gap-3">
        <Button hoverLift>Hover to lift</Button>
        <Button hoverLift variant="outline">
          Hover + press
        </Button>
        <Button ripple={false}>No ripple</Button>
        <Button pressScale={false} variant="ghost">
          No press scale
        </Button>
      </div>
    </Example>

    <Example
      title="Custom colors — full palette override"
      code={`<Button
  bgColor="#0F172A"
  textColor="#FFFFFF"
  borderColor="#0F172A"
  hoverBgColor="#1E293B"
  focusRingColor="rgba(15, 23, 42, 0.25)"
>
  Custom dark
</Button>

<Button
  variant="outline"
  borderColor="#14B8A6"
  textColor="#14B8A6"
  hoverBgColor="#CCFBF1"
  hoverTextColor="#0F766E"
  hoverBorderColor="#0D9488"
>
  Teal outline
</Button>`}
    >
      <div className="flex flex-wrap gap-3">
        <Button
          bgColor="#0F172A"
          textColor="#FFFFFF"
          borderColor="#0F172A"
          hoverBgColor="#1E293B"
          focusRingColor="rgba(15, 23, 42, 0.25)"
        >
          Custom dark
        </Button>
        <Button
          variant="outline"
          borderColor="#14B8A6"
          textColor="#14B8A6"
          hoverBgColor="#CCFBF1"
          hoverTextColor="#0F766E"
          hoverBorderColor="#0D9488"
        >
          Teal outline
        </Button>
        <Button bgColor="#8B5CF6" hoverBgColor="#7C3AED" focusRingColor="rgba(139, 92, 246, 0.25)">
          Purple
        </Button>
      </div>
    </Example>

    <Example
      title="Full-width (block) and submit type"
      code={`<Button block htmlType="submit">Proceed to Dashboard</Button>`}
    >
      <div className="max-w-sm">
        <Button block htmlType="submit" hoverLift>
          Proceed to Dashboard
        </Button>
      </div>
    </Example>
  </Section>
);

export const CardSection: React.FC = () => (
  <Section
    id="card"
    title="Card"
    description="Basic container with optional title/extra header, shadow, and border. Useful as a wrapper for content blocks."
    importStatement={`import { Card } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'title', type: 'ReactNode', description: 'Header title.' },
      { name: 'extra', type: 'ReactNode', description: 'Right-aligned content in the header.' },
      { name: 'shadow', type: 'none | sm | md | lg | xl', default: 'md', description: 'Drop-shadow depth.' },
      { name: 'bordered', type: 'boolean', default: 'true', description: 'Show the outer 1px border.' },
      { name: 'hoverable', type: 'boolean', description: 'Raises the shadow on hover.' },
      { name: 'cover', type: 'ReactNode', description: 'Content above the header (image, etc.).' },
    ]}
  >
    <Example
      title="Basic"
      code={`<Card title="Card Title" extra={<a href="#">More</a>}>
  Content goes here
</Card>`}
    >
      <Card title="Card Title" extra={<a href="#" className="text-sm text-[#EC615B]">More</a>}>
        <p className="text-sm text-[#595959] m-0">This is a simple card with a header and body content.</p>
      </Card>
    </Example>

    <Example
      title="Shadows"
      code={`<Card shadow="sm">sm</Card>
<Card shadow="md">md</Card>
<Card shadow="lg">lg</Card>`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card shadow="sm">
          <div className="text-sm">Shadow sm</div>
        </Card>
        <Card shadow="md">
          <div className="text-sm">Shadow md</div>
        </Card>
        <Card shadow="lg" hoverable>
          <div className="text-sm">Shadow lg (hoverable)</div>
        </Card>
      </div>
    </Example>
  </Section>
);

export const TabsSection: React.FC = () => (
  <Section
    id="tabs"
    title="TabsComponent"
    description="Horizontal tabs with an underline indicator. Controlled and uncontrolled modes are both supported."
    importStatement={`import { TabsComponent } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'items', type: '{ key, label, children, disabled? }[]', description: 'Tab definitions.' },
      { name: 'defaultActiveKey', type: 'string', description: 'Initial active key (uncontrolled).' },
      { name: 'activeKey', type: 'string', description: 'Controlled active key.' },
      { name: 'onChange', type: '(key: string) => void', description: 'Fires on tab click.' },
      { name: 'accentColor', type: 'string', default: '#EC615B', description: 'Active tab + underline color.' },
    ]}
  >
    <Example
      title="Basic"
      code={`<TabsComponent
  defaultActiveKey="personal"
  items={[
    { key: 'personal', label: 'Personal Information', children: <div>Personal...</div> },
    { key: 'security', label: 'Security', children: <div>Security...</div> },
    { key: 'billing',  label: 'Billing',  children: <div>Billing...</div> },
  ]}
/>`}
    >
      <TabsComponent
        defaultActiveKey="personal"
        items={[
          {
            key: 'personal',
            label: 'Personal Information',
            children: (
              <div className="p-4 bg-[#F5F5F5] rounded-lg text-sm">
                Personal content goes here.
              </div>
            ),
          },
          {
            key: 'security',
            label: 'Security',
            children: (
              <div className="p-4 bg-[#F5F5F5] rounded-lg text-sm">
                Security content goes here.
              </div>
            ),
          },
          {
            key: 'billing',
            label: 'Billing',
            children: (
              <div className="p-4 bg-[#F5F5F5] rounded-lg text-sm">Billing content goes here.</div>
            ),
          },
        ]}
      />
    </Example>
  </Section>
);

export const BadgeSection: React.FC = () => (
  <Section
    id="badge"
    title="Badge"
    description="Inline status pill for labels, counts, or categories."
    importStatement={`import { Badge } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'variant', type: 'default | primary | success | warning | danger | info', default: 'default', description: 'Preset color.' },
      { name: 'size', type: 'sm | md | lg | responsive', default: 'md', description: 'Pill size.' },
      { name: 'dot', type: 'boolean', description: 'Render a status dot prefix.' },
      { name: 'icon', type: 'ReactNode', description: 'Icon inside the pill.' },
      { name: 'rounded', type: 'none | sm | md | lg | full', default: 'full', description: 'Border radius preset.' },
      { name: 'bgColor / textColor / borderColor', type: 'string', description: 'Manual color overrides.' },
    ]}
  >
    <Example
      title="Variants"
      code={`<Badge variant="primary">New</Badge>
<Badge variant="success">Paid</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Failed</Badge>
<Badge variant="info">Info</Badge>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="primary">New</Badge>
        <Badge variant="success">Paid</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="danger">Failed</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="default">Default</Badge>
      </div>
    </Example>
    <Example title="With dot" code={`<Badge dot variant="success">Online</Badge>`}>
      <Badge dot variant="success">Online</Badge>
    </Example>
  </Section>
);

export const ProgressSection: React.FC = () => (
  <Section
    id="progress"
    title="Progress"
    description="Horizontal progress bar with percentage, status, and custom colors."
    importStatement={`import { Progress } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'percent', type: 'number', description: '0–100.' },
      { name: 'status', type: 'normal | success | exception | active', default: 'normal', description: 'Tint/animation.' },
      { name: 'showInfo', type: 'boolean', default: 'true', description: 'Show the percentage label.' },
      { name: 'strokeColor', type: 'string', description: 'Override bar color.' },
      { name: 'size', type: 'sm | md | lg', default: 'md', description: 'Bar thickness.' },
    ]}
  >
    <Example
      title="States"
      code={`<Progress percent={30} />
<Progress percent={60} status="active" />
<Progress percent={100} status="success" />
<Progress percent={50} status="exception" />`}
    >
      <div className="space-y-3">
        <Progress percent={30} />
        <Progress percent={60} status="active" />
        <Progress percent={100} status="success" />
        <Progress percent={50} status="exception" />
      </div>
    </Example>
  </Section>
);

export const CountrySelectorSection: React.FC = () => (
  <Section
    id="country-selector"
    title="CountrySelector"
    description="Ready-to-use country picker built on SelectInput with circular flag avatars. Pass your own `countries` list for custom coverage."
    importStatement={`import { CountrySelector } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'defaultCountry', type: 'string', default: 'NG', description: 'Initial country code.' },
      { name: 'value', type: 'string', description: 'Controlled selection.' },
      { name: 'onCountryChange', type: '(code: string) => void', description: 'Fires on selection.' },
      { name: 'countries', type: '{ code, name, flag }[]', description: 'Custom countries list (defaults to NG/US/GB/GH/KE/ZA).' },
      { name: 'showSearch', type: 'boolean', default: 'false', description: 'Enable search input inside the dropdown.' },
      { name: 'flagSize', type: 'number', default: '24', description: 'Avatar flag size.' },
    ]}
  >
    <Example title="Default" code={`<CountrySelector defaultCountry="NG" onCountryChange={(code) => ...} />`}>
      <CountrySelector defaultCountry="NG" />
    </Example>
    <Example title="Searchable" code={`<CountrySelector defaultCountry="NG" showSearch />`}>
      <CountrySelector defaultCountry="NG" showSearch />
    </Example>
  </Section>
);
