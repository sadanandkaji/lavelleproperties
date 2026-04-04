"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string | null;
  type: string;
  subType: string;
  layoutType: string;
  furnishing: string;
  amenityCategory: "BASIC" | "FULL";
  description: string;
  createdAt: string;
}

const TRANSFORM = 'w_600,h_400,c_fill,q_auto,f_auto';

function getCloudinaryUrl(url: string | null): string {
  if (!url || typeof url !== 'string' || url === '') return '';
  if (url.includes(TRANSFORM)) return url;
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/${TRANSFORM}/`);
  }
  return url;
}

function PropImage({ src, alt }: { src: string | null; alt: string }) {
  const [imgSrc, setImgSrc] = useState<string>(() => getCloudinaryUrl(src));
  const [error, setError] = useState(false);

  useEffect(() => {
    const cleanUrl = getCloudinaryUrl(src);
    if (!cleanUrl) setError(true);
    else { setImgSrc(cleanUrl); setError(false); }
  }, [src]);

  if (error || !imgSrc) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#c5a05922] to-[#c5a05944]">
        <span className="text-[10px] font-light uppercase tracking-[4px] text-[#c5a059]">
          Luxury Living
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      onError={() => setError(true)}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="relative h-[450px] w-full overflow-hidden rounded-[35px] bg-[#c5a05911] border border-[#d4af3722]">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

function PropertyList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const type = searchParams.get('type');
  const subtype = searchParams.get('subtype');
  const layouttype = searchParams.get('layouttype');
  const furnishing = searchParams.get('furnishing');
  const amenities = searchParams.get('amenities');

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (type) query.set('type', type);
        if (subtype) query.set('subtype', subtype);
        if (layouttype) query.set('layouttype', layouttype);
        if (furnishing) query.set('furnishing', furnishing);
        if (amenities) query.set('amenities', amenities);

        const res = await fetch(`/api/property?${query.toString()}`);
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredData();
  }, [type, subtype, layouttype, furnishing, amenities]);

  if (loading) {
    return (
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 p-10 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-[#c5a059] space-y-6">
        <p className="text-xl font-light tracking-[5px] uppercase text-center">No matching inventory found</p>
        <div className="h-[1px] w-24 bg-[#c5a059]" />
        <button
          onClick={() => router.push('/amenities')}
          className="text-xs font-bold uppercase tracking-widest border border-[#c5a059] px-8 py-3 hover:bg-[#c5a059] hover:text-black transition-all"
        >
          Adjust Amenities
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 p-10 sm:grid-cols-2 lg:grid-cols-3 max-md:p-5">
      {properties.map((prop) => (
        <div
          key={prop.id}
          onClick={() => router.push(`/property/${prop.id}`)}
          className="group relative h-[450px] w-full cursor-pointer overflow-hidden rounded-[35px] border-[1px] border-[#d4af3733] bg-[#1a1a1a] shadow-[0_15px_35px_rgba(0,0,0,0.2)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(139,109,29,0.3)] hover:-translate-y-2"
        >
          <div className="h-full w-full">
            <PropImage src={prop.imageUrl} alt={prop.title} />
          </div>

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent p-6">
            <div className="flex gap-2 mb-3">
              <span className="text-[9px] bg-[#d4af37] text-black px-2 py-0.5 rounded-md font-black uppercase">
                {prop.type}
              </span>
              <span className="text-[9px] bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-md font-bold uppercase">
                {prop.layoutType.replace('BHK', ' BHK')}
              </span>
            </div>

            <h3 className="text-xl font-black text-white tracking-tight leading-tight">
              {prop.title.toUpperCase()}
            </h3>

            <p className="mt-1 text-[0.8rem] font-semibold text-[#c5a059] tracking-widest opacity-90">
              {prop.location.toUpperCase()}
            </p>

            <p className="mt-3 text-[0.75rem] leading-relaxed text-gray-300 line-clamp-2 font-medium italic">
              {prop.description}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 uppercase font-bold">Total Price</span>
                <span className="text-2xl font-black text-[#d4af37]">
                  ₹{prop.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex h-10 w-24 items-center justify-center rounded-full border-[1.5px] border-[#d4af37] text-[10px] font-black uppercase tracking-widest text-white transition-all group-hover:bg-[#d4af37] group-hover:text-black">
                View
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BackButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get('type') || 'rent';
  const subtype = searchParams.get('subtype') || 'flat';
  const layouttype = searchParams.get('layouttype') || '1bhk';
  const furnishing = searchParams.get('furnishing') || 'furnished';

  const handleBack = () => {
    router.push(`/amenities?type=${type}&subtype=${subtype}&layouttype=${layouttype}&furnishing=${furnishing}`);
  };

  return (
    <button 
      onClick={handleBack}
      className="fixed left-6 top-36 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md text-[#c5a059] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 max-md:left-4 max-md:top-36 max-md:h-10 max-md:w-10"
      title="Back to Amenities"
    >
      <ArrowLeft size={24} />
    </button>
  );
}

export default function FilteredPropertiesPage() {
  return (
    <main className="relative min-h-screen bg-transparent pt-20 pb-20">
      <div className="w-full text-center mb-12 px-5">
        <h1 className="text-[#c5a059] text-[0.7rem] font-bold uppercase tracking-[12px] md:tracking-[20px] opacity-80 mt-14">
          Curated Real Estate
        </h1>
        <div className="mt-4 mx-auto h-[1px] w-16 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
      </div>

      <Suspense fallback={
        <div className="flex flex-col h-[50vh] items-center justify-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#c5a059] tracking-[8px] uppercase text-[10px] font-bold animate-pulse">
            Searching Archive
          </p>
        </div>
      }>
        <BackButton />
        <PropertyList />
      </Suspense>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        body {
          background-color: #0a0a0a;
        }
      `}</style>
    </main>
  );
}