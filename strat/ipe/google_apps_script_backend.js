/**
 * Google Apps Script Backend for PSRI Assessment
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project
 * 2. Copy this entire file into the Code.gs file
 * 3. Click "Deploy" → "New deployment"
 * 4. Select type: "Web app"
 * 5. Set "Execute as" to your account
 * 6. Set "Who has access" to "Anyone" (for public assessments) or "Anyone with Google Account"
 * 7. Click "Deploy" and copy the Web App URL
 * 8. Paste the URL into GOOGLE_SHEETS_WEBAPP_URL in ipe_assessment_ab.html
 * 
 * The script will automatically create a spreadsheet named "PSRI Assessment Data"
 * with two sheets: "Assessments" (all submissions) and "Baselines" (latest per org)
 */

// Configuration
const SPREADSHEET_NAME = 'PSRI Assessment Data';
const ASSESSMENTS_SHEET = 'Assessments';
const BASELINES_SHEET = 'Baselines';

/**
 * Get or create the spreadsheet
 */
function getOrCreateSpreadsheet() {
  const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  
  // Create new spreadsheet
  const ss = SpreadsheetApp.create(SPREADSHEET_NAME);
  
  // Setup Assessments sheet
  const assessmentsSheet = ss.getSheets()[0];
  assessmentsSheet.setName(ASSESSMENTS_SHEET);
  assessmentsSheet.appendRow([
    'Timestamp',
    'Organization ID',
    'Assessment Type',
    'Industry',
    'PSRI Score',
    'Foundation %',
    'AI Readiness %',
    'Governance %',
    'Delivery %',
    'Foundation Pts',
    'AI Pts',
    'Governance Pts',
    'Delivery Pts',
    'Total Pts',
    'Recommended Path',
    'Deployment Tier',
    'Archetype',
    'First Name',
    'Last Name',
    'Email',
    'Company',
    'Company Size',
    'Regulatory Env',
    'Role',
    'Context',
    'Raw Answers'
  ]);
  assessmentsSheet.setFrozenRows(1);
  
  // Setup Baselines sheet
  const baselinesSheet = ss.insertSheet(BASELINES_SHEET);
  baselinesSheet.appendRow([
    'Organization ID',
    'Baseline Timestamp',
    'PSRI Score',
    'Foundation %',
    'AI Readiness %',
    'Governance %',
    'Delivery %',
    'Archetype',
    'Industry',
    'Last Updated'
  ]);
  baselinesSheet.setFrozenRows(1);
  
  return ss;
}

/**
 * Handle POST requests (save assessment)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = getOrCreateSpreadsheet();
    
    // Append to Assessments sheet
    const assessmentsSheet = ss.getSheetByName(ASSESSMENTS_SHEET);
    assessmentsSheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.organizationId || '',
      data.assessmentType || 'baseline',
      data.industry || '',
      data.psriScore || 0,
      data.foundationNorm || 0,
      data.aiNorm || 0,
      data.governanceNorm || 0,
      data.deliveryNorm || 0,
      data.foundationScore || 0,
      data.aiScore || 0,
      data.orgScore || 0,
      data.deliveryScore || 0,
      data.totalScore || 0,
      data.recommendedPath || '',
      data.deploymentTier || '',
      data.archetype || '',
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.company || '',
      data.companySize || '',
      data.regulatoryEnv || '',
      data.role || '',
      data.context || '',
      data.answers || ''
    ]);
    
    // Update Baselines sheet if this is a baseline assessment
    if (data.assessmentType === 'baseline' && data.organizationId) {
      updateBaseline(ss, data);
    }
    
    // Send immediate follow-up email if email is provided
    if (data.email && EMAIL_CONFIG.enabled) {
      try {
        sendImmediateResultsEmail(data);
      } catch (emailError) {
        Logger.log('Email sending failed: ' + emailError.message);
        // Don't fail the whole request if email fails
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (lookup baseline)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    const orgId = e.parameter.orgId;
    
    if (action === 'lookup' && orgId) {
      const baseline = lookupBaseline(orgId);
      return ContentService
        .createTextOutput(JSON.stringify({ baseline: baseline }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Default: return status
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'PSRI Assessment Backend' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Update baseline for an organization
 */
function updateBaseline(ss, data) {
  const baselinesSheet = ss.getSheetByName(BASELINES_SHEET);
  const dataRange = baselinesSheet.getDataRange();
  const values = dataRange.getValues();
  
  // Find existing row for this org
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === data.organizationId) {
      rowIndex = i + 1; // 1-indexed for Sheets
      break;
    }
  }
  
  const rowData = [
    data.organizationId,
    data.timestamp || new Date().toISOString(),
    data.psriScore || 0,
    data.foundationNorm || 0,
    data.aiNorm || 0,
    data.governanceNorm || 0,
    data.deliveryNorm || 0,
    data.archetype || 'Foundation',
    data.industry || '',
    new Date().toISOString()
  ];
  
  if (rowIndex > 0) {
    // Update existing row
    baselinesSheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
  } else {
    // Append new row
    baselinesSheet.appendRow(rowData);
  }
}

/**
 * Lookup baseline for an organization
 */
function lookupBaseline(orgId) {
  const ss = getOrCreateSpreadsheet();
  const baselinesSheet = ss.getSheetByName(BASELINES_SHEET);
  const dataRange = baselinesSheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === orgId.toLowerCase()) {
      return {
        organizationId: values[i][0],
        timestamp: values[i][1],
        psriScore: values[i][2],
        foundationNorm: values[i][3],
        aiNorm: values[i][4],
        governanceNorm: values[i][5],
        deliveryNorm: values[i][6],
        archetype: values[i][7],
        industry: values[i][8]
      };
    }
  }
  
  return null;
}

/**
 * Get all assessments for an organization (for progress tracking)
 */
function getAssessmentHistory(orgId) {
  const ss = getOrCreateSpreadsheet();
  const assessmentsSheet = ss.getSheetByName(ASSESSMENTS_SHEET);
  const dataRange = assessmentsSheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];
  
  const history = [];
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === orgId.toLowerCase()) {
      const record = {};
      headers.forEach((header, idx) => {
        record[header] = values[i][idx];
      });
      history.push(record);
    }
  }
  
  return history;
}

/**
 * Generate aggregate benchmarks from all assessments
 * Run this function periodically to update benchmark data
 */
function generateBenchmarks() {
  const ss = getOrCreateSpreadsheet();
  const assessmentsSheet = ss.getSheetByName(ASSESSMENTS_SHEET);
  const dataRange = assessmentsSheet.getDataRange();
  const values = dataRange.getValues();
  
  // Group by industry
  const byIndustry = {};
  
  for (let i = 1; i < values.length; i++) {
    const industry = values[i][3] || 'Unknown';
    const psri = values[i][4];
    
    if (!byIndustry[industry]) {
      byIndustry[industry] = [];
    }
    byIndustry[industry].push(psri);
  }
  
  // Calculate stats per industry
  const benchmarks = {};
  
  for (const industry in byIndustry) {
    const scores = byIndustry[industry].sort((a, b) => a - b);
    const n = scores.length;
    
    if (n === 0) continue;
    
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / n);
    const p75Index = Math.floor(n * 0.75);
    const p90Index = Math.floor(n * 0.90);
    
    benchmarks[industry] = {
      n: n,
      avg: avg,
      p75: scores[p75Index] || avg,
      p90: scores[p90Index] || avg,
      min: scores[0],
      max: scores[n - 1]
    };
  }
  
  // Log benchmarks (could also write to a Benchmarks sheet)
  Logger.log(JSON.stringify(benchmarks, null, 2));
  
  return benchmarks;
}

/**
 * Test function to verify setup
 */
