#!/usr/bin/env python3
"""
Create transparent brand assets from dark-matte source images.

Examples:
  python3 scripts/prepare_brand_asset.py \
    --source assets/new-horizontal.png \
    --mode horizontal \
    --output public/images/brand/campbell-digital-studio-horizontal-logo-transparent.png

  python3 scripts/prepare_brand_asset.py \
    --source assets/new-icon.png \
    --mode icon \
    --output public/images/brand/campbell-digital-studio-icon-transparent.png \
    --app-icon app/icon.png \
    --apple-icon app/apple-icon.png
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def knock_out_black(image: Image.Image, threshold: int, feather: int) -> Image.Image:
    """Convert near-black pixels into alpha with soft feathering."""
    img = image.convert("RGBA")
    px = img.load()
    width, height = img.size

    for y in range(height):
        for x in range(width):
            r, g, b, a = px[x, y]
            max_channel = max(r, g, b)
            if max_channel <= threshold:
                px[x, y] = (r, g, b, 0)
            elif max_channel <= threshold + feather:
                alpha = int(a * (max_channel - threshold) / feather)
                px[x, y] = (r, g, b, alpha)

    return img


def trim_alpha(image: Image.Image, pad: int) -> Image.Image:
    bbox = image.getbbox()
    if not bbox:
        return image

    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(image.width, right + pad)
    bottom = min(image.height, bottom + pad)
    return image.crop((left, top, right, bottom))


def process_horizontal(source: Path, output: Path) -> None:
    image = Image.open(source)
    image = knock_out_black(image, threshold=18, feather=28)
    image = trim_alpha(image, pad=14)
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output)


def process_icon(source: Path, output: Path, app_icon: Path | None, apple_icon: Path | None) -> None:
    image = Image.open(source)
    image = knock_out_black(image, threshold=18, feather=24)
    image = trim_alpha(image, pad=10)

    side = max(image.width, image.height)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(image, ((side - image.width) // 2, (side - image.height) // 2), image)
    brand_icon = square.resize((512, 512), Image.LANCZOS)

    output.parent.mkdir(parents=True, exist_ok=True)
    brand_icon.save(output)

    if app_icon:
        app_icon.parent.mkdir(parents=True, exist_ok=True)
        brand_icon.save(app_icon)
    if apple_icon:
        apple_icon.parent.mkdir(parents=True, exist_ok=True)
        brand_icon.save(apple_icon)


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare transparent Campbell Digital Studio brand assets.")
    parser.add_argument("--source", required=True, type=Path, help="Path to source PNG image.")
    parser.add_argument("--mode", required=True, choices=["horizontal", "icon"], help="Asset mode.")
    parser.add_argument("--output", required=True, type=Path, help="Path for transparent output PNG.")
    parser.add_argument("--app-icon", type=Path, default=None, help="Optional path for app/icon.png export.")
    parser.add_argument("--apple-icon", type=Path, default=None, help="Optional path for app/apple-icon.png export.")
    args = parser.parse_args()

    if args.mode == "horizontal":
        process_horizontal(args.source, args.output)
    else:
        process_icon(args.source, args.output, args.app_icon, args.apple_icon)

    print(f"Saved: {args.output}")
    if args.app_icon:
        print(f"Saved: {args.app_icon}")
    if args.apple_icon:
        print(f"Saved: {args.apple_icon}")


if __name__ == "__main__":
    main()
