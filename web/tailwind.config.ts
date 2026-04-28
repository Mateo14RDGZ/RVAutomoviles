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
          accent: "#0073E6",
          "accent-2": "#38BDF8",
          glow: "#22D3EE",
          deep: "#050B1F",
          violet: "#6366F1",
          amber: "#F59E0B",
        },
      },
      fontFeatureSettings: {
        tabular: '"tnum"',
      },
    },
  },
  plugins: [],
} satisfies Config;
