import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-session";
import { getVehicleById } from "@/lib/vehicle-store";

export const runtime = "nodejs";

const maxBytes = 15 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Formulario inválido" }, { status: 400 });
  }

  const vehicleId = String(form.get("vehicleId") ?? "").trim();
  const file = form.get("file");
  if (!vehicleId || !(file instanceof File)) {
    return NextResponse.json({ error: "vehicleId y file son obligatorios" }, { status: 400 });
  }
  if (!(await getVehicleById(vehicleId))) {
    return NextResponse.json({ error: "Vehículo inexistente" }, { status: 404 });
  }
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "Archivo demasiado grande (máx. 15 MB)" }, { status: 400 });
  }

  const rawName = file.name || "archivo";
  const safe = rawName.replace(/[^\w.\-()+ ]/g, "_").slice(0, 120);
  const stamp = Date.now();
  const filename = `${stamp}-${safe}`;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    const pathname = `vehicles/${vehicleId}/${filename}`;
    const blob = await put(pathname, file, {
      access: "public",
      token: blobToken,
    });
    return NextResponse.json({ url: blob.url });
  }

  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        error:
          "En Vercel hace falta Blob Storage: creá un store en el dashboard y definí BLOB_READ_WRITE_TOKEN.",
      },
      { status: 503 },
    );
  }

  const relDir = path.join("uploads", "vehicles", vehicleId);
  const absDir = path.join(process.cwd(), "public", relDir);
  fs.mkdirSync(absDir, { recursive: true });
  const absPath = path.join(absDir, filename);
  const buf = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(absPath, buf);
  const url = `/${relDir.replace(/\\/g, "/")}/${filename}`;
  return NextResponse.json({ url });
}
