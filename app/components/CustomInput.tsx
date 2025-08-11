import type { ChangeEvent } from 'react';

interface CustomInputProps {
  label: string;
  type?: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, type = 'text', id, name, value, onChange, required = false, className = '', placeholder = '', disabled = false }) => {
  return (
    <div className='mb-4 lg:w-1/2'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>

      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${className}
        `}
      />
    </div>
  );
};

export default CustomInput;
