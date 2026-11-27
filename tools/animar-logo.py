"""Animação do logo: "Gabriel Gonçalves." -> o G de Gonçalves apaga "abriel" para a esquerda
-> os dois G viram o símbolo GG (vetorizado da imagem enviada) + "onçalves" menor.
Saídas em logos/animacao/ (MP4 escuro/claro, PNGs finais) e logos/ (SVG vetorial).
Uso: python tools/animar-logo.py            (requer pillow, numpy, fonttools e ffmpeg no PATH)
     python tools/animar-logo.py 1.2 3.4    (só gera quadros de prévia nesses tempos)"""
import os, subprocess, math, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(RAIZ, "logos", "animacao")
LOGOS = os.path.join(RAIZ, "logos")
os.makedirs(OUT, exist_ok=True)
W, H, FPS = 1920, 1080, 60
F = "C:/Windows/Fonts/"
S = 170
F_REG, F_BOLD = F + "segoeuii.ttf", F + "segoeuiz.ttf"      # itálico regular / negrito itálico (combina com o símbolo)
REG, BOLD = ImageFont.truetype(F_REG, S), ImageFont.truetype(F_BOLD, S)
BLUE = (47, 90, 255)
THEMES = {"escuro": ((17, 19, 24), (255, 255, 255)), "claro": ((246, 245, 241), (17, 19, 24))}
SCALE_ON = 0.88

# ---- símbolo GG: polígonos vetorizados e regularizados (coordenadas da imagem original) ----
SYM_A = [(117.9, 27.5), (76.9, 27.5), (69.54, 46.5), (89.32, 47.0), (92.62, 39.5), (86.84, 39.0), (87.38, 35.5), (100.6, 35.0),
         (101.28, 38.0), (95.56, 51.0), (23.56, 51.0), (20.26, 58.5), (111.04, 59.0), (108.46, 53.5)]
SYM_B = [(24.54, 46.5), (65.54, 46.5), (73.9, 27.5), (54.12, 27.0), (50.82, 34.5), (56.6, 35.0), (56.06, 38.5), (42.84, 39.0),
         (41.28, 38.0), (48.88, 23.0), (119.88, 23.0), (123.18, 15.5), (32.4, 15.0), (34.98, 20.5)]
_X0, _Y0, _X1, _Y1 = 20.26, 15.0, 123.18, 59.0
SYM_ASPECT = (_X1 - _X0) / (_Y1 - _Y0)

def sym_norm(P, h):
    k = h / (_Y1 - _Y0)
    return [((x - _X0) * k, (y - _Y0) * k) for x, y in P]

def clamp(x): return max(0.0, min(1.0, x))
def lerp(a, b, t): return a + (b - a) * t
def e_out(t): t = clamp(t); return 1 - (1 - t) ** 3
def e_io(t): t = clamp(t); return 4 * t ** 3 if t < .5 else 1 - (-2 * t + 2) ** 3 / 2
def e_io2(t): t = clamp(t); return 2 * t * t if t < .5 else 1 - (-2 * t + 2) ** 2 / 2

class Layer:
    def __init__(self, mask, ox, oy): self.m, self.ox, self.oy = mask, ox, oy

def text_layer(s, font):
    pad = 14
    w = int(font.getlength(s)) + pad * 2 + 20
    asc, desc = font.getmetrics()
    im = Image.new("L", (w, asc + desc + pad * 2), 0)
    ImageDraw.Draw(im).text((pad, asc + pad), s, font=font, fill=255, anchor="ls")
    return Layer(im, pad, asc + pad)

