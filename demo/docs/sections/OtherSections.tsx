import React from 'react';
import { FileUpload } from '../../../src/components/Input/FileUpload';
import { RadioCardGroup } from '../../../src/components/Input/RadioCardGroup';
import { Toggle } from '../../../src/components/Input/Toggle';
import { Checkbox } from '../../../src/components/Checkbox';
import { Steps } from '../../../src/components/Steps';
import { Section, Example } from '../Showcase';

export const FileUploadSection: React.FC = () => (
  <Section
    id="file-upload"
    title="FileUpload"
    description="Drag-and-drop dropzone with browse, file type + size validation, async upload with progress, and list/grid previews with optional Preview + Delete actions. Multi-file uploads show a running count (“Uploading 2 of 5…”) and the preview list animates items in/out with a subtle hover lift."
    importStatement={`import { FileUpload } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'accept', type: 'string', description: '.pdf,.jpg or image/* syntax.' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow more than one file.' },
      { name: 'maxSize', type: 'number', description: 'Bytes. Validates on add.' },
      { name: 'maxFiles', type: 'number', description: 'Cap number of files.' },
      { name: 'fileTypesLabel', type: 'string', description: 'Used to build the hint line "Supported file types: PDF, JPG".' },
      { name: 'onUpload', type: '(file, { onProgress }) => Promise<{url?, thumbnailUrl?}>', description: 'Async upload hook — component tracks progress/status.' },
      { name: 'onChange', type: '(files: UploadedFile[]) => void', description: 'Fires on add/remove.' },
      { name: 'onPreview', type: '(file) => void', description: 'Custom handler for the Preview button — open a modal, route, etc. Defaults to opening the url in a new tab.' },
      { name: 'showPreviewAction', type: 'boolean', default: 'true', description: 'Hide the Preview/View button.' },
      { name: 'previewActionText', type: 'string', default: 'View', description: 'Button label.' },
      { name: 'previewButtonVariant', type: 'pill | text', default: 'pill', description: 'Pill = gray button with eye icon; text = red link.' },
      { name: 'showRemove', type: 'boolean', default: 'true', description: 'Show the trash icon.' },
      { name: 'previewLayout', type: 'list | grid', default: 'list', description: 'Grid tiles or a vertical list.' },
      { name: 'showCount', type: 'boolean', default: 'true', description: 'Show the "Uploading X of Y" busy line and the preview-section count header for multi-file uploads. Set `false` to hide both.' },
      { name: 'loading', type: 'boolean', description: 'Lock the dropzone (e.g. during form submission).' },
    ]}
  >
    <Example
      title="Basic (matches the CAC Document screenshot)"
      code={`<FileUpload
  label="CAC Document"
  required
  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
  maxSize={2 * 1024 * 1024}
  fileTypesLabel="PDF, JPG, PNG and DOC"
/>`}
    >
      <FileUpload
        label="CAC Document"
        required
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        maxSize={2 * 1024 * 1024}
        fileTypesLabel="PDF, JPG, PNG and DOC"
      />
    </Example>

    <Example
      title="With onPreview opening a modal"
      code={`<FileUpload
  label="Front View"
  onPreview={(file) => setPreviewFile(file)}  // open your modal
  accept="image/*,.pdf"
  maxSize={5 * 1024 * 1024}
  fileTypesLabel="JPG, PNG, PDF"
/>`}
    >
      <FileUpload
        label="Front View"
        onPreview={(f) => alert(`Preview: ${f.name}`)}
        accept="image/*,.pdf"
        maxSize={5 * 1024 * 1024}
        fileTypesLabel="JPG, PNG, PDF"
      />
    </Example>

    <Example
      title="Multiple, grid preview"
      code={`<FileUpload label="Documents" multiple maxFiles={6} previewLayout="grid" accept=".pdf,.jpg,.png" />`}
    >
      <FileUpload label="Documents" multiple maxFiles={6} previewLayout="grid" accept=".pdf,.jpg,.png" />
    </Example>

    <Example
      title="Simulated async upload with progress"
      code={`<FileUpload
  label="With simulated upload"
  onUpload={async (file, { onProgress }) => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 100));
      onProgress(i);
    }
    return { url: '/uploaded/' + file.name };
  }}
