"""
Builds the FrancoBridge Consulting logo as vector paths, from the client's
own artwork in brand/source/.

The mark is the FB monogram: four open strokes of one weight with round caps
and round joins, an F whose top bar hairpins back into a second stem, and a
B whose two bowls are arcs of one circle size. It is redrawn here as clean
geometry measured from brand/source/francobridge-logo.jpg (4500 px), so it
scales without the raster's softness. The wordmark, "FrancoBridge" in red
over "Consulting Inc." in blue, is Avenir, which is not a free font, so it is
outlined here and never depends on a font loading: the client's two lines
are traced from the artwork, and "Inc." is set from the Avenir on macOS
(/System/Library/Fonts/Avenir.ttc), so this script runs on a Mac. The
wordmark is drawn larger against the mark than in the artwork; see
WORDMARK_SCALE.

Outputs
  src/lib/logo-paths.ts   the geometry the <Logo> component draws from
  public/brand/*.svg      lockup and mark, on white / on blue / one colour
  src/app/icon.svg        the mark on a blue rounded square

Run
  python3 -m venv .venv && .venv/bin/pip install numpy pillow potracer fonttools uharfbuzz
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
# "FrancoBridge" and "Consulting" are traced from the artwork at 3x, the red
# line and the blue line separately, the blue mask kept clear of the red
# letters' soft edges, so both keep the client's own letter-spacing. "Inc."
# is not in the artwork; it is set in Avenir Light, whose stems match
# "Consulting", from macOS's system copy, sized to the traced x-height and
# cap height and set on the traced baseline after one word space. Coordinates here are crop pixels until
# place() maps them into lockup units.
AVENIR = "/System/Library/Fonts/Avenir.ttc"
AVENIR_LIGHT = 6                 # face index in the collection: the weight of "Consulting"
TRACKING = 0.01                  # em, the spacing that best matches "Consulting"
DESCRIPTOR_TAIL = " Inc."

# How much bigger the wordmark is than in the client's artwork, against the
# mark. Its left edge keeps the artwork's gap to the mark, one stroke width;
# the two lines, cap top to baseline, are centred on the mark's height.
WORDMARK_SCALE = 1.4


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
    blue = ink & ~red_soft & (rows > split)

    def trace(mask):
        path = potrace.Bitmap(~mask).trace(turdsize=30, alphamax=1.0, opticurve=1, opttolerance=0.3)
        d = []
        for curve in path:
            p = curve.start_point
            d.append(f"M{f(p.x / s)} {f(p.y / s)}")
            for seg in curve:
                e = seg.end_point
                if seg.is_corner:
                    d.append(f"L{f(seg.c.x / s)} {f(seg.c.y / s)}L{f(e.x / s)} {f(e.y / s)}")
                else:
                    c1, c2 = seg.c1, seg.c2
                    d.append(f"C{f(c1.x / s)} {f(c1.y / s)} {f(c2.x / s)} {f(c2.y / s)} {f(e.x / s)} {f(e.y / s)}")
            d.append("Z")
        return "".join(d)

    def bbox(mask):
        ys, xs = np.where(mask)
        return (xs.min() / s, ys.min() / s, (xs.max() + 1) / s, (ys.max() + 1) / s)

    # Measurements of "Consulting", letter by letter: each letter is a run of
    # inked columns. The baseline is the foot of the "n" (the third letter;
    # the round letters overshoot it), the x-height its top, and the cap
    # height the "C" less the overshoot of its round top and bottom
    # (Avenir's is 1.5% each way).
    cols = blue.any(axis=0)
    edges = np.flatnonzero(np.diff(np.r_[0, cols.astype(int), 0]))
    letters = list(zip(edges[::2], edges[1::2]))
    assert len(letters) == len("Consulting"), letters

    def rows(i):
        return np.flatnonzero(blue[:, letters[i][0]:letters[i][1]].any(axis=1))

    n_rows, c_rows = rows(2), rows(0)
    baseline = (n_rows.max() + 1) / s
    x_height = baseline - n_rows.min() / s
    cap_height = (c_rows.max() + 1 - c_rows.min()) / s / 1.03
    return trace(red), trace(blue), bbox(red), bbox(blue), baseline, x_height, cap_height


def set_tail(blue_box, baseline, x_height, cap_height):
    """" Inc." in Avenir Light, placed after the traced "Consulting": its
    lowercase scaled to the traced x-height, the "I" to the traced cap height,
    all on the traced baseline, after the font's own gap following a "g".
    Returns the path in crop pixels and its right edge."""
    import uharfbuzz as hb
    from fontTools.ttLib import TTCollection
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen
    from fontTools.pens.boundsPen import BoundsPen

    font = TTCollection(AVENIR).fonts[AVENIR_LIGHT]
    glyphs, order, cmap = font.getGlyphSet(), font.getGlyphOrder(), font.getBestCmap()

    def bounds(name, dx=0.0):
        pen = BoundsPen(glyphs)
        glyphs[name].draw(TransformPen(pen, (1, 0, 0, 1, dx, 0)))
        return pen.bounds

    n = bounds(cmap[ord("n")])
    k = x_height / (n[3] - n[1])                               # lowercase: font units to crop pixels
    capital = bounds(cmap[ord("I")])
    k_cap = cap_height / (capital[3] - capital[1])             # the "I" is a bar; only its height changes

    text = "g" + DESCRIPTOR_TAIL
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hb.Font(hb.Face(hb.Blob.from_file_path(AVENIR), AVENIR_LIGHT)), buf, {"kern": True, "liga": False})
    placed, x = [], 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        placed.append((order[info.codepoint], x))
        x += pos.x_advance + TRACKING * 1000
    g_right = bounds(placed[0][0], placed[0][1])[2]
    origin = blue_box[2] - g_right * k                         # the font's "g" laid on the traced one
    pen, right = SVGPathPen(glyphs, ntos=f), 0.0
    for name, gx in placed[1:]:
        if name == "space":
            continue
        sy = k_cap if name == cmap[ord("I")] else k
        glyphs[name].draw(TransformPen(pen, (k, 0, 0, -sy, origin + gx * k, baseline)))
        right = max(right, origin + bounds(name, gx)[2] * k)
    return pen.getCommands(), right


def map_path(d: str, fx, fy) -> str:
    """Applies an axis-aligned map to an absolute path (M L H V C Q Z)."""
    import re
    tokens = re.findall(r"[MLHVCQZ]|-?(?:\d+\.?\d*|\.\d+)", d)
    out, i, cmd = [], 0, ""
    while i < len(tokens):
        t = tokens[i]
        if t.isalpha():
            cmd = t
            out.append(t)
            i += 1
        elif cmd == "H":
            out.append(f(fx(float(t))) + " "); i += 1
        elif cmd == "V":
            out.append(f(fy(float(t))) + " "); i += 1
        else:
            out.append(f"{f(fx(float(tokens[i])))} {f(fy(float(tokens[i + 1])))} "); i += 2
    return "".join(out).replace(" Z", "Z").replace(" M", "M").replace(" L", "L").replace(" C", "C").replace(" Q", "Q").replace(" H", "H").replace(" V", "V").strip()


WORD_SRC, DESC_SRC, WORD_SRC_BOX, DESC_SRC_BOX, BASELINE_SRC, X_HEIGHT_SRC, CAP_HEIGHT_SRC = trace_wordmark()
TAIL_SRC, DESC_SRC_RIGHT = set_tail(DESC_SRC_BOX, BASELINE_SRC, X_HEIGHT_SRC, CAP_HEIGHT_SRC)

# Crop pixels to lockup units at the artwork's size, then the enlargement
# about the wordmark's left edge and its optical centre (cap top of
# "FrancoBridge" to the baseline of "Consulting Inc.").
def to_units(x, y):
    return (x + WORD_CROP[0] - ORIGIN[0]) * SCALE, (y + WORD_CROP[1] - ORIGIN[1]) * SCALE

TEXT_LEFT = to_units(min(WORD_SRC_BOX[0], DESC_SRC_BOX[0]), 0)[0]
CAP_TOP = to_units(0, WORD_SRC_BOX[1])[1]
BASELINE = to_units(0, BASELINE_SRC)[1]
CENTRE = (CAP_TOP + BASELINE) / 2
fx = lambda x: TEXT_LEFT + (to_units(x, 0)[0] - TEXT_LEFT) * WORDMARK_SCALE
fy = lambda y: MARK_H / 2 + (to_units(0, y)[1] - CENTRE) * WORDMARK_SCALE

WORD = map_path(WORD_SRC, fx, fy)
DESCRIPTOR = map_path(DESC_SRC, fx, fy) + map_path(TAIL_SRC, fx, fy)
WORD_BOX = (fx(WORD_SRC_BOX[0]), fy(WORD_SRC_BOX[1]), fx(WORD_SRC_BOX[2]), fy(WORD_SRC_BOX[3]))
DESC_BOX = (fx(DESC_SRC_BOX[0]), fy(DESC_SRC_BOX[1]), fx(DESC_SRC_RIGHT), fy(DESC_SRC_BOX[3]))

# The lockup's box: the mark and the two lines, outer edge to outer edge.
LOCKUP_Y = min(0.0, WORD_BOX[1])
LOCKUP_W = max(WORD_BOX[2], DESC_BOX[2])
LOCKUP_H = max(MARK_H, DESC_BOX[3]) - LOCKUP_Y

MARK = {"x": 0.0, "y": 0.0, "width": MARK_W, "height": MARK_H, "stroke": MARK_STROKE, "paths": MARK_PATHS}
LOCKUP = {"x": 0.0, "y": LOCKUP_Y, "width": LOCKUP_W, "height": LOCKUP_H, "word": WORD, "descriptor": DESCRIPTOR,
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
    label = "FrancoBridge" if kind == "mark" else "FrancoBridge Consulting Inc."
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
