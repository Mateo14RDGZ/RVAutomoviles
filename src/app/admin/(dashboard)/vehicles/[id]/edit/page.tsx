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
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="rv-title">
            Editar · {vehicle.brand} {vehicle.model}
          </h1>
          <p className="mt-1 rv-muted">Cambios visibles al guardar.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/vehicles" className="rv-btn-secondary px-3 py-1.5">
            Listado
          </Link>
          <MarkVehicleSoldButton id={vehicle.id} />
          <DeleteVehicleButton id={vehicle.id} />
        </div>
      </div>
      <VehicleAdminForm mode="edit" initial={vehicle} />
    </div>
  );
}
