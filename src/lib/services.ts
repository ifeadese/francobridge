// The services, in the order they appear on the site. The names follow the
// client's pamphlet ("Our Services"); TCF & TEF stays first because the
// brief asked for it to be the most visible. What a service page's About
// band shows (lessons, method, includes) states only what the brief, the
// pamphlet and the client's answers say; nothing there is inferred. The
// pamphlet's Academic Support and Interview Preparation split the brief's
// education and career pathway service in two, each keeping its own half of
// that service's list.
export type Service = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  sub: string;
  fr: string;
  intro: string[];
  /** Taught as lessons: private, online, in 20, 40 or 60 hour blocks, as the
      client confirmed. Left off the services that are not classes. */
  lessons?: boolean;
  /** The brief's methodology line, where it gives one. */
  method?: string;
  /** The brief's own lists, word for word, under the brief's own headings. */
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
    name: "TCF/TEF and DELF/DALF Exam Preparation",
    short: "TCF/TEF & DELF/DALF",
    headline: "Prepare with purpose. Practice with guidance.",
    sub: "The TCF and TEF Canada are the French tests recognised for Canadian immigration and citizenship; the DELF and DALF are the diplomas universities and employers ask for. We start from your target score and test date, then train the four skills the exam measures, with mock exams along the way so the real one holds no surprises.",
    fr: "Préparez-vous avec méthode. Passez l’examen avec confiance.",
    intro: [
      "The TCF Canada and TEF Canada are the French proficiency tests recognised for Canadian immigration and citizenship; the DELF and DALF are the French diplomas that universities and employers ask for. Preparation is not the same as learning French: it is learning the format, the timing and what the examiners reward, then practising until it is familiar.",
      "We start with your target score and your test date, then work backwards. Every session is built around the four skills the exam measures, with mock examinations along the way so the real one holds no surprises.",
    ],
    lessons: true,
    includes: [
      {
        title: "What’s included",
        items: [
          "TEF Canada orientation",
          "TEF preparation courses",
          "DELF and DALF preparation",
          "Listening preparation",
          "Reading preparation",
          "Written expression",
          "Oral expression",
          "Mock examinations",
          "Speaking evaluation",
          "Writing correction",
          "Private coaching",
          "Intensive preparation",
        ],
      },
    ],
    notes: [
      "FrancoBridge preparation fees do not include official examination fees. You register and pay for the examination directly with the test centre.",
    ],
    cta: "consultation",
    cardTitle: "Pass your TCF, TEF, DELF or DALF with confidence.",
    cardFor: "For anyone who needs an official French score or diploma, for immigration, citizenship, study or work, and wants to walk into the exam knowing exactly what to expect.",
    ctaLabel: "Explore exam preparation",
    related: ["general-french", "immigration-pathways"],
  },
  {
    slug: "general-french",
    name: "Language Coaching",
    short: "Language Coaching · A1–C1",
    headline: "French A1 to C1",
    sub: "A clear path from your first words to confident, nuanced French. Each level builds listening, speaking, reading and writing together, and everything you learn is practised in real conversation.",
    fr: "Du niveau A1 au niveau C1, à votre rythme.",
    intro: [
      "A clear path through the levels of the Common European Framework, from your first words to confident, nuanced French. Each level builds listening, speaking, reading and writing together, with grammar and vocabulary taught in context rather than in isolation.",
      "Our method is simple: Learn, Practice, Communicate, Apply. You learn a structure, practise it with guidance, use it in real conversation, then apply it to your own life, studies or work.",
    ],
    lessons: true,
    method: "Learn → Practice → Communicate → Apply",
    includes: [
      {
        title: "French Fluency Levels",
        items: [
          "A1 — Foundation",
          "A2 — Elementary",
          "B1 — Intermediate",
          "B2 — Upper Intermediate",
          "C1 — Advanced",
        ],
      },
      {
        title: "Skills developed",
        items: [
          "Speaking",
          "Listening",
          "Reading",
          "Writing",
          "Grammar",
          "Vocabulary",
          "Pronunciation",
          "Conversation",
          "Cultural awareness",
          "Real-world communication",
        ],
      },
    ],
    cta: "consultation",
    cardTitle: "Learn French from A1 to C1, online.",
    cardFor: "For adults starting from zero or picking French back up, who want a structured path and a level they can measure.",
    ctaLabel: "Explore language coaching",
    related: ["tcf-tef-preparation", "professional-french"],
  },
  {
    slug: "sle-preparation",
    name: "Government of Canada Second Language Evaluation Preparation",
    short: "Second Language Evaluation (SLE)",
    headline: "Reach the level your position asks for.",
    sub: "The Second Language Evaluation is the Government of Canada’s test of French for bilingual positions, in three parts: reading, writing and oral proficiency, each rated A, B or C. We prepare you for the part you need, at the level your position asks for.",
    fr: "Le niveau exigé par votre poste, à votre portée.",
    intro: [
      "The Second Language Evaluation is the Government of Canada’s test of second-language proficiency for bilingual positions in the federal public service. It has three parts, reading comprehension, written expression and oral proficiency, each rated A, B or C, and a position states the level it requires in each.",
      "We prepare you for the part you need, at the level your position asks for: the format of each test, the kind of French it rewards, and practice until it is familiar. The evaluation itself is administered by the Public Service Commission of Canada through your department or hiring process; FrancoBridge prepares you for it.",
    ],
    lessons: true,
    includes: [
      {
        title: "What’s included",
        items: [
          "Government/public-service French preparation",
          "Second Language Evaluation preparation",
          "Reading comprehension preparation",
          "Written expression preparation",
          "Oral proficiency preparation",
        ],
      },
    ],
    cta: "consultation",
    cardTitle: "Prepare for the Second Language Evaluation.",
    cardFor: "For public servants and candidates for bilingual positions who need a B or C in reading, writing or oral proficiency.",
    ctaLabel: "Explore SLE preparation",
    related: ["professional-french", "bilingual-interview-preparation"],
  },
  {
    slug: "professional-french",
    name: "Professional French",
    short: "Professional French",
    headline: "French for the Workplace",
    sub: "For people who already have some French and need it for meetings, emails, presentations and interviews. Sessions are built around your job, your real documents and the vocabulary of your field, so what you practise one day you can use the next.",
    fr: "Le français au travail, avec assurance.",
    intro: [
      "Workplace French is its own register: meetings, emails, presentations, interviews and the small talk in between. This program is for people who already have some French and need to use it at work, in business or in the public service.",
      "Sessions are built around your job. We work with your real documents, your real meetings and the vocabulary of your field, so what you practise on Tuesday you can use on Wednesday.",
    ],
    lessons: true,
    includes: [
      {
        title: "What’s included",
        items: [
          "French for professionals",
          "Workplace French",
          "Business French",
          "French communication coaching",
          "French presentation skills",
          "Professional vocabulary",
          "French interview preparation",
          "Workplace conversation",
        ],
      },
    ],
    cta: "consultation",
    cardTitle: "Speak French with confidence at work.",
    cardFor: "For professionals with some French already, who need to use it in meetings, emails, interviews and the public service.",
    ctaLabel: "Explore professional French",
    related: ["sle-preparation", "bilingual-interview-preparation"],
  },
  {
    slug: "bilingual-interview-preparation",
    name: "Interview Preparation for Bilingual Roles",
    short: "Bilingual Interview Preparation",
    headline: "Walk into the bilingual interview ready.",
    sub: "A resume and cover letter that read naturally in French, and practice for the interview in the language it will be held in, with the questions, the vocabulary and the presentation your field expects. Everything is delivered in French, so the service is also the practice.",
    fr: "Prêt pour l’entrevue, dans les deux langues.",
    intro: [
      "A bilingual role is won in the interview. This service gets you there: a resume and cover letter that read naturally in French, interview practice in the language you will be interviewed in, and the presentation and workplace communication your field expects.",
      "Everything here is delivered in French. It is both the service and the practice.",
    ],
    includes: [
      {
        title: "What’s included",
        items: [
          "Resume preparation",
          "Cover letter preparation",
          "Interview preparation",
          "French-language interview preparation",
          "Workplace communication",
          "Professional presentation preparation",
        ],
      },
    ],
    notes: ["These services are offered only in French."],
    cta: "consultation",
    cardTitle: "Prepare for the bilingual interview.",
    cardFor: "For candidates for bilingual roles who need a French resume, interview practice and the confidence to present in French.",
    ctaLabel: "Explore interview preparation",
    related: ["professional-french", "sle-preparation"],
  },
  {
    slug: "academic-support",
    name: "Academic Support",
    short: "Academic Support",
    headline: "Study in French, with a plan.",
    sub: "A clear plan for French-language study in Canada: which programs exist, what each asks for, and how to meet the language requirement. Everything is delivered in French, so the service is also the practice.",
    fr: "Étudier en français, avec un plan.",
    intro: [
      "French-language colleges and universities in Canada open doors that English-only study does not. This service helps you plan the way in: the programs that exist, the one that fits, what admission asks for, and the language level you will need to meet.",
      "Everything here is delivered in French. It is both the service and the practice.",
    ],
    includes: [
      {
        title: "What’s included",
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
    cardTitle: "Plan your French-language studies in Canada.",
    cardFor: "For students who want to study in French in Canada and need a program, an admission plan and the language level to match.",
    ctaLabel: "Explore academic support",
    related: ["tcf-tef-preparation", "general-french"],
  },
  {
    slug: "immigration-pathways",
    name: "French Immigration Pathway Support",
    short: "Immigration Pathway Support",
    headline: "Understand the French-language pathways.",
    sub: "Canada has immigration pathways that reward French, and each sets its own language requirement. We show you which pathways exist, what level each expects, and how to build a preparation plan that gets you there.",
    fr: "Comprendre les voies d’immigration francophones.",
    intro: [
      "Canada has immigration pathways that reward French, and each one sets its own language requirement. FrancoBridge helps you understand what is publicly available: which pathways exist, what level of French each expects, and how to build a preparation plan that gets you there.",
      "We are a language and preparation firm, not an immigration consultancy. Where regulated immigration advice or representation is required, we refer you to an appropriately authorized immigration professional.",
    ],
    includes: [
      {
        title: "What’s included",
        items: [
          "Publicly available information about French-language immigration pathways",
          "Language requirements",
          "Preparation strategies",
          "Referral to an appropriately authorized immigration professional where regulated immigration advice or representation is required",
        ],
      },
    ],
    notes: [
      "FrancoBridge provides information and language preparation only. Regulated immigration advice or representation is referred to an appropriately authorized immigration professional.",
    ],
    cta: "consultation",
    cardTitle: "Understand the French-language immigration pathways.",
    cardFor: "For aspiring immigrants who want to know which French-language pathways exist, what level each asks for, and how to prepare.",
    ctaLabel: "Explore immigration support",
    related: ["tcf-tef-preparation", "general-french"],
  },
  {
    slug: "translation",
    name: "Translation Services",
    short: "Translation",
    headline: "Translation, editing and revision.",
    sub: "Applications, letters, resumes, certificates and reports that have to read perfectly in the other language. Send the document and your deadline, and you get a quote and a turnaround before any work starts.",
    fr: "Traduction et révision, dans les deux sens.",
    intro: [
      "Applications, letters, resumes, certificates, reports: some documents have to read perfectly in the other language. We translate between English and French, and edit or proofread French text you have already written.",
      "Send the document and tell us the deadline. You get a quote and a turnaround before any work starts.",
    ],
    includes: [
      {
        title: "What’s included",
        items: [
          "English → French translation",
          "French → English translation",
          "Document translation",
          "Professional documents",
          "Editing and proofreading",
          "Revision services",
        ],
      },
    ],
    cta: "consultation",
    cardTitle: "Translate and proofread English and French",
    cardFor: "For anyone with an application, letter, certificate or report that has to read perfectly in the other language.",
    ctaLabel: "Request a translation quote",
    related: ["bilingual-interview-preparation", "professional-french"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/** The services either side of this one, in the site's order. */
export function getAdjacentServices(slug: string) {
  const i = SERVICES.findIndex((s) => s.slug === slug);
  if (i === -1) return {};
  return { previous: SERVICES[i - 1], next: SERVICES[i + 1] };
}
