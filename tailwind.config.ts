import type { Config } from "tailwindcss";

// FrancoBridge v3: the client's own identity on the editorial school layout.
// The palette is four colours and nothing else: the logo's blue, white, the
// gold of the client's collateral and the logo's red. `colors` replaces
// Tailwind's defaults rather than extending them, so no other colour can be
// used by accident. Lighter shades are the opacity modifier on these four
// (bg-blue/[0.05], text-blue/70). See brand/brand-book.html.
const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      blue: "#283990",
      white: "#ffffff",
      gold: "#d2ac66",
      red: "#c42040",
    },
    extend: {
      // Tailwind's default focus ring is a light blue of its own; use ours.
      ringColor: { DEFAULT: "#283990" },
      fontFamily: {
        // One family: Figtree, the closest open face to the Avenir Next of
        // the client's wordmark and print collateral. Headings take its
        // semibold, body its regular.
        heading: ["var(--font-body)", "system-ui", "sans-serif"],
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
