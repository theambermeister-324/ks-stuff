# Product Context Readiness Index (PCRI) Methodology

**Version 2.0 | February 2026 | Knapsack**

---

## Executive Summary

The Product Context Readiness Index (PCRI) is a composite assessment framework designed to measure an organization's ability to deliver governed product context for AI-enabled delivery. Design systems solved yesterday's problem—fragmented interfaces and repeated implementation. But AI doesn't consume components; AI consumes context.

Unlike generic AI readiness quizzes or traditional design system maturity models, PCRI uniquely combines **product system foundation**, **AI readiness**, **organizational governance**, **delivery workflow**, and **culture & contribution** into a single, actionable score that predicts engagement success and tracks progress over time.

The framework draws on established research including DORA metrics, Project Aristotle findings, Team Topologies organizational patterns, Westrum organizational culture typology, and NIST AI Risk Management Framework principles.

---

## 1. Theoretical Foundation

### 1.1 Design Principles

PCRI is built on established principles from mature assessment frameworks:

| Principle | Source | PCRI Implementation |
|-----------|--------|---------------------|
| **Multi-dimensional assessment** | CMMI, Gartner IT Score | 5 distinct pillars with independent scoring |
| **Weighted composite scoring** | McKinsey DQ, Forrester DMM | Pillar weights based on predictive value |
| **Gated progression** | NASA TRL, CMMI levels | Foundation gates AI; Governance gates Delivery |
| **Normalized scaling** | ISO standards | Each pillar 0-100 before weighting |
| **Impact-weighted questions** | Psychometric best practices | Critical questions weighted 2x |
| **Research-backed factors** | DORA, Project Aristotle, Westrum | Culture pillar grounded in empirical research |

### 1.2 Why Five Pillars?

Research on successful product system transformations reveals five distinct capability domains that must be addressed:

1. **Foundation** — The technical substrate (tokens, components, APIs, accessibility)
2. **AI Readiness** — Ability to leverage AI with governed context and quality data
3. **Governance** — Organizational authority, decision rights, and executive sponsorship
4. **Delivery** — Workflow consistency, deployment frequency, and cross-functional collaboration
5. **Culture** — Contribution models, psychological safety, and information flow

These pillars are:
- **Mutually exclusive**: Each measures a distinct capability
- **Collectively exhaustive**: Together they cover the full readiness landscape
- **Independently measurable**: Each can be assessed with specific questions
- **Interdependent**: Progress in one affects achievable outcomes in others

### 1.3 Research Foundations

PCRI incorporates validated findings from:

| Research | Key Contribution | PCRI Application |
|----------|------------------|------------------|
| **DORA State of DevOps** | Deployment frequency correlates with performance | Delivery pillar metrics |
| **Google Project Aristotle** | Psychological safety predicts team effectiveness | Culture pillar questions |
| **Team Topologies** | Platform team model enables scaling | Delivery workflow assessment |
| **Westrum Typology** | Information flow indicates organizational health | Culture pillar scoring |
| **NIST AI RMF** | Governance frameworks for AI adoption | AI Readiness & Governance integration |

---

## 2. Pillar Definitions & Weights

### 2.1 Pillar Weights

| Pillar | Weight | Rationale |
|--------|--------|-----------|
| **Culture** | 25% | Foundational enabler—psychological safety and contribution culture are the strongest predictors of sustainable adoption per Project Aristotle research. |
| **Foundation** | 20% | Technical substrate—necessary for any product system work. Token architecture, components, and accessibility. |
| **AI Readiness** | 20% | Market differentiator. Organizations with AI context governance see 2-3x better outcomes. |
| **Governance** | 20% | Execution enabler. Executive sponsorship and decision rights—often the bottleneck for adoption. |
| **Delivery** | 15% | Sustainability factor. Deployment frequency and workflow consistency indicate organizational capacity. |

**Total: 100%**

### 2.2 Weight Rationale

The 25% weight on Culture reflects empirical research:
- Google's Project Aristotle identified psychological safety as the #1 predictor of team effectiveness
- Westrum's research shows information flow patterns predict organizational performance
- Contribution models determine long-term sustainability of product systems

Foundation, AI Readiness, and Governance are equally weighted (20% each) because:
- Foundation without governance = technical debt without adoption
- Governance without foundation = policy without enforcement
- AI Readiness requires both foundation and governance to deliver value

