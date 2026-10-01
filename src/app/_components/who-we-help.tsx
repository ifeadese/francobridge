import Link from "next/link";
import { ServiceGlyph } from "@/app/_components/service-glyph";
import { getService, SERVICES } from "@/lib/services";

// Who we help: four grey blocks, each ending in the services that apply,
// always in the site's service order.
const AUDIENCES = [
  {
    glyph: "immigrants",
    title: "Aspiring immigrants",
    text: "French-language pathways reward French. We help you meet the level they ask for, with the test score to prove it.",
    services: ["tcf-tef-preparation", "immigration-pathways", "general-french"],
  },
  {
    glyph: "newcomers",
    title: "Newcomers",
    text: "Settle in faster: French for daily life, for your first job here, and for the public service.",
    services: ["general-french", "professional-french", "career-pathway-guidance"],
  },
  {
    glyph: "students",
    title: "Students",
    text: "Meet the language requirement of a French-language college or university programme, and plan your admission.",
    services: ["career-pathway-guidance", "general-french", "tcf-tef-preparation"],
  },
  {
    glyph: "professionals",
    title: "Professionals",
    text: "Take French into the meeting room, the interview and the presentation, with the vocabulary of your field.",
    services: ["professional-french", "career-pathway-guidance", "translation"],
  },
] as const;

export function WhoWeHelp({ className = "section" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="container-fb">
        <h2 className="h2 mb-10 max-w-[640px]">Who we help, and where French takes them</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="panel bg-grey-3">
              <ServiceGlyph slug={a.glyph} className="mb-10 h-10 w-10 text-black" />
              <div className="flex flex-1 flex-col justify-between gap-8">
                <div className="max-w-[420px]">
                  <h4 className="h4 mb-4">{a.title}</h4>
                  <p className="regular-m">{a.text}</p>
                </div>
                <ul className="flex flex-col border-t border-black/15">
                  {[...a.services]
                    .sort((x, y) => SERVICES.findIndex((s) => s.slug === x) - SERVICES.findIndex((s) => s.slug === y))
                    .map((slug) => {
                    const s = getService(slug);
                    if (!s) return null;
                    return (
                      <li key={slug} className="border-b border-black/15">
                        <Link
                          href={`/services/${slug}`}
                          className="flex items-center justify-between gap-3 py-2.5 text-[16px] transition-colors hover:text-blue"
                        >
                          <span>{s.short}</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M2 7h10M8 3l4 4-4 4" />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoWeHelp;
