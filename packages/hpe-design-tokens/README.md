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

- Figma to tokens JSON: `pnpm sync-figma-to-tokens -- --output tokens`
- tokens JSON to Figma: `pnpm sync-tokens-to-figma`

For environment-isolated test/prod sync design and rollout details, see [FIGMA_ENVIRONMENT_SYNC_PLAN.md](FIGMA_ENVIRONMENT_SYNC_PLAN.md).

Both scripts read environment variables from a local `.env` file.

### Required Environment Variables

The following are required for `sync-figma-to-tokens` and `sync-tokens-to-figma`:

- `PERSONAL_ACCESS_TOKEN`: Figma personal access token used in the `X-Figma-Token` request header.
- `FILE_KEY_PRIMITIVE`: Figma file key for the primitives token file.
- `FILE_KEY_SEMANTIC`: Figma file key for the semantic token file.
- `FILE_KEY_COMPONENT`: Figma file key for the component token file.
- `FIGMA_COLOR_COLLECTION_KEY`: Expected remote collection key for `color`.
- `FIGMA_DIMENSION_COLLECTION_KEY`: Expected remote collection key for `dimension`.
- `FIGMA_PRIMITIVES_COLLECTION_KEY`: Expected remote collection key for `primitives`.
- `FIGMA_GLOBAL_COLLECTION_KEY`: Expected remote collection key for `global`.

Collection keys are used by reference validation in `verifyReferences` to detect invalid cross-file references.

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
pnpm sync-figma-to-tokens -- --output tokens

## OR
## For QAing test runs, it may be useful to omit `--output tokens`
## The script default will output to `tokens_new`.
pnpm sync-figma-to-tokens
```

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
