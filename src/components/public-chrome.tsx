import { PublicMobileNav } from "@/components/public-mobile-nav";

/** Contenedor público: espacio inferior para la barra de navegación móvil. */
export function PublicChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh pb-[calc(4.25rem+env(safe-area-inset-bottom))]">
      {children}
      <PublicMobileNav />
    </div>
  );
}
