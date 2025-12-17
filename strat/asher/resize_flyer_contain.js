const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function resizeFlyerContain() {
  const inputFile = path.join(__dirname, 'flyer2.png');
  const outputFile = path.join(__dirname, 'flyer2_18x24_contain.png');
  
  // Check if input file exists
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: ${inputFile} not found!`);
    process.exit(1);
  }

  // 18x24 inches at 300 DPI
  const widthPixels = 18 * 300;  // 5400 pixels
  const heightPixels = 24 * 300; // 7200 pixels

  console.log(`Resizing flyer to fit within 18" × 24" at 300 DPI (${widthPixels} × ${heightPixels} pixels)...`);
  console.log(`Maintaining original aspect ratio with padding...`);

  try {
    await sharp(inputFile)
      .resize(widthPixels, heightPixels, {
        fit: 'contain', // Maintain aspect ratio, fit within dimensions
        background: { r: 26, g: 47, b: 36, alpha: 1 } // Match the dark background color (#1a2f24)
      })
      .png({
        quality: 100,
        compressionLevel: 6
      })
      .toFile(outputFile);

    console.log(`✓ Resized flyer (with aspect ratio preserved) saved to: ${outputFile}`);
    console.log(`  Dimensions: ${widthPixels} × ${heightPixels} pixels`);
    console.log(`  Print size: 18" × 24" at 300 DPI`);
    console.log(`  Background: Dark green (#1a2f24) to match original flyer`);
    
  } catch (error) {
    console.error('Error resizing flyer:', error);
    process.exit(1);
  }
}

resizeFlyerContain();