function testSetup() {
  const ss = getOrCreateSpreadsheet();
  Logger.log('Spreadsheet created/found: ' + ss.getName());
  Logger.log('URL: ' + ss.getUrl());
  
  // Test with sample data
  const testData = {
    timestamp: new Date().toISOString(),
    organizationId: 'test-company.com',
    assessmentType: 'baseline',
    industry: 'Technology / Media',
    psriScore: 65,
    foundationNorm: 70,
    aiNorm: 55,
    governanceNorm: 60,
    deliveryNorm: 75,
    foundationScore: 21,
    aiScore: 11,
    orgScore: 18,
    deliveryScore: 15,
    totalScore: 65,
    recommendedPath: 'J3',
    deploymentTier: 'D1',
    archetype: 'Scale',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test-company.com',
    company: 'Test Company',
    companySize: '501-2000',
    regulatoryEnv: 'Standard',
    role: 'Design Lead',
    context: 'Testing the integration',
    answers: '{}'
  };
  
  // Append test row
  const assessmentsSheet = ss.getSheetByName(ASSESSMENTS_SHEET);
  assessmentsSheet.appendRow([
    testData.timestamp,
    testData.organizationId,
    testData.assessmentType,
    testData.industry,
    testData.psriScore,
    testData.foundationNorm,
    testData.aiNorm,
    testData.governanceNorm,
    testData.deliveryNorm,
    testData.foundationScore,
    testData.aiScore,
    testData.orgScore,
    testData.deliveryScore,
    testData.totalScore,
    testData.recommendedPath,
    testData.deploymentTier,
    testData.archetype,
    testData.firstName,
    testData.lastName,
    testData.email,
    testData.company,
    testData.companySize,
    testData.regulatoryEnv,
    testData.role,
    testData.context,
    testData.answers
  ]);
  
  updateBaseline(ss, testData);
  
  Logger.log('Test row added successfully');
}

// =============================================================================
// EMAIL FOLLOW-UP AUTOMATION
// =============================================================================

// Configuration
const EMAIL_CONFIG = {
  enabled: true,
  senderName: 'Knapsack PSRI',
  replyTo: 'psri@knapsack.cloud',
  bccInternal: 'psri-leads@knapsack.cloud', // Optional: BCC internal team
  calendarLink: 'https://calendly.com/knapsack/psri-review', // Booking link
  fullAssessmentUrl: 'https://knapsack.cloud/psri',
  abTestingEnabled: true, // Enable A/B testing for subject lines
  leadScoringEnabled: true // Enable lead scoring
};

// =============================================================================
// A/B TESTING FOR SUBJECT LINES
// =============================================================================

// Subject line variants for A/B testing
// Each archetype has multiple subject options; system randomly selects one
const SUBJECT_LINE_VARIANTS = {
  'Foundation': {
    immediate: [
      { id: 'A', subject: 'Your PSRI Results: Building Your Foundation' },
      { id: 'B', subject: 'Your Product System Score: ${psriScore}/100' },
      { id: 'C', subject: '${firstName}, here\'s your AI readiness assessment' }
    ],
    followUp1: [
      { id: 'A', subject: 'Quick wins to strengthen your product system foundation' },
      { id: 'B', subject: '3 things you can do this week to improve your PSRI score' },
      { id: 'C', subject: 'Most orgs at your score start here...' }
    ],
    followUp2: [
      { id: 'A', subject: 'Case study: How PNC built their design system foundation' },
      { id: 'B', subject: 'From ${psriScore} to 65: What PNC did in 6 months' },
      { id: 'C', subject: 'A financial services firm faced the same challenges you do' }
    ],
    followUp3: [
      { id: 'A', subject: 'Ready to accelerate? Let\'s talk about your roadmap' },
      { id: 'B', subject: '${firstName}, 15 minutes to talk about your product system?' },
      { id: 'C', subject: 'Your 90-day roadmap is ready' }
    ]
  },
  'Momentum': {
    immediate: [
      { id: 'A', subject: 'Your PSRI Results: Ready for Momentum' },
      { id: 'B', subject: 'Score: ${psriScore}/100 - You\'re ready to accelerate' },
      { id: 'C', subject: '${firstName}, your timing is perfect' }
    ],
    followUp1: [
      { id: 'A', subject: 'Capitalize on your trigger event: Time-sensitive opportunities' },
      { id: 'B', subject: 'The window is open - here\'s how to move fast' },
      { id: 'C', subject: 'What high-momentum teams do in the first 30 days' }
    ],
    followUp2: [
      { id: 'A', subject: 'From 30% to 70% adoption: The momentum playbook' },
      { id: 'B', subject: 'The adoption curve: You\'re at the inflection point' },
      { id: 'C', subject: 'How to double adoption without doubling effort' }
    ],
    followUp3: [
      { id: 'A', subject: 'Schedule your enablement sprint planning session' },
      { id: 'B', subject: 'Your sprint plan is ready - want to review it?' },
      { id: 'C', subject: '${firstName}, let\'s map your next 60 days' }
    ]
  },
  'Scale': {
    immediate: [
      { id: 'A', subject: 'Your PSRI Results: Ready to Scale' },
      { id: 'B', subject: 'PSRI ${psriScore}: You\'re in the top quartile' },
      { id: 'C', subject: '${firstName}, you\'re ready for the next level' }
    ],
    followUp1: [
      { id: 'A', subject: 'From implemented to governed: The scale transformation' },
      { id: 'B', subject: 'The difference between 60% and 85% adoption' },
      { id: 'C', subject: 'Governance is your unlock - here\'s why' }
    ],
    followUp2: [
      { id: 'A', subject: 'How Edward Jones drove adoption across 400+ applications' },
      { id: 'B', subject: 'From fragmented to unified: A $4M story' },
      { id: 'C', subject: 'What happens when 400 apps use one system' }
    ],
    followUp3: [
      { id: 'A', subject: 'Your scale roadmap: Let\'s build it together' },
      { id: 'B', subject: 'I\'ve drafted your 6-month scale plan' },
      { id: 'C', subject: '${firstName}, ready to go from scale to intelligence?' }
    ]
  },
  'Intelligence': {
    immediate: [
      { id: 'A', subject: 'Your PSRI Results: Ready for AI-Powered Delivery' },
      { id: 'B', subject: 'PSRI ${psriScore}: Top tier for AI readiness' },
      { id: 'C', subject: '${firstName}, you\'re AI-ready - now what?' }
    ],
    followUp1: [
      { id: 'A', subject: 'From AI experimentation to governed execution' },
      { id: 'B', subject: 'The governance layer that makes AI safe' },
      { id: 'C', subject: 'What separates AI pilots from AI production' }
    ],
    followUp2: [
      { id: 'A', subject: 'AI + Governance: The intelligence tier playbook' },
      { id: 'B', subject: 'AI that passes code review the first time' },
      { id: 'C', subject: 'The Home Depot\'s AI governance framework' }
    ],
    followUp3: [
      { id: 'A', subject: 'Pilot AI workflows with your product system' },
      { id: 'B', subject: 'Your AI pilot is ready to launch' },
      { id: 'C', subject: '${firstName}, let\'s turn your AI experiments into production' }
    ]
  }
};

// Industry-specific email additions
const INDUSTRY_EMAIL_CONTENT = {
  'Financial Services': {
    complianceNote: 'We understand the unique compliance requirements of financial services. Our approach includes SOX, PCI-DSS, and regulatory audit considerations.',
    caseStudy: 'PNC Financial Services',
    caseStudyResult: '40% reduction in compliance-related rework'
  },
  'Healthcare': {
    complianceNote: 'HIPAA compliance and PHI protection are core to how we approach healthcare product systems.',
    caseStudy: 'Major Health System',
    caseStudyResult: 'Unified patient portal across 12 hospitals'
  },
  'Retail / E-commerce': {
    complianceNote: 'Omnichannel consistency drives conversion. We help retailers unify experiences across web, mobile, and in-store.',
    caseStudy: 'The Home Depot',
    caseStudyResult: '23% improvement in cross-channel consistency'
  },
  'Technology / Media': {
    complianceNote: 'For tech companies, speed and developer experience are paramount. We optimize for both.',
    caseStudy: 'DoubleVerify',
    caseStudyResult: '50% faster component development cycles'
  },
  'Government / Public Sector': {
    complianceNote: 'Section 508 accessibility and FedRAMP considerations are built into our approach.',
    caseStudy: 'Federal Agency',
    caseStudyResult: 'Full WCAG 2.1 AA compliance across 50+ applications'
  },
  'Insurance': {
    complianceNote: 'State-by-state regulatory requirements and disclosure tracking are central to insurance product systems.',
    caseStudy: 'National Insurer',
    caseStudyResult: 'Unified claims experience across 15 product lines'
  }
};

