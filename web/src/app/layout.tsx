import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { RegisterPWA } from "@/components/register-pwa";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brandFont = Outfit({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
  viewportFit: "cover",
};

function publicAppUrl(): string {
  const custom = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (custom) {
    try {
      return new URL(custom).origin;
    } catch {
      /* seguir */
    }
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

function safeMetadataBase(): URL {
  try {
    return new URL(publicAppUrl());
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  metadataBase: safeMetadataBase(),
  title: {
    default: "RV Automóviles",
    template: "%s · RV Automóviles",
  },
  description:
    "Fichas públicas de vehículos para compartir en redes y panel interno para tu automotora.",
  applicationName: "RV Automóviles",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }, { url: "/favicon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RV Automóviles",
  },
  formatDetection: {
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={`${geistSans.variable} ${geistMono.variable} ${brandFont.variable} min-h-dvh antialiased`}>
        {children}
        <RegisterPWA />
      </body>
    </html>
  );
}
