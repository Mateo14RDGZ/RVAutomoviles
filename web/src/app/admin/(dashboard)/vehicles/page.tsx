import Image from "next/image";
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
          {vehicles.map((v) => {
            const thumb = v.photos[0];
            return (
              <li key={v.id}>
                <Link
                  href={`/admin/vehicles/${v.id}/edit`}
                  className="rv-surface flex items-center justify-between gap-3 px-4 py-3 transition hover:-translate-y-0.5 hover:border-sky-200 sm:py-3.5"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={`${v.brand} ${v.model}`}
                          fill
                          className="object-cover"
                          sizes="72px"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-1 text-center text-[10px] font-medium leading-tight text-slate-400">
                          Sin foto
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-semibold text-slate-900">
                        {v.brand} {v.model}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {v.year} · /v/{v.urlSlug} {v.published ? "" : "· borrador"}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-sky-700">Editar</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
