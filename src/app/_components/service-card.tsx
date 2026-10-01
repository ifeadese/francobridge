import Link from "next/link";
import type { Service } from "@/lib/services";
import { IMAGES } from "@/lib/constants";

// A service block: a tall photo with a dark fade, the name and one line in
// white at the foot.
export function ServiceCard({ service, tall = true }: { service: Service; tall?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group relative flex overflow-hidden ${tall ? "min-h-[600px]" : "min-h-[420px]"} items-end p-6 md:p-8`}
    >
      <img
        src={IMAGES.services[service.slug]}
        alt=""
        className="absolute inset-0 -z-10 h-[115%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/0 to-black/60" />
      <div className="flex max-w-[420px] flex-col gap-4 text-white">
        <h4 className="h4 text-white">{service.name}</h4>
        <div className="line-white" />
        <p className="regular-m text-white/90">{service.sub}</p>
      </div>
    </Link>
  );
}

export default ServiceCard;
