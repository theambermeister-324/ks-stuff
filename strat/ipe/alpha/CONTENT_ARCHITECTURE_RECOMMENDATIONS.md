# Content Architecture Recommendations - Partner Onboarding Guide

## Current Redundancies Identified

### 1. **Duplicate Partner Types Tab**
- **Issue**: Two complete "Partner Types" sections exist (lines 528 and 808)
- **Impact**: Confusing, wastes space, maintenance burden
- **Solution**: Remove duplicate, keep one comprehensive version

### 2. **Assessment Explanation Repeated**
- **Overview Tab**: Full explanation of Assessment-Driven Approach (lines 254-321)
- **Delivery Tab**: References assessment again (line 1233)
- **Impact**: Same concept explained twice
- **Solution**: Explain once in Overview, reference briefly in Delivery with link back

### 3. **Role Information Duplicated**
- **Partner Types Tab**: Lists roles (FDE, CX Partner, Deployment Specialist) with brief descriptions
- **Role Profiles Tab**: Full detailed descriptions of same roles
- **Impact**: Redundant information, users read same content twice
- **Solution**: Partner Types shows role names only, Role Profiles has full details

### 4. **Phase Information Overlapped**
- **Overview Tab**: Investment paths mention phases (lines 451-498)
- **Delivery Tab**: Detailed phase descriptions (lines 1241-1288)
- **Impact**: Phase concepts explained twice
- **Solution**: Overview introduces concept, Delivery provides details

### 5. **Intelligent Product Engine Explained Multiple Times**
- **Header**: Brief explanation
- **Overview Tab**: Detailed explanation
- **Impact**: Same concept repeated
- **Solution**: Header stays brief, Overview has full explanation

## Recommended Progressive Disclosure Strategy

### **Information Hierarchy**

```
Level 1: Foundation (Always Visible)
├── Header: Value proposition & vision (brief)
└── Overview Tab: Core concepts explained once
    ├── What Intelligent Product Engine is
    ├── How it works
    ├── Assessment-driven approach
    └── Investment paths overview

Level 2: Application (Tab-Specific)
├── Partner Types: Which partner are you? (references roles, links to Role Profiles)
├── Role Profiles: Detailed role requirements (assumes Overview context)
├── Delivery Model: Phase details (assumes Overview context, references roles)
├── Commercial Terms: Compensation (assumes role knowledge)
└── Onboarding: Process steps (assumes all previous context)
```

### **Progressive Disclosure Principles**

1. **Explain Once, Reference Many**
   - Core concepts explained fully in Overview
   - Other tabs reference concepts with brief context refreshers
   - Use "As mentioned in Overview..." or "Building on the assessment approach..."

2. **Contextual Breadcrumbs**
   - Add small context indicators: "Prerequisites: Read Overview first"
   - Show "You've learned: ✓ Assessment approach ✓ Investment paths" progress
   - Link back to foundational concepts when referenced

3. **Tab-Specific Focus**
   - Each tab answers ONE question:
     - Overview: "What is this?"
     - Partner Types: "Which type am I?"
     - Role Profiles: "What skills do I need?"
     - Delivery: "How do engagements work?"
     - Commercial: "What do I get paid?"
     - Onboarding: "How do I get started?"

4. **Smart Cross-References**
   - Instead of repeating content, use contextual links:
     - "See Role Profiles tab for FDE requirements"
     - "As covered in Overview, assessments determine..."
     - "Phase details → See Delivery Model tab"

## Specific Recommendations

### **Overview Tab** (Foundation)
**Keep:**
- Intelligent Product Engine explanation
- How it works (4 steps)
- Assessment-driven approach (full explanation)
- Investment paths overview (high-level)

**Remove:**
- Detailed phase descriptions (move to Delivery)
- Detailed role descriptions (move to Role Profiles)

**Add:**
- "Next: Choose your partner type →" callout
- Quick reference: "Key concepts you'll need: Assessment, Phases, Roles"

### **Partner Types Tab**
**Keep:**
- Partner type selection (Independent Contractor, Agency, Deployment Specialist)
- Value propositions
- Compensation overview

**Remove:**
- Detailed role descriptions (just mention role names)
- Full role requirements

**Add:**
- "For detailed role requirements, see Role Profiles tab"
- Brief role mentions: "Supports roles like FDE, CX Partner (see Role Profiles for details)"

### **Role Profiles Tab**
**Keep:**
- Full role descriptions
- Requirements and qualifications
- Success metrics

**Add:**
- "Prerequisites: Read Overview to understand assessment-driven matching"
- "These roles support the phases described in Delivery Model tab"

### **Delivery Model Tab**
**Keep:**
- Phase details (0-3)
- Exit criteria
- Critical delivery principles

**Remove:**
- Assessment explanation (just reference it)

**Add:**
- "Building on the assessment approach from Overview..."
- "Roles needed for each phase → See Role Profiles tab"

### **Commercial Terms Tab**
**Keep:**
- Compensation tiers
- Qualification requirements

**Add:**
- "Based on roles defined in Role Profiles tab"
- "Compensation reflects engagement types from Delivery Model"

### **Onboarding Tab**
**Keep:**
- Checklist
- Success metrics
- Resources

**Add:**
- "Now that you understand the model, here's how to get started"
- References to all previous tabs as prerequisites

## Implementation Approach

### **Phase 1: Remove Duplicates**
1. Delete duplicate Partner Types section (lines 808-975)
2. Remove redundant assessment explanations
3. Remove role details from Partner Types tab

### **Phase 2: Add Context Builders**
1. Add "Prerequisites" callouts to each tab
2. Add "Related Information" links between tabs
3. Add progress indicator showing which concepts they've learned

### **Phase 3: Refine Cross-References**
1. Replace repeated explanations with contextual references
2. Add "Learn more →" links to related tabs
3. Use progressive language: "As you learned in Overview..."

## Example: Before vs After

### **Before (Redundant)**
```
Partner Types Tab:
- Lists FDE role with description: "7+ years full-stack development..."

Role Profiles Tab:
- Lists FDE role with description: "7+ years full-stack development..."
```

### **After (Progressive)**
```
Partner Types Tab:
- "Independent Contractors can support roles like FDE, CX Partner, or Deployment Specialist"
- Link: "See Role Profiles tab for detailed requirements →"

Role Profiles Tab:
- Full FDE description (only place it exists)
- "These roles support the phases described in Delivery Model tab"
```

## Benefits

1. **Reduced Cognitive Load**: Users learn concepts once, apply them many times
2. **Faster Navigation**: Less scrolling, more focused content per tab
3. **Better Context Building**: Each tab builds on previous knowledge
4. **Easier Maintenance**: Update concepts in one place
5. **Improved UX**: Clear learning path, no redundant reading