/**
 * Select A/B variant for a subject line
 * Uses deterministic selection based on email hash for consistency
 */
function selectSubjectVariant(email, archetype, step) {
  if (!EMAIL_CONFIG.abTestingEnabled) {
    return SUBJECT_LINE_VARIANTS[archetype]?.[step]?.[0] || { id: 'A', subject: 'Your PSRI Results' };
  }
  
  const variants = SUBJECT_LINE_VARIANTS[archetype]?.[step];
  if (!variants || variants.length === 0) {
    return { id: 'A', subject: 'Your PSRI Results' };
  }
  
  // Use email hash to deterministically select variant
  const hash = simpleHash(email + step);
  const index = hash % variants.length;
  return variants[index];
}

/**
 * Simple string hash function for variant selection
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Interpolate variables in subject line
 */
function interpolateSubject(template, data) {
  return template
    .replace(/\$\{firstName\}/g, data.firstName || 'there')
    .replace(/\$\{psriScore\}/g, data.psriScore || 0)
    .replace(/\$\{archetype\}/g, data.archetype || 'Foundation')
    .replace(/\$\{company\}/g, data.company || 'your organization');
}

// =============================================================================
// LEAD SCORING SYSTEM
// =============================================================================

// Lead scoring weights
const LEAD_SCORING = {
  // PSRI Score brackets (0-100)
  psriScore: {
    ranges: [
      { min: 75, max: 100, points: 30, label: 'High Readiness' },
      { min: 55, max: 74, points: 25, label: 'Strong Foundation' },
      { min: 40, max: 54, points: 20, label: 'Building' },
      { min: 0, max: 39, points: 10, label: 'Early Stage' }
    ]
  },
  
  // Company size scoring
  companySize: {
    'Enterprise (10,000+)': 25,
    '2,001-10,000': 20,
    '501-2,000': 15,
    '201-500': 10,
    '51-200': 5,
    '1-50': 2
  },
  
  // Role scoring (decision-making authority)
  role: {
    'C-Level / Executive': 25,
    'VP / Senior Director': 20,
    'Director': 15,
    'Manager': 10,
    'IC / Contributor': 5,
    'Consultant / Partner': 12
  },
  
  // Industry scoring (strategic value)
  industry: {
    'Financial Services': 20,
    'Healthcare': 18,
    'Insurance': 18,
    'Enterprise Software': 15,
    'Retail / E-commerce': 15,
    'Technology / Media': 12,
    'Government / Public Sector': 15,
    'Aerospace / Space': 15,
    'Telecommunications / Media': 12,
    'Regulated / Industrial': 12,
    'Utilities (Electric)': 12,
    'Travel / Hospitality': 10,
    'Education (Nonprofit)': 8,
    'Other / Unknown': 5
  },
  
  // Assessment behavior scoring
  behavior: {
    completedFullAssessment: 10,
    providedEmail: 5,
    providedPhone: 5,
    fromWidget: -5, // Widget leads are lower intent
    followUpAssessment: 15 // Returning for follow-up shows high intent
  },
  
  // Lead grade thresholds
  grades: {
    A: { min: 80, label: 'Hot', color: '#10b981', priority: 'Immediate follow-up' },
    B: { min: 60, label: 'Warm', color: '#3b82f6', priority: 'Follow up within 24h' },
    C: { min: 40, label: 'Qualified', color: '#f59e0b', priority: 'Nurture sequence' },
    D: { min: 20, label: 'Developing', color: '#6b7280', priority: 'Marketing nurture' },
    F: { min: 0, label: 'Cold', color: '#ef4444', priority: 'Low priority' }
  }
};

/**
 * Calculate lead score for an assessment submission
 */
function calculateLeadScore(data) {
  if (!EMAIL_CONFIG.leadScoringEnabled) {
    return { score: 0, grade: 'C', breakdown: {} };
  }
  
  let score = 0;
  const breakdown = {};
  
  // PSRI Score component
  const psri = data.psriScore || 0;
  for (const range of LEAD_SCORING.psriScore.ranges) {
    if (psri >= range.min && psri <= range.max) {
      score += range.points;
      breakdown.psriScore = { points: range.points, label: range.label };
      break;
    }
  }
  
  // Company size component
  const sizePoints = LEAD_SCORING.companySize[data.companySize] || 0;
  if (sizePoints > 0) {
    score += sizePoints;
    breakdown.companySize = { points: sizePoints, value: data.companySize };
  }
  
  // Role component
  const rolePoints = LEAD_SCORING.role[data.role] || 0;
  if (rolePoints > 0) {
    score += rolePoints;
    breakdown.role = { points: rolePoints, value: data.role };
  }
  
  // Industry component
  const industryPoints = LEAD_SCORING.industry[data.industry] || LEAD_SCORING.industry['Other / Unknown'];
  score += industryPoints;
  breakdown.industry = { points: industryPoints, value: data.industry };
  
  // Behavior components
  if (data.email) {
    score += LEAD_SCORING.behavior.providedEmail;
    breakdown.providedEmail = { points: LEAD_SCORING.behavior.providedEmail };
  }
  
  if (data.assessmentType === 'follow-up') {
    score += LEAD_SCORING.behavior.followUpAssessment;
    breakdown.followUpAssessment = { points: LEAD_SCORING.behavior.followUpAssessment };
  }
  
  if (data.source === 'widget') {
    score += LEAD_SCORING.behavior.fromWidget;
    breakdown.fromWidget = { points: LEAD_SCORING.behavior.fromWidget };
  } else {
    score += LEAD_SCORING.behavior.completedFullAssessment;
    breakdown.completedFullAssessment = { points: LEAD_SCORING.behavior.completedFullAssessment };
  }
  
  // Determine grade
  let grade = 'F';
  let gradeInfo = LEAD_SCORING.grades.F;
  for (const [g, info] of Object.entries(LEAD_SCORING.grades)) {
    if (score >= info.min) {
      grade = g;
      gradeInfo = info;
      break;
    }
  }
  
  return {
    score: Math.min(100, Math.max(0, score)), // Clamp to 0-100
    grade,
    gradeLabel: gradeInfo.label,
    priority: gradeInfo.priority,
    color: gradeInfo.color,
    breakdown
  };
}

/**
 * Get lead score tier for display
 */
function getLeadScoreTier(score) {
  if (score >= 80) return { tier: 'A', label: 'Hot Lead', color: '#10b981' };
  if (score >= 60) return { tier: 'B', label: 'Warm Lead', color: '#3b82f6' };
  if (score >= 40) return { tier: 'C', label: 'Qualified', color: '#f59e0b' };
  if (score >= 20) return { tier: 'D', label: 'Developing', color: '#6b7280' };
  return { tier: 'F', label: 'Cold', color: '#ef4444' };
}

