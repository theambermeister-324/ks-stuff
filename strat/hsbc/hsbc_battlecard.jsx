import { useState } from 'react';

const sections = [
  { id: 'overview', label: 'Account Overview' },
  { id: 'discovery', label: 'Discovery Questions' },
  { id: 'value-props', label: 'Value Propositions' },
  { id: 'competitive', label: 'Competitive Intel' },
  { id: 'objections', label: 'Objection Handling' },
  { id: 'pricing', label: 'Pricing & Packaging' },
  { id: 'stakeholders', label: 'Stakeholder Map' },
  { id: 'next-steps', label: 'Sales Motion' }
];

const Badge = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-purple-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-600 text-white',
    muted: 'bg-gray-200 text-gray-700'
  };
  return <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase ${variants[variant]}`}>{children}</span>;
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-lg p-5 ${className}`}>{children}</div>
);

const OverviewSection = () => (
  <div className="space-y-5">
    <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-6 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-purple-200 text-sm font-semibold uppercase tracking-wider">Enterprise Account</p>
          <h1 className="text-3xl font-bold mt-1">HSBC</h1>
          <p className="text-purple-200 mt-1">Global Banking & Financial Services</p>
        </div>
        <div className="text-right">
          <p className="text-purple-200 text-sm">Deal Size</p>
          <p className="text-2xl font-bold">$1M ARR</p>
          <Badge variant="warning">Enterprise</Badge>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <p className="text-xs text-gray-500 uppercase font-semibold">Current State</p>
        <p className="text-lg font-bold text-gray-900 mt-1">Fragmented</p>
        <p className="text-sm text-gray-600 mt-2">20+ Storybooks, multiple Figma libraries, no unified governance</p>
      </Card>
      <Card>
        <p className="text-xs text-gray-500 uppercase font-semibold">Annual Waste</p>
        <p className="text-lg font-bold text-red-600 mt-1">$4.5M+</p>
        <p className="text-sm text-gray-600 mt-2">Duplication, rework, misalignment across CIB/WPB/ET</p>
      </Card>
      <Card>
        <p className="text-xs text-gray-500 uppercase font-semibold">Potential ROI</p>
        <p className="text-lg font-bold text-green-600 mt-1">3.5–5×</p>
        <p className="text-sm text-gray-600 mt-2">$3.5M–$4.5M annual value from $1M investment</p>
      </Card>
    </div>

    <Card>
      <h3 className="font-bold text-gray-900 mb-3">Key Pain Points (Use in Discovery)</h3>
      <div className="space-y-2">
        <div className="flex items-start gap-2"><span className="text-red-500">⚠</span><span className="text-sm"><strong>Fragmentation:</strong> Teams rebuild components, no single source of truth</span></div>
        <div className="flex items-start gap-2"><span className="text-red-500">⚠</span><span className="text-sm"><strong>Manual docs:</strong> Confluence/GitHub docs go stale, cause misalignment</span></div>
        <div className="flex items-start gap-2"><span className="text-red-500">⚠</span><span className="text-sm"><strong>Slow delivery:</strong> 3-4 week component cycles, 20% rework rate</span></div>
        <div className="flex items-start gap-2"><span className="text-red-500">⚠</span><span className="text-sm"><strong>Governance gaps:</strong> No lifecycle tracking, compliance risk</span></div>
        <div className="flex items-start gap-2"><span className="text-red-500">⚠</span><span className="text-sm"><strong>Multi-BU complexity:</strong> CIB, WPB, ET all working in silos</span></div>
      </div>
    </Card>

    <Card className="border-l-4 border-l-purple-600">
      <h3 className="font-bold text-gray-900 mb-2">Why HSBC Needs Knapsack</h3>
      <p className="text-sm text-gray-700">HSBC has an existing design system called "Create" but lacks the production infrastructure to connect design, code, and governance. They need an <strong>enterprise control plane</strong>, not another documentation tool. Position Knapsack as the backbone that makes Create operational at scale.</p>
    </Card>
  </div>
);

const DiscoverySection = () => (
  <div className="space-y-5">
    <h2 className="text-2xl font-bold text-gray-900">Discovery Questions</h2>
    
    <Card>
      <h3 className="font-bold text-purple-700 mb-3">Pain & Current State</h3>
      <ul className="space-y-3 text-sm">
        <li className="p-3 bg-gray-50 rounded">"How many separate component libraries or Storybooks do your teams maintain today?"</li>
        <li className="p-3 bg-gray-50 rounded">"When a designer updates a component in Figma, what happens to the code version?"</li>
        <li className="p-3 bg-gray-50 rounded">"How do you currently handle documentation for your design system? Who maintains it?"</li>
        <li className="p-3 bg-gray-50 rounded">"What happens when CIB needs a component that WPB already built?"</li>
        <li className="p-3 bg-gray-50 rounded">"How do you know if a component is production-ready vs experimental?"</li>
      </ul>
    </Card>

    <Card>
      <h3 className="font-bold text-purple-700 mb-3">Impact & Quantification</h3>
      <ul className="space-y-3 text-sm">
        <li className="p-3 bg-gray-50 rounded">"How many FTEs do you estimate spend time rebuilding components that exist elsewhere?"</li>
        <li className="p-3 bg-gray-50 rounded">"What percentage of UI development time goes to rework from design-dev misalignment?"</li>
        <li className="p-3 bg-gray-50 rounded">"How long does it take to ship a new component from design to production today?"</li>
        <li className="p-3 bg-gray-50 rounded">"Have you ever had compliance or accessibility issues traced back to component inconsistency?"</li>
      </ul>
    </Card>

    <Card>
      <h3 className="font-bold text-purple-700 mb-3">Future State & Vision</h3>
      <ul className="space-y-3 text-sm">
        <li className="p-3 bg-gray-50 rounded">"If you could wave a magic wand, what would your ideal design system infrastructure look like?"</li>
        <li className="p-3 bg-gray-50 rounded">"How important is AI-readiness in your technology roadmap?"</li>
        <li className="p-3 bg-gray-50 rounded">"What would it mean for your team if design and code were always in sync?"</li>
        <li className="p-3 bg-gray-50 rounded">"Who else in the organization is feeling this pain? (Expand stakeholder map)"</li>
      </ul>
    </Card>

    <Card className="border-l-4 border-l-green-500">
      <h3 className="font-bold text-gray-900 mb-2">💡 Pro Tip</h3>
      <p className="text-sm text-gray-700">HSBC already has "Create" — don't position Knapsack as replacing it. Position as the <strong>production backbone</strong> that makes Create operational. Say: "We're not here to replace Create — we're here to make it actually work in production."</p>
    </Card>
  </div>
);

const ValuePropsSection = () => (
  <div className="space-y-5">
    <h2 className="text-2xl font-bold text-gray-900">Value Propositions</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border-t-4 border-t-purple-600">
        <h3 className="font-bold text-gray-900 mb-2">Code-Connected by Default</h3>
        <p className="text-sm text-gray-600 mb-3">Design and code stay in sync automatically — no manual updates, no drift.</p>
        <div className="bg-purple-50 p-3 rounded text-sm">
          <strong>Say:</strong> "When your designer updates a button in Figma, the code documentation updates automatically. No tickets, no waiting."
        </div>
      </Card>

      <Card className="border-t-4 border-t-purple-600">
        <h3 className="font-bold text-gray-900 mb-2">Multi-BU Governance</h3>
        <p className="text-sm text-gray-600 mb-3">One platform for CIB, WPB, and ET with shared components and local flexibility.</p>
        <div className="bg-purple-50 p-3 rounded text-sm">
          <strong>Say:</strong> "Stop rebuilding the same button three times. Build once, govern centrally, deploy everywhere."
        </div>
      </Card>

      <Card className="border-t-4 border-t-purple-600">
        <h3 className="font-bold text-gray-900 mb-2">AI-Ready Infrastructure</h3>
        <p className="text-sm text-gray-600 mb-3">MCP server enables AI agents to generate production-ready UI with your components.</p>
        <div className="bg-purple-50 p-3 rounded text-sm">
          <strong>Say:</strong> "When HSBC is ready for AI-assisted design, your system will be structured for it. Competitors won't be."
        </div>
      </Card>

      <Card className="border-t-4 border-t-purple-600">
        <h3 className="font-bold text-gray-900 mb-2">Enterprise Control Plane</h3>
        <p className="text-sm text-gray-600 mb-3">Not just docs — a system of record connecting design, code, tokens, and governance.</p>
        <div className="bg-purple-50 p-3 rounded text-sm">
          <strong>Say:</strong> "zeroheight documents your system. Knapsack runs it."
        </div>
      </Card>
    </div>

    <Card>
      <h3 className="font-bold text-gray-900 mb-3">ROI Talking Points</h3>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr><th className="p-2 text-left">Value Driver</th><th className="p-2 text-left">Annual Impact</th><th className="p-2 text-left">Talking Point</th></tr>
        </thead>
        <tbody>
          <tr className="border-b"><td className="p-2 font-medium">Eliminate duplication</td><td className="p-2 text-green-600 font-bold">$1.5M</td><td className="p-2">"40-50% reduction in redundant work"</td></tr>
          <tr className="border-b"><td className="p-2 font-medium">Engineering productivity</td><td className="p-2 text-green-600 font-bold">$700K–$1M</td><td className="p-2">"3-5 FTEs worth of time saved"</td></tr>
          <tr className="border-b"><td className="p-2 font-medium">Documentation automation</td><td className="p-2 text-green-600 font-bold">$300K</td><td className="p-2">"70% less doc maintenance"</td></tr>
          <tr className="bg-green-50"><td className="p-2 font-bold">Total Value</td><td className="p-2 text-green-600 font-bold">$3.5M–$4.5M</td><td className="p-2 font-bold">"3.5-5× ROI on $1M investment"</td></tr>
        </tbody>
      </table>
    </Card>
  </div>
);

const CompetitiveSection = () => (
  <div className="space-y-5">
    <h2 className="text-2xl font-bold text-gray-900">Competitive Intelligence</h2>
    
    <Card className="border-l-4 border-l-red-500">
      <h3 className="font-bold text-gray-900 mb-2">⚔️ Likely Competitors in This Deal</h3>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="danger">zeroheight</Badge>
        <Badge variant="warning">Supernova</Badge>
        <Badge variant="muted">Zeplin</Badge>
        <Badge variant="muted">Build In-House</Badge>
      </div>
    </Card>

    <Card>
      <h3 className="font-bold text-red-600 mb-3">vs. zeroheight</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Their Pitch</p>
          <ul className="text-sm space-y-1">
            <li>• Beautiful documentation</li>
            <li>• Easy to use for designers</li>
            <li>• Figma integration</li>
            <li>• Lower price point</li>
          </ul>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Our Counter</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>Docs go stale</strong> — no live code connection</li>
            <li>• <strong>Design-centric</strong> — engineers are second-class</li>
            <li>• <strong>No governance</strong> — can't handle multi-BU complexity</li>
            <li>• <strong>Not AI-ready</strong> — unstructured data</li>
          </ul>
        </div>
      </div>
      <div className="bg-purple-50 p-3 rounded mt-3 text-sm">
        <strong>Killer line:</strong> "zeroheight is a great documentation tool. But HSBC doesn't need prettier docs — you need docs that are always accurate because they're connected to your actual code."
      </div>
    </Card>

    <Card>
      <h3 className="font-bold text-yellow-600 mb-3">vs. Supernova</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Their Pitch</p>
          <ul className="text-sm space-y-1">
            <li>• Strong token management</li>
            <li>• Code export capabilities</li>
            <li>• AI-assisted content</li>
            <li>• Growing enterprise features</li>
          </ul>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Our Counter</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>Less mature governance</strong> for enterprise scale</li>
            <li>• <strong>Lighter multi-BU support</strong> — HSBC needs CIB/WPB/ET</li>
            <li>• <strong>Export vs connect</strong> — we connect to live code</li>
            <li>• <strong>MCP advantage</strong> — our AI story is production-ready</li>
          </ul>
        </div>
      </div>
      <div className="bg-purple-50 p-3 rounded mt-3 text-sm">
        <strong>Killer line:</strong> "Supernova exports code. Knapsack connects to your actual production codebase. Export creates drift; connection ensures accuracy."
      </div>
    </Card>

    <Card>
      <h3 className="font-bold text-gray-600 mb-3">vs. Build In-House</h3>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr><th className="p-2 text-left">Factor</th><th className="p-2 text-left">Build</th><th className="p-2 text-left">Knapsack</th></tr>
        </thead>
        <tbody>
          <tr className="border-b"><td className="p-2">Time to value</td><td className="p-2 text-red-600">9-12 months</td><td className="p-2 text-green-600">3-4 months</td></tr>
          <tr className="border-b"><td className="p-2">Total cost</td><td className="p-2 text-red-600">$1.1M-$1.3M</td><td className="p-2 text-green-600">$1M</td></tr>
          <tr className="border-b"><td className="p-2">Delivery risk</td><td className="p-2 text-red-600">High</td><td className="p-2 text-green-600">Low</td></tr>
          <tr><td className="p-2">Ongoing maintenance</td><td className="p-2 text-red-600">Internal burden</td><td className="p-2 text-green-600">Included</td></tr>
        </tbody>
      </table>
      <div className="bg-purple-50 p-3 rounded mt-3 text-sm">
        <strong>Killer line:</strong> "Building internally sounds like control, but it's actually risk. You'll spend more, wait longer, and still have to maintain it forever."
      </div>
    </Card>
  </div>
);

const ObjectionsSection = () => (
  <div className="space-y-5">
    <h2 className="text-2xl font-bold text-gray-900">Objection Handling</h2>
    
    <Card className="border-l-4 border-l-red-500">
      <h3 className="font-bold text-gray-900 mb-2">"$1M is too expensive"</h3>
      <div className="bg-green-50 p-3 rounded text-sm mb-3">
        <strong>Response:</strong> "I understand. Let's look at it differently — you're currently spending $4.5M+ annually on fragmentation and rework. This $1M investment returns $3.5M-$4.5M in value. The question isn't whether you can afford Knapsack — it's whether you can afford to keep losing $4.5M every year."
      </div>
      <p className="text-xs text-gray-500">Follow up: "Would it help to start with a 30-day Sandbox POC to validate these numbers for your specific situation?"</p>
    </Card>

    <Card className="border-l-4 border-l-red-500">
      <h3 className="font-bold text-gray-900 mb-2">"We already have zeroheight/Confluence"</h3>
      <div className="bg-green-50 p-3 rounded text-sm mb-3">
        <strong>Response:</strong> "That's great for documentation — but is it connected to your actual code? When an engineer ships a component update, does your documentation automatically update? Knapsack isn't replacing your docs — it's making them always accurate by connecting them to production."
      </div>
      <p className="text-xs text-gray-500">Follow up: "How much time does your team spend keeping documentation in sync with code today?"</p>
    </Card>

    <Card className="border-l-4 border-l-red-500">
      <h3 className="font-bold text-gray-900 mb-2">"We can build this ourselves"</h3>
      <div className="bg-green-50 p-3 rounded text-sm mb-3">
        <strong>Response:</strong> "You absolutely could. The question is: should you? Internal builds typically cost $1.1M-$1.3M, take 9-12 months, and require ongoing maintenance forever. Knapsack delivers faster, at lower cost, with maintenance included. What's your team's core competency — building internal tools or serving HSBC customers?"
      </div>
      <p className="text-xs text-gray-500">Follow up: "What's the opportunity cost of your best engineers building tooling instead of customer-facing products?"</p>
    </Card>

    <Card className="border-l-4 border-l-red-500">
      <h3 className="font-bold text-gray-900 mb-2">"We need to see it work first"</h3>
      <div className="bg-green-50 p-3 rounded text-sm mb-3">
        <strong>Response:</strong> "Completely reasonable. That's exactly why we recommend starting with a 30-day Sandbox POC. You'll validate the platform with your actual Figma files, your Storybook, your team. No commitment until you've proven it works."
      </div>
      <p className="text-xs text-gray-500">This is the ideal response — drive toward POC.</p>
    </Card>

    <Card className="border-l-4 border-l-red-500">
      <h3 className="font-bold text-gray-900 mb-2">"What about on-prem requirements?"</h3>
      <div className="bg-green-50 p-3 rounded text-sm mb-3">
        <strong>Response:</strong> "We support both cloud and on-premises deployment. The 30-day POC includes an infrastructure assessment to determine the best approach for HSBC's security requirements. We've done this with other financial services enterprises."
      </div>
      <p className="text-xs text-gray-500">Note: On-prem may add 2-4 months to implementation timeline.</p>
    </Card>
  </div>
);

