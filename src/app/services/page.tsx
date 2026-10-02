import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { ServicesRail } from "@/app/_components/services-rail";

export const metadata: Metadata = {
  title: "Services",
  description:
    "TCF and TEF Canada preparation, professional French, General French A1 to C1, career and education pathway guidance, French immigration pathway information, and translation.",
};

export default function Services() {
  return (
    <main>
      <Hero
        title="Our Programs"
        text="Every programme starts with the same conversation: a one-hour consultation that finds your level and ends with a plan."
      />

      {/* The rail sits in the opening at the hero's own padding, 24px on
          phones and 32px up. The page is only the rail, so it also pulls the
          site-wide gap above the footer in to 32px and 40px. */}
      <div className="container-fb -mb-6 md:-mb-10">
        <ServicesRail />
      </div>

    </main>
  );
}
