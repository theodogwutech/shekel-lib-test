import React, { useState } from 'react';
import { Dropdown } from '../../../src/components/Dropdown';
import { Table } from '../../../src/components/Table';
import { TableTop } from '../../../src/components/TableTop';
import { SelectedItemsList } from '../../../src/components/SelectedItemsList';
import { Button } from '../../../src/components/Button';
import { Section, Example } from '../Showcase';

export const DropdownSection: React.FC = () => (
  <Section
    id="dropdown"
    title="Dropdown"
    description="Generic menu that floats under (or above) any trigger. Click or hover to open; supports icons, danger items, and keyboard nav."
    importStatement={`import { Dropdown } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'items', type: '{ key, label, icon?, disabled?, danger?, onClick? }[]', description: 'Menu rows.' },
      { name: 'trigger', type: 'click | hover', default: 'click', description: 'How to open the menu.' },
      { name: 'placement', type: 'bottomLeft | bottomRight | topLeft | topRight', default: 'bottomLeft', description: 'Corner anchor.' },
      { name: 'children', type: 'ReactNode', description: 'The trigger element.' },
      { name: 'disabled', type: 'boolean', description: 'Prevents opening.' },
      { name: 'size', type: 'sm | md | lg | responsive', default: 'md', description: 'Font + spacing preset.' },
      { name: 'menuBgColor / menuItemHoverColor / dangerColor / borderColor', type: 'string', description: 'Theme overrides.' },
    ]}
  >
    <Example
      title="Basic"
      code={`<Dropdown
  items={[
    { key: 'edit', label: 'Edit', onClick: () => ... },
    { key: 'duplicate', label: 'Duplicate' },
    { key: 'delete', label: 'Delete', danger: true },
  ]}
>
  <Button variant="outline">Actions ▾</Button>
</Dropdown>`}
    >
      <Dropdown
        items={[
          { key: 'edit', label: 'Edit', onClick: () => console.log('edit') },
          { key: 'duplicate', label: 'Duplicate' },
          { key: 'export', label: 'Export' },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      >
        <Button variant="outline">Actions ▾</Button>
      </Dropdown>
    </Example>
    <Example
      title="Placement + hover trigger"
      code={`<Dropdown trigger="hover" placement="bottomRight" items={[...]}>
  <Button>Hover me</Button>
</Dropdown>`}
    >
      <div className="flex gap-6">
        <Dropdown
          trigger="hover"
          placement="bottomRight"
          items={[
            { key: '1', label: 'Profile' },
            { key: '2', label: 'Settings' },
            { key: '3', label: 'Logout', danger: true },
          ]}
        >
          <Button variant="ghost">Hover me</Button>
        </Dropdown>
      </div>
    </Example>
  </Section>
);

const DEALERS = Array.from({ length: 24 }, (_, i) => ({
  id: `D${1000 + i}`,
  name: ['Oliver Motors', 'Falcon Motors', 'Nova Motors', 'Pinnacle Motors', 'Summit Auto'][i % 5],
  contact: ['Oliver Andrews', 'Lara Falcon', 'Ethan Nova', 'Ada Pinnacle', 'Ken Summit'][i % 5],
  revenue: (i + 1) * 12500,
  status: ['active', 'pending', 'inactive'][i % 3],
}));

const TableDemo: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  return (
    <Table
      dataSource={DEALERS.slice((page - 1) * pageSize, page * pageSize)}
      rowKey="id"
      columns={[
        { key: 'id', title: 'Dealer ID', dataIndex: 'id' },
        { key: 'name', title: 'Name', dataIndex: 'name' },
        { key: 'contact', title: 'Contact', dataIndex: 'contact' },
        {
          key: 'revenue',
          title: 'Revenue',
          dataIndex: 'revenue',
          align: 'right',
          render: (v: number) => `₦${v.toLocaleString()}.00`,
        },
        {
          key: 'status',
          title: 'Status',
          dataIndex: 'status',
          render: (v: string) => {
            const bg = v === 'active' ? '#E8F8F0' : v === 'pending' ? '#FFF3E8' : '#F5F5F5';
            const color = v === 'active' ? '#5FB894' : v === 'pending' ? '#F59E42' : '#8C8C8C';
            return (
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                style={{ backgroundColor: bg, color }}
              >
                {v}
              </span>
            );
          },
        },
      ]}
      pagination={{
        current: page,
        pageSize,
        total: DEALERS.length,
        onChange: (p) => setPage(p),
      }}
      striped
    />
  );
};

export const TableSection: React.FC = () => (
  <Section
    id="table"
    title="Table"
    description="Generic data table with custom column render, sortable headers, striped rows, sticky pagination, and loading state. Built for real data views."
    importStatement={`import { Table } from 'shekel-fe-shared-lib';
// Types: ColumnDef, PaginationConfig, TableProps`}
    props={[
      { name: 'columns', type: 'ColumnDef<T>[]', description: '{ key, title, dataIndex?, render?(value, record, i), width?, align?, sortable? }' },
      { name: 'dataSource', type: 'T[]', description: 'Row data.' },
      { name: 'rowKey', type: 'string | (record) => string', default: '"id"', description: 'How to identify each row.' },
      { name: 'pagination', type: 'PaginationConfig | false', description: '{ current, pageSize, total, onChange } — pass false to disable.' },
      { name: 'loading', type: 'boolean', description: 'Show a loading state.' },
      { name: 'onRow', type: '(record, i) => HTMLAttributes', description: 'Attach row-level handlers (onClick, etc.).' },
      { name: 'bordered / striped', type: 'boolean', description: 'Visual toggles.' },
      { name: 'size', type: 'sm | md | lg | responsive', default: 'md', description: 'Row density.' },
      { name: 'headerBgColor / rowHoverColor / borderColor / stripedRowColor', type: 'string', description: 'Theme overrides.' },
      { name: 'rounded', type: 'none | sm | md | lg | xl | 2xl', default: 'md', description: 'Corner radius.' },
    ]}
  >
    <Example
      title="Dealers table with custom render + pagination"
      code={`<Table
  dataSource={dealers}
  columns={[
    { key: 'id', title: 'Dealer ID', dataIndex: 'id' },
    { key: 'name', title: 'Name', dataIndex: 'name' },
    { key: 'revenue', title: 'Revenue', align: 'right', render: (v) => \`₦\${v.toLocaleString()}\` },
    { key: 'status', title: 'Status', render: (v) => <Pill>{v}</Pill> },
  ]}
  pagination={{ current, pageSize, total, onChange: setPage }}
  striped
/>`}
    >
      <TableDemo />
    </Example>
  </Section>
);

export const TableTopSection: React.FC = () => (
  <Section
    id="table-top"
    title="TableTop"
    description="Header toolbar for a data table: title + description + search + filters + action buttons. Pairs well with <Table /> above a list view."
    importStatement={`import { TableTop } from 'shekel-fe-shared-lib';`}
    props={[
      { name: 'title', type: 'string', description: 'Left-side title (e.g. "Dealers").' },
      { name: 'description', type: 'string', description: 'Subtitle under the title.' },
      { name: 'searchPlaceholder', type: 'string', description: 'Placeholder for the search input.' },
      { name: 'onSearch', type: '(value: string) => void', description: 'Fires on search input change.' },
      { name: 'actions', type: 'ReactNode', description: 'Right-aligned action slot (e.g. "New dealer" button).' },
      { name: 'filters', type: 'ReactNode', description: 'Custom filter controls rendered above the actions.' },
      { name: 'size', type: 'sm | md | lg | responsive', default: 'md', description: 'Size preset.' },
      { name: 'hideActionButtons', type: 'boolean', description: 'Hide the default action slot.' },
    ]}
  >
    <Example
      title="With search + action button"
      code={`<TableTop
  title="Dealers"
  description="Manage your registered dealers"
  searchPlaceholder="Search dealers..."
  onSearch={setQuery}
  actions={<Button>+ New dealer</Button>}
/>`}
    >
      <TableTop
        title="Dealers"
        description="Manage your registered dealers"
        searchPlaceholder="Search dealers..."
        onSearch={() => {}}
        actions={<Button size="medium">+ New dealer</Button>}
      />
    </Example>
  </Section>
);

const SelectedItemsDemo: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Oliver Motors', sublabel: 'ID324212' },
    { id: 2, label: 'Falcon Motors', sublabel: 'ID324213' },
    { id: 3, label: 'Nova Motors', sublabel: 'ID324214' },
  ]);
  return (
    <div className="max-w-sm">
      <SelectedItemsList
        items={items}
        onRemove={(id) => setItems((prev) => prev.filter((it) => it.id !== id))}
        emptyMessage="No dealers selected yet"
      />
    </div>
  );
};

