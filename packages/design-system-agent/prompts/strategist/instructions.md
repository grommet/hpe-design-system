# Strategist Instructions

## Objective
Given an Auditor scorecard, classify findings and rank the top 3 Consumer Implementation recommendations by impact/effort ratio. Provide clear reasoning for each recommendation to help teams understand what to prioritize and why.

## Input processing

```
def process_scorecard(scorecard, team_segment):
  // 1. Validate scorecard structure
  if not scorecard.has_key(metrics):
    return {status: "error", error: "Missing metrics in scorecard"}
  
  // 2. Extract Consumer Implementation metrics
  consumer_metrics = scorecard.metrics.Consumer_Implementation
  
  // 3. For each metric, calculate improvement potential
  metric_impacts = {}
  for metric in consumer_metrics:
    current_score = metric.score
    max_score = metric.max
    weight = metric.weight
    
    // Impact potential: how much score can improve (bounded by max)
    improvement_range = max_score - current_score
    
    // Weighted impact: multiply by metric importance
    weighted_impact = improvement_range * weight / max_score  // 0-10 scale
    
    metric_impacts[metric.name] = {
      current: current_score,
      max: max_score,
      improvement_range: improvement_range,
      weight: weight,
      weighted_potential: weighted_impact
    }
  
  return {status: "success", metric_impacts}
```

## Finding classification

```
def classify_finding(finding, team_segment):
  // Determine if finding is Consumer Implementation or System Enablement
  
  consumer_metrics = [
    "Component Coverage",
    "Component Usage",
    "App Structure",
    "Token Compliance",
    "Responsive Layouts",
    "Accessibility",
    "Type Safety & Interfaces",
    "Dev Confidence",
    "System Discoverability",
    "DX"
  ]
  
  system_metrics = [
    "HPEDS Adoption",
    "Framework Support Readiness"
  ]
  
  if finding.metric in consumer_metrics:
    return "Consumer Implementation"
  elif finding.metric in system_metrics:
    return "System Enablement"
  else:
    return "Unknown"
```

## Impact calculation

```
def calculate_impact(metric_name, metric_data):
  // Calculate impact score (0-10) for a metric
  
  current = metric_data.score
  max = metric_data.max
  weight = metric_data.weight
  
  // Potential improvement (max points this metric can gain)
  potential_gain = (max - current) * weight  // e.g., (10-3)*2 = 14 pts
  
  // Normalized to 0-10 scale
  normalized_impact = potential_gain / max  // e.g., 14/10 = 1.4
  
  // Cap at 10 (shouldn't happen but be safe)
  final_impact = min(normalized_impact, 10)
  
  return final_impact
```

## Effort lookup table

```
def lookup_effort(finding_type):
  // Return person-hours estimate per finding type
  
  effort_map = {
    // Token Compliance fixes
    "hardcoded_color": 0.125,         // ~7.5 min per instance
    "hardcoded_size": 0.125,          // ~7.5 min per instance
    "hardcoded_spacing": 0.125,       // ~7.5 min per instance
    
    // Component Usage fixes
    "invalid_prop": 0.25,              // ~15 min per instance
    "deprecated_prop": 0.25,           // ~15 min per instance
    "missing_required_prop": 0.25,     // ~15 min per instance
    
    // Component Upgrade
    "deprecated_component": 0.5,       // ~30 min per instance (more risky)
    
    // Accessibility fixes
    "missing_aria_label": 0.25,        // ~15 min per instance
    "missing_alt_text": 0.125,         // ~7.5 min per instance (simple)
    "low_contrast": 0.5,               // ~30 min per instance (design review)
    
    // Type Safety fixes
    "missing_type_annotation": 0.1,    // ~6 min per instance
    "any_type_usage": 0.1,             // ~6 min per instance
    
    // Layout fixes
    "missing_responsive_breakpoint": 0.25,  // ~15 min per instance
    
    // App Structure refactors
    "flat_directory_structure": 3.0,   // ~3 hours (full restructure)
    "missing_index_file": 0.1,         // ~6 min per missing index
    
    // Fallback for unknowns
    "_default": 1.0                    // 1 hour (conservative estimate)
  }
  
  finding_type_key = finding_type.lower()
  
  return effort_map.get(finding_type_key, effort_map["_default"])
```

## Recommendation ranking

