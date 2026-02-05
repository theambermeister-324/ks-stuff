# Product System Readiness Index (PSRI) Assessment Setup Guide

## Overview

This guide explains how to set up and use the PSRI Assessment with Google Sheets as the backend for data persistence, baseline tracking, and longitudinal measurement.

---

## What's New

### 1. Product System Readiness Index (PSRI)
A composite score (0-100) calculated using weighted pillars:

| Pillar | Weight | Rationale |
|--------|--------|-----------|
| Foundation | 25% | Table stakes—necessary but not differentiating |
| AI Readiness | 30% | Market differentiator, highest value signal |
| Governance | 25% | Execution enabler, often the bottleneck |
| Delivery | 20% | Sustainability factor |

**Formula:** `PSRI = (Foundation × 0.25) + (AI × 0.30) + (Governance × 0.25) + (Delivery × 0.20)`

### 2. Impact-Based Question Weights
Not all questions are equal. Questions are weighted by impact:
- **2.0 (Critical):** Governance structure, API maturity, Executive sponsor
- **1.5 (High Impact):** Design system state, AI tool usage, Budget commitment, Collaboration
- **1.0 (Standard):** Documentation, Change capacity, Workflow consistency

### 3. Longitudinal Tracking
- **Baseline assessments:** First assessment for an organization
- **Follow-up assessments:** Compare against baseline to measure progress
- **Progress Report:** Visual comparison of current vs. baseline scores

### 4. Google Sheets Backend
- Persistent storage of all assessments
- Baseline lookup by organization domain
- Data for generating aggregate benchmarks

---

## Setup Instructions

### Step 1: Deploy Google Apps Script Backend

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Delete any default code in `Code.gs`
4. Copy the entire contents of `google_apps_script_backend.js` into the editor
5. Click the **Save** icon (or Ctrl+S)
6. Name your project (e.g., "PSRI Assessment Backend")

### Step 2: Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon next to **"Select type"** and choose **"Web app"**
3. Configure:
   - **Description:** "PSRI Assessment Backend v1"
   - **Execute as:** "Me" (your account)
   - **Who has access:** "Anyone" (for public assessments)
4. Click **"Deploy"**
5. **Copy the Web App URL** (looks like `https://script.google.com/macros/s/XXXX/exec`)

### Step 3: Configure the Assessment

1. Open `ipe_assessment_ab.html`
2. Find this line near the top of the `<script>` section:
   ```javascript
   const GOOGLE_SHEETS_WEBAPP_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
   ```
3. Replace with your actual Web App URL:
   ```javascript
   const GOOGLE_SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```

### Step 4: Test the Integration

1. Open `ipe_assessment_ab.html` in a browser
2. Complete an assessment with test data
3. Check your Google Drive for a new spreadsheet named **"PSRI Assessment Data"**
4. Verify the data appears in both sheets:
   - **Assessments:** All submissions
   - **Baselines:** Latest baseline per organization

---

## Measurement Protocol

### Recommended Checkpoints

| Milestone | Timing | Purpose |
|-----------|--------|---------|
| **T0: Pre-Engagement Baseline** | Before SOW signed | Establish starting point |
| **T1: Post-Discovery** | 4–6 weeks in | Validate baseline, refine scope |
| **T2: Mid-Engagement** | Quarterly or post-phase | Track progress, celebrate wins |
| **T3: Engagement Close** | At delivery completion | Measure lift, generate case study |
| **T4+: Ongoing** | Annually or at renewal | Retention signal, upsell opportunity |

### What to Measure

- **PSRI Score:** Single composite metric (0-100)
- **Delta:** Change from baseline (e.g., "+18 points in 6 months")
- **Pillar Breakdown:** Which areas improved most
- **Archetype Progression:** "Foundation → Momentum → Scale"

---

## Customization

### Adjusting Question Weights

Edit the `questionWeights` object in `ipe_assessment_ab.html`:

```javascript
const questionWeights = {
  0: 1.5,   // Design system state
  1: 2.0,   // Governance structure (critical)
  2: 1.0,   // Documentation quality
  // ... etc
};
```

### Adjusting PSRI Pillar Weights

Edit the `PSRI_WEIGHTS` object:

```javascript
const PSRI_WEIGHTS = {
  foundation: 0.25,
  ai: 0.30,
  governance: 0.25,
  delivery: 0.20
};
```

**Note:** Weights must sum to 1.0.

### Adding Industry Benchmarks

The Google Apps Script includes a `generateBenchmarks()` function that calculates aggregate benchmarks from collected data. Run this periodically to update benchmark data.

---

## Data Schema

### Assessments Sheet

| Column | Description |
|--------|-------------|
| Timestamp | ISO timestamp |
| Organization ID | Email domain (e.g., "acme.com") |
| Assessment Type | "baseline" or "follow-up" |
| Industry | Selected industry |
| PSRI Score | Composite score (0-100) |
| Foundation % | Normalized pillar score |
| AI Readiness % | Normalized pillar score |
| Governance % | Normalized pillar score |
| Delivery % | Normalized pillar score |
| Recommended Path | J1-J4 tier |
| Archetype | Foundation/Momentum/Scale/Intelligence |
| ... | Lead info and raw answers |

### Baselines Sheet

| Column | Description |
|--------|-------------|
| Organization ID | Unique org identifier |
| Baseline Timestamp | When baseline was set |
| PSRI Score | Baseline PSRI |
| Foundation/AI/Governance/Delivery % | Pillar baselines |
| Last Updated | When record was last modified |

---

## Validation & Calibration

### Recommended Calibration Process

1. **Seed with known accounts:** Run the assessment for 5-10 existing customers where you know the engagement outcome
2. **Compare scores to outcomes:** Does a high PSRI correlate with faster time-to-value?
3. **Adjust weights if needed:** If governance is more predictive than expected, increase its weight
4. **Document calibration:** Note which accounts were used and what adjustments were made

### Publishing Benchmarks

Once you have sufficient data (50+ assessments), consider:
- Publishing quarterly benchmark reports
- Creating industry-specific comparisons
- Generating case studies from high-delta organizations

---

## Troubleshooting

### "Data not saved" warning
- Check that `GOOGLE_SHEETS_WEBAPP_URL` is correctly set
- Verify the Apps Script is deployed as a Web App
- Check the browser console for errors

### Baseline lookup not working
- Ensure the organization domain is entered consistently
- Check that a baseline assessment exists for that domain
- Verify the Apps Script has permission to read the spreadsheet

### CORS errors
- The script uses `mode: 'no-cors'` which doesn't return response data
- This is expected behavior for Apps Script Web Apps
- Data is still saved even if the response can't be read

---

## Next Steps

1. **Deploy the backend** following the setup instructions
2. **Run a test assessment** to verify data flows correctly
3. **Calibrate with known accounts** to validate scoring
4. **Set up baseline assessments** for active engagements
5. **Schedule quarterly re-assessments** to track progress

