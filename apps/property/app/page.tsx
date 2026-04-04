'use client';

import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  const categories = ['Rent', 'Lease', 'Sale'];

  return (
    /* REMOVED bg-[#fdfbf0] - Now the global background shines through */
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent">
      
      <div className="z-10 w-full text-center">
        {/* Title with extra wide tracking for that luxury feel */}
        <h2 className="mb-[60px] text-[1.1rem] font-light uppercase tracking-[16px] text-[#c5a059] max-md:mb-10 max-md:tracking-[10px]">
          LAVELLE VENTURE
        </h2>

        {/* Responsive Button Wrapper */}
        <div className="flex flex-row items-center justify-center gap-[50px] max-md:flex-col max-md:gap-[30px]">
          {categories.map((item) => (
            <Link 
              key={item} 
              href={`/properties?type=${item.toLowerCase()}`} 
              className="flex w-[300px] justify-center no-underline max-md:w-full"
            >
              <button className="group relative flex h-[80px] w-[260px] items-center justify-center rounded-full bg-gradient-to-b from-[#d4af37] to-[#b8860b] shadow-[0_14px_0_#8b6d1d,0_30px_60px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_18px_0_#8b6d1d,0_35px_70px_rgba(0,0,0,0.25)] active:translate-y-[10px] active:shadow-[0_4px_0_#8b6d1d,0_10px_25px_rgba(0,0,0,0.1)]">
                <span className="text-[1.4rem] font-extrabold tracking-[4px] text-white">
                  {item.toUpperCase()}
                </span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;