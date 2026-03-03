# IPE V1 Launch Readiness PRD

**Document Owner:** Robin Cannon | **Sprint Lead:** Amber Atkins | **Created:** February 27, 2026 | **Updated:** March 2, 2026 (v1.2 — source document alignment review) | **GA Target:** March 31, 2026

> **How to use this document:** This PRD is the authoritative reference for V1 readiness. The Launch Checklist tracks execution against these requirements. The Offering Kit, GTM Playbook, and ROI Calculator are downstream deliverables. If a requirement here is green, it's ready. If it's red, GA is at risk.

| Metric | Count |
|---|---|
| Blocker Reqs | **21** |
| Must-Have Reqs | **17** |
| Should-Have Reqs | **10** |
| Workstreams | **10** |
| Total Requirements | **48** |

---

## 1. V1 Definition

### What IPE V1 Is

- **New source ingestion:** Storybook, Raw Markdown/MDX, and Knapsack content ingested, normalized, and available to AI tools
- **User-configurable conflict surfacing:** When multiple sources provide conflicting guidance, conflicts are detected, surfaced, and resolvable by admins
- **MCP-based consumption:** All context delivered to AI tools via Model Context Protocol, cloud-native
- **Admin capabilities:** Source management interface for adding, configuring, and monitoring context sources
- **Platform + Consumption pricing:** Tier 0 (Knapsack MCP) included in platform fee; premium tiers for additional sources and higher consumption
- **GA, not beta:** Positioned as an active, sellable product from day one with full legal, sales, and operational readiness

### What IPE V1 Is Not

- **Not an integration marketplace:** V2+ scope. V1 ships with 3 source types only (Knapsack, Storybook, MDX)
- **Not input/output integrations:** Jira, Zero Height, and other bidirectional integrations are V2 scope
- **Not multi-tool instrumentation:** Deferred to v1.1 per Linear. V1 captures basic MCP usage metrics only
- **Not self-serve mid-market:** V1 is enterprise-motion, human-delivered. Growth marketing, automated payments, and self-serve are 2027
- **Not a soft launch:** No beta buffer. Quality bar is GA from day one

### V1 Positioning

> **Core positioning (Feb 17 alignment):** MCP is a delivery mechanism, not the value proposition. The value is **aggregated intelligence** — the ability to ingest, weight, and surface context from multiple sources so AI agents produce better output. We are not selling an MCP server. We are selling the intelligence layer that makes every AI tool in the customer's ecosystem smarter.

### V1 Use Cases (Narrow Scope)

1. **Assessing** design system adoption and coverage
2. **Recommending** component usage and best practices to AI-assisted development
3. **Quantifying** design system value and ROI via measurable improvement metrics

