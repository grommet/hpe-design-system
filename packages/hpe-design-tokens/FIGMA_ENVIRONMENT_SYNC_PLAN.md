# Figma Environment-Isolated Token Sync Plan

## Purpose

Enable safe testing of token changes in isolated Figma test libraries without any production mutation risk.

This plan is written for engineers and automation agents.

## Scope

- In scope: environment-aware Figma sync for `primitive`, `semantic`, and `component` tiers.
- In scope: deterministic execution, alias rebinding, safety controls, and rollout.
- Out of scope: changing JSON token source-of-truth model.

## Baseline Constraints

- Current push uses a single environment key set: [src/scripts/sync_tokens_to_figma.ts](src/scripts/sync_tokens_to_figma.ts#L16).
- Current pull uses a single environment key set: [src/scripts/sync_figma_to_tokens.ts](src/scripts/sync_figma_to_tokens.ts#L41).
- Current alias resolution is local-snapshot/id based: [src/token_import.ts](src/token_import.ts#L317).
- Current reference verification is single-environment: [src/utils.ts](src/utils.ts#L64).

## Target Architecture

### Environment Model

Each environment defines:

- file keys: `primitive`, `semantic`, `component`
- expected remote collection keys: `primitives`, `global`, `color`, `dimension`
- safety policy flags

### CLI Contract

- Push: `pnpm sync-tokens-to-figma -- --env=production|test [--dry-run] [--confirm-production]`
- Pull: `pnpm sync-figma-to-tokens -- --env=production|test --output <dir>`

### Config Resolution Contract

Precedence order:

1. CLI flags
2. Environment variables
3. Config defaults

Rules:

- Missing required config fails fast with non-zero exit.
- No partial fallback behavior.
- In CI, `--env` is required.

### Deterministic Execution Contract

Fixed stage order:

1. `primitive`
2. `semantic`
3. `component`

Invariants:

- Next stage starts only if previous stage succeeded.
- Alias cache is rebuilt from remote state after each successful stage.
- No alias ids are reused across runs.

### Alias Rebinding Contract

Canonical alias key:

- normalized token path, example `color/background/critical/default/rest`

Cache shape:

- `canonicalName -> { variableId, variableKey, collectionName, fileTier }`

Rules:

- Use `variableId` in POST payload alias values.
- Use `variableKey` only for diagnostics/integrity checks.
- Collisions require disambiguation by tier/collection context; otherwise fail.

Alias failure codes:

- `ALIAS_NOT_FOUND`
- `ALIAS_COLLISION`
- `ALIAS_CROSS_TIER_INVALID`

Required alias error fields:

- token path
- source file
- target environment
- remediation hint

### Safety Contract

Preflight must pass before any mutation:

1. Environment resolved and logged.
2. Required keys present.
3. Reference validation keys match selected environment.
4. Production guardrail satisfied if mutating production.

Production guardrails:

- Local: require `--confirm-production` for mutating production.
- CI: require `ALLOW_PRODUCTION_WRITES=true` for mutating production.

## Machine-Readable Output Contract

Every run emits:

- stage status events with stable markers
- final summary object
- non-zero exit on any validation or stage failure

Final summary minimum fields:

- environment
- dryRun
- productionGuardrailPassed
- per-stage status and mutation counts
- unresolvedAliasCount
- mutationsApplied

### Example Event Schemas

Schema versioning:

- include `schemaVersion` in every machine-readable payload,
- use semantic versioning (`major.minor.patch`),
- increment major for breaking shape changes.

Stage event schema (example):

```json
{
	"schemaVersion": "1.0.0",
	"eventType": "stage-status",
	"runId": "2026-04-24T16:30:00.000Z#abc123",
	"environment": "test",
	"stage": "primitive",
	"status": "succeeded",
	"dryRun": false,
	"mutationsApplied": true,
	"counts": {
		"variableCollections": { "create": 0, "update": 1, "delete": 0 },
		"variables": { "create": 2, "update": 8, "delete": 0 },
		"variableModeValues": { "update": 12 }
	},
	"unresolvedAliasCount": 0,
	"startedAt": "2026-04-24T16:30:01.120Z",
	"finishedAt": "2026-04-24T16:30:02.450Z"
}
```

Allowed stage values:

- `primitive`
- `semantic`
- `component`

Allowed status values:

- `planned`
- `running`
- `succeeded`
- `failed`
- `skipped`

Final summary schema (example):

```json
{
	"schemaVersion": "1.0.0",
	"eventType": "run-summary",
	"runId": "2026-04-24T16:30:00.000Z#abc123",
	"environment": "test",
	"dryRun": false,
	"productionGuardrailPassed": true,
	"mutationsApplied": true,
	"unresolvedAliasCount": 0,
	"stages": [
		{
			"stage": "primitive",
			"status": "succeeded",
			"counts": {
				"variableCollections": { "create": 0, "update": 1, "delete": 0 },
				"variables": { "create": 2, "update": 8, "delete": 0 },
				"variableModeValues": { "update": 12 }
			}
		},
		{
			"stage": "semantic",
			"status": "succeeded",
			"counts": {
				"variableCollections": { "create": 0, "update": 1, "delete": 0 },
				"variables": { "create": 1, "update": 6, "delete": 0 },
				"variableModeValues": { "update": 10 }
			}
		},
		{
			"stage": "component",
			"status": "succeeded",
			"counts": {
				"variableCollections": { "create": 0, "update": 0, "delete": 0 },
				"variables": { "create": 0, "update": 4, "delete": 0 },
				"variableModeValues": { "update": 7 }
			}
		}
	],
	"errors": [],
	"startedAt": "2026-04-24T16:30:01.120Z",
	"finishedAt": "2026-04-24T16:30:07.004Z"
}
```

Error object schema (example):

```json
{
	"code": "ALIAS_NOT_FOUND",
	"message": "Alias target not found in test environment",
	"stage": "semantic",
	"tokenPath": "color/background/critical/default/rest",
	"sourceFile": "tokens/semantic/color.light.json",
	"environment": "test",
	"remediation": "Sync primitive stage successfully, then retry semantic stage"
}
```

## Implementation Phases

### Phase 0: Contract Freeze

- Owner: design-tokens maintainers + DX/CI owner
- Deliverables: CLI contract, failure code catalog, summary schema
- Exit: contract approved

### Phase 1: Config and CLI

- Owner: design-tokens maintainers
- Deliverables: environment resolver, `--env`, validation errors, docs/env updates
- Exit: config resolution tested and deterministic

### Phase 2: Stage Executor

- Owner: design-tokens maintainers
- Deliverables: sequential stage executor with stage states
- Exit: `primitive -> semantic -> component` enforced in code

### Phase 3: Alias Rebinding

- Owner: design-tokens maintainers
- Deliverables: alias cache refresh hooks, structured alias failures
- Exit: no cross-environment alias leakage

### Phase 4: Safety and Validation

- Owner: design-tokens maintainers + release owner
- Deliverables: `--dry-run`, environment-scoped verifyReferences, guardrails
- Exit: safe-by-default behavior in CI

### Phase 5: Test and Rollout

- Owner: design-tokens maintainers + release owner + QA rep
- Deliverables: automated coverage, pilot, rollback drill
- Exit: production cutover approved

## Test Plan

### Unit

- config resolution and validation
- stage sequencing invariants
- alias resolver happy path and failures
- environment-scoped reference validation

Likely file: [src/tests/token_import.test.ts](src/tests/token_import.test.ts).

### Integration (Mocked Figma API)

- staged push with cache refresh between tiers
- pull in selected environment
- dry-run with zero POST calls
- production guardrail behavior
- summary schema validation

### Manual Acceptance

1. Dry-run to test: no mutation, expected plan summary.
2. Push to test: expected variable changes in test files.
3. Alias audit: semantic/component aliases resolve to test environment ids.
4. Pull from test and diff token outputs.
5. Repeat same push and verify no-op.
6. Attempt production push without guardrail and verify hard fail.
7. Confirm summary is parseable by automation.

## SLO Targets

- Sync success rate in test environment >= 99% over rolling 30 days.
- Zero unintended production mutations.
- Repeated identical input produces no-op behavior.

## Risks and Mitigations

- Alias collisions across collections.
Mitigation: tier/collection-aware disambiguation plus fail-fast.

- Hidden async race behavior.
Mitigation: sequential awaited stage executor.

- Config drift between local and CI.
Mitigation: redacted effective config source report at startup.

- Log format drift breaking automation.
Mitigation: versioned summary schema.

## Rollback

1. Keep legacy path behind feature flag during rollout.
2. Switch CI back to legacy mode on trigger.
3. Restore production state by rerunning from JSON source-of-truth.

Rollback triggers:

- alias mismatch exceeds agreed threshold
- guardrail check failure
- repeated stage failures in pilot

## Initial Delivery Slice

Implement Phases 1-3 first, then Phases 4-5.

This provides early environment isolation with deterministic execution before full rollout hardening.