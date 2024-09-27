import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='flex justify-between items-center px-6 py-4 bg-white shadow-md'>
      <h1 className='text-3xl font-bold'>Salman Jaher</h1>
      <a
        href='https://github.com/salmanjaher'
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-500 hover:underline'
      >
        GitHub
      </a>
    </header>
  );
};

export default Header;
