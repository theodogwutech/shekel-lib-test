import React from 'react';
import { SelectInput } from '../Input/SelectInput';
import type { SelectInputProps } from '../Input/SelectInput';
import flagNG from '../../assets/flags/NG.svg';
import flagUS from '../../assets/flags/US.svg';
import flagGB from '../../assets/flags/GB.svg';
import flagGH from '../../assets/flags/GH.svg';
import flagKE from '../../assets/flags/KE.svg';
import flagZA from '../../assets/flags/ZA.svg';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface CountrySelectorProps
  extends Omit<SelectInputProps, 'options' | 'value' | 'onChange'> {
  countries?: Country[];
  defaultCountry?: string;
  value?: string;
  onCountryChange?: (countryCode: string) => void;
  showSearch?: boolean;
  flagSize?: number;
}

const DEFAULT_COUNTRIES: Country[] = [
  { code: 'NG', name: 'Nigeria', flag: flagNG },
  { code: 'US', name: 'United States', flag: flagUS },
  { code: 'GB', name: 'United Kingdom', flag: flagGB },
  { code: 'GH', name: 'Ghana', flag: flagGH },
  { code: 'KE', name: 'Kenya', flag: flagKE },
  { code: 'ZA', name: 'South Africa', flag: flagZA },
];

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries = DEFAULT_COUNTRIES,
  defaultCountry = 'NG',
  value,
  onCountryChange,
  showSearch = false,
  flagSize = 24,
  ...props
}) => {
  const options = countries.map((c) => ({
    value: c.code,
    label: (
      <span className="inline-flex items-center gap-2">
        <img
          src={c.flag}
          alt=""
          aria-hidden
          className="shrink-0 rounded-full object-cover"
          style={{ width: flagSize, height: flagSize }}
        />
        <span>{c.code}</span>
      </span>
    ),
    searchLabel: `${c.name} ${c.code}`.toLowerCase(),
  }));

  return (
    <SelectInput
      {...props}
      value={value}
      defaultValue={value === undefined ? defaultCountry : undefined}
      options={options}
      showSearch={showSearch}
      filterOption={
        showSearch
          ? (input, opt: any) => opt?.searchLabel?.includes(input.toLowerCase()) ?? false
          : false
      }
      onChange={(v) => onCountryChange?.(v as string)}
    />
  );
};
