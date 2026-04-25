import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminSessionValid } from "@/lib/admin-session";
import { duplicateVehicleWithoutPhotos } from "@/lib/vehicle-store";

export const runtime = "nodejs";

const bodySchema = z.object({
  sourceId: z.string().min(1),
});

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  try {
    const vehicle = await duplicateVehicleWithoutPhotos(parsed.data.sourceId);
    return NextResponse.json({ vehicle });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error al duplicar";
    const status = msg === "Vehículo no encontrado" ? 404 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
