import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B3D91",
        "french-blue": "#002395",
        red: "#D52B1E",
        "soft-white": "#F8F6F1",
        charcoal: "#1F2937",
        green: "#5E7F66",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.03em",
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(11, 61, 145, 0.10)",
        md: "0 8px 30px rgba(11, 61, 145, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
