'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, ArrowLeft } from 'lucide-react';

const AmenitiesContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  const propertyType = searchParams.get('type') || 'rent';
  const subType = searchParams.get('subtype') || 'flat';
  const layoutType = searchParams.get('layouttype') || '1bhk';
  const furnishing = searchParams.get('furnishing') || 'furnished';

  const basicList = [
    "Lift", "Bike/car Parking", "Security Guard", 
    "Power Backup", "Water Facilities (Kaveri River)", "Pets Friendly"
  ];

  const fullList = [
    ...basicList,
    "Gym", "Gated Community", "Party Hall", 
    "Meeting Room", "Swimming Pool", "Children Play Ground", "Outdoor Games"
  ];

  const toggleExpand = (type: string) => {
    setExpanded(prev => (prev === type ? null : type));
  };

  const AmenityCard = ({ title, list, type }: { title: string, list: string[], type: string }) => (
    <div className="flex w-full flex-col gap-[10px] overflow-hidden rounded-[35px] border-[1.5px] border-[#d4af37] bg-white/40 backdrop-blur-md p-4 shadow-[0_10px_30px_rgba(139,109,29,0.1)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(139,109,29,0.2)]">
      <div className="flex w-full items-center justify-center gap-3">
        <Link 
          href={`/filteredproperties?type=${propertyType}&subtype=${subType}&layouttype=${layoutType}&furnishing=${furnishing}&amenities=${type}`}
          className="flex items-center justify-center no-underline"
        >
          <button className="relative flex h-[65px] w-[220px] items-center justify-center rounded-full bg-gradient-to-b from-[#d4af37] to-[#b8860b] shadow-[0_8px_0_#8b6d1d,0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-[2px] active:translate-y-[4px] active:shadow-[0_2px_0_#8b6d1d] max-md:h-[60px] max-md:w-[180px]">
            <span className="text-[0.9rem] font-extrabold tracking-[1px] text-white">
              {title}
            </span>
          </button>
        </Link>
        
        <button 
          type="button" 
          onClick={() => toggleExpand(type)}
          className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full border-2 border-[#c5a059] bg-white shadow-md transition-all hover:bg-[#fdfbf0] active:scale-95"
        >
          <div className={`text-[#c5a059] transition-transform duration-500 ease-in-out ${expanded === type ? 'rotate-180' : ''}`}>
            <ChevronDown size={28} />
          </div>
        </button>
      </div>
      
      <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${expanded === type ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <ul className="mt-4 list-none border-t border-dashed border-[#c5a05966] px-5 py-[20px] text-center">
            {list.map((item, idx) => (
              <li key={idx} className="py-1 text-[0.95rem] font-medium text-[#5a4a24]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative z-10 mt-[20px] flex w-full max-w-[450px] flex-col items-center px-4 pb-20">
      
      {/* Back Button - Moved slightly up to top-48 (Desktop) and top-40 (Mobile) */}
      <button 
        onClick={() => router.push(`/innerlayout?type=${propertyType}&subtype=${subType}&layouttype=${layoutType}`)}
        className="fixed left-6 top-36 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md text-[#c5a059] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 max-md:left-4 max-md:top-36 max-md:h-10 max-md:w-10"
        title="Back to Configuration"
      >
        <ArrowLeft size={24} />
      </button>

      <h2 className="mb-12 text-center text-[1.1rem] font-light uppercase tracking-[12px] text-[#c5a059] max-md:tracking-[6px]">
        SELECT AMENITIES
      </h2>
      
      <div className="flex w-full flex-col gap-[30px]">
        <AmenityCard title="BASIC AMENITIES" list={basicList} type="basic" />
        <AmenityCard title="FULL AMENITIES" list={fullList} type="full" />
      </div>
    </div>
  );
};

const AmenitiesPage = () => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-transparent pt-50 max-md:pt-48">
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="animate-pulse text-[#c5a059] tracking-[10px] text-lg uppercase">
            Loading...
          </div>
        </div>
      }>
        <AmenitiesContent />
      </Suspense>
    </main>
  );
};

export default AmenitiesPage;