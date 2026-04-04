import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

// 1. GET: Fetch all amenities or filter by category
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category"); // Expects "BASIC" or "FULL"

    const amenities = await prisma.amenity.findMany({
      where: category ? { 
        category: category as "BASIC" | "FULL" 
      } : {},
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(amenities);
  } catch (error: any) {
    console.error("AMENITY_GET_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch amenities" },
      { status: 500 }
    );
  }
}

// 2. POST: Create a new amenity with a category
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and Category are required" },
        { status: 400 }
      );
    }

    const newAmenity = await prisma.amenity.create({
      data: {
        name: name.trim(),
        category: category.toUpperCase() as "BASIC" | "FULL",
      },
    });

    return NextResponse.json(newAmenity);
  } catch (error: any) {
    console.error("AMENITY_POST_ERROR:", error);
    
    // Handle unique constraint violation (P2002)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "An amenity with this name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create amenity" },
      { status: 500 }
    );
  }
}

// 3. DELETE: Remove an amenity by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Amenity ID is required" },
        { status: 400 }
      );
    }

    await prisma.amenity.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Amenity deleted successfully" });
  } catch (error: any) {
    console.error("AMENITY_DELETE_ERROR:", error);
    
    // Error if trying to delete an amenity linked to properties
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Cannot delete amenity because it is linked to existing properties" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete amenity" },
      { status: 500 }
    );
  }
}