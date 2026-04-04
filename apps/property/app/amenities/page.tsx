'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, ArrowLeft, Sparkles, Shield } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface AmenitiesData {
  basic: string[];
  full: string[];
}

// ─── Hook: fetch amenities from API ──────────────────────────────────────────
function useAmenities() {
  const [data, setData] = useState<AmenitiesData>({ basic: [], full: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/amenities', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<AmenitiesData>;
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Could not load amenities. Please try again.');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const AmenityCardSkeleton = () => (
  <div className="w-full rounded-[35px] border-[1.5px] border-[#d4af3744] bg-white/30 backdrop-blur-md p-5 animate-pulse">
    <div className="flex items-center justify-center gap-3">
      <div className="h-[65px] w-[220px] rounded-full bg-[#d4af3733]" />
      <div className="h-[55px] w-[55px] rounded-full bg-[#d4af3722]" />
    </div>
  </div>
);

// ─── Main content ─────────────────────────────────────────────────────────────
const AmenitiesContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  const propertyType = searchParams.get('type') || 'rent';
  const subType = searchParams.get('subtype') || 'flat';
  const layoutType = searchParams.get('layouttype') || '1bhk';
  const furnishing = searchParams.get('furnishing') || 'furnished';

  const { data, loading, error } = useAmenities();

  const toggleExpand = (type: string) => {
    setExpanded((prev) => (prev === type ? null : type));
  };

  // FULL list = BASIC items + FULL-category items
  const fullList = [...data.basic, ...data.full];

  const cards = [
    {
      type: 'basic',
      title: 'BASIC AMENITIES',
      list: data.basic,
    },
    {
      type: 'full',
      title: 'FULL AMENITIES',
      list: fullList,
    },
  ];

  return (
    <div className="relative z-10 mt-[20px] flex w-full max-w-[450px] flex-col items-center px-4 pb-20">

      {/* Back Button */}
      <button
        onClick={() =>
          router.push(
            `/innerlayout?type=${propertyType}&subtype=${subType}&layouttype=${layoutType}`
          )
        }
        className="fixed left-6 top-36 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md text-[#c5a059] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 max-md:left-4 max-md:top-30 max-md:h-10 max-md:w-10"
        title="Back to Configuration"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Heading */}
      <h2 className="mb-12 text-center text-[1.1rem] font-light uppercase tracking-[12px] text-[#c5a059] max-md:tracking-[6px]">
        SELECT AMENITIES
      </h2>

      {/* Error state */}
      {error && (
        <div className="mb-6 w-full rounded-2xl border border-red-300 bg-red-50/60 px-5 py-4 text-center text-sm text-red-600 backdrop-blur-sm">
          {error}
        </div>
      )}

      {/* Cards */}
      <div className="flex w-full flex-col gap-[30px]">
        {loading ? (
          <>
            <AmenityCardSkeleton />
            <AmenityCardSkeleton />
          </>
        ) : (
          cards.map(({ type, title, list}) => (
            <div
              key={type}
              className="flex w-full flex-col gap-[10px] overflow-hidden rounded-[35px] border-[1.5px] border-[#d4af37] bg-white/40 backdrop-blur-md p-4 shadow-[0_10px_30px_rgba(139,109,29,0.1)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(139,109,29,0.2)]"
            >
              {/* Card Header */}
              <div className="flex w-full items-center justify-center gap-3">
                <Link
                  href={`/filteredproperties?type=${propertyType}&subtype=${subType}&layouttype=${layoutType}&furnishing=${furnishing}&amenities=${type}`}
                  className="flex items-center justify-center no-underline"
                >
                  {/* ── Same gold 3D style for BOTH buttons ── */}
                  <button className="relative flex h-[65px] w-[220px] flex-col items-center justify-center gap-0.5 rounded-full bg-gradient-to-b from-[#d4af37] to-[#b8860b] shadow-[0_8px_0_#8b6d1d,0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-[2px] active:translate-y-[4px] active:shadow-[0_2px_0_#8b6d1d] max-md:h-[60px] max-md:w-[180px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[0.9rem] font-extrabold tracking-[1px] text-white">
                        {title}
                      </span>
                    </div>
                  
                  </button>
                </Link>

                {/* Expand toggle */}
                <button
                  type="button"
                  onClick={() => toggleExpand(type)}
                  aria-expanded={expanded === type}
                  aria-label={`Toggle ${title} list`}
                  className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full border-2 border-[#c5a059] bg-white shadow-md transition-all hover:bg-[#fdfbf0] active:scale-95"
                >
                  <div
                    className={`text-[#c5a059] transition-transform duration-500 ease-in-out ${
                      expanded === type ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown size={28} />
                  </div>
                </button>
              </div>

              {/* Expandable list */}
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  expanded === type ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  {list.length === 0 ? (
                    <p className="mt-4 border-t border-dashed border-[#c5a05966] py-5 text-center text-sm text-[#9a7c42]">
                      No amenities found.
                    </p>
                  ) : (
                    <ul className="mt-4 list-none border-t border-dashed border-[#c5a05966] px-5 py-[20px] text-center">
                      {list.map((item, idx) => (
                        <li
                          key={idx}
                          className="py-1 text-[0.95rem] font-medium text-[#5a4a24]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─── Page wrapper ─────────────────────────────────────────────────────────────
const AmenitiesPage = () => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-transparent pt-50 max-md:pt-48">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="animate-pulse text-[#c5a059] tracking-[10px] text-lg uppercase">
              Loading...
            </div>
          </div>
        }
      >
        <AmenitiesContent />
      </Suspense>
    </main>
  );
};

export default AmenitiesPage;