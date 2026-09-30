import Link from "next/link";
import cn from "classnames";
import type { Service } from "@/lib/services";
import { ServiceGlyph } from "@/app/_components/service-glyph";

type Props = { service: Service; featured?: boolean };

// A service tile. The glyph sits in an arch-topped panel, from the mark.
export function ServiceCard({ service, featured }: Props) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-md",
        featured && "md:col-span-2 md:flex-row md:items-center md:gap-10 md:p-10",
      )}
    >
      <div
        className={cn(
          "arch flex items-end justify-center bg-blue text-ivory",
          featured ? "h-40 w-full md:h-56 md:w-72 md:shrink-0" : "h-28 w-full",
        )}
      >
        <ServiceGlyph slug={service.slug} className={featured ? "h-20 w-20 md:h-28 md:w-28" : "h-14 w-14"} />
      </div>
      <div className="mt-6 md:mt-0">
        {featured && <p className="eyebrow">Most requested</p>}
        <h3 className={cn("font-heading font-semibold text-blue", featured ? "mt-2 text-3xl md:text-4xl" : "text-xl")}>
          {service.name}
        </h3>
        <p className="mt-2 text-ink/80">{service.sub}</p>
        <p className="mt-4 text-sm font-semibold text-slate">
          {service.level} · {service.format}
        </p>
        <span className="mt-4 inline-block font-semibold text-blue group-hover:underline">
          Learn more →
        </span>
      </div>
    </Link>
  );
}

export default ServiceCard;
