import Link from "next/link";
import Container from "@/app/_components/container";
import { BookButton } from "@/app/_components/book-button";
import { CtaBand } from "@/app/_components/cta-band";
import { Levels } from "@/app/_components/levels";
import { Logo } from "@/app/_components/logo";
import { ServiceCard } from "@/app/_components/service-card";
import { Steps } from "@/app/_components/steps";
import { CONSULTATION, LOCATION, SITE_TAGLINE, SITE_TAGLINE_FR } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

const AUDIENCES = [
  ["Aspiring immigrants", "French-language pathways reward French. We help you meet the level they ask for, with the test score to prove it."],
  ["Newcomers", "Settle in faster: French for daily life, for your first job here, and for the public service."],
  ["Students", "Meet the language requirement of a French-language college or university programme, and plan your admission."],
  ["Professionals", "Take French into the meeting room, the interview and the presentation, with the vocabulary of your field."],
] as const;

export default function Home() {
  const [featured, ...rest] = SERVICES;
  return (
    <main>
      {/* First screen */}
      <section className="border-b border-line">
        <Container>
          <div className="grid items-center gap-12 py-16 md:grid-cols-12 md:py-24">
            <div className="md:col-span-7">
              <p className="eyebrow">French language education · {LOCATION.city}</p>
              <h1 className="mt-4 font-heading text-5xl font-semibold leading-[1.02] tracking-tighter text-blue md:text-7xl">
                {SITE_TAGLINE}
              </h1>
              <p className="fr-line mt-3 text-xl md:text-2xl" lang="fr">
                {SITE_TAGLINE_FR}
              </p>
              <p className="mt-6 max-w-prose text-lg text-ink/85 md:text-xl">
                French language education, TCF and TEF Canada preparation, professional French and pathway
                guidance for immigrants, newcomers, students and professionals. In Ottawa and online.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <BookButton size="lg" />
                <Link href="/services" className="btn-secondary btn-lg">
                  Explore our programs
                </Link>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate">
                {CONSULTATION.label} · includes your French level assessment
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="arch flex aspect-[4/5] items-end justify-center bg-blue px-10 pb-12 md:aspect-[5/6]">
                <Logo variant="mark" on="blue" className="w-full max-w-xs" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
              Three steps, and the first one is a conversation.
            </h2>
          </div>
          <Steps />
        </Container>
      </section>

      {/* Services */}
      <section className="border-y border-line bg-ivory-deep py-16 md:py-24">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Programs and services</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
                Six ways across.
              </h2>
            </div>
            <Link href="/services" className="font-semibold text-blue hover:underline">
              All services →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard service={featured} featured />
            {rest.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* Who it's for */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">Who we help</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
                French as a tool for immigration, education, employment and career advancement.
              </h2>
              <p className="mt-5 max-w-prose text-lg text-ink/80">
                Our approach emphasises practical communication, measurable progress and personalised support.
                You develop listening, speaking, reading and writing, and learn to use French with confidence
                in everyday, academic and professional settings.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:col-span-7">
              {AUDIENCES.map(([who, text]) => (
                <div key={who} className="border-t-2 border-blue pt-4">
                  <h3 className="font-heading text-2xl font-semibold text-blue">{who}</h3>
                  <p className="mt-2 text-ink/80">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Levels */}
      <section className="border-t border-line py-16 md:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Your level</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
              From A1 to C1, one arch at a time.
            </h2>
            <p className="mt-4 text-lg text-ink/80">
              Every programme starts by finding where you are on the scale. Your consultation includes the
              assessment; the plan follows from it.
            </p>
          </div>
          <Levels />
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
