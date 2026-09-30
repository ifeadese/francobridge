// A pattern strip, from the mark: arches, dots, quarter-circles and the sun.
// Drawn as a watermark: one ink at low opacity on the banner's tint.
//
// The strip always holds a whole number of tiles and scales with its
// container, so every cell ends flush with the banner's edges. The bottom
// cells are framed by hairlines drawn in CSS, not in the scaled SVG, so each
// line is exactly 1px on every side at any width: the grid carries the top
// and left lines, each cell its right and bottom.
const INKS = {
  blue: { ink: "#0E397F", sun: "#DB2517" },
  red: { ink: "#DB2517", sun: "#0E397F" },
  yellow: { ink: "#0E397F", sun: "#DB2517" },
} as const;

const CELL = 120;
const TILE = CELL * 2;

function Strip({ tiles, ink, sun, className }: { tiles: number; ink: string; sun: string; className: string }) {
  const width = tiles * TILE;
  const cells = tiles * 2;
  const indexes = Array.from({ length: tiles }, (_, i) => i);
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${width} ${TILE}`} className="block h-auto w-full">
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
        </g>
        {/* bottom right: the sun on the base line, the full width of its cell */}
        <g fill={sun} opacity="0.16">
          {indexes.map((i) => {
            const x = i * TILE + CELL;
            return <path key={i} d={`M${x} ${TILE}A60 60 0 0 1 ${x + CELL} ${TILE}Z`} />;
          })}
        </g>
      </svg>
      {/* the bottom row's hairlines */}
      <div
        className="absolute inset-x-0 bottom-0 grid h-1/2 border-l border-t opacity-20"
        style={{ gridTemplateColumns: `repeat(${cells}, minmax(0, 1fr))`, borderColor: ink }}
      >
        {Array.from({ length: cells }, (_, k) => (
          <div key={k} className="border-b border-r" style={{ borderColor: ink }} />
        ))}
      </div>
    </div>
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