// Email sequences by archetype
const EMAIL_SEQUENCES = {
  'Foundation': {
    immediate: {
      subject: 'Your PSRI Results: Building Your Foundation',
      delayMinutes: 0
    },
    followUp1: {
      subject: 'Quick wins to strengthen your product system foundation',
      delayDays: 3
    },
    followUp2: {
      subject: 'Case study: How PNC built their design system foundation',
      delayDays: 7
    },
    followUp3: {
      subject: 'Ready to accelerate? Let\'s talk about your roadmap',
      delayDays: 14
    }
  },
  'Momentum': {
    immediate: {
      subject: 'Your PSRI Results: Ready for Momentum',
      delayMinutes: 0
    },
    followUp1: {
      subject: 'Capitalize on your trigger event: Time-sensitive opportunities',
      delayDays: 2
    },
    followUp2: {
      subject: 'From 30% to 70% adoption: The momentum playbook',
      delayDays: 5
    },
    followUp3: {
      subject: 'Schedule your enablement sprint planning session',
      delayDays: 10
    }
  },
  'Scale': {
    immediate: {
      subject: 'Your PSRI Results: Ready to Scale',
      delayMinutes: 0
    },
    followUp1: {
      subject: 'From implemented to governed: The scale transformation',
      delayDays: 3
    },
    followUp2: {
      subject: 'How Edward Jones drove adoption across 400+ applications',
      delayDays: 7
    },
    followUp3: {
      subject: 'Your scale roadmap: Let\'s build it together',
      delayDays: 12
    }
  },
  'Intelligence': {
    immediate: {
      subject: 'Your PSRI Results: Ready for AI-Powered Delivery',
      delayMinutes: 0
    },
    followUp1: {
      subject: 'From AI experimentation to governed execution',
      delayDays: 2
    },
    followUp2: {
      subject: 'AI + Governance: The intelligence tier playbook',
      delayDays: 5
    },
    followUp3: {
      subject: 'Pilot AI workflows with your product system',
      delayDays: 10
    }
  }
};

/**
 * Send immediate results email after assessment completion
 */
function sendImmediateResultsEmail(data) {
  if (!EMAIL_CONFIG.enabled || !data.email) return;
  
  const archetype = data.archetype || 'Foundation';
  
  // Calculate lead score
  const leadScore = calculateLeadScore(data);
  data.leadScore = leadScore.score;
  data.leadGrade = leadScore.grade;
  
  // Select A/B variant for subject line
  const subjectVariant = selectSubjectVariant(data.email, archetype, 'immediate');
  const subject = interpolateSubject(subjectVariant.subject, data);
  
  // Build email with industry-specific content
  const emailBody = buildImmediateEmail(data, leadScore);
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: emailBody,
      name: EMAIL_CONFIG.senderName,
      replyTo: EMAIL_CONFIG.replyTo,
      bcc: EMAIL_CONFIG.bccInternal
    });
    
    // Log email sent with A/B variant
    logEmailSent(data.email, data.organizationId, 'immediate', archetype, subjectVariant.id, leadScore);
    
    // Schedule follow-up emails
    scheduleFollowUpEmails(data, archetype);
    
    // Log lead score
    logLeadScore(data, leadScore);
    
    // Send internal alert for hot leads
    if (leadScore.grade === 'A') {
      sendHotLeadAlert(data, leadScore);
    }
    
    // Send executive summary for high-value leads (Grade A or B with large company)
    if (leadScore.grade === 'A' || (leadScore.grade === 'B' && isEnterpriseCompany(data.companySize))) {
      scheduleExecutiveSummary(data);
    }
    
  } catch (error) {
    Logger.log('Failed to send email: ' + error.message);
  }
}

/**
 * Check if company size qualifies as enterprise
 */
function isEnterpriseCompany(companySize) {
  return companySize === 'Enterprise (10,000+)' || companySize === '2,001-10,000';
}

/**
 * Schedule executive summary email for high-value leads
 */
function scheduleExecutiveSummary(data) {
  const ss = getOrCreateSpreadsheet();
  
  let queueSheet = ss.getSheetByName('Email Queue');
  if (!queueSheet) return;
  
  const scheduledTime = new Date();
  scheduledTime.setDate(scheduledTime.getDate() + 1); // Send next day
  
  queueSheet.appendRow([
    data.email,
    data.organizationId || '',
    data.archetype || 'Foundation',
    'executiveSummary',
    scheduledTime.toISOString(),
    'pending',
    data.firstName || '',
    data.psriScore || 0,
    JSON.stringify(data)
  ]);
}

/**
 * Build the immediate results email HTML
 */
