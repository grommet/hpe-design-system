# PoC Data Contracts

This document specifies the JSON payloads exchanged between agents in the PoC implementation. These contracts ensure deterministic agent behavior and enable independent testing.

---

## Contract 1: Orchestrator → Auditor

**Direction:** Orchestrator invokes Auditor with audit request

**Payload:**
```json
{
  "command": "audit",
  "scope": "directory" | "page" | "pattern",
  "scope_target": "/src/components",
  "repo_path": "/path/to/repo",
  "framework": "react",
  "knowledge_base_path": "/path/to/knowledge/",
  "dry_run": false,
  "requestor": "orchestrator",
  "timestamps": {
    "request_time": "2026-03-01T10:00:00Z"
  }
}
```

**Response:**
```json
{
  "status": "success" | "error",
  "audit_id": "uuid",
  "scope": "directory",
  "scope_target": "/src/components",
  "timestamp": "2026-03-01T10:00:10Z",
  "duration_ms": 10000,
  
  "scorecard": {
    "metrics": {
      "Component Coverage": {
        "score": 6,
        "max": 10,
        "weight": 1,
        "status": "ok" | "low" | "critical",
        "findings": [
          {
            "id": "uuid",
            "type": "component_not_found",
            "description": "Button component usage found but definition missing",
            "file": "src/Button.tsx",
            "actionable": true,
            "severity": "high"
          }
        ]
      },
      ...
    },
    "combined_score": 52,
    "total_findings": 25
  },
  
  "errors": [],
  "warnings": []
}
```

---

## Contract 2: Orchestrator → Strategist

**Direction:** Orchestrator invokes Strategist with Auditor scorecard

**Payload:**
```json
{
  "scorecard": { /* full Auditor output */ },
  "team_segment": "A",
  "requestor": "orchestrator"
}
```

**Response:**
```json
{
  "status": "success" | "error",
  "recommendations": [
    {
      "rank": 1,
      "metric": "Token Compliance",
      "impact_score": 2.5,
      "effort_score": 1,
      "impact_effort_ratio": 2.5,
      "description": "Replace 8 hardcoded colors with hpe-design-tokens semantic values",
      "affected_files": ["src/Button.tsx", "src/Card.tsx"],
      "affected_findings_count": 8,
      "category": "Consumer Implementation",
      "reasoning": "Token Compliance is weighted 2x in scoring...",
      "acceptance_criteria": [
        "All hardcoded #RRGGBB values replaced with token() calls",
        "..."
      ]
    },
    { "rank": 2, ... },
    { "rank": 3, ... }
  ],
  "skipped_findings": [
    {
      "metric": "Accessibility",
      "reason": "No Engineer remediation skills in PoC"
    }
  ],
  "system_findings": [
    {
      "metric": "HPEDS Adoption",
      "description": "Team has not adopted grommet-theme-hpe",
      "severity": "P2"
    }
  ],
  "notes": "System Enablement findings (2) not ranked; escalate to HPEDS team",
  "errors": []
}
```

---

## Contract 3: Orchestrator → Engineer (Remediation)

**Direction:** Orchestrator invokes Engineer with Strategist recommendations for remediation

**Payload:**
```json
{
  "mode": "remediation",
  "recommendations": [ /* top 3 from Strategist */ ],
  "audit_findings": [ /* all findings from Auditor scorecard */ ],
  "repo_path": "/path/to/repo",
  "framework": "react",
  "ui_library": "grommet",
  "scope": "directory",
  "dry_run": false,
  "knowledge_base_path": "/path/to/knowledge/",
  "requestor": "orchestrator",
  "post_generation_audit": false
}
```

**Response:**
```json
{
  "status": "success" | "error",
  "mode": "remediation",
  "diffs": [
    {
      "id": "uuid",
      "file": "src/components/Button.tsx",
      "metric": "Token Compliance",
      "finding_type": "hardcoded_color",
      "description": "Replace hardcoded color #F44336 with token",
      "before": "const color = '#F44336';",
      "after": "const color = token('hpe_color_status_critical');",
      "confidence": 0.95,
      "requires_review": false,
      "imports_added": ["token from hpe-design-tokens"],
      "breaking_change": false
    },
    { /* diff 2 */ },
    { /* diff 3 */ }
  ],
  "summary": {
    "total_diffs": 3,
    "files_affected": ["src/components/Button.tsx", "src/components/Card.tsx"],
    "tokens_replaced": 8,
    "props_fixed": 2,
    "components_upgraded": 1
  },
  "errors": [
    {
      "id": "uuid",
      "file": "src/components/Unavailable.tsx",
      "error": "Failed to parse AST",
      "severity": "warn"
    }
  ]
}
```

---

## Contract 4: Orchestrator → Engineer (Generation)

**Direction:** Orchestrator invokes Engineer with generation request (text prompt, Figma JSON, or PRD)

**Payload:**
```json
{
  "mode": "generation",
  "input_type": "text_prompt" | "figma_json" | "prd_path",
  "input_value": "Create a login form with Grommet",
  "framework": "react",
  "ui_library": "grommet",
  "repo_path": "/path/to/repo",
  "target_directory": "src/components",
  "knowledge_base_path": "/path/to/knowledge/",
  "dry_run": false,
  "requestor": "orchestrator",
  "post_generation_audit": false
}
```

