"""
Builds the FrancoBridge classic logo, the arch bridge with the Peace Tower,
as pure vector paths.

It redraws the client's original artwork with clean geometry: one circular
arch that passes behind the tower, hangers on an even rhythm, four piers
centred on hangers, a slimmer spire and the flag's maple leaf. Both lines of
type are outlined from Marcellus, the face of the original, so the SVGs need
no fonts.

Outputs
  public/brand/classic/francobridge-classic-{stacked,mark}-{on-ivory,on-navy,mono-navy,mono-ivory}.svg

Run
  python3 -m venv .venv && .venv/bin/pip install fonttools uharfbuzz
  .venv/bin/python brand/tools/build-classic-logo.py
Marcellus is fetched from npm (@fontsource/marcellus) into brand/tools/fonts/ on first run.
"""
from __future__ import annotations
import io, math, os, re, tarfile, urllib.request
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import uharfbuzz as hb

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
FONTS = os.path.join(os.path.dirname(__file__), "fonts")
MARCELLUS = os.path.join(FONTS, "Marcellus.ttf")
os.makedirs(FONTS, exist_ok=True)
if not os.path.exists(MARCELLUS):
    print("fetching Marcellus")
    url = "https://registry.npmjs.org/@fontsource/marcellus/-/marcellus-5.3.0.tgz"
    with tarfile.open(fileobj=io.BytesIO(urllib.request.urlopen(url).read())) as tar:
        woff = tar.extractfile("package/files/marcellus-latin-400-normal.woff").read()
    font = TTFont(io.BytesIO(woff))
    font.flavor = None
    font.save(MARCELLUS)

def f(v: float) -> str:
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s == "-0" else s

# ---------------------------------------------------------------- the mark
# Units: the deck is 860 long. Origin at the top-left of the canvas.
W = 1000.0
CX = W / 2
DECK_L, DECK_R = 70.0, 930.0
DECK_TOP, DECK_H = 420.0, 14.0

# The arch: a circular segment springing from the deck, outer edge.
SPRING = 405.0                     # half span at the deck
RISE = 200.0                       # deck top to the crown
T = 13.0                           # arch thickness
R_OUT = (SPRING ** 2 + RISE ** 2) / (2 * RISE)
R_IN = R_OUT - T
ACY = DECK_TOP - RISE + R_OUT      # arch centre, below the deck

def arch_y(r: float, x: float) -> float:
    return ACY - math.sqrt(r * r - (x - CX) ** 2)

# The tower: body, a cornice, and the spire.
TOWER_W = 84.0
TOWER_TOP = 262.0
CORNICE_W, CORNICE_H = 98.0, 7.0
SPIRE_W = 78.0
SPIRE_TIP = 56.0
GAP = 7.0                          # the air between the arch and the spire

# Hangers every 64 from the centre line; piers stand on the 2nd and 4th.
PITCH = 64.0
HANGER_W = 3.5
PIER_W, PIER_H = 40.0, 50.0
CAP_W, CAP_H = 52.0, 8.0
CAP_GAP = 3.0                      # a hairline of light under each cap

def rect(x0, y0, x1, y1) -> str:
    return f"M{f(x0)} {f(y0)}H{f(x1)}V{f(y1)}H{f(x0)}Z"

# The arch meets the spire's flanks; cut it along a line parallel to each
# flank, GAP away, so the arch reads as passing behind the tower.
spire_base = TOWER_TOP - CORNICE_H
fx, fy = SPIRE_W / 2, SPIRE_TIP - spire_base          # left flank, base to tip
flen = math.hypot(fx, fy)
nx, ny = fy / flen, -fx / flen                         # outward normal (left, up)
px, py = CX - SPIRE_W / 2 + GAP * nx, spire_base + GAP * ny

def cut_x(r: float) -> float:
    """x where the arch edge of radius r meets the offset left flank."""
    def side(x):
        y = arch_y(r, x)
        return (x - px) * fy - (y - py) * fx
    lo, hi = CX - 200, CX
    s_lo = side(lo)
    for _ in range(80):
        mid = (lo + hi) / 2
        if (side(mid) > 0) == (s_lo > 0):
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2

xo, xi = cut_x(R_OUT), cut_x(R_IN)
spring_in = math.sqrt(R_IN ** 2 - (ACY - DECK_TOP) ** 2)

def arch_half(sign: int) -> str:
    """One half of the arch band, from the deck to the tower cut."""
    def X(x):
        return CX + sign * (x - CX)
    sweep_out = 1 if sign > 0 else 0
    sweep_in = 1 - sweep_out
    return (
        f"M{f(X(CX - SPRING))} {f(DECK_TOP)}"
        f"A{f(R_OUT)} {f(R_OUT)} 0 0 {sweep_out} {f(X(xo))} {f(arch_y(R_OUT, xo))}"
        f"L{f(X(xi))} {f(arch_y(R_IN, xi))}"
        f"A{f(R_IN)} {f(R_IN)} 0 0 {sweep_in} {f(X(CX - spring_in))} {f(DECK_TOP)}Z"
    )

