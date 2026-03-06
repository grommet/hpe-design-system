# Playground Prop Handling

One table per built component. Intended as a **critique surface** — scan the
handling decisions and flag anything that seems wrong or missing.

## Handling vocabulary

| Label | Meaning |
|---|---|
| `TextInput` | Free-text string input |
| `Select (enum)` | Dropdown populated from CSV `enumValues` |
| `Select (curated)` | Dropdown with hand-picked safe values (not from CSV) |
| `Select (icon picker)` | Dropdown of named icons from `@hpe-design/icons-grommet` |
| `Select (preset)` | Dropdown of complete JSX snippets for complex element props |
| `Select (synced)` | Dropdown whose value mirrors and drives the preview's controlled state |
| `CheckBox` | Boolean toggle in the controls panel |
| `CheckBox (synced)` | Boolean toggle that is bidirectional with preview interaction |
| `TextInput (comma-sep)` | Free-text parsed to `string[]` on change; drives array-type props |
| `skipped — function` | `normalizedPropType === 'function'`; event handlers and render props |
| `skipped — object` | `normalizedPropType === 'object'` and `SKIP_TYPES` includes `'object'` |
| `skipped — array` | `normalizedPropType === 'array'` and `SKIP_TYPES` includes `'array'` |
| `skipped — managed` | Controlled by preview's own state; exposing it would conflict |
| `synthetic` | Not a real prop; drives preview rendering or code generation |

---

## Anchor

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `as` | union | TextInput | help: union values |
| `color` | union | TextInput | help: union values |
| `disabled` | boolean | CheckBox | — |
| `gap` | string | TextInput | — |
| `gridArea` | string | TextInput | — |
| `href` | string | TextInput | — |
| `icon` | element | Select (icon picker) | element type can't be free-typed; 8 curated icons |
| `label` | union | TextInput | seeded "Anchor text" |
| `margin` | union | TextInput | help: union values |
| `onClick` | function | skipped — function | event handler |
| `reverse` | boolean | CheckBox | — |
| `size` | enum | Select (enum) | — |
| `weight` | union | TextInput | help: union values |

---

## Box

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `align` | enum | Select (enum) | — |
| `alignContent` | enum | Select (enum) | — |
| `alignSelf` | enum | Select (enum) | — |
| `animation` | union | TextInput | help: union values |
| `as` | union | TextInput | help: union values |
| `background` | union | TextInput | help: union values |
| `basis` | enum | Select (enum) | — |
| `border` | union | TextInput | help: union values |
| `cssGap` | boolean | CheckBox | — |
| `direction` | enum | Select (enum) | seeded "row" |
| `elevation` | enum | Select (enum) | — |
| `fill` | union | TextInput | help: union values |
| `flex` | union | TextInput | help: union values |
| `focusIndicator` | boolean | CheckBox | — |
| `gap` | union | TextInput | seeded "small"; help: union values |
| `gridArea` | string | TextInput | — |
| `height` | union | TextInput | help: union values |
| `hoverIndicator` | union | TextInput | help: union values |
| `justify` | enum | Select (enum) | — |
| `margin` | union | TextInput | help: union values |
| `onClick` | function | skipped — function | event handler |
| `overflow` | union | TextInput | help: union values |
| `pad` | union | TextInput | seeded "medium"; help: union values |
| `responsive` | union | TextInput | help: union values |
| `round` | union | TextInput | help: union values |
| `skeleton` | union | TextInput | help: union values |
| `tag` | union | TextInput | help: union values |
| `width` | union | TextInput | help: union values |
| `wrap` | union | TextInput | help: union values |

---

## Button

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `active` | boolean | CheckBox | — |
| `alignSelf` | enum | Select (enum) | — |
| `as` | union | TextInput | help: union values |
| `badge` | union | TextInput | help: union values |
| `busy` | boolean | CheckBox | — |
| `children` | union | TextInput | normalizedPropType is union not function; help: union values |
| `color` | union | TextInput | help: union values |
| `disabled` | boolean | CheckBox | — |
| `fill` | union | TextInput | help: union values |
| `focusIndicator` | boolean | CheckBox | — |
| `gap` | string | TextInput | — |
| `gridArea` | string | TextInput | — |
| `hoverIndicator` | union | TextInput | help: union values |
| `href` | string | TextInput | — |
| `icon` | element | Select (icon picker) | element type can't be free-typed; 8 curated icons |
| `justify` | enum | Select (enum) | — |
| `label` | union | TextInput | seeded "Button" |
| `margin` | union | TextInput | help: union values |
| `messages` | union | TextInput | help: union values |
| `onClick` | function | skipped — function | event handler |
| `pad` | union | TextInput | help: union values |
| `plain` | boolean | CheckBox | — |
| `primary` | boolean | CheckBox | — |
| `reverse` | boolean | CheckBox | — |
| `secondary` | boolean | CheckBox | — |
| `size` | enum | Select (enum) | — |
| `success` | boolean | CheckBox | — |
| `target` | string | TextInput | — |
| `tip` | union | TextInput | help: union values |
| `type` | enum | Select (enum) | — |

