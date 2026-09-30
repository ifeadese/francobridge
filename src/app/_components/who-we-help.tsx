import { InfoBlock } from "@/app/_components/info-block";

const AUDIENCES = [
  ["immigrants", "Aspiring immigrants", "French-language pathways reward French. We help you meet the level they ask for, with the test score to prove it.", "/services/tcf-tef-preparation"],
  ["newcomers", "Newcomers", "Settle in faster: French for daily life, for your first job here, and for the public service.", "/services/general-french"],
  ["students", "Students", "Meet the language requirement of a French-language college or university programme, and plan your admission.", "/services/career-pathway-guidance"],
  ["professionals", "Professionals", "Take French into the meeting room, the interview and the presentation, with the vocabulary of your field.", "/services/professional-french"],
] as const;

// Who we help: four grey blocks, each linking to the service that fits.
export function WhoWeHelp() {
  return (
    <section className="section">
      <div className="container-fb">
        <h2 className="h2 mb-14 max-w-[432px]">Who we help, and where French takes them</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {AUDIENCES.map(([glyph, title, text, href]) => (
            <InfoBlock key={title} href={href} glyph={glyph} title={title} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoWeHelp;
