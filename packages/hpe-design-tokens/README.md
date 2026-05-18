# hpe-design-tokens

Design tokens for use with the HPE Design System.

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

## Figma Sync Setup

This package includes scripts for syncing design tokens between JSON source files and Figma. Two sync directions are supported, plus a read-only discovery command:

| Command | Purpose |
|---|---|
| `pnpm sync-tokens-to-figma -- --env=<env> [--dry-run] [--confirm-production]` | Push JSON tokens to Figma |
| `pnpm sync-figma-to-tokens -- --env=<env> --output <dir>` | Pull Figma variables back to JSON |
| `pnpm sync-discover-figma-collection-keys -- --env=<env> --pretty` | Inspect remote collection keys (read-only) |

For environment-isolated test/prod sync design and rollout details, see [FIGMA_ENVIRONMENT_SYNC_PLAN.md](FIGMA_ENVIRONMENT_SYNC_PLAN.md).

All scripts read environment variables from a local `.env` file (see `.env.example`).

### Architecture Overview

Tokens are managed across three Figma files in a directed dependency chain:

| Tier | Role | Collections owned |
|---|---|---|
| `primitive` | Base values — raw colors, spacing scales, etc. | `primitives` |
| `semantic` | Semantic decisions — themed color roles, dimension roles | `color`, `dimension`, `global` |
| `component` | Component-level tokens; subscribes to the semantic library | `component`, `element` |

**Push (`sync-tokens-to-figma`):** stages run sequentially — `primitive` → `semantic` → `component`. Each stage fetches the previous stage's published variables to resolve cross-file aliases before posting mutations to Figma.

**Pull (`sync-figma-to-tokens`):** reads live Figma variable state and writes it to the JSON token files in `tokens/`.

**Preflight validation** runs before any mutations and confirms that all remote collection references in the Figma files point to the expected canonical library keys configured in `.env`. A run aborts with `PREFLIGHT_FAILED` if any reference is stale. For data model details, see [DOCUMENTATION.md](DOCUMENTATION.md).

### Required Environment Variables

The following are required for `sync-figma-to-tokens` and `sync-tokens-to-figma`:

- `PRODUCTION_PERSONAL_ACCESS_TOKEN` or `TEST_PERSONAL_ACCESS_TOKEN`: Figma personal access token used in the `X-Figma-Token` request header.
- `PRODUCTION_FILE_KEY_*` or `TEST_FILE_KEY_*`: Figma file keys for `primitive`, `semantic`, and `component` token files.
- `PRODUCTION_FIGMA_*_COLLECTION_KEY` or `TEST_FIGMA_*_COLLECTION_KEY`: Expected remote collection keys for `color`, `dimension`, `primitives`, and `global`.

Collection keys are used by reference validation in `verifyReferences` to detect invalid cross-file references.

Legacy unscoped variable names (`FILE_KEY_*`, `FIGMA_*_COLLECTION_KEY`, `PERSONAL_ACCESS_TOKEN`) remain supported for `--env=production`.

### How To Source Values

1. `PERSONAL_ACCESS_TOKEN`
  - Create in Figma account settings under Personal access tokens.
2. `FILE_KEY_*`
  - Open each Figma file URL and copy the segment after `/file/` or `/design/` (the file key).
3. `FIGMA_*_COLLECTION_KEY`
  - Run `pnpm sync-discover-figma-collection-keys -- --env=<env> --pretty` to list all remote collection keys across the three files and identify the correct key for each collection name.
  - Alternatively, fetch local variables for each file directly and read `meta.variableCollections[*].key` for collections named `color`, `dimension`, `primitives`, and `global`.
  - When setting up a brand-new Figma environment, leave these blank and use `--bootstrap` on the first push (see below).

Example command to distinguish collection instances across files:

