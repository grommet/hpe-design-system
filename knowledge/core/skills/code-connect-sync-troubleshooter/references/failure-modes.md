# Code Connect Sync Failure Modes

Use this reference when `figma:sync` fails or a mapping does not publish correctly.

## Command and Environment

- Preferred root command: `pnpm --filter @hpe-design/code-connect figma:sync`
- Package-local equivalent: `pnpm run figma:sync` from `packages/code-connect`
- Token file location: `packages/code-connect/.env`

## Frequent Failure Sources

### Wrong Figma URL

Symptoms:

- validation error on publish
- mapping connects to the wrong node

Check:

- URL includes `node-id`
- URL points to a `COMPONENT` or `COMPONENT_SET`

### Parser-hostile JSX

Symptoms:

- publish fails unexpectedly
- example output is missing expected props

Check:

- no inline conditionals
- no dynamic iteration
- every declared prop is rendered in `example`

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

- `.env` exists in `packages/code-connect/`
- token scopes match the package README
