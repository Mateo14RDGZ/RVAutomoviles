import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        rv: {
          // Acentos
          accent: "#3B82F6",
          "accent-2": "#60A5FA",
          glow: "#22D3EE",
          violet: "#6366F1",
          amber: "#F59E0B",
          success: "#10B981",
          // Dark surfaces (Midnight Showroom)
          deep: "#070B17",
          bg2: "#0B1226",
          surface: "#101935",
          "surface-2": "#1A2347",
          border: "#1F2A4F",
          // Texto
          text: "#E6ECFF",
          muted: "#8A95B9",
        },
      },
      fontFeatureSettings: {
        tabular: '"tnum"',
      },
    },
  },
  plugins: [],
} satisfies Config;
