"""
Builds the FrancoBridge placeholder logo as pure vector paths.

The mark is drawn on a 100-unit arch radius; the two text lines are shaped
with HarfBuzz and outlined from the variable fonts, so the SVGs need no fonts.

Outputs
  src/lib/logo-paths.ts   the geometry the <Logo> component draws from
  public/brand/*.svg      stacked, horizontal and mark-only, on blue / on ivory / one colour

Run
  python3 -m venv .venv && .venv/bin/pip install fonttools uharfbuzz
  .venv/bin/python brand/tools/build-logo.py
Fonts are fetched into brand/tools/fonts/ on first run.
"""
from __future__ import annotations
import os, sys, json, urllib.request
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import uharfbuzz as hb

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
FONTS = os.path.join(os.path.dirname(__file__), "fonts")
os.makedirs(FONTS, exist_ok=True)

FONT_URLS = {
    "Fraunces.ttf": "https://github.com/google/fonts/raw/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf",
    "Fredoka.ttf": "https://github.com/google/fonts/raw/main/ofl/fredoka/Fredoka%5Bwdth%2Cwght%5D.ttf",
}
for name, url in FONT_URLS.items():
    path = os.path.join(FONTS, name)
    if not os.path.exists(path):
        print("fetching", name)
        urllib.request.urlretrieve(url, path)

# ---------------------------------------------------------------- the mark
# Units: arch radius R = 100. Origin at the top-left of the deck slab.
R = 100.0
SLAB_W, SLAB_H = 292.0, 24.0          # the deck
BODY_W = 264.0                         # the abutments, edge to edge
CX = SLAB_W / 2                        # centre line
CY = SLAB_H + 106.0                    # arch centre: 6 units of stone above the arch
BASE = CY + 2.0                        # the legs end just under the centre line
MARK_W, MARK_H = SLAB_W, BASE          # 292 x 132
DOME_R = 76.0                          # the sun: band = R - DOME_R = 24 = SLAB_H
BODY_X = CX - BODY_W / 2

def f(v: float) -> str:
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s == "-0" else s

# The stone: slab + body with the arch opening cut out (even-odd is avoided by
# drawing the outline as one path that walks around the opening).
STONE = (
    f"M0 0H{f(SLAB_W)}V{f(SLAB_H)}H{f(BODY_X + BODY_W)}V{f(BASE)}"
    f"H{f(CX + R)}V{f(CY)}A{f(R)} {f(R)} 0 0 0 {f(CX - R)} {f(CY)}"
    f"V{f(BASE)}H{f(BODY_X)}V{f(SLAB_H)}H0Z"
)
# The arch band (the blue ring): a semicircle of radius R, with the dome
# removed so the layers never overprint.
BAND = (
    f"M{f(CX - R)} {f(CY)}A{f(R)} {f(R)} 0 0 1 {f(CX + R)} {f(CY)}"
    f"H{f(CX + DOME_R)}A{f(DOME_R)} {f(DOME_R)} 0 0 0 {f(CX - DOME_R)} {f(CY)}Z"
)
# The sun: a semicircle of radius DOME_R on the centre line.
DOME = f"M{f(CX - DOME_R)} {f(CY)}A{f(DOME_R)} {f(DOME_R)} 0 0 1 {f(CX + DOME_R)} {f(CY)}Z"

# ---------------------------------------------------------------- the type
def instance(path: str, axes: dict) -> TTFont:
    font = TTFont(path)
    return instancer.instantiateVariableFont(font, axes)

def shape(font: TTFont, fontfile: str, axes: dict, text: str, size: float, tracking: float = 0.0):
    """Returns (path_d, advance_width, bbox) for `text` at `size` units, baseline at y=0, x from 0."""
    upem = font["head"].unitsPerEm
    scale = size / upem
    blob = hb.Blob.from_file_path(fontfile)
    face = hb.Face(blob)
    hbfont = hb.Font(face)
    hbfont.set_variations(axes)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})
    glyph_order = font.getGlyphOrder()
    glyphs = font.getGlyphSet()
    x = 0.0
    parts = []
    bounds = BoundsPen(glyphs)
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = glyph_order[info.codepoint]
        gx = x + pos.x_offset * scale
        pen = SVGPathPen(glyphs, ntos=lambda v: f(v))
        tp = TransformPen(pen, (scale, 0, 0, -scale, gx, 0))
        glyphs[name].draw(tp)
        d = pen.getCommands()
        if d:
            parts.append(d)
        bp = TransformPen(bounds, (scale, 0, 0, -scale, gx, 0))
        glyphs[name].draw(bp)
        x += pos.x_advance * scale + tracking
    x -= tracking
    return " ".join(parts), x, bounds.bounds

