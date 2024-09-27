import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300'>
      {children}
    </button>
  );
};

export default Button;
