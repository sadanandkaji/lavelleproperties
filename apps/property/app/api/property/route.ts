import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query") ?? "";
    const type  = searchParams.get("type")?.toUpperCase();

    let subType = searchParams.get("subtype")?.toUpperCase().replace(/-/g, "_");
    if (subType === "FLATS") subType = "FLAT";
    if (subType === "STANDALONE_HOUSE" || subType === "STANDALONEHOUSE") subType = "STANDALONE_HOUSE";
    if (subType === "INDEPENDENT_VILLA" || subType === "INDEPENDENTVILLA") subType = "INDEPENDENT_VILLA";

    const layoutRaw = searchParams.get("layouttype")?.toUpperCase().replace(/\s/g, "");
    const layoutMap: Record<string, string> = {
      "1BHK":   "BHK1",  "2BHK":   "BHK2",
      "2.5BHK": "BHK2_5","2_5BHK": "BHK2_5",
      "3BHK":   "BHK3",  "3.5BHK": "BHK3_5", "3_5BHK": "BHK3_5",
      "4BHK":   "BHK4",  "5BHK":   "BHK5",
      "5BHKP":  "BHK5P", "5BHK+":  "BHK5P",
      "BHK1":   "BHK1",  "BHK2":   "BHK2",  "BHK2_5": "BHK2_5",
      "BHK3":   "BHK3",  "BHK3_5": "BHK3_5","BHK4":   "BHK4",
      "BHK5":   "BHK5",  "BHK5P":  "BHK5P",
    };
    const layoutType     = layoutRaw ? (layoutMap[layoutRaw] ?? layoutRaw) : undefined;
    const furnishing     = searchParams.get("furnishing")?.toUpperCase().replace(/[-\s]/g, "");
    const amenitiesParam = searchParams.get("amenities")?.toUpperCase();

    const properties = await prisma.property.findMany({
      where: {
        AND: [
          query.trim()
            ? {
                OR: [
                  { title:    { contains: query, mode: "insensitive" } },
                  { location: { contains: query, mode: "insensitive" } },
                ],
              }
            : {},
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
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}