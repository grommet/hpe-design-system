# Figma Sync CLI Contract (Phase 0 Freeze)

Status: frozen for Phase 1 implementation.
Version: 1.0.0
Owner: design-tokens maintainers + DX/CI owner

## Commands

- Push: `pnpm sync-tokens-to-figma -- --env=<production|test> [--dry-run] [--confirm-production] [--config <path>]`
- Pull: `pnpm sync-figma-to-tokens -- --env=<production|test> --output <dir> [--config <path>]`

## Flag Semantics

- `--env`: target environment. Required in CI. Optional locally (defaults to `production`).
- `--dry-run`: plan-only mode. No POST calls to mutate variables.
- `--confirm-production`: required locally for mutating production.
- `--config`: optional config file path.

## Resolution Precedence

1. CLI flags
2. Environment variables
3. Config file defaults

Missing required values after precedence resolution must fail immediately.

## Exit Codes

- `0`: command completed successfully.
- `2`: invalid invocation (flags, argument shape, unsupported option combination).
- `3`: configuration resolution failure.
- `4`: preflight failure (missing keys, guardrail block, environment mismatch).
- `5`: stage execution failure.
- `6`: schema emission failure.

## CI Policy

- `--env` is mandatory.
- Production mutation requires `ALLOW_PRODUCTION_WRITES=true`.
- If `--dry-run` is enabled, `mutationsApplied` must be `false` in final summary.

## Logging And Output

- Emit machine-readable stage-status events.
- Emit final run-summary event.
- Include `schemaVersion` in every machine-readable payload.
- Keep human logs, but machine-readable payloads are source of truth for automation.