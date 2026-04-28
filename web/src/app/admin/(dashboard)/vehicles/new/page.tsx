import Link from "next/link";
import { VehicleAdminForm } from "@/components/vehicle-admin-form";

export const metadata = {
  title: "Nuevo vehículo",
};

export default function NewVehiclePage() {
  return (
    <div className="space-y-5">
      <header className="rv-surface relative overflow-hidden p-5 sm:p-6">
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rv-accent/15 blur-3xl"
          aria-hidden
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-rv-accent">Catálogo</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Nuevo vehículo</h1>
            <p className="mt-1.5 max-w-xl text-sm text-slate-600">
              Guardá para obtener el ID y poder subir fotos y documentos. Por defecto se crea como borrador.
            </p>
          </div>
          <Link href="/admin/vehicles" className="rv-btn-secondary inline-flex items-center gap-1">
            <span aria-hidden>←</span> Volver
          </Link>
        </div>
      </header>

      <VehicleAdminForm mode="create" />
    </div>
  );
}
