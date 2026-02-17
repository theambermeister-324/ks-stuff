/**
 * PCRI Assessment Backend - Google Apps Script
 * 
 * This script handles:
 * - Saving assessment submissions to Google Sheets
 * - Baseline lookup by organization ID
 * - Data export for dashboard integration
 * - Benchmark generation from collected data
 * 
 * Deploy as Web App:
 * 1. Click Deploy > New Deployment
 * 2. Select "Web app"
 * 3. Execute as: "Me"
 * 4. Who has access: "Anyone"
 * 5. Copy the web app URL and paste in ipe_assessment_ab.html
 * 
 * Version: 1.3
 * Last Updated: 2026-02-16
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const SPREADSHEET_NAME = 'PCRI Assessment Data';
const ASSESSMENTS_SHEET = 'Assessments';
const BASELINES_SHEET = 'Baselines';
const ALPHA_SHEET = 'Alpha Participants'; // New for alpha program

// Export key for dashboard access (change this to a secure value)
const EXPORT_KEY = 'YOUR_SECRET_EXPORT_KEY';

// =============================================================================
// WEB APP ENDPOINTS
// =============================================================================

/**
 * Handle GET requests
 * Used for: baseline lookup, data export
 */
function doGet(e) {
  const action = e.parameter.action || 'lookup';
  
  try {
    switch (action) {
      case 'lookup':
        return handleBaselineLookup(e.parameter.orgId);
      
      case 'export':
        return handleDataExport(e.parameter.key);
      
      case 'benchmarks':
        return handleBenchmarksRequest();
      
      case 'alpha-status':
        return handleAlphaStatusRequest(e.parameter.orgId);
      
      default:
        return jsonResponse({ success: false, error: 'Unknown action' });
    }
  } catch (error) {
    return jsonResponse({ success: false, error: error.message });
  }
}

/**
 * Handle POST requests
 * Used for: saving assessments
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    return handleSaveAssessment(data);
  } catch (error) {
    return jsonResponse({ success: false, error: error.message });
  }
}

// =============================================================================
// ASSESSMENT HANDLING
// =============================================================================

/**
 * Save assessment to Google Sheets
 */
function handleSaveAssessment(data) {
  const ss = getOrCreateSpreadsheet();
  const assessmentsSheet = getOrCreateSheet(ss, ASSESSMENTS_SHEET, getAssessmentHeaders());
  const baselinesSheet = getOrCreateSheet(ss, BASELINES_SHEET, getBaselineHeaders());
  
  // Prepare row data
  const row = [
    new Date().toISOString(),                    // Timestamp
    data.organizationId || '',                   // Organization ID
    data.assessmentType || 'baseline',           // Assessment Type
    data.industry || '',                         // Industry
    data.pcriScore || 0,                         // PCRI Score
    data.foundationNorm || 0,                    // Foundation (Norm)
    data.aiNorm || 0,                            // AI Readiness (Norm)
    data.governanceNorm || 0,                    // Governance (Norm)
    data.deliveryNorm || 0,                      // Delivery (Norm)
    data.cultureNorm || 0,                       // Culture (Norm)
    data.multiSystemNorm || '',                  // Multi-System (Norm)
    data.toolStackNorm || '',                    // Tool Stack (Norm) - IFI score
    data.archetype || '',                        // Archetype
    data.archetypeKey || '',                     // Archetype Key
    data.recommendedPath || '',                  // Recommended Path
    data.deploymentTier || '',                   // Deployment Tier
    data.systemLandscape || '',                  // System Landscape
    data.firstName || '',                        // First Name
    data.lastName || '',                         // Last Name
    data.email || '',                            // Email
    data.company || '',                          // Company
    data.role || '',                             // Role
    data.productCount || '',                     // Product Areas
    data.devTeamSize || '',                      // Dev Team Size
    data.releaseCadence || '',                   // Release Cadence
    data.evidenceLink || '',                     // Evidence Link
    data.additionalContext || '',                // Additional Context
    data.isAlphaParticipant || false,            // Alpha Participant Flag
    data.alphaDebrief || '',                     // Alpha Debrief Status
    JSON.stringify(data.answers || {})           // Raw Answers (JSON)
  ];
  
  // Append to assessments sheet
  assessmentsSheet.appendRow(row);
  
  // Update baseline if this is a baseline assessment
  if (data.assessmentType === 'baseline' && data.organizationId) {
    updateBaseline(baselinesSheet, data);
  }
  
  // Track alpha participants
  if (data.isAlphaParticipant) {
    trackAlphaParticipant(ss, data);
  }
  
  return jsonResponse({ success: true, message: 'Assessment saved' });
}

