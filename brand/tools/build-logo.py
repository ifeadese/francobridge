"""
Builds the FrancoBridge Consulting logo as vector paths, from the client's
own artwork in brand/source/.

The mark is the FB monogram: four open strokes of one weight with round caps
and round joins, an F whose top bar hairpins back into a second stem, and a
B whose two bowls are arcs of one circle size. It is redrawn here as clean
geometry measured from brand/source/francobridge-logo.jpg (4500 px), so it
scales without the raster's softness. The wordmark, "FrancoBridge" in red
and "Consulting" in navy, is Avenir Next, which is not a free font, so it is
traced from the same artwork into outlines once, here, and never depends on
a font loading.

Outputs
  src/lib/logo-paths.ts   the geometry the <Logo> component draws from
  public/brand/*.svg      lockup and mark, on white / on blue / one colour
  src/app/icon.svg        the mark on a blue rounded square

Run
  python3 -m venv .venv && .venv/bin/pip install numpy pillow potracer
  .venv/bin/python brand/tools/build-logo.py
  node brand/tools/export-logo.mjs
"""
from __future__ import annotations
import json, os
import numpy as np
from PIL import Image, ImageFilter
import potrace

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SOURCE = os.path.join(ROOT, "brand", "source", "francobridge-logo.jpg")

BLUE, RED, WHITE = "#283990", "#C42040", "#FFFFFF"


def f(v: float) -> str:
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s == "-0" else s


# ---------------------------------------------------------------- the mark
# Measured on the artwork's mark, cropped at (1180, 1800) from the 4500 px
# JPEG; one unit here is one source pixel. Every stroke is 52 wide. The
# numbers are centrelines: stems at x = 70, 179.5 and 284, bars at y = 64.5,
# 160.5, 396.5, 500.5, 724.5 and 1052.5. Corners are arcs tangent to both
# lines; the two bowls of the B are arcs of a circle of radius 184.5 centred
# on x = 363.5, so the bowls meet the bars at an angle, as in the original.
STROKE = 52.0
SRC_PATHS = [
    # The outer F: left stem, top bar, hairpin, return bar, second stem.
    "M70 288V119.5A55 55 0 0 1 125 64.5H582A48 48 0 0 1 582 160.5H191.5A12 12 0 0 0 179.5 172.5V845",
    # The second bar, the upper bowl and the middle bar, back to the inner stem.
    "M70 715V427.5A31 31 0 0 1 101 396.5H419A184.5 184.5 0 0 1 467 724.5H284",
    # The lower bowl and the bottom bar.
    "M467 724.5A184.5 184.5 0 0 1 419 1052.5H281",
    # The inner stem and its short bar.
    "M393 500.5H296A12 12 0 0 0 284 512.5V968",
]
# The mark's box, outer edge to outer edge, in the crop's units.
SRC_MARK = (44.0, 38.5, 656.0, 1078.5)
# Where the crop sits in the JPEG, and where the wordmark crop sits.
MARK_CROP = (1180, 1800)
WORD_CROP = (1860, 1900, 3200, 2900)

# Lockup units: half a source pixel, origin at the mark's top-left corner.
SCALE = 0.5
ORIGIN = (MARK_CROP[0] + SRC_MARK[0], MARK_CROP[1] + SRC_MARK[1])


def to_units_x(x_jpeg: float) -> float:
    return (x_jpeg - ORIGIN[0]) * SCALE


def to_units_y(y_jpeg: float) -> float:
    return (y_jpeg - ORIGIN[1]) * SCALE


def transform_path(d: str, dx: float, dy: float) -> str:
    """Scales a path by SCALE after shifting by (dx, dy). Handles M L H V A C."""
    import re
    tokens = re.findall(r"[MLHVACZ]|-?\d+(?:\.\d+)?", d)
    out, i, cmd = [], 0, ""
    while i < len(tokens):
        t = tokens[i]
        if t.isalpha():
            cmd = t
            out.append(t)
            i += 1
            continue
        if cmd == "H":
            out.append(f((float(t) + dx) * SCALE)); i += 1
        elif cmd == "V":
            out.append(f((float(t) + dy) * SCALE)); i += 1
        elif cmd == "A":
            rx, ry, rot, la, sw, x, y = tokens[i:i + 7]
            out.append(f"{f(float(rx) * SCALE)} {f(float(ry) * SCALE)} {rot} {la} {sw} {f((float(x) + dx) * SCALE)} {f((float(y) + dy) * SCALE)}")
            i += 7
        elif cmd == "C":
            vals = [float(v) for v in tokens[i:i + 6]]
            out.append(" ".join(f"{f((vals[k] + dx) * SCALE)} {f((vals[k + 1] + dy) * SCALE)}" for k in (0, 2, 4)))
            i += 6
        else:
            out.append(f"{f((float(tokens[i]) + dx) * SCALE)} {f((float(tokens[i + 1]) + dy) * SCALE)}")
            i += 2
    s = ""
    for o in out:
        s += o if o.isalpha() else o + " "
    return s.replace(" Z", "Z").strip()


