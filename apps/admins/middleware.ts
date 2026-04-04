import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "lavelle-super-secret-key-change-in-prod"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect the root page "/"
  if (pathname !== "/") {
    return NextResponse.next();
  }

  const token =
    req.cookies.get("admin_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    // Token invalid or expired — clear cookie and redirect
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
    return response;
  }
}

export const config = {
  matcher: ["/"], // Only protect the root page
};