/**
 * Update or create baseline record
 */
function updateBaseline(sheet, data) {
  const orgId = data.organizationId;
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Find existing baseline row
  let existingRow = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === orgId) {
      existingRow = i + 1; // 1-indexed
      break;
    }
  }
  
  const baselineRow = [
    orgId,
    new Date().toISOString(),
    data.pcriScore || 0,
    data.foundationNorm || 0,
    data.aiNorm || 0,
    data.governanceNorm || 0,
    data.deliveryNorm || 0,
    data.cultureNorm || 0,
    data.archetype || '',
    new Date().toISOString()
  ];
  
  if (existingRow > 0) {
    // Update existing
    sheet.getRange(existingRow, 1, 1, baselineRow.length).setValues([baselineRow]);
  } else {
    // Create new
    sheet.appendRow(baselineRow);
  }
}

/**
 * Track alpha program participants
 */
function trackAlphaParticipant(ss, data) {
  const alphaSheet = getOrCreateSheet(ss, ALPHA_SHEET, getAlphaHeaders());
  
  const row = [
    new Date().toISOString(),
    data.organizationId || '',
    data.email || '',
    data.firstName || '',
    data.lastName || '',
    data.company || '',
    data.industry || '',
    data.pcriScore || 0,
    data.archetype || '',
    'Completed',                    // Status
    '',                             // Director Review Date
    '',                             // Director Notes
    '',                             // Debrief Scheduled
    '',                             // Debrief Completed
    '',                             // Feedback Captured
    ''                              // NPS Score
  ];
  
  alphaSheet.appendRow(row);
}

// =============================================================================
// BASELINE LOOKUP
// =============================================================================

/**
 * Look up baseline for an organization
 */
function handleBaselineLookup(orgId) {
  if (!orgId) {
    return jsonResponse({ success: false, error: 'Organization ID required' });
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet() || 
             SpreadsheetApp.openById(getSpreadsheetId());
  
  if (!ss) {
    return jsonResponse({ success: false, error: 'Spreadsheet not found' });
  }
  
  const baselinesSheet = ss.getSheetByName(BASELINES_SHEET);
  if (!baselinesSheet) {
    return jsonResponse({ success: false, baseline: null });
  }
  
  const dataRange = baselinesSheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === orgId) {
      const baseline = {};
      headers.forEach((header, index) => {
        baseline[header] = values[i][index];
      });
      return jsonResponse({ success: true, baseline: baseline });
    }
  }
  
  return jsonResponse({ success: true, baseline: null });
}

// =============================================================================
// DATA EXPORT
// =============================================================================

/**
 * Export all assessment data (for dashboard)
 */
function handleDataExport(key) {
  if (key !== EXPORT_KEY) {
    return jsonResponse({ success: false, error: 'Invalid export key' });
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet() || 
             SpreadsheetApp.openById(getSpreadsheetId());
  
  if (!ss) {
    return jsonResponse({ success: false, error: 'Spreadsheet not found' });
  }
  
  const assessmentsSheet = ss.getSheetByName(ASSESSMENTS_SHEET);
  if (!assessmentsSheet) {
    return jsonResponse({ success: true, data: [] });
  }
  
  const dataRange = assessmentsSheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];
  
  const data = [];
  for (let i = 1; i < values.length; i++) {
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[i][index];
    });
    data.push(row);
  }
  
  return jsonResponse({ success: true, data: data });
}

// =============================================================================
// BENCHMARKS
// =============================================================================

/**
 * Generate and return benchmark data
 */
function handleBenchmarksRequest() {
  const benchmarks = generateBenchmarks();
  return jsonResponse({ success: true, benchmarks: benchmarks });
}

/**
 * Generate aggregate benchmarks from collected data
 * Run this periodically to update benchmark data
 */
