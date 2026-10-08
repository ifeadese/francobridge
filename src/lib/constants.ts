export const SITE_NAME = "FrancoBridge";
export const LEGAL_NAME = "FrancoBridge Consulting Inc.";
export const SITE_TAGLINE = "Bridging language. Unlocking opportunities.";
// French lines are plain taglines, no guillemets; only a real quotation takes them.
export const SITE_TAGLINE_FR = "Un pont vers la langue. Des portes qui s’ouvrent.";
export const SITE_DESCRIPTION =
  "French language coaching, TCF, TEF, DELF and DALF preparation, Government of Canada Second Language Evaluation preparation, immigration pathway support, interview preparation and translation. A language education and professional development firm in Ottawa, online across North America.";
export const SITE_URL = "https://francobridge.vercel.app";
export const REPO_URL = "https://github.com/ifeadese/francobridge";

// The client's own words, from the pamphlet and the banner, kept verbatim.
export const WHO_WE_ARE =
  "FrancoBridge Consulting is a language education and professional development firm that helps individuals gain the French language confidence and skills needed to succeed academically, professionally, and through immigration pathways. We empower clients to thrive and integrate fully within Canada’s bilingual and Francophone communities across North America.";

export const MISSION = "To bridge language gaps by delivering tailored language training and consulting services.";
export const VISION = "To be North America’s leading language and education training firm.";

export const VALUES = [
  { name: "Excellence", text: "Delivering high-quality education and client-centered services." },
  { name: "Integrity", text: "Providing honest, ethical, and trustworthy guidance." },
  { name: "Empowerment", text: "Equipping clients with the skills and confidence to succeed." },
  { name: "Inclusivity", text: "Creating opportunities for learners from diverse backgrounds." },
  { name: "Growth", text: "Inspiring lifelong learning, personal development, and professional advancement." },
] as const;

// From the business card.
export const FOUNDER = { name: "Great Nwankwo", role: "Founder" } as const;

export const LOCATION = {
  city: "Ottawa, Ontario, Canada",
  reach: "From Ottawa, online across Canada and North America",
};

// The email and the two phone lines are the client's, from the business
// card and the pamphlet.
export const CONTACT = {
  email: "info@francobridgeconsulting.com",
  phones: [
    { display: "+1 (613) 219-9372", tel: "+16132199372" },
    { display: "+1 (613) 286-5620", tel: "+16132865620" },
  ],
} as const;

// cal.com links, "<username>/<event-slug>" as in the event's own URL.
// PLACEHOLDER: every link is ADESE's discovery call until the client has a
// cal.com account. Then: "consultation" (60 min, CAD 100, paid via Stripe)
// for new students, and one event per program for returning students, e.g.
// "francobridge/tcf-tef-lesson". Translation is quoted, not booked, so it has
// no event; nor do the services that are not lessons.
const PLACEHOLDER = "adese-studio/discovery-call";
export const CAL = {
  consultation: PLACEHOLDER,
  services: {
    "tcf-tef-preparation": PLACEHOLDER,
    "general-french": PLACEHOLDER,
    "sle-preparation": PLACEHOLDER,
    "professional-french": PLACEHOLDER,
    "bilingual-interview-preparation": PLACEHOLDER,
    "academic-support": PLACEHOLDER,
    "immigration-pathways": PLACEHOLDER,
  } as Record<string, string>,
} as const;

// The booking page. BookButton links here with the card to open.
export const BOOK_PATH = "/consultation";

export const CONSULTATION = {
  minutes: 60,
  price: 100,
  currency: "CAD",
  label: "1 Hour · $100 CAD",
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
    "general-french": "/images/service-general.jpg",
    "sle-preparation": "/images/service-professional.jpg",
    "professional-french": "/images/service-professional.jpg",
    "bilingual-interview-preparation": "/images/service-career.jpg",
    "academic-support": "/images/about-method.jpg",
    "immigration-pathways": "/images/service-immigration.jpg",
    translation: "/images/service-translation.jpg",
  } as Record<string, string>,
} as const;
