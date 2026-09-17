---
name: derive-prop-types
description: Derives a component's documented props strictly from its TypeScript definition, with no invented or extra props.
inputs:
  - Component name
  - Component's TypeScript definition (grommet `index.d.ts` `<Name>Props` interface)
  - Target schema reference (`ComponentProp` in `knowledge/core/data/types.ts`)
outputs:
  - `props` array whose entries map one-to-one to the TypeScript definition
  - List of props that could not be resolved to a type and need human review
version: 1.0.0
---

## Purpose

Produce the `props` array for a component definition so that it is an exact reflection of
the component's TypeScript type — every documented prop comes from the type, and no prop
outside the type is ever added.

## Inputs

- Component name
- The component's grommet TypeScript definition (`<Name>Props` interface)
- Target schema reference (`ComponentProp` in `knowledge/core/data/types.ts`)

## Outputs

- `props` array whose entries map one-to-one to the TypeScript definition
- Gap list of props that could not be resolved to a type and need human review

## Procedure

1. Resolve the grommet TypeScript definition — the **single source of truth** for props — at
   `node_modules/grommet/components/<Name>/index.d.ts`, the exported `<Name>Props` interface
   (e.g. `ButtonProps` in `node_modules/grommet/components/Button/index.d.ts`).
2. Read the exported props interface/type in full, including any extended or imported
   member types (e.g. `A11yTitleType`, `MarginType`) so each prop's type is accurate.
3. For each member of the interface, emit one `ComponentProp` entry:
   - `name` — the exact property key from the type.
   - `type` — the resolved TypeScript type. Normalize union literals to a readable form
     (e.g. `'start' | 'center' | 'end'`); preserve `boolean`, `string`, `number`, and
     object/function shapes faithfully.
   - `required` — `true` only when the member is non-optional (no `?`); otherwise `false`.
   - `description` — a single concise sentence describing the prop. Reuse description text
     from the source MDX when it matches the same prop; otherwise summarize from the type
     and JSDoc. Never invent behavior the type does not support.
   - `defaultValue` — include only when the default is explicit in the type, JSDoc, or
     existing documentation; otherwise omit.
4. Validate each entry against the `ComponentProp` interface in
   `knowledge/core/data/types.ts`.
5. Record any member whose type cannot be resolved in the gap list rather than guessing.

## Failure Handling

- If the grommet TypeScript definition cannot be found, emit an empty `props` array (`props: []`) and
  add a blocking gap note naming the paths searched for human review.
- If a member's type references an unresolved imported type, keep the prop but mark its type
  for review in the gap list.
- If existing documentation lists a prop absent from the definition, drop it from `props` and
  log it as a candidate for removal/verification — do not carry it forward.

## Reuse Constraints

- Requires read access to the grommet TypeScript definition.
- Must remain deterministic for the same definition input.
- Should not embed capability-specific paths beyond the grommet resolution path above.