def fit(fontfile, axes, text, target_w, tracking_ratio=0.0):
    """Sets the size so the outlined text is `target_w` wide."""
    font = instance(fontfile, axes)
    probe = 100.0
    d, adv, bb = shape(font, fontfile, axes, text, probe, tracking=probe * tracking_ratio)
    ink_w = bb[2] - bb[0]
    size = probe * target_w / ink_w
    d, adv, bb = shape(font, fontfile, axes, text, size, tracking=size * tracking_ratio)
    return d, bb, size

FRAUNCES = os.path.join(FONTS, "Fraunces.ttf")
FREDOKA = os.path.join(FONTS, "Fredoka.ttf")
WORD_AXES = {"wght": 650, "opsz": 144, "SOFT": 50, "WONK": 0}
DESC_AXES = {"wght": 700, "wdth": 108}

import re
TOKEN = re.compile(r"[MLCQZHV]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?")

def translate(d: str, dx: float, dy: float) -> str:
    # SVGPathPen emits absolute M L C Q Z H V, so shift x's and y's by command.
    tokens = TOKEN.findall(d)
    out, i, cmd = [], 0, "M"
    while i < len(tokens):
        t = tokens[i]
        if t in "MLCQZHV":
            cmd = t
            out.append(t); i += 1
            continue
        if cmd == "H":
            out.append(f(float(t) + dx)); i += 1
        elif cmd == "V":
            out.append(f(float(t) + dy)); i += 1
        else:
            x, y = float(tokens[i]), float(tokens[i + 1])
            out.append(f"{f(x + dx)} {f(y + dy)}"); i += 2
    s = ""
    for o in out:
        s += o if o in "MLCQZHV" else o + " "
    return s.strip()

def lockup(word_w, desc_w, word_tracking=0.0, desc_tracking=0.10):
    """Builds the two text lines with their left edge at 0 and the wordmark baseline at 0.
    Returns dict with paths, and the vertical metrics of the block."""
    wd, wbb, wsize = fit(FRAUNCES, WORD_AXES, "FrancoBridge", word_w, word_tracking)
    dd, dbb, dsize = fit(FREDOKA, DESC_AXES, "CONSULTING INC.", desc_w, desc_tracking)
    # left-align both lines on the wordmark's ink edge
    # Bounds are in SVG space already (y down): bb = (xmin, ymin, xmax, ymax).
    wd = translate(wd, -wbb[0], 0)
    ink_top = wbb[1]              # the ascenders, above the baseline
    cap_top = 0.20 * R            # from the wordmark baseline down to the descriptor's cap line
    cap_h = -dbb[1]
    dd = translate(dd, -dbb[0], cap_top + cap_h)
    block = {
        "word": wd, "desc": dd,
        "word_size": wsize, "desc_size": dsize,
        "top": ink_top, "bottom": cap_top + cap_h,   # the descriptor's baseline
        "desc_w": dbb[2] - dbb[0],
        "width": max(wbb[2] - wbb[0], dbb[2] - dbb[0]),
    }
    return block

# Stacked: the text is 258 wide, centred under the mark; baseline 48 under the base.
st = lockup(word_w=258.0, desc_w=191.0)
st_word_dx = CX - 258.0 / 2
st_desc_dx = CX - st["desc_w"] / 2
st_baseline = BASE + 48.0
STACKED = {
    "width": MARK_W,
    "height": st_baseline + st["bottom"],
    "word": translate(st["word"], st_word_dx, st_baseline),
    "desc": translate(st["desc"], st_desc_dx, st_baseline),
}

