export const SITE_NAME = "FrancoBridge";
export const LEGAL_NAME = "FrancoBridge Consulting Inc.";
export const SITE_TAGLINE = "Bridging language. Unlocking opportunities.";
// French lines sit inside guillemets with narrow no-break spaces (U+202F).
export const SITE_TAGLINE_FR = "« Un pont vers la langue. Des portes qui s’ouvrent. »";
export const SITE_DESCRIPTION =
  "French language education, TCF and TEF Canada preparation, professional French and pathway guidance in Ottawa and online. Book a consultation to find your level and your programme.";
export const SITE_URL = "https://francobridge.vercel.app";
export const REPO_URL = "https://github.com/ifeadese/francobridge";

export const LOCATION = {
  city: "Ottawa, Ontario, Canada",
  reach: "In Ottawa and online, anywhere",
};

// Placeholders until the client confirms them.
export const CONTACT = {
  email: "info@francobridge.ca",
  phone: "",
};

// cal.com. Replace the handle with the real one once the account is set up.
// Event types to create in cal.com: "consultation" (60 min, CAD 100, paid via
// Stripe) and "lesson" (a page listing private and, later, semi-private).
export const CAL = {
  handle: "francobridge",
  consultation: "francobridge/consultation",
  lesson: "francobridge/lesson",
} as const;

export const CONSULTATION = {
  minutes: 60,
  price: 100,
  currency: "CAD",
  label: "1 hour · $100 CAD · online",
} as const;

export const PACKAGES = [20, 40, 60] as const;

export const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

// Placeholder photographs (Lorem Picsum, fixed ids) until the client's own
// photos arrive. Swap the URLs here; nothing else references them.
const pic = (id: number, w = 1400, h = 1400) => `https://picsum.photos/id/${id}/${w}/${h}`;
export const IMAGES = {
  heroHome: pic(20, 1400, 1600),
  heroAbout: pic(180, 1400, 1200),
  heroServices: pic(42, 1400, 1200),
  heroContact: pic(305, 1400, 1200),
  heroBlog: pic(24, 1400, 1200),
  aboutGrid: [pic(24, 1200, 900), pic(305, 900, 500), pic(60, 900, 500)],
  method: pic(180, 1200, 1400),
  services: {
    "tcf-tef-preparation": pic(20, 900, 1200),
    "professional-french": pic(60, 900, 1200),
    "general-french": pic(24, 900, 1200),
    "career-pathway-guidance": pic(180, 900, 1200),
    "immigration-pathways": pic(214, 900, 1200),
    translation: pic(119, 900, 1200),
  } as Record<string, string>,
} as const;
