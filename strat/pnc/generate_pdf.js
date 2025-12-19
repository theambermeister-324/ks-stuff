const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const htmlFile = path.join(__dirname, 'strategic_playbook.html');
  const pdfFile = path.join(__dirname, 'strategic_playbook.pdf');

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
        
        /* Ensure investment section starts on new page */
        .investment-section {
          page-break-before: always !important;
          break-before: page !important;
        }
        
        /* Prevent page breaks inside key elements */
        .section,
        .exec-summary,
        .workstream-card,
        .year-card,
        .investment-card,
        .callout-box,
        .hopes-card,
        .doubts-card,
        .phase-item,
        .pi-card,
        table,
        thead,
        tbody tr,
        .deliverables-table tr,
        .raci-table tr,
        .risk-table tr {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Keep year banner together */
        .year-banner {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          display: flex !important;
        }
        
        /* Keep hopes/doubts grid together */
        .hopes-doubts {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Keep workstream and investment grids together */
        .workstream-grid,
        .investment-grid {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Keep PI grid together */
        .pi-grid {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Keep timeline rows together */
        .phase-row {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Keep headers with their following content */
        .section-title,
        .subsection-title {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        
        /* Prevent orphans and widows */
        p, li {
          orphans: 3;
          widows: 3;
        }
        
        /* Keep table rows together */
        .deliverables-table tbody tr,
        .raci-table tbody tr,
        .risk-table tbody tr {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Ensure table headers stay with content */
        thead {
          display: table-header-group !important;
        }
        
        tbody {
          display: table-row-group !important;
        }
      `
    });

    // Wait for content to fully render
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate PDF with print-friendly settings
    console.log('Generating PDF...');
    await page.pdf({
      path: pdfFile,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.2in',
        right: '0.2in',
        bottom: '0.01in',
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

