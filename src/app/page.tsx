import Link from "next/link";
import { BookButton } from "@/app/_components/book-button";
import { ServicesRail } from "@/app/_components/services-rail";
import { FrenchLine } from "@/app/_components/french-line";
import { Watermark } from "@/app/_components/watermark";
import { Drift } from "@/app/_components/drift";
import { CONSULTATION, PACKAGES, SITE_TAGLINE, SITE_TAGLINE_FR } from "@/lib/constants";

// The three steps, each with its plain numbers: the facts a reader wants
// before they ask, set beside the step rather than buried in its sentence.
const STEPS = [
  {
    number: "01",
    title: "Book a consultation",
    text: "One hour online with your instructor, paid when you book. We assess your French level and talk through what you need it for.",
    facts: [`${CONSULTATION.minutes / 60} hour · $${CONSULTATION.price} ${CONSULTATION.currency}`, "Online"],
  },
  {
    number: "02",
    title: "Get your plan",
    text: "You leave with your level on the A1 to C1 scale and a recommended programme, private or semi-private, all online.",
    facts: ["A1 to C1", `${PACKAGES.slice(0, -1).join(", ")} or ${PACKAGES[PACKAGES.length - 1]} hours`],
  },
  {
    number: "03",
    title: "Start your programme",
    text: "Pay for your programme, then begin. Sessions are online, scheduled around you, and progress is measured against the level you started at.",
    facts: ["Online", "Scheduled around you"],
  },
] as const;

// The closing banner, under the steps. Narrow no-break spaces inside the
// guillemets (U+202F). For the client to confirm, like every French line.
const CLOSING = {
  fr: "« Tout commence par une conversation. »",
  en: "It all starts with a conversation.",
  link: "Start the conversation",
  href: "/contact",
} as const;

// The whole page sits on one fade, from the pale blue at the top through the
// red tint behind the programmes to the yellow under the closing banner, and
// then the footer. The footer gap that main normally carries is dropped so
// the yellow meets the navy.
export default function Home() {
  return (
    <main className="bg-gradient-to-b from-blue-light via-red-light to-yellow-light pb-0">
      {/* The opening: hero, statement and programmes share one clipped
          canvas, so the watermarks drawn from the logo can bleed off its
          edges and run from one section into the next. Each section's
          content sits above them. */}
      <div className="relative isolate overflow-hidden">
      {/* Hero: the tagline, the statement with its French line, and one
          button, with the bridge from the logo standing on the hero's bottom
          edge behind it all, bleeding off the right and drifting left as the
          page scrolls. */}
      <section className="relative flex flex-col border-b border-black/10 pt-[104px] md:pt-[124px]">
        {/* The bridge drifts left as the page scrolls, at a third of the pace. */}
        <Drift className="pointer-events-none absolute -right-[240px] bottom-0 z-0 w-[1100px] md:-right-[420px] md:w-[2000px]">
          <Watermark kind="bridge" className="relative w-full" />
        </Drift>
        <div className="container-fb relative z-10 flex flex-col items-start justify-end gap-8 pb-10 pt-14 md:pb-12 md:pt-16">
          <h1 className="h1 w-[60%]">{SITE_TAGLINE}</h1>
          <div className="flex max-w-[560px] flex-col gap-3">
            <p className="regular-l">
              We are a French language education centre, building the fluency you need for study, work and
              immigration in Canada.
            </p>
            <p className="fr-line text-[20px]" lang="fr">
              {SITE_TAGLINE_FR}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="button-secondary">
              About FrancoBridge
            </Link>
          </div>
        </div>
      </section>

      {/* Services: a rail of six cards, TCF & TEF first, on the white. */}
      <section className="relative py-10 md:py-14">
        <div className="container-fb relative z-10">
          <div className="mb-14 flex flex-nowrap items-end justify-between gap-6">
            <h2 className="h1">
              Our
              <br />
              Programs
            </h2>
            {/* All services, as the ringed arrow alone: the arch closed. */}
            <Link
              href="/services"
              aria-label="All services"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </div>
          <ServicesRail />
        </div>
      </section>
      </div>

      {/* How it works and the closing line, on the yellow end of the fade. */}
      <section className="pt-10 md:pt-14">
        <div className="container-fb">
          {/* The heading with the booking button beside it, one row at every
              width, like the programmes heading above. */}
          <div className="mb-10 flex flex-nowrap items-end justify-between gap-6 md:mb-12">
            <h2 className="h1 min-w-0">
              Want to get
              <br />
              started?
            </h2>
            <BookButton size="sm" look="secondary" className="min-w-0 text-center md:shrink-0 md:whitespace-nowrap" />
          </div>
          {/* The ledger: three rows between rules. On phones the number and
              the facts share the first line, then the title and the text;
              on tablets the number stands beside the title and text with
              the facts at the right; on wide screens all four take a column. */}
          <div className="border-t border-black">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 border-b border-black py-6 md:grid-cols-[88px_minmax(0,1fr)_200px] md:gap-x-8 md:gap-y-3 md:py-7 lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,1.6fr)_200px] lg:py-8"
              >
                <span className="font-heading text-[32px] leading-none text-navy md:row-span-2 md:text-[40px] lg:row-span-1 lg:text-[48px]">
                  {step.number}
                </span>
                <p className="regular-s text-right text-grey-80 md:col-start-3 md:row-span-2 md:row-start-1 lg:col-start-4 lg:row-span-1">
                  <span className="lg:block">{step.facts[0]}</span>
                  <span className="lg:hidden"> · </span>
                  <span className="lg:block">{step.facts[1]}</span>
                </p>
                <h3 className="col-span-2 font-heading text-[24px] leading-[1.1] text-navy md:col-span-1 md:col-start-2 md:row-start-1 md:text-[28px] lg:col-start-2">
                  {step.title}
                </h3>
                <p className="col-span-2 text-[16px] leading-[1.5] md:col-span-1 md:col-start-2 md:row-start-2 md:text-[17px] lg:col-start-3 lg:row-start-1">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <FrenchLine line={CLOSING.fr} english={CLOSING.en} link={CLOSING.link} href={CLOSING.href} />
      </section>
    </main>
  );
}
