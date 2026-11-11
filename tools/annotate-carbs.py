"""One-shot: draw circles and notes on Enzo's 10 Nov 2026 carb photos."""
from PIL import Image, ImageDraw, ImageFont, ImageOps
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public" / "img" / "carb-now"
FONT = r"C:\Windows\Fonts\segoeui.ttf"
FONTB = r"C:\Windows\Fonts\segoeuib.ttf"

YELLOW = (255, 214, 70)
ORANGE = (232, 130, 70)
CYAN = (120, 210, 230)
RED = (220, 70, 55)
WHITE = (245, 240, 228)
BLACK = (12, 14, 12)
PANEL = (22, 26, 22)


def load(name):
    im = ImageOps.exif_transpose(Image.open(ROOT / name)).convert("RGB")
    return im.resize((im.width * 4, im.height * 4), Image.Resampling.LANCZOS)


def font(size, bold=False):
    return ImageFont.truetype(FONTB if bold else FONT, size)


def ring(d, xy, r, color, width=7):
    x, y = xy
    d.ellipse((x - r - 3, y - r - 3, x + r + 3, y + r + 3), outline=BLACK, width=width + 4)
    d.ellipse((x - r, y - r, x + r, y + r), outline=color, width=width)


def badge(d, xy, letter, color):
    x, y = xy
    r = 22
    d.ellipse((x - r - 2, y - r - 2, x + r + 2, y + r + 2), fill=BLACK)
    d.ellipse((x - r, y - r, x + r, y + r), fill=color)
    f = font(28, True)
    box = d.textbbox((0, 0), letter, font=f)
    tw, th = box[2] - box[0], box[3] - box[1]
    d.text((x - tw / 2 - 1, y - th / 2 - 6), letter, font=f, fill=BLACK)


def leader(d, start, end, color):
    d.line((start, end), fill=BLACK, width=6)
    d.line((start, end), fill=color, width=3)


def notes_panel(h, lines):
    w = 420
    panel = Image.new("RGB", (w, h), PANEL)
    d = ImageDraw.Draw(panel)
    y = 28
    d.text((24, y), "Your photo.", font=font(28, True), fill=WHITE)
    y += 36
    d.text((24, y), "Circles sit on the real parts.", font=font(18), fill=(180, 186, 176))
    y += 40
    for letter, color, title, body in lines:
        badge(d, (46, y + 18), letter, color)
        d.text((78, y), title, font=font(20, True), fill=color)
        y += 30
        for line in body:
            d.text((78, y), line, font=font(16), fill=WHITE)
            y += 22
        y += 16
    return panel


def compose(photo, lines):
    panel = notes_panel(photo.height, lines)
    out = Image.new("RGB", (photo.width + panel.width, photo.height), PANEL)
    out.paste(photo, (0, 0))
    out.paste(panel, (photo.width, 0))
    return out


NOTES = [
    ("A", YELLOW, "MIXTURE  (fuel)", [
        "Spring screw on the SIDE.",
        "In = leaner. Out = richer.",
        "This car held at 1-3/4 out.",
        "Leave it there for now.",
        "Not a hex. Not the zip-tie.",
    ]),
    ("B", ORANGE, "CHOKE", [
        "The big red LEVER on",
        "the carb. Not the long bar.",
        "Up to start.",
        "Down once it is running.",
    ]),
    ("C", CYAN, "IDLE SPEED  (rpm)", [
        "Small screw on TOP by the",
        "cable. Catch = red bar twitches.",
        "Then 1/2 turn more.",
        "Last hold was about 1.5k.",
        "Lower it after the gasket.",
    ]),
    ("=", RED, "RED BAR  = throttle", [
        "The long rod tying both",
        "carbs together.",
        "There is no hanging arm.",
        "Do not look inside.",
    ]),
]


