import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import {
  Input,
  PasswordInput,
  OTPInput,
  PhoneInput,
  CurrencyInput,
  UserPill,
  UserCard,
  CountrySelector,
  UserProfileDropdown,
  ActionCard,
  DashboardCard,
  StatCard,
  NotificationDropdown,
  TabsComponent,
  Button,
  Card,
} from '../src/components';
import '../src/styles.css';
import 'antd/dist/reset.css';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleLoadingDemo = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 3000);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#EC615B',
          borderRadius: 8,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }}
    >
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              Shekel Shared Components v1.0.11
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              New components library built with React, TypeScript, Tailwind CSS, and Ant Design
            </p>
          </div>

          {/* Input Components */}
          <Card title="Input Components" shadow="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Text Input</h3>
                <Input
                  label="Email Address"
                  placeholder="ben@shekel.africa"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText="We'll never share your email"
                />
                <div className="mt-4">
                  <Input
                    label="Email Address (Error State)"
                    placeholder="ben@shekel.africa"
                    error="Please enter a valid email address"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Password Input</h3>
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-4">
                  <PasswordInput
                    label="Password (Error State)"
                    placeholder="Enter your password"
                    error="Password must be at least 8 characters"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Phone Input</h3>
                <PhoneInput
                  label="Phone Number"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  countryCode="+234"
                />
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Currency Input</h3>
                <CurrencyInput
                  label="Amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(value) => setAmount(value)}
                  currencySymbol="₦"
                  formatAmount={true}
                />
              </div>

              <div className="md:col-span-2">
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  OTP Input - Enter OTP Code
                </h3>
                <OTPInput length={6} value={otp} onChange={(value) => setOtp(value)} />
              </div>
            </div>
          </Card>

          {/* User Components */}
          <Card title="User Components" shadow="lg">
            <div className="space-y-8">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">User Pill</h3>
                <div className="flex flex-wrap gap-4">
                  <UserPill name="Benjamin Oladokun" subtitle="Global Admin" />
                  <UserPill name="Sarah Johnson" subtitle="Manager" />
                  <UserPill name="John Doe" />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">User Card</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UserCard
                    name="Benjamin Oladokun"
                    role="Global Admin"
                    email="benjamin@shekel.africa"
                  />
                  <UserCard name="Sarah Johnson" role="Manager" email="sarah@shekel.africa" />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">User Profile Dropdown</h3>
                <UserProfileDropdown
                  name="Benjamin Oladokun"
                  role="Global Admin"
                  menuItems={[
                    {
                      key: '1',
                      label: 'Profile Settings',
                      onClick: () => console.log('Profile clicked'),
                    },
                    {
                      key: '2',
                      label: 'Account Settings',
                      onClick: () => console.log('Account clicked'),
                    },
                    {
                      key: '3',
                      label: 'Security',
                      onClick: () => console.log('Security clicked'),
                    },
                    {
                      key: 'divider-1',
                      type: 'divider',
                    },
                    {
                      key: '4',
                      label: 'Logout',
                      onClick: () => console.log('Logout clicked'),
                      danger: true,
                    },
                  ]}
                />
              </div>
            </div>
          </Card>

          {/* Dashboard Cards */}
          <Card title="Dashboard Cards" shadow="lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  Dashboard Card with Ledger Balance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DashboardCard
                    label="Total Balance"
                    value="2,450,000"
                    valuePrefix="₦"
                    // ledgerBalance="1,200,000"
                    showVisibilityToggle
                    width="100%"
                    topRight={
                      <Button variant="ghost" size="small">
                        Withdraw
                      </Button>
                    }
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                  <DashboardCard
                    label="Wallet Balance"
                    value="850,000"
                    valuePrefix="₦"
                    ledgerBalance="750,000"
                    showVisibilityToggle
                    backgroundPattern="wave"
                    width="100%"
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 100 4 2 2 0 000-4z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  Dashboard Card with Account Details & Copy Button
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DashboardCard
                    label="Available Balance"
                    value="30,281,291.00"
                    valuePrefix="₦"
                    valueFontSize={20}
                    bottomLabel=""
                    bottomValue="9999045041 • Providus Bank"
                    showLedgerValuePrefix={false}
                    bottomIcon={null}
                    showCopyButton
                    copyValue="9999045041"
                    onCopy={(v) => console.log('Copied:', v)}
                    width="100%"
                    topRight={
                      <Button variant="ghost" size="small">
                        Fund Wallet
                      </Button>
                    }
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  Stat Cards with Badge & Custom Colors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    label="Active Users"
                    value="1,234"
                    valuePrefix=""
                    badge="New"
                    width="100%"
                    detailed
                    iconBackgroundColor="#E8F8F0"
                    iconColor="#5FB894"
                    progressText="↑ 12% from last month"
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                  <StatCard
                    label="Revenue"
                    value="45,230"
                    valuePrefix="₦"
                    badge="Hot"
                    width="100%"
                    detailed
                    iconBackgroundColor="#E8F4FD"
                    iconColor="#4A9FD8"
                    progressText="↑ 8% from last week"
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 3v18h18M7 16l4-4 4 4 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                  <StatCard
                    label="Pending Tasks"
                    value="23"
                    valuePrefix=""
                    width="100%"
                    detailed
                    iconBackgroundColor="#FFF3E8"
                    iconColor="#F59E42"
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Custom Width</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StatCard
                    label="Default Width"
                    value="25,000"
                    valuePrefix="₦"
                    width="100%"
                    detailed
                    iconBackgroundColor="#F3E8FD"
                    iconColor="#9B59D8"
                  />
                  <StatCard
                    label="Custom Width"
                    value="15,000"
                    valuePrefix="₦"
                    width="100%"
                    detailed
                    iconBackgroundColor="#E8F8F0"
                    iconColor="#5FB894"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  Stat Cards (Simple / Default Variant)
                </h3>
                <div className="flex flex-wrap gap-4">
                  <StatCard label="All Shipment" value={0} valuePrefix="" />
                  <StatCard label="In Transit" value={128} valuePrefix="" />
                  <StatCard label="Delivered" value="1,204" valuePrefix="" />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  Simple Variant with Currency & Selection
                </h3>
                <div className="flex flex-wrap gap-4">
                  <StatCard label="Total Revenue" value="2,450,000" valuePrefix="₦" />
                  <StatCard
                    label="Outstanding"
                    value="325,000"
                    valuePrefix="₦"
                    selected
                    onClick={() => console.log('Outstanding clicked')}
                  />
                  <StatCard
                    label="Pending Orders"
                    value={42}
                    valuePrefix=""
                    onClick={() => console.log('Pending clicked')}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Action Cards */}
          <Card title="Action Cards" shadow="lg">
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ActionCard
                  label="Export Data"
                  onClick={() => console.log('Export clicked')}
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
                <ActionCard
                  label="Import Data"
                  onClick={() => console.log('Import clicked')}
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
                <ActionCard
                  label="Create Report"
                  onClick={() => console.log('Create clicked')}
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
                <ActionCard
                  label="View Settings"
                  onClick={() => console.log('Settings clicked')}
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </Card>

          {/* Notification Dropdown */}
          <Card title="Notification Dropdown" shadow="lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">With Notifications</h3>
                <NotificationDropdown
                  title="Notifications"
                  count={5}
                  width="100%"
                  notifications={[
                    {
                      id: '1',
                      title: 'New Issue Reported',
                      description: 'A pending issue has been raised and sent to the admin team',
                      timestamp: '',
                      isNew: true,
                    },
                    {
                      id: '2',
                      title: 'Payment Received',
                      description: 'Payment of ₦50,000 has been credited to your account',
                      timestamp: '2h ago',
                      iconBackgroundColor: '#E8F8F0',
                      iconColor: '#5FB894',
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M16 6L7.5 14.5L4 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      id: '3',
                      title: 'Security Alert',
                      description: 'New login detected from a different device in Lagos',
                      timestamp: '5h ago',
                      iconBackgroundColor: '#FFF3E8',
                      iconColor: '#F59E42',
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 6v4M10 14h.01M10 18a8 8 0 100-16 8 8 0 000 16z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      id: '4',
                      title: 'Document Uploaded',
                      description: 'Your verification documents have been uploaded successfully',
                      timestamp: '1d ago',
                      iconBackgroundColor: '#E8F4FD',
                      iconColor: '#4A9FD8',
                    },
                    {
                      id: '5',
                      title: 'System Update',
                      description: 'A new version is available. Please update your system',
                      timestamp: '2d ago',
                    },
                  ]}
                  onViewMore={() => console.log('View more clicked')}
                />
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Empty State</h3>
                <NotificationDropdown
                  title="Notifications"
                  count={0}
                  width="100%"
                  notifications={[]}
                  onViewMore={() => console.log('View more clicked')}
                />
              </div>
            </div>
          </Card>

          {/* Tabs Component */}
          <Card title="Tabs Component" shadow="lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  Settings Tabs (Like Screenshot)
                </h3>
                <TabsComponent
                  defaultActiveKey="personal"
                  items={[
                    {
                      key: 'personal',
                      label: 'Personal Information',
                      children: (
                        <div className="p-3 md:p-6 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-base md:text-lg mb-4">
                            Personal Information
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">
                                First Name
                              </label>
                              <p className="text-sm">Benjamin</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">
                                Last Name
                              </label>
                              <p className="text-sm">Oladokun</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">
                                Email
                              </label>
                              <p className="text-sm">benjamin@shekel.africa</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">
                                Phone
                              </label>
                              <p className="text-sm">+234 812 039 9403</p>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      key: 'team',
                      label: 'Team Management',
                      children: (
                        <div className="p-3 md:p-6 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-base md:text-lg mb-2">
                            Team Management
                          </h4>
                          <p className="text-sm text-gray-600">
                            Manage your team members and their roles.
                          </p>
                        </div>
                      ),
                    },
                    {
                      key: 'security',
                      label: 'Security',
                      children: (
                        <div className="p-3 md:p-6 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-base md:text-lg mb-2">
                            Security Settings
                          </h4>
                          <p className="text-sm text-gray-600">
                            Configure your security preferences and password.
                          </p>
                        </div>
                      ),
                    },
                    {
                      key: 'subscription',
                      label: 'Subscription',
                      children: (
                        <div className="p-3 md:p-6 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-base md:text-lg mb-2">Subscription</h4>
                          <p className="text-sm text-gray-600">
                            View and manage your subscription plan.
                          </p>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Basic Tabs</h3>
                <TabsComponent
                  defaultActiveKey="1"
                  items={[
                    {
                      key: '1',
                      label: 'Overview',
                      children: (
                        <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">This is the overview tab content.</p>
                        </div>
                      ),
                    },
                    {
                      key: '2',
                      label: 'Analytics',
                      children: (
                        <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            Analytics and metrics will appear here.
                          </p>
                        </div>
                      ),
                    },
                    {
                      key: '3',
                      label: 'Reports',
                      children: (
                        <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Your reports and exports.</p>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </Card>

          {/* Country Selector */}
          <Card title="Country Selector" shadow="lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  Default Selector (No Search)
                </h3>
                <div className="flex flex-wrap gap-4">
                  <CountrySelector
                    defaultCountry="NG"
                    onCountryChange={(code) => console.log('Selected country:', code)}
                  />
                  <CountrySelector
                    defaultCountry="US"
                    onCountryChange={(code) => console.log('Selected country:', code)}
                  />
                  <CountrySelector
                    defaultCountry="GB"
                    onCountryChange={(code) => console.log('Selected country:', code)}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">With Search Enabled</h3>
                <CountrySelector
                  defaultCountry="NG"
                  showSearch
                  onCountryChange={(code) => console.log('Selected country:', code)}
                />
                <p className="text-sm text-gray-600 mt-2">
                  Try typing "Nigeria", "NG", or any country name
                </p>
              </div>
            </div>
          </Card>

          {/* Buttons */}
          <Card title="Buttons" shadow="lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="xsmall">
                    XSmall
                  </Button>
                  <Button variant="primary" size="small">
                    Small
                  </Button>
                  <Button variant="primary" size="medium">
                    Medium
                  </Button>
                  <Button variant="primary" size="large">
                    Large
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4">Loading State</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" loading={buttonLoading} onClick={handleLoadingDemo}>
                    {buttonLoading ? 'Processing...' : 'Click to Load'}
                  </Button>
                  <Button variant="outline" loading>
                    Always Loading
                  </Button>
                  <Button variant="ghost" loading>
                    Ghost Loading
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Login Form Example */}
          <Card title="Complete Form Example" shadow="xl">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold">Sign in to your account</h2>
                <p className="text-gray-600 text-sm mt-2">
                  Enter your credentials to access your profile
                </p>
              </div>

              <Input label="Email Address" placeholder="ben@shekel.africa" type="email" />

              <Input
                label="Email with Error"
                placeholder="ben@shekel.africa"
                type="email"
                error="Please enter a valid email address"
                required
              />

              <PasswordInput label="Password" placeholder="Enter password" />

              <PasswordInput
                label="Password with Error"
                placeholder="Enter password"
                error="Password must be at least 8 characters"
                required
              />

              <PhoneInput label="Phone Number" placeholder="Phone number" countryCode="+234" />

              <Button
                variant="primary"
                block
                size="large"
                style={{ backgroundColor: '#EC615B', borderColor: '#EC615B' }}
              >
                Continue
              </Button>

              <Button variant="outline" size="small">
                Log In
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
