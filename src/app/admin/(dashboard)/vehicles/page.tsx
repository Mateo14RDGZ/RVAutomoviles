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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="rv-title">Vehículos</h1>
          <p className="mt-1 rv-muted">Editá datos, fotos y documentación.</p>
        </div>
        <Link href="/admin/vehicles/new" className="rv-btn-primary shrink-0">
          Nuevo
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="rv-surface border-dashed border-white/20 p-8 text-center text-sm text-slate-400">
          Todavía no hay vehículos. Creá el primero para obtener el enlace público.
        </div>
      ) : (
        <ul className="space-y-2">
          {vehicles.map((v) => (
            <li key={v.id}>
              <Link
                href={`/admin/vehicles/${v.id}/edit`}
                className="group rv-surface flex items-center justify-between gap-3 px-4 py-3.5 active:scale-[0.99]"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">
                    {v.brand} {v.model} · {v.year}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    /v/{v.urlSlug}
                    {v.published ? "" : " · borrador"}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-sky-400 transition-colors duration-200 group-hover:text-sky-300">
                  Editar
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
