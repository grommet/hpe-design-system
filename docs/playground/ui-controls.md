# UI Control Mapping

Canonical reference mapping each `uiControl` value (from component JSON audits) to the HPE/Grommet UI element used in the playground control pane.

Derived from: `box.json`, `button.json`, `form-field.json`, `text-input.json` — February 23, 2026.

---

## Control Type Reference

### `toggle`
**Used for:** `boolean` props  
**Playground control:** `CheckBox` (toggle variant)  
**Render in:** Control pane  
**Examples:** `disabled`, `busy`, `active`, `readOnlyCopy`, `reverse`  
**Rule:** If the prop is `purpose: "preview-user"`, reflect its state directly in the preview pane — no separate control widget needed.

---

### `select`
**Used for:** Enum/union string props with a fixed, known set of values  
**Playground control:** `Select`  
**Render in:** Control pane  
**Examples:** `size`, `justify`, `direction`, `align`, `textAlign`, `validateOn`, `target`  
**Rule:** Populate options from the `type` string in the JSON (pipe-separated literal union). Include a "none / default" option that omits the prop from generated code.

---

### `text`
**Used for:** Free-form `string` props  
**Playground control:** `TextInput`  
**Render in:** Control pane  
**Examples:** `a11yTitle`, `label`, `color`, `href`, `gridArea`, `height`, `width`  
**Rule:** Empty input = prop omitted from generated code (`omitWhenDefault: true`).

---

### `number`
**Used for:** Numeric props  
**Playground control:** `TextInput` with `type="number"`  
**Render in:** Control pane  
**Examples:** `defaultSuggestion` (TextInput)  
**Rule:** Empty = prop omitted. Apply min/max constraints where semantically obvious (e.g. index values ≥ 0).

---

### `json`
**Used for:** Complex object/array props that don't fit a simpler control  
**Playground control:** `TextArea` (inline JSON editor)  
**Render in:** Control pane, collapsed by default  
**Examples:** `margin`, `pad`, `border`, `background`, `animation`, `tip`, `validate`, `suggestions`  
**Rule:** Parse and validate JSON on blur. Show inline error if invalid. Omit from generated code when value is `null` or `{}`.  
**Upgrade path:** If a `json` prop appears in 3+ components with the same shape (e.g. `margin`, `pad`), replace with a structured sub-form control.

---

### `slot`
**Used for:** Props that accept `React.ReactNode`, `JSX.Element`, or a render function  
**Render in:** Control pane — behaviour depends on `atomicComponent`:

| `atomicComponent` | Playground control | Notes |
|---|---|---|
| `"Icon"` | Icon picker | Shows curated subset of HPE icons; inserts `<Icon />` into generated code |
| `null` | `TextInput` (plain text mode) | Treats slot as a simple string; generates as a text node child |

**Examples with `atomicComponent: "Icon"`:** `Button.icon`, `TextInput.icon`  
**Examples with `atomicComponent: null`:** `Button.children`, `FormField.error`, `FormField.help`, `FormField.info`, `FormField.placeholder`, `TextInput.placeholder`

**Icon picker scope (v1):** Curated set of ~20 common HPE icons from `packages/hpe-icons/`. Full library picker is a v2 concern.

---

### `event`
**Used for:** Callback/handler props (`function` type, `purpose: "event"`)  
**Playground control:** None — not rendered in control pane  
**Render in:** Generated code only, as a stubbed comment  
**Examples:** `onClick`, `onChange`, `onBlur`, `onFocus`, `onSuggestionSelect`  
**Rule:** Never expose event props as editable controls. In generated code, show as `onChange={() => { /* handler */ }}`.

---

## Placement Rules

| `purpose` | Pane |
|---|---|
| `control-implementor` | Control pane |
| `layout-positional` | Control pane — Layout / Spacing group |
| `preview-user` | Preview pane interaction only (e.g. type directly into TextInput) |
| `relationship` | Control pane — Composition group, collapsed by default |
| `event` | Not shown — generated code stub only |

---

## Priority and Exclusivity Rules

- When two or more props share `exclusiveWith`, render them as a **single segmented control or radio group** rather than independent toggles.  
  _Example: Button `kind` / `primary` / `secondary` / `plain` → one "Kind" control, ordered by `priority` value._