---

## CheckBox

SKIP_TYPES: `['function']` · SKIP_PROPS: `['checked', 'onChange', 'id', 'children']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `checked` | boolean | skipped — managed | preview maintains own `previewChecked` state for interactivity |
| `children` | function | skipped — function | render prop |
| `disabled` | boolean | CheckBox | — |
| `fill` | boolean | CheckBox | — |
| `id` | string | skipped — managed | hardcoded on preview element |
| `indeterminate` | boolean | CheckBox | — |
| `label` | union | TextInput | seeded "Check me" |
| `name` | string | TextInput | seeded "checkbox" |
| `onChange` | function | skipped — function | event handler |
| `pad` | union | TextInput | help: union values |
| `reverse` | boolean | CheckBox | — |
| `toggle` | boolean | CheckBox | switches component to toggle/switch variant visually |

---

## FormField

SKIP_TYPES: `['function']` · SKIP_PROPS: none · Synthetic: `_childType`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `_childType` | — | synthetic → Select | drives which child is rendered in preview and which import appears in codegen; options: TextInput, Select, CheckBox, TextArea, RangeInput |
| `a11yTitle` | string | TextInput | — |
| `component` | union | TextInput | help: union values |
| `contentProps` | object | TextInput | help: object example |
| `disabled` | boolean | CheckBox | — |
| `error` | union | TextInput | help: union values |
| `help` | union | TextInput | help: union values |
| `htmlFor` | string | TextInput | — |
| `info` | union | TextInput | help: union values |
| `label` | union | TextInput | seeded "Field label" |
| `margin` | union | TextInput | help: union values |
| `name` | string | TextInput | — |
| `pad` | boolean | CheckBox | — |
| `required` | union | TextInput | help: union values |
| `validate` | union | TextInput | normalizedPropType is union not function; help: union values |
| `validateOn` | enum | Select (enum) | — |

---

## Grid

SKIP_TYPES: `['function', 'array']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `align` | enum | Select (enum) | — |
| `alignContent` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `areas` | array | skipped — array | requires 2-D array of named areas; too complex for generic control |
| `as` | union | TextInput | help: union values |
| `border` | union | TextInput | help: union values |
| `columns` | union | TextInput | seeded "small"; help: union values |
| `fill` | union | TextInput | help: union values |
| `gap` | union | TextInput | seeded "small"; help: union values |
| `gridArea` | string | TextInput | — |
| `height` | union | TextInput | help: union values |
| `justify` | enum | Select (enum) | — |
| `justifyContent` | enum | Select (enum) | — |
| `margin` | union | TextInput | help: union values |
| `pad` | union | TextInput | help: union values |
| `responsive` | boolean | CheckBox | — |
| `rows` | union | TextInput | help: union values |
| `tag` | union | TextInput | help: union values |
| `width` | union | TextInput | help: union values |

---

## Heading

SKIP_TYPES: `['function']` · SKIP_PROPS: none · Synthetic: `textContent`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `textContent` | — | synthetic → TextInput | represents JSX children; excluded from prop spread; seeded "Heading text" |
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `color` | union | TextInput | help: union values |
| `fill` | boolean | CheckBox | — |
| `gridArea` | string | TextInput | — |
| `level` | union | Select (curated: 1–6) | raw union type; cast to Number for preview; curated to prevent invalid values |
| `margin` | union | TextInput | help: union values |
| `overflowWrap` | enum | Select (enum) | — |
| `responsive` | boolean | CheckBox | — |
| `size` | string | Select (curated: small / medium / large / xlarge) | free text causes theme `fontSize` crash; only valid theme tokens exposed |
| `textAlign` | enum | Select (enum) | — |
| `truncate` | boolean | CheckBox | — |
| `weight` | union | TextInput | help: union values |

---

## PageHeader

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `actions` | element | Select (preset) | element type can't be free-typed; presets: Primary button / Two buttons / Menu; each drives codegen snippet + imports |
| `alignSelf` | enum | Select (enum) | — |
| `gridArea` | string | TextInput | — |
| `gridProps` | object | TextInput | help: object example |
| `level` | union | TextInput | help: union values |
| `margin` | union | TextInput | help: union values |
| `parent` | element | TextInput (label only) | element type; user types the link label; preview + codegen render as `<Anchor icon={<Left />} label="..." />` |
| `responsive` | boolean | CheckBox | — |
| `size` | enum | Select (enum) | — |
| `subtitle` | union | TextInput | seeded "A short description." |
| `title` | union | TextInput | seeded "Page title" |

---

## RadioButton

