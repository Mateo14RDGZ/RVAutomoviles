import Link from "next/link";
import { notFound } from "next/navigation";
import { VehicleAdminForm } from "@/components/vehicle-admin-form";
import { DeleteVehicleButton } from "./delete-vehicle-button";
import { getVehicleById } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Editar vehículo",
};

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = getVehicleById(id);
  if (!vehicle) notFound();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Editar · {vehicle.brand} {vehicle.model}
          </h1>
          <p className="mt-1 text-sm text-slate-600">Cambios visibles al guardar.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/vehicles" className="text-sm text-slate-600 underline">
            Listado
          </Link>
          <DeleteVehicleButton id={vehicle.id} />
        </div>
      </div>
      <VehicleAdminForm mode="edit" initial={vehicle} />
    </div>
  );
}
