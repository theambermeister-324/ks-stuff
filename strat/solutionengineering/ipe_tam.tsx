import { useState } from 'react';
import { ChevronRight, ChevronDown, CheckCircle2, Circle, Layers, Shield, Zap, BarChart3, Target, Lock, Unlock, AlertTriangle, DollarSign, Flag, XCircle, PlayCircle, PauseCircle, Settings, Clock, Activity, PieChart, GitBranch, Database } from 'lucide-react';

export default function IPEInternalPlaybook() {
  const [activeSection, setActiveSection] = useState<string>('vision');
  const [expandedJourney, setExpandedJourney] = useState<number | null>(3);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const sections = [
    { id: 'vision', label: 'Vision & Market', icon: Target },
    { id: 'maturity', label: 'Maturity Model', icon: Layers },
    { id: 'assessment', label: 'Assessment Framework', icon: Flag },
    { id: 'journeys', label: 'Customer Journeys', icon: GitBranch },
    { id: 'activation', label: 'Activation Phases', icon: Zap },
    { id: 'operations', label: 'Operating Guidance', icon: Settings },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
  ];

  const journeys = [
    {
      id: 1,
      name: 'Progressive Maturation',
      path: 'A → B → F → H',
      profile: 'True non-ICP or low readiness — don\'t overinvest',
      objective: 'Maintain relationship and credibility while they mature. No platform pressure.',
      accounts: ['Associated Press (non-ICP, low engagement)', 'Bright Horizons (non-ICP, no engineering support)', 'MSK (low engagement; minimal upside)', 'Accutech (beta exception: low ARR but high IPE excitement)'],
      service: { name: 'Product System Readiness Assessment', items: ['Validation Workshop', 'Vision Definition', 'Stakeholder Interviews & Strategic Recommendations'] },
      platformRule: { allowed: false, text: 'Platform expansion is not the play. If they cannot secure engineering/platform ownership, they cannot operate IPE.' },
      color: 'slate',
      risk: 'low',
      arrShare: '~10%'
    },
    {
      id: 2,
      name: 'Independent Maturation',
      path: 'A → D → H',
      profile: 'Mature orgs; sudden trigger; fast activation required',
      objective: 'Instant IPE activation when timing flips. Avoid re-education.',
      accounts: ['Adobe (reference implementation + enterprise rollout pattern)'],
      service: { name: 'IPE Activation Sprint (Trigger-Based)', items: ['Advanced Implementation & Onboarding', 'Security/Vendor assessment', 'Architecture validation', 'Integration setup + pilot validation', 'Advanced enablement'] },
      platformRule: { allowed: true, text: 'Immediate platform sale allowed. Sell the control plane and expansion roadmap.' },
      color: 'blue',
      risk: 'low',
      arrShare: '~5%'
    },
    {
      id: 3,
      name: 'Services Transformation',
      path: 'E → F/G → H',
      profile: 'High-value ICP accounts blocked on activation + trust',
      objective: 'Activate IPE in the correct order: stability + trust → governance/control plane → execution enablement → signals → expansion',
      accounts: ['PNC (not implemented; frustration)', 'Edward Jones (not implemented; policy + Git hurdles)', 'DoubleVerify (not implemented; risk high — rescue or exit)', 'Qualcomm (not implemented; org changes + missed window)', 'GSK US (implemented but trust/performance eroding value)', 'HealthEdge (implemented; early frustration; now IPE interest)', 'Columbia Sportswear', 'Southern California Edison', 'CVS Health', 'Alaska Airlines', 'Allegion'],
      service: { name: 'IPE Context & Control Foundation + Execution Enablement', items: ['Validation Workshop', 'Vision Definition', 'Tailored Workflow Definition & Advanced Training', 'Token Strategy & Implementation', 'Component Architecture & Delivery (POC)', 'Forward-Deployed Engineering'] },
      platformRule: { allowed: false, text: 'Platform expansion only after pilot proof. No expansion until activation complete.' },
      color: 'emerald',
      risk: 'high',
      arrShare: '~60%',
      isPrimary: true
    },
    {
      id: 4,
      name: 'Timing Play',
      path: 'D → H',
      profile: 'Mature systems; latent interest; needs trigger + crisp activation',
      objective: 'Executive activation package when opportunity appears. Do not drag into long services.',
      accounts: ['The Home Depot (embedded; underutilized; org consolidation trigger)', 'CSX (strong relationship; blocked by Angular parity)', 'GSK Global (exec alignment; tech consolidation; AEM requirements)', 'Crown Equipment (renewed; early MCP interest)', 'Shutterfly (mature small; selective growth)', 'BILL (strong embedded usage; budget constraints; MCP curiosity)'],
      service: { name: 'IPE Executive Activation', items: ['Executive alignment + success criteria', 'Targeted implementation enhancements', 'MCP roadmap + scoped activation', 'Expansion plan'] },
      platformRule: { allowed: true, text: 'J4 should not be dragged into long services until a trigger exists.' },
      color: 'violet',
      risk: 'medium',
      arrShare: '~25%'
    }
  ];

  const phases = [
    {
      id: 1,
      name: 'Stabilize & Complete',
      subtitle: 'Level 3 → Operational',
      goal: 'Make the platform reliably usable for real teams, without heroics.',
      workstreams: ['Workspace Go-Live', 'Entitlement setup + Site Switcher roles', 'Repo / Figma access dependencies', 'Proxy traffic testing + prod push', 'Deployment checklists + CRs'],
      exitCriteria: ['Teams can publish + update without Knapsack intervention', 'Workspace 2 live or date-certain', 'Entitlements + access no longer blocking work'],
      deliverables: ['Workspace Go-Live Checklists', 'RACI for Workspace 2+', 'Deployment Definition of Done'],
      mcpStatus: 'locked',
      icon: Shield
    },
    {
      id: 2,
      name: 'Control Plane & Governance',
      subtitle: 'Level 3 → Level 4',
      goal: 'Turn "systems" into a system of record with decision authority.',
      workstreams: ['Token Strategy POV (multi-brand)', 'Ledger + LPB governance representation', 'System-of-Systems architecture', 'Governance model definition', 'System Charter (North Star)', 'PI prioritization rubric'],
      exitCriteria: ['Token strategy approved and enforced', 'Governance model active beyond Ledger', 'Clear rules for cross-system interaction'],
      deliverables: ['Control Plane Definition', 'Token ownership + decision rights', 'Cross-system governance operating model'],
      mcpStatus: 'locked',
      icon: Lock
    },
    {
      id: 3,
      name: 'Execution Enablement',
      subtitle: 'Level 4 Operational',
      goal: 'Prove that governed intent can safely become production change.',
      workstreams: ['Integrated token strategy epics', 'Component modularization', 'Angular 18 + 20 planning', 'Testing architecture', 'Code Connect mapping', 'Migration + tech docs epics'],
      exitCriteria: ['One meaningful change ships end-to-end via Knapsack', 'Upgrade path validated without regressions', 'Teams trust the system to enforce standards'],
      deliverables: ['Governed pipelines', 'Safe propagation', 'Quality gates', 'Predictable upgrades'],
      mcpStatus: 'unlocking',
      icon: Zap
    },
    {
      id: 4,
      name: 'Signals & Intelligence',
      subtitle: 'Level 4 → Level 5',
      goal: 'Introduce intelligence only after trust exists.',
      workstreams: ['Maturity & AI Readiness Assessment', 'Signal capture + dashboards', 'Change readiness surveys', 'MCP onboarding (scoped)', 'FDE assignment confirmation'],
      exitCriteria: ['Signals prove faster, safer change', 'MCP adds value without introducing risk', 'Execs can articulate ROI + next bets'],
      deliverables: ['Signal dashboards', 'MCP pilot (1-2 use cases)', 'ROI framework'],
      mcpStatus: 'unlocked',
      icon: BarChart3
    }
  ];

  const accountFlags = [
    { name: 'Implemented?', values: 'Y/N', desc: 'Platform technically deployed' },
    { name: 'Trust Status', values: 'Green/Yellow/Red', desc: 'Red = data loss / severe performance / support failure' },
    { name: 'Activation Depth', values: 'Docs → Control Plane → MCP → AI', desc: 'How deeply they use the platform' },
    { name: 'MCP/IPE Interest', values: 'Y/N', desc: 'Expressed interest in AI capabilities' },
    { name: 'Strategic Fit', values: 'Y/N', desc: 'True ICP match' }
  ];

  const getColorClasses = (color: string, type: 'bg' | 'border' | 'text' | 'accent' | 'light'): string => {
    const colors: Record<string, Record<string, string>> = {
      slate: { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-700', accent: 'bg-slate-600', light: 'bg-slate-50' },
      blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700', accent: 'bg-blue-600', light: 'bg-blue-50' },
      emerald: { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-700', accent: 'bg-emerald-600', light: 'bg-emerald-50' },
      violet: { bg: 'bg-violet-100', border: 'border-violet-300', text: 'text-violet-700', accent: 'bg-violet-600', light: 'bg-violet-50' }
    };
    return colors[color]?.[type] || '';
  };

  const renderVision = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-3">
          <Target className="w-4 h-4" />
          STRATEGIC NORTH STAR
        </div>
        <h2 className="text-3xl font-bold mb-4">Knapsack becomes the Intelligent Product Engine enterprises trust to execute product change—safely, governably, and at scale—in the AI era.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Product intent', value: 'Executable, not descriptive' },
            { label: 'Systems', value: 'Evolve as one' },
            { label: 'AI context', value: 'Trusted & structured' },
            { label: 'Delivery', value: 'Faster via governance' }
          ].map((item, i) => (
            <div key={i} className="bg-white/10 rounded-lg p-3">
              <p className="text-emerald-400 text-xs font-medium mb-1">{item.label}</p>
              <p className="text-white font-medium text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-slate-400" />
            Market Definition
          </h3>
          <p className="text-slate-600 mb-4">Knapsack competes in <span className="font-semibold text-slate-900">Product Intelligence Infrastructure</span>:</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><Circle className="w-3 h-3 text-slate-300" />Product system infrastructure (design + code systems of record)</li>
            <li className="flex items-center gap-2"><Circle className="w-3 h-3 text-slate-300" />Orchestration (governance + change propagation)</li>
            <li className="flex items-center gap-2"><Circle className="w-3 h-3 text-slate-300" />Product intelligence (structured knowledge + signals)</li>
            <li className="flex items-center gap-2"><Circle className="w-3 h-3 text-slate-300" />AI product enablement (safe, contextual execution)</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            TAM by Capability Layer
          </h3>
          <div className="space-y-3">
            {[
              { layer: 'L1', name: 'Product System Infrastructure', tam: '$5–8B' },
              { layer: 'L2', name: 'Product Orchestration', tam: '$12–18B' },
              { layer: 'L3', name: 'Product Intelligence', tam: '$30–40B' },
              { layer: 'L4', name: 'AI Product Enablement', tam: '$15–25B' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">{item.layer}</span>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.tam}</span>
              </div>
            ))}
            <div className="border-t border-slate-200 pt-3 mt-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-900">Total TAM</span>
                <span className="font-bold text-emerald-600">$62–91B</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-slate-500">AI-expanded TAM</span>
                <span className="font-semibold text-slate-700">$75–110B</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">The Problem We Solve</h3>
            <p className="text-amber-800 mb-3">Modern enterprises don't fail because they lack tools. They fail because product knowledge is fragmented, implicit, and non-operational:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Design intent lives in files', 'Engineering reality lives in code', 'Decisions live in meetings', 'AI operates without structure'].map((item, i) => (
                <div key={i} className="bg-white/60 rounded-lg p-2 text-xs text-amber-800">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMaturity = () => (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Product System Maturity Model</h2>
        <p className="text-slate-600 mb-6">Five levels define where customers are and where they need to go.</p>
        
        <div className="space-y-3">
          {[
            { level: 1, name: 'UI Artifacts', desc: 'Static mockups, no system connection', color: 'bg-gray-400' },
            { level: 2, name: 'Design Library', desc: 'Organized components, limited code integration', color: 'bg-amber-400' },
            { level: 3, name: 'Integrated Product System', desc: 'Design-to-code connection, basic governance', color: 'bg-blue-400' },
            { level: 4, name: 'Scaled Product System', desc: 'Control plane operating, cross-system governance', color: 'bg-emerald-400' },
            { level: 5, name: 'IPE-Activated System', desc: 'Control plane operated + governed, full intelligence layer', color: 'bg-violet-500' }
          ].map((level) => (
            <div key={level.level} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
              <div className={`w-10 h-10 rounded-full ${level.color} flex items-center justify-center text-white font-bold`}>
                {level.level}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{level.name}</h3>
                <p className="text-sm text-slate-500">{level.desc}</p>
              </div>
              {level.level >= 3 && level.level <= 5 && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-emerald-100 text-emerald-700">SAM</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
        <h3 className="font-semibold text-rose-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Critical Clarification
        </h3>
        <p className="text-rose-800 font-medium text-lg mb-2">"Implemented" does not equal "Activated"</p>
        <p className="text-rose-700">Many customers are technically implemented but still operating at <span className="font-semibold">Quadrant G</span> (strong system, low intelligence) until signals, governance cadence, and MCP execution are in place. This gap is the primary driver of churn.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Readiness Quadrants (IPE-aligned)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Pipeline Development (low interest)</p>
            <div className="space-y-2">
              {[
                { q: 'A', desc: 'Low context, low AI → long nurture' },
                { q: 'B', desc: 'Low context, high AI → educate on structure' },
                { q: 'C', desc: 'High context, low interest → exit/monitor' },
                { q: 'D', desc: 'High context, latent interest → timing play' }
              ].map((item) => (
                <div key={item.q} className="flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 rounded bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center">{item.q}</span>
                  <span className="text-slate-600">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Active Pipeline (high interest)</p>
            <div className="space-y-2">
              {[
                { q: 'E', desc: 'Interest without structure → docs + heavy services' },
                { q: 'F', desc: 'AI ambition without context → docs + light services' },
                { q: 'G', desc: 'Strong system, low intelligence → IPE Enablement' },
                { q: 'H', desc: 'IPE-ready → IPE Activation' }
              ].map((item) => (
                <div key={item.q} className="flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">{item.q}</span>
                  <span className="text-slate-600">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssessment = () => (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Assessment Framework</h2>
        <p className="text-slate-600 mb-6">Required scoring for every account. No exceptions.</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Product System Maturity', values: '1-5' },
            { label: 'AI & Automation Capability', values: 'Low/Med/High' },
            { label: 'Interest State', values: 'Low/Latent/High' }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-1">{item.values}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Flag className="w-5 h-5 text-emerald-400" />
          Account State Flags (Required in CRM)
        </h3>
        <div className="space-y-3">
          {accountFlags.map((flag, i) => (
            <div key={i} className="flex items-start gap-4 bg-white/10 rounded-lg p-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{flag.name}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{flag.values}</span>
                </div>
                <p className="text-sm text-slate-300 mt-1">{flag.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-rose-100 border-2 border-rose-300 rounded-xl p-6">
        <h3 className="font-bold text-rose-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Routing Rule (Non-negotiable)
        </h3>
        <div className="bg-white rounded-lg p-4">
          <p className="text-lg text-rose-800 font-medium">
            If <span className="bg-rose-200 px-2 py-0.5 rounded">Strategic Fit = TRUE</span> and <span className="bg-rose-200 px-2 py-0.5 rounded">Implemented = NO</span>, the account is <span className="font-bold">Journey 3 by default</span> until activation is complete.
          </p>
        </div>
        <p className="text-sm text-rose-700 mt-3">This prevents the most common sequencing mistake: selling platform expansion before activation is real.</p>
      </div>
    </div>
  );

  const renderJourneys = () => (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Customer Journeys</h2>
        <p className="text-slate-600">Grounded in real portfolio reality. Not all "low engagement" accounts are equal.</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <h3 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Portfolio Bet Summary (Leadership View)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-emerald-800 font-medium">Journey 3 holds the majority of ARR and the majority of meaningful churn risk</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-emerald-800 font-medium">Services capacity is the growth bottleneck (not top-of-funnel)</p>
          </div>
        </div>
      </div>

      {journeys.map((journey) => (
        <div
          key={journey.id}
          className={`bg-white border rounded-xl overflow-hidden transition-all ${
            expandedJourney === journey.id ? `${getColorClasses(journey.color, 'border')} shadow-lg` : 'border-slate-200'
          } ${journey.isPrimary ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}
        >
          <button
            onClick={() => setExpandedJourney(expandedJourney === journey.id ? null : journey.id)}
            className="w-full p-5 text-left"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${getColorClasses(journey.color, 'bg')} flex items-center justify-center flex-shrink-0`}>
                <span className={`text-lg font-bold ${getColorClasses(journey.color, 'text')}`}>J{journey.id}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-slate-900">{journey.name}</h3>
                  {journey.isPrimary && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-500 text-white">PRIMARY FOCUS</span>
                  )}
                  <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{journey.path}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{journey.profile}</p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className={`px-2 py-0.5 rounded ${journey.risk === 'high' ? 'bg-rose-100 text-rose-700' : journey.risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                    {journey.risk} risk
                  </span>
                  <span className="text-slate-500">ARR: {journey.arrShare}</span>
                </div>
              </div>
              {expandedJourney === journey.id ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </button>

          {expandedJourney === journey.id && (
            <div className="px-5 pb-5 border-t border-slate-100">
              <div className="pt-5 space-y-5">
                <div className={`${getColorClasses(journey.color, 'light')} rounded-lg p-4`}>
                  <p className="text-sm text-slate-500 mb-1">Objective</p>
                  <p className={`font-medium ${getColorClasses(journey.color, 'text')}`}>{journey.objective}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">Accounts</p>
                  <div className="flex flex-wrap gap-2">
                    {journey.accounts.map((account, i) => (
                      <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">{account}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-2">Standard Service: {journey.service.name}</p>
                    <ul className="space-y-1">
                      {journey.service.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-slate-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-2">Platform Rule</p>
                    <div className={`rounded-lg p-3 ${journey.platformRule.allowed ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {journey.platformRule.allowed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600" />
                        )}
                        <span className={`text-sm font-medium ${journey.platformRule.allowed ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {journey.platformRule.allowed ? 'Expansion allowed' : 'Expansion blocked'}
                        </span>
                      </div>
                      <p className={`text-xs ${journey.platformRule.allowed ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {journey.platformRule.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderActivation = () => (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Activation Phases (Journey 3 Model)</h2>
        <p className="text-slate-600">Each phase has clear exit criteria. MCP is gated until trust is established.</p>
      </div>

      {phases.map((phase) => {
        const PhaseIcon = phase.icon;
        return (
        <div
          key={phase.id}
          className={`bg-white border rounded-xl overflow-hidden transition-all ${
            expandedPhase === phase.id ? 'border-slate-300 shadow-lg' : 'border-slate-200'
          }`}
        >
          <button
            onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
            className="w-full p-5 text-left flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              phase.mcpStatus === 'unlocked' ? 'bg-emerald-100 text-emerald-600' :
              phase.mcpStatus === 'unlocking' ? 'bg-amber-100 text-amber-600' :
              'bg-slate-100 text-slate-500'
            }`}>
              <PhaseIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-slate-900">Phase {phase.id}: {phase.name}</h3>
                {phase.mcpStatus === 'locked' && <Lock className="w-4 h-4 text-slate-400" />}
                {phase.mcpStatus === 'unlocking' && <Unlock className="w-4 h-4 text-amber-500" />}
                {phase.mcpStatus === 'unlocked' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </div>
              <p className="text-sm text-slate-500">{phase.subtitle}</p>
            </div>
            {expandedPhase === phase.id ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
          </button>
          
          {expandedPhase === phase.id && (
            <div className="px-5 pb-5 border-t border-slate-100">
              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Workstreams</p>
                  <ul className="space-y-1">
                    {phase.workstreams.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <Circle className="w-3 h-3 text-slate-300 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Exit Criteria</p>
                  <ul className="space-y-1">
                    {phase.exitCriteria.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Deliverables</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.deliverables.map((item, i) => (
                      <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">{item}</span>
                    ))}
                  </div>
                  <div className={`mt-3 rounded-lg p-2 ${
                    phase.mcpStatus === 'locked' ? 'bg-rose-50' : phase.mcpStatus === 'unlocking' ? 'bg-amber-50' : 'bg-emerald-50'
                  }`}>
                    <p className={`text-xs font-medium ${
                      phase.mcpStatus === 'locked' ? 'text-rose-700' : phase.mcpStatus === 'unlocking' ? 'text-amber-700' : 'text-emerald-700'
                    }`}>
                      {phase.mcpStatus === 'locked' && '🚫 MCP out of scope'}
                      {phase.mcpStatus === 'unlocking' && '⚡ MCP prep begins'}
                      {phase.mcpStatus === 'unlocked' && '✓ MCP pilot ready'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        );
      })}
    </div>
  );

  const renderOperations = () => (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Leadership Operating Guidance</h2>
        
        <h3 className="font-semibold text-slate-900 mb-3">Where to Place Bets</h3>
        <div className="space-y-2 mb-6">
          {[
            { journey: 'J3', text: 'Portfolio\'s growth and retention engine', primary: true },
            { journey: 'J4', text: 'Fastest expansion engine when triggers appear', primary: false },
            { journey: 'J1', text: 'Must be protected from premature platform selling', primary: false },
            { journey: 'J2', text: 'Rare but high-impact; treat as lighthouse wins', primary: false }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${item.primary ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-50'}`}>
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${item.primary ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>{item.journey}</span>
              <span className={item.primary ? 'text-emerald-800 font-medium' : 'text-slate-700'}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
          <h3 className="font-semibold text-rose-900 mb-4 flex items-center gap-2">
            <PauseCircle className="w-5 h-5" />
            What to STOP Doing
          </h3>
          <ul className="space-y-2">
            {[
              'Treating MCP Support as a substitute for activation',
              'Treating "implemented" as "successful"',
              'Running long implementations without ownership, milestones, or FDE',
              'Over-serving non-ICP accounts'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-rose-800">
                <XCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h3 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            What to START Doing
          </h3>
          <ul className="space-y-2">
            {[
              'Gate all work by maturity phase',
              'Require Account State Flags in CRM',
              'Apply the routing rule without exception',
              'Invest services capacity in Journey 3',
              'Treat J4 triggers as expansion opps'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          Operating Cadence (Quarterly)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-slate-300 mb-2">Pipeline + ARR reviewed by:</p>
            <p className="font-medium">Journey + Activation Depth</p>
            <p className="text-xs text-slate-400 mt-1">(not just pipeline stage)</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-slate-300 mb-2">Journey 3 accounts reviewed by:</p>
            <ul className="text-sm space-y-1">
              <li>• Time to implementation completion</li>
              <li>• Trust status</li>
              <li>• Time to first production value</li>
              <li>• Signal instrumentation adoption</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Metrics That Matter</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Activation Metrics
            </h3>
            <ul className="space-y-2">
              {[
                'Implemented rate (Y/N) by ICP segment',
                'Trust status distribution (G/Y/R)',
                'Activation depth distribution',
                'Time-to-first-production value'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <Circle className="w-3 h-3 text-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-500" />
              Product Intelligence
            </h3>
            <ul className="space-y-2">
              {[
                '% decisions via MCP workflows',
                'Time: intent → governed execution',
                'AI output acceptance rate',
                'Signal reuse across teams'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <Circle className="w-3 h-3 text-violet-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              Business Metrics
            </h3>
            <ul className="space-y-2">
              {[
                'ARR concentration by journey',
                'ARR at risk by journey',
                'J3 conversion velocity (E/F/G → H)',
                'Services → platform conversion',
                'Expansion ARR via L3/L4'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <Circle className="w-3 h-3 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-4">Final Word</h3>
        <p className="text-slate-300 text-lg mb-4">
          Knapsack's opportunity is not to be the best design system platform. It is to become the <span className="text-white font-semibold">governed engine enterprises trust to execute product change in the AI era</span>.
        </p>
        <p className="text-slate-400">
          The biggest wins are not "more pipeline." They are <span className="text-emerald-400">better sequencing</span>, <span className="text-emerald-400">stronger activation</span>, and <span className="text-emerald-400">durable trust</span> — especially in Journey 3.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">IPE Strategic Playbook</h1>
                <p className="text-xs text-slate-400">Internal Leadership Guide · Next 12-18 Months</p>
              </div>
            </div>
            <span className="text-xs bg-rose-500 text-white px-2 py-1 rounded font-medium">INTERNAL ONLY</span>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200 sticky top-[72px] z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <SectionIcon className="w-4 h-4" />
                {section.label}
              </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeSection === 'vision' && renderVision()}
        {activeSection === 'maturity' && renderMaturity()}
        {activeSection === 'assessment' && renderAssessment()}
        {activeSection === 'journeys' && renderJourneys()}
        {activeSection === 'activation' && renderActivation()}
        {activeSection === 'operations' && renderOperations()}
        {activeSection === 'metrics' && renderMetrics()}
      </main>

      <footer className="bg-slate-900 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Knapsack · IPE Strategic Playbook · Confidential
          </div>
          <div className="text-xs text-slate-500">
            Updated quarterly · Review with leadership team
          </div>
        </div>
      </footer>
    </div>
  );
}