import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Text Search only
    const query = searchParams.get("query") ?? "";

    // 2. Extract and Normalize Enum Filters
const type = searchParams.get("type")?.toUpperCase();

// Normalize SubType: handle 'standalone-house' -> 'STANDALONE_HOUSE'
let subType = searchParams.get("subtype")?.toUpperCase().replace(/-/g, '_');
if (subType === "FLATS") subType = "FLAT"; 

// Normalize LayoutType
let layoutType = searchParams.get("layouttype")?.toUpperCase();
if (layoutType === "1BHK") layoutType = "BHK1";
if (layoutType === "2BHK") layoutType = "BHK2";
if (layoutType === "2.5BHK") layoutType = "BHK2_5";
if (layoutType === "3BHK") layoutType = "BHK3";
if (layoutType === "3.5BHK") layoutType = "BHK3_5";
if (layoutType === "4BHK") layoutType = "BHK4";
if (layoutType === "5BHK") layoutType = "BHK5";

// Normalize Furnishing: handle 'semi-furnished' -> 'SEMIFURNISHED'
let furnishing = searchParams.get("furnishing")?.toUpperCase().replace(/-/g, '');
// Note: In your schema, it is SEMIFURNISHED (no underscore). 
// If your schema was SEMI_FURNISHED, use .replace(/-/g, '_')
    
    // Map URL 'amenities' key to DB 'amenityCategory' field
    const amenitiesParam = searchParams.get("amenities")?.toUpperCase();

    // 3. Build Prisma Query
    const properties = await prisma.property.findMany({
      where: {
        AND: [
          query.trim() ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { location: { contains: query, mode: "insensitive" } },
            ],
          } : {},

          // Correct Enums for your Schema
          type ? { type: type as any } : {},
          subType ? { subType: subType as any } : {},
          layoutType ? { layoutType: layoutType as any } : {},
          furnishing ? { furnishing: furnishing as any } : {},

          // IMPORTANT: Check the direct column, not a relation
          amenitiesParam ? { 
            amenityCategory: amenitiesParam as any 
          } : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("🔴 DATABASE_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}