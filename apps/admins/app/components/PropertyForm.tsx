"use client";

import React, { useState, useRef } from "react";

interface ImagePreview {
  file: File | null;
  url: string;       // local preview or uploaded URL
  uploaded: boolean; // true once Cloudinary URL is confirmed
  cloudUrl: string;
}

const LAYOUT_OPTIONS = [
  "BHK1", "BHK2", "BHK2_5", "BHK3", "BHK3_5", "BHK4", "BHK5", "BHK5P",
];

const formatLayout = (l: string) =>
  l.replace("BHK", "").replace("_", ".").replace("P", "+") + " BHK";

export default function PropertyForm({ onAdded }: { onAdded: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",

    // Pricing
    price: "",
    pricePerSqft: "",
    priceNote: "",
    callForPrice: false,

    // Basic facts
    bedrooms: "",
    bathrooms: "",
    halfBaths: "",
    totalRooms: "",
    floors: "",
    floorLevel: "",
    areaSqft: "",
    lotSizeSqft: "",
    yearBuilt: "",
    yearRemodeled: "",

    // Tag fields (comma-separated inputs)
    rentPeriods: "",
    statuses: "",
    parkingOptions: "",
    basementOptions: "",

    // Categorization
    type: "RENT",
    subType: "FLAT",
    layoutType: "BHK1",
    furnishing: "FURNISHED",
    amenityCategory: "BASIC",
  });

  const [images, setImages] = useState<ImagePreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = 10 - images.length;
    const toProcess = files.slice(0, remaining);

    // Create local previews immediately
    const previews: ImagePreview[] = toProcess.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      uploaded: false,
      cloudUrl: "",
    }));
    setImages((prev) => [...prev, ...previews]);
    setUploading(true);

    // Upload each to Cloudinary
    const uploaded = await Promise.all(
      toProcess.map(async (file) => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        return data.url as string;
      })
    );

    // Update previews with cloud URLs
    setImages((prev) => {
      const updated = [...prev];
      let cloudIdx = 0;
      for (let i = updated.length - toProcess.length; i < updated.length; i++) {
        updated[i] = {
          ...updated[i],
          uploaded: true,
          cloudUrl: uploaded[cloudIdx++],
        };
      }
      return updated;
    });

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.location || !form.price) {
      setError("Title, location, and price are required.");
      return;
    }

    if (images.some((img) => !img.uploaded)) {
      setError("Please wait for all images to finish uploading.");
      return;
    }

    const splitTags = (s: string) =>
      s
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    setSubmitting(true);
    try {
      const res = await fetch("/api/property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          pricePerSqft: form.pricePerSqft ? Number(form.pricePerSqft) : null,
          bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
          bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
          halfBaths: form.halfBaths ? Number(form.halfBaths) : null,
          totalRooms: form.totalRooms ? Number(form.totalRooms) : null,
          floors: form.floors ? Number(form.floors) : null,
          floorLevel: form.floorLevel ? Number(form.floorLevel) : null,
          areaSqft: form.areaSqft ? Number(form.areaSqft) : null,
          lotSizeSqft: form.lotSizeSqft ? Number(form.lotSizeSqft) : null,
          yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : null,
          yearRemodeled: form.yearRemodeled ? Number(form.yearRemodeled) : null,
          rentPeriods: splitTags(form.rentPeriods),
          statuses: splitTags(form.statuses),
          parkingOptions: splitTags(form.parkingOptions),
          basementOptions: splitTags(form.basementOptions),
          images: images.map((img, i) => ({
            url: img.cloudUrl,
            isPrimary: i === 0,
            order: i,
          })),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create property");
      }

      onAdded();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-emerald-500/60 transition";
  const labelCls = "block text-[10px] font-bold uppercase tracking-widest text-[#555] mb-1.5";
  const sectionCls = "border-b border-[#1e1e1e] pb-6 mb-6";

  return (
    <form onSubmit={handleSubmit} className="p-6 font-mono">
      <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        New Property Listing
      </h2>

      {error && (
        <div className="mb-4 rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400">
          ⚠ {error}
        </div>
      )}

      {/* BASIC INFO */}
      <div className={sectionCls}>
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">Basic Info</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelCls}>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Property title" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Location *</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="City, area" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Type</label>
            <select name="type" value={form.type} onChange={handleChange} className={inputCls}>
              <option value="RENT">Rent</option>
              <option value="LEASE">Lease</option>
              <option value="SALE">Sale</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Property description..." className={inputCls + " resize-none"} />
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div className={sectionCls}>
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">Set Property Price</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className={labelCls}>Price (₹) *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Price per sqft (₹)</label>
            <input name="pricePerSqft" type="number" value={form.pricePerSqft} onChange={handleChange} placeholder="0" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Price Note</label>
            <input name="priceNote" value={form.priceNote} onChange={handleChange} placeholder="E.g. Start From" className={inputCls} />
          </div>
        </div>
        <label className="mt-3 flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="callForPrice" checked={form.callForPrice} onChange={handleChange} className="accent-emerald-400" />
          <span className="text-xs text-[#666]">Call for price</span>
        </label>
      </div>

      {/* BASIC FACTS */}
      <div className={sectionCls}>
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">Basic Facts</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            { name: "bedrooms", label: "Bedrooms" },
            { name: "bathrooms", label: "Bathrooms" },
            { name: "halfBaths", label: "Half Baths" },
            { name: "totalRooms", label: "Total Rooms" },
            { name: "floors", label: "Floors" },
            { name: "floorLevel", label: "Floor Level" },
            { name: "areaSqft", label: "Area, sq ft" },
            { name: "lotSizeSqft", label: "Lot Size, sq ft" },
            { name: "yearBuilt", label: "Year Built" },
            { name: "yearRemodeled", label: "Year Remodeled" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className={labelCls}>{label}</label>
              <input
                name={name}
                type="number"
                value={(form as any)[name]}
                onChange={handleChange}
                placeholder="—"
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </div>

      {/* TAGS */}
      <div className={sectionCls}>
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">Tags (comma-separated)</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { name: "rentPeriods", label: "Rent Periods" },
            { name: "statuses", label: "Statuses" },
            { name: "parkingOptions", label: "Parking" },
            { name: "basementOptions", label: "Basement" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className={labelCls}>{label}</label>
              <input
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
                placeholder="e.g. Monthly, Yearly"
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIZATION */}
      <div className={sectionCls}>
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">Categorization</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <label className={labelCls}>Sub Type</label>
            <select name="subType" value={form.subType} onChange={handleChange} className={inputCls}>
              <option value="FLAT">Flat</option>
              <option value="STANDALONE_HOUSE">Standalone House</option>
              <option value="INDEPENDENT_VILLA">Independent Villa</option>
              <option value="PENTHOUSE">Penthouse</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Layout</label>
            <select name="layoutType" value={form.layoutType} onChange={handleChange} className={inputCls}>
              {LAYOUT_OPTIONS.map((l) => (
                <option key={l} value={l}>{formatLayout(l)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Furnishing</label>
            <select name="furnishing" value={form.furnishing} onChange={handleChange} className={inputCls}>
              <option value="FURNISHED">Furnished</option>
              <option value="SEMIFURNISHED">Semi-Furnished</option>
              <option value="UNFURNISHED">Unfurnished</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Amenity Tier</label>
            <select name="amenityCategory" value={form.amenityCategory} onChange={handleChange} className={inputCls}>
              <option value="BASIC">Basic</option>
              <option value="FULL">Full</option>
            </select>
          </div>
        </div>
      </div>

      {/* IMAGES */}
      <div className="mb-6">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">
          Photos ({images.length}/10)
        </p>

        <div className="grid grid-cols-5 gap-3 mb-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative group aspect-square rounded overflow-hidden border border-[#2a2a2a]">
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              {!img.uploaded && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              )}
              {idx === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-emerald-500/80 text-black text-[8px] font-bold text-center py-0.5 uppercase tracking-widest">
                  Primary
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 h-5 w-5 rounded bg-black/80 text-red-400 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}

          {images.length < 10 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded border border-dashed border-[#2a2a2a] flex flex-col items-center justify-center gap-1 text-[#444] hover:border-emerald-500/40 hover:text-emerald-500/60 transition"
            >
              <span className="text-xl leading-none">+</span>
              <span className="text-[8px] uppercase tracking-widest">Add</span>
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageSelect}
        />
        <p className="text-[10px] text-[#444]">First image will be the primary/cover photo. Max 10 images.</p>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={submitting || uploading}
        className="w-full py-3 rounded bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest transition hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? "Creating Listing..." : uploading ? "Uploading Images..." : "Create Listing"}
      </button>
    </form>
  );
}