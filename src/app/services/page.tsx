import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { ServicesRail } from "@/app/_components/services-rail";

export const metadata: Metadata = {
  title: "Services",
  description:
    "TCF and TEF Canada preparation, professional French, General French A1 to C1, education and career pathway guidance, French immigration pathway information, and translation.",
};

export default function Services() {
  return (
    <main>
      <Hero
        title="Our Programs"
        text="Every program starts with the same conversation: a one-hour consultation that finds your level and ends with a plan."
        wide
      />

      {/* The grid sits in the opening at the hero's own padding, 24px on
          phones and 32px up, and keeps the site-wide gap above the footer. */}
      <div className="container-fb">
        <ServicesRail />
      </div>

    </main>
  );
}
