const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const htmlFile = path.join(__dirname, 'sce_strategic_playbook.html');
  const pdfFile = path.join(__dirname, 'sce_strategic_playbook.pdf');

  if (!fs.existsSync(htmlFile)) {
    console.error(`Error: ${htmlFile} not found`);
    process.exit(1);
  }

  console.log('Generating PDF from HTML with all sections...\n');

  // All sections in order
  const allSections = [
    'exec-summary',
    'why-knapsack',
    'three-year',
    'technical',
    'ai-readiness',
    'discovery',
    'charter-overview',
    'governance',
    'roles',
    'resourcing',
    'capital',
    'metrics',
    'risk'
  ];

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
      timeout: 60000
    });

    // Wait for JavaScript to render the initial content
    await page.waitForSelector('#mainContent', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Collect all section contents
    console.log('Collecting all sections...');
    const sectionContents = [];

    for (let i = 0; i < allSections.length; i++) {
      const sectionId = allSections[i];
      console.log(`  [${i + 1}/${allSections.length}] Rendering: ${sectionId}`);
      
      // Set the active section
      await page.evaluate((id) => {
        if (typeof setSection === 'function') {
          setSection(id);
        }
      }, sectionId);

      // Wait for content to update
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the section content
      const content = await page.evaluate(() => {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
          return mainContent.innerHTML;
        }
        return '';
      });

      if (content) {
        sectionContents.push({
          id: sectionId,
          content: content
        });
      }
    }

    // Create a combined HTML document
    console.log('Creating combined HTML document...');
    const originalHTML = fs.readFileSync(htmlFile, 'utf8');
    
    // Extract the head content (styles)
    const headMatch = originalHTML.match(/<head>([\s\S]*?)<\/head>/i);
    const headContent = headMatch ? headMatch[1] : '';
    
    // Extract CSS from style tag
    const styleMatch = originalHTML.match(/<style>([\s\S]*?)<\/style>/i);
    const styleContent = styleMatch ? styleMatch[1] : '';

    // Build combined HTML
    const combinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SCE × Knapsack Strategic Playbook 2026 - Complete</title>
  <style>
    ${styleContent}
    
    /* PDF-specific overrides */
    body {
      padding: 0 !important;
      margin: 0 !important;
      background: white !important;
    }
    
    nav {
      display: none !important;
    }
    
    main {
      margin-left: 0 !important;
      padding: 28px 36px !important;
      max-width: 100% !important;
    }
    
    /* Section separators */
    .pdf-section {
      page-break-before: always;
      break-before: page;
      padding-top: 20px;
    }
    
    .pdf-section:first-child {
      page-break-before: auto;
      break-before: auto;
    }
    
    /* Prevent page breaks inside key elements */
    .card,
    .callout,
    .stat-banner,
    .grid-2,
    .grid-3,
    table,
    thead,
    tbody tr,
    .timeline-item,
    .year-card,
    .gate-box {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    
    /* Keep headers with their following content */
    h1, h2, h3, .section-title, .heading {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
    
    /* Prevent orphans and widows */
    p, li {
      orphans: 3;
      widows: 3;
    }
    
    /* Ensure tables don't break awkwardly */
    .risk-table {
      page-break-inside: auto !important;
    }
    
    .risk-table thead {
      display: table-header-group !important;
    }
    
    .risk-table tbody tr {
      page-break-inside: avoid !important;
    }
  </style>
</head>
<body>
  <main>
    ${sectionContents.map((section, index) => 
      `<div class="pdf-section">${section.content}</div>`
    ).join('\n')}
  </main>
</body>
</html>`;

    // Write combined HTML to temp file
    const tempHtmlFile = path.join(__dirname, 'temp_combined.html');
    fs.writeFileSync(tempHtmlFile, combinedHTML);

    // Load the combined HTML
    const tempAbsolutePath = path.resolve(tempHtmlFile);
    const tempFileUrl = `file://${tempAbsolutePath}`;
    
    console.log('Loading combined document...');
    await page.goto(tempFileUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    await page.waitForSelector('main', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate PDF with print-friendly settings
    console.log('Generating PDF...');
    await page.pdf({
      path: pdfFile,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false
    });

    // Clean up temp file
    if (fs.existsSync(tempHtmlFile)) {
      fs.unlinkSync(tempHtmlFile);
    }

    await browser.close();

    const stats = fs.statSync(pdfFile);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`\n✓ PDF generated successfully!`);
    console.log(`  File: ${pdfFile}`);
    console.log(`  Size: ${fileSizeMB} MB`);
    console.log(`  Sections: ${sectionContents.length}\n`);

  } catch (error) {
    console.error('Error generating PDF:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

generatePDF();

