// A pattern strip, from the mark: arches, dots, quarter-circles and the sun,
// tiled. Drawn as a watermark: one ink at low opacity on the banner's tint,
// every shape running to the edge of its cell so the strip has no frame.
const INKS = {
  blue: { ink: "#0E397F", sun: "#DB2517" },
  red: { ink: "#DB2517", sun: "#0E397F" },
  yellow: { ink: "#0E397F", sun: "#DB2517" },
} as const;

const CELL = 120;
const TILE = CELL * 2;

export function Pattern({ way = "blue", className = "" }: { way?: keyof typeof INKS; className?: string }) {
  const { ink, sun } = INKS[way];
  const id = `fb-pattern-${way}`;
  const dots = Array.from({ length: 25 }, (_, i) => ({
    cx: CELL + 12 + (i % 5) * 24,
    cy: 12 + Math.floor(i / 5) * 24,
  }));
  return (
    <svg className={`block w-full ${className}`} style={{ height: TILE }} aria-hidden="true">
      <defs>
        <pattern id={id} width={TILE} height={TILE} patternUnits="userSpaceOnUse">
          {/* top left: an arch the full width of its cell */}
          <path d={`M0 ${CELL}V60A60 60 0 0 1 ${CELL} 60V${CELL}Z`} fill={ink} opacity="0.12" />
          {/* top right: dots, tangent to the cell edges */}
          {dots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="10" fill={ink} opacity="0.12" />
          ))}
          {/* bottom left: a quarter-circle filling its cell */}
          <path d={`M0 ${TILE}V${CELL}A${CELL} ${CELL} 0 0 1 ${CELL} ${TILE}Z`} fill={ink} opacity="0.12" />
          {/* bottom right: the deck along the top edge and the sun on the base line */}
          <rect x={CELL} y={CELL} width={CELL} height="16" fill={ink} opacity="0.12" />
          <path d={`M${CELL} ${TILE}A60 60 0 0 1 ${TILE} ${TILE}Z`} fill={sun} opacity="0.16" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default Pattern;
