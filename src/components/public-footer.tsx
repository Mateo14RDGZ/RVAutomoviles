import { BrandLogo } from "@/components/brand-logo";

export function PublicFooter() {
  return (
    <footer className="mt-10 border-t border-rv-accent/15 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-600 md:grid-cols-2">
        <div>
          <BrandLogo className="pointer-events-none" />
          <p className="mt-3 max-w-md leading-relaxed">
            Publicaciones claras, fotos reales y proceso simple para clientes desde el celular.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-rv-accent">Contacto</p>
          <p>Telefono: +54 9 11 2345 6789</p>
          <p>Instagram: @rv.automoviles</p>
          <p>Facebook: RV Automoviles</p>
        </div>
      </div>
    </footer>
  );
}
