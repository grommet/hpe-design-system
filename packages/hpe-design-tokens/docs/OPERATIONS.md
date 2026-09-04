# hpe-design-tokens Operations Guide

This guide is for maintainers running sync tooling and release-oriented package scripts.

## Command Matrix

| Command                                                                                                                                                                           | When To Use                                                              | Mutates Remote Figma     | Output                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------ | --------------------------------------------------------------- |
| `pnpm sync-tokens-to-figma -- --env=<production\|test> [--dry-run] [--confirm-production] [--bootstrap] [--verbose-plan] [--write-plan <path>] [--plan-stage <stage[,stage...]>]` | Push local JSON tokens to Figma                                          | Yes (unless `--dry-run`) | stage-status and run-summary events, optional stage diff report |
| `pnpm sync-figma-to-tokens -- --env=<production\|test> --output <dir>`                                                                                                            | Pull Figma variables to local JSON for QA or updates                     | No                       | local JSON files + run-summary                                  |
| `pnpm sync-discover-figma-collection-keys -- --env=<production\|test> [--pretty] [--output <path>]`                                                                               | Discover canonical collection keys after bootstrap or during diagnostics | No                       | discovery JSON payload                                          |
| `pnpm test`                                                                                                                                                                       | Validate package unit/integration behavior                               | No                       | vitest results                                                  |
| `pnpm test:contracts`                                                                                                                                                             | Validate schema conformance for sync payloads                            | No                       | vitest results                                                  |
| `pnpm build`                                                                                                                                                                      | Rebuild token outputs                                                    | No                       | dist artifacts                                                  |
| `pnpm release-stable`                                                                                                                                                             | Stable release flow for this package                                     | No                       | release script output                                           |
| `pnpm paddingY:verify`                                                                                                                                                            | Check paddingY consistency                                               | No                       | verification report                                             |
| `pnpm paddingY:update`                                                                                                                                                            | Apply paddingY update automation                                         | No                       | updated token content                                           |

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

To inspect the actual planned variable updates during dry-run:

```bash
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --dry-run --verbose-plan
```

To save the planned stage diff as JSON for review:

```bash
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --dry-run --write-plan contracts/generated/semantic-dry-run-plan.test.json
```

To limit plan output to specific stages:

```bash
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --dry-run --verbose-plan --plan-stage semantic
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --dry-run --write-plan contracts/generated/plan.test.json --plan-stage semantic,component
```

3. Apply sync in test when dry-run output is expected:

```bash
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test
```

4. Pull back to a QA directory and verify expected state:

```bash
pnpm --filter hpe-design-tokens sync-figma-to-tokens -- --env=test --output tokens_qa
```

## Release Runbook

The release process uses Changesets for version and changelog preparation. GitHub and NPM
publication remain protected operations and must not be performed from a local clone.

### 1. Prepare the release PR

For every user-visible token package change, add a Changeset using the policy in
`../../.changeset/README.md`. After the change reaches `master`, the
`Prepare design tokens release PR` workflow creates or updates a PR that runs
`pnpm exec changeset version`.

Review the generated package version and `CHANGELOG.md` before merging that PR. The review must
confirm token impact, semantic-version classification, migration guidance, and the generated
release notes.

### 2. Run candidate preflight

After the version PR is merged, run `HPE Design Tokens Release Preflight` manually with the
approved commit or branch. The workflow checks Changesets, builds the package, runs package
tests, validates generated exports and package metadata, and uploads one candidate tarball.

The equivalent local checks are:

```bash
pnpm exec changeset status
pnpm --filter hpe-design-tokens release:preflight
pnpm --filter hpe-design-tokens release:validate --version=<X.Y.Z>
pnpm --filter hpe-design-tokens release:pack
```

Do not continue if the candidate version, changelog heading, generated exports, or tarball
contents do not match the approved release.

### 3. Publish through protected GitHub Actions

Run `Release hpe-design-tokens` manually with:

- `ref`: the approved commit or branch.
- `version`: the exact version from `package.json`.
- `publish=false`: candidate-only validation.
- `publish=true`: protected publication after the `design-tokens-release` environment approval.

The workflow creates one immutable artifact, creates a draft GitHub release, publishes that
artifact to NPM with provenance, verifies the registry version and a clean consumer install,
then publishes the GitHub release. It uploads release notes and a Slack announcement draft as
workflow evidence. A maintainer must post the Slack announcement manually.

### 4. Handle partial failures

- Candidate failure: fix the version, changelog, build, or test issue and rerun preflight.
- Existing tag: stop and compare the tag target with the approved commit; do not force-move it.
- NPM publication failure after draft creation: inspect the draft release and rerun only after
  confirming the version is not registered or that the workflow can safely resume.
- Registry verification failure: wait for propagation, then verify the exact version and tarball
  before publishing the GitHub release.
- Figma or stable-branch failure: record and recover that side effect separately; it must not
  be silently treated as evidence that NPM publication completed.

## Bootstrap Runbook (Fresh Figma Files)

Use only when collection keys are not established yet.

Prerequisites:

- [ ] Fresh Figma files created
- [ ] Figma file keys added to .env

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

See `../contracts/figma-sync-failure-codes.md` for full error semantics.

## Machine-Readable Outputs

Primary events emitted by sync scripts:

- `preflight-validation`
- `stage-status`
- `run-summary`

Optional human-readable / file outputs for push planning diagnostics:

- `--verbose-plan`: print per-stage planned variable changes as formatted JSON (typically used with `--dry-run`).
- `--write-plan <path>`: write a `planned-stage-diff` JSON report with the per-stage payload details (available in both `--dry-run` and mutating runs).
- `--plan-stage <stage[,stage...]>`: filter plan output to one or more stages (`primitive`, `semantic`, `component`) for both `--verbose-plan` and `--write-plan`.
- `planned-stage-diff` is a plan artifact. Use the final `run-summary` event (`mutationsApplied`) to determine whether writes actually occurred.

Schemas and contracts:

- `../contracts/schemas/`
- `../contracts/figma-sync-cli-contract.md`
- `../contracts/figma-sync-failure-codes.md`
