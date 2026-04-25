import { headers } from "next/headers";

/** Origen absoluto (https://host) para armar enlaces públicos en servidor. */
export async function getRequestOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) {
    const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
    if (fromEnv) return fromEnv;
    const vercel = process.env.VERCEL_URL?.trim();
    if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;
    return "";
  }
  const proto =
    h.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}
