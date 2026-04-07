import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

// GET: Fetch all properties with images and per-property amenities
export async function GET() {
  try {
    const data = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        images: { orderBy: { order: "asc" } },
        propertyAmenities: { orderBy: { createdAt: "asc" } },
      },
    });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("DATABASE_GET_ERROR:", error);
    return NextResponse.json(
      { error: "Database fetch failed", details: error.message },
      { status: 500 }
    );
  }
}

// POST: Create a new property
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.location || !body.price) {
      return NextResponse.json(
        { error: "Title, location, and price are required" },
        { status: 400 }
      );
    }

    const amenityCategory = (body.amenityCategory || "BASIC").toUpperCase();
    if (amenityCategory !== "BASIC" && amenityCategory !== "FULL") {
      return NextResponse.json(
        { error: "amenityCategory must be BASIC or FULL" },
        { status: 400 }
      );
    }

    const images: { url: string; isPrimary: boolean; order: number }[] = body.images || [];
    if (images.length > 10) {
      return NextResponse.json({ error: "Maximum 10 images allowed per property" }, { status: 400 });
    }

    // Per-property amenity names passed at creation time (optional)
const propertyAmenityNames: { name: string }[] = body.propertyAmenities || [];
    const property = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description ?? "",
        price: Number(body.price),
        pricePerSqft: body.pricePerSqft ? Number(body.pricePerSqft) : null,
        priceNote: body.priceNote ?? null,
        callForPrice: body.callForPrice ?? false,
        isSoldOut: body.isSoldOut ?? false,
        location: body.location,

        bedrooms: body.bedrooms ? Number(body.bedrooms) : null,
        bathrooms: body.bathrooms ? Number(body.bathrooms) : null,
        halfBaths: body.halfBaths ? Number(body.halfBaths) : null,
        totalRooms: body.totalRooms ? Number(body.totalRooms) : null,
        floors: body.floors ? Number(body.floors) : null,
        floorLevel: body.floorLevel ? Number(body.floorLevel) : null,
        areaSqft: body.areaSqft ? Number(body.areaSqft) : null,
        lotSizeSqft: body.lotSizeSqft ? Number(body.lotSizeSqft) : null,
        yearBuilt: body.yearBuilt ? Number(body.yearBuilt) : null,
        yearRemodeled: body.yearRemodeled ? Number(body.yearRemodeled) : null,

        rentPeriods: body.rentPeriods ?? [],
        statuses: body.statuses ?? [],
        parkingOptions: body.parkingOptions ?? [],
        basementOptions: body.basementOptions ?? [],

        type: body.type?.toUpperCase() ?? "RENT",
        subType: body.subType?.toUpperCase().replace(/\s+/g, "_") ?? "FLAT",
        layoutType: body.layoutType?.toUpperCase() ?? "BHK1",
        furnishing: body.furnishing?.toUpperCase() ?? "FURNISHED",
        amenityCategory: amenityCategory as "BASIC" | "FULL",

        images: {
          create: images.map((img, idx) => ({
            url: img.url,
            isPrimary: idx === 0 || img.isPrimary,
            order: idx,
          })),
        },

      propertyAmenities: {
  create: (propertyAmenityNames || [])
    .filter((a) => a.name && a.name.trim())
    .map((a) => {
      const trimmed = a.name.trim();
      return {
        name: trimmed,
        normalized: trimmed.toLowerCase(), // 🔥 REQUIRED
      };
    }),
},
      },
      include: {
        images: { orderBy: { order: "asc" } },
        propertyAmenities: { orderBy: { createdAt: "asc" } },
      },
    });

    return NextResponse.json(property);
  } catch (error: any) {
    console.error("POST_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create property", details: error.message },
      { status: 500 }
    );
  }
}

// PUT: Edit an existing property
// /api/property?id=xxx
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const body = await req.json();

    if (!body.title || !body.location || !body.price) {
      return NextResponse.json(
        { error: "Title, location, and price are required" },
        { status: 400 }
      );
    }

    const amenityCategory = (body.amenityCategory || "BASIC").toUpperCase();
    if (amenityCategory !== "BASIC" && amenityCategory !== "FULL") {
      return NextResponse.json(
        { error: "amenityCategory must be BASIC or FULL" },
        { status: 400 }
      );
    }

    // If new images are provided, replace all existing images
    const images: { url: string; isPrimary: boolean; order: number }[] | undefined =
      body.images;

    if (images && images.length > 10) {
      return NextResponse.json({ error: "Maximum 10 images allowed" }, { status: 400 });
    }

    // Update property fields; images are handled separately if provided
    const updated = await prisma.$transaction(async (tx) => {
      if (images) {
        // Delete old images and recreate
        await tx.propertyImage.deleteMany({ where: { propertyId: id } });
      }
// Replace amenities
if (body.propertyAmenities) {
  await tx.propertyAmenity.deleteMany({
    where: { propertyId: id },
  });

  await tx.propertyAmenity.createMany({
  data: (body.propertyAmenities || [])
    .filter((a: any) => a.name && a.name.trim())
    .map((a: any) => {
      const trimmed = a.name.trim();
      return {
        name: trimmed,
        normalized: trimmed.toLowerCase(), // 🔥 REQUIRED
        propertyId: id,
      };
    }),
});
}
      return tx.property.update({
        where: { id },
        data: {
          title: body.title,
          description: body.description ?? "",
          price: Number(body.price),
          pricePerSqft: body.pricePerSqft ? Number(body.pricePerSqft) : null,
          priceNote: body.priceNote ?? null,
          callForPrice: body.callForPrice ?? false,
          isSoldOut: body.isSoldOut ?? false,
          location: body.location,

          bedrooms: body.bedrooms ? Number(body.bedrooms) : null,
          bathrooms: body.bathrooms ? Number(body.bathrooms) : null,
          halfBaths: body.halfBaths ? Number(body.halfBaths) : null,
          totalRooms: body.totalRooms ? Number(body.totalRooms) : null,
          floors: body.floors ? Number(body.floors) : null,
          floorLevel: body.floorLevel ? Number(body.floorLevel) : null,
          areaSqft: body.areaSqft ? Number(body.areaSqft) : null,
          lotSizeSqft: body.lotSizeSqft ? Number(body.lotSizeSqft) : null,
          yearBuilt: body.yearBuilt ? Number(body.yearBuilt) : null,
          yearRemodeled: body.yearRemodeled ? Number(body.yearRemodeled) : null,

          rentPeriods: body.rentPeriods ?? [],
          statuses: body.statuses ?? [],
          parkingOptions: body.parkingOptions ?? [],
          basementOptions: body.basementOptions ?? [],

          type: body.type?.toUpperCase() ?? "RENT",
          subType: body.subType?.toUpperCase().replace(/\s+/g, "_") ?? "FLAT",
          layoutType: body.layoutType?.toUpperCase() ?? "BHK1",
          furnishing: body.furnishing?.toUpperCase() ?? "FURNISHED",
          amenityCategory: amenityCategory as "BASIC" | "FULL",

          ...(images && {
            images: {
              create: images.map((img, idx) => ({
                url: img.url,
                isPrimary: idx === 0 || img.isPrimary,
                order: idx,
              })),
            },
          }),
        },
        include: {
          images: { orderBy: { order: "asc" } },
          propertyAmenities: { orderBy: { createdAt: "asc" } },
        },
      });
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT_ERROR:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update property", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a property by ID (images and per-property amenities cascade)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (error: any) {
    console.error("DELETE_API_ERROR:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}