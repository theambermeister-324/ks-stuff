# Product System Readiness Index (PSRI) Methodology

**Version 1.0 | February 2026 | Knapsack**

---

## Executive Summary

The Product System Readiness Index (PSRI) is a composite assessment framework designed to measure an organization's readiness to evolve from traditional design systems to governed product systems with AI-enabled delivery capabilities.

Unlike generic AI readiness quizzes or traditional design system maturity models, PSRI uniquely combines **product system foundation**, **AI readiness**, **organizational governance**, and **delivery workflow** into a single, actionable score that predicts engagement success and tracks progress over time.

---

## 1. Theoretical Foundation

### 1.1 Design Principles

PSRI is built on established principles from mature assessment frameworks:

| Principle | Source | PSRI Implementation |
|-----------|--------|---------------------|
| **Multi-dimensional assessment** | CMMI, Gartner IT Score | 4 distinct pillars with independent scoring |
| **Weighted composite scoring** | McKinsey DQ, Forrester DMM | Pillar weights based on predictive value |
| **Gated progression** | NASA TRL, CMMI levels | Foundation gates AI; Governance gates Delivery |
| **Normalized scaling** | ISO standards | Each pillar 0-100 before weighting |
| **Impact-weighted questions** | Psychometric best practices | Critical questions weighted 2x |

### 1.2 Why Four Pillars?

Research on successful product system transformations reveals four distinct capability domains that must be addressed:

1. **Foundation** — The technical substrate (tokens, components, APIs)
2. **AI Readiness** — Ability to leverage AI with governed context
3. **Governance** — Organizational authority and decision rights
4. **Delivery** — Workflow consistency and team collaboration

These pillars are:
- **Mutually exclusive**: Each measures a distinct capability
- **Collectively exhaustive**: Together they cover the full readiness landscape
- **Independently measurable**: Each can be assessed with specific questions
- **Interdependent**: Progress in one affects achievable outcomes in others

---

## 2. Pillar Definitions & Weights

### 2.1 Pillar Weights

| Pillar | Weight | Rationale |
|--------|--------|-----------|
| **Foundation** | 25% | Table stakes—necessary but not differentiating. A design system must exist before it can be governed. |
| **AI Readiness** | 30% | Primary market differentiator. Highest predictive value for time-to-value in engagements. Organizations with AI adoption see 40-60% faster cycles. |
| **Governance** | 25% | Execution enabler. Often the bottleneck—technical capability without governance authority yields limited adoption. |
| **Delivery** | 20% | Sustainability factor. Indicates organizational capacity for change and workflow integration. |

**Total: 100%**

### 2.2 Weight Rationale

The 30% weight on AI Readiness reflects market reality:
- AI tool adoption is accelerating across enterprise development
- Organizations with AI context governance see 2-3x better outcomes
- AI readiness is the primary differentiator between "design system" and "product system"

Foundation and Governance are equally weighted (25% each) because:
- Foundation without governance = technical debt
- Governance without foundation = policy without enforcement
- Both must advance together for sustainable outcomes

Delivery is weighted lowest (20%) because:
- It is most influenced by the other three pillars
- It tends to improve naturally as F/AI/G mature
- It is partially gated by governance maturity

---

## 3. Gated Progression Model

### 3.1 The Problem with Ungated Scoring

A simple weighted average allows organizations to score high on AI Readiness while having no foundation—this is misleading because:
- AI tools without governed context produce inconsistent output
- High AI adoption with low foundation = higher rework costs
- The score should reflect *achievable value*, not just *current state*

### 3.2 Gating Rules

PSRI implements two progression gates:

#### Gate 1: Foundation → AI Readiness

```
IF Foundation < 40%:
    Effective AI Score = Raw AI Score × 0.5
```

**Rationale**: Without a system of record (tokens, components, documentation), AI tools generate output that cannot be governed. The AI score is discounted because its value is limited.

#### Gate 2: Governance → Delivery

```
IF Governance < 30%:
    Effective Delivery Score = Raw Delivery Score × 0.7
```

**Rationale**: Delivery workflow improvements require governance authority to enforce. Without governance, workflow gains are fragile and person-dependent.

### 3.3 Transparency

Both raw and gated scores are stored and displayed:
- **Raw scores**: What you measured directly
- **Effective scores**: What contributes to PSRI
- **Gating indicators**: Visual flags when discounts apply

---

## 4. Question Design & Weighting

### 4.1 Question Weight Tiers

| Weight | Category | Criteria | Examples |
|--------|----------|----------|----------|
| **2.0** | Critical | High predictive value, hard to remediate | Governance structure, API maturity, Executive sponsor |
| **1.5** | High Impact | Strong signal, moderate remediation | Design system state, AI tool usage, Budget commitment |
| **1.0** | Standard | Baseline capability | Documentation, Change capacity, Workflow consistency |
| **0** | Informational | No score impact | Deployment tier selection |

