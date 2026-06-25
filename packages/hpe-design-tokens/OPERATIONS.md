# hpe-design-tokens Operations Guide

This guide is for maintainers running sync tooling and release-oriented package scripts.

## Command Matrix

| Command | When To Use | Mutates Remote Figma | Output |
|---|---|---|---|
| `pnpm sync-tokens-to-figma -- --env=<production\|test> [--dry-run] [--confirm-production] [--bootstrap]` | Push local JSON tokens to Figma | Yes (unless `--dry-run`) | stage-status and run-summary events |
| `pnpm sync-figma-to-tokens -- --env=<production\|test> --output <dir>` | Pull Figma variables to local JSON for QA or updates | No | local JSON files + run-summary |
| `pnpm sync-discover-figma-collection-keys -- --env=<production\|test> [--pretty] [--output <path>]` | Discover canonical collection keys after bootstrap or during diagnostics | No | discovery JSON payload |
| `pnpm test` | Validate package unit/integration behavior | No | vitest results |
| `pnpm test:contracts` | Validate schema conformance for sync payloads | No | vitest results |
| `pnpm build` | Rebuild token outputs | No | dist artifacts |
| `pnpm release-stable` | Stable release flow for this package | No | release script output |
| `pnpm paddingY:verify` | Check paddingY consistency | No | verification report |
| `pnpm paddingY:update` | Apply paddingY update automation | No | updated token content |

## Recommended Day-To-Day Flow

1. Validate local package behavior:

```bash
pnpm --filter hpe-design-tokens test
pnpm --filter hpe-design-tokens test:contracts
```

2. Preview sync changes in test with dry-run:

```bash
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --dry-run
```

3. Apply sync in test when dry-run output is expected:

```bash
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test
```

4. Pull back to a QA directory and verify expected state:

```bash
pnpm --filter hpe-design-tokens sync-figma-to-tokens -- --env=test --output tokens_qa
```

## Bootstrap Runbook (Fresh Figma Files)

Use only when collection keys are not established yet.

1. First push in bootstrap mode:

```bash
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --bootstrap
```

2. Discover assigned keys:

```bash
pnpm --filter hpe-design-tokens sync-discover-figma-collection-keys -- --env=test --pretty --output contracts/generated/figma-collection-key-discovery.test.json
```

3. Populate `TEST_FIGMA_*_COLLECTION_KEY` values in `.env`.
4. Re-run without bootstrap and continue normal operations.

Policy: do not use bootstrap for routine production syncs.

## Troubleshooting Quick Reference

- `PREFLIGHT_FAILED`
  - Cause: collection key mismatch, guardrail failure, or invalid cross-file references.
  - Actions: verify `--env`, ensure expected collection keys are correct, and inspect reference validation output.

- `ALIAS_NOT_FOUND`
  - Cause: alias target is missing from resolved lookup.
  - Actions: verify canonical token paths, upstream dependency file state, and stage ordering assumptions.

- `ALIAS_COLLISION`
  - Cause: duplicate alias candidates after normalization.
  - Actions: resolve duplicate naming and rerun stage.

- Production mutation blocked
  - Local: add `--confirm-production`.
  - CI: set `ALLOW_PRODUCTION_WRITES=true`.

See `contracts/figma-sync-failure-codes.md` for full error semantics.

## Machine-Readable Outputs

Primary events emitted by sync scripts:

- `preflight-validation`
- `stage-status`
- `run-summary`

Schemas and contracts:

- `contracts/schemas/`
- `contracts/figma-sync-cli-contract.md`
- `contracts/figma-sync-failure-codes.md`

