import type { Metadata } from "next";
import { PublicChrome } from "@/components/public-chrome";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Tratamiento de datos personales en RV Automóviles.",
};

export default function PrivacidadPage() {
  return (
    <PublicChrome>
      <main className="mx-auto max-w-4xl px-4 py-10 text-slate-800 sm:px-6 sm:py-14">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Política de privacidad</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          En RV Automóviles utilizamos los datos de contacto enviados por formularios o WhatsApp únicamente
          para responder consultas comerciales, coordinar visitas y brindar información sobre vehículos.
        </p>
        <section className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          <p>
            No comercializamos datos personales con terceros. Conservamos la información por el tiempo
            necesario para la gestión comercial y atención posventa.
          </p>
          <p>
            Si querés solicitar actualización o eliminación de tus datos, escribinos por los canales de
            contacto publicados en esta web.
          </p>
        </section>
      </main>
    </PublicChrome>
  );
}
