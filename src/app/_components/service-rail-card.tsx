import Link from "next/link";
import cn from "classnames";
import { Wave, type WaveVariant } from "@/app/_components/wave";
import { Tertiary } from "@/app/_components/tertiary";
import type { Service } from "@/lib/services";

// A service card for the rail: a white panel held by a hairline frame in
// the card's ink, blue, gold or red, with the pamphlet's wave along its foot
// in the same ink. The label, then one tight line as the title, who it is
// for, and a tertiary link, right-aligned above the wave: a word and the
// ringed arrow. Alternate cards mirror the wave, so a row of them rises and
// falls. Cards share the height of the tallest and grow with their text,
// never clipping it. The whole card is the link; on hover the ring fills.
const FRAME = { blue: "border-blue/25", red: "border-red/30", gold: "border-gold/60" } as const;

export function ServiceRailCard({ service, ink, flip = false }: { service: Service; ink: WaveVariant; flip?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex min-h-[460px] w-full flex-col overflow-hidden border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue md:min-h-[560px]",
        "bg-white",
        FRAME[ink]
      )}
    >
      <Wave variant={ink} flip={flip} className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-56" />
      <div className="relative flex flex-1 flex-col justify-between gap-10 p-6 pb-48 md:p-10 md:pb-[264px]">
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
