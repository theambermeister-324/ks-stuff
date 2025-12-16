import { useState, Fragment } from 'react';
import { ChevronRight, CheckCircle2, Circle, ArrowRight, Layers, Shield, Zap, BarChart3, Target, Calendar, Settings, Building2, Cpu, Users } from 'lucide-react';

export default function PNCEngagementPlan() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const phases = [
    {
      id: 1,
      name: 'Stabilize & Complete',
      goal: 'Make the platform reliably usable for real teams, without heroics.',
      accomplishments: [
        'Complete Workspace 1 stabilization and Workspace 2 readiness',
        'Resolve entitlements, access, and publishing blockers',
        'Establish deployment checklists and operational definitions',
        'Enable teams to publish and update independently'
      ],
      exitCriteria: [
        'Mobile or Ledger team can publish and update without Knapsack intervention',
        'Workspace 2 live or date-certain',
        'All access and entitlement blockers resolved'
      ],
      deliverables: ['Workspace Go-Live Checklists', 'RACI for Workspace 2+', 'Deployment Definition of Done'],
      color: 'slate',
      icon: Shield
    },
    {
      id: 2,
      name: 'Control Plane & Governance',
      goal: 'Transform individual systems into a unified system of record with decision authority.',
      accomplishments: [
        'Establish comprehensive token strategy (multi-brand)',
        'Define and activate cross-system governance model',
        'Create system-of-systems architecture documentation',
        'Clarify decision rights across Mobile, Ledger, and PB'
      ],
      exitCriteria: [
        'Token strategy approved and actively enforced',
        'Governance model operating beyond Ledger',
        'Clear, documented rules for cross-system interaction'
      ],
      deliverables: ['Control Plane Definition', 'Token ownership documentation', 'Cross-system governance model', 'System Charter'],
      color: 'blue',
      icon: Settings
    },
    {
      id: 3,
      name: 'Execution Enablement',
      goal: 'Prove that governed intent can safely become production change.',
      accomplishments: [
        'Establish governed CI/CD pipelines',
        'Implement safe change propagation with quality gates',
        'Plan and validate Angular 18/20 upgrade path',
        'Enable predictable, regression-free upgrades'
      ],
      exitCriteria: [
        'One meaningful change ships end-to-end via Knapsack',
        'Upgrade path validated without regressions',
        'Teams trust the system to enforce standards'
      ],
      deliverables: ['Governed pipelines', 'Safe propagation mechanisms', 'Quality gates', 'Upgrade processes'],
      color: 'emerald',
      icon: Zap
    },
    {
      id: 4,
      name: 'Signals & Intelligence',
      goal: 'Introduce intelligence capabilities only after trust is fully established.',
      accomplishments: [
        'Deploy signal capture and health dashboards',
        'Conduct maturity and AI readiness assessment',
        'Launch scoped MCP pilot (1-2 use cases)',
        'Establish ROI measurement framework'
      ],
      exitCriteria: [
        'Signals demonstrate faster, safer change',
        'MCP adds measurable value without introducing risk',
        'Leadership can clearly articulate ROI and next investments'
      ],
      deliverables: ['Signal dashboards', 'AI readiness assessment', 'MCP pilot', 'ROI framework'],
      color: 'violet',
      icon: BarChart3
    }
  ];

  const getColorClasses = (color: string, type: 'bg' | 'border' | 'text' | 'accent'): string => {
    const colors: Record<string, Record<string, string>> = {
      slate: { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-700', accent: 'bg-slate-600' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', accent: 'bg-blue-600' },
      emerald: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-700', accent: 'bg-emerald-600' },
      violet: { bg: 'bg-violet-50', border: 'border-violet-300', text: 'text-violet-700', accent: 'bg-violet-600' }
    };
    return colors[color]?.[type] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-semibold">PNC</span>
            </div>
            <span className="text-slate-500">×</span>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xl font-semibold">Knapsack</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">Partnership Program</h1>
          <p className="text-xl text-slate-300">Intelligent Product Engine Activation</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Partnership Overview */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Partnership Overview</h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <p className="text-lg text-slate-600 mb-6">
              PNC and Knapsack are partnering to transform how product systems operate across your enterprise. This engagement goes beyond traditional design system implementation—it's about establishing a <span className="font-semibold text-slate-900">governable control plane</span> that unifies design intent, engineering execution, and governance into a single system of intelligence.
            </p>
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-emerald-900 mb-1">Our Shared Objective</h3>
                  <p className="text-emerald-800">Enable PNC to operate product systems as a governed engine—where change is safe, fast, and measurable across all platforms.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current State Assessment */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Current State Assessment</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <p className="text-slate-600">Through our collaborative discovery, we've identified PNC's position and the path forward:</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Dimension</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Current State</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-emerald-600">Target State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['System Maturity', 'Level 3 → early Level 4', 'Level 4: Scaled Product System'],
                    ['Implementation', 'Workspace 1 live; Workspace 2 in progress', 'All workspaces operational'],
                    ['Governance', 'Strong in Ledger; inconsistent elsewhere', 'Cross-system governance operating'],
                    ['Control Plane', 'Tooling present, not yet operating', 'Active governance and enforcement'],
                    ['Execution', 'Manual coordination required', 'Governed changes via CI/CD'],
                    ['Intelligence', 'High interest', 'Piloted against trusted context']
                  ].map(([dim, current, target], i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">{dim}</td>
                      <td className="px-6 py-4 text-slate-600">{current}</td>
                      <td className="px-6 py-4 text-emerald-700 font-medium">{target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-slate-900 text-white">
              <div className="flex items-start gap-3">
                <Layers className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Key Insight</h3>
                  <p className="text-slate-300">PNC's opportunity is not a design system problem. It's a <span className="text-white font-medium">system-of-systems activation challenge</span>—and that's exactly what the Intelligent Product Engine is designed to solve.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The IPE */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Intelligent Product Engine</h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <p className="text-lg text-slate-600 mb-6">
              The IPE is a governable control plane that converts fragmented product knowledge into executable intelligence.
            </p>
            <h3 className="font-semibold text-slate-900 mb-4">What This Means for PNC</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Layers, title: 'Unified System of Record', desc: 'Design intent, engineering reality, and governance decisions in one place' },
                { icon: Shield, title: 'Governed Change Propagation', desc: 'Safe, controlled updates across Mobile, Ledger, and PB systems' },
                { icon: Settings, title: 'Cross-System Intelligence', desc: 'Decisions made once, enforced everywhere' },
                { icon: Cpu, title: 'AI-Ready Foundation', desc: 'Structured context that enables safe AI-assisted delivery' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Structure */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Engagement Structure</h2>
          <p className="text-slate-600 mb-6">We've organized this partnership into four phases, each with clear goals and exit criteria. This sequencing ensures we build on solid foundations rather than introducing complexity prematurely.</p>
          
          {/* Phase Timeline */}
          <div className="bg-slate-900 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {phases.map((phase, i) => {
                const PhaseIcon = phase.icon;
                return (
                  <Fragment key={phase.id}>
                    <button
                      onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                      className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all min-w-[120px] ${
                        activePhase === phase.id ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full ${getColorClasses(phase.color, 'accent')} flex items-center justify-center`}>
                        <PhaseIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold text-sm">Phase {phase.id}</p>
                        <p className="text-slate-400 text-xs">{phase.name.split(' ')[0]}</p>
                      </div>
                    </button>
                    {i < phases.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-slate-600 flex-shrink-0 mx-2" />
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>

          {/* Phase Details */}
          <div className="space-y-4">
            {phases.map((phase) => {
              const PhaseIcon = phase.icon;
              return (
              <div
                key={phase.id}
                className={`bg-white rounded-2xl border overflow-hidden transition-all shadow-sm ${
                  activePhase === phase.id ? `${getColorClasses(phase.color, 'border')} shadow-lg` : 'border-slate-200'
                }`}
              >
                <button
                  onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                  className="w-full p-6 text-left flex items-center gap-4"
                >
                  <div className={`w-14 h-14 rounded-xl ${getColorClasses(phase.color, 'bg')} flex items-center justify-center`}>
                    <PhaseIcon className={`w-7 h-7 ${getColorClasses(phase.color, 'text')}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Phase {phase.id}: {phase.name}</h3>
                    <p className="text-slate-500">{phase.goal}</p>
                  </div>
                  <ChevronRight className={`w-6 h-6 text-slate-400 transition-transform ${activePhase === phase.id ? 'rotate-90' : ''}`} />
                </button>

                {activePhase === phase.id && (
                  <div className="px-6 pb-6 border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">What We'll Accomplish</h4>
                        <ul className="space-y-2">
                          {phase.accomplishments.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle2 className={`w-4 h-4 ${getColorClasses(phase.color, 'text')} flex-shrink-0 mt-0.5`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Exit Criteria</h4>
                        <ul className="space-y-2">
                          {phase.exitCriteria.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                              <Circle className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.deliverables.map((item, i) => (
                            <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${getColorClasses(phase.color, 'bg')} ${getColorClasses(phase.color, 'text')}`}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </section>

        {/* Engagement Model */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Engagement Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-emerald-900">Knapsack's Commitment</h3>
              </div>
              <div className="space-y-3">
                {[
                  { role: 'Principal Ownership', desc: 'Program authority and strategic alignment' },
                  { role: 'Forward-Deployed Engineering', desc: 'Hands-on technical enablement through Phase 3' },
                  { role: 'Change Enablement', desc: 'Governance and adoption support' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-3">
                    <p className="font-medium text-emerald-900">{item.role}</p>
                    <p className="text-sm text-emerald-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">PNC's Partnership</h3>
              </div>
              <div className="space-y-3">
                {[
                  { role: 'Executive Sponsorship', desc: 'Strategic decisions and resource allocation' },
                  { role: 'Platform Ownership', desc: 'Technical authority and engineering commitment' },
                  { role: 'Governance Participation', desc: 'Cross-system decision-making engagement' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-3">
                    <p className="font-medium text-slate-900">{item.role}</p>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Immediate Next Steps</h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-slate-400" />
              <p className="font-medium text-slate-600">Within the Next Two Weeks</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { num: 1, text: 'Align on the four-phase structure' },
                { num: 2, text: 'Validate current phase position' },
                { num: 3, text: 'Lock Phase 1 & 2 scope' },
                { num: 4, text: 'Establish review cadence' },
                { num: 5, text: 'Gate intelligence work appropriately' }
              ].map((step) => (
                <div key={step.num} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    {step.num}
                  </div>
                  <p className="text-sm text-slate-700">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <div className="flex items-start gap-4">
              <Users className="w-10 h-10 text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Partnership Philosophy</h3>
                <p className="text-lg text-slate-300 italic leading-relaxed">
                  "We're not here to deliver features or AI experiments. We're here to help PNC operate your product systems as a governed engine. That means stabilizing first, governing second, executing third—and only then adding intelligence."
                </p>
                <p className="text-slate-400 mt-4">
                  This partnership represents a new category of enterprise capability—one where product knowledge becomes executable, AI operates with trusted context, and teams ship faster precisely because they govern better.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">Knapsack</p>
              <p className="text-sm text-slate-500">Intelligent Product Engine</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Prepared for PNC Partnership Team</p>
              <p className="text-xs text-slate-400">Confidential</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}