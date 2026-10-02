import { SITE_TAGLINE, SITE_TAGLINE_FR } from "@/lib/constants";

// The marquee: a strip in the logo's navy at the head of the footer. The two taglines run
// across in the serif, the English then the French, in ivory with the red half-sun on the base line between them. The
// track is drawn twice so the loop never shows a seam; it pauses under the
// pointer and stands still for anyone who prefers reduced motion. Hidden
// from assistive tech: it is decoration, and the taglines are read elsewhere.
const REPEATS = 4;

function Sun() {
  return (
    <svg viewBox="0 0 24 12" className="h-3 w-6 shrink-0 text-red" aria-hidden="true">
      <path d="M0 12A12 12 0 0 1 24 12Z" fill="currentColor" />
    </svg>
  );
}

function Track() {
  return (
    <div className="marquee-track">
      {Array.from({ length: REPEATS }, (_, i) => (
        <span key={i} className="flex items-baseline gap-10">
          <span className="font-heading text-[22px] md:text-[26px]">{SITE_TAGLINE}</span>
          <Sun />
          <span className="font-heading text-[22px] md:text-[26px]" lang="fr">
            {SITE_TAGLINE_FR}
          </span>
          <Sun />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee border-b border-ivory/20 bg-navy py-4 text-ivory md:py-5" aria-hidden="true">
      <Track />
      <Track />
    </div>
  );
}

export default Marquee;
