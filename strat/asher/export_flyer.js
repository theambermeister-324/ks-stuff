const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function exportFlyer() {
  const htmlFile = path.join(__dirname, 'flyer2.html');
  const outputFile = path.join(__dirname, 'flyer2.png');
  
  // Check if HTML file exists
  if (!fs.existsSync(htmlFile)) {
    console.error(`Error: ${htmlFile} not found!`);
    process.exit(1);
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set a large viewport to ensure we capture everything
    await page.setViewport({
      width: 1200,
      height: 2000,
      deviceScaleFactor: 2 // Higher DPI for better quality (2x = ~300 DPI equivalent)
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

    console.log('Capturing full flyer...');
    
    // Take full-page screenshot
    await page.screenshot({
      path: outputFile,
      type: 'png',
      fullPage: true, // Capture entire page, not just viewport
      omitBackground: false, // Include background colors
    });

    console.log(`✓ Flyer exported to: ${outputFile}`);
    
  } catch (error) {
    console.error('Error exporting flyer:', error);
    await browser.close();
    process.exit(1);
  } finally {
    await browser.close();
  }
}

exportFlyer();

