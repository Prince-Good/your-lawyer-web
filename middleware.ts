import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const routeRoles: Record<string, string> = {
  "/client": "CLIENT",
  "/lawyer": "LAWYER",
  "/admin": "ADMIN",
};
const home: Record<string, string> = {
  CLIENT: "/client",
  LAWYER: "/lawyer",
  ADMIN: "/admin",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await verifyToken(req.cookies.get("session")?.value);

  if (pathname === "/login" || pathname === "/register") {
    if (session) {
      return NextResponse.redirect(new URL(home[session.role] ?? "/", req.url));
    }
    return NextResponse.next();
  }

  const prefix = Object.keys(routeRoles).find(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (!prefix) return NextResponse.next();

  if (!session) return NextResponse.redirect(new URL("/login", req.url));
  if (session.role !== routeRoles[prefix]) {
    return NextResponse.redirect(new URL(home[session.role] ?? "/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/lawyer/:path*", "/admin/:path*", "/login", "/register"],
};