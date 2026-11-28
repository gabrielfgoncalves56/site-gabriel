"""Recorta a plaquinha da foto de estúdio e monta uma simulação sobre uma mesa (gera assets/plaquinha-mesa.webp).
Uso: python tools/montar-mesa.py [caminho-da-foto]   (requer opencv-python, numpy, pillow)"""
import sys, os, numpy as np, cv2
from PIL import Image, ImageFilter

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else "D:/Cloud/_fontes-site/plaquinha-estudio.webp"
OUT = os.path.join(RAIZ, "assets", "plaquinha-mesa.webp")
rng = np.random.default_rng(7)

# ---------- 1) recorte da plaquinha da frente ----------
img = np.array(Image.open(SRC).convert("RGB"))
H, W = img.shape[:2]
poly = np.array([[104, 478], [606, 424], [650, 421], [668, 440], [766, 905], [772, 928], [752, 945], [168, 994], [152, 990], [104, 500]], np.int32)
pm = np.zeros((H, W), np.uint8); cv2.fillPoly(pm, [poly], 255)
k = lambda r: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))
fg = cv2.erode(pm, k(9)); bgm = cv2.dilate(pm, k(9))
gc = np.full((H, W), cv2.GC_BGD, np.uint8)
gc[bgm > 0] = cv2.GC_PR_BGD; gc[pm > 0] = cv2.GC_PR_FGD; gc[fg > 0] = cv2.GC_FGD
bg, fgm = np.zeros((1, 65)), np.zeros((1, 65))
cv2.grabCut(cv2.cvtColor(img, cv2.COLOR_RGB2BGR), gc, None, bg, fgm, 6, cv2.GC_INIT_WITH_MASK)
alpha = np.where((gc == cv2.GC_FGD) | (gc == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
alpha = cv2.morphologyEx(alpha, cv2.MORPH_OPEN, k(6)); alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, k(4))
alpha = cv2.bitwise_and(alpha, bgm)                       # nunca vaza além da faixa
n, lab, st, _ = cv2.connectedComponentsWithStats(alpha)   # só o maior pedaço
if n > 1: alpha = np.where(lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA]), 255, 0).astype(np.uint8)
alpha = cv2.GaussianBlur(alpha, (0, 0), 1.1)
x, y, w, h = cv2.boundingRect((alpha > 20).astype(np.uint8))
pad = 6
cut = np.dstack([img, alpha])[max(y - pad, 0):y + h + pad, max(x - pad, 0):x + w + pad]
Image.fromarray(cut).save(os.path.join(os.path.dirname(OUT), "_cut.png"))

# ---------- 2) cenário: mesa de madeira + fundo desfocado ----------
CW, CH = 1200, 1000
horizon = int(CH * 0.36)
yy, xx = np.mgrid[0:CH, 0:CW].astype(np.float32)
# fundo (loja desfocada)
bgimg = np.zeros((CH, CW, 3), np.float32)
g = (yy / CH)[..., None]
bgimg[:] = np.array([226, 220, 210], np.float32) * (1 - g) + np.array([196, 188, 176], np.float32) * g
layer = Image.fromarray(bgimg.astype(np.uint8))
from PIL import ImageDraw
d = ImageDraw.Draw(layer)
for _ in range(14):                                       # prateleiras / formas suaves
    cx, cy = rng.integers(0, CW), rng.integers(30, horizon - 20)
    ww, hh = rng.integers(90, 260), rng.integers(40, 160)
    b0 = int(rng.integers(172, 232)); col = (b0, b0 - int(rng.integers(2, 10)), b0 - int(rng.integers(8, 22)))
    d.rounded_rectangle([cx, cy, cx + ww, cy + hh], 18, fill=col)
for _ in range(16):                                       # bokeh de luzes quentes
    cx, cy, r = rng.integers(0, CW), rng.integers(10, horizon), rng.integers(14, 40)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 240, 215))
