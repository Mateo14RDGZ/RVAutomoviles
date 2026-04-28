import { buildWhatsappVisitMessage, buildWhatsappVisitUrl } from "@/lib/whatsapp-visit";

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type VehicleVisitCtaProps = {
  /** URL absoluta de la ficha (se incluye en el mensaje de WhatsApp). */
  listingAbsoluteUrl?: string | null;
};

/** Botón de WhatsApp debajo del contenido (móvil y escritorio). */
export function VehicleVisitCtaBelowContent({ listingAbsoluteUrl }: VehicleVisitCtaProps = {}) {
  const href = buildWhatsappVisitUrl(listingAbsoluteUrl);
  const preview = buildWhatsappVisitMessage(listingAbsoluteUrl);
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
      <p className="relative mt-1 text-center text-xs leading-relaxed text-rv-muted">
        Tocá el botón y se abre WhatsApp al{" "}
        <span className="font-semibold text-rv-accent-2">099 744 203</span> con el mensaje listo.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-4 flex min-h-[3.35rem] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-4 py-4 text-base font-bold text-white shadow-[0_18px_42px_rgba(37,211,102,0.45)] transition active:scale-[0.99] hover:bg-[#20bd5a] sm:text-lg"
      >
        <WhatsappIcon className="h-7 w-7 shrink-0" />
        Coordiná tu visita
      </a>
      <p className="relative mt-2 whitespace-pre-wrap text-center text-[11px] leading-relaxed text-rv-muted">
        Mensaje: &ldquo;{preview}&rdquo;
      </p>
    </section>
  );
}
