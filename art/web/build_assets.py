"""Export lightweight Ayo artwork. Requires Pillow with WebP support."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
ART = ROOT.parent
LANCZOS = Image.Resampling.LANCZOS


def make_portraits():
    portrait = Image.open(ROOT / "ayo-portrait-320.png").convert("RGBA")
    portrait = portrait.crop(portrait.getbbox())
    for width in (160, 320):
        subject = portrait.copy()
        subject.thumbnail((round(width * 0.9), round(width * 0.9)), LANCZOS)
        canvas = Image.new("RGBA", (width, width))
        offset = ((width - subject.width) // 2, (width - subject.height) // 2)
        canvas.paste(subject, offset)
        canvas.save(ROOT / f"ayo-study-{width}.webp", quality=86, method=6)


def make_clip(name, loop):
    source = Image.open(ART / "clips" / f"{name}.webp")
    frames, delays = [], []
    for index in range(source.n_frames):
        source.seek(index)
        frame = source.convert("RGBA")
        frames.append(frame.resize((160, 160), LANCZOS))
        delays.append(source.info["duration"])
    target = ROOT / f"ayo-{name}-160.webp"
    frames[0].save(
        target, save_all=True, append_images=frames[1:], duration=delays,
        loop=loop, quality=76, method=5, minimize_size=True,
    )
    with Image.open(target) as encoded:
        assert encoded.n_frames == len(frames), f"{name}: frame count changed"
        assert encoded.info["loop"] == loop, f"{name}: loop setting changed"
        actual_delays = []
        for index in range(encoded.n_frames):
            encoded.seek(index)
            encoded.load()
            actual_delays.append(encoded.info["duration"])
        assert actual_delays == delays, f"{name}: timing changed"
    print(f"{name}: {len(frames)} frames, {sum(delays)} ms, {target.stat().st_size // 1024} KiB")


if __name__ == "__main__":
    make_portraits()
    make_clip("idle", 0)
    make_clip("greet", 1)
    make_clip("celebrate", 1)
