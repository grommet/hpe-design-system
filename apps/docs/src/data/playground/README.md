# Playground

This directory contains the schema system that powers the component Playground
in the docs app. The Playground lets users interactively change component props
and see the result in real time.

## Directory structure

```
playground/
  README.md              # This file
  schema.js              # Shared type definitions and prop helper factories
  generated/             # Auto-generated schema files — do not edit by hand
    Button.js
    ...
  scripts/
    generate-schemas.mjs # Codegen script — reads grommet's index.d.ts files
  __tests__/
    generate-schemas.test.mjs  # Vitest tests for generated output
```

---

## How it works

### 1. `schema.js` — shared primitives

Defines the `PropDescriptor` types and factory helpers (`booleanProp`,
`stringProp`, `enumProp`, `unionProp`, etc.) that every schema file uses.

### 2. `generated/<Component>.js` — auto-generated from grommet

Each file is produced by the codegen script (see below). It reads the
component's `index.d.ts` from the installed grommet package, classifies every
prop type, and outputs a `PropDescriptor[]` array using the schema helpers.

**Do not edit these files by hand** — they will be overwritten on the next run.
They are also regenerated automatically on every `pnpm build`.

---

## Using the Playground in MDX

```jsx
import { Playground } from '../../components/Playground';

<Playground component="Button" />;
```

By default **all props** from the generated schema are shown as controls.

Use the `exclude` prop to hide props that aren't relevant on a given page
(e.g. low-level layout props, event handlers, or rarely-used options):

```jsx
<Playground
  component="Button"
  exclude={['as', 'children', 'style', 'onClick', 'href', 'target']}
/>
```

`exclude` is optional and defaults to `[]` (show everything).

---

## Regenerating schemas after a grommet update

Schemas are regenerated automatically as part of `pnpm build`. To regenerate
manually, run from the `apps/docs` directory:

```sh
# Regenerate all components listed in the script's COMPONENTS array
pnpm generate:schemas

# Regenerate specific components only
pnpm generate:schemas Button TextInput

# Regenerate AND scaffold a starter components/ conf file
pnpm generate:schemas --scaffold Button TextInput
```

Or from the monorepo root:

```sh
pnpm --filter docs generate:schemas
```

Commit the updated files in `generated/` as part of the same PR as the grommet
version bump.

---

## Adding a Playground for a new component

1. **Add the component** to the `COMPONENTS` array in
   `scripts/generate-schemas.mjs`.

2. **Run the codegen script** to produce the generated schema:

   ```sh
   pnpm generate:schemas MyComponent
   ```

   This creates `generated/MyComponent.js`.

3. **Add the component to `loadSchema()`** in
   `src/components/Playground/index.jsx`:

   ```js
   case 'MyComponent':
     return (await import('../../data/playground/generated/MyComponent.js'))
       .myComponentSchema;
   ```

4. **Drop `<Playground>` into the MDX page**, excluding any props you don't
   want to expose:
   ```jsx
   <Playground component="MyComponent" exclude={['as', 'style', 'onClick']} />
   ```

---

## Prop type → control mapping

| Prop type | Control rendered                     |
| --------- | ------------------------------------ |
| `boolean` | Toggle                               |
| `string`  | Text input                           |
| `number`  | Number input                         |
| `enum`    | Select / radio group                 |
| `union`   | Type toggle buttons + adapting input |
