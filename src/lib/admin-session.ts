import { cookies } from "next/headers";
import { getAdminCookieName, verifyAdminSessionToken } from "@/lib/auth";

export async function isAdminSessionValid(): Promise<boolean> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  const token = (await cookies()).get(getAdminCookieName())?.value;
  return verifyAdminSessionToken(token, secret);
}
