const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function resizeFlyer() {
  const inputFile = path.join(__dirname, 'flyer2.png');
  const outputFile = path.join(__dirname, 'flyer2_18x24.png');
  
  // Check if input file exists
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: ${inputFile} not found!`);
    process.exit(1);
  }

  // 18x24 inches at 300 DPI
  const widthPixels = 18 * 300;  // 5400 pixels
  const heightPixels = 24 * 300; // 7200 pixels

  console.log(`Resizing flyer to 18" × 24" at 300 DPI (${widthPixels} × ${heightPixels} pixels)...`);

  try {
    await sharp(inputFile)
      .resize(widthPixels, heightPixels, {
        fit: 'fill', // Fill the exact dimensions (may change aspect ratio)
        // Alternative: 'contain' to maintain aspect ratio with padding
        // Alternative: 'cover' to fill while maintaining aspect ratio (may crop)
      })
      .png({
        quality: 100,
        compressionLevel: 6
      })
      .toFile(outputFile);

    console.log(`✓ Resized flyer saved to: ${outputFile}`);
    console.log(`  Dimensions: ${widthPixels} × ${heightPixels} pixels`);
    console.log(`  Print size: 18" × 24" at 300 DPI`);
    
  } catch (error) {
    console.error('Error resizing flyer:', error);
    process.exit(1);
  }
}

resizeFlyer();

