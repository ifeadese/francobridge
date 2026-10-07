import { ServiceGlyph } from "@/app/_components/service-glyph";

// Who we help: four grey blocks. Which services suit each group is answered
// on the FAQ page.
const AUDIENCES = [
  {
    glyph: "immigrants",
    title: "Aspiring immigrants",
    text: "French-language pathways reward French. We help you meet the level they ask for, with the test score to prove it.",
  },
  {
    glyph: "newcomers",
    title: "Newcomers",
    text: "Settle in faster: French for daily life, for your first job here, and for the public service.",
  },
  {
    glyph: "students",
    title: "Students",
    text: "Meet the language requirement of a French-language college or university program, and plan your admission.",
  },
  {
    glyph: "professionals",
    title: "Professionals",
    text: "Take French into the meeting room, the interview and the presentation, with the vocabulary of your field.",
  },
] as const;

export function WhoWeHelp({ className = "section" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="container-fb">
        <h2 className="h2 mb-10 max-w-[640px]">Who do we help?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="panel bg-blue/[0.05]">
              <ServiceGlyph slug={a.glyph} className="mb-10 h-10 w-10 text-blue" />
              <div className="flex flex-1 flex-col justify-between gap-8">
                <div className="max-w-[420px]">
                  <h4 className="h4 mb-4">{a.title}</h4>
                  <p className="regular-m">{a.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoWeHelp;
