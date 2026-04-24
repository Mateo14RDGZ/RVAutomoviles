import Link from "next/link";
import { listVehicles } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Panel",
};

export default function AdminHomePage() {
  const vehicles = listVehicles();
  const published = vehicles.filter((v) => v.published).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Resumen</h1>
        <p className="mt-1 text-sm text-slate-600">
          Gestioná el catálogo y copiá el enlace público de cada unidad para redes sociales.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Vehículos</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{vehicles.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Publicados</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{published}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          href="/admin/vehicles"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Ver listado
        </Link>
        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          Nuevo vehículo
        </Link>
      </div>
    </div>
  );
}
