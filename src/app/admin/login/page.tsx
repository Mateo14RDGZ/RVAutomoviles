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
    <div className="relative mx-auto max-w-md px-4 py-16">
      <div className="pointer-events-none absolute -left-14 top-10 h-36 w-36 rounded-full bg-rv-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-14 bottom-10 h-36 w-36 rounded-full bg-rv-accent/15 blur-3xl" />
      <div className="relative rounded-2xl border border-rv-accent/15 bg-white p-6 shadow-[0_20px_50px_rgba(30,166,247,0.12)] sm:p-8">
        <h1 className="text-lg font-semibold text-rv-accent">Panel de administración</h1>
        <p className="mt-2 border-l-4 border-rv-accent bg-rv-accent/[0.06] py-2 pl-3 text-sm text-slate-700">
          Ingresá la contraseña configurada en el servidor para gestionar vehículos.
        </p>
        {configError ? (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Falta configurar variables de entorno. Creá un archivo{" "}
            <code className="rounded bg-white px-1 ring-1 ring-amber-200">.env.local</code> con{" "}
            <code className="rounded bg-white px-1 ring-1 ring-amber-200">ADMIN_PASSWORD</code> y{" "}
            <code className="rounded bg-white px-1 ring-1 ring-amber-200">SESSION_SECRET</code>.
          </p>
        ) : null}
        <div className="mt-6">
          <Suspense fallback={<p className="text-sm text-slate-500">Cargando…</p>}>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          <Link
            href="/"
            className="font-medium text-rv-accent transition-colors duration-200 hover:text-rv-accent/80"
          >
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
