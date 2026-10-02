import Link from "next/link";
import { ServicesRail } from "@/app/_components/services-rail";
import { BookButton } from "@/app/_components/book-button";
import { LevelBridge } from "@/app/_components/level-bridge";
import { FrenchLine } from "@/app/_components/french-line";
import { CONSULTATION, PACKAGES, SITE_TAGLINE, SITE_TAGLINE_FR } from "@/lib/constants";

const STEPS = [
  ["Step 01", "Book a consultation", `One hour online with your instructor, $${CONSULTATION.price} ${CONSULTATION.currency}, paid when you book. We assess your French level and talk through what you need it for.`],
  ["Step 02", "Get your plan", `You leave with your level on the A1 to C1 scale and a recommended programme: ${PACKAGES.join(", ")} hours, private or semi-private, all online.`],
  ["Step 03", "Start your programme", "Pay for your programme, then begin. Sessions are online, scheduled around you, and progress is measured against the level you started at."],
] as const;

// The closing banner, under the steps. Narrow no-break spaces inside the
// guillemets (U+202F). For the client to confirm, like every French line.
const CLOSING = {
  fr: "« Tout commence par une conversation. »",
  en: "It all starts with a conversation.",
  link: "Start the conversation",
  href: "/contact",
} as const;

// Each seam on this page has its own divider, drawn from a brand signature:
// the level bridge under the hero and the French line before the footer. The
// footer gap that main normally carries is dropped: the steps and the closing
// line share one gradient that runs down to the footer.
export default function Home() {
  return (
    <main className="pb-0">
      {/* Hero: the tagline, one line, the French line and two buttons, on a
          fade from the pale blue at the top of the page down to the white. */}
      <section className="flex flex-col bg-gradient-to-b from-blue-light to-white pt-[104px] md:pt-[124px]">
        <div className="container-fb flex flex-col items-start justify-end gap-8 pb-10 pt-14 md:pb-12 md:pt-16">
          <h1 className="h1 max-w-[760px]">{SITE_TAGLINE}</h1>
          <div className="max-w-[420px]">
            <p className="regular-l">
              FrancoBridge Consulting Inc. is a French language education, professional development and pathway
              guidance centre, serving clients in Ottawa and online.
            </p>
            <p className="fr-line mt-3 text-[20px]" lang="fr">
              {SITE_TAGLINE_FR}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <BookButton />
            <Link href="/about" className="button-secondary">
              About FrancoBridge
            </Link>
          </div>
        </div>
      </section>

      {/* The level bridge: five arches on the base line, the sun past C1. */}
      <LevelBridge className="pb-10 md:pb-14" />

      {/* Services: a rail of six cards, TCF & TEF first, on the white. */}
      <section className="py-10 md:py-14">
        <div className="container-fb">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h1 max-w-[880px]">Six programmes, one first step</h2>
            <Link href="/services" className="button-secondary button-small">
              All services
            </Link>
          </div>
          <ServicesRail />
        </div>
      </section>

      {/* How it works and the closing line: one section, one gradient, from
          the warm white at the heading down to the yellow under the pattern. */}
      <section className="bg-gradient-to-b from-white to-yellow-light pt-10 md:pt-14">
        <div className="container-fb">
          <h2 className="h1 mb-14 max-w-[880px]">Want to get started?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map(([label, title, text]) => (
              <div key={label} className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between border-b border-black pb-3">
                  <span className="regular-m">{label}</span>
                </div>
                <h4 className="h4">{title}</h4>
                <p className="regular-m max-w-[420px]">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <FrenchLine line={CLOSING.fr} english={CLOSING.en} link={CLOSING.link} href={CLOSING.href} />
      </section>
    </main>
  );
}
