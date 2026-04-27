import type { Metadata } from "next";
import { PublicChrome } from "@/components/public-chrome";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio y de las publicaciones de vehículos.",
};

export default function TerminosPage() {
  return (
    <PublicChrome>
      <main className="mx-auto max-w-4xl px-4 py-10 text-slate-800 sm:px-6 sm:py-14">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Términos y condiciones</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          La información publicada en este sitio es de carácter orientativo y puede actualizarse sin previo
          aviso. La disponibilidad de unidades está sujeta a confirmación al momento de la consulta.
        </p>
        <section className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          <p>
            Los precios, condiciones de financiación y documentación se validan con el equipo comercial antes
            del cierre de cualquier operación.
          </p>
          <p>
            El uso de este sitio implica la aceptación de estas condiciones y de la política de privacidad
            vigente.
          </p>
        </section>
      </main>
    </PublicChrome>
  );
}
