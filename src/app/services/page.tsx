import type { Metadata } from "next";
import Link from "next/link";
import { Banner } from "@/app/_components/banner";
import { BookButton } from "@/app/_components/book-button";
import { Hero } from "@/app/_components/hero";
import { ServicesRail } from "@/app/_components/services-rail";
import { CONSULTATION, IMAGES, PACKAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "TCF and TEF Canada preparation, professional French, General French A1 to C1, career and education pathway guidance, French immigration pathway information, and translation.",
};

const NUMBERS = [
  ["1 h", "The consultation", `One hour online with your instructor, $${CONSULTATION.price} ${CONSULTATION.currency}, paid when you book. It includes your French level assessment and ends with a recommended programme.`],
  [`${PACKAGES.join(" · ")}`, "Hours per programme", "Online, in blocks. The block and the level are agreed at your consultation and paid for afterwards, before your first session."],
  ["A1 → C1", "The scale", "Every programme names the level it is for. Lessons are private now, semi-private as groups form."],
] as const;

export default function Services() {
  return (
    <main>
      <Hero
        title="Six programmes, one first step"
        text="Every programme starts with the same conversation: a one-hour consultation that finds your level and ends with a plan."
        image={IMAGES.heroServices}
      />

      <section className="section">
        <div className="container-fb">
          <h2 className="h2 mb-14 max-w-[432px]">Programmes and services</h2>
          <ServicesRail />
        </div>
      </section>

      <section className="section">
        <div className="container-fb">
          <h2 className="h2 mb-14 max-w-[432px]">Plain numbers</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {NUMBERS.map(([n, title, text]) => (
              <div key={title} className="flex flex-col gap-6 border-t border-black pt-6">
                <p className="regular-m">{title}</p>
                <p className="large-number">{n}</p>
                <p className="regular-m max-w-[420px]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-fb grid gap-12 md:grid-cols-[6.4fr_5fr] md:gap-20">
          <div className="flex flex-col gap-6 bg-grey-3 p-8 md:p-12">
            <h3 className="h3">Not included</h3>
            <p className="regular-l max-w-[544px]">
              Official TCF or TEF examination fees, which you pay directly to the test centre. Regulated immigration
              advice or representation, which we refer to an appropriately authorized immigration professional.
              Career and education pathway services are offered in French only.
            </p>
            <Link href="/contact" className="button-secondary button-small self-start">
              Ask a question
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="h3">Lessons</h3>
            <p className="regular-l max-w-[480px]">
              Private lessons now; semi-private as groups form. One booking link shows the options available.
            </p>
            <BookButton event="lesson" className="self-start" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-fb">
          <Banner tone="blue" way="blue" heading="Start with a one-hour consultation. Leave with your level and a plan.">
            <BookButton />
          </Banner>
        </div>
      </section>
    </main>
  );
}
