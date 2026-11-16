import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const routeRoles: Record<string, string> = {
  "/client": "CLIENT",
  "/lawyer": "LAWYER",
  "/admin": "ADMIN",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const prefix = Object.keys(routeRoles).find(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (!prefix) return NextResponse.next();

  const session = await verifyToken(req.cookies.get("session")?.value);
  if (!session) return NextResponse.redirect(new URL("/login", req.url));
  if (session.role !== routeRoles[prefix]) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/lawyer/:path*", "/admin/:path*"],
};