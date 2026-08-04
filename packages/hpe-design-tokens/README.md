# hpe-design-tokens

Design tokens for use with the HPE Design System.

## Documentation Index

- Consumer usage: [HPE Design System design tokens documentation](https://design-system.hpe.design/design-tokens)
- Contributor workflow: [CONTRIBUTING.md](CONTRIBUTING.md)
- Maintainer operations and runbooks: [docs/OPERATIONS.md](docs/OPERATIONS.md)
- Environment-isolated sync implementation context: [docs/FIGMA_ENVIRONMENT_SYNC_PLAN.md](docs/FIGMA_ENVIRONMENT_SYNC_PLAN.md)
- Sync data model and flow details: [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md)
- Sync contracts: [contracts/README.md](contracts/README.md)

## Install

With pnpm:

```
pnpm i hpe-design-tokens
```

With yarn:

```
yarn add hpe-design-tokens
```

With npm:

```
npm i hpe-design-tokens
```

## Usage

For usage instructions, see [HPE Design System design tokens documentation](https://design-system.hpe.design/design-tokens).

## Quick Start (Maintainers)

From repository root:

```bash
pnpm --filter hpe-design-tokens test
pnpm --filter hpe-design-tokens test:contracts
pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --dry-run
```

See [docs/OPERATIONS.md](docs/OPERATIONS.md) for full sync runbooks, troubleshooting, and script coverage.

## Semantic Color Parity Contract

Semantic color import/export behavior is protected by parity tests and golden fixtures.

Terminology note: in this monorepo, treat these parity artifacts as
`snapshot` files (referred to here as `golden` fixtures). They are contract
snapshots and should be updated only for intentional behavior changes, with
review of the resulting diff.

Semantic role metadata note:

- `role: null` means the token path does not include a semantic role segment.
- `role.family` identifies the role family grouping (e.g. `accent`); it is `null`
  for single-slot roles such as `disabled`.
- `role.intent` is the canonical role name within its target (e.g. `primary`,
  `disabled`, `purple`).
- `role.variant` is a deprecated alias for `role.intent` and mirrors its value.

- Parity scope:
  - Legacy-vs-new adapter equivalence tests (`semantic_color_figma_adapter_parity.test.ts`).
  - Golden output verification for export token output and import payload output (`semantic_color_payload_golden.test.ts`).
  - Boundary vectors for non-canonical accent naming in both directions:
    - Export fixture coverage for incoming Figma names such as `color/background/accent/purple-custom`.
    - Import fixture coverage for aliases such as `color/background/accent/purple/custom/REST` that must resolve to canonical variable IDs.
- Golden fixtures:
  - `src/tests/fixtures/semantic-color-parity/export-output.golden.json`
  - `src/tests/fixtures/semantic-color-parity/import-output.golden.json`

### When Golden Fixtures Should Change

Update golden fixtures only when semantic color normalization or payload behavior intentionally changes.

Examples:

- Introducing a deliberate naming contract change in import/export.
- Adjusting canonical mapping behavior for accent, focus, transparent, or interaction/scale handling.

Do not update fixtures to bypass a failing test without understanding the behavior delta.

### Required Workflow Before PR

From repository root:

Always run:

```bash
pnpm --filter hpe-design-tokens run test:parity
pnpm --filter hpe-design-tokens test -- src/tests/token_export.test.ts src/tests/token_import.test.ts src/tests/token_import_alias_resolution.test.ts src/tests/semantic_color_parser.test.ts
```

Run this only when you intentionally changed semantic color import/export behavior and expect golden fixture output updates:

```bash
pnpm --filter hpe-design-tokens run test:parity:update
```

If fixture files change, include them in the same commit as the code change that caused the intentional behavior delta.

## License

[Apache-2.0](https://github.com/grommet/hpe-design-system/blob/design-tokens-stable/LICENSE)
