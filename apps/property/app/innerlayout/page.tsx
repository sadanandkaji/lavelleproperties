'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const FurnishingContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const propertyType = searchParams.get('type') || 'rent';
  const subType = searchParams.get('subtype') || 'flat';
  const layoutType = searchParams.get('layouttype') || '1bhk';

  const furnishingOptions = [
    { label: 'Furnished', value: 'furnished' },
    { label: 'Semi-Furnished', value: 'semi-furnished' },
    { label: 'Unfurnished', value: 'unfurnished' },
  ];

  return (
    <div className="relative z-10 w-full max-w-[600px] text-center">

      {/* Back Button */}
      <button
        onClick={() => router.push(`/layouttype?type=${propertyType}&subtype=${subType}`)}
        className="fixed left-6 top-36 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md text-[#c5a059] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 max-md:left-4 max-md:top-32 max-md:h-10 max-md:w-10"
        title="Back"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Heading */}
      <h2 className="mb-[60px] mt-16 px-5 text-[1rem] font-light uppercase tracking-[10px] text-[#c5a059] max-md:mb-10 max-md:text-[0.9rem] max-md:tracking-[6px]">
        SELECT FURNISHING
      </h2>

      <div className="flex w-full flex-col items-center gap-[35px] max-md:gap-[25px]">
        {furnishingOptions.map((option) => (
          <Link
            key={option.value}
            href={`/filteredproperties?type=${propertyType}&subtype=${subType}&layouttype=${layoutType}&furnishing=${option.value}`}
            className="flex w-[280px] justify-center no-underline"
          >
            <button className="group relative flex h-[70px] w-[240px] items-center justify-center rounded-full bg-gradient-to-b from-[#d4af37] to-[#b8860b] shadow-[0_10px_0_#8b6d1d,0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-[3px] active:translate-y-[6px] active:shadow-[0_2px_0_#8b6d1d] max-md:h-[65px] max-md:w-[220px]">
              <span className="text-[1.1rem] font-extrabold uppercase tracking-[1px] text-white">
                {option.label}
              </span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

const FurnishingPage: React.FC = () => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-transparent pt-52 max-md:pt-40">
      <Suspense fallback={null}>
        <FurnishingContent />
      </Suspense>
    </main>
  );
};

export default FurnishingPage;