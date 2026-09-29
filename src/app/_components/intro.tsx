import { SITE_NAME, SITE_TAGLINE, SITE_TAGLINE_FR } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:items-end md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="font-heading font-semibold text-navy text-5xl md:text-8xl tracking-tighter leading-tight md:pr-8">
        {SITE_NAME}.
      </h1>
      <div className="text-center md:text-right mt-5 md:pl-8">
        <p className="text-lg font-semibold text-charcoal">{SITE_TAGLINE}</p>
        <p className="font-heading text-lg text-green" lang="fr">
          {SITE_TAGLINE_FR}
        </p>
      </div>
    </section>
  );
}
