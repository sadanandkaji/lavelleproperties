import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/auth/me?email=xxx  — fetch user by email
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, name: true, email: true, phone: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("[GET /api/auth/me]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}