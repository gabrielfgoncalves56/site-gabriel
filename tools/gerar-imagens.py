"""Gera as imagens de compartilhamento (WhatsApp/Instagram) e o ícone do iPhone.
Uso:  python tools/gerar-imagens.py
Requer: pip install pillow
Se existir assets/gabriel.jpg, a foto entra na imagem do cartão automaticamente."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(RAIZ, "assets")
BG, INK, MUTE, LINE, ACC = (246, 245, 241), (17, 19, 24), (110, 115, 124), (227, 225, 218), (31, 69, 245)

def fonte(bold, size):
    for n in (["segoeuib.ttf", "arialbd.ttf"] if bold else ["segoeui.ttf", "arial.ttf"]):
        for base in ("C:/Windows/Fonts/", "/usr/share/fonts/truetype/dejavu/", ""):
            try:
                return ImageFont.truetype(base + n, size)
            except OSError:
                pass
    return ImageFont.load_default()

def grade(d, w, h):
    for x in range(0, w, 60):
        d.line([(x, 0), (x, h)], fill=(236, 234, 228))
    for y in range(0, h, 60):
        d.line([(0, y), (w, y)], fill=(236, 234, 228))

def og(nome_arquivo, titulo, linhas, rotulo):
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    grade(d, W, H)
    d.rectangle([0, 0, W, H], outline=LINE, width=2)
    # marca (só o nome)
    fl, fb = fonte(False, 54), fonte(True, 54)
    fl = ImageFont.truetype("C:/Windows/Fonts/segoeuil.ttf", 54) if os.path.exists("C:/Windows/Fonts/segoeuil.ttf") else fl
    wl = d.textlength("Gabriel ", font=fl)
    d.text((80, 118), "Gabriel", font=fl, fill=INK, anchor="ls")
    d.text((80 + wl, 118), "Gonçalves", font=fb, fill=INK, anchor="ls")
    d.ellipse([80 + wl + d.textlength("Gonçalves", font=fb) + 6, 106, 80 + wl + d.textlength("Gonçalves", font=fb) + 18, 118], fill=ACC)
    # título
    y = 200
    for ln in titulo:
        d.text((80, y), ln, font=fonte(True, 74), fill=INK)
        y += 88
    y += 14
    for ln in linhas:
        d.text((80, y), ln, font=fonte(False, 32), fill=MUTE)
        y += 46
    d.rectangle([80, 540, 120, 544], fill=ACC)
    d.text((140, 543), rotulo, font=fonte(True, 26), fill=ACC, anchor="lm")
    # elemento gráfico à direita
    x0 = 800
    d.rounded_rectangle([x0, 150, 1120, 400], radius=26, fill="white", outline=LINE, width=2)
    d.rounded_rectangle([x0 + 28, 178, x0 + 292, 218], radius=20, fill=BG)
    d.rounded_rectangle([x0 + 28, 250, x0 + 90, 312], radius=16, fill=INK)
    d.text((x0 + 108, 262), "Sua Empresa", font=fonte(True, 26), fill=INK)
    for i in range(5):
        cx = x0 + 118 + i * 30
        d.regular_polygon((cx, 312, 11), 5, fill=(242, 169, 0))
    d.rounded_rectangle([x0 + 28, 346, x0 + 108, 380], radius=17, fill=(233, 237, 255))
    d.rounded_rectangle([x0 + 120, 346, x0 + 200, 380], radius=17, outline=LINE, width=2)
    return im, d

def salvar_foto_se_existir(im, d):
    p = os.path.join(A, "gabriel.jpg")
    if os.path.exists(p):
        f = Image.open(p).convert("RGB")
        f = ImageOps.fit(f, (190, 190))
        m = Image.new("L", (190, 190), 0)
        ImageDraw.Draw(m).ellipse([0, 0, 190, 190], fill=255)
        im.paste(f, (930, 420), m)

# og principal
im, d = og("og-image.png", ["Sua empresa precisa", "ser encontrada."],
           ["Marketing digital e soluções de", "presença digital em Anápolis – GO"],
           "Tráfego pago · Google · Sites · NFC e QR Code")
im.save(os.path.join(A, "og-image.png"), optimize=True)

# og cartão
im, d = og("og-cartao.png", ["Cartão digital"],
           ["Marketing Digital e Soluções", "de Presença Digital · Anápolis – GO"],
           "Salve o contato e fale pelo WhatsApp")
salvar_foto_se_existir(im, d)
im.save(os.path.join(A, "og-cartao.png"), optimize=True)

# apple touch icon 180
ic = Image.new("RGB", (180, 180), INK)
d = ImageDraw.Draw(ic)
d.text((84, 94), "G", font=fonte(True, 110), fill="white", anchor="mm")
d.ellipse([118, 112, 138, 132], fill=ACC)
ic.save(os.path.join(A, "apple-touch-icon.png"), optimize=True)
print("Imagens geradas em", A)
