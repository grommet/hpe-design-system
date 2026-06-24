# Figma Sync CLI Contract (Phase 0 Freeze)

Status: frozen for Phase 1 implementation.
Version: 1.0.0
Owner: design-tokens maintainers + DX/CI owner

## Commands

- Push: `pnpm sync-tokens-to-figma -- --env=<production|test> [--dry-run] [--confirm-production] [--config <path>]`
- Pull: `pnpm sync-figma-to-tokens -- --env=<production|test> --output <dir> [--config <path>]`
- Discover: `pnpm sync-discover-figma-collection-keys -- --env=<production|test> [--pretty] [--output <path>] [--config <path>]`

## Flag Semantics

- `--env`: target environment. Optional locally (defaults to `production`).
- `--dry-run`: plan-only mode. No POST calls to mutate variables.
- `--confirm-production`: required locally for mutating production.
- `--config`: optional config file path.
- `--output`: output directory for pull, or output file path for discovery reports.
- `--pretty`: pretty-print JSON discovery output.
- `--bootstrap`: skip collection-key validation and preflight reference checks.
  Use only when setting up a fresh Figma environment whose collection keys are
  not yet known. Discover keys after the first successful bootstrap run using
  `pnpm sync-discover-figma-collection-keys`, populate `.env`, then switch to
  the normal (non-bootstrap) workflow. Policy: do not use in production CI runs.

## Resolution Precedence

1. CLI flags
2. Environment variables
3. Config file defaults

Missing required values after precedence resolution must fail immediately.

## Exit Codes

- Current implementation: `0` on success, non-zero on failure.
- Automation should treat any non-zero value as failure and parse machine-readable
  payloads (`stage-status`, `run-summary`) to classify error category.

## CI Policy

- Explicitly pass `--env` in CI workflows.
- Production mutation requires `ALLOW_PRODUCTION_WRITES=true`.
- If `--dry-run` is enabled, `mutationsApplied` must be `false` in final summary.

## Logging And Output

- Emit machine-readable preflight-validation event before stage execution.
- Emit machine-readable stage-status events.
- Emit final run-summary event.
- Include `schemaVersion` in every machine-readable payload.
- Keep human logs, but machine-readable payloads are source of truth for automation.