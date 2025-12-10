import { useState } from 'react';

const sections = [
  { id: 'executive', label: 'Executive Summary' },
  { id: 'challenge', label: 'Strategic Challenge' },
  { id: 'solution', label: 'Proposed Solution' },
  { id: 'capabilities', label: 'Platform Capabilities' },
  { id: 'comparison', label: 'Platform Comparison' },
  { id: 'roi', label: 'ROI Analysis' },
  { id: 'investment', label: 'Investment Structure' },
  { id: 'charter', label: 'System Charter' },
  { id: 'governance', label: 'Governance & RACI' },
  { id: 'token-governance', label: 'Token Governance' },
  { id: 'component-lifecycle', label: 'Component Lifecycle' },
  { id: 'testing', label: 'Testing Plan' },
  { id: 'training', label: 'Training Curriculum' },
  { id: 'roadmap', label: 'Multi-Year Roadmap' },
  { id: 'risk', label: 'Risk Mitigation' },
  { id: 'recommendation', label: 'Recommendation' }
];

const Hexagon = ({ className = "", size = 24, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <polygon points="50,3 93,28 93,72 50,97 7,72 7,28" fill={filled ? "#db0011" : "none"} stroke={filled ? "none" : "#db0011"} strokeWidth="3" />
  </svg>
);

const Card = ({ children, className = "", accent = false }) => (
  <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${accent ? 'border-l-4 border-l-red-600' : ''} ${className}`}>{children}</div>
);

const SectionHeader = ({ label, title }) => (
  <div className="mb-2">
    {label && <div className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-1">{label}</div>}
    <div className="text-lg font-bold text-gray-900">{title}</div>
  </div>
);

const Badge = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-red-600 text-white',
    light: 'bg-red-50 text-red-600 border border-red-600',
    dark: 'bg-gray-900 text-white',
    success: 'bg-green-700 text-white',
    muted: 'bg-gray-100 text-gray-600 border border-gray-300'
  };
  return <span className={`inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider ${variants[variant]}`}>{children}</span>;
};

const Pill = ({ children, variant = 'default' }) => {
  const variants = {
    strong: 'bg-green-100 text-green-800 border border-green-600',
    partial: 'bg-yellow-100 text-yellow-800 border border-yellow-600',
    weak: 'bg-gray-100 text-gray-600 border border-gray-400'
  };
  return <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium ${variants[variant]}`}>{children}</span>;
};

const MetricCard = ({ value, label, subtitle, trend }) => (
  <div className="bg-white border-2 border-gray-200 rounded-lg p-5 text-center hover:border-red-600 transition-all">
    <div className="text-3xl font-bold text-red-600 mb-1">{value}</div>
    <div className="text-sm font-semibold text-gray-800 mb-1">{label}</div>
    {subtitle && <div className="text-xs text-gray-600">{subtitle}</div>}
    {trend && <div className="text-xs text-green-600 font-semibold mt-1">↑ {trend}</div>}
  </div>
);

const CheckItem = ({ title, desc }) => (
  <div className="flex gap-3 p-4 bg-white border border-gray-200 rounded">
    <Hexagon size={16} className="flex-shrink-0 mt-0.5" />
    <div>
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      {desc && <div className="text-xs text-gray-600 mt-1 leading-relaxed">{desc}</div>}
    </div>
  </div>
);

const ValueItem = ({ title, desc }) => (
  <div className="flex gap-3 p-4 bg-white rounded border-l-4 border-red-600">
    <div>
      <div className="font-semibold text-sm text-gray-900 mb-1">{title}</div>
      <div className="text-xs text-gray-600 leading-relaxed">{desc}</div>
    </div>
  </div>
);

const ExecutiveSection = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">HSBC Enterprise Experience Platform</h1>
        <p className="text-red-100">System Charter & Business Case Proposal</p>
      </div>
      <p className="text-lg leading-relaxed">Opening up a world of opportunity through unified design infrastructure — connecting design, code, governance, and AI into a single system of record.</p>
    </div>

    <Card accent className="p-6 border-2 border-yellow-400">
      <SectionHeader label="Proposal Status" title="Subject to Validation" />
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        <strong>This document represents a preliminary proposal.</strong> All sections, timelines, investment structures, and recommendations are subject to refinement following:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-yellow-50 rounded border-l-4 border-yellow-500">
          <h4 className="font-semibold text-gray-900 mb-1">30-Day Sandbox POC</h4>
          <p className="text-xs text-gray-600">Platform validation, integration testing, and detailed requirements gathering in a controlled environment.</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded border-l-4 border-yellow-500">
          <h4 className="font-semibold text-gray-900 mb-1">Maturity & Readiness Assessment</h4>
          <p className="text-xs text-gray-600">Evaluation of HSBC's current design system maturity, organizational readiness, and infrastructure requirements.</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-4 leading-relaxed">
        Final scope, pricing, timeline, and governance structures will be confirmed based on findings from both assessments.
      </p>
    </Card>

    <Card accent className="p-6">
      <SectionHeader label="Executive Summary" title="The Strategic Imperative" />
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">HSBC operates one of the most complex digital ecosystems in global banking. Multiple design systems, divergent codebases, fragmented documentation, and inconsistent component usage slow delivery, create risk, and dilute the customer experience. This fragmentation costs HSBC an estimated <strong>$4.5M+ annually</strong>.</p>
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">The <strong>HSBC Enterprise Experience Platform (EEPx)</strong>, powered by Knapsack, resolves this by acting as a code-connected, AI-ready system of record. Built to extend and strengthen the Create Design System, EEPx will unify HSBC's digital foundations across CIB, WPB, and Enterprise Technology.</p>
      <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4">
        <p className="font-semibold text-gray-900 mb-2">Projected Outcomes (Subject to POC Validation):</p>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Unified governance across 20+ Storybooks and multiple Figma libraries</li>
          <li>• 40–50% reduction in redundant design and development work (~$1.5M/yr)</li>
          <li>• 3–5 FTE equivalents saved annually through automation ($700K–$1M/yr)</li>
          <li>• 3–4× faster component delivery with embedded engineering support</li>
          <li>• AI-ready infrastructure for future design automation</li>
        </ul>
      </div>
    </Card>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard value="$3.5M+" label="Projected Annual ROI" subtitle="Efficiency gains" trend="3.5–5x return" />
      <MetricCard value="30 days" label="Sandbox POC" subtitle="Validation period" />
      <MetricCard value="40-50%" label="Projected Waste Reduction" subtitle="Eliminate duplication" />
      <MetricCard value="3-5 FTE" label="Projected Annual Savings" subtitle="Engineering efficiency" />
    </div>
  </div>
);

const ChallengeSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Strategic Challenge</h2>
    <Card accent className="p-6">
      <SectionHeader label="Current State" title="Fragmentation at Scale" />
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">HSBC's digital ecosystem reflects decades of organic growth, acquisitions, and parallel development efforts. The result is a fragmented landscape that creates friction, increases costs, and limits innovation.</p>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-5">
        <h4 className="font-bold text-gray-900 mb-3">Design Fragmentation</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• 20+ Storybook instances across teams</li>
          <li>• Multiple Figma libraries with divergent patterns</li>
          <li>• Inconsistent design tokens and theming</li>
          <li>• No single source of truth for components</li>
        </ul>
      </Card>
      <Card className="p-5">
        <h4 className="font-bold text-gray-900 mb-3">Development Inefficiency</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Components rebuilt 3–5× across teams</li>
          <li>• No shared component registry or governance</li>
          <li>• Manual handoff from design to code</li>
          <li>• Inconsistent accessibility implementation</li>
        </ul>
      </Card>
      <Card className="p-5">
        <h4 className="font-bold text-gray-900 mb-3">Governance Gaps</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Unclear ownership of shared patterns</li>
          <li>• No lifecycle management for components</li>
          <li>• Brand drift across business units</li>
          <li>• Reactive compliance vs proactive governance</li>
        </ul>
      </Card>
      <Card className="p-5">
        <h4 className="font-bold text-gray-900 mb-3">Documentation Debt</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Scattered documentation across wikis, Confluence, Notion</li>
          <li>• Documentation out of sync with code</li>
          <li>• Onboarding friction for new team members</li>
          <li>• No automated doc generation</li>
        </ul>
      </Card>
    </div>
    <Card className="p-5 bg-red-50 border-red-200">
      <h4 className="font-bold text-red-800 mb-2">Estimated Annual Cost of Fragmentation: $4.5M+</h4>
      <p className="text-sm text-red-700">Based on duplicate engineering effort, rework, extended onboarding, and brand inconsistency remediation.</p>
    </Card>
  </div>
);

const SolutionSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Proposed Solution</h2>
    <Card accent className="p-6">
      <SectionHeader label="EEPx Vision" title="A Unified Design Infrastructure" />
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">The HSBC Enterprise Experience Platform (EEPx), powered by Knapsack, serves as the single system of record connecting design, code, tokens, and governance. It extends and strengthens the Create Design System by providing the infrastructure layer needed for enterprise-scale consistency.</p>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ValueItem title="Unified Component Registry" desc="Single source of truth for all design system components across CIB, WPB, and Enterprise Technology." />
      <ValueItem title="Code-Connected Documentation" desc="Auto-generated docs from live code ensure documentation is always current and accurate." />
      <ValueItem title="Token Architecture" desc="Three-tier token system (Brand → Semantic → Component) enables consistency with contextual flexibility." />
      <ValueItem title="Multi-Platform Support" desc="Unified components across React, iOS, Android, and Angular with consistent APIs and behavior." />
      <ValueItem title="Governance Workflows" desc="Built-in approval workflows, lifecycle management, and contribution processes." />
      <ValueItem title="AI-Ready Infrastructure" desc="MCP server integration enables AI agents to generate production-ready code using your design system." />
    </div>
  </div>
);

const CapabilitiesSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Platform Capabilities</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-5">
        <Badge variant="primary">Design</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">Figma Integration</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Bi-directional Figma sync</li>
          <li>• Design token management</li>
          <li>• Component variant mapping</li>
          <li>• Asset versioning</li>
        </ul>
      </Card>
      <Card className="p-5">
        <Badge variant="primary">Code</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">Code Integration</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Live code rendering</li>
          <li>• Multi-framework support</li>
          <li>• Git-based workflows</li>
          <li>• Automated testing hooks</li>
        </ul>
      </Card>
      <Card className="p-5">
        <Badge variant="primary">Governance</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">Lifecycle Management</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Approval workflows</li>
          <li>• Version control</li>
          <li>• Deprecation management</li>
          <li>• Usage analytics</li>
        </ul>
      </Card>
      <Card className="p-5">
        <Badge variant="dark">Enterprise</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">Enterprise Security</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• SSO/SAML integration</li>
          <li>• Role-based access control</li>
          <li>• Audit logging</li>
          <li>• On-prem deployment option</li>
        </ul>
      </Card>
      <Card className="p-5">
        <Badge variant="dark">AI</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">AI Enablement</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• MCP server for AI agents</li>
          <li>• Structured component data</li>
          <li>• Context-aware generation</li>
          <li>• Compliance guardrails</li>
        </ul>
      </Card>
      <Card className="p-5">
        <Badge variant="dark">Analytics</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">Insights & Metrics</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Adoption dashboards</li>
          <li>• Component usage tracking</li>
          <li>• Health scoring</li>
          <li>• Drift detection</li>
        </ul>
      </Card>
    </div>
  </div>
);

const ComparisonSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Platform Comparison</h2>
    <Card className="p-6">
      <SectionHeader title="Knapsack vs. Alternative Platforms" />
      <p className="text-sm text-gray-600 mb-4">Comparison across key enterprise capabilities for design system management.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-2.5 text-left font-semibold">Capability</th>
              <th className="p-2.5 text-left font-semibold">Knapsack</th>
              <th className="p-2.5 text-left font-semibold">Zeplin</th>
              <th className="p-2.5 text-left font-semibold">zeroheight</th>
              <th className="p-2.5 text-left font-semibold">Supernova</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-2.5 font-semibold">Primary focus</td>
              <td className="p-2.5"><Pill variant="strong">Strong</Pill><br/><span className="text-gray-600">Code-connected design system platform</span></td>
              <td className="p-2.5"><Pill variant="partial">Partial</Pill><br/><span className="text-gray-600">Design handoff & specs</span></td>
              <td className="p-2.5"><Pill variant="partial">Partial</Pill><br/><span className="text-gray-600">Documentation site builder</span></td>
              <td className="p-2.5"><Pill variant="strong">Strong</Pill><br/><span className="text-gray-600">Design system management</span></td>
            </tr>
            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="p-2.5 font-semibold">Live code integration</td>
              <td className="p-2.5"><Pill variant="strong">Strong</Pill><br/><span className="text-gray-600">Renders production components</span></td>
              <td className="p-2.5"><Pill variant="weak">Minimal</Pill><br/><span className="text-gray-600">Static specs only</span></td>
              <td className="p-2.5"><Pill variant="partial">Partial</Pill><br/><span className="text-gray-600">Embedded Storybook</span></td>
              <td className="p-2.5"><Pill variant="partial">Partial</Pill><br/><span className="text-gray-600">Code export focus</span></td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-2.5 font-semibold">Multi-framework support</td>
              <td className="p-2.5"><Pill variant="strong">Strong</Pill><br/><span className="text-gray-600">React, Angular, iOS, Android</span></td>
              <td className="p-2.5"><Pill variant="weak">Minimal</Pill><br/><span className="text-gray-600">Design only</span></td>
              <td className="p-2.5"><Pill variant="partial">Partial</Pill><br/><span className="text-gray-600">Via Storybook embed</span></td>
              <td className="p-2.5"><Pill variant="strong">Strong</Pill><br/><span className="text-gray-600">Multi-platform output</span></td>
            </tr>
            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="p-2.5 font-semibold">Token management</td>
              <td className="p-2.5"><Pill variant="strong">Strong</Pill><br/><span className="text-gray-600">Full token architecture</span></td>
              <td className="p-2.5"><Pill variant="partial">Partial</Pill><br/><span className="text-gray-600">Style extraction</span></td>
              <td className="p-2.5"><Pill variant="partial">Partial</Pill><br/><span className="text-gray-600">Token display</span></td>
              <td className="p-2.5"><Pill variant="strong">Strong</Pill><br/><span className="text-gray-600">Dedicated token tools</span></td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-2.5 font-semibold">AI-native & automation</td>
              <td className="p-2.5"><Pill variant="strong">Strong</Pill><br/><span className="text-gray-600">MCP server for AI agents</span></td>
              <td className="p-2.5"><Pill variant="weak">Minimal</Pill><br/><span className="text-gray-600">Not AI-centric</span></td>
              <td className="p-2.5"><Pill variant="partial">Partial</Pill><br/><span className="text-gray-600">Automation for sync</span></td>
              <td className="p-2.5"><Pill variant="strong">Strong</Pill><br/><span className="text-gray-600">AI-assisted content</span></td>
            </tr>
            <tr>
              <td className="p-2.5 font-semibold">Best-fit for HSBC Charter</td>
              <td className="p-2.5"><Pill variant="strong">Direct match</Pill><br/><span className="text-gray-600">Infra-level EEPx implementation</span></td>
              <td className="p-2.5"><Pill variant="partial">Adjacent</Pill><br/><span className="text-gray-600">Useful for handoff</span></td>
              <td className="p-2.5"><Pill variant="partial">Adjacent</Pill><br/><span className="text-gray-600">Strong docs companion</span></td>
              <td className="p-2.5"><Pill variant="partial">Comparable</Pill><br/><span className="text-gray-600">Alternative to compare</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const ROISection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">ROI Analysis</h2>
    <Card accent className="p-6">
      <SectionHeader label="Financial Impact" title="Projected Return on Investment" />
      <p className="text-sm text-gray-700 mt-3">Conservative estimates based on typical enterprise design system implementations. Actual ROI to be validated during 30-day Sandbox POC.</p>
    </Card>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse bg-white rounded-lg overflow-hidden border border-gray-200">
        <thead><tr className="bg-gray-900 text-white"><th className="p-4 text-left font-semibold">Category</th><th className="p-4 text-left font-semibold">Current Cost</th><th className="p-4 text-left font-semibold">With EEPx</th><th className="p-4 text-left font-semibold">Projected Savings</th></tr></thead>
        <tbody>
          <tr className="border-b border-gray-200"><td className="p-4 font-semibold text-gray-900">Design Redundancy</td><td className="p-4 text-gray-700">Duplicate patterns across teams</td><td className="p-4 text-gray-700">Unified, reusable patterns</td><td className="p-4 font-semibold text-green-700">$1.5M/yr</td></tr>
          <tr className="border-b border-gray-200 bg-gray-50"><td className="p-4 font-semibold text-gray-900">Engineering Productivity</td><td className="p-4 text-gray-700">Rebuilding common UI patterns</td><td className="p-4 text-gray-700">Component reuse + automation</td><td className="p-4 font-semibold text-green-700">$700K–$1M/yr</td></tr>
          <tr className="border-b border-gray-200"><td className="p-4 font-semibold text-gray-900">Documentation</td><td className="p-4 text-gray-700">Inconsistent, outdated docs</td><td className="p-4 text-gray-700">Auto-synced, centralized</td><td className="p-4 font-semibold text-green-700">$300K/yr</td></tr>
          <tr className="bg-green-100"><td className="p-4 font-bold text-gray-900" colSpan={3}>Total Projected Annual ROI</td><td className="p-4 text-lg font-bold text-green-700">$3.5M–$4.5M+</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const InvestmentSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Investment Structure</h2>
    <Card className="overflow-hidden">
      <div className="bg-gray-900 text-white p-4"><h3 className="text-lg font-semibold">Annual Investment: $1,000,000</h3></div>
      <div className="divide-y divide-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2"><h4 className="font-semibold text-gray-900">Knapsack Enterprise License</h4><span className="text-xl font-bold text-red-600">$400,000</span></div>
          <p className="text-sm text-gray-700 mb-3">Multi-workspace enterprise license with advanced governance, Figma/code integrations, AI MCP automation, and enterprise security</p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2"><h4 className="font-semibold text-gray-900">Engineering Enablement (2× FDEs)</h4><span className="text-xl font-bold text-red-600">$350,000</span></div>
          <p className="text-sm text-gray-700 mb-3">Two full-deployed engineers embedded within HSBC to configure, automate, and maintain cross-system integration</p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2"><h4 className="font-semibold text-gray-900">CX Partner for Change Management</h4><span className="text-xl font-bold text-red-600">$250,000</span></div>
          <p className="text-sm text-gray-700 mb-3">Strategic enablement partnership including system charter development, PI planning, design maturity scoring, and program facilitation</p>
        </div>
      </div>
    </Card>
  </div>
);

const CharterSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">System Charter</h2>
    <Card accent className="p-6">
      <SectionHeader label="Purpose" title="Unified Operating Model" />
      <p className="text-sm text-gray-700 leading-relaxed mt-3">The HSBC Enterprise Experience Platform (EEPx) establishes a unified operating and governance model for all design system assets underpinning HSBC's global digital experience. It defines how components, tokens, patterns, documentation, and workflows are created, governed, consumed, and evolved across CIB, WPB, and Enterprise Technology.</p>
    </Card>
    <Card className="p-6">
      <SectionHeader title="Guiding Principles" />
      <p className="text-xs text-gray-600 mb-4">Aligned with HSBC brand principles: Make it proudly HSBC. Use distinctive assets. Embrace our angles.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {['Consistency before customization', 'Governance as enablement, not gatekeeping', 'One system, many contexts (CIB, WPB, ET)', 'Accessibility is a requirement, not an enhancement', 'Reuse is the default; net-new is exceptional', 'AI-ready by design'].map((p, i) => <CheckItem key={i} title={p} />)}
      </div>
    </Card>
  </div>
);

const GovernanceSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Governance & RACI</h2>
    <Card accent className="p-6">
      <SectionHeader label="Important" title="Governance Bodies — For HSBC Confirmation" />
      <p className="text-sm text-gray-700 mt-3 mb-4">The following governance bodies are <strong>recommendations from Knapsack</strong> based on enterprise best practices. HSBC should confirm, modify, or replace these structures to align with existing organizational governance.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded border-l-4 border-red-600">
          <h4 className="font-semibold text-gray-900 mb-1">Design System Leadership Council (DSLC)</h4>
          <p className="text-xs text-gray-600">Executive oversight and strategic direction</p>
        </div>
        <div className="p-4 bg-gray-50 rounded border-l-4 border-red-600">
          <h4 className="font-semibold text-gray-900 mb-1">Component Review Board</h4>
          <p className="text-xs text-gray-600">Technical review and approval of new components</p>
        </div>
        <div className="p-4 bg-gray-50 rounded border-l-4 border-red-600">
          <h4 className="font-semibold text-gray-900 mb-1">Tokens Council</h4>
          <p className="text-xs text-gray-600">Token architecture and brand alignment</p>
        </div>
        <div className="p-4 bg-gray-50 rounded border-l-4 border-red-600">
          <h4 className="font-semibold text-gray-900 mb-1">Accessibility Working Group</h4>
          <p className="text-xs text-gray-600">Compliance and accessibility standards</p>
        </div>
      </div>
    </Card>
    <Card className="p-6">
      <SectionHeader label="Appendix A" title="RACI Matrix" />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-xs border-collapse">
          <thead><tr className="bg-gray-900 text-white"><th className="p-2 text-left font-semibold">Activity</th><th className="p-2 text-center font-semibold">DS Lead</th><th className="p-2 text-center font-semibold">Brand</th><th className="p-2 text-center font-semibold">CIB</th><th className="p-2 text-center font-semibold">WPB</th><th className="p-2 text-center font-semibold">ET</th></tr></thead>
          <tbody>
            <tr className="border-b border-gray-200 bg-gray-50"><td className="p-2 font-medium">System vision & roadmap</td><td className="p-2 text-center">A</td><td className="p-2 text-center">C</td><td className="p-2 text-center">I</td><td className="p-2 text-center">I</td><td className="p-2 text-center">I</td></tr>
            <tr className="border-b border-gray-200"><td className="p-2 font-medium">Token architecture & governance</td><td className="p-2 text-center">C</td><td className="p-2 text-center">A</td><td className="p-2 text-center">I</td><td className="p-2 text-center">I</td><td className="p-2 text-center">C</td></tr>
            <tr className="border-b border-gray-200 bg-gray-50"><td className="p-2 font-medium">New component creation & NPR</td><td className="p-2 text-center">A</td><td className="p-2 text-center">C</td><td className="p-2 text-center">R</td><td className="p-2 text-center">R</td><td className="p-2 text-center">R</td></tr>
            <tr className="border-b border-gray-200"><td className="p-2 font-medium">Accessibility compliance</td><td className="p-2 text-center">C</td><td className="p-2 text-center">A</td><td className="p-2 text-center">C</td><td className="p-2 text-center">R</td><td className="p-2 text-center">R</td></tr>
            <tr><td className="p-2 font-medium">Release & versioning</td><td className="p-2 text-center">R</td><td className="p-2 text-center">C</td><td className="p-2 text-center">C</td><td className="p-2 text-center">A</td><td className="p-2 text-center">R</td></tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const TokenGovernanceSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Token Governance Manual</h2>
    <Card className="p-6">
      <SectionHeader label="Appendix B" title="Token Taxonomy" />
      <p className="text-sm text-gray-700 mt-3 mb-3">HSBC's token model balances global consistency and local flexibility:</p>
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded border-l-4 border-red-600"><div className="text-sm font-semibold text-gray-900">Tier 0 — Raw Tokens (Brand-owned)</div><div className="text-xs text-gray-600">Color primitives (HSBC Red, Black, White, Grey), typography, spacing, motion</div></div>
        <div className="p-3 bg-gray-50 rounded border-l-4 border-gray-600"><div className="text-sm font-semibold text-gray-900">Tier 1 — Semantic Tokens (System-owned)</div><div className="text-xs text-gray-600">Meaning-based tokens (text-primary, surface-elevated, interactive-default)</div></div>
        <div className="p-3 bg-gray-50 rounded border-l-4 border-green-700"><div className="text-sm font-semibold text-gray-900">Tier 2 — Component Tokens (Component-owned)</div><div className="text-xs text-gray-600">Component-specific needs (button.primary.background.default)</div></div>
        <div className="p-3 bg-gray-50 rounded border-l-4 border-yellow-600"><div className="text-sm font-semibold text-gray-900">Tier 3 — Market/Brand Overrides (Context-owned)</div><div className="text-xs text-gray-600">BU-specific overrides for First Direct, M&S, or regional variations</div></div>
      </div>
    </Card>
  </div>
);

const ComponentLifecycleSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Component Lifecycle Stages</h2>
    <Card className="p-6">
      <SectionHeader label="Appendix C" title="Lifecycle Overview" />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-xs border-collapse">
          <thead><tr className="bg-gray-900 text-white"><th className="p-2.5 text-left font-semibold">Stage</th><th className="p-2.5 text-left font-semibold">Purpose</th><th className="p-2.5 text-left font-semibold">Key Outputs</th></tr></thead>
          <tbody>
            <tr className="border-b border-gray-200"><td className="p-2.5 font-medium">Discovery</td><td className="p-2.5 text-gray-600">Identify need; confirm no existing pattern satisfies it</td><td className="p-2.5">NPR, problem statement</td></tr>
            <tr className="border-b border-gray-200 bg-gray-50"><td className="p-2.5 font-medium">Definition</td><td className="p-2.5 text-gray-600">Clarify requirements across CIB/WPB/ET</td><td className="p-2.5">Functional spec, accessibility spec</td></tr>
            <tr className="border-b border-gray-200"><td className="p-2.5 font-medium">Design</td><td className="p-2.5 text-gray-600">Create visual/interaction designs in Figma</td><td className="p-2.5">Figma components, DSLC sign-off</td></tr>
            <tr className="border-b border-gray-200 bg-gray-50"><td className="p-2.5 font-medium">Development</td><td className="p-2.5 text-gray-600">Implement component across platforms</td><td className="p-2.5">React/iOS/Android, unit tests</td></tr>
            <tr className="border-b border-gray-200"><td className="p-2.5 font-medium">Validation</td><td className="p-2.5 text-gray-600">Roll out to select products for validation</td><td className="p-2.5">Feedback, A11y results</td></tr>
            <tr className="border-b border-gray-200 bg-gray-50"><td className="p-2.5 font-medium">Release</td><td className="p-2.5 text-gray-600">Publish for general availability</td><td className="p-2.5">Release notes, announcements</td></tr>
            <tr><td className="p-2.5 font-medium">Deprecation</td><td className="p-2.5 text-gray-600">Retire with migration plans</td><td className="p-2.5">Migration guide, sunset date</td></tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const TestingSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Testing Plan</h2>
    <Card accent className="p-6">
      <SectionHeader label="Appendix E" title="Testing Strategy Overview" />
      <p className="text-sm text-gray-700 mt-3">Comprehensive testing ensures EEPx components meet HSBC's quality, accessibility, and performance standards before release.</p>
    </Card>
    <Card className="p-6">
      <SectionHeader title="Testing Layers" />
      <div className="space-y-4 mt-4">
        <div className="p-4 bg-gray-50 rounded border-l-4 border-blue-600">
          <h4 className="font-semibold text-gray-900 mb-2">Unit Testing</h4>
          <ul className="text-sm text-gray-700 space-y-1"><li>• Component logic and prop validation</li><li>• State management and event handling</li><li>• Edge case coverage for all variants</li><li>• Target: 80%+ code coverage</li></ul>
        </div>
        <div className="p-4 bg-gray-50 rounded border-l-4 border-green-600">
          <h4 className="font-semibold text-gray-900 mb-2">Integration Testing</h4>
          <ul className="text-sm text-gray-700 space-y-1"><li>• Component composition behavior</li><li>• Token application verification</li><li>• Cross-framework consistency</li><li>• API contract validation</li></ul>
        </div>
        <div className="p-4 bg-gray-50 rounded border-l-4 border-purple-600">
          <h4 className="font-semibold text-gray-900 mb-2">Visual Regression Testing</h4>
          <ul className="text-sm text-gray-700 space-y-1"><li>• Automated screenshot comparison</li><li>• Cross-browser rendering validation</li><li>• Responsive breakpoint testing</li><li>• Theme/token variation coverage</li></ul>
        </div>
        <div className="p-4 bg-gray-50 rounded border-l-4 border-red-600">
          <h4 className="font-semibold text-gray-900 mb-2">Accessibility Testing</h4>
          <ul className="text-sm text-gray-700 space-y-1"><li>• WCAG 2.1 AA compliance</li><li>• Screen reader compatibility</li><li>• Keyboard navigation</li><li>• Color contrast validation</li></ul>
        </div>
      </div>
    </Card>
    <Card className="p-6">
      <SectionHeader title="Quality Gates by Stage" />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-xs border-collapse">
          <thead><tr className="bg-gray-900 text-white"><th className="p-2.5 text-left font-semibold">Stage</th><th className="p-2.5 text-left font-semibold">Required Tests</th><th className="p-2.5 text-left font-semibold">Pass Criteria</th></tr></thead>
          <tbody>
            <tr className="border-b border-gray-200"><td className="p-2.5 font-medium">Development</td><td className="p-2.5 text-gray-600">Unit, Integration</td><td className="p-2.5">80% coverage, all tests pass</td></tr>
            <tr className="border-b border-gray-200 bg-gray-50"><td className="p-2.5 font-medium">Validation</td><td className="p-2.5 text-gray-600">Visual, A11y, Performance</td><td className="p-2.5">No regressions, WCAG AA</td></tr>
            <tr><td className="p-2.5 font-medium">Release</td><td className="p-2.5 text-gray-600">Full suite + Manual QA</td><td className="p-2.5">Sign-off from QA lead</td></tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const TrainingSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Training Curriculum</h2>
    <Card accent className="p-6">
      <SectionHeader label="Appendix D" title="Enablement Program" />
      <p className="text-sm text-gray-700 mt-3">Role-based training tracks ensure all team members can effectively use and contribute to EEPx.</p>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-5">
        <Badge variant="primary">Track 1</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">Designers</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Figma-Knapsack integration workflow</li>
          <li>• Token usage and application</li>
          <li>• Component documentation standards</li>
          <li>• Contribution process for new patterns</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">Duration: 4 hours | Format: Workshop</p>
      </Card>
      <Card className="p-5">
        <Badge variant="primary">Track 2</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">Engineers</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Component consumption patterns</li>
          <li>• Git-based contribution workflow</li>
          <li>• Multi-framework implementation</li>
          <li>• Testing and quality standards</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">Duration: 6 hours | Format: Hands-on lab</p>
      </Card>
      <Card className="p-5">
        <Badge variant="dark">Track 3</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">Product Managers</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Platform overview and value proposition</li>
          <li>• Component request process (NPR)</li>
          <li>• Roadmap visibility and planning</li>
          <li>• Adoption metrics and reporting</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">Duration: 2 hours | Format: Overview session</p>
      </Card>
      <Card className="p-5">
        <Badge variant="dark">Track 4</Badge>
        <h4 className="font-bold text-gray-900 mt-3 mb-2">Leadership</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Strategic value and ROI</li>
          <li>• Governance model overview</li>
          <li>• Success metrics and dashboards</li>
          <li>• Change management approach</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">Duration: 1 hour | Format: Executive briefing</p>
      </Card>
    </div>
  </div>
);

const RoadmapSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Multi-Year Roadmap</h2>
    <Card accent className="p-6">
      <SectionHeader label="Implementation Timeline" title="Phased Rollout Approach" />
      <p className="text-sm text-gray-700 mt-3">Timeline subject to refinement based on infrastructure assessment (cloud vs on-prem) and organizational readiness findings.</p>
    </Card>
    <Card className="p-6">
      <h3 className="font-bold text-gray-900 mb-4">Year 1: Foundation & CIB</h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-600">
          <div className="flex items-center gap-2 mb-2"><Badge variant="muted">Q1</Badge><span className="font-semibold text-gray-900">Phase 0: Discovery, POC & Planning</span></div>
          <ul className="text-sm text-gray-700 space-y-1 ml-4"><li>• <strong>30-Day Sandbox POC</strong> for platform validation and requirements gathering</li><li>• <strong>Maturity & Readiness Assessment</strong> of current state</li><li>• Infrastructure assessment (cloud vs on-prem)</li><li>• Stakeholder alignment workshops</li><li>• System mapping and governance framework</li><li>• Finalize System Charter and RACI based on POC findings</li><li>• Security and compliance review initiation</li></ul>
        </div>
        <div className="p-4 bg-gray-50 rounded border-l-4 border-gray-400">
          <div className="flex items-center gap-2 mb-2"><Badge variant="muted">Q2-Q3</Badge><span className="font-semibold text-gray-900">Phase 1A: CIB Foundation</span></div>
          <ul className="text-sm text-gray-700 space-y-1 ml-4"><li>• Core platform deployment</li><li>• CIB component migration (priority patterns)</li><li>• Figma integration setup</li><li>• Token architecture implementation</li><li>• Initial governance workflows</li></ul>
        </div>
        <div className="p-4 bg-gray-50 rounded border-l-4 border-gray-400">
          <div className="flex items-center gap-2 mb-2"><Badge variant="success">Q4</Badge><span className="font-semibold text-gray-900">Phase 1B: CIB Rollout & Stabilization</span></div>
          <ul className="text-sm text-gray-700 space-y-1 ml-4"><li>• CIB rollout with select products/teams</li><li>• Training program launch</li><li>• Feedback collection and refinement</li><li>• Documentation and process optimization</li></ul>
        </div>
      </div>
    </Card>
    <Card className="p-6">
      <h3 className="font-bold text-gray-900 mb-4">Year 2: Scale & Optimization</h3>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded border-l-4 border-green-600">
          <div className="flex items-center gap-2 mb-2"><Badge variant="success">Q1-Q2</Badge><span className="font-semibold text-gray-900">Phase 2: WPB Integration</span></div>
          <ul className="text-sm text-gray-700 space-y-1 ml-4"><li>• WPB component library integration</li><li>• Cross-BU governance alignment</li><li>• Shared pattern standardization</li><li>• Extended training rollout</li></ul>
        </div>
        <div className="p-4 bg-gray-50 rounded border-l-4 border-purple-600">
          <div className="flex items-center gap-2 mb-2"><Badge variant="dark">Q3-Q4</Badge><span className="font-semibold text-gray-900">Phase 3: Enterprise Technology & AI</span></div>
          <ul className="text-sm text-gray-700 space-y-1 ml-4"><li>• Internal tools integration</li><li>• MCP server activation for AI agents</li><li>• AI-assisted workflow enablement</li><li>• Advanced analytics and drift detection</li></ul>
        </div>
      </div>
    </Card>
    <Card className="p-6">
      <h3 className="font-bold text-gray-900 mb-4">Year 3+: Continuous Evolution</h3>
      <ul className="text-sm text-gray-700 space-y-2">
        <li>• Quarterly optimization cycles</li>
        <li>• Expanded AI capabilities</li>
        <li>• Additional BU/market integrations</li>
        <li>• Continuous governance refinement</li>
      </ul>
    </Card>
  </div>
);

const RiskSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Risk Mitigation</h2>
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex items-start gap-4">
          <Badge variant="primary">Risk</Badge>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">Adoption Resistance</h4>
            <p className="text-sm text-gray-600 mb-2">Teams may resist changing established workflows.</p>
            <p className="text-sm text-gray-700"><strong>Mitigation:</strong> Phased rollout with champion teams, clear value demonstration, embedded engineering support, and executive sponsorship.</p>
          </div>
        </div>
      </Card>
      <Card className="p-5">
        <div className="flex items-start gap-4">
          <Badge variant="primary">Risk</Badge>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">Integration Complexity</h4>
            <p className="text-sm text-gray-600 mb-2">On-prem deployment may introduce unexpected complexity.</p>
            <p className="text-sm text-gray-700"><strong>Mitigation:</strong> 30-day Sandbox POC validates integration paths before commitment. Infrastructure assessment in Phase 0 identifies requirements early.</p>
          </div>
        </div>
      </Card>
      <Card className="p-5">
        <div className="flex items-start gap-4">
          <Badge variant="primary">Risk</Badge>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">Governance Overhead</h4>
            <p className="text-sm text-gray-600 mb-2">New processes may slow delivery if not balanced correctly.</p>
            <p className="text-sm text-gray-700"><strong>Mitigation:</strong> Governance designed as enablement, not gatekeeping. Clear SLAs for approvals. Automation reduces manual touchpoints.</p>
          </div>
        </div>
      </Card>
      <Card className="p-5">
        <div className="flex items-start gap-4">
          <Badge variant="primary">Risk</Badge>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">Resource Availability</h4>
            <p className="text-sm text-gray-600 mb-2">HSBC teams may have competing priorities.</p>
            <p className="text-sm text-gray-700"><strong>Mitigation:</strong> Embedded FDEs reduce burden on internal teams. CX Partner drives coordination. Clear escalation paths for blockers.</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const RecommendationSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Recommendation</h2>
    <Card accent className="p-6">
      <SectionHeader label="Strategic Recommendation" title="Proceed with 30-Day Sandbox POC" />
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">Knapsack recommends HSBC proceed with a <strong>30-day Sandbox POC</strong> to validate platform capabilities against HSBC's specific requirements before full implementation commitment. This de-risks the investment and provides concrete data for final scope and pricing decisions.</p>
    </Card>
    <Card className="p-6">
      <h3 className="font-bold text-gray-900 mb-4">POC Objectives</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded"><h4 className="font-semibold text-gray-900 mb-2">Validate Integration</h4><p className="text-sm text-gray-600">Test Figma sync, Git workflows, and infrastructure requirements with actual HSBC assets.</p></div>
        <div className="p-4 bg-gray-50 rounded"><h4 className="font-semibold text-gray-900 mb-2">Assess Requirements</h4><p className="text-sm text-gray-600">Gather detailed requirements for security, compliance, and on-prem deployment.</p></div>
        <div className="p-4 bg-gray-50 rounded"><h4 className="font-semibold text-gray-900 mb-2">Measure Value</h4><p className="text-sm text-gray-600">Quantify time savings and workflow improvements with pilot team.</p></div>
        <div className="p-4 bg-gray-50 rounded"><h4 className="font-semibold text-gray-900 mb-2">Refine Scope</h4><p className="text-sm text-gray-600">Finalize implementation scope, timeline, and resource requirements.</p></div>
      </div>
    </Card>
    <Card className="p-6 bg-gray-50">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h4 className="font-semibold mb-3">Immediate Next Steps</h4>
          <ol className="space-y-2 text-sm">
            <li className="flex gap-3"><span className="font-bold">1.</span><span>Executive alignment on strategic direction and System Charter</span></li>
            <li className="flex gap-3"><span className="font-bold">2.</span><span><strong>Initiate 30-Day Sandbox POC</strong> to validate platform capabilities, test integrations, and gather detailed requirements</span></li>
            <li className="flex gap-3"><span className="font-bold">3.</span><span>Complete POC requirements gathering and Go/No-Go assessment</span></li>
            <li className="flex gap-3"><span className="font-bold">4.</span><span>Confirm governance bodies and nominate HSBC role owners</span></li>
            <li className="flex gap-3"><span className="font-bold">5.</span><span>Define CIB-first scope (products, teams, journeys) based on POC findings</span></li>
            <li className="flex gap-3"><span className="font-bold">6.</span><span>Approve full investment and begin Phase 1 implementation</span></li>
          </ol>
        </div>
      </div>
    </Card>
    <div className="bg-red-600 text-white p-6 rounded-lg text-center">
      <p className="text-lg font-semibold mb-2">Opening Up a World of Opportunity</p>
      <p className="text-sm opacity-90">Transform fragmented design systems into HSBC's strategic advantage through unified infrastructure, governance, and AI-ready capabilities.</p>
    </div>
  </div>
);

