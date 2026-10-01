import { CONSULTATION, PACKAGES } from "@/lib/constants";

// The questions people ask before booking, answered in plain numbers. The
// facts come from the brief and the client's answers; keep them in step with
// src/lib/constants.ts.
export type Faq = { q: string; a: string[]; cta?: "consultation" | "lesson" | "contact" };

export const FAQS: Faq[] = [
  {
    q: "What happens in the consultation?",
    a: [
      `One hour online with your instructor, $${CONSULTATION.price} ${CONSULTATION.currency}, paid when you book. It includes your French level assessment and ends with a recommended programme.`,
    ],
    cta: "consultation",
  },
  {
    q: "Do I pay before the consultation?",
    a: [
      "Yes. You book and pay for the consultation online. Once your level has been determined, you pay for your programme separately, before your first session.",
    ],
  },
  {
    q: "How long is a programme?",
    a: [
      `Programmes run online in blocks of ${PACKAGES.join(", ")} hours. The block and the level are agreed at your consultation and paid for afterwards, before your first session.`,
    ],
  },
  {
    q: "What levels do you teach?",
    a: [
      "From A1 to C1 on the Common European Framework. Every programme names the level it is for, and your consultation tells you where you start.",
    ],
  },
  {
    q: "Are lessons private or in groups?",
    a: [
      "Private lessons now; semi-private as groups form. One booking link shows the options available.",
    ],
    cta: "lesson",
  },
  {
    q: "Where are classes held?",
    a: [
      "Online. FrancoBridge is based in Ottawa, Ontario, and every programme runs online, so it reaches beyond the city as the school grows.",
    ],
  },
  {
    q: "What is not included?",
    a: [
      "Official TCF or TEF examination fees, which you pay directly to the test centre.",
      "Regulated immigration advice or representation, which we refer to an appropriately authorized immigration professional.",
      "Career and education pathway services are offered in French only.",
    ],
    cta: "contact",
  },
];