function buildImmediateEmail(data, leadScore) {
  const archetype = data.archetype || 'Foundation';
  const psriScore = data.psriScore || 0;
  const firstName = data.firstName || 'there';
  const industry = data.industry || '';
  const industryContent = INDUSTRY_EMAIL_CONTENT[industry] || null;
  
  const archetypeDescriptions = {
    'Foundation': 'Your organization is in the early stages of product system maturity. The focus should be on establishing a solid foundation before adding complexity.',
    'Momentum': 'Your organization has strong fundamentals and is ready to capitalize on trigger events. Focus on rapid enablement during your opportunity window.',
    'Scale': 'Your organization has an implemented system ready for full transformation. Focus on governance, adoption, and turning your system into a decision authority.',
    'Intelligence': 'Your organization is ready for AI-enabled delivery. Focus on governed AI workflows that turn context into safe, production-ready execution.'
  };
  
  const nextSteps = {
    'Foundation': [
      'Establish a system of record and baseline governance',
      'Align ownership and decision rights for the product system',
      'Inventory core components, tokens, and usage patterns',
      'Define governance standards before scaling adoption'
    ],
    'Momentum': [
      'Confirm trigger event and urgency timeline',
      'Plan a rapid enablement sprint for priority workflows',
      'Standardize the highest-impact experiences first',
      'Build momentum by showing quick wins'
    ],
    'Scale': [
      'Quantify adoption gaps across teams and products',
      'Tighten governance rules and decision flow',
      'Drive adoption with enablement and change management',
      'Measure usage and quality signals every release'
    ],
    'Intelligence': [
      'Identify AI workflows to pilot with governed context',
      'Ensure rules and metadata are production-ready',
      'Expand AI-assisted delivery to more teams',
      'Measure AI impact and iterate on governance'
    ]
  };
  
  const stepsHtml = (nextSteps[archetype] || nextSteps['Foundation'])
    .map((step, i) => `<tr><td style="padding: 8px 0; color: #4a5568;"><strong style="color: #6436bf;">${i+1}.</strong> ${step}</td></tr>`)
    .join('');
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f7f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6436bf 0%, #42247f 100%); padding: 32px; text-align: center;">
              <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0 0 8px 0; letter-spacing: 1px;">PSRI ASSESSMENT RESULTS</p>
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">Your Product System Readiness</h1>
            </td>
          </tr>
          
          <!-- Score Section -->
          <tr>
            <td style="padding: 32px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 14px; margin: 0 0 8px 0;">Hi ${firstName}! Here's your PSRI score:</p>
              <p style="font-size: 64px; font-weight: 700; color: #1a202c; margin: 0;">${psriScore}<span style="font-size: 24px; color: #a0aec0;">/100</span></p>
              <div style="display: inline-block; background: linear-gradient(135deg, #6436bf 0%, #42247f 100%); color: white; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-top: 12px;">
                ${archetype} Tier
              </div>
            </td>
          </tr>
          
          <!-- Pillar Breakdown -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="25%" style="text-align: center; padding: 12px;">
                    <p style="font-size: 24px; font-weight: 700; color: #10b981; margin: 0;">${data.foundationNorm || 0}%</p>
                    <p style="font-size: 12px; color: #718096; margin: 4px 0 0 0;">Foundation</p>
                  </td>
                  <td width="25%" style="text-align: center; padding: 12px;">
                    <p style="font-size: 24px; font-weight: 700; color: #3b82f6; margin: 0;">${data.governanceNorm || 0}%</p>
                    <p style="font-size: 12px; color: #718096; margin: 4px 0 0 0;">Governance</p>
                  </td>
                  <td width="25%" style="text-align: center; padding: 12px;">
                    <p style="font-size: 24px; font-weight: 700; color: #f59e0b; margin: 0;">${data.deliveryNorm || 0}%</p>
                    <p style="font-size: 12px; color: #718096; margin: 4px 0 0 0;">Delivery</p>
                  </td>
                  <td width="25%" style="text-align: center; padding: 12px;">
                    <p style="font-size: 24px; font-weight: 700; color: #8b5cf6; margin: 0;">${data.aiNorm || 0}%</p>
                    <p style="font-size: 12px; color: #718096; margin: 4px 0 0 0;">AI Ready</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- What This Means -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="font-size: 18px; color: #1a202c; margin: 0 0 12px 0;">What This Means</h2>
              <p style="font-size: 15px; color: #4a5568; line-height: 1.6; margin: 0;">
                ${archetypeDescriptions[archetype] || archetypeDescriptions['Foundation']}
              </p>
            </td>
          </tr>
          
          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <h2 style="font-size: 18px; color: #1a202c; margin: 0 0 16px 0;">Recommended Next Steps</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${stepsHtml}
              </table>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td style="padding: 24px 32px 32px 32px; text-align: center;">
              <a href="${EMAIL_CONFIG.calendarLink}" style="display: inline-block; background: linear-gradient(135deg, #6436bf 0%, #42247f 100%); color: white; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 600; text-decoration: none;">
                Schedule Your Readiness Review
              </a>
              <p style="font-size: 13px; color: #718096; margin: 16px 0 0 0;">
                30 minutes • No commitment • Personalized recommendations
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #1a202c; text-align: center;">
              <p style="font-size: 13px; color: #a0aec0; margin: 0 0 8px 0;">
                <a href="${EMAIL_CONFIG.fullAssessmentUrl}" style="color: #a78bfa; text-decoration: none;">Take Full Assessment</a> • 
                <a href="https://knapsack.cloud" style="color: #a78bfa; text-decoration: none;">Learn More</a>
              </p>
              <p style="font-size: 11px; color: #718096; margin: 0;">
                © ${new Date().getFullYear()} Knapsack. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Schedule follow-up emails using time-based triggers
 */
function scheduleFollowUpEmails(data, archetype) {
  const sequence = EMAIL_SEQUENCES[archetype] || EMAIL_SEQUENCES['Foundation'];
  const ss = getOrCreateSpreadsheet();
  
  // Get or create Email Queue sheet
  let queueSheet = ss.getSheetByName('Email Queue');
  if (!queueSheet) {
    queueSheet = ss.insertSheet('Email Queue');
    queueSheet.appendRow([
      'Email', 'Organization ID', 'Archetype', 'Sequence Step', 
      'Scheduled Time', 'Status', 'First Name', 'PSRI Score', 'Data JSON'
    ]);
    queueSheet.setFrozenRows(1);
  }
  
  // Add follow-up emails to queue
  const now = new Date();
  
  Object.keys(sequence).forEach(step => {
    if (step === 'immediate') return; // Already sent
    
    const config = sequence[step];
    const scheduledTime = new Date(now);
    
    if (config.delayDays) {
      scheduledTime.setDate(scheduledTime.getDate() + config.delayDays);
    }
    
    queueSheet.appendRow([
      data.email,
      data.organizationId || '',
      archetype,
      step,
      scheduledTime.toISOString(),
      'pending',
      data.firstName || '',
      data.psriScore || 0,
      JSON.stringify(data)
    ]);
  });
}

/**
 * Process email queue - run this as a daily trigger
 * To set up: 
 * 1. In Apps Script editor, go to Triggers (clock icon)
 * 2. Add trigger: processEmailQueue, Time-driven, Day timer, 9am-10am
 */
function processEmailQueue() {
  const ss = getOrCreateSpreadsheet();
  const queueSheet = ss.getSheetByName('Email Queue');
  
  if (!queueSheet) return;
  
  const dataRange = queueSheet.getDataRange();
  const values = dataRange.getValues();
  const now = new Date();
  
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const email = row[0];
    const archetype = row[2];
    const step = row[3];
    const scheduledTime = new Date(row[4]);
    const status = row[5];
    const firstName = row[6];
    const psriScore = row[7];
    const dataJson = row[8];
    
    // Skip if not pending or not yet due
    if (status !== 'pending') continue;
    if (scheduledTime > now) continue;
    
    try {
      // Parse data
      let data = {};
      try {
        data = JSON.parse(dataJson);
      } catch (e) {
        data = { email, firstName, psriScore, archetype };
      }
      
      let emailBody;
      let subject;
      let variant = 'A';
      
      // Handle different email types
      if (step === 'executiveSummary') {
        emailBody = buildExecutiveSummaryEmail(data);
        subject = `Executive Briefing: ${data.company || 'Your'} Product System Assessment`;
      } else if (step === 'reEngagement') {
        data.daysSinceAssessment = Math.floor((now - new Date(data.timestamp || now)) / (1000 * 60 * 60 * 24));
        emailBody = buildReEngagementEmail(data);
        subject = `${firstName}, how has your product system evolved?`;
      } else {
        // Standard follow-up emails with A/B testing
        emailBody = buildFollowUpEmail(data, archetype, step);
        
        // Select A/B variant for subject
        const subjectVariant = selectSubjectVariant(email, archetype, step);
        subject = interpolateSubject(subjectVariant.subject, data);
        variant = subjectVariant.id;
      }
      
      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: emailBody,
        name: EMAIL_CONFIG.senderName,
        replyTo: EMAIL_CONFIG.replyTo
      });
      
      // Update status
      queueSheet.getRange(i + 1, 6).setValue('sent');
      if (dataRange.getNumColumns() >= 10) {
        queueSheet.getRange(i + 1, 10).setValue(new Date().toISOString());
      }
      
      logEmailSent(email, data.organizationId, step, archetype, variant);
      
    } catch (error) {
      queueSheet.getRange(i + 1, 6).setValue('failed: ' + error.message);
    }
  }
}

/**
 * Build follow-up email content
 */
