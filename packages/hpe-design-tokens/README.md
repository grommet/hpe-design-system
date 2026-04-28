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

This package supports two sync directions:

- Figma to tokens JSON: `pnpm sync-figma-to-tokens -- --env=production --output tokens`
- tokens JSON to Figma: `pnpm sync-tokens-to-figma -- --env=production`
- read-only collection key discovery: `pnpm sync-discover-figma-collection-keys -- --env=test --pretty`

For environment-isolated test/prod sync design and rollout details, see [FIGMA_ENVIRONMENT_SYNC_PLAN.md](FIGMA_ENVIRONMENT_SYNC_PLAN.md).

Both scripts read environment variables from a local `.env` file.

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
  - Fetch local variables for each file and read `meta.variableCollections[*].key` for the collections named `color`, `dimension`, `primitives`, and `global`.

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

### Local Test Run

```bash
cd packages/hpe-design-tokens

## `--output tokens` is the checked in source directory
## running the script with this option will likely create a large diff
pnpm sync-figma-to-tokens -- --env=production --output tokens

## OR
## For QAing test runs, it may be useful to omit `--output tokens`
## The script default will output to `tokens_new`.
pnpm sync-figma-to-tokens -- --env=test
```

### Read-Only Collection Key Discovery

Use this to inspect and validate candidate remote collection keys before syncing.

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
