import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookButton } from "@/app/_components/book-button";
import { Hero } from "@/app/_components/hero";
import { ServiceCard } from "@/app/_components/service-card";
import { CONSULTATION, IMAGES } from "@/lib/constants";
import { getService, SERVICES } from "@/lib/services";

type Params = { params: Promise<{ slug: string }> };

export default async function ServicePage(props: Params) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return notFound();
  const related = service.related.map(getService).filter((s) => s !== undefined);

  return (
    <main>
      <Hero title={service.headline} text={service.sub} image={IMAGES.services[service.slug]}>
        <BookButton />
        <BookButton event="lesson" />
      </Hero>

      {/* The French line, as the motto band. */}
      <section className="section-tight">
        <div className="container-fb">
          <div className="flex flex-col gap-4 bg-grey-3 px-6 py-10 md:px-16 md:py-14">
            <p className="h3 max-w-[880px]" lang="fr">
              {service.fr}
            </p>
            <p className="regular-m text-grey-80">{service.name}</p>
          </div>
        </div>
      </section>

      {/* About the programme: heading left, text right. */}
      <section className="section">
        <div className="container-fb grid gap-12 md:grid-cols-[4.1fr_7fr] md:gap-[120px]">
          <div className="flex flex-col gap-10">
            <h2 className="h2">About this programme</h2>
            <dl className="flex flex-col">
              {[
                ["Level", service.level],
                ["Format", service.format],
                ["First step", `Consultation, ${CONSULTATION.label}`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b border-black py-3">
                  <dt className="regular-m text-grey-80">{k}</dt>
                  <dd className="regular-m text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-6">
            {service.intro.map((p) => (
              <p key={p} className="regular-l max-w-[640px]">
                {p}
              </p>
            ))}
            {service.notes && (
              <div className="mt-4 flex max-w-[640px] flex-col gap-3 border-l-2 border-red pl-6">
                {service.notes.map((n) => (
                  <p key={n} className="regular-m">
                    {n}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What's included: grey blocks. */}
      <section className="section">
        <div className="container-fb">
          <h2 className="h2 mb-14 max-w-[432px]">What’s included</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {service.includes.map((group) => (
              <div key={group.title} className="panel bg-grey-3 py-8">
                <h4 className="h4 mb-6">{group.title}</h4>
                <ul className="flex flex-col">
                  {group.items.map((item) => (
                    <li key={item} className="regular-m border-t border-black/15 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container-fb">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 className="h2 max-w-[432px]">Often paired with</h2>
              <Link href="/services" className="button-secondary button-small">
                All services
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} tall={false} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.sub };
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}
