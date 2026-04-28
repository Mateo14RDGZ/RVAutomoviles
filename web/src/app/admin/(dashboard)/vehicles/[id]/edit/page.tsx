import Link from "next/link";
import { notFound } from "next/navigation";
import { VehicleAdminForm } from "@/components/vehicle-admin-form";
import { DeleteVehicleButton, MarkVehicleSoldButton } from "./delete-vehicle-button";
import { getVehicleById } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Editar vehículo",
};

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();

  return (
    <div className="space-y-5">
      <header className="rv-surface relative overflow-hidden p-5 sm:p-6">
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rv-accent/15 blur-3xl"
          aria-hidden
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-rv-accent">Editar vehículo</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {vehicle.brand} {vehicle.model}{" "}
              <span className="font-medium text-slate-500">· {vehicle.year}</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-600">
              Los cambios quedan visibles al guardar. Podés alternar publicación al final del formulario.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span
                className={
                  vehicle.published
                    ? "inline-flex items-center gap-1.5 rounded-full border border-emerald-300/60 bg-emerald-50 px-2.5 py-1 font-bold uppercase tracking-wide text-emerald-700"
                    : "inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-50 px-2.5 py-1 font-bold uppercase tracking-wide text-amber-700"
                }
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    vehicle.published ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                  aria-hidden
                />
                {vehicle.published ? "Publicado" : "Borrador"}
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-semibold text-slate-700">
                /v/{vehicle.urlSlug}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/vehicles" className="rv-btn-secondary inline-flex items-center gap-1">
              <span aria-hidden>←</span> Listado
            </Link>
            {vehicle.published ? (
              <Link
                href={`/v/${vehicle.urlSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rv-btn-secondary inline-flex items-center gap-1"
              >
                Ver público →
              </Link>
            ) : null}
            <MarkVehicleSoldButton id={vehicle.id} />
            <DeleteVehicleButton id={vehicle.id} />
          </div>
        </div>
      </header>

      <VehicleAdminForm mode="edit" initial={vehicle} />
    </div>
  );
}
