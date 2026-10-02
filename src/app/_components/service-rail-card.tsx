import Link from "next/link";
import cn from "classnames";
import { TONES, WAY_FOR_TONE, type Tone } from "@/app/_components/banner";
import { Pattern } from "@/app/_components/pattern";
import { Tertiary } from "@/app/_components/tertiary";
import type { Service } from "@/lib/services";

// A service card for the rail: a pastel panel held by a hairline frame in
// the card's ink. The label, then one tight line as the title, who it is
// for, and a tertiary link at the foot, right-aligned: a word and the ringed
// arrow, the arch closed. The ring is filled in the ink at rest, so the link
// holds its own over the pattern that runs along the bottom edge behind it. Cards
// share the height of the tallest and grow with their text, never clipping
// it. The whole card is the link; on hover the ring fills.
const INK = { blue: "border-blue/25", red: "border-red/25", yellow: "border-blue/25" } as const;

export function ServiceRailCard({ service, tone }: { service: Service; tone: Tone }) {
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
          <p className="regular-s">{service.short}</p>
          <h3 className="h3">{service.cardTitle}</h3>
          <p className="regular-l">{service.cardFor}</p>
        </div>
        <span className="self-end">
          <Tertiary as="span" filled>
            Learn more
          </Tertiary>
        </span>
      </div>
    </Link>
  );
}

export default ServiceRailCard;