**Source documents:** [Linear: IPE Initiative](https://linear.app/knapsack/initiative/the-intelligent-product-engine-ipe-3778914864ee) | Robin Cannon's IPE V1 Launch Strategy (Feb 23) | IPE Pricing Jam transcript (Feb 26)

### V1 Product Architecture (Two-Tier MCP)

> **Source:** Robin Cannon's "When v1 is done (in plain English)" — reconciled with PRD decisions. This two-tier model is the product architecture that IPE V1 delivers.

**Tier: Knapsack MCP (default — included in platform fee)**

- Uses the current MCP (graduating from beta) as the connection
- Serves Knapsack content only — no additional source ingestion
- No setup required by the customer; cloud-native, out-of-the-box
- Positioned as the **"Intelligence Guided Design System Platform"** (branding TBD pending Decision #10)
- Customer-facing disclaimer required: AI token usage is at the customer's expense as part of their overall AI usage charges, not billed by Knapsack

**Tier: Control Plane MCP (IPE multi-source — premium / consumption-priced)**

- Separate orchestration layer / multi-source context bridge to AI agents
- Serves aggregated context from Knapsack + Storybook + MDX sources
- Turning on Control Plane MCP replaces Knapsack MCP (transition should be invisible to end users — context quality improves without reconfiguration)
- Includes source control admin: add, turn on/off, delete, refresh sources
- Includes conflict surfacing and resolution capabilities

> **Key architecture note:** Knapsack MCP and Control Plane MCP are distinct products, not tiers of the same product. The upgrade path from Knapsack MCP to Control Plane MCP is a product transition, not a configuration change. This has engineering (switchover mechanism), UX (upgrade flow), and support (troubleshooting two different products) implications.

---

## 2. Decisions Register

### Decisions Made

| # | Decision | Detail | Date |
|---|---|---|---|
| 1 | **V1 ships as GA, not beta** | No prolonged beta stage. IPE is positioned as an active, sellable product from day one. This raises the quality bar — there is no soft-launch buffer. | Feb 17 |
| 2 | **Platform + Consumption pricing model** | Replaces prior "Freemium" language. Customers pay a platform fee (existing Knapsack pricing). IPE Tier 0 (Knapsack MCP) is included in that platform fee. Revenue growth comes from consumption tiers and additional source ingestion. | Feb 26 |
| 3 | **Tier 0 = "Included," not "Free"** | Knapsack MCP is included in the platform fee with a usage quota. Messaging must say "included" not "free" or "freemium." This is a genuine differentiator vs. competitors who require separate setup. | Feb 26 |
| 4 | **Consumption priced by operations, not tokens** | We do not pass through token costs. Consumption is measured in MCP operations (tool calls). Operations may be tiered by cost/complexity in the future, but the unit is "operation," not "token." | Feb 26 |
| 5 | **Don't charge for integrations (sources)** | Charging per source inhibits onboarding. More sources = more consumption = more revenue. Sources should be frictionless to add. | Feb 26 |
| 6 | **Predefined spend with overage expansion model** | Contracts set at a predefined consumption level, intentionally undersized. Adoption drives usage past the cap. Overage waiver tied to expansion/renewal. This is the core commercial lever. | Feb 26 |
| 7 | **Adoption is the revenue driver, not seat count** | Revenue risk shifts from selling to adoption. CX and delivery become critical to revenue growth. 8 people using it once an hour > 1 person using it every 10 minutes. | Feb 26 |
| 8 | **Intelligence, not technology, is the value proposition** | Position around aggregated intelligence delivered to AI agents, not around MCP as a protocol. Differentiates from IBM Carbon MCP, NY State MCP, and build-your-own approaches. | Feb 17 |

### Decisions Still Required

| # | Decision | Detail | Owner | Due |
|---|---|---|---|---|
| 1 | **Consumption tier boundaries and price points** | Tier 1/2/3 thresholds and dollar amounts. Current ranges ($24-48K) too wide to quote. Requires operation costing data from Grant first. **Blocks:** all GTM materials, AE enablement, CRM configuration. | Chris | Mar 14 |
| 2 | **Tier 0 usage quota number** | Specific operation count included in platform fee. Must be "enough to see value, not unlimited." Requires understanding of current MCP usage patterns (highest site: 195 requests/2 weeks). | Grant + Chris | Mar 7 |
| 3 | **ToS amendment vs. re-acceptance approach** | Do existing customers re-accept terms entirely, or can we use addendums? Impacts engineering work on acceptance tracking mechanism. | Robin + Legal | Mar 7 |
| 4 | **Enterprise test account for QA** | Need non-internal data with enterprise-scale source volume, concurrent users, and data complexity for pre-GA testing. | Amber | Mar 7 |
| 5 | **MDM strategy scope for V1** | Grant flagged need for master data management strategy across PPP. What's required for V1 vs. what can wait? | Grant | Mar 7 |
| 6 | **Feature flag approach for MCP GA** | MCP is currently behind a feature flag. Does V1 GA mean feature flag removal? Or keep for controlled rollout? What are the criteria for removing the flag? Per Sprint Kick-Off: "At what point does the feature flag go away?" | Sam + Robin | Mar 14 |
| 7 | **Storybook access gating during beta** | Storybook ingestion is a V1 source type, but should it be gated during MCP beta? If gated, need criteria for opening access. Impacts ENG-002 acceptance criteria and QA-004 beta feedback scope. | Robin + Sam | Mar 7 |
| 8 | **SLA tier mapping to consumption tiers** | Do SLA levels (response times, uptime guarantees) map directly to consumption tiers, or are they independent? Current Offering Kit shows Essentials/Pro/Enterprise SLA levels that don't clearly align with Tier 0/1/2/3 consumption model. | Chris + Robin | Mar 14 |
| 9 | **Beta vs. GA for IPE multi-source at March 31** | Robin's "When v1 is done" doc describes IPE multi-source as a **"free beta"** at launch with GA at end Q2. This PRD and the Launch Strategy both position March 31 as **GA, not beta**. These are contradictory. The answer determines quality bar, legal urgency, pricing readiness scope, and whether the entire commercial workstream is required by March 31 or can be deferred. **Blocks:** QA-003 (Go/No-Go criteria), all LEG-* deadlines, all COM-* deadlines. | Robin | Mar 7 |
| 10 | **"Intelligence Guided Design System Platform" branding** | "When v1 is done" doc introduces this as the rebranding of the default Knapsack offering with MCP included. If this is the direction, it requires: UX design for landing page and menu entry point, marketing materials update, in-product branding surfaces, and alignment across all customer-facing docs. Needs design + marketing sign-off before UX-003 can proceed. | Robin + Marketing | Mar 7 |

> **Legal counsel engagement model:** Donna Santucci is the gatekeeper for all legal review. All legal documents (ToS, DPA, MSA) route through Donna, who escalates to corporate counsel as needed. Per Sprint Kick-Off: existing SOC 2 report and corporate counsel relationship are in place. Nick (Security Ideals) has Linear access and is engaged for security documentation.

---

## 3. Requirements Matrix

**Blocker** = no GA without it. **Must-Have** = degraded GA without it. **Should-Have** = better GA with it.

### 3.1 Engineering Delivery

[Linear: Control Plane (IPE MVP)](https://linear.app/knapsack/initiative/the-intelligent-product-engine-ipe-3778914864ee) | Owner: Sam Alexander / Grant Gaudet

| ID | Requirement | Acceptance Criteria | Linear Status | Priority | Owner | Target |
|---|---|---|---|---|---|---|
| PRD-ENG-001 | **Knapsack content ingestion** | Knapsack content successfully ingested, normalized to PCIF, and retrievable via MCP. Tested with at least 1 production workspace. | On Track — [Source ingestion](https://linear.app/knapsack/project/source-ingestion-and-storage-4d2ac5b2742d) | Blocker | Varun | Mar 14 |
| PRD-ENG-002 | **Storybook source ingestion** | Storybook component metadata ingested, normalized to PCIF, available via MCP. At least component names, props, and usage examples captured. | On Track — [Source ingestion](https://linear.app/knapsack/project/source-ingestion-and-storage-4d2ac5b2742d) | Blocker | Varun | Mar 14 |
| PRD-ENG-003 | **MDX/Markdown source ingestion** | Raw MDX and Markdown files ingested, normalized to PCIF, available via MCP. Handles frontmatter, code blocks, and structured content. | On Track — Source ingestion | Blocker | Varun | Mar 14 |
| PRD-ENG-004 | **PCIF schema finalized** | Product Context Interchange Format schema published, versioned, and validated against all 3 source types. Breaking changes require explicit versioning strategy. | On Track — [PCIF schema 75%](https://linear.app/knapsack/project/source-normalization-and-orchestration-product-context-interchange-format-3adf1ec23fa0) | Blocker | Sam | Mar 7 |
| PRD-ENG-005 | **Conflict enrichment service** | When multiple sources provide conflicting guidance for the same component/pattern, conflicts are detected, categorized, and surfaced. Severity and confidence scoring implemented. | On Track — [Implementation 17%](https://linear.app/knapsack/project/source-conflict-enrichment-service-067c9632f640) | Blocker | Rizchel | Mar 14 |
| PRD-ENG-006 | **MCP distribution pipeline** | Aggregated context from multiple sources served via MCP to AI tools. Multi-source weighting applied. Response time acceptable for real-time AI tool usage. | No Updates — [In Prep since Jan 22](https://linear.app/knapsack/project/mcp-distribution-pipeline-10e001fb22f6) | Blocker | Sam | Mar 21 |
| PRD-ENG-007 | **Source management UI** | Admin can add, configure, monitor, and remove context sources via a web UI. Shows ingestion status, source health, and last sync time. | No Updates — [In Delivery since Feb 4](https://linear.app/knapsack/project/source-management-ui-067c9632f640) | Blocker | Carly | Mar 14 |
| PRD-ENG-008 | **User management & permissions** | Role-based access control for IPE admin functions. At minimum: admin (full access) and viewer (read-only). Permissions enforced on source management, conflict resolution, and settings. | No Updates — [In Prep since Jan 16](https://linear.app/knapsack/project/ipe-user-management-and-permissions-e97dacc174de) | Must-Have | Robin | Mar 14 |
| PRD-ENG-009 | **Conflict resolution UI** | Admin can view, prioritize, and resolve conflicts between sources. Resolution persists across ingestion cycles. Audit trail of resolution decisions. | No Updates — [In Prep, no priority](https://linear.app/knapsack/project/conflict-resolution-ui-8a19e6ee4349) | Must-Have | Robin | Mar 21 |
| PRD-ENG-010 | **Control Plane MCP switchover mechanism** | When customer upgrades from Knapsack MCP (Tier 0) to Control Plane MCP (IPE multi-source), transition is seamless. Knapsack MCP is replaced by Control Plane MCP without end-user reconfiguration. Context quality improves transparently. Rollback path to Knapsack MCP defined and tested. No disruption to active AI tool sessions during switchover. | N/A — *New from source document alignment review* | Blocker | Sam | Mar 21 |

> **Engineering risk:** 4 of 10 engineering requirements (ENG-006 through ENG-009) have "No Updates" in Linear. ENG-006 (MCP distribution pipeline) is the mechanism that actually delivers IPE to customers and has been stalled since January 22. ENG-010 (Control Plane MCP switchover) is new and has no Linear project yet. Immediate status check required on all stalled items.

### 3.2 Analytics & Metrics

Owner: Grant Gaudet / Carly

| ID | Requirement | Acceptance Criteria | Linear Status | Priority | Owner | Target |
|---|---|---|---|---|---|---|
| PRD-ANL-001 | **MCP usage data capture** | Every MCP operation logged with: timestamp, customer ID, operation type, source(s) accessed, response time. Data available for billing and analytics. | No Updates — [Discovery phase](https://linear.app/knapsack/project/data-capture-and-metrics-instrumentation-10e001fb22f6) | Blocker | Grant | Mar 14 |
| PRD-ANL-002 | **Analytics platform (core metrics)** | Infrastructure to aggregate and query MCP usage data. At minimum: operations per customer per day, unique users, source access patterns. | Being Defined — [No updates](https://linear.app/knapsack/project/analytics-platform-core-metrics-only-8a2d1fccd292) | Must-Have | Carly | Mar 21 |
| PRD-ANL-003 | **Adoption dashboard (basic view)** | Single internal dashboard showing per-customer MCP usage: operation counts, usage trends over time, active users. Sufficient for CX to track adoption and trigger expansion conversations. | Being Defined — [No updates](https://linear.app/knapsack/project/analytics-ui-basic-view-4d2a868fd48c) | Blocker | Carly | Mar 21 |
| PRD-ANL-004 | **Adoption metric definition** | Formal definition of what constitutes "adoption" for IPE. Must answer: What counts as an active user? What is a "meaningful" operation vs. a health check? What usage threshold = "adopted"? Per Sprint Kick-Off: "We're supposed to drive adoption so it's consumed — but we haven't defined what adoption means." This is upstream of ANL-003 (dashboard) and all commercial reporting. | Undefined — *New from Sprint Kick-Off* | Blocker | Chris + Grant | Mar 7 |

> **Critical dependency:** ANL-004 (adoption definition) is now upstream of ANL-001 (usage data capture), ANL-003 (adoption dashboard), AND consumption billing. Without defining what "adoption" means, we can't instrument the right metrics, build the right dashboard, or validate the commercial model. Grant noted in the Pricing Jam: "the highest site usage in the last two weeks is 195 requests to a tool call" — we need this data to set tier boundaries, but first we need to agree on what to count.

### 3.3 Legal & Compliance

[Linear: ToS / DPA / Security Review](https://linear.app/knapsack/project/tos-dpa-security-review-ipe-launch-readiness-cf540dd55dfa) | "The workstream with the least compressible timeline" — Robin

| ID | Requirement | Acceptance Criteria | Linear Status | Priority | Owner | Target |
|---|---|---|---|---|---|---|
| PRD-LEG-001 | **Terms of Service addendum** | Updated ToS with IPE-specific data processing terms drafted, reviewed by counsel, and approved. Covers: ingestion of customer source materials, storage of context sources, aggregation/weighting across inputs, and any third-party involvement. | On Track — In progress | Blocker | Legal + Robin | Mar 21 |
| PRD-LEG-002 | **Data Processing Agreement** | GDPR-compliant DPA covering IPE storage patterns. **Must include complete sub-processor inventory** (Cloudflare, BrainTrust, Snowflake, and all vendors that touch customer data). Current DPA is out of date and missing recently added vendors. Addresses EU customer requirements and US enterprise procurement. Reviewed and approved. | At Risk — DPA out of date per Bloom | Blocker | Legal + Bloom | Mar 21 |
| PRD-LEG-003 | **MSA amendment template** | IPE addendum template for existing customers adding IPE to current contracts. Covers context ingestion, MCP delivery, and conflict data handling. Ready for AE/Legal to use in deal cycles. | On Track — In progress | Blocker | Legal + Robin | Mar 21 |
| PRD-LEG-004 | **Security FAQ** | Published document with pre-emptive answers to enterprise procurement security questions about IPE. References SOC 2 Type II. Accelerates deal cycles by front-loading security review. | On Track — In progress | Blocker | Security (Nick) | Mar 21 |
| PRD-LEG-005 | **ToS acceptance tracking** | Mechanism for customers to accept updated terms with an audit trail. Acceptance status queryable per customer. Required before IPE can be enabled for any customer. | In Prep — Engineering TBD | Blocker | Product + Legal | Mar 28 |
| PRD-LEG-006 | **Token cost disclaimer** | Customer-facing disclaimer that AI token usage related to Knapsack MCP / Control Plane MCP is at the customer's expense as part of their overall AI usage charges, not billed by Knapsack. Must appear in: (1) ToS/terms language, (2) onboarding documentation, (3) in-product UI during MCP setup. Wording approved by legal. | N/A — *New from source document alignment review* | Must-Have | Legal + Robin | Mar 21 |

### 3.4 Commercial & Pricing

[Linear: Monetization model](https://linear.app/knapsack/project/monetization-model-33254133cae8) (Being defined, no updates) | Owner: Chris Strahl

| ID | Requirement | Acceptance Criteria | Linear Status | Priority | Owner | Target |
|---|---|---|---|---|---|---|
| PRD-COM-001 | **Pricing model framework + costing data** | Pricing model framework defined (what levers, what tiers, what counts as an operation). Current operational cost is ~$200/month ("trivial" per Bloom) — this is value-based pricing, not cost-plus. Usage data exists back to September 2025. Deliverable: the model itself with pluggable numbers, not necessarily final prices. Sam: "The model is more important than the actual numbers." | Being Defined — [Monetization model](https://linear.app/knapsack/project/monetization-model-33254133cae8) | Blocker | Grant | Mar 7 |
| PRD-COM-002 | **Tier 0 usage quota** | Specific operation count for Tier 0 (platform-included) defined and approved. Based on: current usage patterns, cost data, and "enough to demonstrate value." Documented with rationale. | Being Defined | Blocker | Grant + Chris | Mar 7 |
| PRD-COM-003 | **Consumption tier boundaries** | Tier 1, 2, 3 thresholds defined with specific operation ranges and price points. **Value-based, not cost-plus** — operational costs are trivial (~$200/mo total infrastructure), so pricing reflects value delivered to customer, not cost to serve. Quotable by AEs without further approval. Documented in pricing card format. | Being Defined | Blocker | Chris | Mar 14 |
| PRD-COM-004 | **CRM/HubSpot configuration** | Deal structure updated to reflect Platform + Services + Consumption. Pipeline stages match new model. Deal properties include consumption tier and estimated usage. AEs can create IPE deals without workarounds. | N/A | Must-Have | Rev Ops | Mar 21 |

> **Dependency chain:** COM-001 (costing) → COM-002 (Tier 0 quota) → COM-003 (tier boundaries) → COM-004 (CRM update) → All sales readiness materials. If costing data is not delivered by March 7, the entire commercial and sales readiness workstream cascades.

### 3.5 UX & Onboarding

Owner: Robin, with Carly, Matt, Brennan | "The 'what's next' experience after adding a context source is the primary gap" — Robin's Strategy

| ID | Requirement | Acceptance Criteria | Linear Status | Priority | Owner | Target |
|---|---|---|---|---|---|---|
| PRD-UX-001 | **"What's next" post-connection experience** | After adding a context source, user is guided to at least 1 actionable next step (e.g., "Try asking your AI tool about [component]"). No dead-end experience. | In Design — Discussions ongoing | Must-Have | Robin + Carly | Mar 14 |
| PRD-UX-002 | **End-to-end admin workflow** | Admin can complete full flow: add source → configure → see ingestion status → view conflicts → resolve conflicts → verify MCP output. No step requires CLI or direct DB access. | N/A — Spans ENG-007/009 | Must-Have | Carly | Mar 21 |
| PRD-UX-003 | **IPE landing page and entry point** | New menu bar option (location TBD, "When v1 is done" suggests top right) leads to a landing page introducing: (1) the default "Intelligence Guided" offering (Knapsack MCP), (2) the IPE upgrade path (Control Plane MCP), and (3) CTA to talk to sales/CX to activate IPE. Includes confirmation/visual alert "Your design system is feeding your AI tools" when Knapsack MCP is active. | N/A — *New from source document alignment review* | Must-Have | Robin + Carly | Mar 21 |
| PRD-UX-004 | **Knapsack MCP → Control Plane MCP upgrade flow** | Clear in-product path for customer to upgrade from Knapsack MCP to Control Plane MCP (IPE multi-source). Includes: what the upgrade means, what changes, what happens to existing MCP connections, and CTA to initiate. Per "When v1 is done": the transition should be "broadly invisible to user — their context just gets better." | N/A — *New from source document alignment review* | Must-Have | Robin + Carly | Mar 21 |
| PRD-UX-005 | **MCP connection documentation** | Verified, up-to-date documentation for setting up both Knapsack MCP and Control Plane MCP connections. "When v1 is done" notes this "already exists" — but must be reviewed for accuracy with the two-tier architecture and confirmed adequate for GA. Includes "How to use your control plane" guidance and prompt list for conflict/gap analysis. | N/A — *New from source document alignment review* | Should-Have | Product | Mar 21 |

### 3.6 Demo & Engagement

Owner: Robin | "No demo assets exist yet" — Robin's Strategy

| ID | Requirement | Acceptance Criteria | Linear Status | Priority | Owner | Target |
|---|---|---|---|---|---|---|
| PRD-DEM-001 | **Demo assets** | At minimum: scripted video walkthrough or live demo environment showing IPE flow (add source → context ingested → conflict surfaced → use in AI tool → better output). Usable by AE/SE without product team present. | N/A | Must-Have | Product + Mktg | Mar 21 |
| PRD-DEM-002 | **Competitive battle cards** | 1-page positioning against: IBM Carbon MCP, NY State MCP, and "build your own MCP" approaches. Includes differentiation points, talk track, and objection responses. | N/A | Should-Have | Marketing | Mar 21 |

### 3.7 QA & Launch Readiness

Owner: Robin | "V1 is not a beta. The launch plan goes straight from internal testing to GA." — Robin's Strategy

| ID | Requirement | Acceptance Criteria | Linear Status | Priority | Owner | Target |
|---|---|---|---|---|---|---|
| PRD-QA-001 | **Enterprise-scale testing** | IPE tested with enterprise-scale data: realistic source volume (not just internal test data), concurrent users, and data complexity. At least 1 test with non-Knapsack-internal workspace. | N/A | Blocker | Robin | Mar 21 |
| PRD-QA-002 | **CX product knowledge transfer** | CX team has completed hands-on training with IPE. Can: demo the product, troubleshoot basic issues, answer top 10 customer questions, and support onboarding without escalating to product. | N/A | Blocker | Product + CX | Mar 28 |
| PRD-QA-003 | **Go/No-Go decision gate** | All Blocker-priority requirements in this PRD are green. Executive sign-off documented. Fallback plan defined if any Blocker is not met. | N/A | Blocker | Robin + Chris | Mar 28 |
| PRD-QA-004 | **MCP beta feedback collection** | Structured process for collecting and triaging MCP beta feedback from internal and early-access users. Includes: feedback intake form, severity classification, weekly triage, and clear criteria for "beta-blocking" vs. "post-GA." Must inform QA-005 graduation criteria. | N/A — *New from Sprint Kick-Off* | Must-Have | Robin + Product | Mar 14 |
| PRD-QA-005 | **MCP graduation plan (beta → GA)** | Documented plan for transitioning MCP from beta to GA. Includes: graduation criteria (stability, performance, coverage), feature flag removal strategy, customer communication plan, and rollback procedure. Per Sprint Kick-Off: "MCP is in beta today — what are the criteria for graduating it?" | N/A — *New from Sprint Kick-Off* | Blocker | Robin + Sam | Mar 21 |

### 3.8 Sales Readiness (Parallel Workstream)

Owner: Amber | No dependencies on pricing decisions for initial drafting. Finalize with actual numbers in Week 2.

| ID | Requirement | Acceptance Criteria | Priority | Owner | Target |
|---|---|---|---|---|---|
| PRD-SAL-001 | **Pricing & positioning training** | 1-hour session delivered to all AE/SE/CX. Covers: Platform + Consumption model, "included not free" positioning, adoption-first selling, overage expansion model. Recorded for async access. | Must-Have | Amber + Chris | Mar 21 |
| PRD-SAL-002 | **IPE quick reference card** | Single page with: value prop, 3 personas, 4 use cases, pricing tier summary, and key objection responses. Printable for sales calls. | Must-Have | Amber | Mar 14 |
| PRD-SAL-003 | **Objection handling guide** | Top 10 objections with scripted responses. Must include: "Why not build our own MCP?", "What's the ROI?", "Why consumption pricing?", "Token cost concerns", and security/compliance objections. | Must-Have | Amber + CX | Mar 14 |
| PRD-SAL-004 | **Discovery call script** | Structured discovery flow: opener, PCRI validation questions, AI readiness signals, deployment tier signals, next steps. Tested by at least 1 AE before GA. | Should-Have | CX | Mar 14 |
| PRD-SAL-005 | **Email templates (3 sequences)** | Published and approved: 1) Existing customer IPE intro, 2) New prospect cold outreach, 3) Post-demo follow-up. All use "IPE included" messaging. | Should-Have | Mktg + CX | Mar 21 |
| PRD-SAL-006 | **CX adoption playbook** | 30-60-90 day adoption milestones defined. Usage triggers for expansion conversation documented. QBR template focused on consumption growth. | Should-Have | CX | Mar 21 |
| PRD-SAL-007 | **Customer overview deck** | 10-slide presentation covering: what is IPE, why now, how it works, pricing overview, getting started. Usable for first call or email attachment. | Should-Have | Marketing | Mar 21 |

### 3.9 Document Consistency

Messaging alignment required across all customer-facing and internal documents.

| ID | Requirement | Acceptance Criteria | Priority | Owner | Target |
|---|---|---|---|---|---|
| PRD-DOC-001 | **Remove "Freemium" language** | All documents updated: "Free" → "Tier 0" or "Included." "Freemium" → "Platform + Consumption." Applies to: Offering Kit, Onboarding Kit, Index page, ROI Calculator. **Also applies to:** Robin's "When v1 is done" and "IPE V1 Launch Strategy" docs, which both use "free" / "freemium" language that contradicts the Feb 26 Pricing Jam decisions. | Should-Have | Amber | Mar 7 |
| PRD-DOC-002 | **Align SLA tiers to consumption tiers** | SLA table in Offering Kit maps Essentials/Pro/Enterprise to Tier 0/1/2/3. No orphaned tier references. | Should-Have | Amber | Mar 14 |

### 3.10 Marketing & Launch Communications

Owner: Marketing + Robin | Source: Robin's "When v1 is done (in plain English)" — specifies launch communications required for V1 readiness

| ID | Requirement | Acceptance Criteria | Priority | Owner | Target |
|---|---|---|---|---|---|
| PRD-MKT-001 | **Release announcement** | Public announcement of IPE V1 availability. Coordinated across website, social, and direct channels. Uses approved positioning ("Intelligence, not technology"). Reviewed by Robin and Chris before publication. | Must-Have | Marketing | Mar 28 |
| PRD-MKT-002 | **Release video** | Produced video covering: what IPE is, how it works, and the value proposition. Usable for website, sales outreach, and social channels. Does not require live demo environment — can use scripted walkthrough with screen recordings. | Should-Have | Marketing | Mar 28 |
| PRD-MKT-003 | **Existing customer communication plan** | Direct communication to all existing Knapsack customers about: (1) Knapsack MCP now included as standard ("Intelligence Guided" platform), (2) IPE upgrade path available, (3) what's changed in terms/ToS. Sequenced after LEG-005 (ToS acceptance tracking) is live. | Must-Have | Marketing + CX | Mar 28 |
| PRD-MKT-004 | **Blog posts (PMF + technical)** | Two blog posts: (1) Product-market fit narrative — why aggregated intelligence matters for design systems, (2) Technical gravitas — architecture, PCIF, multi-source context. Published at or near GA. | Should-Have | Marketing | Mar 31 |
| PRD-MKT-005 | **Demo staffing readiness** | At minimum 2 Knapsack employees comfortable and able to demo MCP setup (Knapsack or Control Plane) and articulate the benefits of high-context AI usage. Several additional employees able to talk about the intelligence-guided platform and/or IPE with real understanding. Not just scripted — genuine fluency. | Must-Have | Product + CX | Mar 28 |

---

## 4. Dependency Map

Critical chains where a delay in one requirement cascades to downstream work.

### Chain 1: Engineering Critical Path

```
ENG-001/002/003 (Source Ingestion) → ENG-004 (PCIF Schema) → ENG-005 (Conflict Enrichment) → ENG-006 (MCP Distribution) → ENG-010 (Control Plane Switchover) → ANL-001 (Data Capture)
```

> **Bottleneck:** ENG-006 (MCP distribution) depends on ENG-005 (conflict enrichment, at 17%) and ENG-001/002/003 (source ingestion). ENG-010 (Control Plane MCP switchover) depends on ENG-006 and is the mechanism by which customers upgrade from Knapsack MCP to the full IPE experience. No updates on ENG-006 since January 22. ENG-010 has no Linear project yet.

### Chain 2: Commercial Critical Path

```
ANL-004 (Adoption Def) → ANL-001 (Data Capture) → COM-001 (Pricing Model) → COM-002 (Tier 0 Quota) → COM-003 (Tier Boundaries) → COM-004 (CRM Update)
                                                                                                              ↘ All SAL-* materials finalized with pricing
```

### Chain 3: Legal & Access Control

```
LEG-001/002/003 (ToS + DPA + MSA) → LEG-005 (Acceptance Tracking) → IPE enabled for customers
```

### Chain 4: UI Critical Path

```
DECISION #10 (Branding) → UX-003 (Landing Page) → UX-004 (Upgrade Flow)
ENG-008 (User Mgmt) → ENG-007 (Source Mgmt UI) → ENG-009 (Conflict UI) → UX-002 (Admin Workflow)
```

> **Blocked chain:** ENG-008 (permissions) blocks ENG-007 (source management UI), which blocks ENG-009 (conflict resolution UI). All three have "no updates" in Linear. This entire UI chain is stalled. **New:** UX-003 (landing page) and UX-004 (upgrade flow) are blocked on Decision #10 (branding direction). UX-005 (MCP connection docs) can proceed independently.

### Chain 5: MCP Graduation Path

```
QA-004 (Beta Feedback) → QA-005 (Graduation Plan) → DECISION (Feature Flag) → DECISION #9 (Beta vs GA) → QA-003 (Go/No-Go)
```

> **New chain:** MCP is currently in beta behind a feature flag. Beta feedback collection (QA-004) informs the graduation plan (QA-005), which includes the feature flag removal criteria. **Decision #9 (Beta vs. GA for IPE multi-source) is now upstream of the Go/No-Go gate** — the answer determines whether QA-003 evaluates against GA criteria or beta criteria.

### Chain 6: Marketing & Launch Communications

```
DECISION #9 (Beta vs GA) → MKT-001 (Release Announcement) + MKT-002 (Release Video)
LEG-005 (ToS Acceptance) → MKT-003 (Customer Communication)
DEM-001 (Demo Assets) → MKT-005 (Demo Staffing)
MKT-004 (Blog Posts) — independent, can proceed in parallel
```

> **New chain:** Marketing deliverables from "When v1 is done" that were not previously tracked. MKT-003 (customer communication) depends on LEG-005 (ToS acceptance tracking) being live. MKT-005 (demo staffing) depends on demo assets existing first. MKT-001 and MKT-002 are blocked on Decision #9 — the release messaging differs significantly between "GA launch" and "beta launch."

### Chain 7: Token Cost & Legal

```
LEG-006 (Token Disclaimer) → UX-003 (Landing Page — includes disclaimer in UI) + LEG-001 (ToS — includes disclaimer in terms)
```

> **New chain:** Token cost disclaimer language must be approved by legal before it can appear in product UI (UX-003) and terms (LEG-001).

---

## 5. Sprint Gate Criteria

Each Friday checkpoint has a clear set of requirements that must be met. Pass = proceed. Fail = escalate and adjust.

### Gate 1: Pricing Foundation — Friday, March 7

- [ ] **PRD-ENG-004** PCIF schema finalized and approved
- [ ] **PRD-COM-001** Operation costing data delivered by Grant
- [ ] **PRD-COM-002** Tier 0 usage quota recommended
- [ ] **PRD-ANL-004** Adoption metric definition agreed (what counts as "adopted")
- [ ] **PRD-DOC-001** "Freemium" language removed from all documents (including Robin's source docs)
- [ ] **DECISION #9** Beta vs. GA for IPE multi-source resolved — Robin to confirm (blocks all downstream planning)
- [ ] **DECISION #10** "Intelligence Guided Design System Platform" branding direction decided (blocks UX-003/004)
- [ ] **DECISION** ToS amendment vs. re-acceptance approach decided
- [ ] **DECISION** Enterprise test account identified
- [ ] **DECISION** MDM strategy scope for V1 defined
- [ ] **DECISION** Storybook access gating during beta decided
- [ ] **STATUS** ENG-006 (MCP distribution) status check — still stalled?
- [ ] **STATUS** ENG-007/008/009 status check — UI chain still stalled?
- [ ] **STATUS** DPA sub-processor inventory started (LEG-002)

### Gate 2: Pricing Locked + Internal Testing — Friday, March 14

- [ ] **PRD-ENG-001** Knapsack ingestion complete and tested
- [ ] **PRD-ENG-002** Storybook ingestion complete and tested
- [ ] **PRD-ENG-003** MDX ingestion complete and tested
- [ ] **PRD-ENG-005** Conflict enrichment service functional
- [ ] **PRD-ENG-007** Source management UI — minimum viable CRUD
- [ ] **PRD-ENG-008** User permissions enforced
- [ ] **PRD-COM-003** Consumption tier boundaries and pricing approved by Chris
- [ ] **PRD-UX-001** "What's next" experience designed and in development
- [ ] **PRD-UX-003** IPE landing page and entry point — design approved (if Decision #10 resolved at Gate 1)
- [ ] **PRD-QA-004** MCP beta feedback collection process operational
- [ ] **PRD-SAL-002** Quick reference card drafted (placeholder pricing OK)
- [ ] **PRD-SAL-003** Objection handling guide drafted
- [ ] **PRD-DOC-002** SLA tiers aligned to consumption tiers
- [ ] **DECISION** Feature flag approach for MCP GA decided
- [ ] **DECISION** SLA tier mapping to consumption tiers decided

### Gate 3: Legal + Operations Complete — Friday, March 21

- [ ] **PRD-ENG-006** MCP distribution pipeline functional — multi-source context served
- [ ] **PRD-ENG-009** Conflict resolution UI functional
- [ ] **PRD-ENG-010** Control Plane MCP switchover mechanism — design complete, in development
- [ ] **PRD-ANL-001** MCP usage data capture operational
- [ ] **PRD-ANL-003** Adoption dashboard MVP available
- [ ] **PRD-LEG-001** ToS addendum finalized
- [ ] **PRD-LEG-002** DPA finalized
- [ ] **PRD-LEG-003** MSA amendment finalized
- [ ] **PRD-LEG-004** Security FAQ published
- [ ] **PRD-LEG-006** Token cost disclaimer wording approved by legal
- [ ] **PRD-COM-004** CRM/HubSpot configuration updated
- [ ] **PRD-DEM-001** Demo assets finalized
- [ ] **PRD-UX-003** IPE landing page — in development
- [ ] **PRD-UX-004** Upgrade flow — in development
- [ ] **PRD-UX-005** MCP connection documentation reviewed and updated
- [ ] **PRD-QA-001** Enterprise-scale testing underway or complete
- [ ] **PRD-QA-005** MCP graduation plan documented and approved
- [ ] **PRD-SAL-001** Training session materials ready
- [ ] **PRD-SAL-005** Email templates published
- [ ] **PRD-SAL-007** Customer overview deck published

> **Critical milestone:** All legal documents finalized. ToS acceptance tracking must be in development. Security FAQ ready for enterprise prospects. Token cost disclaimer approved for embedding in ToS and product UI.

### Gate 4: Go/No-Go — Friday, March 28

- [ ] **PRD-ENG-010** Control Plane MCP switchover tested and functional
- [ ] **PRD-LEG-005** ToS acceptance tracking live and functional
- [ ] **PRD-QA-001** Enterprise-scale testing complete — no P0 issues
- [ ] **PRD-QA-002** CX product knowledge transfer complete
- [ ] **PRD-QA-003** All Blocker-priority requirements green
- [ ] **PRD-SAL-001** Sales enablement training session delivered
- [ ] **PRD-UX-002** End-to-end admin workflow verified
- [ ] **PRD-UX-003** IPE landing page live
- [ ] **PRD-UX-004** Upgrade flow functional
- [ ] **PRD-MKT-001** Release announcement drafted and approved
- [ ] **PRD-MKT-003** Existing customer communication plan ready to execute
- [ ] **PRD-MKT-005** 2+ employees confirmed ready to demo MCP setup
- [ ] **ALL** Updated terms published to customers
- [ ] **ALL** Customer-facing teams briefed and ready
- [ ] **EXEC** Executive sign-off: Robin + Chris

> **Decision:** If any Blocker requirement is not green, the Go/No-Go decision must include: what's not ready, impact assessment, and whether to proceed with mitigation or delay GA. **New gate prerequisite:** Decision #9 (Beta vs. GA) must have been resolved at Gate 1 for this gate to be meaningful — the criteria differ substantially depending on the answer.

---

## 6. Risk Register

| Risk | PRD Req | Linear Status | Impact | Mitigation |
|---|---|---|---|---|
| **MCP distribution pipeline stalled** | PRD-ENG-006 | In Prep, no updates since Jan 22 | **Critical.** This is how IPE delivers value. Without it, nothing else matters. Blocks ANL-001 (data capture). | Immediate status check with Sam. If blocked on ENG-005, assess parallel path. Escalate to Robin if stalled. |
| **UI chain entirely stalled** | ENG-007/008/009 | No updates (Jan 16 – Feb 17) | **High.** Source management UI, user permissions, and conflict resolution UI form a dependency chain. All stalled. V1 scope includes "admin capabilities." | Status check at Gate 1. Assess minimum viable scope: can V1 launch with CLI-only source management? If yes, reduce ENG-007 scope. |
| **Monetization model undefined** | COM-001/002/003 | Being defined, no updates | **High.** Entire commercial model depends on costing data and tier definitions. Cascades to all sales materials and CRM config. | Grant delivers costing data by Mar 7 (Gate 1). Chris makes tier decision by Mar 14 (Gate 2). If missed, sales readiness materials ship with placeholder pricing. |
| **Analytics projects undefined** | ANL-002/003 | Both "Being defined," no updates | **Medium-High.** Without adoption dashboard, CX cannot track consumption. Without core metrics, cannot prove ROI to customers. Commercial model lacks validation. | Minimum viable: even a spreadsheet-based usage report from raw data is acceptable for V1 if dashboard is not ready. Reduce scope to internal-only view. |
| **Legal timeline incompressible** | LEG-001-005 | On track (Feb 24 update) | **Medium.** Currently on track, but legal drafting doesn't accelerate with more effort. If any review cycle slips, Mar 21 target is at risk. | Weekly check-in with Grant and Robin. Nick from Security Ideals engaged. No mitigation for external counsel delays — just awareness. |
| **No demo assets** | DEM-001 | Not started | **Medium.** AEs cannot independently demo IPE. All demos require product team presence, limiting deal velocity. | Fallback: recorded video walkthrough (lower effort than live demo environment). Bloom building PCRI-aligned demos — coordinate. |
| **Conflict enrichment at 17%** | ENG-005 | On track but early | **Medium.** At 17% implementation with 4 weeks remaining. Upstream of MCP distribution (ENG-006) and conflict resolution UI (ENG-009). | Track weekly. If not at 60%+ by Gate 1, assess whether conflict resolution can be scoped down to V1.1. |
| **DPA out of date — missing sub-processors** | LEG-002 | Confirmed stale per Sprint Kick-Off | **High.** Current DPA does not list all sub-processors (Cloudflare, BrainTrust, Snowflake added since last update). Enterprise procurement will flag this. Could block deals with audit-heavy customers. | Bloom owns comprehensive sub-processor inventory. Route through Donna for legal review. Target completion before Gate 3 (Mar 21). Start immediately — legal review cycles are incompressible. |
| **Adoption metric undefined** | ANL-004 | New — identified in Sprint Kick-Off | **High.** The entire commercial model is "drive adoption so it's consumed" — but "adoption" has no formal definition. Blocks: dashboard design (ANL-003), consumption metering (ANL-001), and sales ability to articulate success metrics to prospects. | Chris + Grant define adoption metrics by Gate 1 (Mar 7). Use September 2025 usage data as baseline. Even a working definition is better than none — can iterate post-GA. |
| **Historic security documentation gaps** | LEG-004 | Flagged in Security Planning | **Medium.** Nick (Security Ideals) noted that some historic security documentation may be missing or incomplete. Infrastructure ticketing is also flagged — security-related infra requests may not have a clear intake path. | Nick has Linear access and is inventorying gaps. Prioritize items that directly impact Security FAQ (LEG-004) and SOC 2 narrative. Infrastructure ticketing gap to be addressed in sprint planning. |
| **Beta vs. GA strategic misalignment** | DECISION #9 | New — identified in source document alignment review | **Critical.** Robin's "When v1 is done" doc describes IPE multi-source as a "free beta" launching April 1 with GA at end Q2. This PRD and the Launch Strategy both say GA on March 31. If the beta view is correct, the entire quality bar, legal urgency, and commercial readiness scope change — most Blocker requirements could be downgraded or re-targeted. If the GA view is correct, the "When v1 is done" doc is stale and should be superseded. Either way, the team is operating against ambiguous success criteria. | Robin resolves at Gate 1 (Mar 7). Explicit written confirmation required — verbal is not sufficient for a decision of this magnitude. |
| **Two-tier MCP architecture not engineered** | ENG-010 | New — no Linear project | **High.** "When v1 is done" describes Knapsack MCP and Control Plane MCP as distinct products with a seamless switchover. No engineering work has been scoped for this transition mechanism. If the switchover is not seamless, customers upgrading to IPE may experience disruption to their existing MCP connections. | Sam to scope ENG-010 by Gate 1. Assess complexity — if the switchover is architecturally simple (config change), low risk. If it requires dual-running or connection migration, high risk with tight timeline. |
| **In-product UI surfaces unscoped** | UX-003/004 | New — no design work started | **Medium-High.** Landing page, menu entry point, and upgrade flow described in "When v1 is done" have no designs or engineering estimates. If these are V1 scope, they add to an already stalled UI chain (ENG-007/008/009). If they're not V1 scope, the product has no in-app entry point to IPE. | Decision #10 (branding) at Gate 1 determines scope. If V1: fast-track design with Carly. If V2: define minimal entry point (even a link) for V1. |
| **Marketing launch deliverables not started** | MKT-001-005 | New — not tracked | **Medium.** Release announcement, video, blog posts, customer communication, and demo staffing are all specified in "When v1 is done" but have no owners or timelines in existing project tracking. With 4 weeks to GA, lead time for quality marketing assets is tight. | Marketing to confirm scope by Gate 1. MKT-002 (video) and MKT-004 (blogs) can be Should-Have if timeline is tight. MKT-001 (announcement), MKT-003 (customer comms), and MKT-005 (demo staffing) are Must-Have. |

> **ISO 27001:** In progress, target Q3 2026. May block specific enterprise deals (e.g., GSK) but is not a V1 GA blocker. Tracked separately.

---

## 7. Owner Matrix

| Owner | Blocker Reqs | Must-Have | Should-Have | Key Deliverables |
|---|---|---|---|---|
| **Varun** | 3 | 0 | 0 | Knapsack, Storybook, MDX ingestion (ENG-001/002/003) |
| **Sam** | 3 | 0 | 0 | PCIF schema (ENG-004), MCP distribution pipeline (ENG-006), Control Plane MCP switchover (ENG-010) |
| **Rizchel** | 1 | 0 | 0 | Conflict enrichment service (ENG-005) |
| **Grant** | 2 | 0 | 0 | Data capture (ANL-001), operation costing (COM-001), Tier 0 quota (COM-002) |
| **Carly** | 2 | 4 | 0 | Source mgmt UI (ENG-007), analytics platform (ANL-002), dashboard (ANL-003), admin workflow (UX-002), landing page (UX-003), upgrade flow (UX-004) |
| **Robin** | 2 | 4 | 0 | User permissions (ENG-008), conflict UI (ENG-009), "what's next" UX (UX-001), enterprise testing (QA-001), Go/No-Go (QA-003), landing page (UX-003), upgrade flow (UX-004), token disclaimer (LEG-006) |
| **Chris** | 1 | 0 | 0 | Tier boundaries (COM-003), Go/No-Go (QA-003) |
| **Legal + Robin** | 4 | 1 | 0 | ToS (LEG-001), DPA (LEG-002), MSA (LEG-003), acceptance tracking (LEG-005), token disclaimer (LEG-006) |
| **Security (Nick)** | 1 | 0 | 0 | Security FAQ (LEG-004) |
| **Amber** | 0 | 3 | 3 | Sales readiness lead (SAL-001 through SAL-007), doc consistency (DOC-001/002), sprint coordination |
| **Marketing** | 0 | 3 | 4 | Release announcement (MKT-001), release video (MKT-002), customer comms (MKT-003), blog posts (MKT-004), email templates (SAL-005), overview deck (SAL-007), battle cards (DEM-002) |
| **Product + CX** | 1 | 2 | 0 | Demo assets (DEM-001), CX knowledge transfer (QA-002), demo staffing (MKT-005) |
| **Product** | 0 | 0 | 1 | MCP connection documentation (UX-005) |
| **Rev Ops** | 0 | 1 | 0 | CRM configuration (COM-004) |

---

## 8. Related Documents

- **Launch Checklist** — Sprint Execution Tracker
- **Offering Kit** — GTM, Solutioning, Delivery
- **GTM Playbook** — PCRI, Roles, Pipeline
- **ROI Calculator** — Business Case Builder
- **[Linear: IPE Initiative](https://linear.app/knapsack/initiative/the-intelligent-product-engine-ipe-3778914864ee)** — Engineering Execution
- **Onboarding Kit** — Customer Onboarding

---

## 9. Source Document Status

> **This PRD is the authoritative reference.** The following source documents informed this PRD but contain language and positions that have since been superseded by decisions made in the Feb 26 Pricing Jam and captured here. Where conflicts exist between source documents and this PRD, **this PRD governs.**

| Source Document | Author | Date | Status | Key Conflicts with This PRD |
|---|---|---|---|---|
| **IPE V1 Launch Strategy** | Robin Cannon | Feb 23, 2026 | **Partially superseded** | Uses "freemium" and "free" language (superseded by Decision #3: "Included, not Free"). Uses "free for all customers" (superseded by Decision #2: Platform + Consumption). Otherwise broadly aligned on scope, workstreams, and timeline. |
| **When v1 is done (in plain English)** | Robin Cannon | Undated | **Under review — contains strategic contradiction** | Describes IPE multi-source as a **"free beta"** at launch with GA at **end Q2** — contradicts this PRD's Decision #1 (GA, not beta) and the Launch Strategy. Introduces "Intelligence Guided Design System Platform" branding and two-tier MCP architecture (Knapsack MCP vs. Control Plane MCP) that have been incorporated into this PRD as new requirements. **Decision #9 must resolve the beta vs. GA conflict.** |
| **IPE Pricing Jam transcript** | Multiple | Feb 26, 2026 | **Incorporated** | Decisions #2-7 in this PRD derive from this session. No conflicts. |
| **Sprint Kick-Off transcript** | Multiple | Feb 27, 2026 | **Incorporated** | ANL-004, QA-004, QA-005, and several decisions derived from this session. No conflicts. |

---

*Sources: Robin Cannon's IPE V1 Launch Strategy (Feb 23), Robin Cannon's "When v1 is done (in plain English)" (undated), IPE Pricing Jam (Feb 26), Linear Product Projects export (Feb 27), Sprint Kick-Off transcript (Feb 27), Security Project Planning transcript (Feb 26), IPE Launch Checklist, IPE Offering Kit*