G1, AB = text_layer("G", REG), text_layer("abriel", REG)
G2, ON = text_layer("G", BOLD), text_layer("onçalves", BOLD)
wG1, wAB, wSP = REG.getlength("G"), REG.getlength("abriel"), REG.getlength(" ")
wG2, wON = BOLD.getlength("G"), BOLD.getlength("onçalves")
DOT_D = S * 0.125
_dm = Image.new("L", (int(DOT_D * 4) + 24, int(DOT_D * 4) + 24), 0)
ImageDraw.Draw(_dm).ellipse([12, 12, 12 + DOT_D * 4, 12 + DOT_D * 4], fill=255)
_d = _dm.resize((_dm.width // 4, _dm.height // 4), Image.LANCZOS)
DOT = Layer(_d, 3, _d.height - 3)
CAP = S * 0.70
GAP_DOT = S * 0.035

HM = CAP * 1.18
WM = HM * SYM_ASPECT
def make_symbol():
    k = 4; w, h = int(WM * k) + 8, int(HM * k) + 8
    im = Image.new("L", (w, h), 0); d = ImageDraw.Draw(im)
    for P in (SYM_A, SYM_B):
        d.polygon([(x * k + 4, y * k + 4) for x, y in sym_norm(P, HM)], fill=255)
    return Layer(im.resize((w // k, h // k), Image.LANCZOS), 1, 1)
MARK = make_symbol()

BASE_Y = H / 2 + CAP / 2
totA = wG1 + wAB + wSP + wG2 + wON + GAP_DOT + DOT_D
x0A = (W - totA) / 2
xG2A = x0A + wG1 + wAB + wSP
GAPGG = -S * 0.04
totS = wG1 + GAPGG + wG2 + wON + GAP_DOT + DOT_D
x0S = (W - totS) / 2
xG2S = x0S + wG1 + GAPGG
GAPM = S * 0.14
totB = WM + GAPM + wON * SCALE_ON + GAP_DOT * SCALE_ON + DOT_D * SCALE_ON
x0B = (W - totB) / 2
xONB = x0B + WM + GAPM
cS = x0S + (wG1 + GAPGG + wG2) / 2
cB = x0B + WM / 2

def put(canvas, L, x, y, sc, color, op=1.0, clip_x=None, soft=26):
    if op <= 0.002: return
    w, h = L.m.size
    bx0, by0 = int(math.floor(x - L.ox * sc)) - 1, int(math.floor(y - L.oy * sc)) - 1
    rw, rh = int(math.ceil(w * sc)) + 3, int(math.ceil(h * sc)) + 3
    m = L.m.transform((rw, rh), Image.AFFINE,
                      (1 / sc, 0, (bx0 - x) / sc + L.ox, 0, 1 / sc, (by0 - y) / sc + L.oy), Image.BICUBIC)
    a = np.asarray(m, dtype=np.float32) * op
    if clip_x is not None:
        xs = np.arange(bx0, bx0 + rw, dtype=np.float32)
        a = a * np.clip((clip_x - xs) / soft, 0, 1)[None, :]
    lay = Image.new("RGBA", (rw, rh), color + (0,))
    lay.putalpha(Image.fromarray(a.astype("uint8")))
    cx0, cy0 = max(bx0, 0), max(by0, 0)
    cx1, cy1 = min(bx0 + rw, W), min(by0 + rh, H)
    if cx1 <= cx0 or cy1 <= cy0: return
    canvas.alpha_composite(lay.crop((cx0 - bx0, cy0 - by0, cx1 - bx0, cy1 - by0)), (cx0, cy0))

def frame(t, theme, transparent=False):
    bg, fg = THEMES[theme]
    cv = Image.new("RGBA", (W, H), (0, 0, 0, 0) if transparent else bg + (255,))
    a1 = e_out((t - 0.10) / 0.8); a2 = e_out((t - 0.28) / 0.8)
    r1, r2 = (1 - a1) * 26, (1 - a2) * 26
    t1 = e_io((t - 1.75) / 1.0)           # G apaga "abriel"
    t2 = e_io2((t - 3.05) / 0.95)         # GG vira símbolo
    xG1 = lerp(x0A, x0S, t1)
    xG2 = lerp(xG2A, xG2S, t1)
    sh = (cB - cS) * t2
    put(cv, AB, xG1 + wG1, BASE_Y + r1, 1, fg, a1, clip_x=xG2 - 6)
    gop = 1 - e_out(t2 * 2.6)
    put(cv, G1, xG1 + sh, BASE_Y + r1, 1, fg, a1 * gop)
    put(cv, G2, xG2 + sh, BASE_Y + r2, 1, fg, a2 * gop)
    mop = e_out((t2 - 0.12) / 0.5)
    ms = lerp(0.88, 1.0, e_out(t2))
    mcx = lerp(cS, cB, t2)
    put(cv, MARK, mcx - WM * ms / 2, BASE_Y - CAP / 2 - HM * ms / 2, ms, fg, mop)
    xON = lerp(xG2 + wG2, xONB, t2)
    sc = lerp(1, SCALE_ON, t2)
    put(cv, ON, xON, BASE_Y + r2, sc, fg, a2)
    put(cv, DOT, xON + wON * sc + GAP_DOT * sc, BASE_Y + r2, sc, BLUE, a2)
    return cv

def render_video(theme, dur=5.8):
    path = os.path.join(OUT, f"logo-animado-{theme}.mp4")
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
                          "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "slow",
                          "-crf", "14", "-pix_fmt", "yuv420p", "-movflags", "+faststart", path], stdin=subprocess.PIPE)
    for i in range(int(dur * FPS)):
        p.stdin.write(frame(i / FPS, theme).convert("RGB").tobytes())
    p.stdin.close(); p.wait()

def render_stills(theme):
    f = frame(9, theme, transparent=True)
    bb = f.getbbox(); pad = 60
    f.crop((bb[0] - pad, bb[1] - pad, bb[2] + pad, bb[3] + pad)).save(os.path.join(OUT, f"logo-final-{theme}-transparente.png"))
    frame(9, theme).convert("RGB").save(os.path.join(OUT, f"logo-final-{theme}.png"))

# ---------------- SVG vetorial (texto convertido em curvas) ----------------
def svg_text(fn, s, size, x, y, fill):
    f = TTFont(F + fn); gs = f.getGlyphSet(); cm = f.getBestCmap(); k = size / f["head"].unitsPerEm
    cur, d = x, ""
    for ch in s:
        g = cm[ord(ch)]; pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (k, 0, 0, -k, cur, y))); d += pen.getCommands(); cur += gs[g].width * k
    return f'<path d="{d}" fill="{fill}"/>', cur - x

def hexc(c): return "#%02x%02x%02x" % c

def sym_svg(h, ox, oy, fill):
    return "".join('<path d="M' + " L".join(f"{ox+x:.2f},{oy+y:.2f}" for x, y in sym_norm(P, h)) + f'Z" fill="{fill}"/>' for P in (SYM_A, SYM_B))

def write_svgs():
    for theme, (bg, fg) in THEMES.items():
        fgc = hexc(fg); nome = 'branco' if theme == 'escuro' else 'preto'
        h = 200; w = h * SYM_ASPECT
        open(os.path.join(LOGOS, f"simbolo-gg-{nome}.svg"), "w", encoding="utf-8").write(
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h}" width="{w:.0f}" height="{h}">{sym_svg(h, 0, 0, fgc)}</svg>')
        pad = 30; hs, ws = HM, WM
        base = pad + hs / 2 + CAP * SCALE_ON / 2
        t, tw = svg_text("segoeuiz.ttf", "onçalves", S * SCALE_ON, pad + ws + GAPM, base, fgc)
        dot_x = pad + ws + GAPM + tw + GAP_DOT * SCALE_ON + DOT_D * SCALE_ON / 2
        dot_y = base - DOT_D * SCALE_ON / 2
        tot_w = dot_x + DOT_D * SCALE_ON / 2 + pad
        body = sym_svg(hs, pad, pad, fgc) + t + f'<circle cx="{dot_x:.1f}" cy="{dot_y:.1f}" r="{DOT_D*SCALE_ON/2:.1f}" fill="{hexc(BLUE)}"/>'
        open(os.path.join(LOGOS, f"logo-gg-goncalves-{nome}.svg"), "w", encoding="utf-8").write(
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {tot_w:.0f} {hs+2*pad:.0f}" width="{tot_w:.0f}" height="{hs+2*pad:.0f}">{body}</svg>')

if __name__ == "__main__":
    if len(sys.argv) > 1:
        for s in sys.argv[1:]:
            frame(float(s), "escuro").convert("RGB").save(os.path.join(OUT, f"_prev_{s}.png"))
    else:
        write_svgs()
        for th in THEMES: render_stills(th); render_video(th)
        print("ok")
