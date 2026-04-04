'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const PropertiesContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const propertyType = searchParams.get('type') || 'rent';
  const subTypes = ['Flats', 'Standalone House', 'Independent Villa', 'Penthouse'];

  return (
    <div className="relative z-10 w-full px-5 py-10 text-center">
      
      {/* Circular Back Button - Positioned below Navbar */}
      <button 
  onClick={() => router.push('/')}
  className="
    fixed z-50 flex items-center justify-center 
    h-12 w-12 md:h-12 md:w-12
    rounded-full border border-[#d4af3744] 
    bg-white/10 backdrop-blur-md text-[#c5a059] 
    shadow-lg transition-all 
    hover:scale-110 hover:bg-[#d4af37] hover:text-white 
    active:scale-95

    /* Default (desktop & normal phones) */
    left-4 top-22 md:left-6

    /* 👇 Move tighter to top-left ONLY for small screens */
    [@media(max-width:320px)]:top-16
    [@media(max-width:320px)]:left-0

    [@media(max-width:300px)]:top-18
    [@media(max-width:300px)]:left-2
  "
  title="Back to Home"
>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
        </svg>
      </button>

      {/* Main Heading - mt-20 ensures it doesn't collide with the button */}
      <h2 className="mb-[60px] mt-20 text-[1.1rem] font-light uppercase tracking-[12px] text-[#c5a059] max-md:mb-10 max-md:mt-16 max-md:text-[0.9rem] max-md:tracking-[8px]">
        SELECT {propertyType.toUpperCase()} TYPE
      </h2>
      
      <div className="flex flex-col items-center gap-[45px]">
        {subTypes.map((item) => {
          const subTypeValue = item.toLowerCase().replace(/\s+/g, '-');
          return (
            <Link 
              key={item} 
              href={`/layouttype?type=${propertyType}&subtype=${subTypeValue}`} 
              className="flex w-full justify-center no-underline"
            >
              <button className="group relative flex h-[80px] w-[320px] items-center justify-center rounded-full bg-gradient-to-b from-[#d4af37] to-[#b8860b] shadow-[0_14px_0_#8b6d1d,0_30px_60px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-[5px] hover:brightness-[1.08] hover:shadow-[0_18px_0_#8b6d1d,0_35px_70px_rgba(0,0,0,0.25)] active:translate-y-[10px] active:shadow-[0_2px_0_#8b6d1d,0_10px_25px_rgba(0,0,0,0.2)] max-md:w-[280px]">
                <span className="text-[1.1rem] font-extrabold tracking-[3px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] max-md:text-[0.9rem] max-md:tracking-[2px]">
                  {item.toUpperCase()}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const PropertiesPage: React.FC = () => {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center overflow-hidden bg-transparent pt-22">

  {/* 👇 Scaling only for tiny screens */}
  <div className="
    w-full flex justify-center 
    [@media(max-width:320px)]:scale-[0.85]
    [@media(max-width:300px)]:scale-[0.78]
    origin-top
  ">
    <Suspense fallback={null}>
      <PropertiesContent />
    </Suspense>
  </div>

</main>
  );
};

export default PropertiesPage;