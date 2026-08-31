"""Build production brand assets from the approved visual direction."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = ROOT / "public/brand"
APP_ICON = ROOT / "src/app/icon.png"

NIGHT = (20, 35, 38, 255)
IVORY = (247, 242, 235, 255)
CORAL = (223, 107, 79, 255)


def tracked_width(text: str, font: ImageFont.FreeTypeFont, tracking: int) -> int:
    widths = [font.getlength(character) for character in text]
    return round(sum(widths) + tracking * max(0, len(text) - 1))


def draw_tracked_text(
    draw: ImageDraw.ImageDraw,
    position: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    tracking: int,
    fill: tuple[int, int, int, int],
) -> None:
    x, y = position
    for character in text:
        draw.text((x, y), character, font=font, fill=fill)
        x += font.getlength(character) + tracking


def render_wordmark(color: tuple[int, int, int, int], output: Path) -> None:
    primary_font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 112)
    descriptor_font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 40)
    primary = "JACK SKEEN"
    descriptor = "EXECUTIVE COACHING"
    primary_tracking = 24
    descriptor_tracking = 18
    width = max(
        tracked_width(primary, primary_font, primary_tracking),
        tracked_width(descriptor, descriptor_font, descriptor_tracking),
    )
    canvas = Image.new("RGBA", (width + 64, 250), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    draw_tracked_text(
        draw,
        (32, 18),
        primary,
        primary_font,
        primary_tracking,
        color,
    )
    draw_tracked_text(
        draw,
        (34, 150),
        descriptor,
        descriptor_font,
        descriptor_tracking,
        color,
    )
    bbox = canvas.getbbox()
    if bbox is None:
        raise RuntimeError("Wordmark rendering produced an empty image")
    canvas.crop(bbox).save(output, optimize=True)


def render_compass_mark(line_color: tuple[int, int, int, int]) -> Image.Image:
    """Render a restrained compass mark with a single coral north point."""
    scale = 4
    canvas = Image.new("RGBA", (512 * scale, 512 * scale), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    def point(x: int, y: int) -> tuple[int, int]:
        return (x * scale, y * scale)

    ring_box = (point(91, 91), point(421, 421))
    draw.arc(ring_box, start=224, end=496, fill=line_color, width=9 * scale)

    # Quiet cardinal ticks keep the mark recognizably compass-like at small sizes.
    for start, end in (
        ((256, 77), (256, 102)),
        ((410, 256), (435, 256)),
        ((256, 410), (256, 435)),
        ((77, 256), (102, 256)),
    ):
        draw.line((point(*start), point(*end)), fill=line_color, width=9 * scale)

    # The open needle suggests orientation without mimicking a nautical emblem.
    draw.polygon(
        [point(256, 117), point(296, 264), point(256, 244), point(216, 264)],
        fill=CORAL,
    )
    draw.polygon(
        [point(256, 395), point(216, 264), point(256, 282), point(296, 264)],
        fill=line_color,
    )
    draw.ellipse((point(242, 242), point(270, 270)), fill=line_color)
    draw.ellipse((point(249, 249), point(263, 263)), fill=(0, 0, 0, 0))

    return canvas.resize((512, 512), Image.Resampling.LANCZOS)


def render_compass_svg(line_color: tuple[int, int, int, int], output: Path) -> None:
    line = f"#{line_color[0]:02x}{line_color[1]:02x}{line_color[2]:02x}"
    coral = f"#{CORAL[0]:02x}{CORAL[1]:02x}{CORAL[2]:02x}"
    output.write_text(
        f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Jack Skeen compass mark">
  <defs><mask id="center-cut"><rect width="512" height="512" fill="white"/><circle cx="256" cy="256" r="7" fill="black"/></mask></defs>
  <path d="M139.3 372.7A165 165 0 1 1 372.7 372.7" fill="none" stroke="{line}" stroke-width="9" stroke-linecap="round"/>
  <path d="M256 77v25M435 256h-25M256 435v-25M77 256h25" fill="none" stroke="{line}" stroke-width="9" stroke-linecap="round"/>
  <path d="M256 117l40 147-40-20-40 20z" fill="{coral}"/>
  <path d="M256 395l-40-131 40 18 40-18z" fill="{line}"/>
  <circle cx="256" cy="256" r="14" fill="{line}" mask="url(#center-cut)"/>
</svg>\n''',
        encoding="utf-8",
    )


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    render_wordmark(IVORY, OUTPUT_DIR / "jack-skeen-wordmark-light.png")
    render_wordmark(NIGHT, OUTPUT_DIR / "jack-skeen-wordmark-dark.png")

    light_mark = render_compass_mark(IVORY)
    dark_mark = render_compass_mark(NIGHT)
    light_mark.save(OUTPUT_DIR / "jack-skeen-mark-light.png", optimize=True)
    dark_mark.save(OUTPUT_DIR / "jack-skeen-mark-dark.png", optimize=True)
    render_compass_svg(IVORY, OUTPUT_DIR / "jack-skeen-mark-light.svg")
    render_compass_svg(NIGHT, OUTPUT_DIR / "jack-skeen-mark-dark.svg")

    favicon = Image.new("RGBA", (512, 512), NIGHT)
    favicon.alpha_composite(light_mark)
    favicon.convert("RGB").save(APP_ICON, optimize=True)


if __name__ == "__main__":
    main()
