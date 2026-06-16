from PIL import Image, ImageChops
import os

SRC = r"C:/Users/Jerwin/Downloads/Minimalist_letter_A_logo_202606170022.jpeg"
ROOT = os.path.join(os.path.dirname(__file__), "..")
PUB = os.path.join(ROOT, "public")
APP = os.path.join(ROOT, "src", "app")

# 1. Load and build an alpha channel that drops the white background.
src = Image.open(SRC).convert("RGB")
r, g, b = src.split()
mn = ImageChops.darker(ImageChops.darker(r, g), b)  # 255 on white, low on ink
# Soft alpha for clean edges: <=210 opaque, >=240 transparent, feather between.
alpha = mn.point(lambda v: 0 if v >= 240 else (255 if v <= 210 else int((240 - v) * 255 // 30)))
rgba = src.convert("RGBA")
rgba.putalpha(alpha)

# 2. Trim using a HARD mask of only the solid ink, so faint JPEG noise near
#    the corners cannot inflate the bounding box and shift the mark off-centre.
mask = mn.point(lambda v: 255 if v < 215 else 0)
bbox = mask.getbbox()
mark = rgba.crop(bbox)


def square(img, margin_frac, bg=None):
    w, h = img.size
    side = max(w, h)
    pad = int(round(side * margin_frac))
    size = side + 2 * pad
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0) if bg is None else bg)
    canvas.paste(img, ((size - w) // 2, (size - h) // 2), img)
    return canvas


def save_png(img, path, size, bg=None):
    out = square(mark, 0, None)  # placeholder, replaced below
    out = img
    out = out.resize((size, size), Image.LANCZOS)
    if bg is not None:
        flat = Image.new("RGB", out.size, bg[:3])
        flat.paste(out, (0, 0), out)
        flat.save(path, "PNG")
    else:
        out.save(path, "PNG")
    print("wrote", os.path.relpath(path, ROOT), f"{size}x{size}")


WHITE = (255, 255, 255, 255)

# Transparent logo mark for header / footer.
save_png(square(mark, 0.06), os.path.join(PUB, "logo-mark.png"), 512)

# Favicon (transparent, a little more padding so it reads small).
save_png(square(mark, 0.10), os.path.join(APP, "icon.png"), 256)

# Apple touch icon (opaque white background, generous safe-zone padding).
save_png(square(mark, 0.16), os.path.join(APP, "apple-icon.png"), 180, bg=WHITE)

# PWA / manifest icons (opaque white, maskable-safe padding).
save_png(square(mark, 0.20), os.path.join(PUB, "icon-192.png"), 192, bg=WHITE)
save_png(square(mark, 0.20), os.path.join(PUB, "icon-512.png"), 512, bg=WHITE)
