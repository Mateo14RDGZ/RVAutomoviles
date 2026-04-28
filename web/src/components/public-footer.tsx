import { buildWhatsappUrl } from "@/lib/whatsapp-visit";
import { BrandLogo } from "@/components/brand-logo";

export function PublicFooter() {
  return (
    <footer className="mt-12 border-t border-rv-accent/20 bg-white">
      <div className="rv-mobile-enter rv-mobile-enter-6 mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-600 md:grid-cols-2">
        <div>
          <BrandLogo className="inline-flex" />
          <p className="mt-3 max-w-md leading-relaxed">
            Tu proximo auto con informacion clara, fotos reales y documentacion disponible.
          </p>
          <p className="mt-2 text-xs text-slate-500">Atención: Lun a Sáb · Respuesta dentro del día.</p>
        </div>

        <div className="space-y-2 md:justify-self-end md:text-right">
          <p className="font-semibold text-rv-accent">Contacto</p>
          <div className="grid grid-cols-1 gap-2 sm:hidden">
            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              <span aria-hidden>💬</span>
              <span>WhatsApp</span>
            </a>
            <a
              href="https://www.instagram.com/rv__automoviles/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-fuchsia-500/30 bg-fuchsia-50 px-3 py-2.5 text-sm font-semibold text-fuchsia-700 transition hover:bg-fuchsia-100"
            >
              <span aria-hidden>📷</span>
              <span>Instagram</span>
            </a>
          </div>
          <div className="hidden gap-2 sm:grid sm:min-w-[300px]">
            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between rounded-xl border border-emerald-500/25 bg-emerald-50/80 px-3 py-2 text-sm text-emerald-800 transition hover:bg-emerald-100 md:justify-end md:gap-2"
            >
              <span className="font-medium">WhatsApp</span>
              <span className="font-semibold underline decoration-emerald-700/40 underline-offset-2">099 744 203</span>
            </a>
            <a
              href="https://www.instagram.com/rv__automoviles/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between rounded-xl border border-fuchsia-500/25 bg-fuchsia-50/80 px-3 py-2 text-sm text-fuchsia-800 transition hover:bg-fuchsia-100 md:justify-end md:gap-2"
            >
              <span className="font-medium">Instagram</span>
              <span className="font-semibold">@rv__automoviles</span>
            </a>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs md:justify-end">
            <a href="/privacidad" className="text-slate-500 underline-offset-2 hover:text-rv-accent hover:underline">
              Privacidad
            </a>
            <a href="/terminos" className="text-slate-500 underline-offset-2 hover:text-rv-accent hover:underline">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