export default function HSBCCombinedCharter() {
  const [activeSection, setActiveSection] = useState('executive');

  const renderContent = () => {
    switch (activeSection) {
      case 'executive': return <ExecutiveSection />;
      case 'challenge': return <ChallengeSection />;
      case 'solution': return <SolutionSection />;
      case 'capabilities': return <CapabilitiesSection />;
      case 'comparison': return <ComparisonSection />;
      case 'roi': return <ROISection />;
      case 'investment': return <InvestmentSection />;
      case 'charter': return <CharterSection />;
      case 'governance': return <GovernanceSection />;
      case 'token-governance': return <TokenGovernanceSection />;
      case 'component-lifecycle': return <ComponentLifecycleSection />;
      case 'testing': return <TestingSection />;
      case 'training': return <TrainingSection />;
      case 'roadmap': return <RoadmapSection />;
      case 'risk': return <RiskSection />;
      case 'recommendation': return <RecommendationSection />;
      default: return <ExecutiveSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <nav className="w-64 bg-white border-r border-gray-200 fixed top-0 left-0 h-screen overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-gray-200 bg-gradient-to-br from-red-600 to-red-700">
          <Hexagon size={32} className="mb-2" />
          <div className="text-xs font-semibold uppercase tracking-widest text-red-100 mb-1">Charter & Business Case</div>
          <div className="text-lg font-bold text-white">HSBC × Knapsack</div>
          <div className="text-xs text-red-100 mt-1">Enterprise Experience Platform</div>
        </div>
        <div className="p-3 flex-1 overflow-y-auto">
          {sections.map((s, i) => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded text-sm text-left mb-0.5 transition-all ${activeSection === s.id ? 'bg-red-600 text-white font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
              <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0 ${activeSection === s.id ? 'bg-white text-red-600' : 'bg-gray-200 text-gray-600'}`}>{i + 1}</span>
              <span className="truncate">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Prepared for</div>
          <div className="text-sm font-bold text-gray-900">HSBC</div>
          <div className="text-xs text-gray-600">December 2025</div>
        </div>
      </nav>
      <main className="flex-1 ml-64 p-8 max-w-4xl">{renderContent()}</main>
    </div>
  );
}