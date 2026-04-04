'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const LayoutTypeContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const propertyType = searchParams.get('type') || 'rent';
  const subType = searchParams.get('subtype') || 'flat';

  const layouts = [
    '1BHK', '2BHK', '2.5BHK', '3BHK', 
    '3.5BHK', '4BHK', '5BHK', '5+BHK'
  ];

  return (
    /* mt-20 clears the fixed back button and provides breathing room below navbar */
    <div className="relative z-10 mt-20 w-full max-w-[800px] px-4 text-center">
      
      {/* Back Button - Positioned to stay visible below navbar */}
      <button 
        onClick={() => router.push(`/properties?type=${propertyType}`)}
        className="fixed left-4 top-36 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md text-[#c5a059] shadow-lg transition-all hover:scale-110 hover:bg-[#d4af37] hover:text-white active:scale-95 md:left-6 md:h-12 md:w-12"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
        </svg>
      </button>

      <h2 className="mb-10 text-[0.8rem] font-light uppercase tracking-[8px] text-[#c5a059] md:text-[1rem] md:tracking-[10px]">
        {subType.replace('-', ' ').toUpperCase()} CONFIGURATION
      </h2>
      
      {/* Changed grid-cols-1 to grid-cols-2 for mobile */}
      <div className="grid grid-cols-2 place-items-center gap-x-3 gap-y-8 md:gap-x-10 md:gap-y-10">
        {layouts.map((item) => {
          const layoutValue = item.toLowerCase().replace('+', 'plus');
          
          return (
            <Link 
              key={item} 
              href={`/innerlayout?type=${propertyType}&subtype=${subType}&layouttype=${layoutValue}`} 
              className="flex w-full justify-center no-underline"
            >
              {/* Adjusted width (w-full max-w-[160px]) to ensure two columns fit on small screens */}
              <button className="group relative flex h-[60px] w-full max-w-[160px] items-center justify-center rounded-full bg-gradient-to-b from-[#d4af37] to-[#b8860b] shadow-[0_8px_0_#8b6d1d,0_15px_30px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-[3px] active:translate-y-[4px] active:shadow-[0_2px_0_#8b6d1d] md:h-[70px] md:max-w-[240px] md:shadow-[0_10px_0_#8b6d1d,0_20px_40px_rgba(0,0,0,0.15)]">
                <span className="text-[0.9rem] font-extrabold tracking-[1px] text-white md:text-[1.2rem] md:tracking-[2px]">
                  {item}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const LayoutTypePage: React.FC = () => {
  return (
    /* pt-24 ensures the entire content starts below your fixed navbar */
    <main className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-transparent pb-[100px] pt-34">
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="animate-pulse text-[#c5a059] tracking-[10px] text-lg uppercase">Loading...</div>
        </div>
      }>
        <LayoutTypeContent />
      </Suspense>
    </main>
  );
};

export default LayoutTypePage;