### 4.2 Question Distribution

| Pillar | # Questions | Weight Range | Max Weighted Points |
|--------|-------------|--------------|---------------------|
| Foundation | 3 | 1.0 - 2.0 | 45 |
| AI Readiness | 3 | 1.5 - 2.0 | 52.5 |
| Governance | 3 | 1.0 - 2.0 | 55 |
| Delivery | 5 | 1.0 - 1.5 | 22.5 |

### 4.3 Response Scale Design

Each question uses a 5-point scale with unequal intervals:

```
0 — None / Does not exist
2-4 — Emerging / Partial
5-7 — Established / Moderate
8-9 — Advanced / Strong
10 — Exemplary / Best-in-class
```

Unequal intervals prevent score clustering at the midpoint and reward genuine capability.

---

## 5. Composite Score Calculation

### 5.1 Calculation Steps

1. **Sum weighted raw points per pillar**
2. **Calculate max possible weighted points per pillar**
3. **Normalize each pillar to 0-100**
4. **Apply gating discounts if thresholds not met**
5. **Calculate weighted composite (PSRI)**

### 5.2 Formula

```
PSRI = (Foundation_eff × 0.25) + (AI_eff × 0.30) + (Governance_eff × 0.25) + (Delivery_eff × 0.20)
```

Where `_eff` = effective score after gating.

### 5.3 Example Calculation

| Pillar | Raw % | Gating | Effective % | Weight | Contribution |
|--------|-------|--------|-------------|--------|--------------|
| Foundation | 35% | — | 35% | 0.25 | 8.75 |
| AI Readiness | 70% | Discounted (F<40) | 35% | 0.30 | 10.5 |
| Governance | 50% | — | 50% | 0.25 | 12.5 |
| Delivery | 60% | — | 60% | 0.20 | 12.0 |
| **PSRI** | | | | | **43.75 ≈ 44** |

Note: Without gating, PSRI would be 53. The 9-point difference reflects the limited value of AI readiness without foundation.

---

## 6. Archetype Mapping

### 6.1 PSRI to Archetype

| PSRI Range | Archetype | Primary Focus |
|------------|-----------|---------------|
| 0-44 | **Foundation** | Build system of record |
| 45-54 | **Momentum** | Rapid enablement sprint |
| 55-74 | **Scale** | Full transformation |
| 75-100 | **Intelligence** | AI workflow expansion |

### 6.2 Archetype Selection Logic

Archetype assignment uses both PSRI and pillar minimums:

```javascript
if (PSRI >= 75 && Foundation >= 70% && Governance >= 60%)
    → Intelligence

else if (PSRI >= 55 && Foundation >= 60% && Governance >= 55%)
    → Scale

else if (PSRI >= 45 && Governance >= 50%)
    → Momentum

else
    → Foundation
```

This prevents misclassification (e.g., high PSRI from AI alone without foundation).

---

## 7. Benchmarking Methodology

### 7.1 Benchmark Sources

Initial benchmarks are derived from:
- 158 enterprise assessment records (as of Jan 2026)
- Knapsack customer engagement data
- Industry analyst reports (Gartner, Forrester)

### 7.2 Industry Segmentation

Benchmarks are segmented by:
- **Industry vertical** (FinServ, Healthcare, Retail, Tech, etc.)
- **Organization size** (SMB, Mid-market, Enterprise)
- **Regulatory environment** (Standard, Regulated, Highly Regulated)

### 7.3 Benchmark Labels

| PSRI vs Industry Avg | Label |
|----------------------|-------|
| ≥ Top Quartile | **Top Quartile** |
| ≥ Industry Average | **Above Average** |
| ≥ 30 | **Below Average** |
| < 30 | **Early Stage** |

### 7.4 Benchmark Refresh Cadence

- **Quarterly**: Recalculate from aggregate data
- **Annually**: Validate correlation with outcomes
- **As needed**: Adjust for market shifts

---

## 8. Longitudinal Measurement

### 8.1 Assessment Types

| Type | When | Purpose |
|------|------|---------|
| **Baseline** | Pre-engagement | Establish starting point |
| **Follow-up** | During/post engagement | Measure progress |

### 8.2 Progress Metrics

| Metric | Calculation | Interpretation |
|--------|-------------|----------------|
| **PSRI Delta** | Current - Baseline | Overall improvement |
| **Pillar Delta** | Per-pillar change | Focus area progress |
| **Archetype Movement** | Tier progression | Milestone achievement |
| **Time-to-Tier** | Days to reach next tier | Velocity indicator |

### 8.3 Target Improvements

Based on engagement data, typical improvements:

| Engagement Duration | Expected PSRI Gain |
|--------------------|-------------------|
| 3 months | +8-12 points |
| 6 months | +15-22 points |
| 12 months | +25-35 points |

---

## 9. Validation & Calibration

