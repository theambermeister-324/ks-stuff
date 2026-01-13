# Layout & Padding Analysis - Partner Onboarding Guide

## Summary of Issues

### 1. **Padding Inconsistencies**
- **Main containers**: Mix of `p-4`, `p-5`, `p-6` without clear hierarchy
- **Cards/sections**: Inconsistent padding (`p-3`, `p-4`, `p-5`, `p-6`)
- **Inner content**: Varies from `p-2` to `p-4` without pattern

### 2. **Margin Inconsistencies**
- **Section spacing**: Mix of `mb-4`, `mb-6`, `mb-8`
- **Element spacing**: Inconsistent `mb-2`, `mb-3`, `mb-4` usage
- **Grid gaps**: `gap-2`, `gap-3`, `gap-4`, `gap-6` used inconsistently

### 3. **Border Inconsistencies**
- Mix of `border` (1px) and `border-2` (2px) without clear pattern
- Some sections use `border-l-3`, others `border-l-4`

### 4. **Tab-Specific Issues**

#### **Overview Tab**
- Main container: `p-6` ✓
- Info boxes: Mix of `p-4`, `p-5`, `p-6`
- Grid gaps: `gap-3`, `gap-4` inconsistent

#### **Partners Tab**
- Main cards: `p-6` ✓
- Inner sections: `p-4` ✓
- Small role cards: `p-3` (too tight)
- Grid gaps: `gap-3` (should be `gap-4`)

#### **Roles Tab**
- Role cards: `p-6` ✓
- Inner boxes: `p-4` ✓
- Border inconsistency: Some `border`, some `border-2`
- Grid gaps: `gap-4` ✓

#### **Delivery Tab**
- Main container: `p-6` ✓
- Phase boxes: `p-4` ✓
- Info box: `p-4` (should match phase boxes)
- Principles box: `p-5` (inconsistent)

#### **Commercial Tab**
- Main container: `p-6` ✓
- Info cards: `p-4` ✓
- Tier list: `p-4` ✓
- Qualification sections: `p-6` (nested, should be `p-5`)

#### **Onboarding Tab**
- Main containers: `p-6` ✓
- Checklist items: `p-4` ✓
- Success metrics: Mix of `p-4` and inconsistent borders
- Resources section: `p-6` ✓

## Recommended Standardization

### **Padding Hierarchy**
- **Main page containers**: `p-6` (24px)
- **Section containers**: `p-6` (24px)
- **Card containers**: `p-6` (24px)
- **Info boxes/highlights**: `p-5` (20px)
- **Nested content boxes**: `p-4` (16px)
- **Small cards/items**: `p-4` (16px) - increase from `p-3`
- **Tight spaces**: `p-3` (12px) - only for very compact elements

### **Margin Hierarchy**
- **Major sections**: `mb-8` (32px)
- **Card spacing**: `mb-6` (24px)
- **Element groups**: `mb-4` (16px)
- **Tight spacing**: `mb-3` (12px)
- **Minimal spacing**: `mb-2` (8px)

### **Grid Gaps**
- **Standard grids**: `gap-4` (16px)
- **Tight grids**: `gap-3` (12px) - only for compact layouts
- **Spacious grids**: `gap-6` (24px) - only for large content

### **Borders**
- **Standard borders**: `border-2` (2px) for consistency
- **Accent borders**: `border-l-4` (4px) for left borders
- **Subtle borders**: `border` (1px) only for dividers

## Implementation Priority

1. **High Priority**: Standardize padding on all main containers
2. **High Priority**: Fix inconsistent borders (`border` vs `border-2`)
3. **Medium Priority**: Standardize grid gaps
4. **Medium Priority**: Standardize margin spacing
5. **Low Priority**: Fine-tune nested padding

