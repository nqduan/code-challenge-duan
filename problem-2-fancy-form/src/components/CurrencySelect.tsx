import React from 'react';
import Select from 'react-select';
import type { SingleValue } from 'react-select';
import './styles.css';

export interface CurrencyOption {
  value: string;
  label: string;
  icon: string;
}

interface Props {
  value: CurrencyOption | null;
  onChange: (option: SingleValue<CurrencyOption>) => void;
  options: CurrencyOption[];
  placeholder?: string;
}

const CurrencySelect: React.FC<Props> = ({
  value,
  onChange,
  options,
  placeholder = 'Select currency',
}) => {
  return (
    <Select
      className='w-full select'
      isSearchable
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      formatOptionLabel={(option: CurrencyOption) => (
        <div className='flex items-center gap-2'>
          <img src={option.icon} alt={option.label} className='currency-icon' />
          <span className='currency-text'>{option.label}</span>
        </div>
      )}
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: '2.5rem',
          border: 'none',
          boxShadow: state.isFocused ? 'none' : base.boxShadow,
        }),
      }}
    />
  );
};

export default CurrencySelect;
