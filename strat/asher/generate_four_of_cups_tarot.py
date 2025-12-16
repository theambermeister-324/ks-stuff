#!/usr/bin/env python3
"""
Generate a tarot card from ashergoblets_1.png
Adds "IV" at the top and "SIXTEEN OF CUPS" at the bottom
Final size: 192.5 x 332.52 pixels (aspect ratio 16.25 / 28.07)
"""

from PIL import Image, ImageDraw, ImageFont
import os

def generate_tarot_card():
    # File paths
    source_image_path = "ashergoblets_1.png"
    output_path = "four_of_cups_tarot.png"
    
    # Final card dimensions (matching tarot card spec from flyer2.html)
    # aspect-ratio: 16.25 / 28.07
    # If width is 192.5, height should be 192.5 * (28.07 / 16.25) ≈ 332.52
    card_width = int(192.5)
    card_height = int(332.52)
    
    # Load source image
    if not os.path.exists(source_image_path):
        print(f"Error: Source image '{source_image_path}' not found!")
        return
    
    source_img = Image.open(source_image_path)
    source_width, source_height = source_img.size
    
    # Create new image with card dimensions (white background)
    card = Image.new('RGB', (card_width, card_height), 'white')
    
    # Calculate scaling to fit image in card (with padding for text)
    # Leave space at top and bottom for text
    top_padding = 40
    bottom_padding = 50
    image_area_height = card_height - top_padding - bottom_padding
    
    # Calculate scale to fit image in available space
    scale_width = (card_width - 20) / source_width  # 10px padding on each side
    scale_height = image_area_height / source_height
    
    scale = min(scale_width, scale_height)
    
    # Resize source image
    new_width = int(source_width * scale)
    new_height = int(source_height * scale)
    resized_img = source_img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Calculate position to center the image
    x_offset = (card_width - new_width) // 2
    y_offset = top_padding + (image_area_height - new_height) // 2
    
    # Paste resized image onto card
    card.paste(resized_img, (x_offset, y_offset))
    
    # Add text
    draw = ImageDraw.Draw(card)
    
    # Try to use a nice font, fallback to default if not available
    try:
        # Try to use a serif font that looks good for tarot cards
        font_large = ImageFont.truetype("/System/Library/Fonts/Supplemental/Times New Roman.ttf", 32)
        font_small = ImageFont.truetype("/System/Library/Fonts/Supplemental/Times New Roman.ttf", 18)
    except:
        try:
            font_large = ImageFont.truetype("/Library/Fonts/Times New Roman.ttf", 32)
            font_small = ImageFont.truetype("/Library/Fonts/Times New Roman.ttf", 18)
        except:
            # Fallback to default font
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
    
    # Add "IV" at the top (centered)
    text_top = "IV"
    bbox = draw.textbbox((0, 0), text_top, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_x = (card_width - text_width) // 2
    draw.text((text_x, 10), text_top, fill='black', font=font_large)
    
    # Add "SIXTEEN OF CUPS" at the bottom (centered)
    text_bottom = "SIXTEEN OF CUPS"
    bbox = draw.textbbox((0, 0), text_bottom, font=font_small)
    text_width = bbox[2] - bbox[0]
    text_x = (card_width - text_width) // 2
    text_y = card_height - bottom_padding + 10
    draw.text((text_x, text_y), text_bottom, fill='black', font=font_small)
    
    # Save the result
    card.save(output_path, 'PNG')
    print(f"Tarot card generated successfully: {output_path}")
    print(f"Final dimensions: {card_width} x {card_height} pixels")

if __name__ == "__main__":
    generate_tarot_card()

