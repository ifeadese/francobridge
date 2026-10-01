import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { Logo } from "@/app/_components/logo";
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

      {/* Meet the instructor: the layout from the stratejik9000 about page. A
          portrait panel at the left, the introduction at the right; on phones
          the introduction comes first and the portrait follows it. */}
      <section className="mt-14 md:mt-20" aria-label="Meet the instructor">
        <div className="container-fb grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-14">
          <div className="order-last md:order-none">
            {/* Placeholder until a real portrait is supplied: never a stock photo of someone else. */}
            <div
              role="img"
              aria-label="Portrait of the founder, to follow"
              className="relative flex aspect-[4/5] flex-col items-center justify-center gap-5 overflow-hidden bg-blue text-white"
            >
              <Logo variant="mark" on="blue" className="w-40" />
              <span className="regular-s uppercase tracking-[0.14em] text-white/70">Portrait to follow</span>
            </div>
          </div>
          <div>
            <p className="regular-s uppercase tracking-[0.14em] text-grey-80">Meet the instructor</p>
            <div className="mt-4 flex max-w-2xl flex-col gap-5 text-[18px] leading-[1.5] md:text-[20px]">
              <p>
                I’m [NAME], the founder and lead instructor of FrancoBridge. Every consultation and, for now, every
                lesson is with me.
              </p>
              <p>
                [A short biography goes here once confirmed: background, qualifications, and the road that led to
                Ottawa.]
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
