import { CardRail } from "@/app/_components/card-rail";
import { ServiceRailCard } from "@/app/_components/service-rail-card";
import type { Ink } from "@/app/_components/service-rail-card";
import { SERVICES } from "@/lib/services";

const INKS: Ink[] = ["blue", "gold", "red"];

// The services, TCF & TEF first: a grid of three across, and on phones
// a swipeable rail (see .rail in globals.css). Shared by the home page and
// the services page so the two never drift apart.
export function ServicesRail() {
  return (
    <CardRail className="rail" label="Programs and services">
      {SERVICES.map((s, i) => (
        <ServiceRailCard key={s.slug} service={s} ink={INKS[i % INKS.length]} index={i} />
      ))}
    </CardRail>
  );
}

export default ServicesRail;
