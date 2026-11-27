"""Gera 3 opções de logo em SVG (texto convertido em curvas, não depende de fonte instalada)."""
import math, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logos")
F = "C:/Windows/Fonts/"
INK, BLUE, MUTE = "#111318", "#1f45f5", "#6b7079"
_c = {}
def font(n):
    if n not in _c: _c[n] = TTFont(F + n)
    return _c[n]

def text(fn, s, size, x, y, fill, track=0):
    f = font(fn); gs = f.getGlyphSet(); cm = f.getBestCmap(); upm = f["head"].unitsPerEm
    k = size / upm; cur = x; d = ""
    for ch in s:
        g = cm[ord(ch)]
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (k, 0, 0, -k, cur, y)))
        d += pen.getCommands()
        cur += gs[g].width * k + track
    return f'<path d="{d}" fill="{fill}"/>', cur - x - track

def gpath(cx, cy, r, w, color, start=40):
    a = math.radians(start)
    sx, sy = cx + r * math.cos(a), cy - r * math.sin(a)
    return (f'<path d="M{sx:.2f} {sy:.2f} A{r} {r} 0 1 0 {cx+r:.2f} {cy:.2f} H{cx+r*0.08:.2f}" '
            f'fill="none" stroke="{color}" stroke-width="{w}" stroke-linecap="butt" stroke-linejoin="miter"/>')

def svg(w, h, body, bg=None):
    r = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{r}{body}</svg>'

def save(n, s):
    open(os.path.join(OUT, n), "w", encoding="utf-8").write(s)

# ---------- Opção 1: monograma GG ----------
def icon1(dark=False):
    sq, a, b = (INK, "#fff", BLUE) if not dark else ("#fff", INK, BLUE)
    return (f'<rect width="120" height="120" rx="28" fill="{sq}"/>' +
            gpath(46, 60, 26, 9, a) + gpath(72, 60, 26, 9, b))
def lock1(dark=False):
    ink = "#fff" if dark else INK
    t1, w1 = text("segoeuib.ttf", "Gabriel Gonçalves", 46, 150, 66, ink, -1)
    t2, w2 = text("segoeui.ttf", "MARKETING DIGITAL", 16.5, 152, 98, "#9aa0ab" if dark else MUTE, 4.2)
    return f'<g>{icon1(dark)}</g>{t1}{t2}', 150 + max(w1, w2) + 10
b, w = lock1(); save("opcao-1-horizontal.svg", svg(int(w), 120, b))
b, w = lock1(True); save("opcao-1-horizontal-branco.svg", svg(int(w), 120, b, INK))
save("opcao-1-icone.svg", svg(120, 120, icon1()))

# ---------- Opção 2: tipográfica "Gabriel Gonçalves." ----------
def lock2(dark=False):
    ink = "#fff" if dark else INK
    t1, w1 = text("segoeuil.ttf", "Gabriel", 64, 0, 62, ink, -1.5)
    t2, w2 = text("segoeuib.ttf", "Gonçalves", 64, w1 + 16, 62, ink, -1.5)
    dot = f'<circle cx="{w1+16+w2+12:.1f}" cy="57" r="6.5" fill="{BLUE}"/>'
    line = f'<rect x="0" y="84" width="34" height="3" fill="{BLUE}"/>'
    t3, w3 = text("segoeui.ttf", "MARKETING DIGITAL  ·  ANÁPOLIS – GO", 15.5, 48, 90, "#9aa0ab" if dark else MUTE, 3.6)
    return t1 + t2 + dot + line + t3, max(w1 + 16 + w2 + 26, 48 + w3)
b, w = lock2(); save("opcao-2-horizontal.svg", svg(int(w), 104, b))
b, w = lock2(True); save("opcao-2-horizontal-branco.svg", svg(int(w), 104, b, INK))
def icon2(dark=False):
    ink = "#fff" if dark else INK
    t, wg = text("segoeuib.ttf", "G", 118, 0, 100, ink)
    return t + f'<circle cx="{wg+12:.1f}" cy="92" r="9" fill="{BLUE}"/>', wg + 24
b, w = icon2(); save("opcao-2-icone.svg", svg(int(w), 120, b))

# ---------- Opção 3: símbolo G + sinal (serifa elegante) ----------
def icon3(dark=False):
    ink = "#fff" if dark else INK
    return (gpath(60, 60, 44, 12, ink, 45) +
            f'<circle cx="{60+44*math.cos(math.radians(45)):.1f}" cy="{60-44*math.sin(math.radians(45)):.1f}" r="9" fill="{BLUE}"/>')
def lock3(dark=False):
    ink = "#fff" if dark else INK
    t1, w1 = text("georgiab.ttf", "Gabriel Gonçalves", 44, 140, 68, ink, 0)
    t2, w2 = text("segoeui.ttf", "MARKETING DIGITAL", 15.5, 142, 98, "#9aa0ab" if dark else MUTE, 4.2)
    return f'<g transform="translate(0,0)">{icon3(dark)}</g>{t1}{t2}', 140 + max(w1, w2) + 10
b, w = lock3(); save("opcao-3-horizontal.svg", svg(int(w), 120, b))
b, w = lock3(True); save("opcao-3-horizontal-branco.svg", svg(int(w), 120, b, INK))
save("opcao-3-icone.svg", svg(120, 120, icon3()))
print("ok")

# ---------- Logo escolhida: SÓ O NOME (sem símbolo) ----------
def nome(dark=False):
    ink = "#fff" if dark else INK
    t1, w1 = text("segoeuil.ttf", "Gabriel", 64, 2, 64, ink, -1.5)
    t2, w2 = text("segoeuib.ttf", "Gonçalves", 64, 2 + w1 + 16, 64, ink, -1.5)
    cx = 2 + w1 + 16 + w2 + 13
    dot = f'<circle cx="{cx:.1f}" cy="58.5" r="6.5" fill="{BLUE}"/>'
    return t1 + t2 + dot, cx + 9
for dark, nm in ((False, "logo-nome.svg"), (True, "logo-nome-branco.svg")):
    b, w = nome(dark)
    s = svg(int(w), 84, b)
    save(nm, s)
    open(os.path.join(os.path.dirname(OUT), "assets", nm), "w", encoding="utf-8").write(s)
print("logo-nome ok")
