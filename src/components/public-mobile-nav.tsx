"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Autos" },
] as const;

export function PublicMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-rv-accent/15 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgba(30,166,247,0.08)] backdrop-blur-xl"
      aria-label="Principal"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around gap-1 px-2 py-2">
        {links.map(({ href, label }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex min-h-[2.9rem] flex-col items-center justify-center rounded-xl text-xs font-medium transition-colors duration-200 ${
                  active ? "bg-rv-accent/10 text-rv-accent" : "text-slate-500 hover:text-rv-accent"
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
