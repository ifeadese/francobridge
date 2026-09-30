// A pattern strip, from the mark: arches, quarter-circles and dots, tiled.
// Sits under a banner's content. Three colourways, all from the palette.
const WAYS = {
  blue: ["#0E397F", "#dbe4f3", "#DB2517", "#fffbf8"],
  red: ["#DB2517", "#fbe0dc", "#0E397F", "#fffbf8"],
  yellow: ["#0E397F", "#ffdf8b", "#DB2517", "#fffbf8"],
} as const;

export function Pattern({ way = "blue", className = "" }: { way?: keyof typeof WAYS; className?: string }) {
  const [a, b, c, d] = WAYS[way];
  const id = `fb-pattern-${way}`;
  return (
    <svg className={`block h-[244px] w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id={id} width="240" height="240" patternUnits="userSpaceOnUse">
          {/* row 1: arch on a, dots on b, quarter on c, half sun on d */}
          <rect width="120" height="120" fill={a} />
          <path d="M20 110V60A40 40 0 0 1 100 60V110Z" fill={d} />
          <rect x="120" width="120" height="120" fill={b} />
          {Array.from({ length: 16 }, (_, i) => (
            <circle key={i} cx={135 + (i % 4) * 30} cy={15 + Math.floor(i / 4) * 30} r="5" fill={a} />
          ))}
          {/* row 2 */}
          <rect y="120" width="120" height="120" fill={d} />
          <path d="M0 240V120A120 120 0 0 1 120 240Z" fill={c} />
          <rect x="120" y="120" width="120" height="120" fill={a} />
          <path d="M140 220A40 40 0 0 1 220 220Z" fill={c} />
          <rect x="140" y="140" width="80" height="14" fill={d} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default Pattern;
