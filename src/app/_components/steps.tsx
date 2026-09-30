import { CONSULTATION, PACKAGES } from "@/lib/constants";

const STEPS = [
  {
    n: "01",
    title: "Book a consultation",
    text: `One hour online with your instructor, ${CONSULTATION.label.replace(" · online", "")}. We assess your French level and talk through what you need it for: an exam, a job, a study programme, a move.`,
  },
  {
    n: "02",
    title: "Get your plan",
    text: `You leave with your level on the A1 to C1 scale and a recommended programme: ${PACKAGES.join(", ")} hours, private or semi-private, all online.`,
  },
  {
    n: "03",
    title: "Start your programme",
    text: "Pay for your programme, then begin. Sessions are online, scheduled around you. Progress is measured against the level you started at.",
  },
];

// How it works, in three numbered steps.
export function Steps() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {STEPS.map((s) => (
        <li key={s.n} className="rounded-2xl border border-line bg-white p-6">
          <p className="font-heading text-4xl font-semibold text-red">{s.n}</p>
          <h3 className="mt-3 font-heading text-2xl font-semibold text-blue">{s.title}</h3>
          <p className="mt-3 text-ink/80">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export default Steps;
