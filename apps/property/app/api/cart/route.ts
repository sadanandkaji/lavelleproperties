import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/cart?email=xxx — fetch user's cart
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        cart: {
          include: {
            items: {
              include: {
                property: {
                  include: {
                    images: { orderBy: { order: "asc" } },
                  },
                },
              },
              orderBy: { addedAt: "desc" },
            },
          },
        },
      },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user.cart?.items ?? []);
  } catch (error: any) {
    console.error("[GET /api/cart]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/cart — add property to user's cart
export async function POST(req: NextRequest) {
  try {
    const { email, propertyId } = await req.json();
    if (!email || !propertyId)
      return NextResponse.json({ error: "Email and propertyId required" }, { status: 400 });

    // Get or create user
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Get or create cart for user
    let cart = await prisma.cart.findUnique({ where: { userId: user.id } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: user.id } });
    }

    // Add item — ignore duplicate (unique constraint)
    try {
      await prisma.cartItem.create({
        data: { cartId: cart.id, propertyId },
      });
    } catch (e: any) {
      // P2002 = unique constraint violation — item already in cart, that's fine
      if (e.code !== "P2002") throw e;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[POST /api/cart]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/cart — remove property from user's cart
export async function DELETE(req: NextRequest) {
  try {
    const { email, propertyId } = await req.json();
    if (!email || !propertyId)
      return NextResponse.json({ error: "Email and propertyId required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
    if (!cart) return NextResponse.json({ success: true });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, propertyId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[DELETE /api/cart]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/cart?clearAll=true — clear entire cart
export async function PUT(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
    if (!cart) return NextResponse.json({ success: true });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[PUT /api/cart]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}