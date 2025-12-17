const PDFDocument = require('pdfkit');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Poster sizes in inches
const posterSizes = [
  { name: '12x18', width: 12, height: 18 },
  { name: '18x24', width: 18, height: 24 },
  { name: '20x30', width: 20, height: 30 },
  { name: '24x36', width: 24, height: 36 },
  { name: '24x40', width: 24, height: 40 }
];

// 1 inch = 72 points (PDF standard)
const INCHES_TO_POINTS = 72;

async function convertToPDF() {
  console.log('Converting PNG files to PDF format...\n');

  for (const size of posterSizes) {
    const pngFile = path.join(__dirname, `flyer2_${size.name}.png`);
    const pdfFile = path.join(__dirname, `flyer2_${size.name}.pdf`);

    if (!fs.existsSync(pngFile)) {
      console.log(`⚠ Skipping ${size.name} - PNG file not found`);
      continue;
    }

    try {
      // Get image metadata
      const metadata = await sharp(pngFile).metadata();
      
      // Create PDF with exact poster dimensions in points
      const pdfWidth = size.width * INCHES_TO_POINTS;
      const pdfHeight = size.height * INCHES_TO_POINTS;

      const doc = new PDFDocument({
        size: [pdfWidth, pdfHeight],
        margin: 0,
        compress: true
      });

      // Pipe PDF to file
      doc.pipe(fs.createWriteStream(pdfFile));

      // Add image to PDF, filling the entire page
      doc.image(pngFile, {
        fit: [pdfWidth, pdfHeight],
        align: 'center',
        valign: 'center'
      });

      // Finalize PDF
      doc.end();

      // Wait for PDF to be written
      await new Promise((resolve, reject) => {
        doc.on('end', () => {
          const stats = fs.statSync(pdfFile);
          const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
          console.log(`✓ ${size.name}" PDF created`);
          console.log(`  File: flyer2_${size.name}.pdf`);
          console.log(`  Dimensions: ${size.width}" × ${size.height}" (${Math.round(pdfWidth)} × ${Math.round(pdfHeight)} points)`);
          console.log(`  Size: ${fileSizeMB} MB\n`);
          resolve();
        });
        doc.on('error', reject);
      });

    } catch (error) {
      console.error(`Error converting ${size.name} to PDF:`, error.message);
    }
  }

  console.log('All PDF conversions complete!');
}

convertToPDF();

