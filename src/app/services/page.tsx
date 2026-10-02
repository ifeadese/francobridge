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

      {/* The rail sits in the opening, a clear step below the hero's line:
          48px on phones, 64px from the tablet width up. */}
      <div className="container-fb mt-6 md:mt-8">
        <ServicesRail />
      </div>

    </main>
  );
}