function generateBenchmarks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || 
             SpreadsheetApp.openById(getSpreadsheetId());
  
  if (!ss) return { overall: { avg: 0, topQuartile: 0 }, byIndustry: {} };
  
  const assessmentsSheet = ss.getSheetByName(ASSESSMENTS_SHEET);
  if (!assessmentsSheet) return { overall: { avg: 0, topQuartile: 0 }, byIndustry: {} };
  
  const dataRange = assessmentsSheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];
  
  // Find column indices
  const scoreCol = headers.indexOf('PCRI Score');
  const industryCol = headers.indexOf('Industry');
  
  if (scoreCol === -1) return { overall: { avg: 0, topQuartile: 0 }, byIndustry: {} };
  
  // Collect scores
  const allScores = [];
  const byIndustry = {};
  
  for (let i = 1; i < values.length; i++) {
    const score = values[i][scoreCol];
    const industry = values[i][industryCol] || 'Unknown';
    
    if (typeof score === 'number' && score > 0) {
      allScores.push(score);
      
      if (!byIndustry[industry]) {
        byIndustry[industry] = [];
      }
      byIndustry[industry].push(score);
    }
  }
  
  // Calculate overall stats
  const overall = calculateStats(allScores);
  
  // Calculate per-industry stats
  const industryBenchmarks = {};
  for (const [industry, scores] of Object.entries(byIndustry)) {
    industryBenchmarks[industry] = {
      ...calculateStats(scores),
      count: scores.length
    };
  }
  
  return {
    overall: overall,
    byIndustry: industryBenchmarks,
    totalRecords: allScores.length,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Calculate statistics for an array of scores
 */
function calculateStats(scores) {
  if (scores.length === 0) return { avg: 0, topQuartile: 0, median: 0 };
  
  const sorted = [...scores].sort((a, b) => a - b);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const median = sorted[Math.floor(sorted.length / 2)];
  const topQuartile = sorted[Math.floor(sorted.length * 0.75)];
  
  return {
    avg: Math.round(avg * 10) / 10,
    median: Math.round(median * 10) / 10,
    topQuartile: Math.round(topQuartile * 10) / 10
  };
}

// =============================================================================
// ALPHA PROGRAM HELPERS
// =============================================================================

/**
 * Get alpha participant status
 */
function handleAlphaStatusRequest(orgId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || 
             SpreadsheetApp.openById(getSpreadsheetId());
  
  if (!ss || !orgId) {
    return jsonResponse({ success: false, error: 'Missing data' });
  }
  
  const alphaSheet = ss.getSheetByName(ALPHA_SHEET);
  if (!alphaSheet) {
    return jsonResponse({ success: true, isAlphaParticipant: false });
  }
  
  const dataRange = alphaSheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === orgId) { // Organization ID column
      return jsonResponse({ 
        success: true, 
        isAlphaParticipant: true,
        status: values[i][9],  // Status column
        debriefScheduled: values[i][12],
        debriefCompleted: values[i][13]
      });
    }
  }
  
  return jsonResponse({ success: true, isAlphaParticipant: false });
}

// =============================================================================
// SPREADSHEET HELPERS
// =============================================================================

/**
 * Get or create the PCRI spreadsheet
 */
function getOrCreateSpreadsheet() {
  // Try to find existing spreadsheet
  const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  
  // Create new spreadsheet
  const ss = SpreadsheetApp.create(SPREADSHEET_NAME);
  
  // Initialize sheets
  getOrCreateSheet(ss, ASSESSMENTS_SHEET, getAssessmentHeaders());
  getOrCreateSheet(ss, BASELINES_SHEET, getBaselineHeaders());
  getOrCreateSheet(ss, ALPHA_SHEET, getAlphaHeaders());
  
  // Remove default Sheet1
  const defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet) {
    ss.deleteSheet(defaultSheet);
  }
  
  return ss;
}

/**
 * Get or create a sheet with headers
 */
function getOrCreateSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (headers && headers.length > 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
  }
  
  return sheet;
}

/**
 * Get spreadsheet ID from script properties (if stored)
 */
function getSpreadsheetId() {
  const props = PropertiesService.getScriptProperties();
  return props.getProperty('SPREADSHEET_ID');
}

// =============================================================================
// HEADER DEFINITIONS
// =============================================================================

