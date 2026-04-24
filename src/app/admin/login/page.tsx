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
      <div className="pointer-events-none absolute -left-14 top-10 h-36 w-36 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-14 bottom-10 h-36 w-36 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-8">
        <h1 className="text-lg font-medium text-white">Panel de administración</h1>
        <p className="mt-2 text-sm text-slate-400">
          Ingresá la contraseña configurada en el servidor para gestionar vehículos.
        </p>
        {configError ? (
          <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-950/40 px-3 py-2 text-sm text-amber-100">
            Falta configurar variables de entorno. Creá un archivo{" "}
            <code className="rounded bg-white/10 px-1">.env.local</code> con{" "}
            <code className="rounded bg-white/10 px-1">ADMIN_PASSWORD</code> y{" "}
            <code className="rounded bg-white/10 px-1">SESSION_SECRET</code>.
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
            className="font-medium text-sky-400 transition-colors duration-200 hover:text-sky-300"
          >
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
