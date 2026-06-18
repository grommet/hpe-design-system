---
name: derive-prop-types
description: Derives a component's documented props strictly from its TypeScript definition, with no invented or extra props.
inputs:
  - Component name
  - Component's TypeScript definition (grommet `index.d.ts` `<Name>Props` interface or `@shared/aries-core` types)
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

## Authoritative source

The component's TypeScript definition is the **single source of truth** for props. Resolve it
in this order and stop at the first match:

1. **Grommet components** — `node_modules/grommet/components/<Name>/index.d.ts`, the exported
   `<Name>Props` interface (e.g. `ButtonProps` in `grommet/components/Button/index.d.ts`).
2. **`@shared/aries-core` components** — the component's `.d.ts` / `.tsx` type or interface
   under `shared/aries-core/`.
3. **Local app components** — the exported props `interface`/`type` co-located with the
   component source.

If no TypeScript definition can be located, do **not** infer props from prose, examples, or
prior knowledge. Emit an empty `props` array (or omit the field), and record the gap for human
review.

## Procedure

1. Resolve the authoritative TypeScript definition using the order above.
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

## Hard constraints

- **Derive every prop from the TypeScript definition.** A prop may appear in `props` only if
  it exists in the resolved interface/type.
- **Never add props that are not in the definition.** Do not introduce props from memory,
  from other components, from example code, or from prose in the MDX.
- **Never rename, alias, or merge props.** Property names must match the type exactly.
- **Do not fabricate types, defaults, or required flags.** Optionality and types come from
  the definition, not assumption.
- **Prefer omission over invention.** When the definition is unavailable or a member is
  unresolved, leave it out and log the gap.

## Failure handling

- If the TypeScript definition cannot be found, emit no props and add a blocking gap note
  naming the paths searched.
- If a member's type references an unresolved imported type, keep the prop but mark its type
  for review in the gap list.
- If existing documentation lists a prop absent from the definition, drop it from `props` and
  log it as a candidate for removal/verification — do not carry it forward.

## Reuse constraints

- Requires read access to the resolved TypeScript definition.
- Must remain deterministic for the same definition input.
- Should not embed capability-specific paths beyond the resolution order above.
