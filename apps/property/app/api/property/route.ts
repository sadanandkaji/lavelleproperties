import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query") ?? "";
    const type = searchParams.get("type")?.toUpperCase();

    let subType = searchParams.get("subtype")?.toUpperCase().replace(/-/g, "_");
    if (subType === "FLATS") subType = "FLAT";

    let layoutType = searchParams.get("layouttype")?.toUpperCase();
    if (layoutType === "1BHK") layoutType = "BHK1";
    if (layoutType === "2BHK") layoutType = "BHK2";
    if (layoutType === "2.5BHK") layoutType = "BHK2_5";
    if (layoutType === "3BHK") layoutType = "BHK3";
    if (layoutType === "3.5BHK") layoutType = "BHK3_5";
    if (layoutType === "4BHK") layoutType = "BHK4";
    if (layoutType === "5BHK") layoutType = "BHK5";

    let furnishing = searchParams.get("furnishing")?.toUpperCase().replace(/-/g, "");
    const amenitiesParam = searchParams.get("amenities")?.toUpperCase();

    const properties = await prisma.property.findMany({
      where: {
        AND: [
          query.trim()
            ? {
                OR: [
                  { title: { contains: query, mode: "insensitive" } },
                  { location: { contains: query, mode: "insensitive" } },
                ],
              }
            : {},
          type ? { type: type as any } : {},
          subType ? { subType: subType as any } : {},
          layoutType ? { layoutType: layoutType as any } : {},
          furnishing ? { furnishing: furnishing as any } : {},
          amenitiesParam ? { amenityCategory: amenitiesParam as any } : {},
        ],
      },
      orderBy: { createdAt: "desc" },
      include: {
        images: { orderBy: { order: "asc" } },
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("DATABASE_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}