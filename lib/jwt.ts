import { SignJWT, jwtVerify } from "jose";

export type Role = "CLIENT" | "LAWYER" | "ADMIN";
export type SessionPayload = { userId: string; role: Role };

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function signToken(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}