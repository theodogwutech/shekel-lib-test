import React, { useState } from 'react';
import {
  Button,
  StatCard,
  SearchInput,
  Card,
  Dropdown,
  Select,
  Table,
  TableTop,
  Modal,
  Badge,
  Steps,
  Progress,
  Checkbox,
  SelectedItemsList,
  type DropdownMenuItem,
  type SelectOption,
  type ColumnDef,
  type SelectedItem,
} from '../src/components';

// Demo Icons
const SearchIconSvg = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

function App() {
  const [selectedStat, setSelectedStat] = useState('all');
  const [shippedFrom, setShippedFrom] = useState<string | number>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkbox3, setCheckbox3] = useState(false);

  const [selectedVINs, setSelectedVINs] = useState<SelectedItem[]>([
    { id: 1, label: '1FAFP404X1', sublabel: 'VIN' },
    { id: 2, label: '1HGCM82633A123456', sublabel: 'VIN' },
    { id: 3, label: '1N4AL3AP7EC123456', sublabel: 'VIN' },
    { id: 4, label: '5NPE34AF3FH123456', sublabel: 'VIN' },
  ]);

  const handleRemoveVIN = (id: string | number) => {
    setSelectedVINs(selectedVINs.filter(item => item.id !== id));
  };

  const locationOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Component Library Demo
          </h1>
          <p className="text-gray-600">Testing all components</p>
        </div>

        {/* Buttons Section */}
        <Card className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Variants</p>
              <div className="flex gap-3 flex-wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="text">Text</Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">With Icons</p>
              <div className="flex gap-3 flex-wrap">
                <Button variant="primary" icon={<MapIcon />}>
                  Map Intelligence
                </Button>
                <Button variant="outlined" icon={<DownloadIcon />}>
                  Download Report
                </Button>
                <Button variant="outlined" icon={<FilterIcon />}>
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stat Cards Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Stat Cards (Click to Select)</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'All Shipment', value: 0, key: 'all' },
              { label: 'Queued', value: 12, key: 'queued' },
              { label: 'Planned', value: 8, key: 'planned' },
              { label: 'On ship', value: 24, key: 'onship' },
            ].map((stat) => (
              <StatCard
                key={stat.key}
                label={stat.label}
                value={stat.value}
                selected={selectedStat === stat.key}
                onClick={() => setSelectedStat(stat.key)}
              />
            ))}
          </div>
        </Card>

        {/* Search Input Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Search Input</h2>
          <SearchInput icon={<SearchIconSvg />} placeholder="Search a shipment" />
        </Card>

        {/* Select Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Select Dropdown</h2>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipped from
            </label>
            <Select
              placeholder="Select location"
              options={locationOptions}
              value={shippedFrom}
              onChange={setShippedFrom}
              fullWidth
            />
          </div>
        </Card>

        {/* Table Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Table with Pagination</h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">Default Size (Medium)</p>
              <Table
                columns={[
                  { key: 'vehicle', title: 'Vehicle', dataIndex: 'vehicle' },
                  { key: 'vin', title: 'VIN', dataIndex: 'vin', render: (val) => <span className="text-xs text-gray-500">{val}</span> },
                  { key: 'tracking', title: 'Tracking Number', dataIndex: 'trackingNumber', render: (val, rec: any) => (
                    <div>
                      <div className="text-sm font-medium text-red-600">{val}</div>
                      <div className="text-xs text-gray-500">{rec.shippingLine}</div>
                    </div>
                  )},
                  { key: 'portLoading', title: 'Port of loading', dataIndex: 'portOfLoading' },
                  { key: 'portDischarge', title: 'Port of Discharge', dataIndex: 'portOfDischarge' },
                  { key: 'eta', title: 'ETA', dataIndex: 'eta' },
                  { key: 'daysLeft', title: 'Days left', dataIndex: 'daysLeft' },
                  { key: 'lastEvent', title: 'Last Event', dataIndex: 'lastEvent' },
                  { key: 'status', title: 'Status', dataIndex: 'status', render: (val) => (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      val === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {val}
                    </span>
                  )},
                ]}
                dataSource={[
                  {
                    id: '1',
                    vehicle: 'Hyundai Sonata',
                    vin: '1N4AL3AP5EC123456',
                    trackingNumber: 'MSKU7654321',
                    shippingLine: 'Evergreen Marine',
                    portOfLoading: 'Port of Vancouver',
                    portOfDischarge: 'Apapa Port, Lagos',
                    eta: '14/04/2025',
                    daysLeft: '21 days',
                    lastEvent: 'Cleared from port',
                    status: 'In Transit',
                  },
                  {
                    id: '2',
                    vehicle: 'Toyota Camry',
                    vin: '1FAFP404X1F123456',
                    trackingNumber: 'HLCU1234567',
                    shippingLine: 'Maersk Line',
                    portOfLoading: 'Port of Halifax',
                    portOfDischarge: 'Apapa Port, Lagos',
                    eta: '24/06/2025',
                    daysLeft: '60 days',
                    lastEvent: '-',
                    status: 'Pending',
                  },
                ]}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: [5, 10, 20, 50],
                  showTotal: true,
                }}
                bordered
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">Small Pagination</p>
              <Table
                columns={[
                  { key: 'vehicle', title: 'Vehicle', dataIndex: 'vehicle' },
                  { key: 'status', title: 'Status', dataIndex: 'status' },
                ]}
                dataSource={[
                  { id: '1', vehicle: 'Hyundai Sonata', status: 'In Transit' },
                  { id: '2', vehicle: 'Toyota Camry', status: 'Pending' },
                ]}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: [5, 10, 20],
                  showTotal: true,
                  size: 'sm',
                }}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">Large Pagination</p>
              <Table
                columns={[
                  { key: 'vehicle', title: 'Vehicle', dataIndex: 'vehicle' },
                  { key: 'status', title: 'Status', dataIndex: 'status' },
                ]}
                dataSource={[
                  { id: '1', vehicle: 'Hyundai Sonata', status: 'In Transit' },
                  { id: '2', vehicle: 'Toyota Camry', status: 'Pending' },
                ]}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: [5, 10, 20],
                  showTotal: true,
                  size: 'lg',
                }}
              />
            </div>
          </div>
        </Card>

        {/* Badge Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Badges</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Variants</p>
              <div className="flex gap-3 flex-wrap">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">With Dots</p>
              <div className="flex gap-3 flex-wrap">
                <Badge variant="success" dot>In Transit</Badge>
                <Badge variant="warning" dot>Pending</Badge>
                <Badge variant="danger" dot>Delayed</Badge>
                <Badge variant="primary" dot>Processing</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Sizes</p>
              <div className="flex gap-3 flex-wrap items-center">
                <Badge variant="primary" size="sm">Small</Badge>
                <Badge variant="primary" size="md">Medium</Badge>
                <Badge variant="primary" size="lg">Large</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">With Icons</p>
              <div className="flex gap-3 flex-wrap">
                <Badge
                  variant="success"
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  }
                >
                  Completed
                </Badge>
                <Badge
                  variant="warning"
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                >
                  Warning
                </Badge>
                <Badge
                  variant="danger"
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  }
                >
                  Error
                </Badge>
                <Badge
                  variant="primary"
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  iconPosition="right"
                >
                  Info
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Progress Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Progress Bars</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Normal Progress</p>
              <Progress percent={30} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Success Status</p>
              <Progress percent={100} status="success" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Active Progress</p>
              <Progress percent={70} status="active" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Exception Status</p>
              <Progress percent={50} status="exception" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Without Info</p>
              <Progress percent={60} showInfo={false} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Custom Sizes</p>
              <div className="space-y-3">
                <Progress percent={45} size="sm" />
                <Progress percent={65} size="md" />
                <Progress percent={85} size="lg" />
              </div>
            </div>
          </div>
        </Card>

        {/* Steps Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Steps</h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">Vertical Steps - Default (Filled)</p>
              <Steps
                current={1}
                variant="default"
                items={[
                  {
                    title: 'Empty in Lot',
                    description: 'Port of Vancouver, Canada',
                  },
                  {
                    title: 'Full Out (Port)',
                    description: 'Port of Vancouver, Canada',
                  },
                  {
                    title: 'Vessel Arrived (port +1)',
                    description: 'Huatulco',
                  },
                  {
                    title: 'Transshipment Loaded (port +1)',
                    description: 'Montreal',
                  },
                  {
                    title: 'Vessel Departed',
                    description: 'Montreal',
                  },
                ]}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">Vertical Steps - Outline</p>
              <Steps
                current={1}
                variant="outline"
                items={[
                  {
                    title: 'Empty in Lot',
                    description: 'Port of Vancouver, Canada',
                  },
                  {
                    title: 'Full Out (Port)',
                    description: 'Port of Vancouver, Canada',
                  },
                  {
                    title: 'Vessel Arrived (port +1)',
                    description: 'Huatulco',
                  },
                  {
                    title: 'Transshipment Loaded (port +1)',
                    description: 'Montreal',
                  },
                  {
                    title: 'Vessel Departed',
                    description: 'Montreal',
                  },
                ]}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">Horizontal Steps - Default (Filled)</p>
              <Steps
                current={2}
                direction="horizontal"
                variant="default"
                items={[
                  { title: 'Ordered' },
                  { title: 'Processing' },
                  { title: 'Shipped' },
                  { title: 'Delivered' },
                ]}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">Horizontal Steps - Outline</p>
              <Steps
                current={2}
                direction="horizontal"
                variant="outline"
                items={[
                  { title: 'Ordered' },
                  { title: 'Processing' },
                  { title: 'Shipped' },
                  { title: 'Delivered' },
                ]}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">With Error Status - Default (Filled)</p>
              <Steps
                variant="default"
                items={[
                  { title: 'Step 1', status: 'finish' },
                  { title: 'Step 2', status: 'finish' },
                  { title: 'Step 3', status: 'error', description: 'Something went wrong' },
                  { title: 'Step 4', status: 'wait' },
                ]}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">With Error Status - Outline</p>
              <Steps
                variant="outline"
                items={[
                  { title: 'Step 1', status: 'finish' },
                  { title: 'Step 2', status: 'finish' },
                  { title: 'Step 3', status: 'error', description: 'Something went wrong' },
                  { title: 'Step 4', status: 'wait' },
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Checkbox Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Checkboxes</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Basic Checkboxes</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="checkbox1"
                    checked={checkbox1}
                    onChange={setCheckbox1}
                  />
                  <label htmlFor="checkbox1" className="text-sm text-gray-700 cursor-pointer">
                    Unchecked by default
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="checkbox2"
                    checked={checkbox2}
                    onChange={setCheckbox2}
                  />
                  <label htmlFor="checkbox2" className="text-sm text-gray-700 cursor-pointer">
                    Checked by default
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="checkbox3"
                    disabled
                  />
                  <label htmlFor="checkbox3" className="text-sm text-gray-400 cursor-not-allowed">
                    Disabled checkbox
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="checkbox4"
                    checked={true}
                    disabled
                  />
                  <label htmlFor="checkbox4" className="text-sm text-gray-400 cursor-not-allowed">
                    Disabled and checked
                  </label>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Sizes</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="checkbox-sm"
                    size="sm"
                    defaultChecked
                  />
                  <label htmlFor="checkbox-sm" className="text-sm text-gray-700 cursor-pointer">
                    Small
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="checkbox-md"
                    size="md"
                    defaultChecked
                  />
                  <label htmlFor="checkbox-md" className="text-sm text-gray-700 cursor-pointer">
                    Medium
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="checkbox-lg"
                    size="lg"
                    defaultChecked
                  />
                  <label htmlFor="checkbox-lg" className="text-sm text-gray-700 cursor-pointer">
                    Large
                  </label>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Indeterminate State</p>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="checkbox-indeterminate"
                  indeterminate={true}
                  checked={checkbox3}
                  onChange={setCheckbox3}
                />
                <label htmlFor="checkbox-indeterminate" className="text-sm text-gray-700 cursor-pointer">
                  Partially selected (indeterminate)
                </label>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Variants</p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Filled (Default)</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox id="filled-unchecked" variant="filled" />
                      <label htmlFor="filled-unchecked" className="text-sm text-gray-700 cursor-pointer">
                        Unchecked
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="filled-checked" variant="filled" defaultChecked />
                      <label htmlFor="filled-checked" className="text-sm text-gray-700 cursor-pointer">
                        Checked
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Outline</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox id="outline-unchecked" variant="outline" />
                      <label htmlFor="outline-unchecked" className="text-sm text-gray-700 cursor-pointer">
                        Unchecked
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="outline-checked" variant="outline" defaultChecked />
                      <label htmlFor="outline-checked" className="text-sm text-gray-700 cursor-pointer">
                        Checked
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Use Case Example - Select Vehicles (Outline)</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="vehicle1" variant="outline" defaultChecked />
                  <label htmlFor="vehicle1" className="text-sm text-gray-700 cursor-pointer">
                    Toyota Camry - 1FAFP404X1F123456
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="vehicle2" variant="outline" defaultChecked />
                  <label htmlFor="vehicle2" className="text-sm text-gray-700 cursor-pointer">
                    Honda Accord - 1HGCM82633A123456
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="vehicle3" variant="outline" />
                  <label htmlFor="vehicle3" className="text-sm text-gray-700 cursor-pointer">
                    Nissan Altima - 1N4AL3AP7EC123456
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Selected Items List Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Selected Items List</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Selected VINs</p>
              <SelectedItemsList
                items={selectedVINs}
                onRemove={handleRemoveVIN}
                emptyMessage="No VINs selected"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">With Custom Max Height</p>
              <SelectedItemsList
                items={[
                  { id: 1, label: 'Item 1', sublabel: 'Category A' },
                  { id: 2, label: 'Item 2', sublabel: 'Category B' },
                  { id: 3, label: 'Item 3', sublabel: 'Category A' },
                  { id: 4, label: 'Item 4', sublabel: 'Category C' },
                  { id: 5, label: 'Item 5', sublabel: 'Category B' },
                  { id: 6, label: 'Item 6', sublabel: 'Category A' },
                ]}
                onRemove={(id) => console.log('Remove', id)}
                maxHeight="200px"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Without Sublabels</p>
              <SelectedItemsList
                items={[
                  { id: 1, label: 'Container MSKU7654321' },
                  { id: 2, label: 'Container HLCU1234567' },
                  { id: 3, label: 'Container TEMU9876543' },
                ]}
                onRemove={(id) => console.log('Remove', id)}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Empty State</p>
              <SelectedItemsList
                items={[]}
                onRemove={(id) => console.log('Remove', id)}
                emptyMessage="No containers assigned yet"
              />
            </div>
          </div>
        </Card>

        {/* Modal Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Modal</h2>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>

          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Container Intelligence"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                This is a modal dialog. You can add any content here including forms, tables, or other components.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tracking number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <Select
                    placeholder="Select status"
                    options={[
                      { value: 'in-transit', label: 'In Transit' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'delivered', label: 'Delivered' },
                    ]}
                    fullWidth
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
        </Card>

        {/* TableTop Section */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">TableTop Component</h2>
          <TableTop
            title="Recent Shipments"
            searchPlaceholder="Search shipments..."
            onSearch={(value) => console.log('Search:', value)}
            actions={
              <div className="flex gap-2">
                <Button variant="outlined" icon={<DownloadIcon />}>
                  Export
                </Button>
                <Button variant="primary" icon={<FilterIcon />}>
                  Filter
                </Button>
              </div>
            }
          />
        </Card>

        {/* Dashboard Example */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Full Dashboard Example</h2>
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Tracking</h1>
              <div className="flex gap-3">
                <Button variant="outlined" icon={<MapIcon />}>
                  Map Intelligence
                </Button>
                <Button variant="primary">Start Tracking</Button>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-3 mb-6">
              {['All Shipment', 'Queued', 'Planned', 'On ship', 'Delayed', 'Arrived', 'Released', 'Demurrage'].map((label, idx) => (
                <StatCard
                  key={idx}
                  label={label}
                  value={0}
                  selected={idx === 0}
                />
              ))}
            </div>

            <TableTop
              title="Recent Activity"
              searchPlaceholder="Search a shipment"
              onSearch={(value) => console.log('Search:', value)}
              actions={
                <div className="flex gap-3">
                  <Button variant="outlined" icon={<DownloadIcon />}>
                    Download report
                  </Button>
                  <Button variant="outlined" icon={<FilterIcon />}>
                    Filter
                  </Button>
                </div>
              }
            />

            <Card className="mt-4">
              <div className="text-center py-12">
                <p className="text-gray-500">Your gateway to seamless shipment tracking</p>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