function getAssessmentHeaders() {
  return [
    'Timestamp',
    'Organization ID',
    'Assessment Type',
    'Industry',
    'PCRI Score',
    'Foundation (Norm)',
    'AI Readiness (Norm)',
    'Governance (Norm)',
    'Delivery (Norm)',
    'Culture (Norm)',
    'Multi-System (Norm)',
    'Tool Stack (Norm)',
    'Archetype',
    'Archetype Key',
    'Recommended Path',
    'Deployment Tier',
    'System Landscape',
    'First Name',
    'Last Name',
    'Email',
    'Company',
    'Role',
    'Product Areas',
    'Dev Team Size',
    'Release Cadence',
    'Evidence Link',
    'Additional Context',
    'Alpha Participant',
    'Alpha Debrief',
    'Raw Answers'
  ];
}

function getBaselineHeaders() {
  return [
    'Organization ID',
    'Baseline Timestamp',
    'PCRI Score',
    'Foundation (Norm)',
    'AI Readiness (Norm)',
    'Governance (Norm)',
    'Delivery (Norm)',
    'Culture (Norm)',
    'Archetype',
    'Last Updated'
  ];
}

function getAlphaHeaders() {
  return [
    'Submission Date',
    'Organization ID',
    'Email',
    'First Name',
    'Last Name',
    'Company',
    'Industry',
    'PCRI Score',
    'Archetype',
    'Status',
    'Director Review Date',
    'Director Notes',
    'Debrief Scheduled',
    'Debrief Completed',
    'Feedback Captured',
    'NPS Score'
  ];
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Create JSON response
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// =============================================================================
// MANUAL TRIGGERS (Run from Script Editor)
// =============================================================================

/**
 * Initialize spreadsheet structure
 * Run this once after deploying the script
 */
function initializeSpreadsheet() {
  const ss = getOrCreateSpreadsheet();
  Logger.log('Spreadsheet initialized: ' + ss.getUrl());
  
  // Store spreadsheet ID for future reference
  const props = PropertiesService.getScriptProperties();
  props.setProperty('SPREADSHEET_ID', ss.getId());
  
  return ss.getUrl();
}

/**
 * Generate and log current benchmarks
 */
function logBenchmarks() {
  const benchmarks = generateBenchmarks();
  Logger.log('=== PCRI Benchmarks ===');
  Logger.log('Generated: ' + benchmarks.generatedAt);
  Logger.log('Total Records: ' + benchmarks.totalRecords);
  Logger.log('Overall Avg: ' + benchmarks.overall.avg);
  Logger.log('Overall Top Quartile: ' + benchmarks.overall.topQuartile);
  Logger.log('');
  Logger.log('By Industry:');
  for (const [industry, stats] of Object.entries(benchmarks.byIndustry)) {
    Logger.log(`  ${industry}: Avg ${stats.avg}, Top Q ${stats.topQuartile}, n=${stats.count}`);
  }
}

/**
 * Get alpha participant summary
 */
function getAlphaSummary() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || 
             SpreadsheetApp.openById(getSpreadsheetId());
  
  if (!ss) {
    Logger.log('Spreadsheet not found');
    return;
  }
  
  const alphaSheet = ss.getSheetByName(ALPHA_SHEET);
  if (!alphaSheet) {
    Logger.log('No alpha participants yet');
    return;
  }
  
  const dataRange = alphaSheet.getDataRange();
  const values = dataRange.getValues();
  
  const total = values.length - 1; // Exclude header
  let completed = 0;
  let debriefScheduled = 0;
  let debriefCompleted = 0;
  let feedbackCaptured = 0;
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][9] === 'Completed') completed++;
    if (values[i][12]) debriefScheduled++;
    if (values[i][13]) debriefCompleted++;
    if (values[i][14]) feedbackCaptured++;
  }
  
  Logger.log('=== Alpha Program Status ===');
  Logger.log(`Total Participants: ${total} / 20`);
  Logger.log(`Assessments Completed: ${completed}`);
  Logger.log(`Debriefs Scheduled: ${debriefScheduled}`);
  Logger.log(`Debriefs Completed: ${debriefCompleted}`);
  Logger.log(`Feedback Captured: ${feedbackCaptured}`);
}

