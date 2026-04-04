'use client';

import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-[100]
        flex items-center justify-center
        h-[80px] sm:h-[120px]
        
        bg-transparent
        border-b border-[#c5a05933]
        transition-all duration-300 ease-in-out
      "
    >
      <div
        className="
          w-full max-w-[1200px]
          flex items-center justify-center
          px-4 sm:px-6
        "
      >
        <img
          src="/lavelleprop.svg"
          alt="Lavelle Venture"
          className="
            h-[80px] sm:h-[140px]
            w-auto object-contain
          "
        />
      </div>
    </nav>
  );
};

export default Navbar;