### 9.1 Validation Approach

PSRI validity is assessed through:

1. **Face validity**: Expert review of question relevance
2. **Content validity**: Coverage of all relevant capability domains
3. **Criterion validity**: Correlation with engagement outcomes
4. **Construct validity**: Factor analysis of pillar structure

### 9.2 Calibration Process

1. Run assessment on 10+ known customers with known outcomes
2. Compare PSRI predictions to actual engagement results
3. Identify questions with low predictive value
4. Adjust weights or replace questions
5. Document changes for version tracking

### 9.3 Recommended Calibration Cadence

| Activity | Frequency |
|----------|-----------|
| Question review | Quarterly |
| Weight validation | Bi-annually |
| Full recalibration | Annually |
| Major version update | As needed |

---

## 10. Versioning & Evolution

### 10.1 Version Numbering

```
PSRI [Major].[Minor]
```

- **Major**: Pillar structure or weight changes
- **Minor**: Question updates, threshold adjustments

### 10.2 Current Version

**PSRI 1.0** (February 2026)
- 4 pillars: Foundation, AI Readiness, Governance, Delivery
- Weights: 25/30/25/20
- 14 scored questions + 1 informational
- Gated progression enabled

### 10.3 Planned Evolution

| Timeframe | Potential Change |
|-----------|------------------|
| 2026 H2 | Add "Agent Readiness" sub-index under AI |
| 2027 | Industry-specific weight variants |
| 2027+ | "Security & Compliance" pillar consideration |

### 10.4 Backward Compatibility

When versions change:
- Historical scores are tagged with version
- Comparison reports note version differences
- Major changes require re-baselining

---

## 11. Ethical Considerations

### 11.1 Assessment Bias

PSRI is designed to minimize:
- **Question bias**: Neutral language, no leading questions
- **Cultural bias**: Applicable across industries and geographies
- **Size bias**: Questions work for 100-person and 100,000-person orgs

### 11.2 Data Privacy

- No PII required for scoring
- Organization data aggregated for benchmarks
- Individual responses not shared externally

### 11.3 Score Transparency

- Scoring algorithm is documented
- Weights are disclosed
- Gating logic is explained in results

---

## 12. Appendix: Technical Implementation

### 12.1 Scoring Algorithm (Pseudocode)

```javascript
function calculatePSRI(answers) {
  // Step 1: Calculate raw pillar scores
  let pillars = { foundation: 0, ai: 0, governance: 0, delivery: 0 };
  let maxes = { foundation: 0, ai: 0, governance: 0, delivery: 0 };
  
  for (question in questions) {
    score = answers[question] * questionWeights[question];
    max = maxScore[question] * questionWeights[question];
    pillars[question.category] += score;
    maxes[question.category] += max;
  }
  
  // Step 2: Normalize to 0-100
  let norms = {};
  for (pillar in pillars) {
    norms[pillar] = (pillars[pillar] / maxes[pillar]) * 100;
  }
  
  // Step 3: Apply gating
  if (norms.foundation < 40) {
    norms.ai = norms.ai * 0.5;
  }
  if (norms.governance < 30) {
    norms.delivery = norms.delivery * 0.7;
  }
  
  // Step 4: Calculate composite
  psri = (norms.foundation * 0.25) +
         (norms.ai * 0.30) +
         (norms.governance * 0.25) +
         (norms.delivery * 0.20);
  
  return round(psri);
}
```

### 12.2 Data Schema

| Field | Type | Description |
|-------|------|-------------|
| `psriVersion` | string | "1.0" |
| `psriScore` | int | 0-100 composite |
| `foundationNorm` | int | 0-100 after gating |
| `foundationNormRaw` | int | 0-100 before gating |
| `aiNorm` | int | 0-100 after gating |
| `aiNormRaw` | int | 0-100 before gating |
| `governanceNorm` | int | 0-100 |
| `deliveryNorm` | int | 0-100 after gating |
| `deliveryNormRaw` | int | 0-100 before gating |
| `gatingApplied` | object | { ai: bool, delivery: bool } |
| `archetype` | string | Foundation/Momentum/Scale/Intelligence |
| `assessmentType` | string | baseline/follow-up |
| `organizationId` | string | Domain identifier |
| `timestamp` | ISO string | Assessment date |

---

## 13. References

1. CMMI Institute. (2018). *CMMI Model V2.0*.
2. NASA. (2017). *Technology Readiness Level Definitions*.
3. Gartner. (2024). *IT Score for Digital Business*.
4. McKinsey & Company. (2023). *Digital Quotient Methodology*.
5. Forrester Research. (2024). *Digital Maturity Model 5.0*.
6. InVision. (2021). *Design System Maturity Model*.
7. Supernova. (2025). *Design System Health Assessment*.

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-04 | Knapsack | Initial release |

---

*For questions about PSRI methodology, contact: ipe@knapsack.cloud*

