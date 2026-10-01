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
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

// Photographs. Wikimedia Commons stock, credited in public/images/CREDITS.md,
// until the client's own photos arrive. Swap the paths here; nothing else
// references them.
export const IMAGES = {
  heroHome: "/images/hero-home.jpg",
  heroAbout: "/images/about-method.jpg",
  heroServices: "/images/services-hero.jpg",
  heroContact: "/images/contact.jpg",
  heroBlog: "/images/blog-hero.jpg",
  aboutGrid: ["/images/service-general.jpg", "/images/contact.jpg", "/images/service-professional.jpg"],
  method: "/images/about-method.jpg",
  services: {
    "tcf-tef-preparation": "/images/service-tcf-tef.jpg",
    "professional-french": "/images/service-professional.jpg",
    "general-french": "/images/service-general.jpg",
    "career-pathway-guidance": "/images/service-career.jpg",
    "immigration-pathways": "/images/service-immigration.jpg",
    translation: "/images/service-translation.jpg",
  } as Record<string, string>,
} as const;
