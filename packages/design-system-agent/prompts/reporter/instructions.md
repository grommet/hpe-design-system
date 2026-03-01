# Reporter Instructions

## Objective
Collect phase outputs from the audit-remediate-report loop and emit privacy-compliant telemetry. Prepare summarized data for HPEDS team consumption (dashboards, trend analysis, system gap detection).

## Input contract
(Invoked from Orchestrator after loop completion)

```json
{
  "phase_outputs": {
    "audit": {
      "directory": "/src/components",
      "timestamp": "2026-03-01T10:00:00Z",
      "combined_score": 52,
      "metrics": { ... }  // full scorecard
    },
    "strategist": {
      "recommendations": [ ... ]  // top 3
    },
    "engineer": {
      "diffs": [ ... ],
      "applied_count": 3,
      "rejected_count": 1
    },
    "audit_post": { ... }  // optional post-remediation audit
  },
  "team_segment": "A",
  "timestamp": "2026-03-01T10:00:15Z",
  "opt_in": true,  // from .hpedsrc telemetry_opt_in
  "repo_path": "/path/to/repo"
}
```

## Output contract
(Emitted to telemetry system and PoC local logging)

```json
{
  "status": "success" | "error",
  "telemetry_payload": {
    "event_type": "audit_remediate_loop_complete",
    "timestamp": "2026-03-01T10:00:15Z",
    "session_id": "uuid",
    "team_segment": "A",
    
    // Privacy: no repo path, no source code
    "metrics": {
      "pre_remediation_score": 52,
      "post_remediation_score": 63,  // if audit_post provided
      "score_improvement": 11,
      "audit_duration_seconds": 10,
      "engineer_duration_seconds": 8,
      "engineer_diffs_generated": 3,
      "engineer_diffs_applied": 3,
      "engineer_diffs_rejected": 1,
      "recommendation_acceptance_rate": 0.75
    },
    
    "findings_summary": {
      "total_findings": 25,
      "token_compliance_findings": 8,
      "component_usage_findings": 7,
      "accessibility_findings": 5,
      "type_safety_findings": 3,
      "other_findings": 2
    },
    
    "recommendations_summary": {
      "total_actionable": 3,
      "total_system_gaps": 2
    },
    
    "errors": [
      { "phase": "engineer", "error_type": "parse_error", "resolved": true }
    ]
  },
  "telemetry_emitted_to": "console | http://telemetry-service",
  "opt_out_honored": true
}
```

## Payload construction

### Phase 1: Extract metrics summary

```
def extract_metrics_summary(phase_outputs):
  audit = phase_outputs.audit
  engineer = phase_outputs.engineer
  audit_post = phase_outputs.audit_post  // optional
  
  pre_score = audit.combined_score
  post_score = audit_post.combined_score if audit_post else pre_score
  
  metrics = {
    pre_remediation_score: pre_score,
    post_remediation_score: post_score,
    score_improvement: post_score - pre_score,
    audit_duration_seconds: audit.duration_ms // 1000,
    engineer_duration_seconds: engineer.duration_ms // 1000 if engineer else 0,
    engineer_diffs_generated: len(engineer.diffs) if engineer else 0,
    engineer_diffs_applied: engineer.applied_count if engineer else 0,
    engineer_diffs_rejected: engineer.rejected_count if engineer else 0,
    recommendation_acceptance_rate: engineer.applied_count / len(engineer.diffs) if engineer else 0
  }
  
  return metrics
```

### Phase 2: Extract findings summary (counts only, no details)

```
def extract_findings_summary(phase_outputs):
  audit = phase_outputs.audit
  
  summary = {total_findings: 0}
  
  // Count findings by metric
  for metric in audit.metrics.all:
    finding_count = len(metric.findings)
    summary[metric.name.lower() + "_findings"] = finding_count
    summary.total_findings += finding_count
  
  // Count uncategorized
  summary.other_findings = summary.total_findings - sum(all categorized)
  
  return summary
```

### Phase 3: Extract recommendations summary (counts only)

```
def extract_recommendations_summary(phase_outputs):
  strategist = phase_outputs.strategist
  
  summary = {
    total_actionable: len(strategist.recommendations),
    total_system_gaps: len(strategist.system_findings) if strategist.system_findings else 0
  }
  
  return summary
```

### Phase 4: Privacy compliance check

```
def apply_privacy_filters(telemetry_payload):
  // Ensure no source code or repo paths in payload
  
  // Remove any fields that contain file contents
  disallowed_fields = [
    "source_code",
    "file_contents",
    "repo_path",
    "team_name",
    "user_email",
    "git_user"
  ]
  
  for field in disallowed_fields:
    if field in telemetry_payload:
      delete telemetry_payload[field]
      log_warn(f"Removed {field} for privacy compliance")
  
  // Sanitize any string fields that might contain paths
  for key, value in telemetry_payload.items():
    if type(value) == string and value.contains("/"):
      // Likely a path; redact
      telemetry_payload[key] = "[redacted_path]"
  
  return telemetry_payload
```

### Phase 5: Opt-out honor

```
def honor_opt_out(telemetry_payload, opt_in):
  // If user has opt_in=false, do not emit
  
  if opt_in == false:
    log_info("Telemetry opt-out honored; not emitting payload")
    return {
      status: "success",
      telemetry_emitted_to: "none",
      opt_out_honored: true
    }
  
  // Else, emit normally
  return {
    status: "success",
    telemetry_emitted_to: "console",  // "http://..." in production
    opt_out_honored: false
  }
```

### Phase 6: Error summary

```
def extract_error_summary(phase_outputs):
  errors = []
  
  for phase in [audit, strategist, engineer, reporter]:
    if phase.status == "error":
      errors.append({
        phase: phase.name,
        error_type: phase.error.type,
        error_message: phase.error.message,
        resolved: phase.error.resolved  // was error caught and recovered?
      })
  
  return errors
```

## Emission targets (PoC vs. MVP)

**PoC (console logging):**
```
Reporter: Emitting telemetry to console
{
  "event_type": "audit_remediate_loop_complete",
  "timestamp": "2026-03-01T10:00:15Z",
  ...
}
```

**MVP (HTTP POST to telemetry service):**
```
POST /api/v1/telemetry/events
Content-Type: application/json
Authorization: Bearer {token}

{
  "event_type": "audit_remediate_loop_complete",
  ...
}
```

PoC will not include HTTP; that's MVP scope.

## System delivery ticket detection (future MVP feature)

**PoC:** Reporter identifies System Enablement findings but does NOT auto-create tickets.

**MVP:** Reporter will implement this logic:

```
def detect_p1_gaps(phase_outputs):
  // P1 ticket trigger: same gap reported by 2+ teams
  // This requires telemetry aggregation (not available in PoC)
  
  // In PoC, we note gaps but escalate manually
  system_gaps = phase_outputs.strategist.system_findings
  
  notes = []
  for gap in system_gaps:
    if gap.severity == "P1":
      notes.append(f"P1 gap detected: {gap.description}. Escalate to HPEDS team.")
  
  return notes
```

## Context management
- Input: ~2KB (scorecard + diffs metadata, no source code)
- Output: ~1KB (telemetry payload, summarized)
- No caching (PoC)

## Retention policy (PoC static, future configurable)
- Retention: 12 months
- Deletion: Automatic after 12 months
- Opt-out: Honored retroactively (delete all prior events for user if requested)

## Error handling
- **Missing phase_outputs:** Return error; log context
- **Privacy violation detected:** Redact field; log warning; emit redacted payload
- **Emission failure (network, etc.):** Log error; return status=degraded; continue (telemetry not critical)
