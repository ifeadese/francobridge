import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookButton } from "@/app/_components/book-button";
import { Hero } from "@/app/_components/hero";
import { ServicePager } from "@/app/_components/service-pager";
import { CONSULTATION, PACKAGES } from "@/lib/constants";
import { getAdjacentServices, getService, SERVICES } from "@/lib/services";

type Params = { params: Promise<{ slug: string }> };

export default async function ServicePage(props: Params) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return notFound();
  // The facts, each one the client's own answer: lessons are private and
  // online, in 20, 40 or 60 hour blocks set at the consultation, which is
  // booked and paid for online.
  const facts = [
    ...(service.lessons
      ? [
          ["Format", "Private lessons, online"],
          ["Hours", `${PACKAGES.slice(0, -1).join(", ")} or ${PACKAGES.at(-1)} hours, decided at your consultation`],
        ]
      : []),
    ...(service.method ? [["Method", service.method]] : []),
    ["Consultation", `${CONSULTATION.minutes / 60} hour · $${CONSULTATION.price} ${CONSULTATION.currency} · booked and paid online`],
  ];

  return (
    <main>
      <Hero
        wide="80%"
        title={service.cardTitle}
        text={service.sub}
        note={service.notes?.map((n) => <p key={n}>{n}</p>)}
        back={{ href: "/services", label: "All programs" }}
      >
        <BookButton />
        <BookButton event="lesson" />
      </Hero>

      {/* The grey band, about the program, the same on every service: the
          heading, the facts, then the brief's lists, group under group. The description and
          any note are in the hero. */}
      <section className="section-tight">
        <div className="container-fb">
          <div className="flex flex-col gap-10 bg-grey-3 px-6 py-10 md:gap-14 md:px-16 md:py-14">
            <div className="flex flex-col gap-10">
              <h2 className="h2">What to expect</h2>
              <dl className="flex flex-col">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 border-b border-navy py-3 first:pt-0">
                    <dt className="regular-s text-navy/70">{k}</dt>
                    <dd className="regular-m">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-10 md:gap-14">
              {service.includes.map((group) => (
                <div key={group.title}>
                  <h3 className="h4 mb-6">{group.title}</h3>
                  <ul className="flex flex-col">
                    {group.items.map((item) => (
                      <li key={item} className="regular-m border-t border-navy/15 py-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-fb">
          <ServicePager {...getAdjacentServices(service.slug)} />
        </div>
      </section>
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
