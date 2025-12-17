const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Poster sizes in inches (width × height)
const posterSizes = [
  { name: '12x18', width: 12, height: 18 },
  { name: '18x24', width: 18, height: 24 },
  { name: '20x30', width: 20, height: 30 },
  { name: '24x36', width: 24, height: 36 },
  { name: '24x40', width: 24, height: 40 } // Natural aspect ratio
];

const DPI = 300;

async function createAllSizes() {
  const inputFile = path.join(__dirname, 'flyer2.png');
  
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: ${inputFile} not found!`);
    process.exit(1);
  }

  console.log(`Creating poster sizes at ${DPI} DPI...\n`);

  for (const size of posterSizes) {
    const widthPixels = size.width * DPI;
    const heightPixels = size.height * DPI;
    const outputFile = path.join(__dirname, `flyer2_${size.name}.png`);

    try {
      // For 24x40, use 'fill' to match natural aspect ratio (no padding)
      // For others, use 'contain' to preserve aspect ratio with padding
      const fitMode = size.name === '24x40' ? 'fill' : 'contain';
      
      await sharp(inputFile)
        .resize(widthPixels, heightPixels, {
          fit: fitMode,
          background: { r: 26, g: 47, b: 36, alpha: 1 } // Dark green #1a2f24
        })
        .png({
          quality: 100,
          compressionLevel: 6
        })
        .toFile(outputFile);

      const stats = fs.statSync(outputFile);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

      console.log(`✓ ${size.name}" (${size.width}" × ${size.height}")`);
      console.log(`  File: flyer2_${size.name}.png`);
      console.log(`  Dimensions: ${widthPixels} × ${heightPixels} pixels`);
      console.log(`  Size: ${fileSizeMB} MB`);
      console.log(`  Fit mode: ${fitMode}\n`);
      
    } catch (error) {
      console.error(`Error creating ${size.name}:`, error.message);
    }
  }

  console.log('All poster sizes created!');
}

createAllSizes();

