import type { Config } from "tailwindcss";

// The FrancoBridge palette: three colours from the mark, plus the blue-black
// they need for reading. See brand/brand-book.html.
const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: { DEFAULT: "#0E397F", deep: "#0A2A5E" },
        red: { DEFAULT: "#DB2517", deep: "#B81E12" },
        ivory: { DEFAULT: "#F6F4F2", deep: "#ECE8E1" },
        ink: "#14203A",
        slate: "#56607A",
        line: "rgb(14 57 127 / 0.14)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        arch: "9999px 9999px 0 0",
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
        sm: "0 5px 10px rgba(14, 57, 127, 0.08)",
        md: "0 8px 30px rgba(14, 57, 127, 0.12)",
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};
export default config;
