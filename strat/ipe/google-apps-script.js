/**
 * IPE Assessment - Google Apps Script Backend
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project
 * 2. Copy this entire file into Code.gs
 * 3. Create a new Google Sheet and copy its ID from the URL
 *    (The ID is the long string between /d/ and /edit in the URL)
 * 4. Paste the Sheet ID below in SHEET_ID
 * 5. Click Deploy → New deployment → Web app
 * 6. Set "Execute as" to "Me" and "Who has access" to "Anyone"
 * 7. Copy the deployment URL and paste it into ipe_assessment_ab.html
 *    at line 2120 (GOOGLE_SHEETS_WEBAPP_URL constant)
 */

// ============================================================================
// CONFIGURATION - UPDATE THIS
// ============================================================================
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

// ============================================================================
// COLUMN HEADERS - These will be auto-created on first submission
// ============================================================================
const HEADERS = [
  'Timestamp',
  'Organization ID',
  'Assessment Type',
  'Industry',
  'Respondent Role',
  'PSRI Version',
  
  // Scores
  'PSRI Score',
  'Foundation (Norm)',
  'AI Readiness (Norm)',
  'Governance (Norm)',
  'Delivery (Norm)',
  
  // Legacy scores
  'Foundation (Raw)',
  'AI (Raw)',
  'Org (Raw)',
  'Delivery (Raw)',
  'Total (Raw)',
  
  // Archetype & recommendations
  'Recommended Path',
  'Deployment Tier',
  'Archetype',
  'Archetype Key',
  
  // Lead information
  'First Name',
  'Last Name',
  'Email',
  'Company',
  'Company Size',
  'Regulatory Environment',
  'Role',
  'Context',
  
  // Raw data
  'Answers (JSON)'
];

// ============================================================================
// MAIN HANDLERS
// ============================================================================

/**
 * Handle POST requests - Save new assessment
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    
    // Build row from payload
    const row = [
      data.timestamp || new Date().toISOString(),
      data.organizationId || '',
      data.assessmentType || 'baseline',
      data.industry || '',
      data.respondentRole || '',
      data.psriVersion || '',
      
      // Scores
      data.psriScore || 0,
      data.foundationNorm || 0,
      data.aiNorm || 0,
      data.governanceNorm || 0,
      data.deliveryNorm || 0,
      
      // Legacy scores
      data.foundationScore || 0,
      data.aiScore || 0,
      data.orgScore || 0,
      data.deliveryScore || 0,
      data.totalScore || 0,
      
      // Archetype & recommendations
      data.recommendedPath || '',
      data.deploymentTier || '',
      data.archetype || '',
      data.archetypeKey || '',
      
      // Lead information
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.company || '',
      data.companySize || '',
      data.regulatoryEnv || '',
      data.role || '',
      data.context || '',
      
      // Raw answers
      data.answers || ''
    ];
    
    sheet.appendRow(row);
    
    // Log for debugging
    console.log('Assessment saved:', data.organizationId, data.psriScore);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Assessment saved successfully',
        id: data.organizationId,
        timestamp: data.timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error saving assessment:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.message 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests - Lookup baseline or health check
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    // Health check
    if (!action) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          status: 'ok', 
          message: 'IPE Assessment API is running',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Baseline lookup
    if (action === 'lookup' && e.parameter.orgId) {
      const baseline = findBaseline(e.parameter.orgId);
      return ContentService
        .createTextOutput(JSON.stringify({ baseline }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Export all data (for admin use)
    if (action === 'export' && e.parameter.key === 'YOUR_SECRET_EXPORT_KEY') {
      const data = exportAllData();
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Industry stats
    if (action === 'stats' && e.parameter.industry) {
      const stats = getIndustryStats(e.parameter.industry);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, stats }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Unknown action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doGet:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.message 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get or create the responses sheet with headers
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName('Responses');
  
  if (!sheet) {
    sheet = ss.insertSheet('Responses');
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * Find the most recent baseline assessment for an organization
 */
function findBaseline(orgId) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  // Column indices (0-based)
  const ORG_COL = 1;
  const TYPE_COL = 2;
  const TIMESTAMP_COL = 0;
  const PSRI_COL = 6;
  const FOUNDATION_COL = 7;
  const AI_COL = 8;
  const GOVERNANCE_COL = 9;
  const DELIVERY_COL = 10;
  
  // Search from bottom up (most recent first)
  for (let i = data.length - 1; i > 0; i--) {
    const row = data[i];
    if (row[ORG_COL] === orgId && row[TYPE_COL] === 'baseline') {
      return {
        timestamp: row[TIMESTAMP_COL],
        psriScore: row[PSRI_COL],
        foundationNorm: row[FOUNDATION_COL],
        aiNorm: row[AI_COL],
        governanceNorm: row[GOVERNANCE_COL],
        deliveryNorm: row[DELIVERY_COL]
      };
    }
  }
  
  return null;
}

/**
 * Get industry statistics for benchmarking
 */
function getIndustryStats(industry) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  const INDUSTRY_COL = 3;
  const PSRI_COL = 6;
  
  const scores = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][INDUSTRY_COL] === industry && data[i][PSRI_COL]) {
      scores.push(Number(data[i][PSRI_COL]));
    }
  }
  
  if (scores.length === 0) {
    return { count: 0, avg: null, median: null, min: null, max: null };
  }
  
  scores.sort((a, b) => a - b);
  
  return {
    count: scores.length,
    avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    median: scores[Math.floor(scores.length / 2)],
    min: scores[0],
    max: scores[scores.length - 1]
  };
}

/**
 * Export all data (admin function)
 */
function exportAllData() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}

/**
 * Manual test function - run this to verify setup
 */
function testSetup() {
  const sheet = getOrCreateSheet();
  console.log('Sheet name:', sheet.getName());
  console.log('Row count:', sheet.getLastRow());
  console.log('Setup verified successfully!');
}

