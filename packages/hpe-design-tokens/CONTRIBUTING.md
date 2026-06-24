# Contributing To hpe-design-tokens

This guide is package-specific. For repository-wide contribution policies, also read `../../CONTRIBUTING.md`.

## Scope

Use this package when you are:

- Updating token source JSON in `tokens/`
- Changing token build/transforms under `src/`
- Running Figma sync tooling for test or production environments
- Updating sync contracts and schemas under `contracts/`

## Prerequisites

- Node.js and pnpm installed
- Repository dependencies installed from workspace root:

```bash
pnpm install
```

- Figma credentials/config present when running sync scripts:
  - Copy `.env.example` to `.env`
  - Populate environment-scoped values

## Local Development Workflow

1. Edit token source files in `tokens/`.
2. Run package tests:

```bash
pnpm --filter hpe-design-tokens test
pnpm --filter hpe-design-tokens test:contracts
```

3. If your change affects Figma sync behavior, validate in test first:

```bash
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --dry-run
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test
pnpm --filter hpe-design-tokens sync-figma-to-tokens -- --env=test --output tokens_qa
```

4. Compare expected token diffs and ensure no unintended churn.

## Tests And Where To Add Them

- `src/tests/figma_sync_config.test.ts`
  - Add tests for config/env resolution and production guardrails.
- `src/tests/sync_events.test.ts`
  - Add tests for machine-readable event payloads and error normalization.
- `src/tests/sync_contract_schemas.test.ts`
  - Add tests when changing run-summary or stage-status payload shape.
- `src/tests/token_import*.test.ts`
  - Add tests for alias resolution and token import behavior.
- `src/tests/build.test.ts`, `src/tests/color.test.ts`
  - Add tests for build and token utility behavior.

## Sync Safety Rules

- Prefer `--env=test` for development and validation.
- Use `--dry-run` before mutating test files.
- Local production mutations require `--confirm-production`.
- CI production mutations require `ALLOW_PRODUCTION_WRITES=true`.
- Use `--bootstrap` only for first-time setup of fresh Figma files, then switch back to normal mode after discovering collection keys.

## Documentation Update Expectations

When behavior changes, update docs in the same PR:

- `README.md` for package entrypoints
- `OPERATIONS.md` for runbooks and command usage
- `contracts/figma-sync-cli-contract.md` for command/flag/output contracts
- `contracts/figma-sync-failure-codes.md` for error code semantics

## Pull Request Checklist

- Tests pass locally for impacted areas
- Any sync-related change validated with test environment command examples
- Contract/schema updates included when payload behavior changes
- Docs updated for new flags, scripts, or safety semantics