function buildFollowUpEmail(data, archetype, step) {
  const firstName = data.firstName || 'there';
  const psriScore = data.psriScore || 0;
  
  const content = getFollowUpContent(archetype, step);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f7f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6436bf 0%, #42247f 100%); padding: 24px 32px;">
              <p style="color: rgba(255,255,255,0.8); font-size: 11px; margin: 0; letter-spacing: 1px;">PSRI • ${archetype.toUpperCase()} TIER</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 15px; color: #4a5568; margin: 0 0 16px 0;">Hi ${firstName},</p>
              ${content.body}
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td style="padding: 0 32px 32px 32px; text-align: center;">
              <a href="${content.ctaUrl || EMAIL_CONFIG.calendarLink}" style="display: inline-block; background: linear-gradient(135deg, #6436bf 0%, #42247f 100%); color: white; padding: 14px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; text-decoration: none;">
                ${content.ctaText || 'Schedule a Conversation'}
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; text-align: center;">
              <p style="font-size: 12px; color: #718096; margin: 0;">
                Your PSRI Score: <strong>${psriScore}/100</strong> • 
                <a href="${EMAIL_CONFIG.fullAssessmentUrl}" style="color: #6436bf; text-decoration: none;">Retake Assessment</a>
              </p>
            </td>
          </tr>
          
          <!-- Unsubscribe -->
          <tr>
            <td style="padding: 16px 32px; background-color: #1a202c; text-align: center;">
              <p style="font-size: 11px; color: #718096; margin: 0;">
                © ${new Date().getFullYear()} Knapsack • 
                <a href="#" style="color: #a78bfa; text-decoration: none;">Unsubscribe</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Get follow-up email content by archetype and step
 */
function getFollowUpContent(archetype, step) {
  const content = {
    'Foundation': {
      'followUp1': {
        body: `
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
            I wanted to share a few quick wins that organizations at the Foundation tier have found valuable:
          </p>
          <ul style="font-size: 15px; color: #4a5568; line-height: 1.8; padding-left: 20px;">
            <li><strong>Component inventory:</strong> Start with what you have. Document your most-used UI patterns.</li>
            <li><strong>Ownership clarity:</strong> Assign one person to own the design system vision.</li>
            <li><strong>Small wins:</strong> Standardize one frequently-used component across teams.</li>
          </ul>
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6; margin-top: 16px;">
            These steps take weeks, not months—and they set you up for everything that follows.
          </p>
        `,
        ctaText: 'Get Your Foundation Playbook',
        ctaUrl: EMAIL_CONFIG.calendarLink
      },
      'followUp2': {
        body: `
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
            I thought you'd find this relevant: <strong>PNC Financial Services</strong> started exactly where you are now.
          </p>
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
            They had scattered components, no governance, and teams working in silos. Within 6 months of building their foundation, they achieved:
          </p>
          <ul style="font-size: 15px; color: #4a5568; line-height: 1.8; padding-left: 20px;">
            <li>40% reduction in component-related defects</li>
            <li>Consistent experience across 3 major product lines</li>
            <li>Executive buy-in for the next phase of investment</li>
          </ul>
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6; margin-top: 16px;">
            Want to hear more about how they did it?
          </p>
        `,
        ctaText: 'See the Full Case Study',
        ctaUrl: EMAIL_CONFIG.calendarLink
      },
      'followUp3': {
        body: `
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
            Based on your PSRI results, I've been thinking about what a realistic 90-day roadmap might look like for your organization.
          </p>
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
            I'd love to walk you through it—no commitment, just a conversation about where you're headed and what's possible.
          </p>
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6; margin-top: 16px;">
            Would 30 minutes work this week?
          </p>
        `,
        ctaText: 'Book a Time',
        ctaUrl: EMAIL_CONFIG.calendarLink
      }
    },
    // Similar content for other archetypes...
    'Momentum': {
      'followUp1': {
        body: `
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
            Organizations in the Momentum tier often have a trigger event—a replatform, a merger, a major launch—that creates urgency.
          </p>
          <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
            The window for capturing that momentum is short. Here's what we've seen work:
          </p>
          <ul style="font-size: 15px; color: #4a5568; line-height: 1.8; padding-left: 20px;">
            <li><strong>Focus the sprint:</strong> Pick 3-5 high-impact experiences to standardize first</li>
            <li><strong>Align stakeholders:</strong> Get buy-in on the "why now" story</li>
            <li><strong>Ship fast:</strong> Show value in weeks, not quarters</li>
          </ul>
        `,
        ctaText: 'Plan Your Momentum Sprint',
        ctaUrl: EMAIL_CONFIG.calendarLink
      },
      'followUp2': {
        body: `<p style="font-size: 15px; color: #4a5568; line-height: 1.6;">Teams that move from 30% to 70% adoption share a common playbook: they focus on enabling the teams that are ready, not convincing the ones that aren't. Want to see how?</p>`,
        ctaText: 'Get the Adoption Playbook',
        ctaUrl: EMAIL_CONFIG.calendarLink
      },
      'followUp3': {
        body: `<p style="font-size: 15px; color: #4a5568; line-height: 1.6;">Your PSRI score suggests you're ready to move fast. Let's talk about what an enablement sprint could look like for your team—I can share timelines and outcomes from similar organizations.</p>`,
        ctaText: 'Schedule Sprint Planning',
        ctaUrl: EMAIL_CONFIG.calendarLink
      }
    },
    'Scale': {
      'followUp1': {
        body: `<p style="font-size: 15px; color: #4a5568; line-height: 1.6;">The jump from "implemented" to "governed" is where the biggest gains happen. Organizations at Scale tier typically see 3-5x improvements in delivery consistency. Here's what that transformation looks like...</p>`,
        ctaText: 'See the Scale Framework',
        ctaUrl: EMAIL_CONFIG.calendarLink
      },
      'followUp2': {
        body: `<p style="font-size: 15px; color: #4a5568; line-height: 1.6;">Edward Jones went from 23% adoption to 78% across 400+ applications. The key? They stopped treating the design system as a tool and started treating it as a decision authority. Let me show you how.</p>`,
        ctaText: 'Read the Case Study',
        ctaUrl: EMAIL_CONFIG.calendarLink
      },
      'followUp3': {
        body: `<p style="font-size: 15px; color: #4a5568; line-height: 1.6;">Based on your results, I think we could build a compelling 6-month scale roadmap for your organization. Want to walk through it together?</p>`,
        ctaText: 'Build Your Scale Roadmap',
        ctaUrl: EMAIL_CONFIG.calendarLink
      }
    },
    'Intelligence': {
      'followUp1': {
        body: `<p style="font-size: 15px; color: #4a5568; line-height: 1.6;">Your organization is in the top tier for AI readiness. The question now is: how do you move from experimentation to governed execution? The answer lies in your product system's ability to provide context that AI can trust...</p>`,
        ctaText: 'See the AI Governance Framework',
        ctaUrl: EMAIL_CONFIG.calendarLink
      },
      'followUp2': {
        body: `<p style="font-size: 15px; color: #4a5568; line-height: 1.6;">AI + Governance is the new frontier. Organizations at the Intelligence tier are already shipping AI-generated UI that passes human review the first time. Here's how they're doing it...</p>`,
        ctaText: 'Get the Intelligence Playbook',
        ctaUrl: EMAIL_CONFIG.calendarLink
      },
      'followUp3': {
        body: `<p style="font-size: 15px; color: #4a5568; line-height: 1.6;">Ready to pilot AI workflows with your product system? I'd love to show you what governed AI execution looks like in practice—we can walk through real examples from organizations like yours.</p>`,
        ctaText: 'Schedule AI Pilot Planning',
        ctaUrl: EMAIL_CONFIG.calendarLink
      }
    }
  };
  
  return content[archetype]?.[step] || {
    body: `<p style="font-size: 15px; color: #4a5568; line-height: 1.6;">Following up on your recent PSRI assessment. I'd love to discuss your results and potential next steps.</p>`,
    ctaText: 'Schedule a Conversation',
    ctaUrl: EMAIL_CONFIG.calendarLink
  };
}

/**
 * Log email sent for tracking with A/B variant
 */
function logEmailSent(email, orgId, step, archetype, variant, leadScore) {
  const ss = getOrCreateSpreadsheet();
  
  let logSheet = ss.getSheetByName('Email Log');
  if (!logSheet) {
    logSheet = ss.insertSheet('Email Log');
    logSheet.appendRow([
      'Timestamp', 'Email', 'Organization ID', 'Archetype', 'Step', 
      'Status', 'A/B Variant', 'Lead Score', 'Lead Grade'
    ]);
    logSheet.setFrozenRows(1);
  }
  
  logSheet.appendRow([
    new Date().toISOString(),
    email,
    orgId || '',
    archetype,
    step,
    'sent',
    variant || 'A',
    leadScore?.score || 0,
    leadScore?.grade || ''
  ]);
}

/**
 * Log lead score for analytics
 */
function logLeadScore(data, leadScore) {
  const ss = getOrCreateSpreadsheet();
  
  let scoreSheet = ss.getSheetByName('Lead Scores');
  if (!scoreSheet) {
    scoreSheet = ss.insertSheet('Lead Scores');
    scoreSheet.appendRow([
      'Timestamp', 'Email', 'Organization ID', 'Company', 'Industry',
      'Lead Score', 'Lead Grade', 'Priority', 'PSRI Score', 'Archetype',
      'Company Size', 'Role', 'Breakdown JSON'
    ]);
    scoreSheet.setFrozenRows(1);
    
    // Add conditional formatting for grades
    const gradeColumn = scoreSheet.getRange('G:G');
    // Note: Full conditional formatting would require more complex setup
  }
  
  scoreSheet.appendRow([
    new Date().toISOString(),
    data.email || '',
    data.organizationId || '',
    data.company || '',
    data.industry || '',
    leadScore.score,
    leadScore.grade,
    leadScore.priority,
    data.psriScore || 0,
    data.archetype || '',
    data.companySize || '',
    data.role || '',
    JSON.stringify(leadScore.breakdown)
  ]);
}

/**
 * Get lead score summary for a period
 */
function getLeadScoreSummary(days) {
  const ss = getOrCreateSpreadsheet();
  const scoreSheet = ss.getSheetByName('Lead Scores');
  
  if (!scoreSheet) return { error: 'No lead scores recorded yet' };
  
  const dataRange = scoreSheet.getDataRange();
  const values = dataRange.getValues();
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - (days || 30));
  
  const summary = {
    total: 0,
    byGrade: { A: 0, B: 0, C: 0, D: 0, F: 0 },
    avgScore: 0,
    byIndustry: {},
    hotLeads: []
  };
  
  let totalScore = 0;
  
  for (let i = 1; i < values.length; i++) {
    const timestamp = new Date(values[i][0]);
    if (timestamp < cutoffDate) continue;
    
    summary.total++;
    const grade = values[i][6];
    const score = values[i][5];
    const industry = values[i][4];
    
    summary.byGrade[grade] = (summary.byGrade[grade] || 0) + 1;
    summary.byIndustry[industry] = (summary.byIndustry[industry] || 0) + 1;
    totalScore += score;
    
    // Track hot leads (grade A)
    if (grade === 'A') {
      summary.hotLeads.push({
        email: values[i][1],
        company: values[i][3],
        score: score,
        industry: industry
      });
    }
  }
  
  summary.avgScore = summary.total > 0 ? Math.round(totalScore / summary.total) : 0;
  
  return summary;
}