/>`}
    >
      <FileUpload
        label="With simulated upload"
        accept=".pdf,.png,.jpg"
        maxSize={2 * 1024 * 1024}
        fileTypesLabel="PDF, JPG, PNG"
        onUpload={async (file, { onProgress }) => {
          for (let i = 0; i <= 100; i += 10) {
            await new Promise((r) => setTimeout(r, 100));
            onProgress(i);
          }
          return { url: '/uploaded/' + file.name };
        }}
      />
    </Example>

    <Example
      title="Multiple upload with running count"
      code={`<FileUpload
  label="Gallery images"
  multiple
  maxFiles={5}
  accept="image/*,.pdf"
  fileTypesLabel="JPG, PNG, PDF"
  onUpload={async (file, { onProgress }) => {
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(r => setTimeout(r, 150));
      onProgress(i);
    }
    return { url: '/uploaded/' + file.name };
  }}
/>`}
    >
      <FileUpload
        label="Gallery images"
        multiple
        maxFiles={5}
        accept="image/*,.pdf"
        fileTypesLabel="JPG, PNG, PDF"
        onUpload={async (file, { onProgress }) => {
          for (let i = 0; i <= 100; i += 20) {
            await new Promise((r) => setTimeout(r, 150));
            onProgress(i);
          }
          return { url: '/uploaded/' + file.name };
        }}
      />
    </Example>
  </Section>
);

export const RadioCardGroupSection: React.FC = () => (
  <Section
    id="radio-card-group"
    title="RadioCardGroup"
    description="Card-based radio group. Each card shows optional icon, title, and description; selected card has a glow/border/shadow and a filled radio on the right. Fully themable — colors, typography, borders, and shadows can all be overridden."
    importStatement={`import { RadioCardGroup } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'options', type: '{ value, label, description?, icon?, disabled? }[]', description: 'One card per option.' },
      { name: 'value / defaultValue', type: 'string | number', description: 'Selected value.' },
      { name: 'layout', type: 'row | column', default: 'row', description: 'Direction.' },
      { name: 'columns', type: 'number', description: 'Fixed columns (overrides equalWidth).' },
      { name: 'cardHeight', type: 'number | string', default: '94', description: 'Card height.' },
      { name: 'iconSize', type: 'number', default: '20', description: 'Icon size in px.' },
      { name: 'titleSize', type: 'number', default: '12', description: 'Title font size in px.' },
      { name: 'descriptionSize', type: 'number', default: '12', description: 'Description font size.' },
      { name: 'radioSize', type: 'number', default: '24', description: 'Radio circle diameter.' },
      { name: 'variant', type: 'border | shadow | both', default: 'border', description: 'Card emphasis style. `border` = outline + glow on select; `shadow` = no border on unselected cards, selected card keeps its border + soft shadow; `both` = border plus soft shadow on every card.' },
      { name: 'accentColor', type: 'string', default: '#EC615B', description: 'Selected color + glow.' },
      { name: 'errorColor', type: 'string', default: '#EF4444', description: 'Border/text color when in error state.' },
      { name: 'borderColor', type: 'string', default: '#EEEEEE', description: 'Default card border color.' },
      { name: 'selectedBorderColor', type: 'string', description: 'Border color when selected (defaults to `accentColor`).' },
      { name: 'selectedGlowColor', type: 'string', description: 'Override the outer halo color.' },
      { name: 'textColor', type: 'string', default: '#131413', description: 'Title + icon color.' },
      { name: 'descriptionColor', type: 'string', default: '#8C8C8C', description: 'Description text color.' },
      { name: 'cardBgColor', type: 'string', default: 'white', description: 'Default card background.' },
      { name: 'selectedCardBgColor', type: 'string', description: 'Background when selected (defaults to `cardBgColor`).' },
      { name: 'radioBorderWidth', type: 'number', default: '1.5', description: 'Radio circle border thickness.' },
      { name: 'radioBorderColor', type: 'string', default: '#D1D1D1', description: 'Radio circle border color (unselected).' },
      { name: 'cardBorderWidth', type: 'number', default: '1.5', description: 'Card border thickness.' },
      { name: 'cardBorderRadius', type: 'number', default: '16', description: 'Card corner radius in px.' },
      { name: 'cardShadow', type: 'string', description: 'Custom box-shadow for unselected cards — pass any valid box-shadow (e.g. "0 2px 8px rgba(0,0,0,0.1)") to tune intensity/spread. Overrides the variant default.' },
      { name: 'selectedCardShadow', type: 'string', description: 'Custom box-shadow for the selected card — e.g. "0 6px 24px rgba(236,97,91,0.35)". Overrides the variant default.' },
      { name: 'titleWeight', type: 'number | string', default: '600', description: 'Title font weight.' },
      { name: 'descriptionWeight', type: 'number | string', default: '400', description: 'Description font weight.' },
      { name: 'titleLineHeight', type: 'number', default: '1.3', description: 'Title line height.' },
      { name: 'descriptionLineHeight', type: 'number', default: '1.3', description: 'Description line height.' },
    ]}
  >
    <Example
      title="Basic"
      code={`<RadioCardGroup
  defaultValue="import"
  options={[
    { value: 'import',   label: 'Import Funding',   description: 'Buying from overseas.' },
    { value: 'local',    label: 'Local Funding',    description: 'Buying within the country.' },
    { value: 'clearing', label: 'Clearing Funding', description: 'Vehicle clearing.' },
  ]}
/>`}
    >
      <RadioCardGroup
        defaultValue="import"
        options={[
          { value: 'import', label: 'Import Funding', description: 'Buying from overseas.' },
          { value: 'local', label: 'Local Funding', description: 'Buying within the country.' },
          { value: 'clearing', label: 'Clearing Funding', description: 'Vehicle clearing.' },
        ]}
      />
    </Example>

    <Example
      title="Without icons, pricing tiers"
      code={`<RadioCardGroup defaultValue="yearly" options={[
  { value: 'monthly',  label: 'Monthly',  description: '₦5,000 / month' },
  { value: 'yearly',   label: 'Yearly',   description: '₦50,000 / year' },
  { value: 'lifetime', label: 'Lifetime', description: 'One-time payment' },
]} />`}
    >
      <RadioCardGroup
        defaultValue="yearly"
        options={[
          { value: 'monthly', label: 'Monthly', description: '₦5,000 / month' },
          { value: 'yearly', label: 'Yearly', description: '₦50,000 / year' },
          { value: 'lifetime', label: 'Lifetime', description: 'One-time payment' },
        ]}
      />
    </Example>

    <Example
      title="Shadow variant (border only on the selected card)"
      code={`<RadioCardGroup
  variant="shadow"
  defaultValue="dealership"
  options={[
    { value: 'dealership', label: 'Dealership' },
    { value: 'auction',    label: 'Auction Centre' },
  ]}
/>`}
    >
      <RadioCardGroup
        variant="shadow"
        defaultValue="dealership"
        options={[
          { value: 'dealership', label: 'Dealership' },
          { value: 'auction', label: 'Auction Centre' },
        ]}
      />
    </Example>

    <Example
      title="Shadow variant — custom shadow via cardShadow / selectedCardShadow"
      code={`<RadioCardGroup
  variant="shadow"
  defaultValue="dealership"
  cardShadow="0 2px 10px rgba(17, 24, 39, 0.06)"
  selectedCardShadow="0 6px 24px rgba(236, 97, 91, 0.35)"
  options={[
    { value: 'dealership', label: 'Dealership' },
    { value: 'auction',    label: 'Auction Centre' },
  ]}
/>`}
    >
      <RadioCardGroup
        variant="shadow"
        defaultValue="dealership"
        cardShadow="0 2px 10px rgba(17, 24, 39, 0.06)"
        selectedCardShadow="0 6px 24px rgba(236, 97, 91, 0.35)"
        options={[
          { value: 'dealership', label: 'Dealership' },
          { value: 'auction', label: 'Auction Centre' },
        ]}
      />
    </Example>

    <Example
      title="Custom theming (colors, radius, typography)"
      code={`<RadioCardGroup
  defaultValue="card"
  accentColor="#0F766E"
  cardBgColor="#F8FAFC"
  selectedCardBgColor="#ECFDF5"
  textColor="#0F172A"
  descriptionColor="#475569"
  cardBorderRadius={8}
  cardBorderWidth={2}
  titleWeight={700}
  titleLineHeight={1.4}
  options={[
    { value: 'card',     label: 'Card',     description: 'Pay with debit or credit card' },
    { value: 'transfer', label: 'Transfer', description: 'Pay via bank transfer' },
  ]}
/>`}
    >
      <RadioCardGroup
        defaultValue="card"
        accentColor="#0F766E"
        cardBgColor="#F8FAFC"
        selectedCardBgColor="#ECFDF5"
        textColor="#0F172A"
        descriptionColor="#475569"
        cardBorderRadius={8}
        cardBorderWidth={2}
        titleWeight={700}
        titleLineHeight={1.4}
        options={[
          { value: 'card', label: 'Card', description: 'Pay with debit or credit card' },
          { value: 'transfer', label: 'Transfer', description: 'Pay via bank transfer' },
        ]}
      />
    </Example>
  </Section>
);

