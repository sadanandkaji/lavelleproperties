import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { propertyId, name } = await req.json();
    if (!propertyId || !name?.trim())
      return NextResponse.json({ error: "propertyId and name required" }, { status: 400 });

    const trimmed    = name.trim();
    const normalized = trimmed.toLowerCase();

    const existing = await prisma.basicAmenity.findFirst({ where: { propertyId, normalized } });
    if (existing) return NextResponse.json(existing);

    const created = await prisma.basicAmenity.create({
      data: { propertyId, name: trimmed, normalized },
    });
    return NextResponse.json(created);
  } catch (error: any) {
    console.error("BASIC_AMENITY_POST:", error);
    return NextResponse.json({ error: "Failed to add amenity" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await prisma.basicAmenity.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    if (error.code === "P2025")
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}