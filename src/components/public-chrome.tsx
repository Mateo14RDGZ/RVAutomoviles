import { PublicFooter } from "@/components/public-footer";
import { PublicHeader } from "@/components/public-header";

export function PublicChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-50">
      <PublicHeader />
      <div>{children}</div>
      <PublicFooter />
    </div>
  );
}