export const ToggleSection: React.FC = () => (
  <Section
    id="toggle"
    title="Toggle"
    description="Pill switch. 20px height default matching the Shekel design spec. Label sits on the side with proper keyboard a11y (role=switch)."
    importStatement={`import { Toggle } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'checked / defaultChecked', type: 'boolean', description: 'Controlled or uncontrolled.' },
      { name: 'onChange', type: '(checked, event) => void', description: 'Fires on toggle.' },
      { name: 'label', type: 'ReactNode', description: 'Text next to the switch.' },
      { name: 'labelPosition', type: 'left | right', default: 'right', description: 'Which side the label sits on.' },
      { name: 'size', type: 'sm | md | lg', default: 'md', description: 'sm=16px, md=20px, lg=26px track height.' },
      { name: 'trackWidth / trackHeight / knobSize', type: 'number', description: 'Fine-tune size.' },
      { name: 'onColor / offColor / knobColor', type: 'string', default: '#EC615B / #8C9196 / #fff', description: 'Track colors.' },
      { name: 'loading', type: 'boolean', description: 'Show a spinner inside the knob.' },
      { name: 'disabled', type: 'boolean', description: 'Disabled state.' },
    ]}
  >
    <Example title="Basic" code={`<Toggle label="I will require clearing financing" />`}>
      <Toggle label="I will require clearing financing" />
    </Example>
    <Example title="On by default" code={`<Toggle defaultChecked label="Auto-renew subscription" />`}>
      <Toggle defaultChecked label="Auto-renew subscription" />
    </Example>
    <Example title="Loading" code={`<Toggle loading defaultChecked label="Saving..." />`}>
      <Toggle loading defaultChecked label="Saving..." />
    </Example>
  </Section>
);

export const CheckboxSection: React.FC = () => (
  <Section
    id="checkbox"
    title="Checkbox"
    description="Red-outlined checkbox with a red check when selected. Supports indeterminate, filled variant, and RHF via the standard form patterns."
    importStatement={`import { Checkbox } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'checked / defaultChecked', type: 'boolean', description: 'Controlled or uncontrolled.' },
      { name: 'onChange', type: '(checked, event?) => void', description: 'Fires on toggle.' },
      { name: 'label', type: 'ReactNode', description: 'Text label.' },
      { name: 'labelPosition', type: 'left | right', default: 'right', description: 'Which side the label sits on.' },
      { name: 'size', type: 'sm | md | lg', default: 'md', description: 'Box size: 16 / 20 / 24.' },
      { name: 'variant', type: 'outline | filled', default: 'outline', description: 'Outline: red border + red check. Filled: solid red bg + white check.' },
      { name: 'indeterminate', type: 'boolean', description: 'Render a horizontal bar instead of a check.' },
      { name: 'accentColor', type: 'string', default: '#EC615B', description: 'Checked color.' },
      { name: 'boxRadius', type: 'number | string', default: '6', description: 'Corner radius.' },
    ]}
  >
    <Example title="Basic" code={`<Checkbox defaultChecked label="Save Bank Information" />`}>
      <Checkbox defaultChecked label="Save Bank Information" />
    </Example>
    <Example title="Indeterminate" code={`<Checkbox indeterminate label="Partial selection" />`}>
      <Checkbox indeterminate label="Partial selection" />
    </Example>
    <Example title="Filled variant" code={`<Checkbox variant="filled" defaultChecked label="Filled" />`}>
      <Checkbox variant="filled" defaultChecked label="Filled" />
    </Example>
  </Section>
);

