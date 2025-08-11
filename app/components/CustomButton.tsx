import type { MouseEvent } from 'react';

type ButtonVariant = 'success' | 'danger' | 'warning' | 'primary' | 'secondary';

interface CustomButtonProps {
  text: string;
  type?: 'submit' | 'button' | 'reset';
  id?: string;
  name?: string;
  value?: string | number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
  danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-white',
  primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white',
};

const CustomButton: React.FC<CustomButtonProps> = ({ text, type = 'button', onClick, className = '', disabled = false, isLoading = false, icon, variant = 'primary', ...props }) => {
  const baseClasses = `
    w-full px-4 py-2 rounded-3xl font-medium
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2 cursor-pointer
  `;

  return (
    <button type={type} onClick={onClick} disabled={disabled || isLoading} className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {isLoading ? (
        <span className='animate-spin inline-block'>🌀</span>
      ) : (
        <>
          {icon && <span className='flex items-center'>{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default CustomButton;