**Response:**
```json
{
  "status": "success" | "error",
  "mode": "generation",
  "generated_files": [
    {
      "path": "src/components/LoginForm.tsx",
      "content": "import React from 'react';\n...",
      "file_type": "typescript_react",
      "imports": [
        "react",
        "grommet",
        "grommet-theme-hpe",
        "hpe-design-tokens"
      ],
      "exports": ["LoginForm"],
      "lines_of_code": 45,
      "has_jsx": true,
      "has_storybook": true
    },
    {
      "path": "src/components/LoginForm.stories.tsx",
      "content": "import { Meta } from '@storybook/react';\n...",
      "file_type": "typescript_react",
      ...
    }
  ],
  "summary": {
    "total_files": 2,
    "total_lines": 75,
    "pattern_used": "login-form"
  },
  "confidence": 0.90,
  "notes": [
    "Email and password fields included per prompt",
    "Remember-me checkbox included"
  ],
  "errors": []
}
```

---

## Contract 5: Engineer (Remediation) → User (for approval gating)

**Direction:** Engineer output requires user approval before applying diffs

**Payload to User:**
```
Found 3 issues to fix:

1. Token Compliance (8 findings)
   - Replace 8 hardcoded colors with hpe-design-tokens
   - Impact: +2.5 points, Effort: 1 hour
   - Files affected: Button.tsx, Card.tsx
   
   [Details...]
   
   Accept this fix? (yes/no/review/undo)
```

**User Response:**
```json
{
  "approval": "yes" | "no" | "review" | "undo",
  "timestamp": "2026-03-01T10:00:15Z"
}
```

If "review", show diff viewer. If "yes", proceed to apply.

---

## Contract 6: Engineer (Remediation Apply) → Checkpoint

**Direction:** Engineer saves file state before applying diffs

**Checkpoint format:**
```
Path: .hpeds-undo-checkpoint/
Contents:
  src/components/Button.tsx.backup      (original file state)
  src/components/Card.tsx.backup        (original file state)
  metadata.json:
    {
      "timestamp": "2026-03-01T10:00:15Z",
      "applied_diffs": [
        { "file": "src/components/Button.tsx", "diff_id": "uuid" },
        { "file": "src/components/Card.tsx", "diff_id": "uuid" }
      ],
      "expires_at": "2026-03-09T10:00:15Z"  // 7 days
    }
```

**Undo command:**
```
Restore files from checkpoint:
  src/components/Button.tsx ← .hpeds-undo-checkpoint/src/components/Button.tsx.backup
  src/components/Card.tsx ← .hpeds-undo-checkpoint/src/components/Card.tsx.backup
Delete checkpoint directory
```

---

## Contract 7: Engineer (Generation) → User (for approval gating)

**Direction:** Engineer output requires user approval before writing generated files

**Payload to User:**
```
Generated 2 files (LoginForm.tsx, LoginForm.stories.tsx):

[Show generated code snippets]

Create these files? (yes/no/review)
```

**User Response:**
```json
{
  "approval": "yes" | "no" | "review",
  "timestamp": "2026-03-01T10:00:20Z"
}
```

---

## Contract 8: Orchestrator → Reporter

**Direction:** Orchestrator invokes Reporter after loop completion

**Payload:**
```json
{
  "phase_outputs": {
    "audit": { /* full Auditor output */ },
    "strategist": { /* Strategist recommendations */ },
    "engineer": { /* Engineer diffs or generated files */ },
    "audit_post": { /* optional post-rem audit */ }
  },
  "team_segment": "A",
  "timestamp": "2026-03-01T10:00:25Z",
  "opt_in": true,
  "repo_path": "/path/to/repo",
  "requestor": "orchestrator"
}
```

**Response:**
```json
{
  "status": "success" | "degraded" | "error",
  "telemetry_payload": {
    "event_type": "audit_remediate_loop_complete",
    "timestamp": "2026-03-01T10:00:25Z",
    "session_id": "uuid",
    "team_segment": "A",
    "metrics": {
      "pre_remediation_score": 52,
      "post_remediation_score": 63,
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
      "component_usage_findings": 7
    },
    "recommendations_summary": {
      "total_actionable": 3,
      "total_system_gaps": 2
    }
  },
  "telemetry_emitted_to": "console",
  "opt_out_honored": true,
  "errors": []
}
```

---

## Error Handling & Fallbacks

All contracts include error response format:

```json
{
  "status": "error",
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "context": { /* optional debugging info */ }
  }
}
```

Example:
```json
{
  "status": "error",
  "error": {
    "code": "AST_PARSE_FAILED",
    "message": "Failed to parse AST for src/Button.tsx",
    "context": {
      "file": "src/Button.tsx",
      "syntax_error": "Unexpected token"
    }
  }
}
```

---

## Timeouts & SLAs

All agents have implicit timeouts (PoC defaults, can be overridden):

| Agent | Timeout | Rationale |
| --- | --- | --- |
| Auditor | 60s | Can analyze large codebases |
| Strategist | 10s | Simple CPU-bound computation |
| Engineer (rem) | 30s | Can generate many diffs |
| Engineer (gen) | 20s | Can generate code |
| Reporter | 5s | Emission only, not critical |

If timeout exceeded, agent returns error; Orchestrator logs and continues.

---

## Validation

All contracts can be validated with schema validators (PoC: manual, MVP: JSON schema + Pydantic):

```
// Example JSON Schema validation
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "status": { "enum": ["success", "error"] },
    "scorecard": { "type": "object" },
    ...
  },
  "required": ["status"]
}
```

---

## References
- [orchestrator/instructions.md](prompts/orchestrator/instructions.md) — State machine calls these contracts
- [auditor/instructions.md](prompts/auditor/instructions.md) — Produces Contract 1 response
- [strategist/instructions.md](prompts/strategist/instructions.md) — Produces Contract 2 response
- [engineer/instructions.md](prompts/engineer/instructions.md) — Produces Contracts 3 & 4 responses
- [reporter/instructions.md](prompts/reporter/instructions.md) — Produces Contract 8 response
