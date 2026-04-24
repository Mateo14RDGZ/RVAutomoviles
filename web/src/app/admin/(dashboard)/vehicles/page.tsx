import Link from "next/link";
import { listVehicles } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vehículos",
};

export default function AdminVehiclesPage() {
  const vehicles = listVehicles();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Vehículos</h1>
          <p className="mt-1 text-sm text-slate-600">Editá datos, fotos y documentación.</p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Nuevo
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-600">
          Todavía no hay vehículos. Creá el primero para obtener el enlace público.
        </p>
      ) : (
        <ul className="space-y-2">
          {vehicles.map((v) => (
            <li key={v.id}>
              <Link
                href={`/admin/vehicles/${v.id}/edit`}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:border-slate-300"
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
