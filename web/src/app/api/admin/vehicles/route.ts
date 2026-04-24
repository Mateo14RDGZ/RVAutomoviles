import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-session";
import { createVehicle, listVehicles } from "@/lib/vehicle-store";
import { vehicleCreateSchema } from "@/lib/vehicle-schemas";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return NextResponse.json({ vehicles: await listVehicles() });
}

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
  const parsed = vehicleCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const d = parsed.data;
  try {
    const vehicle = await createVehicle({
      brand: d.brand,
      model: d.model,
      year: d.year,
      mileageKm: d.mileageKm ?? null,
      fuel: d.fuel,
      transmission: d.transmission,
      color: d.color,
      price: d.price ?? null,
      currency: d.currency,
      description: d.description,
      highlights: d.highlights,
      photos: d.photos,
      documents: d.documents,
      published: d.published,
      urlSlug: d.urlSlug,
    });
    return NextResponse.json({ vehicle });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error al guardar";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
