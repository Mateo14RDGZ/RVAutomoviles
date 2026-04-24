import Link from "next/link";
import { listVehicles } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Panel",
};

export default async function AdminHomePage() {
  const vehicles = await listVehicles();
  const published = vehicles.filter((v) => v.published).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="rv-title">Resumen</h1>
        <p className="mt-1 rv-muted">
          Gestioná el catálogo y copiá el enlace público de cada unidad para redes sociales.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rv-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Vehículos</p>
          <p className="mt-2 text-3xl font-light tabular-nums text-white">{vehicles.length}</p>
        </div>
        <div className="rv-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Publicados</p>
          <p className="mt-2 text-3xl font-light tabular-nums text-white">{published}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href="/admin/vehicles" className="rv-btn-primary">
          Ver listado
        </Link>
        <Link href="/admin/vehicles/new" className="rv-btn-secondary">
          Nuevo vehículo
        </Link>
      </div>
    </div>
  );
}
