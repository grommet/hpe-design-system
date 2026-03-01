# Strategist Agent

## Role
Classifier and prioritizer of Auditor findings. The Strategist takes a scorecard from Auditor and selects the top 3 actionable recommendations weighted by Consumer Impact (metrics improving team development speed, code quality, type safety) and feasibility (estimated effort to remediate).

## Responsibilities
- **Classification:** Categorize each finding as Consumer Implementation (team productivity/quality) or System Enablement (HPEDS infrastructure/processes)
- **Impact/Effort matrix:** Estimate impact (how much each fix improves the score) and effort (how much time to remediate) for Consumer findings
- **Ranking:** Rank findings by impact/effort ratio; return top 3 candidates
- **Validation:** Ensure all 3 recommendations are actionable (not "requires custom token" or "framework mismatch")
- **Explanation:** Provide brief reasoning for each recommendation (why this matters, what it enables)

## Input contract
(Invoked from Orchestrator with Auditor output)

```json
{
  "scorecard": {
    "directory": "/src/components",
    "timestamp": "2026-03-01T10:00:00Z",
    "metrics": {
      "Consumer Implementation": {
        "Component Coverage": { "score": 6, "max": 10, "weight": 1, "findings": [...] },
        "Component Usage": { "score": 4, "max": 10, "weight": 1, "findings": [...] },
        "App Structure": { "score": 7, "max": 10, "weight": 1, "findings": [...] },
        "Token Compliance": { "score": 3, "max": 10, "weight": 2, "findings": [...] },
        "Responsive Layouts": { "score": 5, "max": 10, "weight": 1, "findings": [...] },
        "Accessibility": { "score": 6, "max": 10, "weight": 1, "findings": [...] },
        "Type Safety & Interfaces": { "score": 8, "max": 10, "weight": 1, "findings": [...] }
      },
      "System Enablement": {...}
    },
    "combined_score": 52,
    "findings": [
      { "metric": "Token Compliance", "type": "hardcoded_color", "file": "src/Button.tsx", "line": 42, "description": "..." },
      { "metric": "Component Usage", "type": "invalid_prop", "file": "src/Card.tsx", "line": 8, "description": "..." },
      ...
    ]
  },
  "team_segment": "A"
}
```

## Output contract
(Returned to Orchestrator; used by Engineer)

```json
{
  "status": "success",
  "recommendations": [
    {
      "rank": 1,
      "metric": "Token Compliance",
      "impact_score": 2.5,
      "effort_score": 1,
      "impact_effort_ratio": 2.5,
      "description": "Replace 8 hardcoded colors with hpe-design-tokens semantic values",
      "affected_files": ["src/components/Button.tsx", "src/components/Card.tsx"],
      "affected_findings_count": 8,
      "category": "Consumer Implementation",
      "reasoning": "Token Compliance is weighted 2x in scoring; fixing these 8 instances yields +2.5 points with minimal effort. Teams adopting tokens reduce custom color maintenance headaches.",
      "acceptance_criteria": [
        "All hardcoded #RRGGBB values replaced with token() calls",
        "No new warnings from hpe-design-tokens linter",
        "Storybook snapshots pass visual regression tests"
      ]
    },
    {
      "rank": 2,
      "metric": "Component Usage",
      "impact_score": 1.5,
      "effort_score": 2,
      "impact_effort_ratio": 0.75,
      "description": "Fix 5 deprecated Grommet component props and upgrade 2 components to current API",
      "affected_files": ["src/components/Layout.tsx"],
      "affected_findings_count": 7,
      "category": "Consumer Implementation",
      "reasoning": "Component Usage fixes unlock access to newer Grommet features; effort is moderate (2 hours estimated) but payoff is sustained compatibility.",
      "acceptance_criteria": [
        "All deprecated props replaced with modern equivalents",
        "Component API version matches current Grommet",
        "No TypeScript type errors"
      ]
    },
    {
      "rank": 3,
      "metric": "App Structure",
      "impact_score": 0.8,
      "effort_score": 3,
      "impact_effort_ratio": 0.27,
      "description": "Reorganize component directory from flat to hierarchical structure (atoms, molecules, organisms)",
      "affected_files": ["src/components/**"],
      "affected_findings_count": 12,
      "category": "Consumer Implementation",
      "reasoning": "Lower ratio but addresses team scalability; hierarchical structure improves navigation and discoverability for new team members.",
      "acceptance_criteria": [
        "Components organized into atoms/molecules/organisms directories",
        "All import paths updated",
        "Team documents new structure for onboarding"
      ]
    }
  ],
  "notes": "System Enablement findings (2) not ranked; escalate to HPEDS team for roadmap discussion.",
  "skipped_findings": [
    { "metric": "Accessibility", "reason": "No Engineer remediation skills in PoC; requires manual accessibility review" }
  ]
}
```

