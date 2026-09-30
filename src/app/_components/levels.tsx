const LEVELS = [
  ["A1", "Foundation"],
  ["A2", "Elementary"],
  ["B1", "Intermediate"],
  ["B2", "Upper Intermediate"],
  ["C1", "Advanced"],
] as const;

// The five levels as a rising row of arches.
export function Levels() {
  return (
    <ol className="grid grid-cols-5 items-end gap-2 md:gap-4">
      {LEVELS.map(([code, name], i) => (
        <li key={code} className="text-center">
          <div
            className="arch mx-auto flex w-full items-end justify-center bg-blue pb-3 text-ivory"
            style={{ height: `${72 + i * 22}px` }}
          >
            <span className="font-heading text-xl font-semibold md:text-2xl">{code}</span>
          </div>
          <p className="mt-2 text-xs font-semibold text-slate md:text-sm">{name}</p>
        </li>
      ))}
    </ol>
  );
}

export default Levels;