def mark_right():
    im = load("right.jpg")
    d = ImageDraw.Draw(im)
    # A mixture — spring screw on the SIDE of the body, left of the carb
    ring(d, (445, 640), 52, YELLOW)
    badge(d, (330, 560), "A", YELLOW)
    leader(d, (400, 610), (350, 560), YELLOW)
    # hex on the face is just a bolt
    ring(d, (700, 615), 26, WHITE, width=4)
    f = font(16, True)
    d.text((730, 575), "not this", font=f, fill=WHITE, stroke_width=2, stroke_fill=BLACK)
    d.text((730, 595), "just a bolt", font=f, fill=WHITE, stroke_width=2, stroke_fill=BLACK)
    # B choke — big red paddle
    ring(d, (710, 800), 78, ORANGE)
    badge(d, (860, 740), "B", ORANGE)
    leader(d, (780, 770), (840, 740), ORANGE)
    # C idle speed — small screw at the throttle on top
    ring(d, (740, 470), 44, CYAN)
    badge(d, (900, 380), "C", CYAN)
    leader(d, (780, 445), (880, 380), CYAN)
    return compose(im, NOTES)


def mark_both():
    im = load("both.jpg")
    d = ImageDraw.Draw(im)
    # red bar — the long rod on the right of the photo (top of the engine)
    d.rounded_rectangle((818, 70, 930, 1100), radius=18, outline=BLACK, width=10)
    d.rounded_rectangle((822, 74, 926, 1096), radius=16, outline=RED, width=6)
    badge(d, (870, 40), "=", RED)
    # top carb
    ring(d, (500, 300), 36, YELLOW)  # A side of body
    badge(d, (430, 250), "A", YELLOW)
    ring(d, (695, 185), 42, ORANGE)  # B red lever
    badge(d, (760, 230), "B", ORANGE)
    ring(d, (780, 145), 36, CYAN)  # C at the bar
    badge(d, (780, 85), "C", CYAN)
    # bottom carb
    ring(d, (500, 920), 36, YELLOW)  # A side of body
    badge(d, (430, 880), "A", YELLOW)
    ring(d, (690, 770), 48, ORANGE)  # B red lever
    badge(d, (760, 820), "B", ORANGE)
    ring(d, (810, 755), 36, CYAN)  # C at the bar
    badge(d, (880, 720), "C", CYAN)
    return compose(im, NOTES)


def mark_left():
    im = load("left.jpg")
    d = ImageDraw.Draw(im)
    # A mixture on this carb body
    ring(d, (560, 525), 40, YELLOW)
    badge(d, (560, 455), "A", YELLOW)
    # B choke — red lever pointing at the bar
    ring(d, (690, 400), 48, ORANGE)
    badge(d, (690, 330), "B", ORANGE)
    # C idle speed at the bar joint
    ring(d, (820, 375), 40, CYAN)
    badge(d, (900, 330), "C", CYAN)
    # red bar
    d.rounded_rectangle((860, 300, 950, 1260), radius=16, outline=BLACK, width=8)
    d.rounded_rectangle((864, 304, 946, 1256), radius=14, outline=RED, width=5)
    badge(d, (905, 270), "=", RED)
    # yellow hex is NOT a tune screw
    ring(d, (400, 545), 28, WHITE, width=4)
    f = font(16, True)
    d.text((250, 500), "not this", font=f, fill=WHITE, stroke_width=2, stroke_fill=BLACK)
    d.text((250, 522), "just a bolt", font=f, fill=WHITE, stroke_width=2, stroke_fill=BLACK)
    # other carb B at the bottom of the frame
    ring(d, (680, 1085), 42, ORANGE)
    badge(d, (760, 1120), "B", ORANGE)
    return compose(im, NOTES)


def main():
    # Save oriented originals so the browser cannot flip them.
    for name in ("right.jpg", "both.jpg", "left.jpg"):
        im = ImageOps.exif_transpose(Image.open(ROOT / name)).convert("RGB")
        im.save(ROOT / name, quality=95, exif=b"")
        print("oriented", name, im.size)

    for name, fn in (
        ("right-marked.jpg", mark_right),
        ("both-marked.jpg", mark_both),
        ("left-marked.jpg", mark_left),
    ):
        out = fn()
        out.save(ROOT / name, quality=90)
        print("wrote", name, out.size)

    for junk in ROOT.glob("*-grid.jpg"):
        junk.unlink()
        print("removed", junk.name)
    for junk in ROOT.glob("*-orient.jpg"):
        junk.unlink()
        print("removed", junk.name)


if __name__ == "__main__":
    main()
