import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { Logo } from "@/app/_components/logo";
import { WhoWeHelp } from "@/app/_components/who-we-help";

export const metadata: Metadata = {
  title: "About",
  description:
    "FrancoBridge Consulting Inc. is a French language education, professional development and pathway guidance centre in Ottawa, Ontario, serving clients in Ottawa and online.",
};

export default function About() {
  return (
    <main>
      <Hero title="A bridge for people who need French to get somewhere" compact />

      {/* What we do, what we offer, where. */}
      <section className="mt-0">
        <div className="container-fb">
          <div className="flex flex-col gap-6">
            <p className="regular-l max-w-[760px]">
              FrancoBridge builds the French you need for study, work and life in Canada. Lessons are structured,
              practical and personal: you learn the language, practise using it, and prepare for the exams that
              count.
            </p>
            <p className="regular-l max-w-[760px]">
              We teach General French from A1 to C1, prepare you for the TCF Canada and TEF Canada, and offer
              professional French for the workplace and the public service. We also help with career and study
              plans in French, explain the French-language immigration pathways, and translate documents between
              English and French. We are based in Ottawa, and every programme runs online.
            </p>
          </div>
        </div>
      </section>

      <WhoWeHelp />

      {/* Meet the instructor: the layout from the stratejik9000 about page. A
          portrait panel at the left, the introduction at the right; on phones
          the introduction comes first and the portrait follows it. */}
      <section className="section" aria-label="Meet the instructor">
        <div className="container-fb grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-14">
          <div className="order-last md:order-none">
            {/* Placeholder until a real portrait is supplied: never a stock photo of someone else. */}
            <div
              role="img"
              aria-label="Portrait of the founder, to follow"
              className="relative flex aspect-[4/5] flex-col items-center justify-center gap-5 overflow-hidden bg-blue text-white"
            >
              <Logo variant="stacked" on="blue" className="w-56" />
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
