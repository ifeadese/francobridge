import type { Metadata } from "next";
import { Banner } from "@/app/_components/banner";
import { BookButton } from "@/app/_components/book-button";
import { Hero } from "@/app/_components/hero";
import { WhoWeHelp } from "@/app/_components/who-we-help";
import { LOCATION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "FrancoBridge Consulting Inc. is a French language education, professional development and pathway guidance centre in Ottawa, Ontario, serving clients in Ottawa and online.",
};

export default function About() {
  return (
    <main>
      <Hero title="A bridge, built in Ottawa, for people who need French to get somewhere" compact />

      {/* What we do, what we offer, where. */}
      <section className="mt-0">
        <div className="container-fb">
          <div className="flex flex-col gap-6">
            <p className="regular-l max-w-[640px]">
              FrancoBridge helps aspiring immigrants, newcomers, students and professionals develop the French
              language skills, confidence and career readiness needed to access educational, professional and
              Francophone opportunities in Canada and beyond. Our programmes combine structured French language
              instruction with practical communication, professional development and specialised preparation for
              French-language proficiency examinations.
            </p>
            <p className="regular-l max-w-[640px]">
              We offer General French programmes from A1 to C1, private instruction, TCF Canada and TEF Canada
              preparation, professional French, French conversation programmes, workplace and government French
              preparation, career development services, educational pathway guidance, translation services, and
              French immigration pathway information and guidance. We are based in {LOCATION.city}, and every
              programme runs online, so the bridge reaches beyond the city as the school grows.
            </p>
          </div>
        </div>
      </section>

      <WhoWeHelp className="mt-14 md:mt-20" />

      {/* Your instructor. */}
      <section className="mt-14 md:mt-20">
        <div className="container-fb">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 max-w-[432px]">Your instructor</h2>
            <BookButton size="sm" look="secondary" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <div className="aspect-[3/4] w-full bg-grey-8" aria-hidden="true" />
              <div className="flex flex-col gap-3">
                <h4 className="h4 border-b border-black pb-3">Founder and lead instructor</h4>
                <p className="regular-m text-grey-80">Name, credentials and a photograph to come.</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:col-span-2">
              <p className="regular-l max-w-[640px]">
                Every consultation and, for now, every lesson is with the founder. A short biography goes here once
                the client confirms it: background, qualifications, and the road that led to Ottawa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 md:mt-20">
        <div className="container-fb">
          <Banner tone="yellow" way="yellow" heading="Start with a one-hour consultation. Leave with your level and a plan.">
            <BookButton />
          </Banner>
        </div>
      </section>
    </main>
  );
}
