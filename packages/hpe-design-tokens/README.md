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
- tokens JSON to Figma (progressive key discovery, dry-run first): `pnpm sync-tokens-to-figma-progressive`

Both scripts read environment variables from the current shell environment.

For local development, do not store secrets in a repo-local `.env` file. Store `PERSONAL_ACCESS_TOKEN` in your OS credential manager or approved team secret manager, then export it into your shell only for the current session.

On macOS, you can store the token in Keychain and load it when needed:

```bash
export PERSONAL_ACCESS_TOKEN="$(security find-generic-password -a "$USER" -s hpe-figma-api-cli -w)"
```

To store your Figma personal access token in Keychain for the first time (macOS):

```bash
security add-generic-password -a "$USER" -s hpe-figma-api-cli -w <your-figma-token>
```

This creates a generic Keychain entry that you can retrieve securely without exposing the token in your shell history or configuration files.

Keep non-secret local values such as `FILE_KEY_*` and `FIGMA_*_COLLECTION_KEY` in your shell profile or in an untracked local shell script outside this repository.

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

For `sync-tokens-to-figma-progressive`, only `PERSONAL_ACCESS_TOKEN` is required up front. Missing `FILE_KEY_PRIMITIVE`, `FILE_KEY_SEMANTIC`, and `FILE_KEY_COMPONENT` are discovered interactively at runtime and can be skipped per role.

### Progressive Sync (tokens -> Figma)

Use the progressive script when file keys may be missing or when you want a safe default dry-run:

```bash
cd packages/hpe-design-tokens
pnpm sync-tokens-to-figma-progressive
```

Behavior summary:

- Runs in dry-run mode by default.
- Prompts for missing or invalid role file keys (`primitive`, `semantic`, `component`).
- Accepts either a raw file key or a full Figma `/file/` or `/design/` URL.
- Auto-creates missing variable collections and modes from token files.
- Keeps strict role mapping (primitive tokens sync to primitive file, etc.).
- Prints `export FILE_KEY_*=` lines so you can persist discovered keys manually.

Apply changes to Figma only when ready:

```bash
cd packages/hpe-design-tokens
pnpm sync-tokens-to-figma-progressive -- --apply
```

Optional flags:

- `--role=primitive|semantic|component`: sync only one role.
- `--non-interactive`: do not prompt; skip roles with missing/invalid keys.
- `--single-file=<key|url>`: push all collections into one Figma file (see below).

### Single-file mode (disposable test environments)

When creating fresh Figma files for token validation, use `--single-file` instead of separate per-role file keys.

```bash
cd packages/hpe-design-tokens
pnpm sync-tokens-to-figma-progressive -- --single-file=<figma-file-key>
pnpm sync-tokens-to-figma-progressive -- --single-file=<figma-file-key> --apply
```

In single-file mode all collections — `primitives`, `color`, `dimension`, `global`, `component`, `element` — are merged into one combined payload and pushed to a single Figma file. Cross-collection aliases resolve within the payload via temp IDs without requiring library subscriptions between files.

This mode is ideal for:
- Creating disposable test environments for surface token validation.
- Populating a fresh file from scratch without touching production libraries.
- Validating that `hiddenFromPublishing`, `scopes`, and `codeSyntax` are set correctly on variables.

To create a fresh test file:
1. Create a new blank Figma file and copy its file key.
2. Run dry-run to preview changes: `pnpm sync-tokens-to-figma-progressive -- --single-file=<key>`
3. Apply when ready: `pnpm sync-tokens-to-figma-progressive -- --single-file=<key> --apply`

**Note on multi-file mode and library subscriptions:** The per-role mode (`FILE_KEY_PRIMITIVE/SEMANTIC/COMPONENT`) requires that library subscriptions are already configured in Figma between the files. The semantic file must subscribe to the primitive library and the component file must subscribe to both. These subscriptions are set up in the Figma UI under Team Libraries. Once subscribed, the existing variables appear in each file's local variables response with `remote: true` and cross-file aliases resolve correctly.

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

export PERSONAL_ACCESS_TOKEN="$(security find-generic-password -a "$USER" -s hpe-figma-api-cli -w)"
source ~/hpe-design-tokens.local.sh

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

### Figma API CLI

Use the CLI helper script to inspect and modify variables in a target Figma file:

```bash
cd packages/hpe-design-tokens
pnpm figma-variables-cli
```

The CLI supports interactive and non-interactive modes.

Non-interactive examples:

```bash
cd packages/hpe-design-tokens

# Read local collections from primitive file key env var
pnpm figma-variables-cli -- --action=collections --source=local --role=primitive

# Read published variables from a raw file key with filters
pnpm figma-variables-cli -- --action=variables --source=published --file-key=<figma-file-key> --collection=color --mode=light --max-rows=50

# Post a payload JSON file (requires explicit confirmation flag)
pnpm figma-variables-cli -- --action=post --role=semantic --payload=./payload.json --confirm=YES
```

Supported flags:

- `--action=collections|modes|variables|post`
- `--source=local|published` (read actions only; default is `local`)
- `--role=primitive|semantic|component` or `--file-key=<figma-file-key>`
- `--collection=<name>` and `--mode=<name>` (variables action)
- `--max-rows=<number>` (variables action)
- `--payload=<path>` and `--confirm=YES` (post action)
- `--help`

#### Payload JSON Format For Post Variables

`--action=post` expects a JSON file shaped like `ApiPostVariablesPayload`:

```json
{
	"variableCollections": [
		{
			"action": "CREATE",
			"id": "spacing",
			"name": "spacing",
			"initialModeId": "default"
		}
	],
	"variableModes": [
		{
			"action": "CREATE",
			"id": "compact",
			"name": "compact",
			"variableCollectionId": "spacing"
		}
	],
	"variables": [
		{
			"action": "CREATE",
			"id": "space/small",
			"name": "space/small",
			"variableCollectionId": "spacing",
			"resolvedType": "FLOAT",
			"description": "Small spacing token"
		}
	],
	"variableModeValues": [
		{
			"variableId": "space/small",
			"modeId": "default",
			"value": 8
		},
		{
			"variableId": "space/small",
			"modeId": "compact",
			"value": 6
		}
	]
}
```

Notes:

- Each top-level property is optional, but when present it must be an array.
- For non-interactive post mode, `--confirm=YES` is required.
- Start with a small payload first to validate IDs and aliases before larger updates.

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
