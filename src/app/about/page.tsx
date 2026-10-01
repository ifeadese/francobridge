import type { Metadata } from "next";
import { Banner } from "@/app/_components/banner";
import { BookButton } from "@/app/_components/book-button";
import { Hero } from "@/app/_components/hero";
import { WhoWeHelp } from "@/app/_components/who-we-help";
import { IMAGES, LOCATION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "FrancoBridge Consulting Inc. is a French language education, professional development and pathway guidance centre in Ottawa, Ontario, serving clients in Ottawa and online.",
};

const METHOD = [
  ["Learn", "A structure, a set of words, a way of saying something, taught in context."],
  ["Practice", "Guided repetition until it is comfortable: listening, speaking, reading, writing."],
  ["Communicate", "Use it in real conversation, with correction that builds confidence rather than fear."],
  ["Apply", "Take it into your exam, your workplace, your application, your life."],
] as const;

export default function About() {
  return (
    <main>
      <Hero title="A bridge, built in Ottawa, for people who need French to get somewhere" compact />

      {/* What we do, what we offer, where. */}
      <section className="mt-14 md:mt-20">
        <div className="container-fb">
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="h4">What we do</h4>
              <p className="regular-l max-w-[640px]">
                We help aspiring immigrants, newcomers, students and professionals develop the French language
                skills, confidence and career readiness needed to access educational, professional and
                Francophone opportunities in Canada and beyond.
              </p>
              <p className="regular-l max-w-[640px]">
                Our programmes combine structured French language instruction with practical communication,
                professional development and specialised preparation for French-language proficiency examinations.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="h4">What we offer</h4>
              <p className="regular-l max-w-[640px]">
                General French programmes from A1 to C1, private instruction, TCF Canada and TEF Canada preparation,
                professional French, French conversation programmes, workplace and government French preparation,
                career development services, educational pathway guidance, translation services, and French
                immigration pathway information and guidance.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="h4">Where</h4>
              <p className="regular-l max-w-[640px]">
                {LOCATION.city}. {LOCATION.reach}: every programme runs online, so the bridge reaches beyond the city
                as the school grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhoWeHelp className="mt-14 md:mt-20" />

      {/* Method: text left, photo right. */}
      <section className="mt-14 md:mt-20">
        <div className="container-fb grid gap-10 md:grid-cols-[5fr_6.3fr] md:gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="h2 max-w-[432px]">Learn, practice, communicate, apply</h2>
            <div className="flex flex-col gap-6">
              {METHOD.map(([step, text], i) => (
                <div key={step} className="flex flex-col gap-3 border-t border-black pt-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="h3">{step}</h3>
                    <span className="regular-s text-grey-80">0{i + 1}</span>
                  </div>
                  <p className="regular-m max-w-[480px]">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <img src={IMAGES.method} alt="" className="h-[360px] w-full object-cover md:h-full md:max-h-[640px]" />
        </div>
      </section>

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
