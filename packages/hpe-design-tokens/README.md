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

## License

[Apache-2.0](https://github.com/grommet/hpe-design-system/blob/design-tokens-stable/LICENSE)
