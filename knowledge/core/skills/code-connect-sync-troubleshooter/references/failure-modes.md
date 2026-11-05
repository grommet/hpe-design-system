# Code Connect Sync Failure Modes

Use this reference when `figma:sync` fails or a mapping does not publish correctly.

## Command and Environment

- Preferred root command: `pnpm --filter @hpe-design/code-connect figma:sync`
- Package-local equivalent: `pnpm run figma:sync` from `knowledge/code-connect`
- Token file location: `knowledge/code-connect/.env`

## Frequent Failure Sources

### Wrong Figma URL

Symptoms:

- validation error on publish
- mapping connects to the wrong node

Check:

- URL includes `node-id`
- URL points to a `COMPONENT` or `COMPONENT_SET`

### Legacy mapping format

Symptoms:

- publish fails unexpectedly
- example output is missing expected props

Check:

- v2 uses `.figma.ts` templates, not JSX `figma.connect` mappings
- `figma.config.json` includes `src/**/*.figma.ts`
- every mapped value is rendered in the exported snippet

### CLI dependency errors

`ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL` is a wrapper, not the underlying cause.
`No config file found ... proceeding with default options` is informational.
If `minimatch` throws `brace_expansion_1.expand is not a function`, ensure the
root `brace-expansion` override applies only to version-1 consumers, then reinstall.

### Mapping drift

Symptoms:

- publish succeeds but Dev Mode output is wrong
- props no longer match the live component API

Check:

- compare the mapping with the current component API
- compare with the nearest working mapping in the same family

### Authentication or token scope issues

Symptoms:

- unauthorized or publish errors

Check:

- `.env` exists in `knowledge/code-connect/`
- token scopes match the package README
- `403 Token expired` requires a replacement token in the gitignored package `.env`