ARCH = arch_half(-1) + arch_half(1)

DECK = rect(DECK_L, DECK_TOP, DECK_R, DECK_TOP + DECK_H)

hangers, piers = [], []
for k in range(1, 20):
    off = k * PITCH
    if off >= spring_in:
        break
    for sign in (-1, 1):
        x = CX + sign * off
        top = arch_y(R_IN, x) - 1          # tuck under the arch
        if DECK_TOP - top < 24:
            continue
        if k in (2, 4):
            body_top = DECK_TOP - PIER_H + CAP_H + CAP_GAP
            piers.append(rect(x - PIER_W / 2, body_top, x + PIER_W / 2, DECK_TOP + 0.5))
            piers.append(rect(x - CAP_W / 2, DECK_TOP - PIER_H, x + CAP_W / 2, DECK_TOP - PIER_H + CAP_H))
            hangers.append(rect(x - HANGER_W / 2, top, x + HANGER_W / 2, DECK_TOP - PIER_H + 0.5))
        else:
            hangers.append(rect(x - HANGER_W / 2, top, x + HANGER_W / 2, DECK_TOP + 0.5))
HANGERS = "".join(hangers)
PIERS = "".join(piers)

# One outline, so the leaf can be cut out of it in the one-colour versions.
TOWER = (
    f"M{f(CX - TOWER_W / 2)} {f(DECK_TOP + 0.5)}V{f(TOWER_TOP)}H{f(CX - CORNICE_W / 2)}"
    f"V{f(spire_base)}H{f(CX - SPIRE_W / 2)}L{f(CX)} {f(SPIRE_TIP)}L{f(CX + SPIRE_W / 2)} {f(spire_base)}"
    f"H{f(CX + CORNICE_W / 2)}V{f(TOWER_TOP)}H{f(CX + TOWER_W / 2)}V{f(DECK_TOP + 0.5)}Z"
)

# The maple leaf of the national flag (relative path, leaf centred on x = 0).
LEAF_SRC = (
    "m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99"
    "a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57"
    "l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052"
    "a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79"
    "l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z"
)

def leaf(cx: float, cy: float, width: float) -> str:
    tokens = re.findall(r"[a-zA-Z]|-?\d+(?:\.\d+)?", LEAF_SRC)
    # Walk once for the bounds (arc fillets are tiny; endpoints are enough).
    pts, x, y, i, cmd = [], 0.0, 0.0, 0, None
    segs = []
    while i < len(tokens):
        t = tokens[i]
        if t.isalpha():
            cmd = t; i += 1
            if cmd == "z":
                segs.append(("z",))
            continue
        if cmd in ("m", "l"):
            dx, dy = float(tokens[i]), float(tokens[i + 1]); i += 2
            segs.append(("L" if segs else "M", dx, dy))
            if cmd == "m":
                cmd = "l"
        elif cmd == "a":
            rx, ry, rot, la, sw, dx, dy = (float(v) for v in tokens[i:i + 7]); i += 7
            segs.append(("A", rx, ry, rot, la, sw, dx, dy))
        x += segs[-1][-2]; y += segs[-1][-1]
        pts.append((x, y))
    x0, x1 = min(p[0] for p in pts), max(p[0] for p in pts)
    y0, y1 = min(p[1] for p in pts), max(p[1] for p in pts)
    s = width / (x1 - x0)
    ox, oy = cx - (x0 + x1) / 2 * s, cy - (y0 + y1) / 2 * s
    out, x, y = [], 0.0, 0.0
    for seg in segs:
        if seg[0] == "z":
            out.append("Z"); continue
        x += seg[-2]; y += seg[-1]
        ax, ay = ox + x * s, oy + y * s
        if seg[0] == "A":
            out.append(f"A{f(seg[1] * s)} {f(seg[2] * s)} 0 0 {int(seg[5])} {f(ax)} {f(ay)}")
        else:
            out.append(f"{seg[0]}{f(ax)} {f(ay)}")
    return "".join(out)

LEAF = leaf(CX, TOWER_TOP + 52, 56.0)

MARK_TOP = SPIRE_TIP
MARK_BOTTOM = DECK_TOP + DECK_H

# ---------------------------------------------------------------- the type
TOKEN = re.compile(r"[MLCQZHV]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?")

def translate(d: str, dx: float, dy: float) -> str:
    tokens = TOKEN.findall(d)
    out, i, cmd = [], 0, "M"
    while i < len(tokens):
        t = tokens[i]
        if t in "MLCQZHV":
            cmd = t; out.append(t); i += 1
            continue
        if cmd == "H":
            out.append(f(float(t) + dx)); i += 1
        elif cmd == "V":
            out.append(f(float(t) + dy)); i += 1
        else:
            out.append(f"{f(float(tokens[i]) + dx)} {f(float(tokens[i + 1]) + dy)}"); i += 2
    s = ""
    for o in out:
        s += o if o in "MLCQZHV" else o + " "
    return s.strip()

