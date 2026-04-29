import { buildWhatsappVisitUrl } from "@/lib/whatsapp-visit";
import { WhatsappIcon } from "./icons/whatsapp-icon";

type VehicleVisitCtaProps = {
  /** URL absoluta de la ficha (se incluye en el mensaje de WhatsApp). */
  listingAbsoluteUrl?: string | null;
};

/** Botón de WhatsApp debajo del contenido (móvil y escritorio). */
export function VehicleVisitCtaBelowContent({ listingAbsoluteUrl }: VehicleVisitCtaProps = {}) {
  const href = buildWhatsappVisitUrl(listingAbsoluteUrl);
  return (
    <section
      className="rv-glow-ring relative mt-10 overflow-hidden rounded-3xl border border-rv-border bg-gradient-to-b from-rv-accent/15 via-rv-surface/80 to-rv-bg2/90 p-5 shadow-[0_18px_50px_rgba(2,6,23,0.55)] sm:mt-12 sm:p-6"
      aria-label="Coordinar visita por WhatsApp"
    >
      <span
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rv-accent/20 blur-3xl"
        aria-hidden
      />
      <p className="relative text-center text-sm font-semibold text-rv-text">¿Querés verlo en persona?</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-3 flex min-h-[3.35rem] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-4 py-4 text-base font-bold text-white shadow-[0_18px_42px_rgba(37,211,102,0.45)] transition active:scale-[0.99] hover:bg-[#20bd5a] sm:text-lg"
      >
        <WhatsappIcon className="h-7 w-7 shrink-0" />
        Coordiná tu visita
      </a>
    </section>
  );
}
