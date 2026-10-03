import cn from "classnames";
import Link from "next/link";
import type { Service } from "@/lib/services";

function PagerLink({ service, direction }: { service: Service; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/services/${service.slug}`}
      rel={isNext ? "next" : "prev"}
      className={cn(
        "group flex flex-col gap-3 border border-navy/25 p-6 transition-colors hover:border-blue md:p-8",
        isNext && "sm:col-start-2 sm:items-end sm:text-right",
      )}
    >
      <span className="regular-s text-navy/70">{isNext ? "Next →" : "← Previous"}</span>
      <span className="h4 text-balance transition-colors group-hover:text-blue">{service.short}</span>
    </Link>
  );
}

// Foot of a service page: the programmes before and after it, in the site's
// order. "Next" always sits on the right, even with no "previous".
export function ServicePager({ previous, next }: { previous?: Service; next?: Service }) {
  if (!previous && !next) return null;
  return (
    <nav aria-label="More programs" className="grid gap-4 border-t border-navy/15 pt-8 sm:grid-cols-2 md:gap-6">
      {previous && <PagerLink service={previous} direction="previous" />}
      {next && <PagerLink service={next} direction="next" />}
    </nav>
  );
}

export default ServicePager;