Delivery is weighted lowest (15%) because:
- It is most influenced by the other four pillars
- It tends to improve naturally as F/AI/G/C mature
- It is partially gated by governance maturity

---

## 3. Gated Progression Model

### 3.1 The Problem with Ungated Scoring

A simple weighted average allows organizations to score high on AI Readiness while having no foundation—this is misleading because:
- AI tools without governed context produce inconsistent output
- High AI adoption with low foundation = higher rework costs
- The score should reflect *achievable value*, not just *current state*

### 3.2 Gating Rules

PCRI implements two progression gates:

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
- **Effective scores**: What contributes to PCRI
- **Gating indicators**: Visual flags when discounts apply

---

## 4. Question Design & Weighting

### 4.1 Question Weight Tiers

| Weight | Category | Criteria | Examples |
|--------|----------|----------|----------|
| **2.0** | Critical | High predictive value, hard to remediate | Governance structure, API maturity, Executive sponsor, Psychological safety, Cross-system governance |
| **1.5** | High Impact | Strong signal, moderate remediation | Design system state, AI tool usage, Budget commitment, Accessibility approach, Platform team model, Deployment frequency |
| **1.0** | Standard | Baseline capability | Documentation, Change capacity, Workflow consistency, Time allocation |
| **0** | Informational | No score impact | Deployment tier selection |

### 4.2 Question Distribution

| Pillar | # Questions | Weight Range | Focus Areas |
|--------|-------------|--------------|-------------|
| Product System Foundation | 4 | 1.0 - 2.0 | Design system state, governance structure, documentation, accessibility |
| AI Readiness | 4 | 1.5 - 2.0 | AI tool usage, API maturity, product data quality, AI governance |
| Governance & Adoption | 5 | 1.0 - 2.0 | Executive sponsor, budget commitment, change capacity, communication, ROI measurement |
| Delivery Workflow | 7 | 1.0 - 1.5 | Decision clarity, experiment pace, cross-functional collaboration, tool chain, workflow consistency, platform team model, deployment frequency |
| Culture & Contribution | 7 | 1.0 - 2.0 | Contribution model, contributor diversity, community health, shared ownership, time allocation, psychological safety, information flow |

**Total: 27 scored questions + 1 informational**

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
5. **Calculate weighted composite (PCRI)**

### 5.2 Formula

```
PCRI = (Foundation_eff × 0.20) + (AI_eff × 0.20) + (Governance_eff × 0.20) + (Delivery_eff × 0.15) + (Culture_eff × 0.25)
```

Where `_eff` = effective score after gating.

### 5.3 Example Calculation

| Pillar | Raw % | Gating | Effective % | Weight | Contribution |
|--------|-------|--------|-------------|--------|--------------|
| Foundation | 35% | — | 35% | 0.20 | 7.0 |
| AI Readiness | 70% | Discounted (F<40) | 35% | 0.20 | 7.0 |
| Governance | 50% | — | 50% | 0.20 | 10.0 |
| Delivery | 60% | — | 60% | 0.15 | 9.0 |
| Culture | 55% | — | 55% | 0.25 | 13.75 |
| **PCRI** | | | | | **46.75 ≈ 47** |

Note: Without gating, PCRI would be 54. The 7-point difference reflects the limited value of AI readiness without foundation.

---

## 6. Archetype Mapping

### 6.1 PCRI to Archetype

| PCRI Range | Archetype | Primary Focus |
|------------|-----------|---------------|
| 0-44 | **Builder** | Establish foundations, build system of record |
| 45-54 | **Adopter** | Rapid enablement sprint, expand adoption |
| 55-74 | **Optimizer** | Full transformation, optimize at scale |
| 75-100 | **Transformer** | AI workflow expansion, innovation leadership |

### 6.2 Archetype Selection Logic

Archetype assignment uses both PCRI and pillar minimums to prevent misclassification:

```javascript
if (PCRI >= 75 && Foundation >= 70% && Governance >= 60% && Culture >= 60%)
    → Transformer

else if (PCRI >= 55 && Foundation >= 60% && Governance >= 55% && Culture >= 50%)
    → Optimizer

else if (PCRI >= 45 && Governance >= 50% && Culture >= 40%)
    → Adopter

else
    → Builder
```

This prevents misclassification (e.g., high PCRI from AI alone without foundation or culture).

