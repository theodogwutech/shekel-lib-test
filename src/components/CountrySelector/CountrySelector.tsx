import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface CountrySelectorProps extends Omit<SelectProps, 'options'> {
  countries?: Country[];
  defaultCountry?: string;
  onCountryChange?: (countryCode: string) => void;
  showSearch?: boolean;
}

const defaultCountries: Country[] = [
  { code: 'NG', name: 'Nigeria', flag: '/images/flags/NG.svg' },
  { code: 'US', name: 'United States', flag: '/images/flags/US.svg' },
  { code: 'GB', name: 'United Kingdom', flag: '/images/flags/GB.svg' },
  { code: 'GH', name: 'Ghana', flag: '/images/flags/GH.svg' },
  { code: 'KE', name: 'Kenya', flag: '/images/flags/KE.svg' },
  { code: 'ZA', name: 'South Africa', flag: '/images/flags/ZA.svg' },
];

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries = defaultCountries,
  defaultCountry = 'NG',
  onCountryChange,
  showSearch = false,
  className = '',
  ...props
}) => {
  const handleChange = (value: string) => {
    if (onCountryChange) {
      onCountryChange(value);
    }
  };

  const renderFlag = (flag: string) => {
    return (
      <img
        src={flag}
        alt="flag"
        className="w-7 h-7 rounded-full object-cover"
        style={{ width: '28px', height: '28px' }}
      />
    );
  };

  const options = countries.map((country) => ({
    value: country.code,
    label: (
      <div className="flex items-center gap-2">
        {renderFlag(country.flag)}
        <span>{country.code}</span>
      </div>
    ),
    // Add searchable text for filtering
    searchLabel: `${country.name} ${country.code}`.toLowerCase(),
  }));

  // Custom filter function for searching
  const handleFilter = (input: string, option: any) => {
    return option?.searchLabel?.includes(input.toLowerCase()) || false;
  };

  return (
    <>
      <style>
        {`
          .country-selector.ant-select {
            min-width: 90px;
            heigh: 40px;
            border-radius: 20px;
            padding: 5px !important;
            background: #EEEEEE;
          }

          .country-selector .ant-select-selector {
            border-radius: 20px !important;
            border: 1px solid #E5E7EB !important;
            height: 40px !important;
            display: flex;
            align-items: center;
            background: #FFFFFF !important;
          }

          .country-selector .ant-select-selection-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            color: #000000;
          }

          .country-selector:hover .ant-select-selector {
            border-color: #D1D5DB !important;
          }

          .country-selector.ant-select-focused .ant-select-selector {
            border-color: #EC615B !important;
            box-shadow: 0 0 0 2px rgba(236, 97, 91, 0.1) !important;
          }

          .country-selector .ant-select-arrow {
            color: #6B7280;
          }

          .country-selector .ant-select-dropdown {
            border-radius: 12px !important;
          }
        `}
      </style>
      <Select
        className={`country-selector ${className}`}
        defaultValue={defaultCountry}
        onChange={handleChange}
        options={options}
        showSearch={showSearch}
        filterOption={handleFilter}
        placeholder="Search country..."
        suffixIcon={
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        {...props}
      />
    </>
  );
};
