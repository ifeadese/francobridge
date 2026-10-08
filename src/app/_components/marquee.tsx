import { SERVICES } from "@/lib/services";

// The marquee: a strip in the blue at the head of the footer. The
// services run across in white, with a gold point between each, the gold of
// the client's collateral. The track is drawn twice so the loop never shows
// a seam; it pauses under the pointer and stands still for anyone who
// prefers reduced motion. Hidden from assistive tech: the same services are
// linked in the footer under it.
const REPEATS = 3;

function Point() {
  return <span className="h-1.5 w-1.5 shrink-0 self-center rounded-full bg-gold" aria-hidden="true" />;
}

function Track() {
  return (
    <div className="marquee-track">
      {Array.from({ length: REPEATS }, (_, i) => (
        <span key={i} className="flex items-center gap-8">
          {SERVICES.map((s) => (
            <span key={s.slug} className="flex items-center gap-8">
              <span className="font-heading text-[18px] font-medium md:text-[20px]">{s.short}</span>
              <Point />
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee border-b border-white/20 bg-blue py-3 text-white md:py-4" aria-hidden="true">
      <Track />
      <Track />
    </div>
  );
}

export default Marquee;
