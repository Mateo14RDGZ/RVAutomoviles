import { PublicFooter } from "@/components/public-footer";
import { PublicHeader } from "@/components/public-header";
import { PublicMobileNav } from "@/components/public-mobile-nav";

export function PublicChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-50">
      <PublicHeader />
      <div className="pb-20 md:pb-0">{children}</div>
      <PublicFooter />
      <div className="md:hidden">
        <PublicMobileNav />
      </div>
    </div>
  );
}
