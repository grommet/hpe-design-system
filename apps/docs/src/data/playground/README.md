# Playground

This directory contains the schema system that powers the component Playground
in the docs app. The Playground lets users interactively change component props
and see the result in real time.

## Directory structure

```
playground/
  schema.js              # Shared type definitions and prop helper factories
  generated/             # Auto-generated schema files — do not edit by hand
    Button.js
    CheckBox.js
    TextInput.js
    ...
  components/            # Hand-authored conf files — one per component
    button.js
    ...
  scripts/
    generate-schemas.mjs # Codegen script — reads grommet's index.d.ts files
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

### 3. `components/<component>.js` — hand-authored conf layer

This is the only file a contributor needs to touch when adding or adjusting a
component's Playground. It imports the generated schema and exports a `conf`
object that toggles individual props on or off in the UI.

```js
// components/button.js
import { buttonSchema } from '../generated/Button';

export { buttonSchema };

export const buttonConf = {
  label:    { enabled: true },
  disabled: { enabled: true },
  kind:     { enabled: true },
  fill:     { enabled: false }, // hidden until needed
};
```

---

## Regenerating schemas after a grommet update

Run from the `apps/docs` directory:

```sh
# Regenerate all components listed in the script's COMPONENTS array
pnpm generate:schemas

# Regenerate specific components only
pnpm generate:schemas Button TextInput

# Regenerate AND scaffold a starter components/ conf file (safe — never
# overwrites an existing file you've already hand-edited)
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

1. **Run the codegen script with `--scaffold`** to produce both files at once:
   ```sh
   pnpm generate:schemas --scaffold MyComponent
   ```
   This creates:
   - `generated/MyComponent.js` — auto-generated schema (do not edit)
   - `components/myComponent.js` — starter conf with every prop set to
     `enabled: false` (the file you will edit)

   > The `--scaffold` flag **never overwrites** a conf file that already
   > exists, so it is safe to re-run.

2. **Open `components/myComponent.js`** and flip the props you want visible
   in the Playground to `enabled: true`:
   ```js
   export const myComponentConf = {
     label:    { enabled: true },  // ← shown
     disabled: { enabled: true },  // ← shown
     fill:     { enabled: false }, // hidden until needed
   };
   ```

3. Wire the schema and conf into the Playground UI component for your page.

---

## Prop type → control mapping

| Prop type | Control rendered |
|-----------|-----------------|
| `boolean` | Toggle |
| `string`  | Text input |
| `number`  | Number input |
| `enum`    | Select / radio group |
| `union`   | Type toggle buttons + adapting input |
