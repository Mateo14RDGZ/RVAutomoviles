import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Acceso administración",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ err?: string }>;
}) {
  const sp = await searchParams;
  const configError = sp.err === "config";

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-slate-900">Panel de administración</h1>
        <p className="mt-2 text-sm text-slate-600">
          Ingresá la contraseña configurada en el servidor para gestionar vehículos.
        </p>
        {configError ? (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Falta configurar variables de entorno. Creá un archivo{" "}
            <code className="rounded bg-amber-100 px-1">.env.local</code> con{" "}
            <code className="rounded bg-amber-100 px-1">ADMIN_PASSWORD</code> y{" "}
            <code className="rounded bg-amber-100 px-1">SESSION_SECRET</code>.
          </p>
        ) : null}
        <div className="mt-6">
          <Suspense fallback={<p className="text-sm text-slate-500">Cargando…</p>}>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          <Link href="/" className="underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
