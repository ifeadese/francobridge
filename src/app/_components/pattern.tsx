// A pattern strip: arches, dots, quarter-circles and the sun, the round
// forms of the monogram's strokes. Drawn as a watermark: one brand colour
// at low opacity on white.
//
// The strip always holds a whole number of tiles and scales with its
// container, so every cell ends flush with the banner's edges. The bottom
// row carries a hairline along its top and one between neighbouring cells,
// drawn in CSS at half a CSS pixel, so each line is one device pixel on a
// high-density screen (1px on a standard one) at any width. No line on the
// left, right or bottom, where the strip meets the
// banner's edge.
//
// Each strip takes one brand colour as its ink and another for the sun.
// Gold is light, so it is drawn stronger to read at the same weight.
const BLUE = "#283990";
const GOLD = "#D2AC66";
const RED = "#C42040";
const INKS = {
  blue: { ink: BLUE, sun: RED, strength: 0.12 },
  red: { ink: RED, sun: BLUE, strength: 0.12 },
  gold: { ink: GOLD, sun: BLUE, strength: 0.3 },
} as const;
export type Ink = keyof typeof INKS;

const CELL = 120;
const TILE = CELL * 2;

function Strip({ tiles, ink, sun, strength, className }: { tiles: number; ink: string; sun: string; strength: number; className: string }) {
  const width = tiles * TILE;
  const cells = tiles * 2;
  const indexes = Array.from({ length: tiles }, (_, i) => i);
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${width} ${TILE}`} className="block h-auto w-full">
        <g fill={ink} opacity={strength}>
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
        className="absolute inset-x-0 bottom-0 grid h-1/2 border-t-[0.5px]"
        style={{ gridTemplateColumns: `repeat(${cells}, minmax(0, 1fr))`, borderColor: ink, opacity: strength }}
      >
        {Array.from({ length: cells }, (_, k) => (
          <div key={k} className={k < cells - 1 ? "border-r-[0.5px]" : undefined} style={{ borderColor: ink }} />
        ))}
      </div>
    </div>
  );
}

export function Pattern({ way = "blue", className = "", tiles }: { way?: Ink; className?: string; tiles?: number }) {
  const { ink, sun, strength } = INKS[way];
  // A fixed tile count, for a strip that sits in half a banner.
  if (tiles) return <Strip tiles={tiles} ink={ink} sun={sun} strength={strength} className={`block ${className}`} />;
  return (
    <div className={className}>
      <Strip tiles={2} ink={ink} sun={sun} strength={strength} className="block sm:hidden" />
      <Strip tiles={4} ink={ink} sun={sun} strength={strength} className="hidden sm:block lg:hidden" />
      <Strip tiles={6} ink={ink} sun={sun} strength={strength} className="hidden lg:block" />
    </div>
  );
}

export default Pattern;
