'use client';

import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center bg-transparent transition-all duration-300 ease-in-out h-[110px] border-b border-[#c5a05966] md:h-[110px] max-md:h-[120px]">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center px-[60px]">
        <div className="flex items-center justify-center">
          <img 
            src="/lavelleprop.svg" 
            alt="Lavelle Venture" 
            className="block w-auto max-w-[500px] object-contain h-[160px] max-md:h-[110px]" 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar