# Orchestrator Instructions

## Objective
Act as the master orchestrator for the HPE Design System audit-remediate-report loop. Load configuration, validate context, invoke agents in proper sequence, manage state transitions, gate approvals, and handle errors with determinism and fallback strategies.

## State machine

```
START
  ↓
[LOAD_CONFIG] → Load .hpedsrc; validate framework (React only); validate segment (Segment A only)
  ↓ (success)
[DETECT_FRAMEWORK] → Scan package.json; confirm React detected
  ↓ (success)
[SELECT_COMMAND] → Branch on CLI command: audit | gen | undo
  ↓
├─ AUDIT_LOOP
│  ├─ [INVOKE_AUDITOR] → Run Auditor with scope (directory/page/pattern)
│  ├─ [WAIT_AUDITOR] → Collect scorecard
│  ├─ [INVOKE_STRATEGIST] → Run Strategist with scorecard
│  ├─ [WAIT_STRATEGIST] → Collect top 3 recommendations
│  ├─ [GATE_ENGINEER] → User approval: "Proceed with remediation? (yes/no)"
│  │  ├─ (yes) → GEN_REMEDIATION
│  │  └─ (no) → EMIT_REPORT
│  ├─ [GEN_REMEDIATION (Engineer remediation)]
│  │  ├─ [INVOKE_ENGINEER_REM] → Pass Strategist output + Auditor findings
│  │  ├─ [WAIT_ENGINEER] → Collect diffs
│  │  ├─ [GATE_APPLY] → User approval: "Apply X diffs? (yes/no/review/undo)"
│  │  │  ├─ (yes) → APPLY_DIFFS
│  │  │  ├─ (no) → EMIT_REPORT (no diffs applied)
│  │  │  ├─ (review) → SHOW_DIFFS → GATE_APPLY (re-prompt)
│  │  │  └─ (undo) → CHECKPOINT_RESTORE → EMIT_REPORT
│  │  ├─ [APPLY_DIFFS] → Write diffs to filesystem; save checkpoint
│  │  ├─ [POST_AUDIT_CHECK] → If post_generation_audit=true, re-run Auditor to verify no regressions
│  │  └─ → EMIT_REPORT
│  └─ → EMIT_REPORT
│
├─ GEN_LOOP
│ ├─ [PARSE_PROMPT] → Extract generation request (text prompt, Figma JSON, PRD path)
│  ├─ [INVOKE_ENGINEER_GEN] → Run Engineer with generation request
│  ├─ [WAIT_ENGINEER] → Collect generated code
│  ├─ [POST_GEN_AUDIT] → If post_generation_audit=true, audit generated code
│  ├─ [GATE_GENERATE] → User approval: "Create X components? (yes/no/review)"
│  │  ├─ (yes) → APPLY_GENERATED
│  │  ├─ (no) → SKIP_GENERATION
│  │  └─ (review) → SHOW_GENERATED → GATE_GENERATE (re-prompt)
│  ├─ [APPLY_GENERATED] → Write generated files; save checkpoint
│  └─ → EMIT_REPORT
│
└─ UNDO_LOOP
   ├─ [LOAD_CHECKPOINT] → Find latest .hpeds-undo-checkpoint
   ├─ [RESTORE_FILES] → Restore file state from checkpoint
   ├─ [CLEANUP] → Remove checkpoint
   └─ → EMIT_REPORT

[EMIT_REPORT] → Invoke Reporter with phase outputs; emit telemetry
  ↓
[UPDATE_STATE] → Set loop_state to "idle"
  ↓
END
```

## Implementation logic

### 1. Config discovery & validation
```
def load_config(repo_path):
  candidates = [
    repo_path + "/.hpedsrc",
    find_workspace_root(repo_path) + "/.hpedsrc",
    expanduser("~/.hpedsrc")
  ]
  for candidate in candidates:
    if file_exists(candidate):
      try:
        config = parse_yaml_or_json(candidate)
        validate_config(config) → check keys: framework, scope, team_segment, post_generation_audit
        return config
      except ParseError:
        log_error("Invalid .hpedsrc format at " + candidate)
        return null
  log_error("No .hpedsrc found; searched: " + str(candidates))
  return null

def validate_config(config):
  required = {framework, scope, team_segment, post_generation_audit}
  for key in required:
    if key not in config:
      raise ConfigError(f"Missing required field: {key}")
  if config.scope not in [directory, page, pattern]:
    raise ConfigError(f"Invalid scope: {config.scope}")
  if config.team_segment != "A":
    raise ConfigError(f"PoC limited to Segment A; got {config.team_segment}")
  if config.post_generation_audit not in [true, false]:
    raise ConfigError(f"Invalid post_generation_audit value")
  return true
```

