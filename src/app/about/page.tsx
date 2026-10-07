import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { Logo } from "@/app/_components/logo";
import { WhoWeHelp } from "@/app/_components/who-we-help";
import { FOUNDER, MISSION, VALUES, VISION, WHO_WE_ARE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "FrancoBridge Consulting is a language education and professional development firm in Ottawa, Ontario, helping clients gain the French they need to succeed academically, professionally and through immigration pathways, online across North America.",
};

// Who we are, the mission and vision, the five values, who we help, and the
// founder. The words of the first three are the client's own, from the
// pamphlet, kept verbatim.
export default function About() {
  return (
    <main>
      <Hero title="A bridge for people who need French to get somewhere" compact wide />

      {/* Who we are, in the client's words, then what that means in services. */}
      <section className="mt-0">
        <div className="container-fb">
          <div className="flex flex-col gap-6">
            <p className="regular-l">{WHO_WE_ARE}</p>
            <p className="regular-l">
              We coach French from A1 to C1, prepare you for the TCF, TEF, DELF and DALF and for the Government of
              Canada Second Language Evaluation, and teach professional French for the workplace and the public
              service. We also prepare you for interviews for bilingual roles, help you plan French-language studies
              in Canada, explain the French-language immigration pathways, and translate documents between English
              and French. We are based in Ottawa, and every service runs online.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and vision: a blue band, the two side by side from tablet
          width, each behind a gold rule, the gold of the client's collateral. */}
      <section className="section">
        <div className="container-fb">
          <div data-surface="dark" className="grid gap-10 bg-blue px-6 py-10 text-white md:grid-cols-2 md:gap-14 md:px-16 md:py-14">
            <div className="border-l-2 border-gold pl-6">
              <h2 className="h4 mb-4 text-white">Mission</h2>
              <p className="regular-l text-white/90">{MISSION}</p>
            </div>
            <div className="border-l-2 border-gold pl-6">
              <h2 className="h4 mb-4 text-white">Vision</h2>
              <p className="regular-l text-white/90">{VISION}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values: five rows between rules, the name at the left and the line
          at the right from tablet width. */}
      <section className="section" aria-labelledby="values">
        <div className="container-fb">
          <h2 id="values" className="h2 mb-10 max-w-[640px]">
            Our values
          </h2>
          <dl className="border-t border-blue">
            {VALUES.map((value) => (
              <div
                key={value.name}
                className="grid grid-cols-1 gap-y-2 border-b border-blue py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-baseline md:gap-x-10 md:py-7"
              >
                <dt className="font-heading text-[24px] font-semibold leading-[1.1] text-blue md:text-[28px]">{value.name}</dt>
                <dd className="text-[16px] leading-[1.5] md:text-[17px]">{value.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <WhoWeHelp />

      {/* Meet the founder: a portrait panel at the left, the introduction at
          the right; on phones the introduction comes first and the portrait
          follows it. */}
      <section className="section" aria-label="Meet the founder">
        <div className="container-fb grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-14">
          <div className="order-last md:order-none">
            {/* Placeholder until a real portrait is supplied: never a stock photo of someone else. */}
            <div
              role="img"
              aria-label={`Portrait of ${FOUNDER.name}, to follow`}
              className="relative flex aspect-[4/5] flex-col items-center justify-center gap-6 overflow-hidden bg-blue text-white"
            >
              <Logo variant="mark" on="blue" className="h-40 w-auto" />
              <span className="regular-s uppercase tracking-[0.14em] text-white/70">Portrait to follow</span>
            </div>
          </div>
          <div>
            <p className="regular-s uppercase tracking-[0.14em] text-blue/70">Meet the founder</p>
            <h2 className="h3 mt-3">
              {FOUNDER.name}
              <span className="block text-[18px] font-normal text-blue/70 md:text-[20px]">{FOUNDER.role}</span>
            </h2>
            <div className="mt-6 flex max-w-2xl flex-col gap-5 text-[18px] leading-[1.5] md:text-[20px]">
              <p>
                I’m {FOUNDER.name}, the founder of FrancoBridge Consulting. Every consultation and, for now, every
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
