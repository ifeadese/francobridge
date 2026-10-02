// The level bridge: the seam between the hero and the programmes, drawn as a
// viaduct. Five arches stand on one base line, one for each level on the
// scale the consultation measures, A1 to C1, with the sun rising at the far
// end of the line, past C1: the opportunity on the other side. The arch is
// the brand's one curve, and the brand book draws it with a level inside.
const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;

export function LevelBridge({ className = "" }: { className?: string }) {
  return (
    <section className={`container-fb ${className}`} aria-label="The levels, A1 to C1">
      <div className="relative border-b border-black">
        {/* the arches stop short of the line's end, so the sun has the bank to itself */}
        <div className="grid grid-cols-5 gap-2 pr-9 sm:gap-3 sm:pr-16 md:gap-6 md:pr-24">
          {LEVELS.map((level) => (
            <div key={level} className="arch flex aspect-[1/1.9] items-end justify-center bg-blue-light pb-4 sm:aspect-[1/1.3] md:aspect-[1/1.12] md:pb-7">
              <span className="font-heading text-[22px] leading-none text-blue sm:text-[32px] md:text-[44px]">
                {level}
              </span>
            </div>
          ))}
        </div>
        {/* the sun, on the base line, past the last arch */}
        <svg viewBox="0 0 24 12" className="absolute -bottom-px right-0 h-3 w-6 text-red" aria-hidden="true">
          <path d="M0 12A12 12 0 0 1 24 12Z" fill="currentColor" />
        </svg>
      </div>
      <p className="regular-s mt-3 text-grey-80">The consultation places you on this scale. Every programme starts from there.</p>
    </section>
  );
}

export default LevelBridge;
