import Link from "next/link";
import { BookButton } from "@/app/_components/book-button";
import { ServicesRail } from "@/app/_components/services-rail";
import { FrenchLine } from "@/app/_components/french-line";
import { Watermark } from "@/app/_components/watermark";
import { Drift } from "@/app/_components/drift";
import { RING, RingArrow } from "@/app/_components/ring";
import { CONSULTATION, PACKAGES, SITE_TAGLINE, SITE_TAGLINE_FR } from "@/lib/constants";

// The three steps, numbered in their titles, each with its plain numbers:
// the facts a reader wants before they ask, in a line under the sentence.
// Book, enrol, start: the money changes hands at the first two, never at
// the third.
const STEPS = [
  {
    title: "Book a consultation",
    text: "One hour online, paid when you book. We assess your French and talk through your goals, and you leave with your level on the A1 to C1 scale and a recommended program.",
    facts: [`${CONSULTATION.minutes / 60} hour · $${CONSULTATION.price} ${CONSULTATION.currency}`, "Online", "A1 to C1"],
  },
  {
    title: "Enrol in your program",
    text: "Choose your block of hours, private or semi-private, and pay to enrol. Once the payment is in, your place is held and your schedule is set with your instructor.",
    facts: [`${PACKAGES.slice(0, -1).join(", ")} or ${PACKAGES[PACKAGES.length - 1]} hours`, "Private or semi-private", "Paid on enrolment"],
  },
  {
    title: "Start your program",
    text: "Your sessions begin, online and scheduled around you. Progress is measured against the level you started at, so you can see the ground you have covered.",
    facts: ["Online", "Scheduled around you"],
  },
] as const;

// The closing banner, under the steps, and the page's last button. The French
// is for the client to confirm, like every French line.
const CLOSING = {
  fr: "Tout commence par une conversation.",
  frLines: ["Tout", "commence", "par une", "conversation."],
  en: "It all starts with a conversation.",
  link: "Get started",
  href: "/contact",
} as const;

// The whole page sits on one fade, from the pale blue at the top through the
// red tint behind the programs to the yellow under the closing banner, and
// then the footer. The footer gap that main normally carries is dropped so
// the yellow meets the navy.
export default function Home() {
  return (
    <main className="bg-gradient-to-b from-blue-light via-red-light to-yellow-light pb-0">
      {/* The opening: hero, statement and programs share one clipped
          canvas, so the watermarks drawn from the logo can bleed off its
          edges and run from one section into the next. Each section's
          content sits above them. */}
      <div className="relative isolate overflow-hidden">
      {/* Hero: the tagline, the statement with its French line, and one
          button, with the bridge from the logo standing on the hero's bottom
          edge behind it all, bleeding off the right and drifting left as the
          page scrolls. */}
      <section className="relative flex flex-col border-b border-navy/10 pt-[104px] md:pt-[124px]">
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
            <p className="fr-line text-[16px]" lang="fr">
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
          {/* The heading with the All services ring on its row, the ring's
              foot on the title's baseline, and the line under both at the
              hero text's width. */}
          <div className="mb-6 flex flex-col gap-6">
            <div className="flex flex-nowrap items-end justify-between gap-6">
              <h2 className="h1">
                Our
                <br />
                Programs
              </h2>
              <Link href="/services" aria-label="All services" className={RING}>
                <RingArrow />
              </Link>
            </div>
            {/* One line on what the six cards cover, and the thread between them. */}
            <p className="regular-l max-w-[560px]">
              Exam preparation, French for work and everyday life, pathway guidance and translation, all online and all
              starting with one conversation.
            </p>
          </div>
          <ServicesRail />
        </div>
      </section>
      </div>

      {/* How it works and the closing line, on the yellow end of the fade. */}
      <section className="pt-10 md:pt-14">
        <div className="container-fb">
          {/* The heading with the booking ring beside it, the same large
              ringed arrow as the closing banner, one row at every width. The
              heading wraps as the width allows. */}
          <div className="mb-10 flex flex-nowrap items-end justify-between gap-6 md:mb-12">
            <h2 className="h1 min-w-0">Want to get started?</h2>
            <BookButton look="ring" />
          </div>
          {/* The ledger: three rows between rules, each numbered in its
              title. Stacked on phones; from tablet width the title takes the
              left column and the description, with its facts in one quiet
              line beneath, the right. */}
          <div className="border-t border-navy">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="grid grid-cols-1 gap-y-2 border-b border-navy py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-baseline md:gap-x-10 md:py-7 lg:py-8"
              >
                <h3 className="font-heading text-[24px] leading-[1.1] text-navy md:text-[28px]">
                  {i + 1}. {step.title}
                </h3>
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] leading-[1.5] md:text-[17px]">{step.text}</p>
                  <p className="regular-s text-navy/70">{step.facts.join(" · ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FrenchLine line={CLOSING.fr} lines={CLOSING.frLines} english={CLOSING.en} link={CLOSING.link} href={CLOSING.href} />
      </section>
    </main>
  );
}
