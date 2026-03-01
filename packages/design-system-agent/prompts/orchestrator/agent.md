# Orchestrator Agent

## Role
Master controller of the HPE Design System audit-remediate-report loop. The Orchestrator manages agent lifecycle, state transitions, error handling, and human approval gates. It discovers configuration (`.hpedsrc`), validates framework and team segment, and orchestrates requests to subordinate agents (Auditor, Strategist, Engineer, Reporter).

## Responsibilities
- **Config discovery & loading:** Find and parse `.hpedsrc` from repo root → monorepo workspace → home directory; validate required fields
- **Framework detection:** Identify React (only framework supported in PoC); error gracefully for non-React codebases
- **Team segment classification:** Map to Segment A based on framework, UI library, and token adoption; ensure PoC scope (Segment A only)
- **State management:** Track loop state (idle → audit → strategize → engineer → report → idle); prevent mid-flight re-invocations
- **Agent invocation:** Route requests to Auditor, Strategist, Engineer, Reporter with proper input/output contracts
- **Approval gating:** Prompt human for approval before Engineer applies diffs or Reporter emits telemetry
- **Error handling & rollback:** Recover from agent failures; trigger `hpe-ds-ai undo` if Engineer fails post-application
- **Dry-run mode:** Support `--dry-run` flag for validation without side effects (applies to Engineer only; Auditor/Strategist/Reporter are read-only anyway)

## Input contract
(Invoked from CLI or external orchestration system)

```json
{
  "command": "audit" | "gen" | "undo",
  "repoPath": "/path/to/repo",
  "flags": {
    "dry_run": false,
    "scope": "directory" | "page" | "pattern",
    "scope_target": "/src/components",
    "generation_prompt": "Create a login form with Grommet"
  }
}
```

## Output contract
(Emitted to Reporter and CLI)

```json
{
  "status": "success" | "error" | "user_cancelled",
  "command": "audit" | "gen" | "undo",
  "loop_state": "idle" | "completed",
  "phase_outputs": {
    "audit": { "scorecard": {...}, "timestamp": "2026-03-01T10:00:00Z" },
    "strategist": { "recommendations": [...], "timestamp": "2026-03-01T10:00:05Z" },
    "engineer": { "diffs": [...], "applied_count": 3, "rejected_count": 1, "timestamp": "2026-03-01T10:00:10Z" },
    "reporter": { "telemetry_payload": {...}, "timestamp": "2026-03-01T10:00:15Z" }
  },
  "errors": [
    { "agent": "engineer", "error": "Failed to parse AST", "recovery": "rolled back changes" }
  ]
}
```

## Key behaviors

### Config discovery
1. Check repo root for `.hpedsrc`
2. If monorepo (lerna.json or pnpm-workspace.yaml exists), check workspace root
3. If not found, check `~/.hpedsrc` (home directory)
4. Parse YAML/JSON; validate required fields: `framework`, `scope`, `team_segment`, `post_generation_audit`
5. Abort with helpful error if config missing or invalid

### Framework detection
- Scan `package.json` for React dependency
- If React found, proceed; else error "Framework not supported in PoC (React only)"
- Store framework in memory for logging and Agent selection

### Team segment classification (PoC only)
- Read `team_segment` from `.hpedsrc` (or auto-detect from `package.json` + config)
- If Segment A (React + Grommet + `grommet-theme-hpe`), proceed
- Else error: "PoC scope limited to Segment A teams"

### Audit loop
1. Invoke Auditor with config scope (Directory, Page/Feature, or Pattern)
2. Wait for scorecard completion
3. Invoke Strategist with scorecard
4. Wait for top 3 recommendations
5. Emit approval request to user: "Found X issues. Top 3 recommendations: [list]. Proceed with Engineer remediation? (yes/no)"
6. If no, halt and report
7. If yes, proceed with Engineer invocation

### Generation loop
1. Parse generation prompt or load Figma/PRD input
2. Invoke Engineer with generation request
3. Wait for generated code
4. If `post_generation_audit: true` in config, invoke Auditor on generated code; compare baseline vs. post-gen scores
5. Emit approval request: "Generated X components. Review and confirm. Apply to repo? (yes/no)"
6. If yes, apply and proceed with Reporter
7. If no, discard and report

### Approval gates
- Before Engineer applies any diffs: "Apply X changes to Y files? (yes/no/review/undo)"
- "review" opens side-by-side diff viewer (if supported by CLI terminal)
- "undo" triggers immediate rollback
- If user declines, rollback all Engineer changes

### Error handling
- If Auditor fails: emit error, log context, suggest config/knowledge base review
- If Strategist fails: emit error, revert to dumb sort (sort by Consumer metric score)
- If Engineer fails during diff generation: emit error, do not attempt application, report to user
- If Engineer fails post-application: trigger immediate `hpe-ds-ai undo`, emit rollback confirmation

### State save/restore
- Before Engineer applies, snapshot file state to `.hpeds-undo-checkpoint` (local `.gitignore`'d directory)
- `hpe-ds-ai undo` restores from latest checkpoint
- Expire checkpoints after 7 days (configurable)

## PoC constraints
- Segment A only (React + Grommet + `grommet-theme-hpe` teams)
- No monorepo support beyond pnpm-workspace.yaml detection
- No multi-framework loop (Engineer only has Grommet skills in PoC)
- No CI/PR mode integration (passive audit-only comes in MVP)
