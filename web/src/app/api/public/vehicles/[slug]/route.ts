import { NextResponse } from "next/server";
import { getVehicleBySlug } from "@/lib/vehicle-store";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: Ctx) {
  const { slug } = await context.params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle || !vehicle.published) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json({ vehicle });
}
