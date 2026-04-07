import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

// GET: Fetch all amenities for a specific property
// /api/property-amenity?propertyId=xxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("propertyId");

    if (!propertyId) {
      return NextResponse.json({ error: "propertyId is required" }, { status: 400 });
    }

    const amenities = await prisma.propertyAmenity.findMany({
      where: { propertyId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(amenities);
  } catch (error: any) {
    console.error("PROPERTY_AMENITY_GET_ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch property amenities" }, { status: 500 });
  }
}

// POST: Add an amenity to a property
// Body: { propertyId: string, name: string }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyId, name } = body;
 if (!propertyId || !name || !name.trim()) {
      return NextResponse.json(
        { error: "propertyId and valid name are required" },
        { status: 400 }
      );
    }
const trimmedName = name.trim();
const normalized = trimmedName.toLowerCase();

const existing = await prisma.propertyAmenity.findFirst({
  where: {
    propertyId,
    normalized,
  },
});

if (existing) {
  return NextResponse.json(existing);
}

const amenity = await prisma.propertyAmenity.create({
  data: {
    propertyId,
    name: trimmedName,
    normalized,
  },
});

    return NextResponse.json(amenity);
  } catch (error: any) {
    console.error("PROPERTY_AMENITY_POST_ERROR:", error);
    return NextResponse.json({ error: "Failed to add amenity" }, { status: 500 });
  }
}

// DELETE: Remove a per-property amenity by its own ID
// /api/property-amenity?id=xxx
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.propertyAmenity.delete({ where: { id } });
    return NextResponse.json({ message: "Amenity removed" });
  } catch (error: any) {
    console.error("PROPERTY_AMENITY_DELETE_ERROR:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Amenity not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete amenity" }, { status: 500 });
  }
}