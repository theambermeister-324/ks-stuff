const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function resizeTo24x36() {
  const inputFile = path.join(__dirname, 'flyer2_12x18.png');
  const outputFile = path.join(__dirname, 'flyer2_24x36_from_12x18.png');
  
  // Check if input file exists
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: ${inputFile} not found!`);
    process.exit(1);
  }

  // 24×36 inches at 300 DPI
  const widthPixels = 24 * 300;  // 7200 pixels
  const heightPixels = 36 * 300; // 10800 pixels

  console.log(`Resizing to 24" × 36" at 300 DPI (${widthPixels} × ${heightPixels} pixels)...`);

  try {
    await sharp(inputFile)
      .resize(widthPixels, heightPixels, {
        fit: 'contain', // Maintain aspect ratio with padding
        background: { r: 26, g: 47, b: 36, alpha: 1 } // Dark green #1a2f24 to match original
      })
      .png({
        quality: 100,
        compressionLevel: 6
      })
      .toFile(outputFile);

    const stats = fs.statSync(outputFile);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`✓ Resized file saved to: ${outputFile}`);
    console.log(`  Dimensions: ${widthPixels} × ${heightPixels} pixels`);
    console.log(`  Print size: 24" × 36" at 300 DPI`);
    console.log(`  File size: ${fileSizeMB} MB`);
    console.log(`  Aspect ratio: Preserved with dark green padding`);
    
  } catch (error) {
    console.error('Error resizing image:', error);
    process.exit(1);
  }
}

resizeTo24x36();

