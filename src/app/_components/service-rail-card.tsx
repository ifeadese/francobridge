import Link from "next/link";
import cn from "classnames";
import { TONES, WAY_FOR_TONE, type Tone } from "@/app/_components/banner";
import { Pattern } from "@/app/_components/pattern";
import { Tertiary } from "@/app/_components/tertiary";
import type { Service } from "@/lib/services";

// A service card for the rail: a 3:4 pastel panel with the label, one tight
// line as the title, who it is for, and Learn more at the foot, with the
// pattern behind them along the bottom edge. The whole card is the link.
export function ServiceRailCard({ service, index, tone }: { service: Service; index: number; tone: Tone }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn("group relative flex aspect-[3/4] w-full flex-col overflow-hidden transition-colors", TONES[tone])}
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
        <Tertiary as="span">Learn more</Tertiary>
      </div>
    </Link>
  );
}

export default ServiceRailCard;
