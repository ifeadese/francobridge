import type { Config } from "tailwindcss";

// FrancoBridge v2: the layout and style of a light, editorial school site.
// Warm white ground, near-black type and buttons, pastel tints of the brand
// colours for banners, and the brand blue and red kept for the mark, the
// patterns and small accents. See brand/brand-book.html.
const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fffbf8",
        black: "#1d1a17",
        grey: { 3: "#f8f4f1", 8: "#ede9e6", 80: "#4a4744" },
        blue: { DEFAULT: "#0E397F", deep: "#0A2A5E", light: "#dbe4f3", pale: "#eef2f9" },
        red: { DEFAULT: "#DB2517", deep: "#B81E12", light: "#fbe0dc" },
        yellow: { DEFAULT: "#ffdf8b", light: "#f9e7b8" },
        green: { light: "#dfe9dc" },
        ivory: "#F6F4F2",
        ink: "#1d1a17",
        slate: "#4a4744",
        line: "#ede9e6",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-.03em",
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};
export default config;
