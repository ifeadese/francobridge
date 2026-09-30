import Link from "next/link";
import { ServicesRail } from "@/app/_components/services-rail";
import { BookButton } from "@/app/_components/book-button";
import { Tertiary } from "@/app/_components/tertiary";
import { CAL, CONSULTATION, IMAGES, PACKAGES, SITE_TAGLINE, SITE_TAGLINE_FR } from "@/lib/constants";

const STEPS = [
  ["Step 01", "Book a consultation", `One hour online with your instructor, $${CONSULTATION.price} ${CONSULTATION.currency}, paid when you book. We assess your French level and talk through what you need it for.`],
  ["Step 02", "Get your plan", `You leave with your level on the A1 to C1 scale and a recommended programme: ${PACKAGES.join(", ")} hours, private or semi-private, all online.`],
  ["Step 03", "Start your programme", "Pay for your programme, then begin. Sessions are online, scheduled around you, and progress is measured against the level you started at."],
] as const;

export default function Home() {
  return (
    <main>
      {/* Hero: text at the bottom left, the photo filling the right half,
          the next-step card sitting on the photo. */}
      <section className="flex flex-col pt-[88px] md:min-h-screen md:flex-row">
        <div className="container-fb flex flex-1 flex-col items-start justify-end gap-10 py-[88px] md:min-w-[560px] md:pr-16 md:!pl-[var(--gutter)]">
          <h1 className="h1 max-w-[640px]">{SITE_TAGLINE}</h1>
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
        <div
          className="flex min-h-[600px] w-full items-end bg-grey-3 bg-cover bg-[50%_55%] md:w-1/2"
          style={{ backgroundImage: `url(${IMAGES.heroHome})` }}
        >
          <div className="w-full max-w-[420px]">
            <a
              href={`https://cal.com/${CAL.consultation}`}
              target="_blank"
              rel="noreferrer"
              data-cal-namespace="consultation"
              data-cal-link={CAL.consultation}
              data-cal-config='{"layout":"month_view"}'
              className="group flex flex-col items-start gap-8 bg-yellow p-8"
            >
              <div className="flex flex-col gap-2">
                <p className="regular-m">{CONSULTATION.label}</p>
                <h3 className="h3">Book a consultation and find your French level</h3>
              </div>
              <Tertiary as="span">Book now</Tertiary>
            </a>
          </div>
        </div>
      </section>

      {/* Services: a rail of six cards, TCF & TEF first. */}
      <section className="section">
        <div className="container-fb">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h1 max-w-[720px]">Six programmes, one first step</h2>
            <Link href="/services" className="button-secondary button-small">
              All services
            </Link>
          </div>
          <ServicesRail />
        </div>
      </section>

      {/* How it works: on the light grey. */}
      <section className="mt-16 bg-grey-3 py-20 md:mt-20 md:py-28">
        <div className="container-fb">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h1 max-w-[720px]">Want to get started?</h2>
            <BookButton size="sm" look="secondary" />
          </div>
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
      </section>

    </main>
  );
}
