const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function exportFlyer18x24() {
  const htmlFile = path.join(__dirname, 'flyer2.html');
  const outputFile = path.join(__dirname, 'flyer2_18x24_from_html.png');
  
  // Check if HTML file exists
  if (!fs.existsSync(htmlFile)) {
    console.error(`Error: ${htmlFile} not found!`);
    process.exit(1);
  }

  // 18×24 inches at 300 DPI
  const widthPixels = 18 * 300;  // 5400 pixels
  const heightPixels = 24 * 300;  // 7200 pixels

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to exact poster dimensions at 300 DPI
    await page.setViewport({
      width: widthPixels,
      height: heightPixels,
      deviceScaleFactor: 1 // 1x since we're setting exact pixel dimensions
    });

    // Load the HTML file
    const fileUrl = `file://${htmlFile}`;
    console.log(`Loading ${fileUrl}...`);
    await page.goto(fileUrl, {
      waitUntil: 'networkidle0', // Wait for all network requests to finish
      timeout: 30000
    });

    // Wait for fonts to load
    await page.evaluateHandle(() => document.fonts.ready);
    
    // Wait a bit more for images to fully render
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`Capturing flyer at 18" × 24" (${widthPixels} × ${heightPixels} pixels)...`);
    
    // Take screenshot with exact dimensions
    await page.screenshot({
      path: outputFile,
      type: 'png',
      fullPage: false, // Use viewport size (exact dimensions)
      omitBackground: false, // Include background colors
    });

    const stats = fs.statSync(outputFile);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`✓ Flyer exported to: ${outputFile}`);
    console.log(`  Dimensions: ${widthPixels} × ${heightPixels} pixels`);
    console.log(`  Print size: 18" × 24" at 300 DPI`);
    console.log(`  File size: ${fileSizeMB} MB`);
    
  } catch (error) {
    console.error('Error exporting flyer:', error);
    await browser.close();
    process.exit(1);
  } finally {
    await browser.close();
  }
}

exportFlyer18x24();

