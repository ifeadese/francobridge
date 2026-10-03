export const SITE_NAME = "FrancoBridge";
export const LEGAL_NAME = "FrancoBridge Consulting Inc.";
export const SITE_TAGLINE = "Bridging language. Unlocking opportunities.";
// French lines are plain taglines, no guillemets; only a real quotation takes them.
export const SITE_TAGLINE_FR = "Un pont vers la langue. Des portes qui s’ouvrent.";
export const SITE_DESCRIPTION =
  "French language education, TCF and TEF Canada preparation, professional French and pathway guidance in Ottawa and online. Book a consultation to find your level and your program.";
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

// cal.com links, "<username>/<event-slug>" as in the event's own URL.
// PLACEHOLDER: every link is ADESE's discovery call until the client has a
// cal.com account. Then: "consultation" (60 min, CAD 100, paid via Stripe)
// for new students, and one event per program for returning students, e.g.
// "francobridge/tcf-tef-lesson". Translation is quoted, not booked, so it has
// no event.
const PLACEHOLDER = "adese-studio/discovery-call";
export const CAL = {
  consultation: PLACEHOLDER,
  services: {
    "tcf-tef-preparation": PLACEHOLDER,
    "professional-french": PLACEHOLDER,
    "general-french": PLACEHOLDER,
    "career-pathway-guidance": PLACEHOLDER,
    "immigration-pathways": PLACEHOLDER,
  } as Record<string, string>,
} as const;

// The booking page. BookButton links here with the card to open.
export const BOOK_PATH = "/consultation";

export const CONSULTATION = {
  minutes: 60,
  price: 100,
  currency: "CAD",
  label: "1 Hour · $100 CAD · Online",
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
