import { jwtDecrypt, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const authenticatedAPTRoutes = [
    pathName.startsWith("/api/users"),
    pathName.startsWith("/api/posts"),
  ];

  if (authenticatedAPTRoutes.includes(true)) {
    const cookie = request.cookies.get("jwt-token");
    if (!cookie || !cookie?.value) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(cookie.value, secret);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
  }
}
export const config = {
  matcher: "/:path*",
};
