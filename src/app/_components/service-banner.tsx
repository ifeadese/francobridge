import Link from "next/link";
import cn from "classnames";
import { TONES, WAY_FOR_TONE, type Tone } from "@/app/_components/banner";
import { Pattern } from "@/app/_components/pattern";
import type { Service } from "@/lib/services";
import { IMAGES } from "@/lib/constants";

// The tint behind each tone, for the gradient where the photo meets the text.
// The fade is eased over most of the photo, so it never reads as an edge.
const FADE = ["ff", "f2", "d9", "b3", "80", "4d", "26", "0d", "00"];
const fade = (tint: string, to: "top" | "right") =>
  `linear-gradient(to ${to}, ${FADE.map((a, i) => `${tint}${a} ${Math.round((i / (FADE.length - 1)) * 75)}%`).join(", ")})`;

const TINT: Record<Tone, string> = {
  yellow: "#f9e7b8",
  blue: "#dbe4f3",
  red: "#fbe0dc",
  green: "#dfe9dc",
};

// Banner type three: a pastel half with the label, one tight line as the
// title, who it is for, and the button, the pattern strip along its foot,
// beside a photo that fills the other half. The photo fades into the tint
// along the edge they share: its foot on phones, where it sits on top, and
// its left side on wider screens. Sticky, so a column of them stacks.
export function ServiceBanner({ service, index, tone, sticky = true }: { service: Service; index: number; tone: Tone; sticky?: boolean }) {
  const tint = TINT[tone];
  return (
    <div className={cn("flex flex-col md:flex-row", sticky && "md:sticky md:top-[158px]")}>
      <div className="relative min-h-[360px] w-full overflow-hidden md:order-last md:min-h-[560px] md:w-1/2">
        <img src={IMAGES.services[service.slug]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: fade(tint, "top") }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: fade(tint, "right") }}
          aria-hidden="true"
        />
      </div>
      <div className={cn("flex w-full flex-col md:w-1/2", TONES[tone])}>
        <div className="flex flex-1 flex-col justify-between gap-14 px-6 py-12 md:px-12 md:py-14">
          <div className="flex flex-col gap-6">
            <p className="regular-m">
              {String(index + 1).padStart(2, "0")} · {service.short}
            </p>
            <h3 className="banner-heading max-w-[560px]">{service.cardTitle}</h3>
            <p className="regular-l max-w-[480px]">{service.cardFor}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/services/${service.slug}`} className="button-primary">
              {service.ctaLabel}
            </Link>
          </div>
        </div>
        <Pattern way={WAY_FOR_TONE[tone]} tiles={3} />
      </div>
    </div>
  );
}

export default ServiceBanner;
