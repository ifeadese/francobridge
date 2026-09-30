import type { Metadata } from "next";
import Container from "@/app/_components/container";
import { CtaBand } from "@/app/_components/cta-band";
import { Logo } from "@/app/_components/logo";
import { PageHero } from "@/app/_components/page-hero";
import { LOCATION } from "@/lib/constants";

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

const VALUES = [
  ["Practical communication", "We teach the French you will actually use, for the situation you are heading into."],
  ["Measurable progress", "You start with a level and you finish with one. Everything in between is tracked."],
  ["Personalised support", "Private instruction first, with a plan built for your goal and your timeline."],
] as const;

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="About FrancoBridge"
        title="A bridge, built in Ottawa, for people who need French to get somewhere."
        sub="FrancoBridge Consulting Inc. is a French language education, professional development and pathway guidance centre. We help aspiring immigrants, newcomers, students and professionals develop the French language skills, confidence and career readiness needed to access educational, professional and Francophone opportunities in Canada and beyond."
        fr={"« La langue est le pont. L’occasion est de l’autre côté. »"}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">What we do</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
                Structured instruction, real communication, specialised preparation.
              </h2>
              <div className="prose-fb mt-6 max-w-prose text-lg text-ink/85">
                <p>
                  Our programmes combine structured French language instruction with practical communication,
                  professional development and specialised preparation for French-language proficiency
                  examinations.
                </p>
                <p>
                  FrancoBridge offers General French programmes from A1 to C1, private instruction, TCF Canada and
                  TEF Canada preparation, professional French, French conversation programmes, workplace and
                  government French preparation, career development services, educational pathway guidance,
                  translation services, and French immigration pathway information and guidance.
                </p>
                <p>
                  We are particularly focused on helping learners use French as a tool for immigration, education,
                  employment and career advancement.
                </p>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="arch flex aspect-[4/5] items-end justify-center bg-blue px-10 pb-12">
                <Logo variant="stacked" on="blue" className="w-full max-w-[220px]" />
              </div>
              <p className="mt-4 text-sm text-slate">
                {LOCATION.city}. {LOCATION.reach}.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-ivory-deep py-16 md:py-24">
        <Container>
          <p className="eyebrow">Methodology</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
            Learn → Practice → Communicate → Apply
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {METHOD.map(([step, text], i) => (
              <li key={step} className="rounded-2xl border border-line bg-white p-6">
                <p className="font-heading text-3xl font-semibold text-red">0{i + 1}</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-blue">{step}</h3>
                <p className="mt-2 text-ink/80">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">How we work</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
                Three things we hold to.
              </h2>
            </div>
            <div className="grid gap-8 md:col-span-7">
              {VALUES.map(([title, text]) => (
                <div key={title} className="border-t-2 border-blue pt-4">
                  <h3 className="font-heading text-2xl font-semibold text-blue">{title}</h3>
                  <p className="mt-2 max-w-prose text-ink/80">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="arch aspect-[4/5] bg-ivory-deep" aria-hidden="true" />
              <p className="mt-3 text-sm text-slate">Photo to come.</p>
            </div>
            <div className="md:col-span-8">
              <p className="eyebrow">Your instructor</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tighter text-blue md:text-5xl">
                Founder and lead instructor
              </h2>
              <div className="prose-fb mt-6 max-w-prose text-lg text-ink/85">
                <p>
                  Every consultation and, for now, every lesson is with the founder. A short biography, credentials
                  and a photograph go here once the client confirms them.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
