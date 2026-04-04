"use client";

import React, { useState, useEffect } from "react";

interface Amenity {
  id: string;
  name: string;
  category: "BASIC" | "FULL";
}

export default function PropertyForm({ onAdded }: { onAdded: () => void }) {
  const [loading, setLoading] = useState(false);
  const [dbAmenities, setDbAmenities] = useState<Amenity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"BASIC" | "FULL">("BASIC");

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await fetch("/api/amenity");
        const data = await res.json();
        if (Array.isArray(data)) setDbAmenities(data);
      } catch (err) {
        console.error("Failed to load amenities:", err);
      }
    };
    fetchAmenities();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const imageFile = (form.elements.namedItem("image") as HTMLInputElement).files?.[0];
      if (!imageFile) throw new Error("Please select an image");

      const imageFormData = new FormData();
      imageFormData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: imageFormData });
      if (!uploadRes.ok) throw new Error("Image upload failed");
      const uploadData = await uploadRes.json();

      const res = await fetch("/api/property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          location: formData.get("location"),
          price: Number(formData.get("price")),
          description: formData.get("description"),
          imageUrl: uploadData.url,
          type: formData.get("type"),
          subType: formData.get("subType"),
          layoutType: formData.get("layoutType"),
          furnishing: formData.get("furnishing"),
          amenityCategory: selectedCategory, // ← send the category, not individual amenities
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create property");
      }

      form.reset();
      setSelectedCategory("BASIC");
      onAdded();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const label = "block text-[10px] font-bold text-[#555] uppercase tracking-widest mb-1.5";
  const input =
    "w-full px-3 py-2 rounded border border-[#2a2a2a] bg-[#0f0f0f] text-white text-sm placeholder:text-[#333] focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all font-mono";

  const basicAmenities = dbAmenities.filter((a) => a.category === "BASIC");
  const fullAmenities = dbAmenities.filter((a) => a.category === "FULL");

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8 font-mono">
      <div className="border-b border-[#222] pb-4">
        <h2 className="text-base font-bold text-white uppercase tracking-widest">New Property Listing</h2>
        <p className="text-xs text-[#444] mt-1">Fill in all required fields to publish.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Title */}
        <div>
          <label className={label}>Property Title *</label>
          <input name="title" className={input} placeholder="e.g. Modern 3BHK in Indiranagar" required />
        </div>

        {/* Location */}
        <div>
          <label className={label}>Location *</label>
          <input name="location" className={input} placeholder="e.g. Lavelle Road, Bengaluru" required />
        </div>

        {/* Price */}
        <div>
          <label className={label}>Price (₹) *</label>
          <input name="price" type="number" min="0" className={input} placeholder="e.g. 75000" required />
        </div>

        {/* Type */}
        <div>
          <label className={label}>Listing Type</label>
          <select name="type" className={input}>
            <option value="RENT">Rent</option>
            <option value="LEASE">Lease</option>
            <option value="SALE">Sale</option>
          </select>
        </div>

        {/* Sub-Type */}
        <div>
          <label className={label}>Sub-Type</label>
          <select name="subType" className={input}>
            <option value="FLAT">Flat</option>
            <option value="STANDALONE_HOUSE">Standalone House</option>
            <option value="INDEPENDENT_VILLA">Independent Villa</option>
            <option value="PENTHOUSE">Penthouse</option>
          </select>
        </div>

        {/* Layout */}
        <div>
          <label className={label}>Layout</label>
          <select name="layoutType" className={input}>
            <option value="BHK1">1 BHK</option>
            <option value="BHK2">2 BHK</option>
            <option value="BHK2_5">2.5 BHK</option>
            <option value="BHK3">3 BHK</option>
            <option value="BHK3_5">3.5 BHK</option>
            <option value="BHK4">4 BHK</option>
            <option value="BHK5">5 BHK</option>
            <option value="BHK5P">5+ BHK</option>
          </select>
        </div>

        {/* Furnishing */}
        <div>
          <label className={label}>Furnishing</label>
          <select name="furnishing" className={input}>
            <option value="FURNISHED">Furnished</option>
            <option value="SEMIFURNISHED">Semi-Furnished</option>
            <option value="UNFURNISHED">Unfurnished</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2 lg:col-span-2">
          <label className={label}>Property Image *</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            className="w-full text-xs text-[#666] file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-[#333] file:text-xs file:font-bold file:bg-[#1a1a1a] file:text-white hover:file:bg-[#222] cursor-pointer"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className={label}>Description *</label>
          <textarea
            name="description"
            rows={3}
            className={`${input} resize-none`}
            placeholder="Describe the property — layout, condition, neighbourhood, highlights..."
            required
          />
        </div>

        {/* AMENITY CATEGORY SELECTOR */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className={label}>Amenity Package</label>
          <p className="text-[10px] text-[#444] mb-3 uppercase tracking-widest">
            Select the amenity tier that applies to this property. Packages are managed globally.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Card */}
            <div
              onClick={() => setSelectedCategory("BASIC")}
              className={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                selectedCategory === "BASIC"
                  ? "border-[#60a5fa]/60 bg-[#60a5fa]/5"
                  : "border-[#222] bg-[#0f0f0f] hover:border-[#333]"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#60a5fa]">
                    🛡 Basic Package
                  </span>
                  <p className="text-[10px] text-[#444] mt-0.5">Standard amenity tier</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedCategory === "BASIC" ? "border-[#60a5fa]" : "border-[#333]"
                  }`}
                >
                  {selectedCategory === "BASIC" && (
                    <div className="w-2 h-2 rounded-full bg-[#60a5fa]" />
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {basicAmenities.length === 0 ? (
                  <span className="text-[10px] text-[#333] italic">No amenities configured</span>
                ) : (
                  basicAmenities.map((a) => (
                    <span
                      key={a.id}
                      className="text-[9px] font-bold px-2 py-0.5 rounded border border-[#60a5fa]/20 bg-[#60a5fa]/5 text-[#60a5fa]"
                    >
                      {a.name}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Full Card */}
            <div
              onClick={() => setSelectedCategory("FULL")}
              className={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                selectedCategory === "FULL"
                  ? "border-[#a78bfa]/60 bg-[#a78bfa]/5"
                  : "border-[#222] bg-[#0f0f0f] hover:border-[#333]"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#a78bfa]">
                    💎 Full Package
                  </span>
                  <p className="text-[10px] text-[#444] mt-0.5">Premium amenity tier</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedCategory === "FULL" ? "border-[#a78bfa]" : "border-[#333]"
                  }`}
                >
                  {selectedCategory === "FULL" && (
                    <div className="w-2 h-2 rounded-full bg-[#a78bfa]" />
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {fullAmenities.length === 0 ? (
                  <span className="text-[10px] text-[#333] italic">No amenities configured</span>
                ) : (
                  fullAmenities.map((a) => (
                    <span
                      key={a.id}
                      className="text-[9px] font-bold px-2 py-0.5 rounded border border-[#a78bfa]/20 bg-[#a78bfa]/5 text-[#a78bfa]"
                    >
                      {a.name}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-[#1a1a1a] disabled:text-[#444] text-black text-xs font-bold uppercase tracking-widest rounded transition-all active:scale-95"
        >
          {loading ? "Publishing..." : "Publish Listing →"}
        </button>
      </div>
    </form>
  );
}