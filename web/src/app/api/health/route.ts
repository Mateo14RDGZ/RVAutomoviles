import { NextResponse } from "next/server";
import { isRemoteStore } from "@/lib/vehicle-store";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    env: process.env.VERCEL ? "vercel" : "local",
    storage: isRemoteStore() ? "postgres" : "filesystem",
    hasBlob: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  });
}
