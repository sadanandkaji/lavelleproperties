import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") ?? "";
    const type = searchParams.get("type")?.toUpperCase();

    let subType = searchParams.get("subtype")?.toUpperCase().replace(/-/g, "_");
    if (subType === "FLATS") subType = "FLAT";
    if (subType === "STANDALONE_HOUSE" || subType === "STANDALONEHOUSE") subType = "STANDALONE_HOUSE";
    if (subType === "INDEPENDENT_VILLA" || subType === "INDEPENDENTVILLA") subType = "INDEPENDENT_VILLA";

    const layoutRaw = searchParams.get("layouttype")?.toUpperCase().replace(/\s/g, "");
    const layoutMap: Record<string, string> = {
      "1BHK": "BHK1", "2BHK": "BHK2", "2.5BHK": "BHK2_5", "2_5BHK": "BHK2_5",
      "3BHK": "BHK3", "3.5BHK": "BHK3_5", "3_5BHK": "BHK3_5",
      "4BHK": "BHK4", "5BHK": "BHK5", "5BHKP": "BHK5P", "5BHK+": "BHK5P",
      "BHK1": "BHK1", "BHK2": "BHK2", "BHK2_5": "BHK2_5", "BHK3": "BHK3",
      "BHK3_5": "BHK3_5", "BHK4": "BHK4", "BHK5": "BHK5", "BHK5P": "BHK5P",
    };
    const layoutType = layoutRaw ? (layoutMap[layoutRaw] ?? layoutRaw) : undefined;
    const furnishing = searchParams.get("furnishing")?.toUpperCase().replace(/[-\s]/g, "");
    const amenitiesParam = searchParams.get("amenities")?.toUpperCase();

    const properties = await prisma.property.findMany({
      where: {
        AND: [
          query.trim() ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { location: { contains: query, mode: "insensitive" } },
            ],
          } : {},
          type           ? { type:            type           as any } : {},
          subType        ? { subType:         subType        as any } : {},
          layoutType     ? { layoutType:      layoutType     as any } : {},
          furnishing     ? { furnishing:      furnishing     as any } : {},
          amenitiesParam ? { amenityCategory: amenitiesParam as any } : {},
        ],
      },
      orderBy: { createdAt: "desc" },
      include: {
        images:         { orderBy: { order: "asc" } },
        basicAmenities: { orderBy: { createdAt: "asc" } },
        fullAmenities:  { orderBy: { createdAt: "asc" } },
      },
    });

    return NextResponse.json(properties);
  } catch (error: any) {
    console.error("DATABASE_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.location || !body.price) {
      return NextResponse.json({ error: "Title, location, and price are required" }, { status: 400 });
    }

    const amenityCategory = (body.amenityCategory || "BASIC").toUpperCase();
    if (amenityCategory !== "BASIC" && amenityCategory !== "FULL") {
      return NextResponse.json({ error: "amenityCategory must be BASIC or FULL" }, { status: 400 });
    }

    const images: { url: string; isPrimary: boolean; order: number }[] = body.images || [];
    if (images.length > 30) {
      return NextResponse.json({ error: "Maximum 30 images allowed" }, { status: 400 });
    }

    const basicNames: { name: string }[] = body.basicAmenities || [];
    const fullNames:  { name: string }[] = body.fullAmenities  || [];

    const property = await prisma.property.create({
      data: {
        title:         body.title,
        description:   body.description   ?? "",
        price:         Number(body.price),
        pricePerSqft:  body.pricePerSqft  ? Number(body.pricePerSqft)  : null,
        priceNote:     body.priceNote     ?? null,
        callForPrice:  body.callForPrice  ?? false,
        isSoldOut:     body.isSoldOut     ?? false,
        location:      body.location,
        bedrooms:      body.bedrooms      ? Number(body.bedrooms)      : null,
        bathrooms:     body.bathrooms     ? Number(body.bathrooms)     : null,
        halfBaths:     body.halfBaths     ? Number(body.halfBaths)     : null,
        totalRooms:    body.totalRooms    ? Number(body.totalRooms)    : null,
        floors:        body.floors        ? Number(body.floors)        : null,
        floorLevel:    body.floorLevel    ? Number(body.floorLevel)    : null,
        areaSqft:      body.areaSqft      ? Number(body.areaSqft)      : null,
        lotSizeSqft:   body.lotSizeSqft   ? Number(body.lotSizeSqft)   : null,
        yearBuilt:     body.yearBuilt     ? Number(body.yearBuilt)     : null,
        yearRemodeled: body.yearRemodeled ? Number(body.yearRemodeled) : null,
        rentPeriods:     body.rentPeriods     ?? [],
        statuses:        body.statuses        ?? [],
        parkingOptions:  body.parkingOptions  ?? [],
        basementOptions: body.basementOptions ?? [],
        type:           body.type?.toUpperCase()                       ?? "RENT",
        subType:        body.subType?.toUpperCase().replace(/\s+/g,"_") ?? "FLAT",
        layoutType:     body.layoutType?.toUpperCase()                 ?? "BHK1",
        furnishing:     body.furnishing?.toUpperCase()                 ?? "FURNISHED",
        amenityCategory: amenityCategory as "BASIC" | "FULL",
        images: {
          create: images.map((img, idx) => ({
            url: img.url, isPrimary: idx === 0 || img.isPrimary, order: idx,
          })),
        },
        basicAmenities: {
          create: basicNames
            .filter((a) => a.name?.trim())
            .map((a) => ({ name: a.name.trim(), normalized: a.name.trim().toLowerCase() })),
        },
        fullAmenities: {
          create: fullNames
            .filter((a) => a.name?.trim())
            .map((a) => ({ name: a.name.trim(), normalized: a.name.trim().toLowerCase() })),
        },
      },
      include: {
        images:         { orderBy: { order: "asc" } },
        basicAmenities: { orderBy: { createdAt: "asc" } },
        fullAmenities:  { orderBy: { createdAt: "asc" } },
      },
    });

    return NextResponse.json(property);
  } catch (error: any) {
    console.error("POST_ERROR:", error);
    return NextResponse.json({ error: "Failed to create property", details: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const body = await req.json();
    if (!body.title || !body.location || !body.price) {
      return NextResponse.json({ error: "Title, location, and price are required" }, { status: 400 });
    }

    const amenityCategory = (body.amenityCategory || "BASIC").toUpperCase();
    if (amenityCategory !== "BASIC" && amenityCategory !== "FULL") {
      return NextResponse.json({ error: "amenityCategory must be BASIC or FULL" }, { status: 400 });
    }

    const images: { url: string; isPrimary: boolean; order: number }[] | undefined = body.images;
    if (images && images.length > 30) {
      return NextResponse.json({ error: "Maximum 30 images allowed" }, { status: 400 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      if (images) {
        await tx.propertyImage.deleteMany({ where: { propertyId: id } });
      }
      if (Array.isArray(body.basicAmenities)) {
        await tx.basicAmenity.deleteMany({ where: { propertyId: id } });
        if (body.basicAmenities.length > 0) {
          await tx.basicAmenity.createMany({
            data: (body.basicAmenities as { name: string }[])
              .filter((a) => a.name?.trim())
              .map((a) => ({ name: a.name.trim(), normalized: a.name.trim().toLowerCase(), propertyId: id })),
          });
        }
      }
      if (Array.isArray(body.fullAmenities)) {
        await tx.fullAmenity.deleteMany({ where: { propertyId: id } });
        if (body.fullAmenities.length > 0) {
          await tx.fullAmenity.createMany({
            data: (body.fullAmenities as { name: string }[])
              .filter((a) => a.name?.trim())
              .map((a) => ({ name: a.name.trim(), normalized: a.name.trim().toLowerCase(), propertyId: id })),
          });
        }
      }
      return tx.property.update({
        where: { id },
        data: {
          title:         body.title,
          description:   body.description   ?? "",
          price:         Number(body.price),
          pricePerSqft:  body.pricePerSqft  ? Number(body.pricePerSqft)  : null,
          priceNote:     body.priceNote     ?? null,
          callForPrice:  body.callForPrice  ?? false,
          isSoldOut:     body.isSoldOut     ?? false,
          location:      body.location,
          bedrooms:      body.bedrooms      ? Number(body.bedrooms)      : null,
          bathrooms:     body.bathrooms     ? Number(body.bathrooms)     : null,
          halfBaths:     body.halfBaths     ? Number(body.halfBaths)     : null,
          totalRooms:    body.totalRooms    ? Number(body.totalRooms)    : null,
          floors:        body.floors        ? Number(body.floors)        : null,
          floorLevel:    body.floorLevel    ? Number(body.floorLevel)    : null,
          areaSqft:      body.areaSqft      ? Number(body.areaSqft)      : null,
          lotSizeSqft:   body.lotSizeSqft   ? Number(body.lotSizeSqft)   : null,
          yearBuilt:     body.yearBuilt     ? Number(body.yearBuilt)     : null,
          yearRemodeled: body.yearRemodeled ? Number(body.yearRemodeled) : null,
          rentPeriods:     body.rentPeriods     ?? [],
          statuses:        body.statuses        ?? [],
          parkingOptions:  body.parkingOptions  ?? [],
          basementOptions: body.basementOptions ?? [],
          type:       body.type?.toUpperCase()                       ?? "RENT",
          subType:    body.subType?.toUpperCase().replace(/\s+/g,"_") ?? "FLAT",
          layoutType: body.layoutType?.toUpperCase()                 ?? "BHK1",
          furnishing: body.furnishing?.toUpperCase()                 ?? "FURNISHED",
          amenityCategory: amenityCategory as "BASIC" | "FULL",
          ...(images && {
            images: {
              create: images.map((img, idx) => ({
                url: img.url, isPrimary: idx === 0 || img.isPrimary, order: idx,
              })),
            },
          }),
        },
        include: {
          images:         { orderBy: { order: "asc" } },
          basicAmenities: { orderBy: { createdAt: "asc" } },
          fullAmenities:  { orderBy: { createdAt: "asc" } },
        },
      });
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT_ERROR:", error);
    if (error.code === "P2025") return NextResponse.json({ error: "Property not found" }, { status: 404 });
    return NextResponse.json({ error: "Failed to update property", details: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (error: any) {
    console.error("DELETE_API_ERROR:", error);
    if (error.code === "P2025") return NextResponse.json({ error: "Property not found" }, { status: 404 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}