### 2. Framework detection
```
def detect_framework(repo_path):
  pkg_json = load_json(repo_path + "/package.json")
  if "react" in pkg_json.dependencies or pkg_json.devDependencies:
    return "react"
  else:
    log_error("React not detected; PoC supports React only")
    return null
```

### 3. Audit loop (orchestration)
```
def run_audit_loop(config, repo_path):
  # Invoke Auditor
  audit_input = {
    scope: config.scope,
    scope_target: config.scope_target,  // e.g., /src/components
    repo_path: repo_path,
    knowledge_base_path: prompts/auditor/knowledge/  // hardcoded for PoC
  }
  audit_output = invoke_agent("auditor", audit_input)
  
  if audit_output.status != "success":
    return {status: "error", phase_outputs: {audit: audit_output}}
  
  # Invoke Strategist
  strategist_input = {
    scorecard: audit_output.scorecard,
    team_segment: config.team_segment
  }
  strategist_output = invoke_agent("strategist", strategist_input)
  
  if strategist_output.status != "success":
    log_warn("Strategist failed; falling back to dumb sort")
    strategist_output = dumb_sort_by_consumer_score(audit_output.scorecard)
  
  # Gate user approval
  print("Found " + len(audit_output.findings) + " issues")
  print("Top 3 recommendations:")
  for rec in strategist_output.recommendations[0:3]:
    print("  - " + rec.metric + ": " + rec.description)
  
  user_response = prompt("Proceed with Engineer remediation? (yes/no)")
  
  if user_response == "no":
    return {status: "user_cancelled", phase_outputs: {audit, strategist}}
  
  # Branch to Gen Remediation
  return run_gen_remediation_loop(strategist_output, audit_output, config, repo_path)
```

### 4. Gen Remediation loop (Engineer fixes)
```
def run_gen_remediation_loop(strategist_output, audit_output, config, repo_path):
  # Invoke Engineer with remediation request
  engineer_input = {
    findings: audit_output.findings,
    recommendations: strategist_output.recommendations[0:3],
    mode: "remediation",
    repo_path: repo_path,
    framework: "react",
    ui_library: "grommet",
    scope: config.scope,
    dry_run: cli_flags.dry_run
  }
  engineer_output = invoke_agent("engineer", engineer_input)
  
  if engineer_output.status != "success":
    return {status: "error", phase_outputs: {audit, strategist, engineer}}
  
  # Gate user approval for diffs
  print("Generated " + len(engineer_output.diffs) + " diffs")
  user_response = prompt("Apply X changes to Y files? (yes/no/review/undo)")
  
  if user_response == "no":
    return {status: "user_cancelled", phase_outputs: {audit, strategist, engineer}}
  elif user_response == "review":
    show_diff_viewer(engineer_output.diffs)
    user_response = prompt("Apply changes? (yes/no/undo)")
    if user_response != "yes": return {status: "user_cancelled", ...}
  elif user_response == "undo":
    return {status: "user_cancelled", ...}
  
  # Apply diffs
  save_checkpoint(repo_path, ".hpeds-undo-checkpoint")
  for diff in engineer_output.diffs:
    try:
      apply_diff(diff, repo_path)
    catch error:
      log_error("Failed to apply diff: " + diff.file)
      rollback_from_checkpoint(repo_path, ".hpeds-undo-checkpoint")
      return {status: "error", phase_outputs: {...}, errors: [error]}
  
  applied_count = len(engineer_output.diffs)
  
  # Optional post-gen audit
  if config.post_generation_audit == true:
    audit_input_post = {...audit_input, scope_target: config.scope_target}
    audit_output_post = invoke_agent("auditor", audit_input_post)
    
    if audit_output_post.combined_score < audit_output.combined_score - 5:  // regressed by 5+ pts
      log_warn("Post-audit detected regression; recommending rollback")
      user_response = prompt("Rollback changes due to regression? (yes/no)")
      if user_response == "yes":
        rollback_from_checkpoint(repo_path, ".hpeds-undo-checkpoint")
        applied_count = 0
  
  return {
    status: "success",
    phase_outputs: {
      audit: audit_output,
      strategist: strategist_output,
      engineer: {diffs: engineer_output.diffs, applied_count, rejected_count: len(...) - applied_count},
      audit_post: audit_output_post if post_generated_audit == true else null
    }
  }
```