/**
 * Test email sending (use your own email)
 */
function testEmailSending() {
  const testData = {
    email: Session.getActiveUser().getEmail(), // Your email
    firstName: 'Test',
    organizationId: 'test-company.com',
    psriScore: 45,
    archetype: 'Foundation',
    foundationNorm: 50,
    aiNorm: 30,
    governanceNorm: 40,
    deliveryNorm: 55
  };
  
  sendImmediateResultsEmail(testData);
  Logger.log('Test email sent to: ' + testData.email);
}

// =============================================================================
// A/B TEST ANALYSIS
// =============================================================================

/**
 * Analyze A/B test results for subject lines
 * Run periodically to see which variants perform better
 */
function analyzeABTestResults() {
  const ss = getOrCreateSpreadsheet();
  const emailLogSheet = ss.getSheetByName('Email Log');
  
  if (!emailLogSheet) return { error: 'No email log found' };
  
  const dataRange = emailLogSheet.getDataRange();
  const values = dataRange.getValues();
  
  // Group by archetype, step, and variant
  const results = {};
  
  for (let i = 1; i < values.length; i++) {
    const archetype = values[i][3];
    const step = values[i][4];
    const variant = values[i][6] || 'A';
    
    const key = `${archetype}|${step}`;
    if (!results[key]) {
      results[key] = { archetype, step, variants: {} };
    }
    
    if (!results[key].variants[variant]) {
      results[key].variants[variant] = { sent: 0, avgLeadScore: 0, totalLeadScore: 0 };
    }
    
    results[key].variants[variant].sent++;
    const leadScore = values[i][7] || 0;
    results[key].variants[variant].totalLeadScore += leadScore;
  }
  
  // Calculate averages and determine winners
  const analysis = [];
  
  for (const key in results) {
    const item = results[key];
    let winner = null;
    let maxScore = -1;
    
    for (const variant in item.variants) {
      const v = item.variants[variant];
      v.avgLeadScore = v.sent > 0 ? Math.round(v.totalLeadScore / v.sent) : 0;
      
      if (v.avgLeadScore > maxScore) {
        maxScore = v.avgLeadScore;
        winner = variant;
      }
    }
    
    analysis.push({
      archetype: item.archetype,
      step: item.step,
      variants: item.variants,
      suggestedWinner: winner,
      confidence: calculateConfidence(item.variants)
    });
  }
  
  Logger.log(JSON.stringify(analysis, null, 2));
  return analysis;
}

/**
 * Calculate statistical confidence for A/B test
 * Returns 'low', 'medium', or 'high'
 */
function calculateConfidence(variants) {
  const keys = Object.keys(variants);
  if (keys.length < 2) return 'low';
  
  const totalSent = keys.reduce((sum, k) => sum + variants[k].sent, 0);
  
  if (totalSent < 50) return 'low';
  if (totalSent < 200) return 'medium';
  return 'high';
}

/**
 * Get recommended subject lines based on A/B test results
 */
function getWinningSubjectLines() {
  const analysis = analyzeABTestResults();
  
  if (analysis.error) return analysis;
  
  const winners = {};
  
  for (const item of analysis) {
    if (item.confidence !== 'low') {
      const key = `${item.archetype}|${item.step}`;
      const winningVariant = SUBJECT_LINE_VARIANTS[item.archetype]?.[item.step]
        ?.find(v => v.id === item.suggestedWinner);
      
      if (winningVariant) {
        winners[key] = {
          subject: winningVariant.subject,
          variant: item.suggestedWinner,
          confidence: item.confidence
        };
      }
    }
  }
  
  return winners;
}

// =============================================================================
// ADDITIONAL EMAIL TEMPLATES
// =============================================================================

/**
 * Build re-engagement email for leads who haven't responded
 */
function buildReEngagementEmail(data) {
  const firstName = data.firstName || 'there';
  const psriScore = data.psriScore || 0;
  const daysSince = data.daysSinceAssessment || 30;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f7f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">Hi ${firstName},</p>
              <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
                It's been ${daysSince} days since you took the PSRI assessment and scored <strong>${psriScore}/100</strong>.
              </p>
              <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
                A lot can change in that time. Has your product system evolved? Are your teams using AI differently now?
              </p>
              <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
                <strong>Take 2 minutes to retake the assessment</strong> and see how your score has changed. You'll get:
              </p>
              <ul style="font-size: 15px; color: #4a5568; line-height: 1.8; padding-left: 20px;">
                <li>Side-by-side comparison with your previous score</li>
                <li>Updated recommendations based on your progress</li>
                <li>New benchmarks from recent assessments</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px; text-align: center;">
              <a href="${EMAIL_CONFIG.fullAssessmentUrl}?type=follow-up" style="display: inline-block; background: linear-gradient(135deg, #6436bf 0%, #42247f 100%); color: white; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 600; text-decoration: none;">
                Retake Assessment
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; text-align: center;">
              <p style="font-size: 12px; color: #718096; margin: 0;">
                Or reply to this email if you'd like to discuss your results.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Build executive summary email (for high-value leads)
 */
function buildExecutiveSummaryEmail(data) {
  const firstName = data.firstName || 'there';
  const company = data.company || 'your organization';
  const industry = data.industry || 'your industry';
  const psriScore = data.psriScore || 0;
  const archetype = data.archetype || 'Foundation';
  const industryContent = INDUSTRY_EMAIL_CONTENT[industry] || null;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f7f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: #1a202c; padding: 24px 32px;">
              <p style="color: #a78bfa; font-size: 11px; margin: 0 0 8px 0; letter-spacing: 1px;">EXECUTIVE BRIEFING</p>
              <h1 style="color: #fff; font-size: 22px; margin: 0; font-weight: 700;">
                Product System Readiness Assessment: ${company}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">Dear ${firstName},</p>
              <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
                Thank you for completing the PSRI assessment. Based on your responses, I've prepared this executive summary for ${company}.
              </p>
              
              <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <table width="100%">
                  <tr>
                    <td width="50%">
                      <p style="font-size: 12px; color: #718096; margin: 0 0 4px 0;">PSRI SCORE</p>
                      <p style="font-size: 36px; font-weight: 700; color: #1a202c; margin: 0;">${psriScore}/100</p>
                    </td>
                    <td width="50%">
                      <p style="font-size: 12px; color: #718096; margin: 0 0 4px 0;">READINESS TIER</p>
                      <p style="font-size: 24px; font-weight: 700; color: #6436bf; margin: 0;">${archetype}</p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <h2 style="font-size: 16px; color: #1a202c; margin: 24px 0 12px 0;">Key Findings</h2>
              <ul style="font-size: 15px; color: #4a5568; line-height: 1.8; padding-left: 20px;">
                <li><strong>Foundation:</strong> ${data.foundationNorm || 0}% maturity</li>
                <li><strong>Governance:</strong> ${data.governanceNorm || 0}% effectiveness</li>
                <li><strong>AI Readiness:</strong> ${data.aiNorm || 0}% prepared for AI integration</li>
              </ul>
              
              ${industryContent ? `
              <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 16px; margin: 24px 0;">
                <p style="font-size: 14px; color: #1e40af; margin: 0 0 8px 0; font-weight: 600;">${industry} Context</p>
                <p style="font-size: 14px; color: #4a5568; margin: 0;">${industryContent.complianceNote}</p>
                <p style="font-size: 13px; color: #6b7280; margin: 8px 0 0 0;">
                  <em>Reference: ${industryContent.caseStudy} achieved ${industryContent.caseStudyResult}</em>
                </p>
              </div>
              ` : ''}
              
              <h2 style="font-size: 16px; color: #1a202c; margin: 24px 0 12px 0;">Recommended Next Steps</h2>
              <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
                I recommend scheduling a 30-minute briefing to discuss these findings and outline a strategic roadmap tailored to ${company}'s specific context and objectives.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px; text-align: center;">
              <a href="${EMAIL_CONFIG.calendarLink}" style="display: inline-block; background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); color: white; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 600; text-decoration: none;">
                Schedule Executive Briefing
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #1a202c; text-align: center;">
              <p style="font-size: 12px; color: #a0aec0; margin: 0;">
                This briefing is complimentary and has no obligation attached.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Build internal alert email for hot leads
 */
function buildHotLeadAlertEmail(data, leadScore) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
  <h2 style="color: #10b981;">🔥 Hot Lead Alert: Grade ${leadScore.grade}</h2>
  
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Contact</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.firstName || ''} ${data.lastName || ''}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Email</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.email || 'Not provided'}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Company</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.company || 'Not provided'}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Industry</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.industry || 'Not specified'}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Company Size</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.companySize || 'Not specified'}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Role</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.role || 'Not specified'}</td>
    </tr>
    <tr style="background-color: #f0fdf4;">
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Lead Score</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 700; color: #10b981;">${leadScore.score}/100 (${leadScore.gradeLabel})</td>
    </tr>
    <tr style="background-color: #faf5ff;">
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">PSRI Score</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.psriScore || 0}/100 (${data.archetype || 'Foundation'} Tier)</td>
    </tr>
  </table>
  
  <h3>Score Breakdown</h3>
  <ul>
    ${Object.entries(leadScore.breakdown).map(([key, val]) => 
      `<li><strong>${key}:</strong> +${val.points} points ${val.value ? `(${val.value})` : ''}</li>`
    ).join('')}
  </ul>
  
  <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
    <strong>Priority:</strong> ${leadScore.priority}
  </p>
  
  <p style="margin-top: 20px;">
    <a href="${EMAIL_CONFIG.calendarLink}" style="background: #10b981; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
      Schedule Follow-up
    </a>
  </p>