FONT = TTFont(MARCELLUS)

def shape(text: str, size: float, tracking_em: float):
    """Returns (path_d, bbox) for `text` at `size`, baseline at y = 0, x from 0."""
    scale = size / FONT["head"].unitsPerEm
    face = hb.Face(hb.Blob.from_file_path(MARCELLUS))
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hb.Font(face), buf, {"kern": True, "liga": False})
    order, glyphs = FONT.getGlyphOrder(), FONT.getGlyphSet()
    x, parts, bounds = 0.0, [], BoundsPen(glyphs)
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        pen = SVGPathPen(glyphs, ntos=f)
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, 0)))
        if pen.getCommands():
            parts.append(pen.getCommands())
        glyphs[name].draw(TransformPen(bounds, (scale, 0, 0, -scale, x, 0)))
        x += pos.x_advance * scale + size * tracking_em
    return " ".join(parts), bounds.bounds

def fit(text: str, ink_w: float, tracking_em: float):
    _, bb = shape(text, 100.0, tracking_em)
    size = 100.0 * ink_w / (bb[2] - bb[0])
    d, bb = shape(text, size, tracking_em)
    return translate(d, -bb[0], 0), bb[2] - bb[0], -bb[1]   # path, ink width, cap height

# The name spans the deck; the descriptor sits between two hairlines.
WORD, word_w, word_cap = fit("FRANCOBRIDGE", DECK_R - DECK_L, 0.14)
word_base = MARK_BOTTOM + 44 + word_cap
WORD = translate(WORD, DECK_L, word_base)

DESC, desc_w, desc_cap = fit("CONSULTING INC.", 390.0, 0.38)
desc_base = word_base + 34 + desc_cap
desc_x = CX - desc_w / 2
DESC = translate(DESC, desc_x, desc_base)
RULE_H, RULE_GAP = 2.0, 26.0
rule_y = desc_base - desc_cap / 2 - RULE_H / 2
RULES = (
    rect(DECK_L, rule_y, desc_x - RULE_GAP, rule_y + RULE_H)
    + rect(desc_x + desc_w + RULE_GAP, rule_y, DECK_R, rule_y + RULE_H)
)

# ---------------------------------------------------------------- outputs
NAVY, RED, IVORY = "#1B2556", "#D52B1E", "#F7F5F0"
PAD = 40.0

def svg(kind: str, on: str) -> str:
    ink = {"on-ivory": NAVY, "on-navy": IVORY, "mono-navy": NAVY, "mono-ivory": IVORY}[on]
    red = RED if on in ("on-ivory", "on-navy") else None
    top = MARK_TOP - PAD
    if kind == "stacked":
        bottom = desc_base + PAD
        x0, w = DECK_L - PAD, DECK_R - DECK_L + 2 * PAD
    else:
        bottom = MARK_BOTTOM + PAD
        x0, w = DECK_L - PAD, DECK_R - DECK_L + 2 * PAD
    h = bottom - top
    label = "FrancoBridge Consulting Inc." if kind == "stacked" else "FrancoBridge"
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x0)} {f(top)} {f(w)} {f(h)}" width="{f(w)}" height="{f(h)}" role="img" aria-label="{label}">']
    if on == "on-navy":
        p.append(f'<rect x="{f(x0)}" y="{f(top)}" width="{f(w)}" height="{f(h)}" fill="{NAVY}"/>')
    p.append(f'<path fill="{ink}" d="{ARCH}"/>')
    p.append(f'<path fill="{ink}" d="{HANGERS}{DECK}{PIERS}"/>')
    if red:
        p.append(f'<path fill="{ink}" fill-rule="evenodd" d="{TOWER}"/>')
        p.append(f'<path fill="{red}" d="{LEAF}"/>')
    else:
        # One colour: the leaf is cut out of the tower.
        p.append(f'<path fill="{ink}" fill-rule="evenodd" d="{TOWER}{LEAF}"/>')
    if kind == "stacked":
        p.append(f'<path fill="{ink}" d="{WORD}"/>')
        p.append(f'<path fill="{ink}" d="{RULES}{DESC}"/>')
    p.append("</svg>")
    return "\n".join(p) + "\n"

out_dir = os.path.join(ROOT, "public", "brand", "classic")
os.makedirs(out_dir, exist_ok=True)
for kind in ("stacked", "mark"):
    for on in ("on-ivory", "on-navy", "mono-navy", "mono-ivory"):
        with open(os.path.join(out_dir, f"francobridge-classic-{kind}-{on}.svg"), "w") as fh:
            fh.write(svg(kind, on))
print("arch radius", round(R_OUT, 1), "word cap", round(word_cap, 1), "desc cap", round(desc_cap, 1))
print("wrote", len(os.listdir(out_dir)), "svgs to", out_dir)