```
def rank_recommendations(scorecard, team_segment):
  // Main algorithm: rank Consumer Implementation findings by impact/effort
  
  // Step 1: Classify and group findings
  consumer_findings = []
  system_findings = []
  
  for finding in scorecard.findings:
    classification = classify_finding(finding, team_segment)
    
    if classification == "Consumer Implementation":
      consumer_findings.append(finding)
    elif classification == "System Enablement":
      system_findings.append(finding)
  
  // Step 2: Calculate impact/effort for each Consumer finding
  recommendations = []
  
  for finding in consumer_findings:
    // Check if actionable
    if not is_actionable(finding, team_segment):
      // Skip non-actionable (no Engineer skill, requires custom, etc.)
      continue
    
    // Find metric for this finding
    metric_data = scorecard.metrics[finding.metric]
    
    // Calculate impact (0-10)
    impact = calculate_impact(finding.metric, metric_data)
    
    // Calculate effort (person-hours)
    effort_per_instance = lookup_effort(finding.type)
    
    // Count how many instances of this type
    instance_count = count_finding_instances(finding.metric, finding.type, scorecard)
    
    total_effort_hours = effort_per_instance * instance_count
    
    // Normalize effort to 1-5 scale (where 1 = trivial, 5 = major)
    normalized_effort = min(max(1, total_effort_hours / 2), 5)  // 1 hour → effort=0.5, cap at 5
    
    // Calculate ratio
    ratio = impact / normalized_effort  // higher is better
    
    recommendations.append({
      metric: finding.metric,
      finding_type: finding.type,
      impact_score: impact,
      effort_score: normalized_effort,
      ratio: ratio,
      affected_count: instance_count,
      affected_files: extract_affected_files(finding),
      confidence: 0.9  // baseline confidence; lowered if fuzzy matching, etc.
    })
  
  // Step 3: Sort by ratio (descending)
  sorted_recs = sort(recommendations, key=ratio, descending=true)
  
  // Step 4: Select top 3
  top_3 = sorted_recs[0:3]
  
  // Step 5: Build recommendation objects with description + reasoning
  final_recommendations = []
  for (rank, rec) in enumerate(top_3, start=1):
    final_recommendations.append({
      rank: rank,
      metric: rec.metric,
      impact_score: rec.impact_score,
      effort_score: rec.effort_score,
      impact_effort_ratio: rec.ratio,
      description: build_description(rec),
      affected_files: rec.affected_files,
      affected_findings_count: rec.affected_count,
      category: "Consumer Implementation",
      reasoning: build_reasoning(rec, metric_data),
      acceptance_criteria: build_acceptance_criteria(rec)
    })
  
  return {
    status: "success",
    recommendations: final_recommendations,
    system_findings_count: len(system_findings),
    system_findings: system_findings,  // for separate handling
    notes: "System Enablement findings listed separately; escalate to HPEDS team"
  }
```

## Actionability check

```
def is_actionable(finding, team_segment):
  // Return true if Engineer can remediate this finding
  
  // Check 1: Does Engineer have a skill for this finding type?
  engineer_skills_poc = [
    "hardcoded_color",
    "hardcoded_size",
    "hardcoded_spacing",
    "invalid_prop",
    "deprecated_prop",
    "deprecated_component"
  ]
  
  if finding.type not in engineer_skills_poc:
    return false  // Engineer doesn't have skill in PoC
  
  // Check 2: Is the finding marked as actionable?
  if finding.has_key("actionable"):
    return finding.actionable
  
  // Check 3: Does it require a custom token (System gap)?
  if finding.description.contains("requires custom token"):
    return false
  
  // Check 4: Is it blocked by framework/segment mismatch?
  if team_segment != "A":
    return false  // PoC only handles Segment A
  
  // Default: actionable
  return true
```

## Description & reasoning builder

```
def build_description(recommendation):
  // Generate human-readable description
  
  metric = recommendation.metric
  count = recommendation.affected_count
  
  descriptions = {
    "Token Compliance": f"Replace {count} hardcoded colors/sizes with hpe-design-tokens semantic values",
    "Component Usage": f"Fix {count} invalid props or deprecated components to current Grommet API",
    "App Structure": f"Reorganize component directory from flat to hierarchical structure",
    "Type Safety & Interfaces": f"Add type annotations to {count} untyped variables/functions",
    ...
  }
  
  return descriptions.get(metric, f"Fix {count} instances of {metric} violations")

def build_reasoning(recommendation, metric_context):
  // Generate explanation of why this matters
  
  reasoning = f"{recommendation.metric} is weighted {metric_context.weight}x in scoring. "
  reasoning += f"Fixing these {recommendation.affected_count} instances yields ~{recommendation.impact_score}pt "
  reasoning += f"improvement with ~{recommendation.effort_score}hr effort. "
  reasoning += "This metric directly impacts team development speed and code maintainability."
  
  return reasoning

def build_acceptance_criteria(recommendation):
  // Generate acceptance criteria for Engineer/team to verify
  
  metric = recommendation.metric
  
  criteria_map = {
    "Token Compliance": [
      "All hardcoded #RRGGBB values replaced with token() calls",
      "No new warnings from hpe-design-tokens linter",
      "Storybook snapshots pass visual regression tests"
    ],
    "Component Usage": [
      "All deprecated props replaced with modern equivalents",
      "Component API version matches current Grommet",
      "No TypeScript type errors"
    ],
    ...
  }
  
  return criteria_map.get(metric, ["All findings of this type remediated"])
```

## Fallback: dumb sort

```
def dumb_sort_fallback(scorecard):
  // If Strategist fails, fall back to simple metric score gap sort
  
  // Sort metrics by (max - current) descending
  sorted_metrics = sort(scorecard.metrics.Consumer_Implementation, 
                        key=lambda m: m.max - m.score,
                        descending=true)
  
  recommendations = []
  for (rank, metric) in enumerate(sorted_metrics[0:3], start=1):
    recommendations.append({
      rank: rank,
      metric: metric.name,
      description: f"Improve {metric.name} (currently {metric.score}/{metric.max})",
      reasoning: "Using fallback sort: lowest current score = highest improvement potential",
      note: "Strategist failed; this is a conservative ranking"
    })
  
  return {
    status: "degraded",
    recommendations: recommendations,
    fallback_mode: true
  }
```

## Error handling

- **Missing scorecard:** Return error; ask Orchestrator to re-run Auditor
- **No Consumer findings:** Return empty recommendations; note System-only gaps
- **All findings non-actionable:** Return note; escalate to HPEDS team
- **Invalid team_segment:** Return error; validate config
- **Compute failure (division by zero, etc.):** Catch and log; return fallback sort

## Context management
- Input (scorecard): ~1KB
- Per-recommendation output: ~500B
- Total output: <3KB
- No caching (PoC)