export const StepsSection: React.FC = () => (
  <Section
    id="steps"
    title="Steps"
    description="Vertical (or horizontal) stepper. Finish = red check, Process = black check, Wait = empty circle, Error = red X."
    importStatement={`import { Steps } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'items', type: '{ title, description?, status?, icon? }[]', description: 'Step list.' },
      { name: 'current', type: 'number', default: '0', description: 'Index of the active step.' },
      { name: 'direction', type: 'vertical | horizontal', default: 'vertical', description: 'Layout direction.' },
      { name: 'size', type: 'sm | md | lg', default: 'md', description: 'Circle + check sizes.' },
      { name: 'showConnector', type: 'boolean', default: 'false', description: 'Show a line between steps.' },
      { name: 'gap', type: 'number | string', default: '28', description: 'Spacing between items.' },
      { name: 'onStepClick', type: '(index) => void', description: 'Click handler; makes items focusable.' },
      { name: 'activeColor / inactiveColor / errorColor', type: 'string', description: 'Override status colors.' },
      { name: 'borderWidth', type: 'number', default: '2', description: 'Circle border thickness.' },
      { name: 'checkStrokeWidth', type: 'number', default: '2', description: 'Checkmark/X stroke thickness.' },
    ]}
  >
    <Example
      title="Vertical (default)"
      code={`<Steps
  current={0}
  items={[
    { title: 'Dealer Information' },
    { title: 'Verification Document' },
    { title: 'Lot Registration' },
  ]}
/>`}
    >
      <Steps
        current={0}
        items={[
          { title: 'Dealer Information' },
          { title: 'Verification Document' },
          { title: 'Lot Registration' },
        ]}
      />
    </Example>
    <Example
      title="Small size"
      code={`<Steps
  current={1}
  size="sm"
  borderWidth={1.5}
  checkStrokeWidth={2.5}
  gap={20}
  items={[
    { title: 'Dealer Information' },
    { title: 'Verification Document' },
    { title: 'Lot Registration' },
  ]}
/>`}
    >
      <Steps
        current={1}
        size="sm"
        borderWidth={1.5}
        checkStrokeWidth={2.5}
        gap={20}
        items={[
          { title: 'Dealer Information' },
          { title: 'Verification Document' },
          { title: 'Lot Registration' },
        ]}
      />
    </Example>
    <Example
      title="With connector + descriptions"
      code={`<Steps current={1} showConnector items={[...]} />`}
    >
      <Steps
        current={1}
        showConnector
        items={[
          { title: 'Basic info', description: 'Completed Apr 17' },
          { title: 'Documents', description: 'Upload proof of ID' },
          { title: 'Approval', description: 'Reviewed by compliance' },
        ]}
      />
    </Example>
  </Section>
);
