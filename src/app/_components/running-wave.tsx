import cn from "classnames";

// One long wave in the manner of the client's pamphlet, a blue field with a
// gold sweep along its crest, running through a sequence of cards: each card
// shows the slice of it that falls within its own width, card after card, so
// the curve leaving one card's right edge is the curve entering the next
// card's left edge. It repeats every two cards, a crest and a trough, so a
// row reads as one continuous pattern and so does the sequence as it wraps
// from row to row or scrolls along the phone rail.
//
// The curve is a smooth periodic function: a sine with a little of its second
// harmonic, which leans the crest the way the pamphlet's does. The sweep is
// the same curve lifted by a band that swells past each crest and thins
// before the next, as the pamphlet's sliver does. Each slice is drawn as
// cubic segments through points on the curve with the curve's own tangents
// at each point, so there are no corners anywhere, and the slices meet
// exactly at the cards' edges.
const BLUE = "#283990";
const GOLD = "#D2AC66";

const W = 561.2; // a card's slice, in the units of the pamphlet's wave
// The curve rides in the top two thirds; below its lowest point the field
// runs on as solid blue, room for anything set on the wave.
const H = 230;
const STEPS = 24; // cubic segments per card

// In card units: s runs 0 to 2 over one period.
const MID = 98;
const AMPLITUDE = 40;
const LEAN = 0.22; // share of the second harmonic
const LEAN_PHASE = 0.9;
const BAND_MIN = 4;
const BAND_SWELL = 18;
const BAND_PHASE = 0.4;

const field = (s: number) => MID - AMPLITUDE * (Math.sin(Math.PI * s) + LEAN * Math.sin(2 * Math.PI * s - LEAN_PHASE));
const fieldSlope = (s: number) =>
  -AMPLITUDE * (Math.PI * Math.cos(Math.PI * s) + 2 * Math.PI * LEAN * Math.cos(2 * Math.PI * s - LEAN_PHASE));
const band = (s: number) => BAND_MIN + BAND_SWELL * (0.5 + 0.5 * Math.sin(Math.PI * s - BAND_PHASE));
const bandSlope = (s: number) => BAND_SWELL * 0.5 * Math.PI * Math.cos(Math.PI * s - BAND_PHASE);

const r = (v: number) => Math.round(v * 100) / 100;

/** The closed outline under a curve, for the slice of card `index`. */
function slice(index: number, y: (s: number) => number, dy: (s: number) => number) {
  const step = 1 / STEPS;
  const dx = W * step;
  let d = `M0 ${r(y(index))}`;
  for (let k = 0; k < STEPS; k++) {
    const s0 = index + k * step;
    const s1 = s0 + step;
    const x0 = k * dx;
    const x1 = x0 + dx;
    d += `C${r(x0 + dx / 3)} ${r(y(s0) + (dy(s0) * step) / 3)} ${r(x1 - dx / 3)} ${r(y(s1) - (dy(s1) * step) / 3)} ${r(x1)} ${r(y(s1))}`;
  }
  return `${d}V${H + 1}H0Z`;
}

const sweepY = (s: number) => field(s) - band(s);
const sweepSlope = (s: number) => fieldSlope(s) - bandSlope(s);

// The period is two cards, so there are only two slices to draw.
const SLICES = [0, 1].map((i) => ({ sweep: slice(i, sweepY, sweepSlope), field: slice(i, field, fieldSlope) }));

export function RunningWave({ index, className }: { index: number; className?: string }) {
  const { sweep, field: body } = SLICES[index % 2];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={cn("block", className)} aria-hidden="true">
      <path fill={GOLD} d={sweep} />
      <path fill={BLUE} d={body} />
    </svg>
  );
}

export default RunningWave;