- Lower `priority` number = preferred/canonical prop. `priority: 1` wins.
- When a `dependsOn` prop is not set, **disable** (not hide) the dependent control so users know it exists.

---

## CSV-Driven First Pass (normalizedPropType mapping)

When building a component playground page from `grommet-props.csv` rather than a
hand-authored component JSON, use `normalizedPropType` to determine the control
type. This is the **verbose, grommet-faithful** first pass — no HPE opinions
applied, all props shown alphabetically, no grouping or progressive disclosure.

### Control type mapping

| `normalizedPropType` | Control | Notes |
|---|---|---|
| `boolean` | `CheckBox` | |
| `enum` | `Select` | Options parsed from `enumValues` column (quoted values, pipe or space separated) |
| `string` | `TextInput` | |
| `number` | `TextInput type="number"` | |
| `ReactNode` | `TextInput` | Plain text fallback — treated as a string for first pass |
| `element` | `TextInput` | Same plain text fallback |
| `union` | `TextInput` | Free-form — user types a valid value |
| `object` | `TextInput` | Free-form JSON string |
| `array` | `TextInput` | Free-form JSON string |
| `function` | **skipped** | Event handlers — no control rendered |

### Layout

Pages use the same three-zone responsive `Grid` as `ButtonPlaygroundTwo`:

```
[ preview (main) ] [ controls panel (side) ]
[      code output (code)                   ]
```

This layout is extracted into a shared `PlaygroundShell` component so every
component page uses the same responsive behaviour (container-aware stack /
letterbox / wide tiers via `ResizeObserver`).

### Code style

- Maximum line length: **80 characters** (enforced by ESLint `max-len`)
- Multi-line JSX: one prop per line when the tag would exceed 80 chars
- Inline `Tip content={...}` expanded to multiline when content string is long
- No `/* eslint-disable max-len */` suppression on playground pages

### Controls panel rules (first pass)

- All props sorted **alphabetically** by `prop` name
- Each control wrapped in a `FormField` with `label={prop}` and `help={description}`
- No section dividers, no grouping
- No `dependsOn` / `exclusiveWith` enforcement — all controls independent
- `Select` always includes a **"— none —"** option that removes the prop from
  the preview and generated code
- Empty `TextInput` = prop omitted from generated code

### Help text fallback for `union` and `object` props

While union and object props don't yet have dedicated controls, show the
`documentedValues` or `objectExample` from the CSV as `help` text on the
`FormField`. This primes the user with valid input examples without them
needing to look up the docs.

```js
function getHelpText(row) {
  const { normalizedPropType, documentedValues, objectExample } = row;
  if (normalizedPropType === 'union' && documentedValues) {
    return documentedValues;
  }
  if (normalizedPropType === 'object' && objectExample) {
    return objectExample;
  }
  return undefined;
}
```

Apply to the `TextInput` `FormField` branch only — booleans and enums already
communicate their options through their control type. Remove the `help` prop
and replace the `TextInput` with a richer control when union/object controls
are built.

### Enum option parsing

The `enumValues` column contains quoted string literals extracted from the docs.
Parse them as: strip surrounding quotes, split on whitespace between quoted
tokens. Example: `"small" "medium" "large"` → `['small', 'medium', 'large']`.

---

## Group Display Order (Control Pane)

Recommended top-to-bottom section order:

1. **Content** — what the component shows (`label`, `value`, `placeholder`)
2. **State** — condition (`disabled`, `active`, `busy`, `error`, `required`)
3. **Appearance** — visual style (`size`, `kind`, `primary`, `round`, `elevation`)
4. **Layout** — child layout (`direction`, `align`, `justify`, `fill`, `gap`)
5. **Spacing** — padding and margin (`pad`, `margin`)
6. **Behavior** — interaction config (`focusIndicator`, `responsive`, `validateOn`, `dropHeight`)
7. **Accessibility** — a11y props (`a11yTitle`)
8. **Composition** — parent/child relationships (`name`, `htmlFor`, `contentProps`) — collapsed by default
9. **Advanced** — polymorphic, escape-hatch props (`as`, `tag`) — collapsed by default
