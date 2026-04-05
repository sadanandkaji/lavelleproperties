import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: "asc" } },
      },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const layoutMap: Record<string, string> = {
      BHK1: "1BHK", BHK2: "2BHK", BHK2_5: "2.5BHK",
      BHK3: "3BHK", BHK3_5: "3.5BHK", BHK4: "4BHK",
      BHK5: "5BHK", BHK5P: "5BHK+",
    };
    const subTypeMap: Record<string, string> = {
      FLAT: "Flat", STANDALONE_HOUSE: "Standalone House",
      INDEPENDENT_VILLA: "Independent Villa", PENTHOUSE: "Penthouse",
    };
    const furnishingMap: Record<string, string> = {
      FURNISHED: "Furnished", SEMIFURNISHED: "Semi Furnished", UNFURNISHED: "Unfurnished",
    };

    const normalized = {
      id: property.id,
      title: property.title,
      location: property.location,
      description: property.description,

      // Pricing
      price: property.price,
      pricePerSqft: property.pricePerSqft ?? null,
      priceNote: property.priceNote ?? null,
      callForPrice: property.callForPrice,

      // Basic facts
      bedrooms: property.bedrooms ?? null,
      bathrooms: property.bathrooms ?? null,
      halfBaths: property.halfBaths ?? null,
      totalRooms: property.totalRooms ?? null,
      floors: property.floors ?? null,
      floorLevel: property.floorLevel ?? null,
      areaSqft: property.areaSqft ?? null,
      lotSizeSqft: property.lotSizeSqft ?? null,
      yearBuilt: property.yearBuilt ?? null,
      yearRemodeled: property.yearRemodeled ?? null,

      // Tag arrays
      rentPeriods: property.rentPeriods ?? [],
      statuses: property.statuses ?? [],
      parkingOptions: property.parkingOptions ?? [],
      basementOptions: property.basementOptions ?? [],

      // Enums (human-readable)
      type: property.type,
      subType: subTypeMap[property.subType] ?? property.subType,
      layoutType: layoutMap[property.layoutType] ?? property.layoutType,
      furnishing: furnishingMap[property.furnishing] ?? property.furnishing,
      amenityCategory: property.amenityCategory,

      // Images
      images: property.images,

      createdAt: property.createdAt.toISOString(),
    };

    return NextResponse.json(normalized, { status: 200 });
  } catch (error) {
    console.error("[GET /api/properties/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}