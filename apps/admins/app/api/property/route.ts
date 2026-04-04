import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

// GET: Fetch all properties
export async function GET() {
  try {
    const data = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
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

    // Validate required fields
    if (!body.title || !body.location || !body.price) {
      return NextResponse.json(
        { error: "Title, location, and price are required" },
        { status: 400 }
      );
    }

    // Normalize amenityCategory — default to BASIC if not provided
    const amenityCategory = (body.amenityCategory || "BASIC").toUpperCase();
    if (amenityCategory !== "BASIC" && amenityCategory !== "FULL") {
      return NextResponse.json(
        { error: "amenityCategory must be BASIC or FULL" },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description,
        price: Number(body.price),
        location: body.location,
        imageUrl: body.imageUrl,

        // Enum normalization
        type: body.type?.toUpperCase() ?? "RENT",
        subType: body.subType?.toUpperCase().replace(/\s+/g, "_") ?? "FLAT",
        layoutType: body.layoutType?.toUpperCase() ?? "BHK1",
        furnishing: body.furnishing?.toUpperCase() ?? "FURNISHED",

        // The amenity category for this property
        amenityCategory: amenityCategory as "BASIC" | "FULL",
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

// DELETE: Remove a property by ID
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

    // Record not found
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}