```bash
cd packages/hpe-design-tokens
set -a
source .env
set +a

{
	printf "ROLE\tNAME\tKEY\tID\tREMOTE\tVARIABLE_COUNT\tMODES\n"

	for pair in "primitive:$FILE_KEY_PRIMITIVE" "semantic:$FILE_KEY_SEMANTIC" "component:$FILE_KEY_COMPONENT"; do
		role="${pair%%:*}"
		file_key="${pair#*:}"
		curl -sS \
			-H "X-Figma-Token: $PERSONAL_ACCESS_TOKEN" \
			"https://api.figma.com/v1/files/$file_key/variables/local" \
		| jq -r --arg role "$role" '
				.meta.variableCollections
				| to_entries[]
				| .value
				| select(.name=="color" or .name=="dimension" or .name=="primitives" or .name=="global")
				| [
						$role,
						.name,
						.key,
						.id,
						(.remote|tostring),
						((.variableIds|length)|tostring),
						(.modes|map(.name)|join("|"))
					]
				| @tsv
			'
	done
} | column -t -s $'\t' | awk 'NR==1{print "\033[1;36m"$0"\033[0m"; next}1'
```

Columns in output:

- role
- name
- key
- id
- remote
- variable_count
- modes

### Bootstrap: Setting Up a New Figma Environment

When pointing the sync at brand-new Figma files whose collection keys are not yet known, use `--bootstrap` to skip key validation on the first push:

```bash
cd packages/hpe-design-tokens

# 1. Push tokens to the new files (skips collection-key validation)
pnpm sync-tokens-to-figma -- --env=test --bootstrap

# 2. Discover the collection keys Figma assigned
pnpm sync-discover-figma-collection-keys -- --env=test --pretty

# 3. Populate TEST_FIGMA_*_COLLECTION_KEY in .env with the discovered keys.
#    All subsequent runs should omit --bootstrap.
pnpm sync-tokens-to-figma -- --env=test
```

Do not use `--bootstrap` in CI or for routine production syncs.

### Running the Sync

```bash
cd packages/hpe-design-tokens

# Push tokens to test Figma files — dry-run (plan what would change, no mutations)
pnpm sync-tokens-to-figma -- --env=test --dry-run

# Push tokens to test Figma files — apply mutations
pnpm sync-tokens-to-figma -- --env=test

# Push tokens to production — requires --confirm-production locally
pnpm sync-tokens-to-figma -- --env=production --confirm-production

# Pull Figma variables to a local directory for QA / diffing
pnpm sync-figma-to-tokens -- --env=test --output tokens_qa

# Pull to the checked-in tokens/ directory (produces a diff if anything changed)
pnpm sync-figma-to-tokens -- --env=production --output tokens
```

### Read-Only Collection Key Discovery

Use this to inspect candidate remote collection keys before syncing, or as the required follow-up step after a `--bootstrap` push to discover the keys Figma assigned and populate your `.env`.

Example commands:

```bash
cd packages/hpe-design-tokens

# Print compact machine-readable JSON to stdout
pnpm sync-discover-figma-collection-keys -- --env=test

# Pretty print and save report to a file
pnpm sync-discover-figma-collection-keys -- --env=test --pretty --output contracts/generated/figma-collection-key-discovery.test.json
```

Machine-readable report fields include:

- `eventType`: `collection-key-discovery`
- `environment`
- `files`: per-tier remote collections observed
- `collections`: candidates, configured key, and recommendation per collection name
- `conflicts`: collection names with multiple candidate keys

The discovery command is read-only: it performs only Figma GET requests and does not post mutations.

Committed contract assets live in `contracts/schemas` and hand-authored docs in `contracts/*.md`.
Generated diagnostics output should be written under `contracts/generated/`.

### GitHub Actions Branch Targeting For Tests

If you want manual workflow tests to target `your-branch-name`, update `.github/workflows/sync-figma-to-tokens.yml`:

1. Add `your-branch-name` under `workflow_dispatch.inputs.branch.options`.
2. Set checkout ref to selected input branch:
	- `ref: ${{ github.event.inputs.branch || github.ref_name }}`
3. Set PR base fallback for manual testing:
	- `base: ${{ github.event.inputs.branch || 'your-branch-name' }}`

This keeps manual runs explicit and predictable when validating Figma sync behavior.

## License

[Apache-2.0](https://github.com/grommet/hpe-design-system/blob/design-tokens-stable/LICENSE)
