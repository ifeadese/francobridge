import Link from "next/link";
import cn from "classnames";
import { TONES, WAY_FOR_TONE, type Tone } from "@/app/_components/banner";
import { Pattern } from "@/app/_components/pattern";
import { Tertiary } from "@/app/_components/tertiary";
import type { Service } from "@/lib/services";

// A service card for the rail: a pastel panel held by a hairline frame in
// the card's ink. The number is set in the serif beside its label,
// the brand's plain number; then one tight line as the title, who it is
// for, and a tertiary link at the foot, right-aligned: a word and the ringed
// arrow, the arch closed. The pattern runs along the bottom edge behind them. Cards
// share the height of the tallest and grow with their text, never clipping
// it. The whole card is the link; on hover the ring fills.
const INK = { blue: "border-blue/25", red: "border-red/25", yellow: "border-blue/25" } as const;

export function ServiceRailCard({ service, index, tone }: { service: Service; index: number; tone: Tone }) {
  const way = WAY_FOR_TONE[tone];
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex min-h-[460px] w-full flex-col border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:min-h-[560px]",
        TONES[tone],
        INK[way]
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden" aria-hidden="true">
        <Pattern way={way} tiles={2} />
      </div>
      <div className="relative flex flex-1 flex-col justify-between gap-10 p-6 md:p-10">
        <div className="flex flex-col gap-4">
          <p className="flex items-baseline gap-3">
            <span className="h3">{String(index + 1).padStart(2, "0")}</span>
            <span className="regular-s">{service.short}</span>
          </p>
          <h3 className="h3">{service.cardTitle}</h3>
          <p className="regular-l">{service.cardFor}</p>
        </div>
        <span className="self-end">
          <Tertiary as="span">Learn more</Tertiary>
        </span>
      </div>
    </Link>
  );
}

export default ServiceRailCard;