const PricingSection = () => (
  <div className="space-y-5">
    <h2 className="text-2xl font-bold text-gray-900">Pricing & Packaging</h2>
    
    <Card className="border-2 border-purple-600">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900 text-xl">Proposed Deal: $1M/Year</h3>
        <Badge variant="primary">Enterprise</Badge>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <div>
            <p className="font-semibold">Knapsack Enterprise License</p>
            <p className="text-sm text-gray-600">Multi-workspace, Figma/code integrations, MCP, enterprise security</p>
          </div>
          <p className="font-bold text-lg">$400K</p>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <div>
            <p className="font-semibold">Engineering Enablement (2× FDEs)</p>
            <p className="text-sm text-gray-600">Embedded engineers for integration, automation, CI/CD</p>
          </div>
          <p className="font-bold text-lg">$350K</p>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <div>
            <p className="font-semibold">CX Partner for Change Management</p>
            <p className="text-sm text-gray-600">Charter development, PI planning, maturity scoring, training</p>
          </div>
          <p className="font-bold text-lg">$250K</p>
        </div>
      </div>
    </Card>

    <Card>
      <h3 className="font-bold text-gray-900 mb-3">Negotiation Levers</h3>
      <div className="space-y-2 text-sm">
        <div className="p-3 bg-yellow-50 rounded"><strong>Multi-year discount:</strong> 10-15% for 3-year commitment</div>
        <div className="p-3 bg-yellow-50 rounded"><strong>Phased rollout:</strong> Start with CIB only at reduced scope, expand in Year 2</div>
        <div className="p-3 bg-yellow-50 rounded"><strong>FDE flexibility:</strong> Can start with 1 FDE and add second in Q2</div>
        <div className="p-3 bg-yellow-50 rounded"><strong>POC investment:</strong> POC cost can credit toward full contract</div>
      </div>
    </Card>

    <Card className="border-l-4 border-l-green-500">
      <h3 className="font-bold text-gray-900 mb-2">💰 Always Lead with Value, Not Price</h3>
      <p className="text-sm text-gray-700">Never say "$1M" without context. Always frame as: "For an investment that returns 3.5-5× annually..." or "To eliminate $4.5M in annual waste..."</p>
    </Card>
  </div>
);

const StakeholdersSection = () => (
  <div className="space-y-5">
    <h2 className="text-2xl font-bold text-gray-900">Stakeholder Map</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border-t-4 border-t-red-500">
        <h3 className="font-bold text-gray-900 mb-2">Economic Buyer</h3>
        <p className="text-sm text-gray-600 mb-2">VP/SVP of Engineering or Design</p>
        <p className="text-xs text-gray-500 mb-3">Cares about: Cost reduction, delivery velocity, risk mitigation</p>
        <div className="bg-red-50 p-2 rounded text-xs"><strong>Message:</strong> "Reduce $4.5M annual waste to reclaim engineering capacity"</div>
      </Card>

      <Card className="border-t-4 border-t-blue-500">
        <h3 className="font-bold text-gray-900 mb-2">Technical Buyer</h3>
        <p className="text-sm text-gray-600 mb-2">Design System Lead / Principal Engineer</p>
        <p className="text-xs text-gray-500 mb-3">Cares about: Integration, automation, developer experience</p>
        <div className="bg-blue-50 p-2 rounded text-xs"><strong>Message:</strong> "Live code connection, multi-framework support, CI/CD integration"</div>
      </Card>

      <Card className="border-t-4 border-t-green-500">
        <h3 className="font-bold text-gray-900 mb-2">User Buyer</h3>
        <p className="text-sm text-gray-600 mb-2">Design Managers / Engineering Leads</p>
        <p className="text-xs text-gray-500 mb-3">Cares about: Day-to-day usability, team adoption, reduced friction</p>
        <div className="bg-green-50 p-2 rounded text-xs"><strong>Message:</strong> "Designers and engineers work from the same source of truth"</div>
      </Card>

      <Card className="border-t-4 border-t-purple-500">
        <h3 className="font-bold text-gray-900 mb-2">Champion</h3>
        <p className="text-sm text-gray-600 mb-2">Design System Lead (most likely)</p>
        <p className="text-xs text-gray-500 mb-3">Cares about: Making their job easier, getting executive support</p>
        <div className="bg-purple-50 p-2 rounded text-xs"><strong>Message:</strong> "We'll help you build the business case and prove value"</div>
      </Card>
    </div>

    <Card>
      <h3 className="font-bold text-gray-900 mb-3">HSBC Business Units to Engage</h3>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="p-3 bg-gray-50 rounded text-center">
          <p className="font-bold">CIB</p>
          <p className="text-xs text-gray-500">Corporate & Institutional Banking</p>
          <Badge variant="success">Start Here</Badge>
        </div>
        <div className="p-3 bg-gray-50 rounded text-center">
          <p className="font-bold">WPB</p>
          <p className="text-xs text-gray-500">Wealth & Personal Banking</p>
          <Badge variant="muted">Phase 2</Badge>
        </div>
        <div className="p-3 bg-gray-50 rounded text-center">
          <p className="font-bold">ET</p>
          <p className="text-xs text-gray-500">Enterprise Technology</p>
          <Badge variant="muted">Phase 3</Badge>
        </div>
      </div>
    </Card>
  </div>
);

