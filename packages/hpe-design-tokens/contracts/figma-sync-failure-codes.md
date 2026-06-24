# Figma Sync Failure Code Catalog (Phase 0 Freeze)

Status: frozen for Phase 1 implementation.
Version: 1.0.0

## Global Codes

- `INVALID_INVOCATION`: unsupported flags or invalid argument combination.
- `CONFIG_RESOLUTION_FAILED`: required config could not be resolved.
- `PREFLIGHT_FAILED`: preflight checks failed.
- `PRODUCTION_GUARDRAIL_BLOCKED`: production mutation blocked by policy.
- `SCHEMA_EMIT_FAILED`: failed to emit required machine-readable payload.
- `STAGE_FAILED`: stage failed for non-classified reason.

## Alias Codes

- `ALIAS_NOT_FOUND`: alias target missing in resolved environment map.
- `ALIAS_COLLISION`: multiple alias candidates after normalization.
- `ALIAS_CROSS_TIER_INVALID`: alias points to disallowed tier.

## Stage Codes

- `STAGE_PRIMITIVE_FAILED`
- `STAGE_SEMANTIC_FAILED`
- `STAGE_COMPONENT_FAILED`

## Required Error Fields

Each emitted error payload must include:

- `code`
- `message`
- `stage` (if applicable)
- `environment`
- `tokenPath` (for token/alias errors)
- `sourceFile` (for token/alias errors)
- `remediation`

## Retry Guidance

- Alias and config failures are non-retryable until corrected.
- Remote service/transient stage failures are retryable.