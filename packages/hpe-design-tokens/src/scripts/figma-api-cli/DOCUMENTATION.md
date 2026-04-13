# Figma API CLI Documentation

This document explains how to use the Figma API CLI in [figma-api-cli](.).

## What This CLI Can Do

- List variable collections in a Figma file.
- Find a collection by id in one file or across many files.
- List variable modes across collections.
- List variables with optional collection and mode filters.
- Find a variable by id in one file or across many files.
- POST variable changes to Figma with a required safety confirmation.
- Run in:
  - Interactive mode (prompt-based menu)
  - Non-interactive mode (command flags)

## Prerequisites

Run commands from [packages/hpe-design-tokens](../../..).

1. Install dependencies:

```bash
pnpm install
```

2. Provide Figma auth:

- Option A: environment variable

```bash
export PERSONAL_ACCESS_TOKEN="<your-token>"
```

- Option B: macOS Keychain (recommended for local use)

```bash
security add-generic-password -s "hpe-figma-api-cli" -a "PERSONAL_ACCESS_TOKEN" -w "<your-token>"
```

3. (Optional) Configure role-based file keys:

```bash
export FILE_KEY_PRIMITIVE="<figma-file-key>"
export FILE_KEY_SEMANTIC="<figma-file-key>"
export FILE_KEY_COMPONENT="<figma-file-key>"
```

If role env vars are missing, role-based selection is unavailable, but raw file key input still works.

## Run The CLI

### Interactive mode

```bash
pnpm figma-api-cli
```

Interactive menu options:

1. Get variable collections
2. Get variable modes
3. Get variables
4. Get variable by ID
5. Post variables
6. Get collection by ID
7. Exit

### Non-interactive mode

```bash
pnpm figma-api-cli -- --action=<action> [flags]
```

Show built-in help:

```bash
pnpm figma-api-cli -- --help
```

## Local Tests

Run tests from [packages/hpe-design-tokens](../../..).

Run only figma-api-cli tests in this folder:

```bash
pnpm test -- src/scripts/figma-api-cli/__tests__
```

Run the full hpe-design-tokens test suite (includes figma-api-cli tests):

```bash
pnpm test
```

## Non-Interactive Actions And Examples

### 1) collections

Lists variable collections for a target file.

```bash
pnpm figma-api-cli -- --action=collections --source=local --role=primitive
```

With direct file key:

```bash
pnpm figma-api-cli -- --action=collections --source=published --file-key=<figma-file-key>
```

### 2) modes

Lists modes for each collection.

```bash
pnpm figma-api-cli -- --action=modes --source=local --role=semantic
```

### 3) variables

Lists variables and prints a table with:

- name
- id
- collection
- resolvedType
- remote
- previewMode
- previewValue

Example with filters:

```bash
pnpm figma-api-cli -- --action=variables --source=published --file-key=<figma-file-key> --collection=color --mode=light --max-rows=50
```

### 4) variable-by-id

Looks up a variable id. Accepts either plain id or VariableID:<id>.

Search one known file (role):

```bash
pnpm figma-api-cli -- --action=variable-by-id --source=local --role=semantic --variable-id=<variable-id>
```

Enable lookup diagnostics:

```bash
pnpm figma-api-cli -- --action=variable-by-id --variable-id=<variable-id> --debug
```

Search one specific file key:

```bash
pnpm figma-api-cli -- --action=variable-by-id --source=published --file-key=<figma-file-key> --variable-id=<variable-id>
```

Search multiple file keys passed inline (defaults to local + published if --source is omitted):

```bash
pnpm figma-api-cli -- --action=variable-by-id --variable-id=<variable-id> --file-keys=<key1,key2,key3>
```

Search file keys loaded from a file (comma-separated or newline-separated):

```bash
pnpm figma-api-cli -- --action=variable-by-id --variable-id=<variable-id> --file-keys-file=./file-keys.txt
```

Search all configured role file keys by default:

```bash
pnpm figma-api-cli -- --action=variable-by-id --variable-id=<variable-id>
```

### 5) collection-by-id

Looks up a collection by exact collection id.

Search one known file (role):

```bash
pnpm figma-api-cli -- --action=collection-by-id --source=local --role=semantic --collection-id=<collection-id>
```

Search one specific file key:

