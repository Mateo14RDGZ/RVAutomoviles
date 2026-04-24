import Link from "next/link";
import { listVehicles } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vehículos",
};

export default async function AdminVehiclesPage() {
  const vehicles = await listVehicles();

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="rv-title">Vehículos</h1>
          <p className="mt-1 rv-muted">Editá datos, fotos y documentación.</p>
        </div>
        <Link href="/admin/vehicles/new" className="rv-btn-primary">
          Nuevo
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="rv-surface border-dashed p-8 text-center">
          <p className="text-sm text-slate-600">
            Todavía no hay vehículos. Creá el primero para obtener el enlace público.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {vehicles.map((v) => (
            <li key={v.id}>
              <Link
                href={`/admin/vehicles/${v.id}/edit`}
                className="rv-surface flex items-center justify-between gap-3 px-4 py-3 transition hover:-translate-y-0.5 hover:border-sky-200"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {v.brand} {v.model} · {v.year}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    /v/{v.urlSlug} {v.published ? "" : "· borrador"}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-sky-700">Editar</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