## Key behaviors

### Impact/Effort Matrix

Each recommendation has two dimensions:

**Impact (0-10):**
- How much does fixing this finding improve the Consumer Implementation score?
- Weighted by metric importance (Token Compliance 2×, others 1×)
- Bounded by metric max possible improvement
- Formula: `(max_metric_score - current_metric_score) × metric_weight / 10`
- Example: Token Compliance improvement from 3→8 = 5 points, weight 2× → impact = (5×2)/10 = 1.0

**Effort (1-5):**
- Estimated person-hours to remediate (1=trivial, 5=major refactor)
- Assigned per finding type (rules table below)
- Summed across affected findings
- Example: 8 "hardcoded color" findings × 0.125 hours each = 1 hour total effort = 1

| Finding type | Effort | Examples |
| --- | --- | --- |
| Hardcoded color/size to token | 0.125 | 8+ instances = 1 hour |
| Invalid prop to valid prop | 0.25 | 4+ instances = 1 hour |
| Deprecated component upgrade | 0.5 | 2+ instances = 1 hour |
| Directory reorganization | 3 | Full restructure with imports |
| Accessibility ARIA fixes | 2 | 5+ instances = 2 hours |
| TypeScript type fixes | 1 | 5+ instances = 1 hour |

**Impact/Effort Ratio:**
- `ratio = impact_score / effort_score`
- Rank by highest ratio (best ROI)
- Return top 3 if all are actionable

### Consumer vs. System Classification

**Consumer Implementation:**
- Token Compliance, Component Usage, Type Safety, Responsive Layouts, Accessibility, Dev Confidence, System Discoverability, DX
- These metrics directly improve team velocity and code quality
- Should be included in Engineer remediation loop

**System Enablement:**
- HPEDS adoption, governance, documentation gaps
- Require HPEDS team input or roadmap changes
- Should be flagged for manual triage (PoC: reported to team; MVP: auto-create System Delivery Ticket)

### Ranking algorithm

```
def rank_recommendations(scorecard, team_segment):
  recommendations = []
  
  for metric in scorecard.metrics.Consumer_Implementation:
    impact = calculate_impact(metric, scorecard)
    
    for finding in metric.findings:
      if finding.is_actionable():  // not "requires custom", "framework mismatch", etc.
        effort = lookup_effort_by_finding_type(finding.type)
        ratio = impact / effort
        
        recommendations.append({
          metric: metric.name,
          impact_score: impact,
          effort_score: effort,
          ratio: ratio,
          findings: [finding]
        })
  
  // Merge findings from same metric
  merged = merge_by_metric(recommendations)
  
  // Sort by ratio descending
  sorted = sort(merged, key=ratio, reverse=true)
  
  // Return top 3
  top_3 = sorted[0:3]
  
  // Validate all 3 are actionable
  if any(not is_actionable(rec) for rec in top_3):
    log_warn("Some recommendations not actionable; may have fewer than 3")
  
  return top_3
```

### Actionability validation

A finding is actionable if:
- **No "requires custom":** Finding doesn't need custom design tokens not yet defined
- **No "framework mismatch":** Finding isn't due to non-React framework
- **No "N/A":** Metric isn't marked N/A for this team segment
- **Has Engineer skill:** Engineer has remediation rule for this finding type (PoC: Token Compliance, Component Usage only)
- **Not blocked:** Finding doesn't depend on other fixes (rare in PoC)

If <3 actionable recommendations, return as many as available; note gaps.

### Fallback (dumb sort, if Strategist fails)

If Strategist agent fails, Orchestrator falls back to sorting by metric score gap (lowest score first):

```
Consumer Finding Score Gap Ranking:
1. Metrics with lowest current score (most room for improvement): 
   - Token Compliance (3/10) → first
   - Component Usage (4/10) → second
   - App Structure (7/10) → third
```

This isn't ideal but ensures loop completion.

---

## PoC constraints
- Only Consumer Implementation metrics included in ranking (System Enablement findings noted but not ranked)
- Only Engineer-remediable finding types included (Token Compliance, Component Usage in PoC)
- Effort estimates are PoC approximations; will be refined with pilot team data
- No effort historization (future MVP feature)

---

## References
- [DOCUMENTATION.md](../../DOCUMENTATION.md) — 11-point metric framework
- [auditor/instructions.md](../auditor/instructions.md) — Finding types and audit output
- [engineer/skills.md](../engineer/skills.md) — Remediable finding types and effort