mark_dx, mark_dy = MARK_CROP[0] - ORIGIN[0], MARK_CROP[1] - ORIGIN[1]
MARK_PATHS = [transform_path(d, mark_dx, mark_dy) for d in SRC_PATHS]
MARK_W = (SRC_MARK[2] - SRC_MARK[0]) * SCALE
MARK_H = (SRC_MARK[3] - SRC_MARK[1]) * SCALE
MARK_STROKE = STROKE * SCALE

# ---------------------------------------------------------------- the wordmark
# Traced from the artwork at 3x: the red line and the navy line separately,
# the navy mask kept clear of the red letters' soft edges.
def trace_wordmark():
    im = Image.open(SOURCE).convert("RGB")
    crop = im.crop(WORD_CROP)
    s = 3
    big = crop.resize((crop.width * s, crop.height * s), Image.LANCZOS)
    a = np.asarray(big).astype(int)
    ink = a.sum(axis=2) < 560
    red = ink & (a[:, :, 0] > 120) & (a[:, :, 2] < 120)
    red_soft = np.asarray(Image.fromarray((red * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(15))) > 0
    rows = np.arange(ink.shape[0])[:, None]
    split = 520 * s  # the gap between the two lines, in crop pixels
    red &= rows < split
    navy = ink & ~red_soft & (rows > split)
    dx, dy = WORD_CROP[0] - ORIGIN[0], WORD_CROP[1] - ORIGIN[1]

    def trace(mask):
        path = potrace.Bitmap(~mask).trace(turdsize=30, alphamax=1.0, opticurve=1, opttolerance=0.3)
        d = []
        for curve in path:
            p = curve.start_point
            d.append(f"M{f((p.x / s + dx) * SCALE)} {f((p.y / s + dy) * SCALE)}")
            for seg in curve:
                e = seg.end_point
                if seg.is_corner:
                    c = seg.c
                    d.append(f"L{f((c.x / s + dx) * SCALE)} {f((c.y / s + dy) * SCALE)}L{f((e.x / s + dx) * SCALE)} {f((e.y / s + dy) * SCALE)}")
                else:
                    c1, c2 = seg.c1, seg.c2
                    d.append(
                        f"C{f((c1.x / s + dx) * SCALE)} {f((c1.y / s + dy) * SCALE)} "
                        f"{f((c2.x / s + dx) * SCALE)} {f((c2.y / s + dy) * SCALE)} "
                        f"{f((e.x / s + dx) * SCALE)} {f((e.y / s + dy) * SCALE)}"
                    )
            d.append("Z")
        return "".join(d)

    def bbox(mask):
        ys, xs = np.where(mask)
        return ((xs.min() / s + dx) * SCALE, (ys.min() / s + dy) * SCALE, (xs.max() / s + dx) * SCALE, (ys.max() / s + dy) * SCALE)

    return trace(red), trace(navy), bbox(red), bbox(navy)


WORD, DESCRIPTOR, WORD_BOX, DESC_BOX = trace_wordmark()

# The lockup's box: the mark and the two lines, outer edge to outer edge.
LOCKUP_W = max(WORD_BOX[2], DESC_BOX[2])
LOCKUP_H = max(MARK_H, DESC_BOX[3])

MARK = {"x": 0.0, "y": 0.0, "width": MARK_W, "height": MARK_H, "stroke": MARK_STROKE, "paths": MARK_PATHS}
LOCKUP = {"x": 0.0, "y": 0.0, "width": LOCKUP_W, "height": LOCKUP_H, "word": WORD, "descriptor": DESCRIPTOR,
          "wordBox": WORD_BOX, "descriptorBox": DESC_BOX}

# ---------------------------------------------------------------- outputs
def mark_svg(ink: str) -> str:
    return "".join(
        f'<path fill="none" stroke="{ink}" stroke-width="{f(MARK_STROKE)}" stroke-linecap="round" stroke-linejoin="round" d="{d}"/>'
        for d in MARK_PATHS
    )


def svg(kind: str, on: str, pad: float = 0.0) -> str:
    """kind: lockup | mark; on: white | blue | mono-blue | mono-white"""
    box = LOCKUP if kind == "lockup" else MARK
    ink = {"white": BLUE, "blue": WHITE, "mono-blue": BLUE, "mono-white": WHITE}[on]
    word = RED if on == "white" else ink
    label = "FrancoBridge" if kind == "mark" else "FrancoBridge Consulting"
    x, y, w, h = box["x"] - pad, box["y"] - pad, box["width"] + 2 * pad, box["height"] + 2 * pad
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x)} {f(y)} {f(w)} {f(h)}" width="{f(w)}" height="{f(h)}" role="img" aria-label="{label}">']
    p.append(mark_svg(ink))
    if kind == "lockup":
        p.append(f'<path fill="{word}" d="{WORD}"/>')
        p.append(f'<path fill="{ink}" d="{DESCRIPTOR}"/>')
    p.append("</svg>")
    return "\n".join(p) + "\n"


