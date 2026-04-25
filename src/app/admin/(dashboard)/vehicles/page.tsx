import Image from "next/image";
import Link from "next/link";
import { DuplicateVehicleButton } from "@/components/duplicate-vehicle-button";
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
        <div className="rv-surface border-dashed p-8 text-center text-sm text-slate-500">
          Todavía no hay vehículos. Creá el primero para obtener el enlace público.
        </div>
      ) : (
        <ul className="space-y-2">
          {vehicles.map((v) => {
            const thumb = v.photos[0];
            const vehicleName = `${v.brand} ${v.model}`;
            return (
              <li key={v.id} className="rv-surface flex items-stretch overflow-hidden rounded-xl">
                <Link
                  href={`/admin/vehicles/${v.id}/edit`}
                  aria-label={`Editar ${vehicleName} ${v.year}`}
                  className="group flex min-w-0 flex-1 items-center gap-3 px-4 py-3 active:scale-[0.99] sm:py-3.5"
                >
                  <div className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt={vehicleName}
                        fill
                        className="object-cover"
                        sizes="72px"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-1 text-center text-[10px] font-medium leading-tight text-slate-500">
                        Sin foto
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      Vehículo a editar
                    </p>
                    <p className="truncate text-base font-semibold text-slate-900" title={vehicleName}>
                      {vehicleName}{" "}
                      <span className="font-medium text-slate-500">· {v.year}</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      /v/{v.urlSlug}
                      {v.published ? "" : " · borrador"}
                    </p>
                  </div>
                  <span className="shrink-0 self-center text-sm font-medium text-rv-accent transition-colors duration-200 group-hover:text-rv-accent/80">
                    Editar
                  </span>
                </Link>
                <DuplicateVehicleButton sourceId={v.id} sourceLabel={`${vehicleName} ${v.year}`} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
