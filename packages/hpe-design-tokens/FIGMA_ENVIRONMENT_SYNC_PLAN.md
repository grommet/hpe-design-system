# Figma Environment-Isolated Token Sync Proposal and Plan

## Decision Summary

This proposal has strong promise and fits the existing architecture in this package.

Primary audience for this document is engineering implementers and automation/agent operators.
The goal is to define a deterministic, machine-operable sync contract that is safe by default.

The current implementation already has:

- a clear JSON source-of-truth workflow,
- one push script and one pull script,
- alias handling in token import,
- reference validation via expected remote collection keys.

That makes environment isolation mostly an orchestration and configuration problem, not a full re-architecture.

## Intended Usage

- Engineering: implementation details, sequencing, test strategy, and rollout controls.
- Agent/automation runs: deterministic CLI behavior, strict preflight checks, and parseable run summaries.
- Reviewers: phase gates, ownership, and objective success criteria.

## Current State (Code-Validated)

- Push script currently targets exactly one set of file keys via env vars: [src/scripts/sync_tokens_to_figma.ts](src/scripts/sync_tokens_to_figma.ts#L16).
- Pull script also assumes one set of file keys: [src/scripts/sync_figma_to_tokens.ts](src/scripts/sync_figma_to_tokens.ts#L41).
- Alias values are resolved to VARIABLE_ALIAS values using variable ids found in the current local variable snapshot: [src/token_import.ts](src/token_import.ts#L317).
- Reference safety check compares remote collection keys against env vars, but only for one environment at a time: [src/utils.ts](src/utils.ts#L64).
- Env template and README are single-environment today: [.env.example](.env.example), [README.md](README.md#L40).

## Why The Proposal Is Promising

1. It preserves JSON as the single source of truth.
2. It avoids risky manual duplication and relinking in Figma.
3. It enables destructive testing in isolated files while keeping production untouched.
4. It aligns with existing token tiers (primitive, semantic, component).
5. It can be rolled out incrementally with low blast radius.

## Important Caveats To Address

1. Alias rebinding must be environment-aware.
The current import logic resolves aliases by local variable name and local ids. For test/prod isolation, this must intentionally bind to ids/keys from the selected environment.

2. The push pipeline should be deterministic by tier.
Today the script iterates directories with async callbacks. For robust staged key-map refresh, sequence should be explicit: primitive -> semantic -> component.

3. Reference validation must be scoped by environment.
Each environment needs its own expected collection keys; otherwise validation can produce false failures.

4. Migration needs safe defaults.
Production must remain default unless an explicit environment flag is passed.

## Proposed Design

### 1. Environment Configuration

Add environment-aware config for file keys and expected remote collection keys.

Example shape:

```json
{
  "environments": {
    "production": {
      "files": {
        "primitive": "FILE_KEY_PROD_A",
        "semantic": "FILE_KEY_PROD_B",
        "component": "FILE_KEY_PROD_C"
      },
      "collections": {
        "primitives": "COLLECTION_KEY_PROD_PRIMITIVES",
        "global": "COLLECTION_KEY_PROD_GLOBAL",
        "color": "COLLECTION_KEY_PROD_COLOR",
        "dimension": "COLLECTION_KEY_PROD_DIMENSION"
      }
    },
    "test": {
      "files": {
        "primitive": "FILE_KEY_TEST_A",
        "semantic": "FILE_KEY_TEST_B",
        "component": "FILE_KEY_TEST_C"
      },
      "collections": {
        "primitives": "COLLECTION_KEY_TEST_PRIMITIVES",
        "global": "COLLECTION_KEY_TEST_GLOBAL",
        "color": "COLLECTION_KEY_TEST_COLOR",
        "dimension": "COLLECTION_KEY_TEST_DIMENSION"
      }
    }
  }
}
```

CLI contract:

- push: `pnpm sync-tokens-to-figma -- --env=production|test [--dry-run]`
- pull: `pnpm sync-figma-to-tokens -- --env=production|test --output <dir>`

Default remains `production`.

#### Agent-Friendly CLI Requirements

- Exit code `0` only when all requested stages complete successfully.
- Exit code non-zero on validation, planning, or execution failures.
- Emit stable stage and summary markers for log parsing.
- Emit a final machine-readable summary object.

#### Configuration Source And Precedence

Use the following precedence order (highest to lowest):

1. CLI flags (`--env`, `--config`).
2. Environment variables for the selected environment.
3. Config file defaults.

If a required value is missing after precedence resolution, fail immediately with a non-zero exit and a clear list of missing keys.

Do not continue with partial defaults.

#### Required Configuration Contract

For each environment, require:

- file keys for `primitive`, `semantic`, `component`,
- expected collection keys for `primitives`, `global`, `color`, `dimension`,
- optional safety policy flags (for example `allowProductionWrites`).

If `--env` is omitted, default to `production` for local usage. In CI, require `--env` to be explicitly provided.

#### Recommended Runtime Config Shape

```json
{
  "env": "test",
  "files": {
    "primitive": "<file-key>",
    "semantic": "<file-key>",
    "component": "<file-key>"
  },
  "collections": {
    "primitives": "<collection-key>",
    "global": "<collection-key>",
    "color": "<collection-key>",
    "dimension": "<collection-key>"
  },
  "safety": {
    "allowProductionWrites": false,
    "requireExplicitEnvInCI": true
  }
}
```

### 2. Staged Push With Environment Key Cache

Run push in ordered phases:

1. Push primitives to target env primitive file.
2. Re-fetch primitive file variables and build alias map.
3. Push semantics using primitive alias map.
4. Re-fetch semantic file variables and build alias map.
5. Push components using semantic alias map.

Key principle:

- Never reuse cached alias ids across runs.
- Always refresh map from the target environment after each tier update.

#### Execution Invariants

- Stage order is fixed: `primitive -> semantic -> component`.
- Next stage cannot start unless prior stage exits successfully.
- Alias cache is rebuilt from remote state after each successful stage.
- A stage must never consume alias ids from a previous run.

#### Stage Output Contract

Each stage should produce a structured summary:

- environment,
- file key (masked),
- variable collection create/update/delete counts,
- variable create/update/delete counts,
- mode value update counts,
- unresolved alias count.

If `--dry-run` is set, include planned mutation counts and a `mutationsApplied: false` field.

### 3. Alias Resolution Strategy

Implement alias resolver with explicit context:

- input alias token name,
- source tier,
- target environment,
- map of variable name -> variable id (or key) fetched from the target env.

Behavior:

- If alias target exists in current target env map, emit VARIABLE_ALIAS using that target id.
- If alias target does not exist, fail early with a precise error listing unresolved aliases.

#### Alias Identifier Contract

To avoid ambiguity, use this contract:

1. Canonical alias name: normalized token path (for example `color/background/critical/default/rest`).
2. Stage cache entry: `canonicalName -> { variableId, variableKey, collectionName, fileTier }`.
3. Payload behavior: use `variableId` for VARIABLE_ALIAS values in POST payloads.
4. Cross-stage mapping behavior: use `variableKey` only for diagnostics and integrity checks; never persist raw ids between runs.

If alias candidates collide by name across collections, resolver must use collection and tier context to disambiguate or fail with a deterministic error.

#### Failure Taxonomy (Alias)

- `ALIAS_NOT_FOUND`: alias target missing in resolved environment map.
- `ALIAS_COLLISION`: alias name resolves to multiple candidates after normalization.
- `ALIAS_CROSS_TIER_INVALID`: alias points to an invalid source tier.

All alias errors must include token path, source file, target environment, and recommended remediation.

### 4. Safety Controls

- `--dry-run`: computes payloads and alias maps, logs summary, does not POST.
- `--env` required for non-production automation jobs.
- Explicit console header showing selected environment and file keys (masked).
- Preflight validation: verify selected environment has all required file and collection keys.

#### Production Write Guardrails

Use at least one hard safety gate for production mutation:

- Option A: require `--confirm-production` whenever `--env=production` and command is mutating.
- Option B: require `ALLOW_PRODUCTION_WRITES=true` in CI for production mutation.

Recommended: support both, with Option A for local and Option B for CI.

#### Preflight Checklist (Must Pass)

1. Environment selection resolved and logged.
2. Required file keys and collection keys present.
3. Reference validation keys match target environment.
4. Production guardrail conditions satisfied when mutating production.

### 5. Optional Figma API Enhancements

MVP can be delivered with the current variables endpoints already used:

- GET local variables,
- POST variables payload.

Optional later additions:

- add snapshot artifacts of GET responses per environment for audit/debug,
- add richer diagnostics for alias chains and orphan references,
- add environment health check command that validates all three files before sync.

## Phased Implementation Plan

### Phase 0: Alignment and Guardrails

Scope:

- Confirm environment naming (`production`, `test`).
- Confirm ownership and lifecycle of test Figma files.
- Confirm CI behavior and branch policy.

Deliverables:

- Final env var/config schema.
- Failure policy for unresolved aliases and missing keys.

Success criteria:

- Team signs off on config shape and runbook.

Owner:

- Design tokens maintainers + DX/CI owner.

Entry criteria:

- This document approved.

Exit criteria:

- Configuration and safety policy finalized in writing.

Agent-readiness outputs:

- finalized CLI behavior contract,
- finalized failure code catalog,
- finalized log/summary schema.

### Phase 1: Config and CLI Plumbing

Scope:

- Add environment selector parsing to both sync scripts.
- Add environment resolver utility.
- Update `.env.example` and README docs.

Deliverables:

- `--env` support with default `production`.
- environment-scoped key loading and validation.

Success criteria:

- Running push/pull with `--env=test` only reads test keys.
- Running with missing env-specific values fails with actionable errors.

Owner:

- Design tokens maintainers.

Entry criteria:

- Phase 0 exit criteria met.

Exit criteria:

- Environment resolver merged with tests.

Agent-readiness outputs:

- deterministic config resolution function,
- explicit and parseable validation errors.

### Phase 2: Deterministic Tiered Push Engine

Scope:

- Refactor push flow to sequential tier processing.
- Build and refresh per-tier alias maps between stages.

Deliverables:

- explicit tier pipeline: primitive -> semantic -> component.
- post-stage GET refresh for alias map updates.

Success criteria:

- semantic aliases always resolve to target env primitive ids.
- component aliases always resolve to target env semantic ids.

Owner:

- Design tokens maintainers.

Entry criteria:

- Phase 1 merged.

Exit criteria:

- Push execution is strictly sequential and deterministic.

Agent-readiness outputs:

- stage-gated executor with explicit stage states (`planned`, `running`, `succeeded`, `failed`, `skipped`).

### Phase 3: Environment-Aware Alias Rebinding

Scope:

- Add alias resolver abstraction with strict unresolved alias detection.
- Integrate resolver into payload generation path.

Deliverables:

- alias resolution logs showing resolved and unresolved counts.
- fail-fast behavior for unresolved aliases.

Success criteria:

- no alias in test points to production ids after sync.
- payload generation is deterministic across repeated runs.

Owner:

- Design tokens maintainers.

Entry criteria:

- Phase 2 merged.

Exit criteria:

- Alias resolution contract implemented with fail-fast errors.

Agent-readiness outputs:

- alias cache materialization and refresh hooks,
- structured alias error payloads.

### Phase 4: Safety Features and Validation

Scope:

- Add `--dry-run`.
- Add environment-scoped `verifyReferences` inputs.
- Improve run summary output.

Deliverables:

- dry-run summary by tier: create/update/delete counts and unresolved aliases.
- explicit validation report for remote collection keys.

Success criteria:

- users can preview all changes without mutating Figma.
- invalid cross-environment references are blocked before POST.

Owner:

- Design tokens maintainers + release owner.

Entry criteria:

- Phase 3 merged.

Exit criteria:

- Dry-run and guardrails enabled by default in CI workflows.

Agent-readiness outputs:

- machine-readable dry-run report,
- production guardrail status field in final summary.

### Phase 5: Testing and Rollout

Scope:

- Add unit/integration coverage.
- Pilot rollout on test environment.
- Define rollback runbook.

Deliverables:

- new tests for env resolution, staged key refresh, alias rebinding.
- manual verification checklist for Figma files.
- release notes and operator instructions.

Success criteria:

- green tests in CI.
- successful test-environment sync with zero production file mutations.
- successful production sync unchanged from current behavior.

Owner:

- Design tokens maintainers + release owner + QA representative.

Entry criteria:

- Phase 4 merged.

Exit criteria:

- Pilot complete, production cutover approved, rollback drill completed.

Agent-readiness outputs:

- runbook for autonomous sync execution,
- runbook for autonomous rollback initiation criteria.

## Operational Metrics (Non-Functional Success Criteria)

- Idempotency: second run with unchanged inputs should generate zero POST mutations.
- Reliability: no partial stage success without explicit stage-failure reporting.
- Performance: full three-tier sync should complete within agreed team threshold.
- Observability: each run emits machine-readable summary plus human-readable logs.

Suggested SLO targets (to be ratified by team):

- successful sync rate >= 99% in test environment over rolling 30 days,
- zero unintended production mutations,
- idempotent no-op behavior on repeated identical inputs.

## Testing Strategy

### Unit Tests

- environment config parsing and validation.
- resolver behavior with complete and missing alias maps.
- tier sequencing logic.
- verifyReferences with environment-specific expected keys.

Likely file: [src/tests/token_import.test.ts](src/tests/token_import.test.ts).

### Integration Tests (Mocked Figma API)

- staged primitive -> semantic -> component execution with mocked GET/POST.
- alias map refresh after each stage.
- dry-run does not invoke POST.
- explicit production guardrail behavior in local and CI-like invocation modes.
- machine-readable summary schema validation.

### Manual Acceptance Tests

1. Run push with `--env=test --dry-run`; confirm expected summary only.
2. Run push with `--env=test`; inspect Figma test files for expected variable changes.
3. In Figma test semantic/component files, verify aliases resolve to test-tier variables.
4. Run pull with `--env=test` into temp output; diff against expected token JSON.
5. Re-run push with no token changes; verify no-op behavior.
6. Run push with `--env=production`; verify behavior matches current baseline.
7. Validate production guardrail blocks mutation unless explicit confirmation is present.
8. Validate machine-readable summary is emitted and parseable by automation.

## Agent Execution Runbook (Minimal)

1. Resolve effective config and print redacted config source map.
2. Execute preflight; stop immediately on first failure.
3. Execute staged sync with fixed stage order.
4. Emit final summary object and exit code.
5. On failure, emit remediation hints and do not continue remaining stages.

## Risks and Mitigations

- Risk: alias name collisions across collections.
Mitigation: include tier/collection-aware lookup in alias mapping, not global name-only search.

- Risk: hidden async race conditions in current script iteration.
Mitigation: replace async `forEach` flow with awaited sequential loop.

- Risk: accidental production writes.
Mitigation: default safe environment in CI jobs, clear environment banner, optional confirmation gate for production.

- Risk: stale ids after destructive test changes.
Mitigation: rebuild alias map from target env GET after every stage and every run.

- Risk: configuration drift across local machines and CI.
Mitigation: add startup diagnostics that print effective config source per value (flag/env/config-file) with secret-safe masking.

- Risk: automation parsing breaks due to log format drift.
Mitigation: define and version a stable machine-readable summary schema.

## Rollback Plan

1. Keep legacy single-environment path behind feature flag during rollout.
2. If issues appear, switch CI to legacy mode immediately.
3. Restore from JSON source-of-truth by rerunning production sync after fix.

Rollback triggers:

- alias mismatch rate above agreed threshold,
- failed production guardrail check,
- repeated stage failures in pilot.

## Recommended Initial Scope

Implement Phases 1-3 first (env config + deterministic staging + alias rebinding), then add Phase 4 safety and Phase 5 rollout/testing hardening.

This yields high confidence isolation quickly while minimizing initial code churn.