"use client";

import React, { useState, useEffect, useRef } from "react";
import { Property, PropertyAmenity } from "./PropertyCard";

interface Props {
  property: Property;
  onClose: () => void;
  onSaved: () => void;
}

const LAYOUT_OPTIONS = [
  "BHK1", "BHK2", "BHK2_5", "BHK3", "BHK3_5", "BHK4", "BHK5", "BHK5P",
];

const formatLayout = (l: string) =>
  l.replace("BHK", "").replace("_", ".").replace("P", "+") + " BHK";

interface ImagePreview {
  file: File | null;
  url: string;
  uploaded: boolean;
  cloudUrl: string;
  existingUrl?: string; // for already-uploaded images
}

export default function PropertyEditModal({ property, onClose, onSaved }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: property.title,
    location: property.location,
    description: property.description ?? "",
    price: String(property.price),
    pricePerSqft: String(property.pricePerSqft ?? ""),
    priceNote: property.priceNote ?? "",
    callForPrice: property.callForPrice ?? false,
    isSoldOut: property.isSoldOut ?? false,
    bedrooms: String(property.bedrooms ?? ""),
    bathrooms: String(property.bathrooms ?? ""),
    halfBaths: String(property.halfBaths ?? ""),
    totalRooms: String(property.totalRooms ?? ""),
    floors: String(property.floors ?? ""),
    floorLevel: String(property.floorLevel ?? ""),
    areaSqft: String(property.areaSqft ?? ""),
    lotSizeSqft: String(property.lotSizeSqft ?? ""),
    yearBuilt: String(property.yearBuilt ?? ""),
    yearRemodeled: String(property.yearRemodeled ?? ""),
    rentPeriods: (property.rentPeriods ?? []).join(", "),
    statuses: (property.statuses ?? []).join(", "),
    parkingOptions: (property.parkingOptions ?? []).join(", "),
    basementOptions: (property.basementOptions ?? []).join(", "),
    type: property.type,
    subType: property.subType,
    layoutType: property.layoutType,
    furnishing: property.furnishing,
    amenityCategory: property.amenityCategory,
  });

  // Images state — start with existing images
  const [images, setImages] = useState<ImagePreview[]>(
    (property.images || []).map((img) => ({
      file: null,
      url: img.url,
      uploaded: true,
      cloudUrl: img.url,
      existingUrl: img.url,
    }))
  );
  const [uploading, setUploading] = useState(false);
  const [imagesChanged, setImagesChanged] = useState(false);

  // Per-property amenities
  const [amenities, setAmenities] = useState<PropertyAmenity[]>(
    property.propertyAmenities || []
  );
  const [globalAmenities, setGlobalAmenities] = useState<{ id: string; name: string }[]>([]);
  const [newAmenityName, setNewAmenityName] = useState("");
  const [amenityLoading, setAmenityLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "images" | "amenities">("details");

  // Fetch global amenities for quick-add suggestions
  useEffect(() => {
    fetch(`/api/amenity?category=${property.amenityCategory}`)
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setGlobalAmenities(d); })
      .catch(() => {});
  }, [property.amenityCategory]);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

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

  // ── Image handling ──
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = 10 - images.length;
    const toProcess = files.slice(0, remaining);

    const previews: ImagePreview[] = toProcess.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      uploaded: false,
      cloudUrl: "",
    }));
    setImages((prev) => [...prev, ...previews]);
    setUploading(true);
    setImagesChanged(true);

    const uploaded = await Promise.all(
      toProcess.map(async (file) => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        return data.url as string;
      })
    );

    setImages((prev) => {
      const updated = [...prev];
      let cloudIdx = 0;
      for (let i = updated.length - toProcess.length; i < updated.length; i++) {
        updated[i] = { ...updated[i], uploaded: true, cloudUrl: uploaded[cloudIdx++] };
      }
      return updated;
    });

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImagesChanged(true);
  };

  // ── Per-property amenity CRUD ──
  const handleAddAmenity = async () => {
    const name = newAmenityName.trim();
    if (!name) return;

if (amenities.some(a => a.name.toLowerCase() === name.toLowerCase())) {
  return;
}
    setAmenityLoading(true);
    try {
      const res = await fetch("/api/property-amenity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property.id, name }),
      });
      if (res.ok) {
        const created = await res.json();
        setAmenities((prev) => [...prev, created]);
        setNewAmenityName("");
      } else {
        const d = await res.json();
        alert(d.error || "Failed to add amenity");
      }
    } finally {
      setAmenityLoading(false);
    }
  };

  const handleRemoveAmenity = async (id: string) => {
    try {
      const res = await fetch(`/api/property-amenity?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setAmenities((prev) => prev.filter((a) => a.id !== id));
      } else {
        const d = await res.json();
        alert(d.error || "Failed to remove amenity");
      }
    } catch {
      alert("Network error");
    }
  };

  const handleQuickAdd = async (name: string) => {
    if (amenities.some((a) => a.name.toLowerCase() === name.toLowerCase())) return;
    setAmenityLoading(true);
    try {
      const res = await fetch("/api/property-amenity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property.id, name }),
      });
      if (res.ok) {
        const created = await res.json();
        setAmenities((prev) => [...prev, created]);
      }
    } finally {
      setAmenityLoading(false);
    }
  };

  // ── Submit ──
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
      s.split(",").map((t) => t.trim()).filter(Boolean);

    setSubmitting(true);
    try {
      const body: any = {
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
      };

      // Only send images array if it changed (to avoid unnecessary DB writes)
      if (imagesChanged) {
        body.images = images.map((img, i) => ({
          url: img.cloudUrl,
          isPrimary: i === 0,
          order: i,
        }));
      }

      const res = await fetch(`/api/property?id=${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update property");
      }

      onSaved();
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

  const tabs = [
    { id: "details", label: "Details" },
    { id: "images", label: `Images (${images.length})` },
    { id: "amenities", label: `Amenities (${amenities.length})` },
  ] as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#141414] border border-[#222] rounded-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222] bg-[#0f0f0f]">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
              Edit Listing
            </h2>
            <p className="text-[10px] text-[#444] mt-0.5 truncate max-w-xs">{property.title}</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-black/80 border border-[#333] text-[#888] text-sm flex items-center justify-center hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b border-[#222] bg-[#0f0f0f]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-yellow-400"
                  : "text-[#444] hover:text-[#888]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mx-6 mt-4 rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400">
              ⚠ {error}
            </div>
          )}

          {/* ── DETAILS TAB ── */}
          {activeTab === "details" && (
            <div className="p-6 max-h-[65vh] overflow-y-auto">
              {/* Basic Info */}
              <div className={sectionCls}>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">Basic Info</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className={labelCls}>Title *</label>
                    <input name="title" value={form.title} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Location *</label>
                    <input name="location" value={form.location} onChange={handleChange} className={inputCls} />
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
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputCls + " resize-none"} />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className={sectionCls}>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">Pricing</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className={labelCls}>Price (₹) *</label>
                    <input name="price" type="number" value={form.price} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Price per sqft (₹)</label>
                    <input name="pricePerSqft" type="number" value={form.pricePerSqft} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Price Note</label>
                    <input name="priceNote" value={form.priceNote} onChange={handleChange} className={inputCls} />
                  </div>
                </div>
                <div className="mt-3 flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="callForPrice" checked={form.callForPrice} onChange={handleChange} className="accent-emerald-400" />
                    <span className="text-xs text-[#666]">Call for price</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isSoldOut" checked={form.isSoldOut} onChange={handleChange} className="accent-red-400" />
                    <span className="text-xs text-red-400/80 font-bold uppercase tracking-widest">Mark as Sold Out</span>
                  </label>
                </div>
              </div>

              {/* Basic Facts */}
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
                      <input name={name} type="number" value={(form as any)[name]} onChange={handleChange} placeholder="—" className={inputCls} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
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
                      <input name={name} value={(form as any)[name]} onChange={handleChange} placeholder="e.g. Monthly, Yearly" className={inputCls} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorization */}
              <div>
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
            </div>
          )}

          {/* ── IMAGES TAB ── */}
          {activeTab === "images" && (
            <div className="p-6 max-h-[65vh] overflow-y-auto">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">
                Photos ({images.length}/10) — first image is primary
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

              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />
              <p className="text-[10px] text-[#444]">Remove or add photos. Changes saved when you click Save.</p>
            </div>
          )}

          {/* ── AMENITIES TAB ── */}
          {activeTab === "amenities" && (
            <div className="p-6 max-h-[65vh] overflow-y-auto">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">
                Per-Property Amenities — saved immediately
              </p>

              {/* Add custom amenity */}
              <div className="flex gap-2 mb-4">
                <input
                  value={newAmenityName}
                  onChange={(e) => setNewAmenityName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddAmenity(); } }}
                  placeholder="New amenity name..."
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={handleAddAmenity}
                  disabled={amenityLoading || !newAmenityName.trim()}
                  className="px-4 py-2 bg-emerald-500 text-black text-xs font-bold rounded uppercase tracking-widest hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  {amenityLoading ? "..." : "Add"}
                </button>
              </div>

              {/* Quick-add from global tier */}
              {globalAmenities.length > 0 && (
                <div className="mb-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#333] mb-2">
                    Quick-add from {property.amenityCategory.toLowerCase()} tier:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {globalAmenities.map((ga) => {
                      const alreadyAdded = amenities.some(
                        (a) => a.name.toLowerCase() === ga.name.toLowerCase()
                      );
                      return (
                        <button
                          key={ga.id}
                          type="button"
                          onClick={() => handleQuickAdd(ga.name)}
                          disabled={alreadyAdded || amenityLoading}
                          className={`text-[9px] font-bold px-2 py-1 rounded border uppercase tracking-widest transition ${
                            alreadyAdded
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 cursor-default"
                              : "border-[#2a2a2a] bg-[#1a1a1a] text-[#555] hover:border-emerald-500/40 hover:text-emerald-400"
                          }`}
                        >
                          {alreadyAdded ? "✓ " : "+ "}{ga.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Current amenities list */}
              <div className="space-y-1.5">
                {amenities.length === 0 ? (
                  <p className="text-xs text-[#333] uppercase tracking-widest py-4 text-center">
                    No amenities added yet.
                  </p>
                ) : (
                  amenities.map((a) => (
                    <div
                      key={a.id}
                      className="group flex items-center justify-between px-4 py-2.5 rounded border border-[#1e1e1e] bg-[#0f0f0f] hover:border-red-500/20 hover:bg-red-500/5 transition"
                    >
                      <span className="text-xs text-emerald-400 font-mono">✓ {a.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(a.id)}
                        className="text-[9px] font-bold text-[#333] hover:text-red-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-[#222] bg-[#0f0f0f] flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded border border-[#2a2a2a] bg-[#1a1a1a] text-xs font-bold text-[#555] uppercase tracking-widest hover:text-white hover:border-[#444] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="flex-1 py-2.5 rounded bg-yellow-400 text-black text-xs font-bold uppercase tracking-widest hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {submitting ? "Saving..." : uploading ? "Uploading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}