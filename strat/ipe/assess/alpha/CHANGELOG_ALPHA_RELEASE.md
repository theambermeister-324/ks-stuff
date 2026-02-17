# PCRI Assessment Alpha Release Changelog

**Version:** 1.3  
**Release Date:** 2026-02-16  
**Release Type:** Alpha (Guided Delivery)

---

## Summary

This changelog documents all changes made to prepare the PCRI Assessment for alpha release. The alpha program involves 20 participants receiving guided assessments with Director-led debrief calls.

---

## Breaking Changes

None for alpha participants.

---

## New Features

### Assessment Core

- ✅ **Alpha Mode Configuration** (`ipe_assessment_ab.html`)
  - Added `ALPHA_MODE` flag for conditional alpha behavior
  - Added `ALPHA_DEBRIEF_CALENDLY` configuration
  - Added `PCRI_VERSION` constant (1.3)
  - Added `ALPHA_COHORT_SIZE` (20 participants)
  - Added `ALPHA_CLOSE_DATE` tracking
  - Alpha banner displays at top when enabled

- ✅ **Version Badge Display**
  - PCRI version now displays dynamically from configuration
  - Version controlled in single location for consistency

### Dashboard

- ✅ **PSRI → PCRI Rename** (`ipe_dashboard.html`)
  - All references updated from "PSRI" to "PCRI"
  - Title updated to "PCRI Assessment Analytics"
  - Subtitle updated to "Product Context Readiness Index Dashboard"

- ✅ **Culture Pillar Support**
  - Added Culture pillar to pillar chart (25% weight, pink #f472b6)
  - Added Culture to assessment table pillar bars
  - Added Culture to demo data generation
  - Pillar order: Culture → Foundation → AI Readiness → Governance → Delivery

### Backend

- ✅ **Google Apps Script Backend** (NEW: `google_apps_script_backend.js`)
  - Complete backend implementation for Google Sheets integration
  - Assessment submission handling with all 5 pillars
  - Baseline lookup and tracking
  - Alpha participant tracking sheet
  - Data export endpoint for dashboard
  - Benchmark generation from collected data
  - Helper functions for spreadsheet initialization

### Alpha Program Operations

- ✅ **Director Review Checklist** (NEW: `alpha_director_review_checklist.md`)
  - Pre-review preparation checklist
  - Score review template with gating validation
  - Archetype validation criteria
  - Answer spot-check guidance for high-weight questions
  - Curated report preparation sections
  - Calibration notes template
  - Debrief talking points framework
  - Quick reference tables

- ✅ **Participant Tracking Template** (NEW: `alpha_participant_tracker.csv`)
  - 20-row template for tracking cohort
  - Full participant lifecycle tracking
  - Source tracking (Warm Pipeline, DS Slack, LinkedIn, Conference)
  - All feedback capture fields

- ✅ **Post-Debrief Survey** (NEW: `alpha_post_debrief_survey.md`)
  - 16-question survey covering:
    - Assessment experience (clarity, length)
    - Results accuracy (archetype validation)
    - Report value
    - Debrief experience
    - NPS and testimonial permission
  - Email templates
  - Data collection notes with target metrics
  - Follow-up sequences by promoter/passive/detractor

---

## File Organization Changes

### Moved Files

- `AI_CAPABILITIES_ROLE_ANALYSIS.md` → `/deliver/`
  - Reason: Partner onboarding documentation belongs with delivery materials

- `CONTENT_ARCHITECTURE_RECOMMENDATIONS.md` → `/deliver/`
  - Reason: Partner onboarding documentation belongs with delivery materials

### Deprecated Files

- `ipe_assessment.html` → `/_deprecated/`
  - Reason: Superseded by `ipe_assessment_ab.html` with 5-pillar PCRI model
  - Deprecation notice in `/_deprecated/README.md`

---

## Configuration Updates

### Assessment Configuration (`ipe_assessment_ab.html`)

```javascript
// Alpha Mode Settings (lines 2718-2727)
const ALPHA_MODE = true;
const ALPHA_DEBRIEF_CALENDLY = 'https://calendly.com/YOUR_DIRECTOR_CALENDLY';
const PCRI_VERSION = '1.3';
const ALPHA_COHORT_SIZE = 20;
const ALPHA_CLOSE_DATE = '2026-03-03';
```

### Google Apps Script Configuration (`google_apps_script_backend.js`)

```javascript
// Security (change before deployment)
const EXPORT_KEY = 'YOUR_SECRET_EXPORT_KEY';

// Sheet Names
const SPREADSHEET_NAME = 'PCRI Assessment Data';
const ASSESSMENTS_SHEET = 'Assessments';
const BASELINES_SHEET = 'Baselines';
const ALPHA_SHEET = 'Alpha Participants';
```

---

## Benchmark Data

Industry benchmarks are synced to calibration data (`assessment_benchmark_calibration.md`):

| Industry | Avg PCRI | Top Quartile |
|----------|----------|--------------|
| Financial Services | 83.4 | 88.0 |
| Enterprise Software | 86.7 | 99.0 |
| Technology / Media | 85.0 | 99.0 |
| Healthcare | 81.4 | 81.0 |
| Retail / E-commerce | 82.6 | 81.0 |
| Telecommunications | 78.2 | 77.0 |
| Cross-industry (default) | 72.6 | 81.0 |

---

## Pre-Launch Checklist

### Before Alpha Launch

- [ ] Replace `YOUR_DIRECTOR_CALENDLY` with actual Calendly link
- [ ] Deploy Google Apps Script and update URL in `ipe_assessment_ab.html`
- [ ] Change `EXPORT_KEY` to secure value in Apps Script
- [ ] Test end-to-end flow with internal team
- [ ] Verify dashboard connects to backend
- [ ] Set up Google Sheet with proper sharing permissions
- [ ] Confirm alpha participant list in tracker

### During Alpha

- [ ] Monitor participant tracker daily
- [ ] Complete Director reviews within 48 hours of submission
- [ ] Send post-debrief surveys within 24 hours
- [ ] Submit calibration notes to product team

### Post-Alpha

- [ ] Aggregate feedback from surveys
- [ ] Review calibration notes
- [ ] Adjust question weights if needed
- [ ] Update archetype thresholds if needed
- [ ] Prepare public launch configuration (set `ALPHA_MODE = false`)

---

## Known Issues

1. **PDF Download Disabled** - Not a bug, intentional for alpha (curated reports delivered personally)
2. **Culture Questions** - May need calibration based on alpha feedback
3. **Gating Thresholds** - Monitor for excessive penalization

---

## Files Added in This Release

| File | Type | Purpose |
|------|------|---------|
| `google_apps_script_backend.js` | JavaScript | Google Sheets backend |
| `alpha_director_review_checklist.md` | Markdown | Director review process |
| `alpha_participant_tracker.csv` | CSV | Cohort tracking template |
| `alpha_post_debrief_survey.md` | Markdown | Survey templates |
| `_deprecated/README.md` | Markdown | Deprecation notice |
| `CHANGELOG_ALPHA_RELEASE.md` | Markdown | This file |

---

## Files Modified in This Release

| File | Changes |
|------|---------|
| `ipe_assessment_ab.html` | Alpha mode config, version badge, alpha banner |
| `ipe_dashboard.html` | PSRI→PCRI rename, Culture pillar, title updates |

---

## Contact

**Director of Delivery:** Amber  
**Email:** amber@knapsack.cloud

---

*Document generated for PCRI Alpha Program v1.3*

