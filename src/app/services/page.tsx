import type { Metadata } from "next";
import Container from "@/app/_components/container";
import { BookButton } from "@/app/_components/book-button";
import { CtaBand } from "@/app/_components/cta-band";
import { PageHero } from "@/app/_components/page-hero";
import { ServiceCard } from "@/app/_components/service-card";
import { CONSULTATION, PACKAGES } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "TCF and TEF Canada preparation, professional French, General French A1 to C1, career and education pathway guidance, French immigration pathway information, and translation.",
};

export default function Services() {
  const [featured, ...rest] = SERVICES;
  return (
    <main>
      <PageHero
        eyebrow="Programs and services"
        title="Six ways across."
        sub="Every programme starts with the same first step: a one-hour consultation that finds your level and ends with a plan. Lessons are online, private for now, semi-private as groups form."
        fr={"« Six programmes. Un seul premier pas. »"}
      >
        <BookButton size="lg" />
        <BookButton event="lesson" size="lg" />
      </PageHero>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard service={featured} featured />
            {rest.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ivory-deep py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">Booking and fees</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
                Plain numbers.
              </h2>
            </div>
            <dl className="grid gap-6 md:col-span-7">
              <div className="rounded-2xl border border-line bg-white p-6">
                <dt className="font-heading text-2xl font-semibold text-blue">Consultation</dt>
                <dd className="mt-2 text-ink/80">
                  {CONSULTATION.minutes} minutes, online, ${CONSULTATION.price} {CONSULTATION.currency}. Paid when
                  you book. Includes your French level assessment and ends with a recommended programme.
                </dd>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <dt className="font-heading text-2xl font-semibold text-blue">Programmes</dt>
                <dd className="mt-2 text-ink/80">
                  Online, in blocks of {PACKAGES.join(", ")} hours. The block and the level are agreed at your
                  consultation and paid for afterwards, before your first session.
                </dd>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <dt className="font-heading text-2xl font-semibold text-blue">Lessons</dt>
                <dd className="mt-2 text-ink/80">
                  Private lessons now; semi-private as groups form. One booking link shows the options available.
                </dd>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <dt className="font-heading text-2xl font-semibold text-blue">Not included</dt>
                <dd className="mt-2 text-ink/80">
                  Official TCF or TEF examination fees, which you pay directly to the test centre. Regulated
                  immigration advice, which we refer to an authorized professional.
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
