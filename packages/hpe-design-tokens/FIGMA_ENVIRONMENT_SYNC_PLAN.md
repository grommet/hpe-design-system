# Figma Environment-Isolated Token Sync Proposal and Plan

## Decision Summary

This proposal has strong promise and fits the existing architecture in this package.

The current implementation already has:

- a clear JSON source-of-truth workflow,
- one push script and one pull script,
- alias handling in token import,
- reference validation via expected remote collection keys.

That makes environment isolation mostly an orchestration and configuration problem, not a full re-architecture.

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

## 1. Environment Configuration

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

## 2. Staged Push With Environment Key Cache

Run push in ordered phases:

1. Push primitives to target env primitive file.
2. Re-fetch primitive file variables and build alias map.
3. Push semantics using primitive alias map.
4. Re-fetch semantic file variables and build alias map.
5. Push components using semantic alias map.

Key principle:

- Never reuse cached alias ids across runs.
- Always refresh map from the target environment after each tier update.

## 3. Alias Resolution Strategy

Implement alias resolver with explicit context:

- input alias token name,
- source tier,
- target environment,
- map of variable name -> variable id (or key) fetched from the target env.

Behavior:

- If alias target exists in current target env map, emit VARIABLE_ALIAS using that target id.
- If alias target does not exist, fail early with a precise error listing unresolved aliases.

## 4. Safety Controls

- `--dry-run`: computes payloads and alias maps, logs summary, does not POST.
- `--env` required for non-production automation jobs.
- Explicit console header showing selected environment and file keys (masked).
- Preflight validation: verify selected environment has all required file and collection keys.

## 5. Optional Figma API Enhancements

MVP can be delivered with the current variables endpoints already used:

- GET local variables,
- POST variables payload.

Optional later additions:

- add snapshot artifacts of GET responses per environment for audit/debug,
- add richer diagnostics for alias chains and orphan references,
- add environment health check command that validates all three files before sync.

## Phased Implementation Plan

## Phase 0: Alignment and Guardrails

Scope:

- Confirm environment naming (`production`, `test`).
- Confirm ownership and lifecycle of test Figma files.
- Confirm CI behavior and branch policy.

Deliverables:

- Final env var/config schema.
- Failure policy for unresolved aliases and missing keys.

Success criteria:

- Team signs off on config shape and runbook.

## Phase 1: Config and CLI Plumbing

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

## Phase 2: Deterministic Tiered Push Engine

Scope:

- Refactor push flow to sequential tier processing.
- Build and refresh per-tier alias maps between stages.

Deliverables:

- explicit tier pipeline: primitive -> semantic -> component.
- post-stage GET refresh for alias map updates.

Success criteria:

- semantic aliases always resolve to target env primitive ids.
- component aliases always resolve to target env semantic ids.

## Phase 3: Environment-Aware Alias Rebinding

Scope:

- Add alias resolver abstraction with strict unresolved alias detection.
- Integrate resolver into payload generation path.

Deliverables:

- alias resolution logs showing resolved and unresolved counts.
- fail-fast behavior for unresolved aliases.

Success criteria:

- no alias in test points to production ids after sync.
- payload generation is deterministic across repeated runs.

## Phase 4: Safety Features and Validation

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

## Phase 5: Testing and Rollout

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

## Testing Strategy

## Unit Tests

- environment config parsing and validation.
- resolver behavior with complete and missing alias maps.
- tier sequencing logic.
- verifyReferences with environment-specific expected keys.

Likely file: [src/tests/token_import.test.ts](src/tests/token_import.test.ts).

## Integration Tests (Mocked Figma API)

- staged primitive -> semantic -> component execution with mocked GET/POST.
- alias map refresh after each stage.
- dry-run does not invoke POST.

## Manual Acceptance Tests

1. Run push with `--env=test --dry-run`; confirm expected summary only.
2. Run push with `--env=test`; inspect Figma test files for expected variable changes.
3. In Figma test semantic/component files, verify aliases resolve to test-tier variables.
4. Run pull with `--env=test` into temp output; diff against expected token JSON.
5. Re-run push with no token changes; verify no-op behavior.
6. Run push with `--env=production`; verify behavior matches current baseline.

## Risks and Mitigations

- Risk: alias name collisions across collections.
Mitigation: include tier/collection-aware lookup in alias mapping, not global name-only search.

- Risk: hidden async race conditions in current script iteration.
Mitigation: replace async `forEach` flow with awaited sequential loop.

- Risk: accidental production writes.
Mitigation: default safe environment in CI jobs, clear environment banner, optional confirmation gate for production.

- Risk: stale ids after destructive test changes.
Mitigation: rebuild alias map from target env GET after every stage and every run.

## Rollback Plan

1. Keep legacy single-environment path behind feature flag during rollout.
2. If issues appear, switch CI to legacy mode immediately.
3. Restore from JSON source-of-truth by rerunning production sync after fix.

## Recommended Initial Scope

Implement Phases 1-3 first (env config + deterministic staging + alias rebinding), then add Phase 4 safety and Phase 5 rollout/testing hardening.

This yields high confidence isolation quickly while minimizing initial code churn.