const NextStepsSection = () => (
  <div className="space-y-5">
    <h2 className="text-2xl font-bold text-gray-900">Sales Motion</h2>
    
    <Card className="border-2 border-purple-600">
      <h3 className="font-bold text-gray-900 mb-4">Recommended Path to Close</h3>
      <div className="space-y-4">
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
          <div>
            <p className="font-semibold">Discovery Call</p>
            <p className="text-sm text-gray-600">Validate pain points, quantify waste, identify stakeholders</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
          <div>
            <p className="font-semibold">Technical Deep-Dive</p>
            <p className="text-sm text-gray-600">Demo with DS Lead + Engineering, show code connection</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
          <div>
            <p className="font-semibold">Executive Alignment</p>
            <p className="text-sm text-gray-600">Present business case, ROI analysis, get buy-in for POC</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
          <div>
            <p className="font-semibold">30-Day Sandbox POC</p>
            <p className="text-sm text-gray-600">Validate with real assets, gather requirements, prove value</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
          <div>
            <p className="font-semibold">Contract & Implementation</p>
            <p className="text-sm text-gray-600">Sign annual agreement, begin Phase 1 CIB rollout</p>
          </div>
        </div>
      </div>
    </Card>

    <Card>
      <h3 className="font-bold text-gray-900 mb-3">Email Templates</h3>
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded">
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Initial Outreach</p>
          <p className="text-sm italic">"I noticed HSBC has invested significantly in the Create design system. We help enterprises like [similar bank] turn design systems from documentation into production infrastructure — typically saving 3-5 FTEs worth of duplicated work. Worth a 20-minute call?"</p>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">After Discovery</p>
          <p className="text-sm italic">"Based on our conversation about [specific pain point], I've put together a preliminary proposal. The 30-day Sandbox POC would let your team validate the platform with your actual Figma/Storybook setup before any commitment."</p>
        </div>
      </div>
    </Card>

    <Card className="border-l-4 border-l-green-500">
      <h3 className="font-bold text-gray-900 mb-2">🎯 Goal: Get to POC</h3>
      <p className="text-sm text-gray-700">Every conversation should drive toward the 30-day Sandbox POC. It de-risks the deal for HSBC and gives us a chance to prove value. POC-to-close rate is significantly higher than demo-to-close.</p>
    </Card>
  </div>
);

export default function HSBCBattlecard() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection />;
      case 'discovery': return <DiscoverySection />;
      case 'value-props': return <ValuePropsSection />;
      case 'competitive': return <CompetitiveSection />;
      case 'objections': return <ObjectionsSection />;
      case 'pricing': return <PricingSection />;
      case 'stakeholders': return <StakeholdersSection />;
      case 'next-steps': return <NextStepsSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <nav className="w-56 bg-gray-900 fixed top-0 left-0 h-screen overflow-y-auto flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-wider">Internal Only</p>
          <p className="text-white text-lg font-bold mt-1">HSBC Battlecard</p>
          <p className="text-gray-400 text-xs">Sales & BDR Tool</p>
        </div>
        <div className="p-2 flex-1">
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} className={`w-full px-3 py-2 rounded text-sm text-left mb-1 transition-all ${activeSection === s.id ? 'bg-purple-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-800'}`}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700">
          <p className="text-gray-500 text-xs">Deal Size</p>
          <p className="text-green-400 text-xl font-bold">$1M ARR</p>
        </div>
      </nav>
      <main className="flex-1 ml-56 p-6 max-w-4xl">{renderContent()}</main>
    </div>
  );
}