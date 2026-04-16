import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const query    = searchParams.get("query")?.trim()    ?? "";
    const type     = searchParams.get("type")?.toUpperCase();
    const subType  = searchParams.get("subType")?.toUpperCase();
    const layout   = searchParams.get("layout")?.toUpperCase();
    const furnish  = searchParams.get("furnishing")?.toUpperCase().replace(/[-\s]/g, "");
    const amenity  = searchParams.get("amenity")?.toUpperCase();
    const soldOut  = searchParams.get("soldOut"); // "true" | "false" | undefined
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const page     = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit    = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));
    const skip     = (page - 1) * limit;

    const where: any = { AND: [] };

    // Full-text search across title, location, description
    if (query) {
      where.AND.push({
        OR: [
          { id:          { equals:   query,             } },
          { title:       { contains: query, mode: "insensitive" } },
          { location:    { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      });
    }

    if (type)     where.AND.push({ type:            type    as any });
    if (subType)  where.AND.push({ subType:         subType as any });
    if (layout)   where.AND.push({ layoutType:      layout  as any });
    if (furnish)  where.AND.push({ furnishing:      furnish as any });
    if (amenity)  where.AND.push({ amenityCategory: amenity as any });

    if (soldOut === "true")  where.AND.push({ isSoldOut: true  });
    if (soldOut === "false") where.AND.push({ isSoldOut: false });

    if (minPrice) where.AND.push({ price: { gte: parseInt(minPrice) } });
    if (maxPrice) where.AND.push({ price: { lte: parseInt(maxPrice) } });

    // Clean up empty AND
    if (where.AND.length === 0) delete where.AND;

    const [total, properties] = await Promise.all([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          images:         { orderBy: { order: "asc" } },
          basicAmenities: { orderBy: { createdAt: "asc" } },
          fullAmenities:  { orderBy: { createdAt: "asc" } },
        },
      }),
    ]);

    return NextResponse.json({
      properties,
      total,
      page,
      pages:   Math.ceil(total / limit),
      hasMore: page * limit < total,
    });
  } catch (error: any) {
    console.error("[GET /api/properties]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}