</body>
</html>
  `;
}

/**
 * Send internal alert for hot leads (Grade A)
 */
function sendHotLeadAlert(data, leadScore) {
  if (!EMAIL_CONFIG.enabled || leadScore.grade !== 'A') return;
  
  const alertEmail = buildHotLeadAlertEmail(data, leadScore);
  
  try {
    MailApp.sendEmail({
      to: EMAIL_CONFIG.bccInternal,
      subject: `🔥 Hot Lead: ${data.company || data.email} (Score: ${leadScore.score})`,
      htmlBody: alertEmail,
      name: 'PSRI Lead Alert'
    });
  } catch (error) {
    Logger.log('Failed to send hot lead alert: ' + error.message);
  }
}

/**
 * Clean up old email queue entries (run monthly)
 */
function cleanupEmailQueue() {
  const ss = getOrCreateSpreadsheet();
  const queueSheet = ss.getSheetByName('Email Queue');
  
  if (!queueSheet) return;
  
  const dataRange = queueSheet.getDataRange();
  const values = dataRange.getValues();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  // Find rows to delete (sent more than 30 days ago)
  const rowsToDelete = [];
  
  for (let i = values.length - 1; i >= 1; i--) {
    const status = values[i][5];
    const scheduledTime = new Date(values[i][4]);
    
    if (status === 'sent' && scheduledTime < thirtyDaysAgo) {
      rowsToDelete.push(i + 1);
    }
  }
  
  // Delete rows (from bottom to top to preserve indices)
  rowsToDelete.forEach(row => {
    queueSheet.deleteRow(row);
  });
  
  Logger.log('Cleaned up ' + rowsToDelete.length + ' old email queue entries');
}

/**
 * Schedule re-engagement emails for cold leads (run weekly)
 * Finds leads who completed assessment 30+ days ago with no follow-up assessment
 */
function scheduleReEngagementEmails() {
  const ss = getOrCreateSpreadsheet();
  const assessmentsSheet = ss.getSheetByName(ASSESSMENTS_SHEET);
  const queueSheet = ss.getSheetByName('Email Queue');
  
  if (!assessmentsSheet || !queueSheet) return;
  
  const assessmentData = assessmentsSheet.getDataRange().getValues();
  const queueData = queueSheet.getDataRange().getValues();
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  
  // Get emails already in queue for re-engagement
  const alreadyQueued = new Set();
  for (let i = 1; i < queueData.length; i++) {
    if (queueData[i][3] === 'reEngagement') {
      alreadyQueued.add(queueData[i][0]);
    }
  }
  
  // Find leads eligible for re-engagement
  const scheduled = [];
  
  for (let i = 1; i < assessmentData.length; i++) {
    const timestamp = new Date(assessmentData[i][0]);
    const email = assessmentData[i][19]; // Email column
    const orgId = assessmentData[i][1];
    const assessmentType = assessmentData[i][2];
    
    // Skip if no email, already queued, or assessment too recent/too old
    if (!email || alreadyQueued.has(email)) continue;
    if (timestamp > thirtyDaysAgo || timestamp < sixtyDaysAgo) continue;
    
    // Skip if they've done a follow-up assessment
    if (assessmentType === 'follow-up') continue;
    
    // Check if this org has a newer assessment
    let hasNewerAssessment = false;
    for (let j = i + 1; j < assessmentData.length; j++) {
      if (assessmentData[j][1] === orgId) {
        hasNewerAssessment = true;
        break;
      }
    }
    if (hasNewerAssessment) continue;
    
    // Schedule re-engagement email
    const scheduledTime = new Date();
    scheduledTime.setDate(scheduledTime.getDate() + 1);
    
    queueSheet.appendRow([
      email,
      orgId,
      assessmentData[i][16] || 'Foundation', // Archetype
      'reEngagement',
      scheduledTime.toISOString(),
      'pending',
      assessmentData[i][17] || '', // First name
      assessmentData[i][4] || 0, // PSRI Score
      JSON.stringify({
        email,
        organizationId: orgId,
        firstName: assessmentData[i][17],
        psriScore: assessmentData[i][4],
        archetype: assessmentData[i][16],
        company: assessmentData[i][20],
        timestamp: timestamp.toISOString()
      })
    ]);
    
    scheduled.push(email);
    alreadyQueued.add(email);
  }
  
  Logger.log('Scheduled ' + scheduled.length + ' re-engagement emails');
  return scheduled;
}

/**
 * Get lead scoring dashboard data
 */
function getLeadScoringDashboard() {
  const summary = getLeadScoreSummary(30);
  const abResults = analyzeABTestResults();
  
  return {
    leadSummary: summary,
    abTestResults: abResults,
    recommendations: generateLeadRecommendations(summary)
  };
}

/**
 * Generate recommendations based on lead data
 */
function generateLeadRecommendations(summary) {
  const recommendations = [];
  
  // Check grade distribution
  const gradeA = summary.byGrade?.A || 0;
  const gradeB = summary.byGrade?.B || 0;
  
  if (gradeA > 0) {
    recommendations.push({
      priority: 'high',
      action: `Follow up with ${gradeA} hot leads immediately`,
      leads: summary.hotLeads
    });
  }
  
  if (gradeB > 3) {
    recommendations.push({
      priority: 'medium',
      action: `${gradeB} warm leads ready for nurture sequence`,
      suggestion: 'Consider scheduling outreach within 24 hours'
    });
  }
  
  // Check industry distribution for content ideas
  const topIndustries = Object.entries(summary.byIndustry || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  if (topIndustries.length > 0) {
    recommendations.push({
      priority: 'low',
      action: 'Top industries for content focus',
      industries: topIndustries.map(([ind, count]) => ({ industry: ind, count }))
    });
  }
  
  return recommendations;
}