# Horizontal: mark at left, text 25 units to its right, 416 wide, centred on the mark.
hz = lockup(word_w=416.0, desc_w=318.0)
hz_text_h = hz["bottom"] - hz["top"]
hz_baseline = (MARK_H - hz_text_h) / 2 - hz["top"]
hz_x = MARK_W + 25.0
HORIZONTAL = {
    "width": hz_x + hz["width"],
    "height": MARK_H,
    "word": translate(hz["word"], hz_x, hz_baseline),
    "desc": translate(hz["desc"], hz_x, hz_baseline),
}

# ---------------------------------------------------------------- outputs
BLUE, RED, IVORY = "#0E397F", "#DB2517", "#F6F4F2"

def svg(kind: str, on: str) -> str:
    """kind: stacked | horizontal | mark; on: blue | ivory | mono-blue | mono-ivory"""
    if kind == "stacked":
        W, H, word, desc = STACKED["width"], STACKED["height"], STACKED["word"], STACKED["desc"]
    elif kind == "horizontal":
        W, H, word, desc = HORIZONTAL["width"], HORIZONTAL["height"], HORIZONTAL["word"], HORIZONTAL["desc"]
    else:
        W, H, word, desc = MARK_W, MARK_H, None, None
    if on == "blue":
        stone, band, dome, text = IVORY, BLUE, RED, IVORY
    elif on == "ivory":
        stone, band, dome, text = BLUE, IVORY, RED, BLUE
    elif on == "mono-blue":
        stone, band, dome, text = BLUE, None, BLUE, BLUE
    else:
        stone, band, dome, text = IVORY, None, IVORY, IVORY
    label = "FrancoBridge Consulting Inc." if word else "FrancoBridge"
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(W)} {f(H)}" width="{f(W)}" height="{f(H)}" role="img" aria-label="{label}">']
    parts.append(f'<path fill="{stone}" d="{STONE}"/>')
    if band:
        parts.append(f'<path fill="{band}" d="{BAND}"/>')
    parts.append(f'<path fill="{dome}" d="{DOME}"/>')
    if word:
        parts.append(f'<path fill="{text}" d="{word}"/>')
        parts.append(f'<path fill="{text}" d="{desc}"/>')
    parts.append("</svg>")
    return "\n".join(parts) + "\n"

out_dir = os.path.join(ROOT, "public", "brand")
os.makedirs(out_dir, exist_ok=True)
for kind in ("stacked", "horizontal", "mark"):
    for on in ("blue", "ivory", "mono-blue", "mono-ivory"):
        name = f"francobridge-{kind}-on-{on.replace('mono-', 'mono-')}.svg" if not on.startswith("mono") else f"francobridge-{kind}-{on}.svg"
        with open(os.path.join(out_dir, name), "w") as fh:
            fh.write(svg(kind, on))

ts = f"""// Generated by brand/tools/build-logo.py. Do not edit by hand.
// Units: the arch radius is 100. The mark is {f(MARK_W)} x {f(MARK_H)}.
export const MARK = {{
  width: {f(MARK_W)},
  height: {f(MARK_H)},
  stone: "{STONE}",
  band: "{BAND}",
  dome: "{DOME}",
}} as const;

export const STACKED = {{
  width: {f(STACKED['width'])},
  height: {f(STACKED['height'])},
  word: "{STACKED['word']}",
  descriptor: "{STACKED['desc']}",
}} as const;

export const HORIZONTAL = {{
  width: {f(HORIZONTAL['width'])},
  height: {f(HORIZONTAL['height'])},
  word: "{HORIZONTAL['word']}",
  descriptor: "{HORIZONTAL['desc']}",
}} as const;
"""
os.makedirs(os.path.join(ROOT, "src", "lib"), exist_ok=True)
with open(os.path.join(ROOT, "src", "lib", "logo-paths.ts"), "w") as fh:
    fh.write(ts)

print("stacked", STACKED["width"], round(STACKED["height"], 2), "word size", round(st["word_size"], 1), "desc size", round(st["desc_size"], 1))
print("horizontal", round(HORIZONTAL["width"], 2), HORIZONTAL["height"], "word size", round(hz["word_size"], 1), "desc size", round(hz["desc_size"], 1))
print("wrote", len(os.listdir(out_dir)), "svgs to", out_dir)
