import { SERVICES } from "@/lib/services";

// The marquee: a strip in the blue at the head of the footer, its text
// growing with the window (see .marquee in globals.css). The
// services run across in white, with a gold point between each, the gold of
// the client's collateral. The track is drawn twice so the loop never shows
// a seam; it pauses under the pointer and stands still for anyone who
// prefers reduced motion. Hidden from assistive tech: the same services are
// linked in the footer under it.
const REPEATS = 3;

function Point() {
  return <span className="h-[0.32em] w-[0.32em] shrink-0 self-center rounded-full bg-gold" aria-hidden="true" />;
}

function Track() {
  return (
    <div className="marquee-track">
      {Array.from({ length: REPEATS }, (_, i) => (
        <span key={i} className="flex items-center gap-[1.6em]">
          {SERVICES.map((s) => (
            <span key={s.slug} className="flex items-center gap-[1.6em]">
              <span className="font-heading font-medium">{s.short}</span>
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
    <div className="marquee border-b border-white/20 bg-blue text-white" aria-hidden="true">
      <Track />
      <Track />
    </div>
  );
}

export default Marquee;
