const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const htmlFile = path.join(__dirname, '..', 'ipe-playbook-print.html');
  const pdfFile = path.join(__dirname, '..', 'ipe', 'ipe-playbook-print.pdf');

  if (!fs.existsSync(htmlFile)) {
    console.error(`Error: ${htmlFile} not found`);
    process.exit(1);
  }

  console.log('Generating PDF from HTML...\n');

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Use file:// protocol with absolute path
    const absolutePath = path.resolve(htmlFile);
    const fileUrl = `file://${absolutePath}`;
    
    console.log(`Loading: ${fileUrl}`);
    await page.goto(fileUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Inject CSS to prevent page breaks inside key elements
    await page.addStyleTag({
      content: `
        /* Adjust body padding for PDF */
        @media print {
          body {
            padding: 0 !important;
          }
        }
        
        /* Prevent page breaks inside key elements */
        .section,
        .card,
        .journey,
        .phase,
        .no-break,
        table,
        thead,
        tbody tr {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Keep headers with their following content */
        .section-title,
        h1, h2, h3, h4 {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        
        /* Prevent orphans and widows */
        p, li {
          orphans: 3;
          widows: 3;
        }
      `
    });

    // Wait for content to fully render
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate PDF with print-friendly settings
    console.log('Generating PDF...');
    await page.pdf({
      path: pdfFile,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.2in',
        right: '0.2in',
        bottom: '0.2in',
        left: '0.2in'
      },
      preferCSSPageSize: false
    });

    await browser.close();

    const stats = fs.statSync(pdfFile);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`✓ PDF generated successfully!`);
    console.log(`  File: ${pdfFile}`);
    console.log(`  Size: ${fileSizeMB} MB\n`);

  } catch (error) {
    console.error('Error generating PDF:', error.message);
    process.exit(1);
  }
}

generatePDF();

