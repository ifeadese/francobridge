// A pattern strip, from the mark: arches, dots, quarter-circles and the sun.
// Drawn as a watermark: one ink at low opacity on the banner's tint.
//
// The strip always holds a whole number of tiles and scales with its
// container, so every cell ends flush with the banner's edges. The bottom
// cells are framed by a border of one thickness on all four sides: BORDER
// units at the strip's outer edges and BORDER units between neighbours.
const INKS = {
  blue: { ink: "#0E397F", sun: "#DB2517" },
  red: { ink: "#DB2517", sun: "#0E397F" },
  yellow: { ink: "#0E397F", sun: "#DB2517" },
} as const;

const CELL = 120;
const TILE = CELL * 2;
const BORDER = 4;

function Strip({ tiles, ink, sun, className }: { tiles: number; ink: string; sun: string; className: string }) {
  const width = tiles * TILE;
  const cells = tiles * 2;
  const indexes = Array.from({ length: tiles }, (_, i) => i);
  return (
    <svg viewBox={`0 0 ${width} ${TILE}`} className={`h-auto w-full ${className}`} aria-hidden="true">
      {/* One group, one opacity: overlapping shapes never darken each other. */}
      <g fill={ink} opacity="0.12">
        {indexes.map((i) => {
          const x = i * TILE;
          return (
            <g key={i}>
              {/* top left: an arch the full width of its cell */}
              <path d={`M${x} ${CELL}V60A60 60 0 0 1 ${x + CELL} 60V${CELL}Z`} />
              {/* top right: dots, tangent to the cell edges */}
              {Array.from({ length: 25 }, (_, d) => (
                <circle key={d} cx={x + CELL + 12 + (d % 5) * 24} cy={12 + Math.floor(d / 5) * 24} r="10" />
              ))}
              {/* bottom left: a quarter-circle filling its cell */}
              <path d={`M${x} ${TILE}V${CELL}A${CELL} ${CELL} 0 0 1 ${x + CELL} ${TILE}Z`} />
            </g>
          );
        })}
        {/* the bottom row's frame: top and bottom rules, then one upright per cell edge */}
        <rect x="0" y={CELL} width={width} height={BORDER} />
        <rect x="0" y={TILE - BORDER} width={width} height={BORDER} />
        {Array.from({ length: cells + 1 }, (_, k) => {
          const x = k === 0 ? 0 : k === cells ? width - BORDER : k * CELL - BORDER / 2;
          return <rect key={k} x={x} y={CELL} width={BORDER} height={CELL} />;
        })}
      </g>
      {/* bottom right: the sun, sitting on the bottom rule between the uprights */}
      <g fill={sun} opacity="0.16">
        {indexes.map((i) => {
          const cx = i * TILE + CELL + CELL / 2;
          const r = CELL / 2 - BORDER / 2;
          const y = TILE - BORDER;
          return <path key={i} d={`M${cx - r} ${y}A${r} ${r} 0 0 1 ${cx + r} ${y}Z`} />;
        })}
      </g>
    </svg>
  );
}

export function Pattern({ way = "blue", className = "" }: { way?: keyof typeof INKS; className?: string }) {
  const { ink, sun } = INKS[way];
  return (
    <div className={className}>
      <Strip tiles={2} ink={ink} sun={sun} className="block sm:hidden" />
      <Strip tiles={4} ink={ink} sun={sun} className="hidden sm:block lg:hidden" />
      <Strip tiles={6} ink={ink} sun={sun} className="hidden lg:block" />
    </div>
  );
}

export default Pattern;
