import React from 'react';

export interface PropEntry {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export const PropsTable: React.FC<{ props: PropEntry[] }> = ({ props }) => (
  <div className="rounded-lg overflow-hidden border border-[#E6E6E6]">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-[#F5F5F5] text-left text-[#181918]">
          <th className="px-4 py-2.5 font-semibold">Prop</th>
          <th className="px-4 py-2.5 font-semibold">Type</th>
          <th className="px-4 py-2.5 font-semibold">Default</th>
          <th className="px-4 py-2.5 font-semibold">Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((p, i) => (
          <tr key={p.name} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}>
            <td className="px-4 py-2.5 align-top font-mono text-xs font-semibold text-[#EC615B]">
              {p.name}
            </td>
            <td className="px-4 py-2.5 align-top font-mono text-xs text-[#181918]">{p.type}</td>
            <td className="px-4 py-2.5 align-top font-mono text-xs text-[#8C8C8C]">
              {p.default ?? '—'}
            </td>
            <td className="px-4 py-2.5 align-top text-[#181918]">{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code }) => (
  <pre className="bg-[#181918] text-[#F5F5F5] text-xs rounded-lg p-4 overflow-auto leading-relaxed">
    <code>{code.trim()}</code>
  </pre>
);

export const Example: React.FC<{ title?: string; code: string; children: React.ReactNode }> = ({
  title,
  code,
  children,
}) => (
  <div className="mb-6">
    {title && <div className="text-xs font-medium text-[#8C8C8C] uppercase tracking-wider mb-2">{title}</div>}
    <div className="border border-[#E6E6E6] rounded-xl overflow-hidden bg-white">
      <div className="p-6 border-b border-[#E6E6E6]">{children}</div>
      <CodeBlock code={code} />
    </div>
  </div>
);

export const Section: React.FC<{
  id: string;
  title: string;
  description?: React.ReactNode;
  importStatement?: string;
  props?: PropEntry[];
  children: React.ReactNode;
}> = ({ id, title, description, importStatement, props: propsList, children }) => (
  <section id={id} className="mb-16 scroll-mt-8">
    <h2 className="text-3xl font-bold text-[#181918] mb-3">{title}</h2>
    {description && <p className="text-[#595959] mb-4 leading-relaxed">{description}</p>}
    {importStatement && (
      <div className="mb-6">
        <div className="text-xs font-medium text-[#8C8C8C] uppercase tracking-wider mb-2">
          Import
        </div>
        <CodeBlock code={importStatement} />
      </div>
    )}

    <h3 className="text-lg font-semibold text-[#181918] mt-8 mb-4">Examples</h3>
    {children}

    {propsList && propsList.length > 0 && (
      <>
        <h3 className="text-lg font-semibold text-[#181918] mt-10 mb-4">Props</h3>
        <PropsTable props={propsList} />
      </>
    )}
  </section>
);