SKIP_TYPES: `['function']` · SKIP_PROPS: `['onChange', 'children']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `checked` | boolean | CheckBox (synced) | bidirectional: toggling control updates preview; clicking preview updates control |
| `children` | function | skipped — function | render prop |
| `disabled` | boolean | CheckBox | — |
| `id` | string | TextInput | applied live as `id` on the preview element; seeded "radiobutton-preview" |
| `label` | ReactNode | TextInput | seeded "Option A" |
| `name` | string | TextInput | seeded "radio" |
| `onChange` | function | skipped — function | event handler |

---

## RadioButtonGroup

SKIP_TYPES: `['function']` · SKIP_PROPS: `['onChange', 'children', 'options']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `children` | function | skipped — function | render prop |
| `disabled` | boolean | CheckBox | — |
| `name` | string | TextInput | seeded "radio-group" |
| `onChange` | function | skipped — function | event handler |
| `options` | array | TextInput (comma-sep) | array type; parsed to `string[]`; seeded "Option 1, Option 2, Option 3"; changing resets value |
| `value` | union | Select (synced) | populated from current options list; bidirectional with preview selection; seeded "Option 1" |

---

## Select

SKIP_TYPES: `['function', 'object', 'array']` · SKIP_PROPS: none · SPECIAL_PROPS: `['options', 'size', 'dropHeight']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `children` | function | skipped — function | render prop |
| `clear` | union | TextInput | help: union values |
| `closeOnChange` | boolean | CheckBox | — |
| `defaultValue` | union | TextInput | help: union values |
| `disabled` | union | TextInput | help: union values |
| `disabledKey` | union | TextInput | contains function in union but normalizedPropType is union; help: union values |
| `dropAlign` | object | skipped — object | nested alignment config; too complex for text input |
| `dropHeight` | string | Select (curated: xsmall–xlarge) | SPECIAL_PROP; only valid theme tokens; free text causes layout issues |
| `dropProps` | object | skipped — object | pass-through props for the Drop; too complex |
| `dropTarget` | object | skipped — object | DOM ref; not configurable in playground |
| `emptySearchMessage` | union | TextInput | help: union values |
| `focusIndicator` | boolean | CheckBox | — |
| `gridArea` | string | TextInput | — |
| `icon` | union | TextInput | help: union values; boolean\|function\|node too varied for curated select |
| `labelKey` | union | TextInput | contains function in union; help: union values |
| `margin` | union | TextInput | help: union values |
| `messages` | object | skipped — object | i18n object; not useful in quick exploration |
| `multiple` | boolean | CheckBox | — |
| `name` | string | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `onClose` | function | skipped — function | event handler |
| `onMore` | function | skipped — function | event handler |
| `onOpen` | function | skipped — function | event handler |
| `onSearch` | function | skipped — function | event handler |
| `open` | boolean | CheckBox | — |
| `options` | array | TextInput (comma-sep) | SPECIAL_PROP; array type; parsed to `string[]`; seeded "Option 1, Option 2, Option 3" |
| `placeholder` | union | TextInput | seeded "Select an option" |
| `plain` | boolean | CheckBox | — |
| `replace` | boolean | CheckBox | — |
| `searchPlaceholder` | union | TextInput | help: union values |
| `selected` | union | TextInput | help: union values |
| `size` | string | Select (curated: small–xlarge) | SPECIAL_PROP; only valid theme tokens |
| `value` | union | TextInput | help: union values; preview manages own selectedValue state |
| `valueKey` | union | TextInput | contains function in union; help: union values |
| `valueLabel` | union | TextInput | contains function in union; help: union values |

---

## TextInput

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `defaultSuggestion` | number | TextInput | normalizedPropType is number; treated as string input |
| `dropAlign` | object | TextInput | help: object example; object not in SKIP_TYPES for this page |
| `dropHeight` | string | TextInput | — |
| `dropProps` | object | TextInput | help: object example |
| `dropTarget` | object | TextInput | help: object example |
| `focusIndicator` | boolean | CheckBox | — |
| `icon` | element | TextInput | no icon picker here (only Anchor + Button have ICON_MAP); element type shown as free text |
| `id` | string | TextInput | — |
| `messages` | object | TextInput | help: object example |
| `name` | string | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `onSelect` | function | skipped — function | event handler |
| `onSuggestionSelect` | function | skipped — function | event handler |
| `onSuggestionsClose` | function | skipped — function | event handler |
| `onSuggestionsOpen` | function | skipped — function | event handler |
| `placeholder` | ReactNode | TextInput | seeded "Enter a value" |
| `plain` | union | TextInput | help: union values |
| `readOnlyCopy` | boolean | CheckBox | — |
| `reverse` | boolean | CheckBox | — |
| `size` | string | TextInput | no curated list here; free text |
| `suggestions` | array | TextInput | array not in SKIP_TYPES; no help text (not union/object); shows as plain TextInput |
| `textAlign` | enum | Select (enum) | — |
| `value` | union | TextInput | help: union values |
| `width` | union | TextInput | help: union values |
