// The six services, in the order they appear on the site. TCF & TEF first:
// the brief asks for it to be the most visible.
export type Service = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  sub: string;
  fr: string;
  level: string;
  format: string;
  intro: string[];
  includes: { title: string; items: string[] }[];
  notes?: string[];
  cta: "consultation" | "lesson";
  /** The home page card: one tight line as its title, who it is for, and the button. */
  cardTitle: string;
  cardFor: string;
  ctaLabel: string;
  related: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "tcf-tef-preparation",
    name: "TCF & TEF Canada Preparation",
    short: "TCF & TEF",
    headline: "Prepare with purpose. Practice with guidance.",
    sub: "Approach your TCF or TEF examination with confidence.",
    fr: "« Préparez-vous avec méthode. Passez l’examen avec confiance. »",
    level: "A2 to C1",
    format: "Online · Private coaching · Intensive options",
    intro: [
      "The TCF Canada and TEF Canada are the French proficiency tests recognised for Canadian immigration and citizenship. Preparation is not the same as learning French: it is learning the format, the timing and what the examiners reward, then practising until it is familiar.",
      "We start with your target score and your test date, then work backwards. Every session is built around the four skills the exam measures, with mock examinations along the way so the real one holds no surprises.",
    ],
    includes: [
      {
        title: "Orientation and courses",
        items: [
          "TEF Canada orientation",
          "TEF preparation courses",
          "Intensive preparation",
          "Private coaching",
        ],
      },
      {
        title: "The four skills",
        items: [
          "Listening preparation",
          "Reading preparation",
          "Written expression",
          "Oral expression",
        ],
      },
      {
        title: "Practice and feedback",
        items: ["Mock examinations", "Speaking evaluation", "Writing correction"],
      },
    ],
    notes: [
      "FrancoBridge preparation fees do not include official TCF or TEF examination fees. You register and pay for the examination directly with the test centre.",
    ],
    cta: "consultation",
    cardTitle: "Pass your TCF or TEF Canada with confidence.",
    cardFor: "For anyone who needs an official French score for immigration or citizenship, and wants to walk into the exam knowing exactly what to expect.",
    ctaLabel: "Explore exam preparation",
    related: ["general-french", "immigration-pathways"],
  },
  {
    slug: "professional-french",
    name: "Professional French",
    short: "Professional French",
    headline: "French for the Workplace",
    sub: "Build the language skills and confidence you need to communicate effectively in a professional environment.",
    fr: "« Le français au travail, avec assurance. »",
    level: "B1 to C1",
    format: "Online · Private or semi-private",
    intro: [
      "Workplace French is its own register: meetings, emails, presentations, interviews and the small talk in between. This programme is for people who already have some French and need to use it at work, in business or in the public service.",
      "Sessions are built around your job. We work with your real documents, your real meetings and the vocabulary of your field, so what you practise on Tuesday you can use on Wednesday.",
    ],
    includes: [
      {
        title: "At work",
        items: [
          "French for professionals",
          "Workplace French",
          "Business French",
          "Workplace conversation",
          "Professional vocabulary",
        ],
      },
      {
        title: "Communication",
        items: [
          "French communication coaching",
          "French presentation skills",
          "French interview preparation",
        ],
      },
      {
        title: "Public service",
        items: [
          "Government and public-service French preparation",
          "Second Language Evaluation (SLE) preparation",
        ],
      },
    ],
    cta: "consultation",
    cardTitle: "Speak French with confidence at work.",
    cardFor: "For professionals with some French already, who need to use it in meetings, emails, interviews and the public service.",
    ctaLabel: "Explore professional French",
    related: ["career-pathway-guidance", "general-french"],
  },
  {
    slug: "general-french",
    name: "General French Programs",
    short: "General French A1–C1",
    headline: "French A1 to C1",
    sub: "Structured French instruction for adults, from complete beginner to advanced level.",
    fr: "« Du niveau A1 au niveau C1, à votre rythme. »",
    level: "A1 to C1",
    format: "Online · Private now, semi-private as groups form",
    intro: [
      "A clear path through the six levels of the Common European Framework, from your first words to confident, nuanced French. Each level builds listening, speaking, reading and writing together, with grammar and vocabulary taught in context rather than in isolation.",
      "Our method is simple: Learn, Practice, Communicate, Apply. You learn a structure, practise it with guidance, use it in real conversation, then apply it to your own life, studies or work.",
    ],
    includes: [
      {
        title: "Levels",
        items: [
          "A1 — Foundation",
          "A2 — Elementary",
          "B1 — Intermediate",
          "B2 — Upper Intermediate",
          "C1 — Advanced",
        ],
      },
      {
        title: "Formats",
        items: [
          "Private sessions",
          "Semi-private sessions (as groups form)",
          "Intensive French programs",
          "Online French classes, 20, 40 or 60 hours",
        ],
      },
      {
        title: "What you develop",
        items: [
          "Speaking, listening, reading and writing",
          "Grammar, vocabulary and pronunciation",
          "Conversation and cultural awareness",
          "Real-world communication",
        ],
      },
    ],
    notes: [
      "Programmes run online in 20, 40 or 60 hour blocks. The right block and level are decided with you at your consultation, after your French level assessment.",
    ],
    cta: "consultation",
    cardTitle: "Learn French from A1 to C1, online.",
    cardFor: "For adults starting from zero or picking French back up, who want a structured path and a level they can measure.",
    ctaLabel: "Explore French A1 to C1",
    related: ["tcf-tef-preparation", "professional-french"],
  },
  {
    slug: "career-pathway-guidance",
    name: "Career Development & Education Pathway Guidance",
    short: "Career & Education Pathways",
    headline: "Turn Language Skills into Career Opportunities.",
    sub: "Career preparation and education planning, delivered in French, for people building a future in a Francophone environment.",
    fr: "« Faites de vos compétences en français une carrière. »",
    level: "B1 and above",
    format: "Online · Offered in French only",
    intro: [
      "Learning French opens doors. This service helps you walk through them: a resume and cover letter that read naturally in French, interview practice in the language you will be interviewed in, and a clear plan for French-language study in Canada.",
      "Everything here is delivered in French. It is both the service and the practice.",
    ],
    includes: [
      {
        title: "Career development",
        items: [
          "Resume preparation",
          "Cover letter preparation",
          "Interview preparation",
          "French-language interview preparation",
          "Workplace communication",
          "Professional presentation preparation",
        ],
      },
      {
        title: "Education pathway guidance",
        items: [
          "French-language educational opportunities",
          "Program selection",
          "Admission planning",
          "Language requirement guidance",
        ],
      },
    ],
    notes: ["These services are offered only in French."],
    cta: "consultation",
    cardTitle: "Plan your career and studies, in French.",
    cardFor: "For newcomers and students who want a French resume, interview practice and a plan for French-language study in Canada.",
    ctaLabel: "Explore career guidance",
    related: ["professional-french", "immigration-pathways"],
  },
  {
    slug: "immigration-pathways",
    name: "French Immigration Pathway Information & Guidance",
    short: "Immigration Pathways",
    headline: "Understand the French-language pathways.",
    sub: "Clear, publicly available information on French-language immigration pathways, their language requirements, and how to prepare for them.",
    fr: "« Comprendre les voies d’immigration francophones. »",
    level: "All levels",
    format: "Online or in Ottawa · Consultation",
    intro: [
      "Canada has immigration pathways that reward French, and each one sets its own language requirement. FrancoBridge helps you understand what is publicly available: which pathways exist, what level of French each expects, and how to build a preparation plan that gets you there.",
      "We are a language and preparation centre, not an immigration consultancy. Where regulated immigration advice or representation is required, we refer you to an appropriately authorized immigration professional.",
    ],
    includes: [
      {
        title: "What we cover",
        items: [
          "French-language immigration pathways, as publicly described",
          "Language requirements and the tests that meet them",
          "Preparation strategies and timelines",
          "Referral to an authorized immigration professional where regulated advice is required",
        ],
      },
    ],
    notes: [
      "FrancoBridge provides information and language preparation only. Regulated immigration advice or representation is referred to an appropriately authorized immigration professional.",
    ],
    cta: "consultation",
    cardTitle: "Understand the French-language immigration pathways.",
    cardFor: "For aspiring immigrants who want to know which French-language pathways exist, what level each asks for, and how to prepare.",
    ctaLabel: "Explore immigration guidance",
    related: ["tcf-tef-preparation", "career-pathway-guidance"],
  },
  {
    slug: "translation",
    name: "Translation & Language Support",
    short: "Translation",
    headline: "Translation, editing and revision.",
    sub: "English to French and French to English, for documents that have to be right.",
    fr: "« Traduction et révision, dans les deux sens. »",
    level: "Any",
    format: "Remote · Quoted per document",
    intro: [
      "Applications, letters, resumes, certificates, reports: some documents have to read perfectly in the other language. We translate between English and French, and edit or proofread French text you have already written.",
      "Send the document and tell us the deadline. You get a quote and a turnaround before any work starts.",
    ],
    includes: [
      {
        title: "Translation",
        items: [
          "English → French translation",
          "French → English translation",
          "Document translation",
          "Professional documents",
        ],
      },
      {
        title: "Language support",
        items: ["Editing and proofreading", "Revision services"],
      },
    ],
    cta: "consultation",
    cardTitle: "Translation and proofreading, English and French.",
    cardFor: "For anyone with an application, letter, certificate or report that has to read perfectly in the other language.",
    ctaLabel: "Request a translation quote",
    related: ["career-pathway-guidance", "professional-french"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
