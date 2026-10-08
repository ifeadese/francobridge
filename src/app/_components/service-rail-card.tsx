import Link from "next/link";
import cn from "classnames";
import { RunningWave } from "@/app/_components/running-wave";
import { Tertiary } from "@/app/_components/tertiary";
import type { Service } from "@/lib/services";

// A service card for the rail: a white panel held by a hairline frame in
// the card's ink, blue, gold or red, with its slice of the running wave
// along its foot: the wave runs on from card to card through the whole
// sequence (see RunningWave), so `index` is the card's place in it. The
// label, then one tight line as the title, and who it is for, all above the
// wave; then the tertiary link, a word and the ringed arrow, in white at the
// bottom right, down in the wave's blue beneath its curve. Cards share the
// height of the tallest and grow with their text, never clipping it. The
// whole card is the link; on hover the ring turns gold.
const FRAME = { blue: "border-blue/25", red: "border-red/30", gold: "border-gold/60" } as const;
export type Ink = keyof typeof FRAME;

export function ServiceRailCard({ service, ink, index }: { service: Service; ink: Ink; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue",
        "bg-white",
        FRAME[ink]
      )}
    >
      {/* Edge to edge, so the curve meets the next card's exactly. */}
      <RunningWave index={index} className="pointer-events-none absolute inset-x-0 bottom-0 h-[172px] w-full md:h-[196px]" />
      <div className="relative flex flex-1 flex-col gap-10 p-6 pb-[172px] md:p-8 md:pb-[196px]">
        <div className="flex flex-col gap-4">
          <p className="regular-s">{service.short}</p>
          <h3 className="h4">{service.cardTitle}</h3>
          <p className="regular-m">{service.cardFor}</p>
        </div>
        <span className="absolute bottom-5 right-6 md:bottom-6 md:right-8">
          <Tertiary as="span" filled onBlue>
            Learn more
          </Tertiary>
        </span>
      </div>
    </Link>
  );
}

export default ServiceRailCard;
