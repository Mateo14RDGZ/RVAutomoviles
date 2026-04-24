import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-session";
import { deleteVehicle, getVehicleById, updateVehicle } from "@/lib/vehicle-store";
import { vehiclePatchSchema } from "@/lib/vehicle-schemas";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await context.params;
  const vehicle = getVehicleById(id);
  if (!vehicle) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ vehicle });
}

export async function PATCH(request: Request, context: Ctx) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await context.params;
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const parsed = vehiclePatchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  try {
    const vehicle = updateVehicle(id, parsed.data);
    if (!vehicle) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ vehicle });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error al guardar";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: Ctx) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await context.params;
  const ok = deleteVehicle(id);
  if (!ok) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