out_dir = os.path.join(ROOT, "public", "brand")
os.makedirs(out_dir, exist_ok=True)
for kind in ("lockup", "mark"):
    for on in ("white", "blue", "mono-blue", "mono-white"):
        if kind == "mark" and on.startswith("mono"):
            continue  # the mark is one colour already
        name = f"francobridge-{kind}-{on}.svg" if on.startswith("mono") else f"francobridge-{kind}-on-{on}.svg"
        with open(os.path.join(out_dir, name), "w") as fh:
            fh.write(svg(kind, on, pad=MARK_STROKE))

# The app icon: the mark in white on a blue rounded square, with room around it.
ICON = 640.0
scale = (ICON * 0.72) / MARK_H
ix, iy = (ICON - MARK_W * scale) / 2, (ICON - MARK_H * scale) / 2
icon = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(ICON)} {f(ICON)}" width="64" height="64">\n'
    f'  <rect width="{f(ICON)}" height="{f(ICON)}" rx="{f(ICON * 0.1875)}" fill="{BLUE}"/>\n'
    f'  <g transform="translate({f(ix)} {f(iy)}) scale({f(scale)})">{mark_svg(WHITE)}</g>\n'
    f'</svg>\n'
)
with open(os.path.join(ROOT, "src", "app", "icon.svg"), "w") as fh:
    fh.write(icon)


def ts_value(v) -> str:
    if isinstance(v, float):
        return f(v)
    if isinstance(v, str):
        return json.dumps(v)
    if isinstance(v, (list, tuple)):
        return "[" + ", ".join(ts_value(x) for x in v) + "]"
    raise TypeError(type(v))


def ts_obj(name: str, box: dict) -> str:
    lines = [f"export const {name} = {{"]
    for k, v in box.items():
        lines.append(f"  {k}: {ts_value(v)},")
    return "\n".join(lines) + "\n} as const;\n"


ts = (
    "// Generated by brand/tools/build-logo.py. Do not edit by hand.\n"
    "// Units: half a pixel of the client's 4500 px artwork, origin at the mark's\n"
    "// top-left corner. The mark is four open strokes, `stroke` wide, with round\n"
    "// caps and joins; the wordmark is two filled outlines traced from the artwork.\n"
    f'export const COLORS = {{ blue: "{BLUE}", red: "{RED}", white: "{WHITE}" }} as const;\n\n'
    + ts_obj("MARK", MARK) + "\n" + ts_obj("LOCKUP", LOCKUP)
)
with open(os.path.join(ROOT, "src", "lib", "logo-paths.ts"), "w") as fh:
    fh.write(ts)

print("mark", f(MARK_W), "x", f(MARK_H), "| lockup", f(LOCKUP_W), "x", f(LOCKUP_H), "| word", [f(v) for v in WORD_BOX], "| descriptor", [f(v) for v in DESC_BOX])
