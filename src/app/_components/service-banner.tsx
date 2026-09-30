import Link from "next/link";
import cn from "classnames";
import { TONES, WAY_FOR_TONE, type Tone } from "@/app/_components/banner";
import { Pattern } from "@/app/_components/pattern";
import type { Service } from "@/lib/services";
import { IMAGES } from "@/lib/constants";

// Banner type three: a pastel half with the label, one tight line as the
// title, who it is for, and the button, the pattern strip along its foot, beside a photo that fills the
// other half. Sticky, so a column of them stacks as the page scrolls.
export function ServiceBanner({ service, index, tone, sticky = true }: { service: Service; index: number; tone: Tone; sticky?: boolean }) {
  return (
    <div className={cn("flex flex-col md:flex-row", sticky && "md:sticky md:top-[158px]")}>
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
      <div className="relative min-h-[320px] w-full overflow-hidden md:min-h-[560px] md:w-1/2">
        <img src={IMAGES.services[service.slug]} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default ServiceBanner;
