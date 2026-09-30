import Link from "next/link";
import cn from "classnames";
import { TONES, WAY_FOR_TONE, type Tone } from "@/app/_components/banner";
import { Pattern } from "@/app/_components/pattern";
import type { Service } from "@/lib/services";

// A service card for the rail: a 3:4 pastel panel with the label, one tight
// line as the title, who it is for, and a Learn more button at the foot, with
// the pattern behind them along the bottom edge. The whole card is the link:
// it lifts on hover, and the button darkens and its arrow moves.
export function ServiceRailCard({ service, index, tone }: { service: Service; index: number; tone: Tone }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn("group relative flex aspect-[3/4] w-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black", TONES[tone])}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
        <Pattern way={WAY_FOR_TONE[tone]} tiles={2} />
      </div>
      <div className="relative flex flex-1 flex-col justify-between gap-10 p-6 md:p-10">
        <div className="flex flex-col gap-4">
          <p className="regular-s">
            {String(index + 1).padStart(2, "0")} · {service.short}
          </p>
          <h3 className="h3">{service.cardTitle}</h3>
          <p className="regular-l">{service.cardFor}</p>
        </div>
        <span className="button-primary button-small inline-flex items-center gap-3 self-start group-hover:bg-grey-80">
          Learn more
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            <path d="M2 8h12M9 3l5 5-5 5" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default ServiceRailCard;
