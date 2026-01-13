const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const htmlFile = path.join(__dirname, 'ai_driven.html');
  const pdfFile = path.join(__dirname, 'ai_driven.pdf');

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
        
        /* Prevent page breaks inside slides */
        .slide {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          page-break-after: always !important;
          break-after: page !important;
        }
        
        /* Prevent page breaks inside key elements */
        .metrics-grid,
        .content-grid,
        .content-box,
        .metric-card,
        .challenge-item,
        .timeline-container,
        .timeline-year,
        .roi-chart,
        .bar-container,
        .comparison-table,
        .actions-list,
        .action-item,
        .cta-box {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Keep table rows together */
        .comparison-table thead,
        .comparison-table tbody tr {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* Ensure table headers stay with content */
        .comparison-table thead {
          display: table-header-group !important;
        }
        
        /* Keep headers with their following content */
        h1, h2, h3 {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        
        /* Prevent orphans and widows */
        p, li {
          orphans: 3;
          widows: 3;
        }
        
        /* Keep timeline years together */
        .timeline-container {
          display: flex !important;
        }
        
        /* Compact recommendation slide for PDF */
        .slide.recommendation-slide {
          padding: 24px 32px !important;
          min-height: auto !important;
        }
        .slide.recommendation-slide h3 {
          margin-bottom: 6px !important;
        }
        .slide.recommendation-slide h2 {
          font-size: 1.5rem !important;
          margin-bottom: 12px !important;
        }
        .slide.recommendation-slide .content-grid {
          gap: 12px !important;
          margin-top: 12px !important;
        }
        .slide.recommendation-slide .content-box {
          padding: 12px !important;
        }
        .slide.recommendation-slide .content-box h4 {
          font-size: 0.85rem !important;
          margin-bottom: 6px !important;
        }
        .slide.recommendation-slide .content-box p {
          font-size: 0.8rem !important;
          line-height: 1.3 !important;
        }
        .slide.recommendation-slide .actions-list {
          gap: 10px !important;
          margin-top: 12px !important;
        }
        .slide.recommendation-slide .action-item {
          padding: 12px !important;
        }
        .slide.recommendation-slide .action-item h4 {
          font-size: 0.8rem !important;
          margin-bottom: 4px !important;
        }
        .slide.recommendation-slide .action-item p {
          font-size: 0.7rem !important;
          line-height: 1.3 !important;
        }
        .slide.recommendation-slide .cta-box {
          padding: 18px !important;
          margin-top: 16px !important;
        }
        .slide.recommendation-slide .cta-box h3 {
          font-size: 1rem !important;
          margin-bottom: 6px !important;
        }
        .slide.recommendation-slide .cta-box p {
          font-size: 0.8rem !important;
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
