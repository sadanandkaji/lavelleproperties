import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json();

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email and phone are required" },
        { status: 400 }
      );
    }

    const emailLower = email.trim().toLowerCase();

    // Upsert — create user if not exists, update name/phone if they sign in again
    const user = await prisma.user.upsert({
      where:  { email: emailLower },
      update: {
        name:  name.trim(),
        phone: phone.trim(),
      },
      create: {
        name:  name.trim(),
        email: emailLower,
        phone: phone.trim(),
      },
    });

    return NextResponse.json({
      id:    user.id,
      name:  user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error: any) {
    console.error("[POST /api/auth/login]", error);
    return NextResponse.json(
      { error: "Failed to sign in" },
      { status: 500 }
    );
  }
}