### 6.3 Archetype Characteristics

| Archetype | Icon | Color | Typical Engagement |
|-----------|------|-------|-------------------|
| Builder | Hammer | Red (#ef4444) | 6-12 month foundation build |
| Adopter | Sprout | Amber (#fbbf24) | 3-6 month adoption sprint |
| Optimizer | Sliders | Blue (#3b82f6) | 6-9 month transformation |
| Transformer | Rocket | Green (#10b981) | Ongoing innovation partnership |

---

## 7. Tool Stack Integration Assessment

### 7.1 Purpose

Organizations with fragmented product tools face unique integration challenges. The Tool Stack Integration assessment measures an organization's readiness to benefit from Knapsack's integration platform capabilities—a key driver of TAM expansion beyond design systems.

### 7.2 Integration Fragmentation Index

The Integration Fragmentation Index (IFI) measures how many disconnected tools an organization uses across the product delivery workflow:

| Tool Category | Common Tools | Integration Opportunity |
|--------------|--------------|------------------------|
| **Design** | Figma, Sketch, Adobe XD | Token sync, component mapping |
| **Code** | GitHub, GitLab, Bitbucket | Code patterns, PR validation, CI/CD hooks |
| **Workflow** | Jira, Linear, Asana | Ticket context, sprint planning, story links |
| **Communication** | Slack, Teams, Discord | Decision capture, notifications, approval flows |
| **Documentation** | Notion, Confluence, GitBook | Docs sync, pattern library, team wikis |
| **Design System** | Zeroheight, Supernova, Storybook | Migration path, coexistence layer |

### 7.3 Integration Questions (5 questions)

| # | Focus Area | Weight | Key Capability |
|---|------------|--------|----------------|
| 33 | Tool Count | 1.5 | How many product delivery tools are in active use? |
| 34 | Context Fragmentation | 2.0 | How often does context need to be re-created across tools? |
| 35 | Integration Maturity | 1.5 | What's the current state of tool integrations? |
| 36 | Context Loss Impact | 1.5 | How much rework results from disconnected tools? |
| 37 | Integration Priority | 1.0 | How important is integration consolidation? |

### 7.4 IFI Scoring

| IFI Score | Label | Integration Opportunity |
|-----------|-------|------------------------|
| 0-30 | Low Fragmentation | Limited integration value—tools already connected |
| 31-60 | Moderate Fragmentation | Strong candidate—clear integration ROI |
| 61-100 | High Fragmentation | Urgent need—significant context loss occurring |

### 7.5 Implications for TAM Expansion

Organizations with high IFI scores represent the expanded TAM beyond design system teams:
- **Product teams** using 5+ disconnected tools
- **Operations teams** manually bridging contexts
- **Engineering teams** re-creating context for AI tools

These represent the $1B+ TAM expansion opportunity for 2027.

---

## 8. Multi-System Architecture Assessment

### 8.1 Purpose

Organizations with federated design systems, multi-brand portfolios, or multi-product ecosystems face unique challenges. The Multi-System Architecture assessment provides supplementary scoring for these organizations.

### 8.2 Multi-System Questions (6 questions)

| # | Focus Area | Weight | Key Capability |
|---|------------|--------|----------------|
| 38 | Token Architecture | 1.5 | Semantic vs. primitive token layers |
| 39 | Component Abstraction | 1.5 | Cross-system component patterns |
| 40 | Cross-System Governance | 2.0 | Decision rights across systems |
| 41 | Cross-System AI Context | 1.5 | Unified AI training data |
| 42 | Cross-System Contribution | 1.5 | Federated contribution models |
| 43 | Release Coordination | 1.0 | Synchronized vs. independent releases |

### 8.3 Scoring

- Multi-System score is calculated separately from PCRI
- Score is 0-100 normalized scale
- Only displayed for organizations selecting "Multi-System" landscape type
- Does not affect core PCRI calculation (additive insight, not composite factor)

### 8.4 System Landscape Types

| Type | Description | Shows Multi-System Questions |
|------|-------------|------------------------------|
| Single | One unified design system | No |
| Multi-Brand | Multiple brand-specific systems | Yes |
| Federated | Distributed systems with shared core | Yes |
| Platform | Platform-level system serving products | Yes |

---

## 9. Benchmarking Methodology

### 9.1 Benchmark Sources

Initial benchmarks are derived from:
- 158 enterprise assessment records (as of Jan 2026)
- Knapsack customer engagement data
- Industry analyst reports (Gartner, Forrester)

### 9.2 Industry Segmentation

Benchmarks are segmented by:
- **Industry vertical** (FinServ, Healthcare, Retail, Tech, etc.)
- **Organization size** (SMB, Mid-market, Enterprise)
- **Regulatory environment** (Standard, Regulated, Highly Regulated)

### 9.3 Benchmark Labels

| PCRI vs Industry Avg | Label |
|----------------------|-------|
| ≥ Top Quartile | **Top Quartile** |
| ≥ Industry Average | **Above Average** |
| ≥ 30 | **Below Average** |
| < 30 | **Early Stage** |

### 9.4 Benchmark Refresh Cadence

- **Quarterly**: Recalculate from aggregate data
- **Annually**: Validate correlation with outcomes
- **As needed**: Adjust for market shifts

---

## 10. Longitudinal Measurement

### 10.1 Assessment Types

| Type | When | Purpose |
|------|------|---------|
| **Baseline** | Pre-engagement | Establish starting point |
| **Follow-up** | During/post engagement | Measure progress |

### 10.2 Progress Metrics

| Metric | Calculation | Interpretation |
|--------|-------------|----------------|
| **PCRI Delta** | Current - Baseline | Overall improvement |
| **Pillar Delta** | Per-pillar change | Focus area progress |
| **Archetype Movement** | Tier progression | Milestone achievement |
| **Time-to-Tier** | Days to reach next tier | Velocity indicator |

### 10.3 Target Improvements

Based on engagement data, typical improvements:

| Engagement Duration | Expected PCRI Gain |
|--------------------|-------------------|
| 3 months | +8-12 points |
| 6 months | +15-22 points |
| 12 months | +25-35 points |

---

## 11. Validation & Calibration

### 11.1 Validation Approach

PCRI validity is assessed through:

1. **Face validity**: Expert review of question relevance
2. **Content validity**: Coverage of all relevant capability domains
3. **Criterion validity**: Correlation with engagement outcomes
4. **Construct validity**: Factor analysis of pillar structure
5. **Research validity**: Alignment with DORA, Project Aristotle, Westrum findings

### 11.2 Calibration Process

1. Run assessment on 10+ known customers with known outcomes
2. Compare PCRI predictions to actual engagement results
3. Identify questions with low predictive value
4. Adjust weights or replace questions
5. Document changes for version tracking

### 11.3 Recommended Calibration Cadence

| Activity | Frequency |
|----------|-----------|
| Question review | Quarterly |
| Weight validation | Bi-annually |
| Full recalibration | Annually |
| Major version update | As needed |

---

## 12. Versioning & Evolution

### 12.1 Version Numbering

```
PCRI [Major].[Minor]
```

- **Major**: Pillar structure or weight changes
- **Minor**: Question updates, threshold adjustments

### 12.2 Current Version

**PCRI 1.3** (February 2026)
- 5 pillars: Foundation, AI Readiness, Governance, Delivery, Culture
- Weights: 20/20/20/15/25
- 27 scored questions + 1 informational + 5 Tool Stack Integration + 6 Multi-System (optional)
- Tool Stack Integration Assessment (Integration Fragmentation Index)
- Gated progression enabled
- Research foundation: DORA, Project Aristotle, Team Topologies, Westrum, NIST AI RMF
- TAM expansion alignment for 2027 integration platform positioning

### 12.3 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.3 | 2026-02-16 | Added Tool Stack Integration Assessment (Section 7), Integration Fragmentation Index, TAM expansion alignment, renumbered sections 8-15 |
| 1.2 | 2026-02-05 | Added Culture pillar (25%), Multi-System Architecture assessment, expanded research foundation |
| 1.1 | 2026-01 | Expanded questions based on DORA, Project Aristotle, Team Topologies, Westrum research |
| 1.0 | 2026-02-04 | Initial release with 4 pillars |

### 12.4 Planned Evolution

| Timeframe | Potential Change |
|-----------|------------------|
| 2026 H2 | Add "Agent Readiness" sub-index under AI |
| 2027 | Industry-specific weight variants |
| 2027+ | "Security & Compliance" pillar consideration |

### 12.5 Backward Compatibility

When versions change:
- Historical scores are tagged with version
- Comparison reports note version differences
- Major changes require re-baselining

---

## 13. Ethical Considerations

### 13.1 Assessment Bias

PCRI is designed to minimize:
- **Question bias**: Neutral language, no leading questions
- **Cultural bias**: Applicable across industries and geographies
- **Size bias**: Questions work for 100-person and 100,000-person orgs

### 13.2 Data Privacy

- No PII required for scoring
- Organization data aggregated for benchmarks
- Individual responses not shared externally

### 13.3 Score Transparency

- Scoring algorithm is documented
- Weights are disclosed
- Gating logic is explained in results

---

## 14. Appendix: Technical Implementation

### 14.1 Scoring Algorithm (Pseudocode)

```javascript
function calculatePCRI(answers) {
  // Step 1: Calculate raw pillar scores
  let pillars = { foundation: 0, ai: 0, governance: 0, delivery: 0, culture: 0 };
  let maxes = { foundation: 0, ai: 0, governance: 0, delivery: 0, culture: 0 };
  
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
  pcri = (norms.foundation * 0.20) +
         (norms.ai * 0.20) +
         (norms.governance * 0.20) +
         (norms.delivery * 0.15) +
         (norms.culture * 0.25);
  
  return round(pcri);
}
```

### 14.2 Data Schema

| Field | Type | Description |
|-------|------|-------------|
| `pcriVersion` | string | "1.2" |
| `pcriScore` | int | 0-100 composite |
| `foundationNorm` | int | 0-100 after gating |
| `foundationNormRaw` | int | 0-100 before gating |
| `aiNorm` | int | 0-100 after gating |
| `aiNormRaw` | int | 0-100 before gating |
| `governanceNorm` | int | 0-100 |
| `deliveryNorm` | int | 0-100 after gating |
| `deliveryNormRaw` | int | 0-100 before gating |
| `cultureNorm` | int | 0-100 |
| `cultureNormRaw` | int | 0-100 before gating |
| `gatingApplied` | object | { ai: bool, delivery: bool } |
| `archetype` | string | Builder/Adopter/Optimizer/Transformer |
| `assessmentType` | string | baseline/follow-up |
| `organizationId` | string | Domain identifier |
| `timestamp` | ISO string | Assessment date |
| `systemLandscape` | string | single/multi-brand/federated/platform |
| `multiSystemNorm` | int | 0-100 (null if single system) |
| `isMultiSystem` | bool | Whether multi-system questions were shown |

### 14.3 Pillar Icon System

| Pillar | Icon | Color | Label |
|--------|------|-------|-------|
| Foundation | layers | #a78bfa | Foundation |
| AI Readiness | cpu | #60a5fa | AI Readiness |
| Governance | shield-check | #34d399 | Governance |
| Delivery | git-merge | #fbbf24 | Delivery |
| Culture | heart-handshake | #f472b6 | Culture |
| Multi-System | network | #0ea5e9 | Multi-System |

---

## 15. References

1. CMMI Institute. (2018). *CMMI Model V2.0*.
2. NASA. (2017). *Technology Readiness Level Definitions*.
3. Gartner. (2024). *IT Score for Digital Business*.
4. McKinsey & Company. (2023). *Digital Quotient Methodology*.
5. Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. (DORA Research)
6. Google re:Work. (2016). *Project Aristotle: What Makes a Team Effective?*
7. Skelton, M., & Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*.
8. Westrum, R. (2004). *A typology of organisational cultures*. BMJ Quality & Safety.
9. NIST. (2023). *AI Risk Management Framework (AI RMF 1.0)*.
10. InVision. (2021). *Design System Maturity Model*.
11. Supernova. (2025). *Design System Health Assessment*.

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.3 | 2026-02-16 | Knapsack | Added Tool Stack Integration Assessment (Section 7), Integration Fragmentation Index (IFI), aligned with TAM Expansion Analysis for 2027 integration platform positioning |
| 1.2 | 2026-02-05 | Knapsack | Added Culture pillar (25%), Multi-System Architecture, expanded research foundation (DORA, Project Aristotle, Team Topologies, Westrum, NIST AI RMF) |
| 1.1 | 2026-01 | Knapsack | Expanded question set based on organizational research |
| 1.0 | 2026-02-04 | Knapsack | Initial release |

---

*For questions about PCRI methodology, contact: ipe@knapsack.cloud*

