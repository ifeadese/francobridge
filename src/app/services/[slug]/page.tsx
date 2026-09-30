import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/app/_components/container";
import { BookButton } from "@/app/_components/book-button";
import { CtaBand } from "@/app/_components/cta-band";
import { Levels } from "@/app/_components/levels";
import { PageHero } from "@/app/_components/page-hero";
import { ServiceCard } from "@/app/_components/service-card";
import { ServiceGlyph } from "@/app/_components/service-glyph";
import { CONSULTATION } from "@/lib/constants";
import { getService, SERVICES } from "@/lib/services";

type Params = { params: Promise<{ slug: string }> };

export default async function ServicePage(props: Params) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return notFound();
  const related = service.related.map(getService).filter((s) => s !== undefined);

  return (
    <main>
      <PageHero eyebrow={service.name} title={service.headline} sub={service.sub} fr={service.fr}>
        <BookButton size="lg" />
        <BookButton event="lesson" size="lg" />
      </PageHero>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="prose-fb max-w-prose text-lg text-ink/85">
                {service.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {service.notes && (
                <div className="mt-8 max-w-prose border-l-4 border-red bg-white p-5">
                  {service.notes.map((n) => (
                    <p key={n} className="font-semibold text-ink">
                      {n}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <aside className="md:col-span-5">
              <div className="arch flex h-48 items-end justify-center bg-blue pb-8 text-ivory">
                <ServiceGlyph slug={service.slug} className="h-20 w-20" />
              </div>
              <dl className="divide-y divide-line border-b border-line">
                <div className="grid grid-cols-3 gap-4 py-4">
                  <dt className="eyebrow">Level</dt>
                  <dd className="col-span-2 font-semibold text-ink">{service.level}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4">
                  <dt className="eyebrow">Format</dt>
                  <dd className="col-span-2 font-semibold text-ink">{service.format}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4">
                  <dt className="eyebrow">First step</dt>
                  <dd className="col-span-2 font-semibold text-ink">
                    Consultation, {CONSULTATION.label}. Includes your level assessment.
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-ivory-deep py-16 md:py-24">
        <Container>
          <p className="eyebrow">What’s included</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
            Everything under this arch.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {service.includes.map((group) => (
              <div key={group.title} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-heading text-2xl font-semibold text-blue">{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-ink/85">
                      <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-red" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {service.slug === "general-french" && (
        <section className="py-16 md:py-24">
          <Container>
            <p className="eyebrow">The scale</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
              Five levels, one method.
            </h2>
            <div className="mt-10">
              <Levels />
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-heading text-3xl font-semibold tracking-tighter text-blue">Often paired with</h2>
              <Link href="/services" className="font-semibold text-blue hover:underline">
                All services →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand />
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.sub,
  };
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}
