/**
 * IPE Pricing Engine v1.0
 * Shared module for calculating IPE pricing across ROI Calculator and Proactive Business Case
 * 
 * Implements value-based pricing model with:
 * - PCRI-driven investment path selection
 * - Developer scale multipliers
 * - Deployment model premiums
 * - Regulatory environment premiums
 * - Multi-year commitment discounts
 */

const IPEPricingEngine = (function() {
  'use strict';

  // ==========================================================================
  // BASE PRICING BY INVESTMENT PATH
  // ==========================================================================
  const BASE_PRICING = {
    J1: {
      name: 'J1 Foundation',
      pcriRange: [0, 44],
      archetype: 'Builder',
      icon: '🔨',
      color: '#ef4444',
      services: { min: 50000, max: 75000, typical: 60000 },
      platform: { min: 48000, max: 72000, typical: 54000 },
      timeline: '6-12 months',
      expectedPcriGain: [25, 35],
      description: 'Foundation building for organizations establishing design system basics'
    },
    J2: {
      name: 'J2 Activation',
      pcriRange: [45, 54],
      archetype: 'Adopter',
      icon: '🌱',
      color: '#fbbf24',
      services: { min: 100000, max: 150000, typical: 120000 },
      platform: { min: 96000, max: 120000, typical: 108000 },
      timeline: '3-6 months',
      expectedPcriGain: [15, 22],
      description: 'Rapid activation sprint for organizations ready to accelerate'
    },
    J3: {
      name: 'J3 Transformation',
      pcriRange: [55, 74],
      archetype: 'Optimizer',
      icon: '⚙️',
      color: '#3b82f6',
      services: { min: 175000, max: 250000, typical: 200000 },
      platform: { min: 180000, max: 240000, typical: 200000 },
      timeline: '6-9 months',
      expectedPcriGain: [15, 25],
      description: 'Full transformation with AI cost governance and workflow optimization'
    },
    J4: {
      name: 'J4 Enterprise',
      pcriRange: [75, 100],
      archetype: 'Transformer',
      icon: '🚀',
      color: '#10b981',
      services: { min: 300000, max: 500000, typical: 375000 },
      platform: { min: 300000, max: 400000, typical: 340000 },
      timeline: 'Ongoing partnership',
      expectedPcriGain: [0, 10], // Sustain 80+
      description: 'Enterprise-scale AI governance across multiple products and teams'
    }
  };

  // ==========================================================================
  // PRICING MODIFIERS
  // ==========================================================================
  const MODIFIERS = {
    developerScale: {
      '<100': { multiplier: 1.0, label: 'Small (<100 devs)', devEstimate: 50 },
      '100-500': { multiplier: 1.25, label: 'Mid-size (100-500 devs)', devEstimate: 200 },
      '500-1000': { multiplier: 1.5, label: 'Large (500-1000 devs)', devEstimate: 700 },
      '1000+': { multiplier: 1.75, label: 'Enterprise (1000+ devs)', devEstimate: 1500 }
    },
    
    deployment: {
      'saas-multi': { multiplier: 1.0, label: 'SaaS Multi-tenant', premium: '0%' },
      'saas-single': { multiplier: 1.15, label: 'SaaS Single-tenant', premium: '+15%' },
      'private-cloud': { multiplier: 1.25, label: 'Private Cloud (VPC)', premium: '+25%' },
      'on-prem': { multiplier: 1.50, label: 'On-premise / Hybrid', premium: '+50%' }
    },
    
    regulatory: {
      'standard': { multiplier: 1.0, label: 'Standard', premium: '0%' },
      'regulated': { multiplier: 1.15, label: 'Regulated (FinServ, Healthcare)', premium: '+15%' },
      'highly-regulated': { multiplier: 1.30, label: 'Highly Regulated (Fed, Defense)', premium: '+30%' }
    },
    
    commitment: {
      '1-year': { multiplier: 1.0, label: '1 Year', discount: '0%' },
      '2-year': { multiplier: 0.90, label: '2 Years (Prepaid)', discount: '-10%' },
      '3-year': { multiplier: 0.85, label: '3 Years (Prepaid)', discount: '-15%' }
    }
  };

  // ==========================================================================
  // INDUSTRY MAPPINGS
  // ==========================================================================
  const INDUSTRY_TO_REGULATORY = {
    'Financial Services': 'regulated',
    'Healthcare / Life Sciences': 'regulated',
    'Government': 'highly-regulated',
    'Defense': 'highly-regulated',
    'Enterprise Software': 'standard',
    'Retail / E-commerce': 'standard',
    'Media & Entertainment': 'standard',
    'Technology & Media': 'standard',
    'Other': 'standard'
  };

  const INDUSTRY_TO_DEPLOYMENT = {
    'Financial Services': 'saas-single',
    'Healthcare / Life Sciences': 'private-cloud',
    'Government': 'on-prem',
    'Defense': 'on-prem',
    'Enterprise Software': 'saas-multi',
    'Retail / E-commerce': 'saas-multi',
    'Media & Entertainment': 'saas-multi',
    'Technology & Media': 'saas-multi',
    'Other': 'saas-multi'
  };

  // ==========================================================================
  // COMPETITIVE BENCHMARKS
  // ==========================================================================
  const COMPETITIVE_BENCHMARKS = {
    internalBuild: {
      name: 'Internal Build',
      yearOneCost: function(numDevs) {
        // 2-3 senior engineers + 0.5 designer for 12-18 months
        const seniorEngCost = 200000;
        const designerCost = 150000;
        return (seniorEngCost * 2.5) + (designerCost * 0.5);
      },
      ongoingCost: function(numDevs) {
        return 350000; // 1.5-2 FTEs ongoing
      },
      timeline: '18-24 months',
      risk: 'High',
      riskFactors: ['Key person dependency', 'Technical debt', 'Expertise gap', 'Opportunity cost']
    },
    
    pointSolutions: {
      name: 'Point Solutions Stack',
      annualCost: function(numDevs, currentToolSpend) {
        // Supernova/Zeroheight + AI tools + integration overhead
        const dsToolCost = Math.max(currentToolSpend, 50000);
        const aiToolCost = numDevs * 200 * 12; // ~$200/dev/month for AI tools
        const integrationCost = numDevs * 50 * 12; // Integration maintenance
        return dsToolCost + aiToolCost + integrationCost;
      },
      timeline: 'Ongoing fragmentation',
      risk: 'Medium',
      riskFactors: ['No unified governance', 'Integration debt', 'AI waste continues', 'Tool sprawl']
    },
    
    consultingOnly: {
      name: 'Consulting Engagement',
      cost: function(weeks) {
        // ~$15K/week blended rate
        return weeks * 15000;
      },
      timeline: 'Variable',
      risk: 'Medium-High',
      riskFactors: ['No platform leverage', 'Knowledge walks out', 'Repeat engagement needed']
    },
    
    designSystemPlatforms: {
      supernova: { name: 'Supernova', perEditor: { team: 35, company: 80 }, enterprise: 'Custom' },
      zeroheight: { name: 'Zeroheight', annual: { min: 10000, max: 50000 } },
      storybook: { name: 'Storybook Cloud', annual: { min: 0, max: 15000 } }
    },
    
    aiGovernance: {
      arpia: { name: 'ARPIA', monthly: { min: 5000, max: 50000 } },
      watsonx: { name: 'IBM watsonx.governance', annual: { min: 100000, max: 300000 } },
      validmind: { name: 'ValidMind', annual: { min: 150000, max: 500000 } }
    }
  };

  // ==========================================================================
  // SUCCESS-BASED PRICING
  // ==========================================================================
  const SUCCESS_PRICING = {
    baseFeePercent: 0.80, // 80% guaranteed
    successFeePercent: 0.20, // 20% at risk
    
    metrics: {
      pcriImprovement: {
        name: 'PCRI Score Improvement',
        targetRange: [15, 30],
        measurementPeriod: '6 months',
        feePercent: 0.10 // 10% of value created
      },
      productivityGain: {
        name: 'Developer Productivity Gain',
        targetRange: [20, 40],
        measurementPeriod: '6 months',
        feePercent: 0.05
      },
      aiTokenReduction: {
        name: 'AI Token Waste Reduction',
        targetRange: [40, 60],
        measurementPeriod: '3 months',
        feePercent: 0.20 // 20% of documented savings
      }
    }
  };

  // ==========================================================================
  // CORE CALCULATION FUNCTIONS
  // ==========================================================================

  /**
   * Determine investment path based on PCRI score
   */
  function getInvestmentPath(pcriScore) {
    if (pcriScore >= 75) return 'J4';
    if (pcriScore >= 55) return 'J3';
    if (pcriScore >= 45) return 'J2';
    return 'J1';
  }

  /**
   * Get path details by path code
   */
  function getPathDetails(pathCode) {
    return BASE_PRICING[pathCode] || BASE_PRICING.J3;
  }

  /**
   * Calculate full pricing with all modifiers
   */
  function calculatePricing(options) {
    const {
      pcriScore = 55,
      developerScale = '<100',
      deployment = 'saas-multi',
      regulatory = 'standard',
      commitment = '1-year',
      useTypical = true
    } = options;

    const pathCode = getInvestmentPath(pcriScore);
    const path = BASE_PRICING[pathCode];
    
    // Get base prices
    const baseServices = useTypical ? path.services.typical : path.services.min;
    const basePlatform = useTypical ? path.platform.typical : path.platform.min;
    
    // Get modifiers
    const scaleMod = MODIFIERS.developerScale[developerScale]?.multiplier || 1.0;
    const deployMod = MODIFIERS.deployment[deployment]?.multiplier || 1.0;
    const regMod = MODIFIERS.regulatory[regulatory]?.multiplier || 1.0;
    const commitMod = MODIFIERS.commitment[commitment]?.multiplier || 1.0;
    
    // Apply modifiers (platform scales with all, services scales with deployment + regulatory)
    const adjustedPlatform = Math.round(basePlatform * scaleMod * deployMod * regMod * commitMod);
    const adjustedServices = Math.round(baseServices * deployMod * regMod);
    
    // Calculate ranges
    const platformMin = Math.round(path.platform.min * scaleMod * deployMod * regMod * commitMod);
    const platformMax = Math.round(path.platform.max * scaleMod * deployMod * regMod * commitMod);
    const servicesMin = Math.round(path.services.min * deployMod * regMod);
    const servicesMax = Math.round(path.services.max * deployMod * regMod);
    
    // Calculate totals
    const year1Total = adjustedServices + adjustedPlatform;
    const year1Min = servicesMin + platformMin;
    const year1Max = servicesMax + platformMax;
    
    // Multi-year projections
    const year2Platform = adjustedPlatform;
    const year3Platform = adjustedPlatform;
    const threeYearTotal = year1Total + year2Platform + year3Platform;
    
    return {
      pathCode,
      pathName: path.name,
      archetype: path.archetype,
      icon: path.icon,
      color: path.color,
      timeline: path.timeline,
      expectedPcriGain: path.expectedPcriGain,
      description: path.description,
      
      services: {
        amount: adjustedServices,
        min: servicesMin,
        max: servicesMax
      },
      
      platform: {
        annual: adjustedPlatform,
        min: platformMin,
        max: platformMax,
        monthly: Math.round(adjustedPlatform / 12)
      },
      
      year1: {
        total: year1Total,
        min: year1Min,
        max: year1Max
      },
      
      threeYear: {
        total: threeYearTotal,
        services: adjustedServices,
        platform: adjustedPlatform * 3
      },
      
      modifiers: {
        developerScale: { key: developerScale, ...MODIFIERS.developerScale[developerScale] },
        deployment: { key: deployment, ...MODIFIERS.deployment[deployment] },
        regulatory: { key: regulatory, ...MODIFIERS.regulatory[regulatory] },
        commitment: { key: commitment, ...MODIFIERS.commitment[commitment] }
      },
      
      effectiveMultiplier: scaleMod * deployMod * regMod * commitMod
    };
  }

  /**
   * Calculate pricing from account data
   */
  function calculateFromAccount(account) {
    // Map account fields to pricing inputs
    const developerScale = mapDeveloperScale(account.developerScale);
    const deployment = mapDeployment(account.deploymentModel);
    const regulatory = INDUSTRY_TO_REGULATORY[account.industryGroup] || 'standard';
    const pcriScore = account.readinessScore || estimatePcriFromAccount(account);
    
    return calculatePricing({
      pcriScore,
      developerScale,
      deployment,
      regulatory,
      commitment: '1-year',
      useTypical: true
    });
  }

  /**
   * Map developer scale string to pricing key
   */
  function mapDeveloperScale(scale) {
    if (!scale) return '<100';
    if (scale.includes('1000')) return '1000+';
    if (scale.includes('500')) return '500-1000';
    if (scale.includes('100')) return '100-500';
    return '<100';
  }

  /**
   * Map deployment model string to pricing key
   */
  function mapDeployment(model) {
    if (!model) return 'saas-multi';
    const lower = model.toLowerCase();
    if (lower.includes('on-prem') || lower.includes('hybrid')) return 'on-prem';
    if (lower.includes('private') || lower.includes('vpc')) return 'private-cloud';
    if (lower.includes('single')) return 'saas-single';
    return 'saas-multi';
  }

  /**
   * Estimate PCRI from account signals when no assessment exists
   */
  function estimatePcriFromAccount(account) {
    let score = 50; // Base assumption
    
    // Design maturity boosts foundation
    if (account.designMaturity >= 4) score += 15;
    else if (account.designMaturity >= 3) score += 8;
    
    // Public DS indicates maturity
    if (account.publicDS === 'Yes') score += 10;
    
    // AI signal indicates readiness
    if (account.aiSignal && account.aiSignal.toLowerCase().includes('ai')) score += 8;
    
    // Regulated industries often have better governance
    if (['Financial Services', 'Healthcare / Life Sciences'].includes(account.industryGroup)) {
      score += 5;
    }
    
    return Math.min(100, score);
  }

  // ==========================================================================
  // COMPETITIVE COMPARISON FUNCTIONS
  // ==========================================================================

  /**
   * Calculate competitive comparison
   */
  function calculateCompetitiveComparison(options) {
    const {
      numDevs = 100,
      numDesigners = 25,
      currentToolSpend = 50000,
      ipePricing = null
    } = options;

    const ipe = ipePricing || calculatePricing({ pcriScore: 55, developerScale: '100-500' });
    
    // Internal build costs
    const internalBuild = {
      name: 'Internal Build',
      year1: COMPETITIVE_BENCHMARKS.internalBuild.yearOneCost(numDevs),
      ongoing: COMPETITIVE_BENCHMARKS.internalBuild.ongoingCost(numDevs),
      threeYear: COMPETITIVE_BENCHMARKS.internalBuild.yearOneCost(numDevs) + 
                 (COMPETITIVE_BENCHMARKS.internalBuild.ongoingCost(numDevs) * 2),
      timeline: COMPETITIVE_BENCHMARKS.internalBuild.timeline,
      risk: COMPETITIVE_BENCHMARKS.internalBuild.risk,
      riskFactors: COMPETITIVE_BENCHMARKS.internalBuild.riskFactors
    };
    
    // Point solutions costs
    const pointSolutionsAnnual = COMPETITIVE_BENCHMARKS.pointSolutions.annualCost(numDevs, currentToolSpend);
    const pointSolutions = {
      name: 'Point Solutions Stack',
      annual: pointSolutionsAnnual,
      threeYear: pointSolutionsAnnual * 3,
      timeline: COMPETITIVE_BENCHMARKS.pointSolutions.timeline,
      risk: COMPETITIVE_BENCHMARKS.pointSolutions.risk,
      riskFactors: COMPETITIVE_BENCHMARKS.pointSolutions.riskFactors
    };
    
    // Consulting only costs (12-week engagement)
    const consultingOnly = {
      name: 'Consulting Only',
      engagement: COMPETITIVE_BENCHMARKS.consultingOnly.cost(12),
      repeat: COMPETITIVE_BENCHMARKS.consultingOnly.cost(6), // Assume repeat every 18 months
      threeYear: COMPETITIVE_BENCHMARKS.consultingOnly.cost(12) + 
                 (COMPETITIVE_BENCHMARKS.consultingOnly.cost(6) * 2),
      timeline: COMPETITIVE_BENCHMARKS.consultingOnly.timeline,
      risk: COMPETITIVE_BENCHMARKS.consultingOnly.risk,
      riskFactors: COMPETITIVE_BENCHMARKS.consultingOnly.riskFactors
    };
    
    // IPE costs
    const ipeOption = {
      name: 'IPE Platform + Services',
      year1: ipe.year1.total,
      threeYear: ipe.threeYear.total,
      timeline: ipe.timeline,
      risk: 'Low',
      riskFactors: ['Proven methodology', 'Platform-enabled delivery', 'Ongoing support']
    };
    
    // Calculate savings
    const savingsVsInternal = internalBuild.threeYear - ipeOption.threeYear;
    const savingsVsPointSolutions = pointSolutions.threeYear - ipeOption.threeYear;
    const savingsVsConsulting = consultingOnly.threeYear - ipeOption.threeYear;
    
    return {
      options: {
        internalBuild,
        pointSolutions,
        consultingOnly,
        ipe: ipeOption
      },
      savings: {
        vsInternal: { amount: savingsVsInternal, percent: Math.round((savingsVsInternal / internalBuild.threeYear) * 100) },
        vsPointSolutions: { amount: savingsVsPointSolutions, percent: Math.round((savingsVsPointSolutions / pointSolutions.threeYear) * 100) },
        vsConsulting: { amount: savingsVsConsulting, percent: Math.round((savingsVsConsulting / consultingOnly.threeYear) * 100) }
      },
      recommendation: 'ipe',
      inputs: { numDevs, numDesigners, currentToolSpend }
    };
  }

  // ==========================================================================
  // SUCCESS-BASED PRICING FUNCTIONS
  // ==========================================================================

  /**
   * Calculate success-based pricing split
   */
  function calculateSuccessPricing(totalPrice, options = {}) {
    const {
      baseFeePercent = SUCCESS_PRICING.baseFeePercent,
      successFeePercent = SUCCESS_PRICING.successFeePercent
    } = options;

    const baseFee = Math.round(totalPrice * baseFeePercent);
    const successFee = Math.round(totalPrice * successFeePercent);
    
    return {
      totalPrice,
      baseFee,
      successFee,
      baseFeePercent: Math.round(baseFeePercent * 100),
      successFeePercent: Math.round(successFeePercent * 100),
      metrics: SUCCESS_PRICING.metrics
    };
  }

  // ==========================================================================
  // VALUE CALCULATION FUNCTIONS
  // ==========================================================================

  /**
   * Calculate annual value created by IPE
   */
  function calculateAnnualValue(options) {
    const {
      numDevs = 100,
      numDesigners = 25,
      avgDevCost = 180000,
      avgDesignerCost = 150000,
      productivityGain = 0.25, // 25% productivity improvement
      aiMonthlySpend = 5000,
      tokenWasteReduction = 0.25,
      currentToolSpend = 50000,
      toolConsolidation = 0.70
    } = options;

    // Developer productivity value
    const devProductivityValue = Math.round(numDevs * avgDevCost * productivityGain * 0.5);
    
    // Designer efficiency value
    const designerEfficiencyValue = Math.round(numDesigners * avgDesignerCost * 0.15);
    
    // AI token optimization savings
    const aiTokenSavings = Math.round(aiMonthlySpend * 12 * tokenWasteReduction);
    
    // Tool consolidation savings
    const toolSavings = Math.round(currentToolSpend * toolConsolidation);
    
    const totalAnnualValue = devProductivityValue + designerEfficiencyValue + aiTokenSavings + toolSavings;
    
    return {
      devProductivity: devProductivityValue,
      designerEfficiency: designerEfficiencyValue,
      aiTokenSavings,
      toolConsolidation: toolSavings,
      total: totalAnnualValue,
      breakdown: {
        productivity: devProductivityValue + designerEfficiencyValue,
        costGovernance: aiTokenSavings + toolSavings
      }
    };
  }

  /**
   * Calculate ROI metrics
   */
  function calculateROI(pricing, annualValue, years = 3) {
    const totalInvestment = pricing.year1.total + (pricing.platform.annual * (years - 1));
    const totalValue = annualValue.total * years;
    const netValue = totalValue - totalInvestment;
    const roi = Math.round((netValue / totalInvestment) * 100);
    const paybackMonths = Math.ceil(pricing.year1.total / (annualValue.total / 12));
    
    return {
      totalInvestment,
      totalValue,
      netValue,
      roi,
      paybackMonths,
      years
    };
  }

  // ==========================================================================
  // FORMATTING UTILITIES
  // ==========================================================================

  /**
   * Format currency for display
   */
  function formatCurrency(value, options = {}) {
    const { compact = false, decimals = 0 } = options;
    
    if (value === null || value === undefined) return '$0';
    
    if (compact) {
      if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(decimals || 1) + 'M';
      } else if (value >= 1000) {
        return '$' + Math.round(value / 1000) + 'K';
      }
    }
    
    return '$' + Math.round(value).toLocaleString();
  }

  /**
   * Format percentage for display
   */
  function formatPercent(value, options = {}) {
    const { showSign = false } = options;
    const sign = showSign && value > 0 ? '+' : '';
    return sign + Math.round(value) + '%';
  }

  // ==========================================================================
  // PUBLIC API
  // ==========================================================================
  return {
    // Constants
    BASE_PRICING,
    MODIFIERS,
    COMPETITIVE_BENCHMARKS,
    SUCCESS_PRICING,
    INDUSTRY_TO_REGULATORY,
    INDUSTRY_TO_DEPLOYMENT,
    
    // Core functions
    getInvestmentPath,
    getPathDetails,
    calculatePricing,
    calculateFromAccount,
    
    // Competitive analysis
    calculateCompetitiveComparison,
    
    // Success-based pricing
    calculateSuccessPricing,
    
    // Value calculations
    calculateAnnualValue,
    calculateROI,
    
    // Utilities
    formatCurrency,
    formatPercent,
    mapDeveloperScale,
    mapDeployment,
    estimatePcriFromAccount
  };
})();

// Export for Node.js environments (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IPEPricingEngine;
}