layer = layer.filter(ImageFilter.GaussianBlur(26))
scene = np.array(layer).astype(np.float32)
# madeira
tex = rng.normal(0, 1, (CH, CW)).astype(np.float32)
grain = cv2.GaussianBlur(tex, (0, 0), sigmaX=90, sigmaY=1.3)
grain2 = cv2.GaussianBlur(rng.normal(0, 1, (CH, CW)).astype(np.float32), (0, 0), sigmaX=25, sigmaY=0.8)
tone = cv2.GaussianBlur(rng.normal(0, 1, (CH, CW)).astype(np.float32), (0, 0), sigmaX=160, sigmaY=14)
gr = grain / (grain.std() + 1e-6) * 0.6 + grain2 / (grain2.std() + 1e-6) * 0.35 + tone / (tone.std() + 1e-6) * 0.8
wood = np.zeros((CH, CW, 3), np.float32)
wood[:] = np.array([168, 120, 82], np.float32)
wood += gr[..., None] * np.array([13, 11, 9], np.float32)
t = np.clip((yy - horizon) / (CH - horizon), 0, 1)[..., None]
wood *= (0.78 + 0.34 * t)                                 # mais escuro ao fundo, mais claro perto
lit = 1.0 + 0.10 * np.exp(-(((xx - CW * 0.55) / (CW * 0.55)) ** 2) - (((yy - CH * 0.72) / (CH * 0.45)) ** 2))[..., None]
wood *= lit
mask = (yy >= horizon)[..., None]
scene = np.where(mask, wood, scene)
edge = np.exp(-((yy - horizon) / 3.0) ** 2)[..., None]   # quina da mesa
scene = scene * (1 - 0.18 * edge) + 255 * 0.0
hl = np.exp(-((yy - horizon - 4) / 2.2) ** 2)[..., None]
scene = np.where(mask, scene + 24 * hl, scene)
scene = np.clip(scene, 0, 255)

# ---------- 3) coloca a plaquinha com sombras ----------
ph, pw = cut.shape[:2]
sc = 590 / pw
cutr = cv2.resize(cut, (int(pw * sc), int(ph * sc)), interpolation=cv2.INTER_AREA)
M = cv2.getRotationMatrix2D((cutr.shape[1] / 2, cutr.shape[0] / 2), 3, 1.0)
cutr = cv2.warpAffine(cutr, M, (cutr.shape[1], cutr.shape[0]), flags=cv2.INTER_CUBIC, borderValue=(0, 0, 0, 0))
px, py = (CW - cutr.shape[1]) // 2 + 10, int(CH * 0.45)
a = cutr[..., 3].astype(np.float32) / 255
def shadow(dx, dy, blur, op):
    s = np.zeros((CH, CW), np.float32)
    ys, xs = max(py + dy, 0), max(px + dx, 0)
    hh, ww = min(a.shape[0], CH - ys), min(a.shape[1], CW - xs)
    s[ys:ys + hh, xs:xs + ww] = a[:hh, :ww]
    return cv2.GaussianBlur(s, (0, 0), blur) * op
sh = np.clip(shadow(26, 42, 26, 0.38) + shadow(6, 12, 6, 0.40), 0, 0.7)
scene *= (1 - sh[..., None])
ys, xs = py, px
hh, ww = min(cutr.shape[0], CH - ys), min(cutr.shape[1], CW - xs)
reg = scene[ys:ys + hh, xs:xs + ww]
aa = a[:hh, :ww, None]
rgb = cutr[:hh, :ww, :3].astype(np.float32)
rgb = rgb * 0.97                                          # leve ajuste para casar com a luz do cenário
scene[ys:ys + hh, xs:xs + ww] = rgb * aa + reg * (1 - aa)

# ---------- 4) acabamento ----------
vig = 1 - 0.16 * (((xx - CW / 2) / (CW / 2)) ** 2 + ((yy - CH / 2) / (CH / 2)) ** 2)
scene *= vig[..., None]
scene += rng.normal(0, 2.2, scene.shape).astype(np.float32)
out = Image.fromarray(np.clip(scene, 0, 255).astype(np.uint8))
out.save(OUT, quality=88)
print("ok", OUT, os.path.getsize(OUT) // 1024, "KB")
