import { MARK } from "@/lib/logo-paths";
import { SERVICES } from "@/lib/services";

// The marquee: a strip in the logo's navy at the head of the footer. The six
// services run across in the serif, in ivory, with the logo's red maple leaf
// between each. The track is drawn twice so the loop never shows a seam; it
// pauses under the pointer and stands still for anyone who prefers reduced
// motion. Hidden from assistive tech: the same services are linked in the
// footer under it.
const REPEATS = 3;

function Leaf() {
  return (
    <svg viewBox="461 314 78 85" className="h-5 w-auto shrink-0 self-center text-red" aria-hidden="true">
      <path d={MARK.leaf} fill="currentColor" />
    </svg>
  );
}

function Track() {
  return (
    <div className="marquee-track">
      {Array.from({ length: REPEATS }, (_, i) => (
        <span key={i} className="flex items-center gap-10">
          {SERVICES.map((s) => (
            <span key={s.slug} className="flex items-center gap-10">
              <span className="font-heading text-[22px] md:text-[26px]">{s.short}</span>
              <Leaf />
            </span>
          ))}
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
