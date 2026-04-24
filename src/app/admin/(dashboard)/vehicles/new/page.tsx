import Link from "next/link";
import { VehicleAdminForm } from "@/components/vehicle-admin-form";

export const metadata = {
  title: "Nuevo vehículo",
};

export default function NewVehiclePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Nuevo vehículo</h1>
          <p className="mt-1 text-sm text-slate-600">
            Guardá para obtener el ID y poder subir fotos y documentos.
          </p>
        </div>
        <Link href="/admin/vehicles" className="text-sm text-slate-600 underline">
          Volver
        </Link>
      </div>
      <VehicleAdminForm mode="create" />
    </div>
  );
}
