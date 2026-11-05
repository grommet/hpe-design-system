---
name: Code Connect Component Guidelines
description: 'Planning inputs, template structure, and property mapping rules for Code Connect v2.'
applyTo: '**/*.figma.{js,jsx,ts,tsx}'
---

# Code Connect Component Guidelines

## Planning Inputs

1. Verify the target Grommet component's real public JSX API.
2. Obtain the exact Figma `COMPONENT` or `COMPONENT_SET` URL including `node-id`.
3. Inspect the component property inventory using the Code Connect context tool.
4. Choose the component-family folder using [file-structure.instructions.md](file-structure.instructions.md).
5. Reuse the nearest existing `.figma.ts` template.

## Template Format

Use Code Connect v2 parserless templates, not `figma.connect(...)` or JSX source files.
Import the template runtime from `figma`. Put Grommet and icon imports in the exported
`imports` array so they appear in the generated snippet, not in the template runtime.

```ts
// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2133-694
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Button/Button.js
// component=Button
import figma from 'figma';

const label = figma.selectedInstance.getString('Label');

export default {
  id: 'Button',
  imports: ["import { Button } from 'grommet';"],
  example: figma.code`<Button${figma.helpers.react.renderProp('label', label)} />`,
  metadata: { nestable: true },
};
```

- Preserve the leading `url`, `source`, and `component` directives.
- Use a stable component ID and the correct upstream source URL, not a local
  `node_modules/.pnpm` path.
- Keep template IDs unique across the package. The ID identifies the mapping,
  while `component` and `source` identify the emitted code component. For example,
  NumberInput has ID `NumberInput` but emits Grommet `TextInput type="number"`.
- Use `@hpe-design/icons-grommet` for snippet icons, never `grommet-icons`.
- Use `figma.code` for snippets; do not concatenate structured template results.

## Property Mapping

| Figma property  | Template API                                                 |
| --------------- | ------------------------------------------------------------ |
| Text            | `figma.selectedInstance.getString('Label')`                  |
| Boolean         | `figma.selectedInstance.getBoolean('Disabled')`              |
| Variant         | `figma.selectedInstance.getEnum('Size', { small: 'small' })` |
| Instance swap   | `figma.selectedInstance.getInstanceSwap('Icon')`             |
| Nested instance | `figma.selectedInstance.findInstance('Layer name')`          |
| Text layer      | `figma.selectedInstance.findText('Layer name')`              |
| Slot            | `figma.selectedInstance.getSlot('Content')`                  |

- Match property names and enum options exactly, stripping API ID suffixes such as
  `#70:14`. Account for all relevant properties and document intentional omissions.
- Distinguish BOOLEAN properties from string-valued VARIANT options named `true`
  and `false`. Use `getBoolean` for actual boolean toggles; do not compare them to
  strings copied from legacy variant filters.
- Map all known enum options; use `undefined` only when omission is intentional.
- Render every mapped value. Prefer `figma.helpers.react.renderProp(name, value)`
  to preserve React quoting, booleans, object props, and omitted `undefined` values.
- `renderProp` omits `false` as well as `undefined`. Use it only when omitting
  `false` preserves the component's behavior; otherwise emit an explicit
  `prop={false}` snippet for that state.
- Use `figma.helpers.react.object`, `.array`, and `.function` for structured code
  values. Do not insert raw functions or stringify nested template sections.
- Branch in TypeScript when a state changes snippet structure. The v1 restriction
  against conditionals in an `example` function does not apply to v2 templates.
- Resolve swapped or configurable child instances dynamically. Check
  `type === 'INSTANCE'` before executing their templates.
- Use `getSlot` only for Figma SLOT properties, not INSTANCE_SWAP properties.
  Keep nested snippet sections structured and do not gate execution on
  `hasCodeConnect()`; the runtime handles unconnected instances.
- Keep static representative compositions when there is no useful Figma-driven
  equivalent. Mirror the actual Grommet API rather than inventing props.

## Validation and Publishing

```bash
pnpm --filter @hpe-design/code-connect typecheck
pnpm --filter @hpe-design/code-connect exec figma connect parse
pnpm --filter @hpe-design/code-connect figma:sync
```

Parsing checks discovery and bundling; it does not prove runtime output matches
every Figma state. Preview representative variants and inspect Dev Mode when a
valid token is available.

Load the token from the gitignored package `.env`, never from a command argument
or source file. Do not report publishing as successful until sync exits `0`.

## Related References

- [file-structure.instructions.md](file-structure.instructions.md)
- [figma-mcp.instructions.md](figma-mcp.instructions.md)
- [guidelines.instructions.md](guidelines.instructions.md)
- [coding-guidelines.instructions.md](../standards/coding-guidelines.instructions.md)
