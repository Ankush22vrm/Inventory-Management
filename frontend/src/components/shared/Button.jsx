import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled,
  className = '',
  type = 'button',
}) => {
  const baseStyles =
    'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 justify-center';
  const variants = {
    primary:
      'bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-300',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
    outline:
      'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {children}
    </button>
  );
};

export default Button;