```bash
pnpm figma-api-cli -- --action=collection-by-id --source=published --file-key=<figma-file-key> --collection-id=<collection-id>
```

Search multiple file keys passed inline (defaults to local + published if --source is omitted):

```bash
pnpm figma-api-cli -- --action=collection-by-id --collection-id=<collection-id> --file-keys=<key1,key2,key3>
```

Search file keys loaded from a file (comma-separated or newline-separated):

```bash
pnpm figma-api-cli -- --action=collection-by-id --collection-id=<collection-id> --file-keys-file=./file-keys.txt
```

Search all configured role file keys by default:

```bash
pnpm figma-api-cli -- --action=collection-by-id --collection-id=<collection-id>
```

Enable lookup diagnostics:

```bash
pnpm figma-api-cli -- --action=collection-by-id --collection-id=<collection-id> --debug
```

### 6) post

Posts variable changes to Figma.

Safety behavior:

- Non-interactive mode requires --confirm=YES.
- Interactive mode asks you to type YES.

Example:

```bash
pnpm figma-api-cli -- --action=post --role=semantic --payload=./payload.json --confirm=YES
```

## Flags Reference

Required and optional flags by action:

- --action=collections|collection-by-id|modes|variables|variable-by-id|post
- --source=local|published
  - Read actions default to local when a single-target action uses role or file-key.
  - For collection-by-id and variable-by-id multi-target searches, source defaults to local and published when omitted.
- --role=primitive|semantic|component
- --file-key=<figmaFileKey>
- --file-keys=<k1,k2,...> (collection-by-id / variable-by-id)
- --file-keys-file=<path> (collection-by-id / variable-by-id)
- --collection-id=<id> (collection-by-id, exact id match)
- --collection=<name> (variables)
- --mode=<name> (variables)
- --max-rows=<number> (variables, default 100)
- --variable-id=<id> (variable-by-id)
- --debug (collection-by-id / variable-by-id lookup diagnostics)
- --payload=<path/to/json> (post)
- --confirm=YES (post, non-interactive required)
- --help

Target selection rules:

- Use either --role or --file-key for single-target actions.
- collection-by-id and variable-by-id support --file-keys and --file-keys-file for multi-target lookup.

## Payload Format For POST

The payload JSON can include any of these array fields:

- variableCollections
- variableModes
- variables
- variableModeValues

Each provided field must be an array.

Minimal example payload:

```json
{
  "variableCollections": [],
  "variableModes": [],
  "variables": [],
  "variableModeValues": []
}
```

When POST succeeds, the CLI prints tempIdToRealId mappings returned by Figma.

## Example Workflows

### Inspect local semantic variables

```bash
pnpm figma-api-cli -- --action=collections --source=local --role=semantic
pnpm figma-api-cli -- --action=modes --source=local --role=semantic
pnpm figma-api-cli -- --action=variables --source=local --role=semantic --collection=color --max-rows=200
```

### Locate a variable id anywhere you know about

```bash
pnpm figma-api-cli -- --action=variable-by-id --variable-id=VariableID:1234:5678
```

### Locate a collection id across known files

```bash
pnpm figma-api-cli -- --action=collection-by-id --collection-id=9479:10
```

### Safe non-interactive write

```bash
pnpm figma-api-cli -- --action=post --file-key=<figma-file-key> --payload=./payload.json --confirm=YES
```

## Troubleshooting

- No Figma PAT found:
  - Set PERSONAL_ACCESS_TOKEN or store it in macOS Keychain using the command in Prerequisites.
- Error saying role env var is required:
  - Export FILE_KEY_PRIMITIVE, FILE_KEY_SEMANTIC, or FILE_KEY_COMPONENT.
- variable-by-id returns no matches:
  - Check source scope (local vs published).
  - Try multi-target search with --file-keys or --file-keys-file.
  - Confirm the id is valid; VariableID:<id> is normalized automatically.
- collection-by-id returns no matches:
  - Confirm you used the exact collection id.
  - Check source scope (local vs published).
  - Try multi-target search with --file-keys or --file-keys-file.
- POST rejected:
  - Confirm payload path exists and JSON is valid.
  - Confirm payload fields are arrays when present.
  - Ensure --confirm=YES is provided in non-interactive mode.