export const SelectedItemsListSection: React.FC = () => (
  <Section
    id="selected-items-list"
    title="SelectedItemsList"
    description="List of selected items with remove × buttons — good for multi-select review UIs, chips lists with sublabels, recipient lists, etc."
    importStatement={`import { SelectedItemsList } from 'shekel-fe-shared-lib';
// Types: SelectedItem, SelectedItemsListProps`}
    props={[
      { name: 'items', type: '{ id, label, sublabel? }[]', description: 'List data.' },
      { name: 'onRemove', type: '(id) => void', description: 'Fires when a row × is clicked.' },
      { name: 'emptyMessage', type: 'string', default: 'No items selected', description: 'Shown when items is empty.' },
      { name: 'maxHeight', type: 'string', description: 'Enables internal scroll.' },
      { name: 'size', type: 'sm | md | lg | responsive', default: 'md', description: 'Row density.' },
      { name: 'bgColor / hoverBgColor / textColor / sublabelColor / removeButtonColor / removeButtonHoverColor', type: 'string', description: 'Theme overrides.' },
      { name: 'rounded', type: 'none | sm | md | lg | full', default: 'md', description: 'Corner radius.' },
    ]}
  >
    <Example
      title="Remove-able list"
      code={`const [items, setItems] = useState([...]);
<SelectedItemsList
  items={items}
  onRemove={(id) => setItems((prev) => prev.filter((it) => it.id !== id))}
/>`}
    >
      <SelectedItemsDemo />
    </Example>
  </Section>
);
