import { cookies } from "next/headers";
import { signToken, verifyToken, SessionPayload } from "@/lib/jwt";

const COOKIE = "session";

export async function createSession(payload: SessionPayload) {
  const token = await signToken(payload);
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession() {
  return verifyToken(cookies().get(COOKIE)?.value);
}

export function destroySession() {
  cookies().delete(COOKIE);
}