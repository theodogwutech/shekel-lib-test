import React, { useState } from 'react';
import { Modal } from '../../../src/components/Modal';
import { Button } from '../../../src/components/Button';
import { Input } from '../../../src/components/Input/Input';
import { Section, Example } from '../Showcase';

const WelcomeDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open welcome modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closable={false}
        maskClosable={false}
        size="lg"
        footer={
          <Button block onClick={() => setOpen(false)}>
            Proceed to Dashboard
          </Button>
        }
      >
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#181918] m-0">Welcome to Shekel Mobility</h2>
          <p className="text-sm text-[#595959] mt-3 text-left">
            As a broker, you help dealers find great opportunities and support them every step of the
            way — from getting started to closing successful deals.
          </p>
          <ul className="text-sm text-[#595959] text-left list-disc pl-5 space-y-2 mt-3">
            <li>
              <b>Onboard Dealers</b>: Register new dealers, verify their legitimacy, and guide them
              on using the platform.
            </li>
            <li>
              <b>Request Funding</b>: Help dealers secure financing and ensure funds are ready when
              opportunities arise.
            </li>
            <li>
              <b>Earn Commission</b>: Facilitate transactions, track earnings in real time, and
              withdraw profits from completed deals.
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

const FormDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [bvn, setBvn] = useState('');
  const [nin, setNin] = useState('');
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open form modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Provide Personal Information"
        description="Verify your identity with your BVN & NIN"
        onCancel={() => setOpen(false)}
        onOk={async () => {
          await new Promise((r) => setTimeout(r, 900));
          setOpen(false);
        }}
        okText="Submit"
        cancelText="Cancel"
      >
        <div className="space-y-4 pb-4">
          <Input
            label={
              <>
                BVN <span className="text-[#8C8C8C] font-normal">(Dial *565*0#)</span>
              </>
            }
            placeholder="Enter 10 digit number"
            value={bvn}
            onChange={(e) => setBvn(e.target.value)}
          />
          <Input
            label={
              <>
                National Identity Number{' '}
                <span className="text-[#8C8C8C] font-normal">(Dial *346# with registered phone number)</span>
              </>
            }
            placeholder="Enter 11 digit number"
            value={nin}
            onChange={(e) => setNin(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

const ConfirmDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open destructive confirm
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete dealer?"
        description="This removes the dealer and all their pending transactions. This can't be undone."
        okText="Delete dealer"
        okDanger
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        size="sm"
      />
    </>
  );
};

const PlacementDemo: React.FC = () => {
  const [placement, setPlacement] = useState<null | string>(null);
  const PLACEMENTS: Array<
    | 'top-left' | 'top' | 'top-right'
    | 'left' | 'center' | 'right'
    | 'bottom-left' | 'bottom' | 'bottom-right'
  > = [
    'top-left', 'top', 'top-right',
    'left', 'center', 'right',
    'bottom-left', 'bottom', 'bottom-right',
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-2 max-w-xs">
        {PLACEMENTS.map((p) => (
          <Button key={p} size="xsmall" variant="outline" onClick={() => setPlacement(p)}>
            {p}
          </Button>
        ))}
      </div>
      {placement && (
        <Modal
          open
          onClose={() => setPlacement(null)}
          title={`Placement: ${placement}`}
          description="The panel animates in from the side it's anchored to."
          placement={placement as any}
          size="sm"
          onOk={() => setPlacement(null)}
          onCancel={() => setPlacement(null)}
          okText="Got it"
        >
          <p className="text-sm text-[#595959] m-0">
            When the modal sits against an edge, the entrance animation slides in from that edge by
            default. Override with the <code>motion</code> prop.
          </p>
        </Modal>
      )}
    </>
  );
};

const BackdropDemo: React.FC = () => {
  const [which, setWhich] = useState<null | 'normal' | 'blur' | 'none'>(null);
  return (
    <>
      <div className="flex gap-2">
        <Button size="small" variant="outline" onClick={() => setWhich('normal')}>
          Normal backdrop
        </Button>
        <Button size="small" variant="outline" onClick={() => setWhich('blur')}>
          Blur backdrop
        </Button>
        <Button size="small" variant="outline" onClick={() => setWhich('none')}>
          No backdrop
        </Button>
      </div>
      {which && (
        <Modal
          open
          onClose={() => setWhich(null)}
          title={`Backdrop: ${which}`}
          size="sm"
          backdrop={which}
          shadow="0 20px 40px rgba(0,0,0,0.2)"
          onOk={() => setWhich(null)}
          onCancel={() => setWhich(null)}
          okText="Close"
          hideCancel
        >
          <p className="text-sm text-[#595959] m-0">
            This modal uses the <b>{which}</b> backdrop. Try the others to feel the difference.
          </p>
        </Modal>
      )}
    </>
  );
};

const SubmitOnEnterDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open submit-on-Enter
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Search dealer"
        description="Type a name and press Enter to submit."
        size="sm"
        submitOnEnter
        onOk={async () => {
          await new Promise((r) => setTimeout(r, 400));
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        okText="Search"
      >
        <div className="pb-4">
          <Input
            label="Dealer name"
            placeholder="e.g. Oliver Motors"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

const CustomCloseIconDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open with custom close icon
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Custom close icon"
        size="sm"
        closeIcon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14"
              stroke="#C21919"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        <p className="text-sm text-[#595959] m-0">
          Pass any <code>ReactNode</code> as <code>closeIcon</code> to replace the default ×.
        </p>
      </Modal>
    </>
  );
};

const MotionOverrideDemo: React.FC = () => {
  const [motion, setMotion] = useState<null | string>(null);
  const MOTIONS = ['fade', 'scale', 'slide-up', 'slide-down', 'slide-left', 'slide-right'];
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {MOTIONS.map((m) => (
          <Button key={m} size="small" variant="outline" onClick={() => setMotion(m)}>
            {m}
          </Button>
        ))}
      </div>
      {motion && (
        <Modal
          open
          onClose={() => setMotion(null)}
          title={`Motion: ${motion}`}
          size="sm"
          motion={motion as any}
          onOk={() => setMotion(null)}
          onCancel={() => setMotion(null)}
          okText="Got it"
        >
          <p className="text-sm text-[#595959] m-0">
            The modal opened with the <b>{motion}</b> animation. Motion is independent of placement.
          </p>
        </Modal>
      )}
    </>
  );
};

const BlurBackdropLifecycleDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const push = (msg: string) => setLog((l) => [...l, `${new Date().toLocaleTimeString()}: ${msg}`]);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open (blur + lifecycle logs)
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Blur backdrop + lifecycle"
        description="Watch the console log below — opens, closes, and afterClose all fire."
        backdrop="blur"
        size="sm"
        afterOpen={() => push('afterOpen')}
        afterClose={() => push('afterClose')}
        onCancel={() => push('onCancel')}
        onOk={() => {
          push('onOk');
          setOpen(false);
        }}
        okText="Close"
        hideCancel
      >
        <pre className="bg-[#F5F5F5] text-xs p-3 rounded max-h-40 overflow-auto m-0">
          {log.length === 0 ? '(no events yet)' : log.join('\n')}
        </pre>
      </Modal>
    </>
  );
};

const BareModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open empty/bare modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} bare size="md">
        <div className="relative">
          <div
            className="w-full h-32 rounded-t-2xl"
            style={{
              background: 'linear-gradient(135deg, #EC615B 0%, #F59E95 100%)',
            }}
          />
          <div className="p-6">
            <div className="-mt-14 mb-3">
              <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-[#EC615B]">
                ★
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#181918] m-0">Bare canvas</h3>
            <p className="text-sm text-[#595959] mt-2">
              When <code>bare</code> is set, the modal skips the chromed header/body/footer
              layout and lets you compose everything from scratch — gradient headers, hero
              images, custom layouts, marketing modals, etc.
            </p>
            <div className="flex gap-2 mt-5">
              <Button block variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button block onClick={() => setOpen(false)}>
                Got it
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const FullscreenDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        Open fullscreen modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Fullscreen"
        size="full"
        footer={null}
      >
        <p className="text-sm text-[#595959]">
          This modal fills the entire viewport — useful for complex wizards or immersive flows.
          Press <kbd className="px-1.5 py-0.5 border rounded text-xs">Esc</kbd> to close.
        </p>
      </Modal>
    </>
  );
};

export const ModalSection: React.FC = () => (
  <Section
    id="modal"
    title="Modal"
    description="Portal-rendered dialog with smooth enter/exit transition, focus trap, body scroll lock, configurable footer + default OK/Cancel buttons, and extensive theming. Built to feel better than antd's."
    importStatement={`import { Modal } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'open', type: 'boolean', description: 'Visibility. Toggle via your state + onClose.' },
      { name: 'onClose', type: '() => void', description: 'Called by the ×, overlay click, or Esc.' },
      { name: 'title', type: 'ReactNode', description: 'Header title. When a string, becomes aria-labelledby automatically.' },
      { name: 'description', type: 'ReactNode', description: 'Subtitle rendered under the title.' },
      { name: 'children', type: 'ReactNode', description: 'Modal body.' },
      { name: 'footer', type: 'ReactNode | null', description: 'Override the footer. `null` hides it. Omit to auto-render OK/Cancel when onOk/onCancel are provided.' },
      { name: 'okText / cancelText', type: 'ReactNode', default: 'OK / Cancel', description: 'Default button labels.' },
      { name: 'onOk', type: '() => void | Promise<void>', description: 'Primary action. If a promise is returned, the button shows loading until it resolves.' },
      { name: 'onCancel', type: '() => void', description: 'Called by the Cancel button (also triggers onClose).' },
      { name: 'okDanger', type: 'boolean', description: 'Render OK in red danger style.' },
      { name: 'okDisabled', type: 'boolean', description: 'Disable the OK button.' },
      { name: 'hideCancel', type: 'boolean', description: 'Hide only the cancel button in the default footer.' },
      { name: 'size', type: 'sm | md | lg | xl | 2xl | full', default: 'md', description: 'Width preset.' },
      { name: 'width', type: 'number | string', description: 'Explicit width override.' },
      { name: 'maxHeight', type: 'number | string', default: 'calc(100vh - 40px)', description: 'Max height; body scrolls inside.' },
      { name: 'placement', type: "'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'", default: 'center', description: '3×3 position grid. Drives default motion direction.' },
      { name: 'centered', type: 'boolean', default: 'true', description: 'Alias for placement="center". Ignored when placement is set.' },
      { name: 'edgeOffset', type: 'number | string', default: '40', description: 'Distance from the viewport edge when not full.' },
      { name: 'motion', type: "'auto' | 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'", default: 'auto', description: 'Entrance animation. `auto` infers from placement.' },
      { name: 'backdrop', type: "'normal' | 'blur' | 'none'", default: 'normal', description: 'Overlay style. `blur` applies backdrop-filter blur.' },
      { name: 'closeIcon', type: 'ReactNode', description: 'Override the default × icon.' },
      { name: 'submitOnEnter', type: 'boolean', default: 'false', description: 'Pressing Enter inside the modal (outside a textarea) triggers onOk.' },
      { name: 'bare', type: 'boolean', default: 'false', description: 'Skip the header/body/footer chrome and give you a raw panel to fill yourself. `closable` still renders a floating × in the corner.' },
      { name: 'noPadding', type: 'boolean', default: 'false', description: 'Remove the default body padding (for full-bleed content like images).' },
      { name: 'closable', type: 'boolean', default: 'true', description: 'Show the × button in the header.' },
      { name: 'maskClosable', type: 'boolean', default: 'true', description: 'Click the overlay to close.' },
      { name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'Esc closes.' },
      { name: 'lockScroll', type: 'boolean', default: 'true', description: 'Freeze body scroll while open (compensates for scrollbar to avoid shift).' },
      { name: 'bgColor / overlayColor', type: 'string', description: 'Modal + backdrop colors.' },
      { name: 'borderRadius', type: 'number | string', default: '16', description: 'Rounded corners.' },
      { name: 'shadow', type: 'string', description: 'Custom shadow CSS.' },
      { name: 'animationDuration', type: 'number', default: '200', description: 'Enter/exit transition in ms.' },
      { name: 'zIndex', type: 'number', default: '1000', description: 'Stacking order.' },
      { name: 'getContainer', type: '() => HTMLElement', default: 'document.body', description: 'Portal target.' },
      { name: 'afterOpen / afterClose', type: '() => void', description: 'Lifecycle hooks.' },
    ]}
  >
    <Example
      title="Welcome modal (no × or mask-close)"
      code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  closable={false}
  maskClosable={false}
  size="lg"
  footer={<Button block onClick={() => setOpen(false)}>Proceed to Dashboard</Button>}
>
  <h2>Welcome to Shekel Mobility</h2>
  <p>As a broker, you help dealers...</p>
  <ul>...</ul>
</Modal>`}
    >
      <WelcomeDemo />
    </Example>

    <Example
      title="Form modal (Cancel + async Submit)"
      code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Provide Personal Information"
  description="Verify your identity with your BVN & NIN"
  onCancel={() => setOpen(false)}
  onOk={async () => {
    await api.submit();
    setOpen(false);
  }}
  okText="Submit"
>
  <Input label="BVN" />
  <Input label="National Identity Number" />
</Modal>`}
    >
      <FormDemo />
    </Example>

    <Example
      title="Destructive confirm"
      code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete dealer?"
  description="This can't be undone."
  okText="Delete dealer"
  okDanger
  size="sm"
  onOk={handleDelete}
  onCancel={() => setOpen(false)}
/>`}
    >
      <ConfirmDemo />
    </Example>

    <Example
      title="Fullscreen"
      code={`<Modal open={open} onClose={() => setOpen(false)} size="full" title="Fullscreen" footer={null}>
  Complex content here
</Modal>`}
    >
      <FullscreenDemo />
    </Example>

    <Example
      title="Placement (3×3 grid)"
      code={`<Modal open placement="top-right" title="Top right" ...>...</Modal>
<Modal open placement="bottom"     title="Bottom"    ...>...</Modal>
<Modal open placement="left"       title="Left"      ...>...</Modal>`}
    >
      <PlacementDemo />
    </Example>

    <Example
      title="Backdrop variants"
      code={`<Modal backdrop="normal" ... />
<Modal backdrop="blur"   ... />   // backdrop-filter: blur(6px)
<Modal backdrop="none"   ... />   // no overlay, just a floating panel`}
    >
      <BackdropDemo />
    </Example>

    <Example
      title="Motion override"
      code={`<Modal motion="fade"        ... />
<Modal motion="scale"       ... />
<Modal motion="slide-up"    ... />
<Modal motion="slide-down"  ... />
<Modal motion="slide-left"  ... />
<Modal motion="slide-right" ... />`}
    >
      <MotionOverrideDemo />
    </Example>

    <Example
      title="Custom close icon"
      code={`<Modal
  title="..."
  closeIcon={<TrashIcon />}
/>`}
    >
      <CustomCloseIconDemo />
    </Example>

    <Example
      title="Submit on Enter (keyboard shortcut)"
      code={`<Modal
  title="Search dealer"
  submitOnEnter
  onOk={async () => { await search(); setOpen(false); }}
  onCancel={() => setOpen(false)}
>
  <Input label="Dealer name" />
</Modal>`}
    >
      <SubmitOnEnterDemo />
    </Example>

    <Example
      title="Lifecycle hooks + blur backdrop"
      code={`<Modal
  backdrop="blur"
  afterOpen={() => analytics.track('modal_open')}
  afterClose={() => cleanup()}
  onOk={handleOk}
  onCancel={handleCancel}
>
  ...
</Modal>`}
    >
      <BlurBackdropLifecycleDemo />
    </Example>

    <Example
      title="Bare (empty) modal — compose whatever you want"
      code={`<Modal open={open} onClose={() => setOpen(false)} bare size="md">
  <div className="relative">
    <div className="h-32 rounded-t-2xl"
         style={{ background: 'linear-gradient(135deg, #EC615B, #F59E95)' }} />
    <div className="p-6">
      <h3>Bare canvas</h3>
      <p>Compose hero headers, custom layouts, etc. from scratch.</p>
    </div>
  </div>
</Modal>`}
    >
      <BareModalDemo />
    </Example>
  </Section>
);
