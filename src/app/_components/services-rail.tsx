import { CardRail } from "@/app/_components/card-rail";
import { ServiceRailCard } from "@/app/_components/service-rail-card";
import type { Tone } from "@/app/_components/banner";
import { SERVICES } from "@/lib/services";

const TONES: Tone[] = ["yellow", "blue", "red", "green", "blue", "yellow"];

// The six services, TCF & TEF first: a grid of three, then two, and on phones
// a swipeable rail (see .rail in globals.css). Shared by the home page and
// the services page so the two never drift apart.
export function ServicesRail() {
  return (
    <CardRail className="rail" label="Programs and services">
      {SERVICES.map((s, i) => (
        <ServiceRailCard key={s.slug} service={s} tone={TONES[i % TONES.length]} />
      ))}
    </CardRail>
  );
}

export default ServicesRail;
