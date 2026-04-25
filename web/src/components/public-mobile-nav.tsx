"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Autos" },
  { href: "/admin/login", label: "Gestión" },
] as const;

export function PublicMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-sky-200/20 bg-slate-950/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
      aria-label="Principal"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around gap-1 px-2 pt-2">
        {links.map(({ href, label }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex min-h-[3rem] flex-col items-center justify-center rounded-xl text-xs font-medium transition-colors ${
                  active
                    ? "bg-gradient-to-r from-sky-400/20 to-cyan-300/20 text-sky-100"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