### 5. Gen Creation loop (Engineer generation)
```
def run_gen_loop(prompt_or_figma, config, repo_path):
  # Invoke Engineer with generation request
  engineer_input = {
    mode: "generation",
    input_type: "text_prompt" | "figma_json" | "prd_path",
    input_value: prompt_or_figma,
    framework: "react",
    ui_library: "grommet",
    repo_path: repo_path,
    dry_run: cli_flags.dry_run
  }
  engineer_output = invoke_agent("engineer", engineer_input)
  
  if engineer_output.status != "success":
    return {status: "error", phase_outputs: {engineer: engineer_output}}
  
  # Optional post-generation audit
  if config.post_generation_audit == true:
    audit_input = {scope: "directory", scope_target: "/tmp/generated", ...}
    audit_output_pre = invoke_agent("auditor", audit_input)
  
  # Gate user approval
  print("Generated " + len(engineer_output.generated_files) + " files")
  user_response = prompt("Create components? (yes/no/review)")
  
  if user_response == "no":
    return {status: "user_cancelled", phase_outputs: {engineer}}
  elif user_response == "review":
    show_generated_code(engineer_output.generated_files)
    user_response = prompt("Create components? (yes/no)")
    if user_response != "yes": return {status: "user_cancelled", ...}
  
  # Apply generated files
  save_checkpoint(repo_path, ".hpeds-gen-checkpoint")
  for file_spec in engineer_output.generated_files:
    try:
      write_file(file_spec.path, file_spec.content)
    catch error:
      log_error("Failed to write generated file: " + file_spec.path)
      rollback_from_checkpoint(repo_path, ".hpeds-gen-checkpoint")
      return {status: "error", ...}
  
  return {
    status: "success",
    phase_outputs: {
      engineer: {generated_files, generated_count: len(...)},
      audit_post: audit_output_post if post_generation_audit == true else null
    }
  }
```

### 6. Undo loop
```
def run_undo_loop(repo_path):
  checkpoint_path = repo_path + "/.hpeds-undo-checkpoint"
  if not file_exists(checkpoint_path):
    log_error("No checkpoint found; cannot undo")
    return {status: "error"}
  
  try:
    restore_from_checkpoint(repo_path, checkpoint_path)
    delete_file(checkpoint_path)
    return {status: "success", phase_outputs: {undo: {restored: true}}}
  catch error:
    log_error("Failed to restore from checkpoint: " + error)
    return {status: "error", errors: [error]}
```

### 7. Reporting
```
def emit_report(phase_outputs, config):
  reporter_input = {
    phase_outputs: phase_outputs,
    team_segment: config.team_segment,
    timestamp: now(),
    opt_in: config.telemetry_opt_in  // default: true
  }
  reporter_output = invoke_agent("reporter", reporter_input)
  
  if reporter_output.status != "success":
    log_warn("Reporter failed; telemetry not emitted")
  
  return reporter_output
```

## Context management
- Scope-first: Load only config and repo metadata before invoking agents
- Evidence tiers: Auditor output already manages excerpt sizes; pass summary to Strategist, evidence to Engineer only if needed
- Inter-agent payloads: Scorecard (~1KB), recommendations (~500B), diffs (~2KB); well within budget
- No caching (PoC); future MVP will cache audits

## Error handling strategy
- **Config error:** Abort with helpful message; suggest `.hpedsrc.example` template
- **Framework error:** Abort; suggest React-only scope for PoC
- **Auditor error:** Emit error log; suggest knowledge base review; do not proceed
- **Strategist error:** Log warning; fall back to dumb sort by Consumer score; continue
- **Engineer error (pre-apply):** Emit error; do not apply; halt
- **Engineer error (post-apply):** Trigger immediate rollback from checkpoint; emit rollback confirmation
- **Reporter error:** Log warning; continue (telemetry not mission-critical in PoC)
- **Checkpoint error:** Log error; suggest manual git restore

## Dry-run mode
- `--dry-run` flag disables Engineer diff application and file writes
- All agents run normally; output shows "would have applied X diffs" instead of "applied X diffs"
- Useful for validation before committing to changes
