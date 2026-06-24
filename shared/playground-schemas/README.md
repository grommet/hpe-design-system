# @shared/playground-schemas

Codegen tooling and shared schema primitives for the component Playground in
the HPE Design System docs app. Lives under `shared/` so it is a proper
workspace package with a clear place in the build dependency graph.

## Directory structure

```
shared/playground-schemas/
  package.json           # Workspace package — @shared/playground-schemas
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
They are also regenerated automatically as part of `pnpm build` in `apps/docs`.

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

Schemas are regenerated automatically as part of `pnpm build` in `apps/docs`.
To regenerate manually, run from the monorepo root:

```sh
# Regenerate all components listed in COMPONENTS
pnpm --filter @shared/playground-schemas build

# Regenerate specific components only
node shared/playground-schemas/scripts/generate-schemas.mjs Button TextInput

# Regenerate AND scaffold a starter components/ conf file
node shared/playground-schemas/scripts/generate-schemas.mjs --scaffold Button
```

---

## Adding a Playground for a new component

1. **Add the component** to the `COMPONENTS` array in
   `scripts/generate-schemas.mjs`.

2. **Run the codegen** to produce the generated schema:

   ```sh
   pnpm --filter @shared/playground-schemas build
   ```

   This creates `generated/MyComponent.js`.

3. **Drop `<Playground>` into the MDX page**, excluding any props you don't
   want to expose:

   ```jsx
   <Playground component="MyComponent" exclude={['as', 'style', 'onClick']} />
   ```

   The `Playground` component dynamically imports
   `@shared/playground-schemas/generated/<ComponentName>` — no manual wiring
   needed.

---

## Prop type → control mapping

| Prop type | Control rendered                     |
| --------- | ------------------------------------ |
| `boolean` | Toggle                               |
| `string`  | Text input                           |
| `number`  | Number input                         |
| `enum`    | Select / radio group                 |
| `union`   | Type toggle buttons + adapting input |
