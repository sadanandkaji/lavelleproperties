import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

// ─── Hardcoded admin credentials ───────────────────────────────────────────
const ADMIN_EMAIL = "lavelleventure@gmail.com";
const ADMIN_PASSWORD = "lavelle@1234";

// ─── Secret key (store in .env as JWT_SECRET in production) ────────────────
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "lavelle-super-secret-key-change-in-prod"
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Validate credentials
    if (
      email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase() ||
      password !== ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Sign a JWT valid for 8 hours
    const token = await new SignJWT({ email, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(SECRET);

    // Also set an httpOnly cookie for server-side auth checks
    const response = NextResponse.json(
      { success: true, token, email },
      { status: 200 }
    );

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}