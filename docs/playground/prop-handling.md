# Playground Prop Handling

One table per built component. Intended as a **critique surface** — scan the
handling decisions and flag anything that seems wrong or missing.

---

## Prop type → input rules

Canonical ruleset defining which UI control to use for each `normalizedPropType`.
This is the source of truth for building and auditing playground pages.

| Prop type | Strict behaviour | UI recommendation | Grommet input | Notes |
|---|---|---|---|---|
| `boolean` | True or false only | Toggle control allowing on/off state | `CheckBox` | |
| `string` | Any text value; may be constrained by docs but technically free-form | Single-line text input or textarea for longer content | `TextInput` | |
| `number` | Numeric value; may include min/max/step constraints | Number input with optional stepper or slider when range is meaningful | `TextInput type="number"` | |
| `array` | Ordered list of one or more items | Add/remove list rows or multi-select when options are predefined | `Select` with search + create option if suitable | |
| `object` | Structured config with multiple named properties | Grouped inputs in a fieldset, card, or accordion | `Form > FormField` — defined per object | Use the example data structure to determine required inputs; sub-props should be boolean/enum/string/number |
| `enum` | Exactly one value from a predefined set | Radio group or select dropdown depending on list size | `RadioButtonGroup` or `Select` | ≤4 options → `RadioButtonGroup`; 5+ options → `Select` |
| `union` | Value can be one of several different types or shapes | User first chooses the mode/type, then relevant inputs appear | `Form > FormField` — defined per union | Use example data structure to determine the input set and labels |
| `function` | Callable event handler; represents interaction wiring, not configuration | **Exclude from playground controls**; reference in advanced documentation only | `excluded-docs-only` | |
| `ReactNode` | Content slot accepting any renderable React content | Default input defined per component based on current Figma configuration | `TextInput` (text \| text + icon \| custom element) | |
| `element` | A specific React element instance, typically a predefined Grommet component | Picker to choose from allowed atoms with small configuration controls | `Select` pointing to other component options (most commonly icons) | |

---

## Handling vocabulary

Labels used in the per-component audit tables below.

| Label | Meaning |
|---|---|
| `TextInput` | Free-text string input |
| `TextInput (number)` | `TextInput` with `type="number"`; value parsed to Number before use |
| `Select (enum)` | Dropdown populated from CSV `enumValues` |
| `Select (curated)` | Dropdown with hand-picked safe values (not from CSV) |
| `Select (icon picker)` | Dropdown of named icons from `@hpe-design/icons-grommet` |
| `Select (preset)` | Dropdown of complete JSX snippets for complex element props |
| `Select (synced)` | Dropdown whose value mirrors and drives the preview's controlled state |
| `CheckBox` | Boolean toggle in the controls panel |
| `CheckBox (synced)` | Boolean toggle that is bidirectional with preview interaction |
| `TextInput (comma-sep)` | Free-text parsed to `string[]` on change; drives array-type props |
| `excluded-docs-only` | `normalizedPropType === 'function'`; excluded from controls, referenced in docs only |
| `skipped — function` | Same as `excluded-docs-only`; older label used in generated sections |
| `skipped — object` | `normalizedPropType === 'object'` and `SKIP_TYPES` includes `'object'` |
| `skipped — array` | `normalizedPropType === 'array'` and `SKIP_TYPES` includes `'array'` |
| `skipped — element` | `normalizedPropType === 'element'` and no icon picker implemented yet |
| `skipped — managed` | Controlled by preview's own state; exposing it would conflict |
| `skipped — prop` | Named prop explicitly in `SKIP_PROPS` for layout or complexity reasons |
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

## Avatar

SKIP_TYPES: none · SKIP_PROPS: `['imageProps']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `imageProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `size` | string | Select (curated) | curated safe values |
| `src` | string | TextInput | — |

---

## Meter

SKIP_TYPES: none · SKIP_PROPS: `['values', 'gridArea', 'margin']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | 5 options — exceeds RadioButtonGroup threshold |
| `background` | union | TextInput | help: union values |
| `color` | union | TextInput | help: union values |
| `direction` | enum | RadioButtonGroup | 2 options: horizontal, vertical |
| `gridArea` | string | skipped — prop | — |
| `margin` | union | skipped — prop | — |
| `max` | union | TextInput | parsed as Number before passing to prop |
| `reverse` | boolean | CheckBox | — |
| `round` | boolean | CheckBox | — |
| `size` | string | TextInput | — |
| `thickness` | string | TextInput | — |
| `type` | enum | RadioButtonGroup | 4 options: bar, circle, pie, semicircle |
| `value` | number | TextInput | parsed as Number before passing to prop |
| `values` | array | skipped — array | complex array shape; omitted for simplicity |

---

## NameValueList

SKIP_TYPES: none · SKIP_PROPS: `['margin']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `align` | enum | Select (enum) | options exceed RadioButtonGroup threshold |
| `layout` | enum | RadioButtonGroup | 2 options: column, grid |
| `margin` | union | skipped — prop | — |
| `nameProps` | object | TextInput | JSON text input; validated before apply |
| `pairProps` | object | TextInput | JSON text input; validated before apply |
| `valueProps` | object | TextInput | JSON text input; validated before apply |

---

## Notification

SKIP_TYPES: `['function']` · SKIP_PROPS: `['onClose']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `actions` | array | skipped — array | complex array shape; omitted for simplicity |
| `global` | boolean | CheckBox | — |
| `icon` | element | Select (icon picker) | icon picker; maps name string to `<Icon />` component |
| `message` | union | TextInput | help: union values |
| `onClose` | function | skipped — function | event handler |
| `status` | enum | Select (enum) | 5 options — exceeds RadioButtonGroup threshold |
| `time` | number | TextInput | — |
| `title` | string | TextInput | — |
| `toast` | union | TextInput | help: union values |

---

## Pagination

SKIP_TYPES: none · SKIP_PROPS: `['gridArea', 'margin', 'messages', 'onChange', 'page']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | 5 options — exceeds RadioButtonGroup threshold |
| `gridArea` | string | skipped — prop | — |
| `margin` | union | skipped — prop | — |
| `messages` | object | skipped — object | complex object shape; omitted for simplicity |
| `numberEdgePages` | number | TextInput | parsed as Number before passing to prop |
| `numberItems` | number | TextInput | parsed as Number before passing to prop |
| `numberMiddlePages` | number | TextInput | parsed as Number before passing to prop |
| `onChange` | function | skipped — function | event handler |
| `page` | number | skipped — managed | controlled by preview state |
| `size` | enum | RadioButtonGroup | 3 options: small, medium, large |
| `step` | number | TextInput | parsed as Number before passing to prop |
| `stepOptions` | union | TextInput | help: union values |
| `summary` | boolean | CheckBox | — |

---

## Accordion

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `activeIndex` | union | TextInput | help: union values |
| `alignSelf` | enum | Select (enum) | — |
| `animate` | boolean | CheckBox | — |
| `children` | ReactNode | TextInput | — |
| `gridArea` | string | TextInput | — |
| `margin` | union | TextInput | help: union values |
| `messages` | object | skipped — object | complex object shape; omitted for simplicity |
| `multiple` | boolean | CheckBox | — |
| `onActive` | function | skipped — function | event handler |

---

## Calendar

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `activeDate` | enum | Select (enum) | — |
| `alignSelf` | enum | Select (enum) | — |
| `animate` | boolean | CheckBox | — |
| `bounds` | array | skipped — array | complex array shape; omitted for simplicity |
| `children` | function | skipped — function | event handler |
| `date` | union | TextInput | help: union values |
| `dates` | array | skipped — array | complex array shape; omitted for simplicity |
| `daysOfWeek` | boolean | CheckBox | — |
| `disabled` | array | skipped — array | complex array shape; omitted for simplicity |
| `fill` | boolean | CheckBox | — |
| `firstDayOfWeek` | number | TextInput | — |
| `gridArea` | string | TextInput | — |
| `header` | function | skipped — function | event handler |
| `level` | union | TextInput | help: union values |
| `locale` | string | TextInput | — |
| `margin` | union | TextInput | help: union values |
| `messages` | string | TextInput | — |
| `onReference` | function | skipped — function | event handler |
| `onSelect` | function | skipped — function | event handler |
| `range` | union | TextInput | help: union values |
| `reference` | string | TextInput | — |
| `showAdjacentDays` | union | TextInput | help: union values |
| `size` | string | TextInput | — |

---

## Card

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `(extends Box)` | object | skipped — object | complex object shape; omitted for simplicity |

---

## Cards

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `as` | union | TextInput | help: union values |
| `children` | function | skipped — function | event handler |
| `data` | array | skipped — array | complex array shape; omitted for simplicity |
| `gridArea` | string | TextInput | — |
| `margin` | union | TextInput | help: union values |
| `onMore` | function | skipped — function | event handler |
| `pad` | union | TextInput | help: union values |
| `paginate` | union | TextInput | help: union values |
| `show` | number | TextInput | — |
| `size` | enum | Select (enum) | — |
| `step` | number | TextInput | — |

---

## Chart

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `animate` | boolean | CheckBox | — |
| `bounds` | union | TextInput | help: union values |
| `color` | union | TextInput | help: union values |
| `dash` | boolean | CheckBox | — |
| `gap` | string | TextInput | — |
| `gridArea` | string | TextInput | — |
| `id` | string | TextInput | — |
| `margin` | union | TextInput | help: union values |
| `onClick` | function | skipped — function | event handler |
| `onHover` | function | skipped — function | event handler |
| `opacity` | union | TextInput | help: union values |
| `overflow` | boolean | CheckBox | — |
| `pad` | union | TextInput | help: union values |
| `pattern` | enum | Select (enum) | — |
| `point` | enum | Select (enum) | — |
| `round` | boolean | CheckBox | — |
| `size` | union | TextInput | help: union values |
| `thickness` | union | TextInput | help: union values |
| `type` | enum | Select (enum) | — |
| `values` | array | skipped — array | complex array shape; omitted for simplicity |

---

## CheckBoxGroup

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `children` | function | skipped — function | event handler |
| `defaultValue` | array | skipped — array | complex array shape; omitted for simplicity |
| `disabled` | boolean | CheckBox | — |
| `labelKey` | string | TextInput | — |
| `name` | string | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `options` | array | skipped — array | complex array shape; omitted for simplicity |
| `value` | array | skipped — array | complex array shape; omitted for simplicity |
| `valueKey` | string | TextInput | — |

---

## Clock

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `gridArea` | string | TextInput | — |
| `hourLimit` | union | TextInput | help: union values |
| `margin` | union | TextInput | help: union values |
| `onChange` | function | skipped — function | event handler |
| `precision` | enum | Select (enum) | — |
| `run` | union | TextInput | help: union values |
| `size` | string | TextInput | — |
| `time` | string | TextInput | — |
| `type` | enum | Select (enum) | — |

---

## DataChart

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `axis` | union | TextInput | help: union values |
| `bounds` | union | TextInput | help: union values |
| `chart` | union | TextInput | help: union values |
| `data` | array | skipped — array | complex array shape; omitted for simplicity |
| `detail` | boolean | CheckBox | — |
| `direction` | enum | Select (enum) | — |
| `gap` | string | TextInput | — |
| `gridArea` | string | TextInput | — |
| `guide` | union | TextInput | help: union values |
| `legend` | boolean | CheckBox | — |
| `margin` | union | TextInput | help: union values |
| `offset` | union | TextInput | help: union values |
| `pad` | union | TextInput | help: union values |
| `placeholder` | union | TextInput | help: union values |
| `series` | union | TextInput | help: union values |
| `size` | union | TextInput | help: union values |

---

## DataTable

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `allowSelectAll` | union | TextInput | help: union values |
| `background` | union | TextInput | help: union values |
| `border` | union | TextInput | help: union values |
| `columns` | array | skipped — array | complex array shape; omitted for simplicity |
| `data` | array | skipped — array | complex array shape; omitted for simplicity |
| `disabled` | array | skipped — array | complex array shape; omitted for simplicity |
| `fill` | union | TextInput | help: union values |
| `gridArea` | string | TextInput | — |
| `groupBy` | union | TextInput | help: union values |
| `margin` | union | TextInput | help: union values |
| `onClickRow` | union | TextInput | help: union values |
| `onMore` | function | skipped — function | event handler |
| `onSearch` | function | skipped — function | event handler |
| `onSelect` | function | skipped — function | event handler |
| `onSort` | function | skipped — function | event handler |
| `onUpdate` | function | skipped — function | event handler |
| `pad` | union | TextInput | help: union values |
| `paginate` | union | TextInput | help: union values |
| `pin` | union | TextInput | help: union values |
| `placeholder` | union | TextInput | help: union values |
| `primaryKey` | union | TextInput | help: union values |
| `replace` | boolean | CheckBox | — |
| `resizeable` | boolean | CheckBox | — |
| `rowDetails` | union | TextInput | help: union values |
| `rowProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `select` | array | skipped — array | complex array shape; omitted for simplicity |
| `show` | union | TextInput | help: union values |
| `size` | string | TextInput | — |
| `sort` | object | skipped — object | complex object shape; omitted for simplicity |
| `sortable` | boolean | CheckBox | — |
| `step` | number | TextInput | — |
| `verticalAlign` | union | TextInput | help: union values |

---

## DateInput

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `buttonProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `calendarProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `defaultValue` | union | TextInput | help: union values |
| `dropProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `format` | string | TextInput | — |
| `icon` | element | skipped — element | element type cannot be free-typed |
| `id` | string | TextInput | — |
| `inline` | boolean | CheckBox | — |
| `inputProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `messages` | object | skipped — object | complex object shape; omitted for simplicity |
| `name` | string | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `readOnlyCopy` | boolean | CheckBox | — |
| `reverse` | boolean | CheckBox | — |
| `size` | string | TextInput | — |
| `value` | union | TextInput | help: union values |

---

## Diagram

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `animation` | union | TextInput | help: union values |
| `connections` | array | skipped — array | complex array shape; omitted for simplicity |

---

## Distribution

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `basis` | string | TextInput | — |
| `children` | function | skipped — function | event handler |
| `fill` | boolean | CheckBox | — |
| `gap` | string | TextInput | — |
| `gridArea` | string | TextInput | — |
| `margin` | union | TextInput | help: union values |
| `values` | array | skipped — array | complex array shape; omitted for simplicity |

---

## Drop

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `align` | object | skipped — object | complex object shape; omitted for simplicity |
| `background` | union | TextInput | help: union values |
| `elevation` | enum | Select (enum) | — |
| `inline` | boolean | CheckBox | — |
| `margin` | union | TextInput | help: union values |
| `onClickOutside` | function | skipped — function | event handler |
| `onEsc` | function | skipped — function | event handler |
| `overflow` | union | TextInput | help: union values |
| `plain` | boolean | CheckBox | — |
| `responsive` | boolean | CheckBox | — |
| `restrictFocus` | boolean | CheckBox | — |
| `round` | union | TextInput | help: union values |
| `stretch` | union | TextInput | help: union values |
| `target` | object | skipped — object | complex object shape; omitted for simplicity |
| `trapFocus` | boolean | CheckBox | — |

---

## DropButton

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `disabled` | boolean | CheckBox | — |
| `dropAlign` | object | skipped — object | complex object shape; omitted for simplicity |
| `dropContent` | element | skipped — element | element type cannot be free-typed |
| `dropProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `dropTarget` | object | skipped — object | complex object shape; omitted for simplicity |
| `gridArea` | string | TextInput | — |
| `margin` | union | TextInput | help: union values |
| `onClose` | function | skipped — function | event handler |
| `onOpen` | function | skipped — function | event handler |
| `open` | boolean | CheckBox | — |

---

## FileInput

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `confirmRemove` | function | skipped — function | event handler |
| `disabled` | boolean | CheckBox | — |
| `id` | string | TextInput | — |
| `maxSize` | number | TextInput | — |
| `messages` | object | skipped — object | complex object shape; omitted for simplicity |
| `multiple` | union | TextInput | help: union values |
| `name` | string | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `renderFile` | function | skipped — function | event handler |

---

## Footer

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `(extends Box)` | object | skipped — object | complex object shape; omitted for simplicity |

---

## Form

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `errors` | object | skipped — object | complex object shape; omitted for simplicity |
| `infos` | object | skipped — object | complex object shape; omitted for simplicity |
| `kind` | union | TextInput | help: union values |
| `messages` | object | skipped — object | complex object shape; omitted for simplicity |
| `onChange` | function | skipped — function | event handler |
| `onReset` | function | skipped — function | event handler |
| `onSubmit` | function | skipped — function | event handler |
| `onValidate` | function | skipped — function | event handler |
| `validate` | enum | Select (enum) | — |
| `value` | object | skipped — object | complex object shape; omitted for simplicity |

---

## Header

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `sticky` | string | TextInput | — |

---

## Layer

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `animate` | boolean | CheckBox | — |
| `animation` | union | TextInput | help: union values |
| `background` | union | TextInput | help: union values |
| `full` | union | TextInput | help: union values |
| `margin` | union | TextInput | help: union values |
| `modal` | boolean | CheckBox | — |
| `onClickOutside` | function | skipped — function | event handler |
| `onEsc` | function | skipped — function | event handler |
| `plain` | boolean | CheckBox | — |
| `position` | enum | Select (enum) | — |
| `responsive` | boolean | CheckBox | — |
| `target` | object | skipped — object | complex object shape; omitted for simplicity |

---

## List

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `action` | function | skipped — function | event handler |
| `alignSelf` | enum | Select (enum) | — |
| `as` | union | TextInput | help: union values |
| `background` | union | TextInput | help: union values |
| `border` | union | TextInput | help: union values |
| `children` | function | skipped — function | event handler |
| `data` | array | skipped — array | complex array shape; omitted for simplicity |
| `defaultItemProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `disabled` | union | TextInput | help: union values |
| `gridArea` | string | TextInput | — |
| `itemKey` | union | TextInput | help: union values |
| `itemProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `margin` | union | TextInput | help: union values |
| `onActive` | function | skipped — function | event handler |
| `onClickItem` | function | skipped — function | event handler |
| `onMore` | function | skipped — function | event handler |
| `onOrder` | function | skipped — function | event handler |
| `pad` | union | TextInput | help: union values |
| `paginate` | union | TextInput | help: union values |
| `pinned` | union | TextInput | help: union values |
| `primaryKey` | union | TextInput | help: union values |
| `secondaryKey` | union | TextInput | help: union values |
| `show` | union | TextInput | help: union values |
| `showIndex` | union | TextInput | help: union values |
| `step` | number | TextInput | — |

---

## Main

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `(extends Box)` | object | skipped — object | complex object shape; omitted for simplicity |

---

## Markdown

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `components` | object | skipped — object | complex object shape; omitted for simplicity |
| `options` | object | skipped — object | complex object shape; omitted for simplicity |

---

## MaskedInput

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `dropHeight` | string | TextInput | — |
| `dropProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `focusIndicator` | boolean | CheckBox | — |
| `icon` | element | skipped — element | element type cannot be free-typed |
| `id` | string | TextInput | — |
| `mask` | union | TextInput | help: union values |
| `name` | string | TextInput | — |
| `onBlur` | function | skipped — function | event handler |
| `onChange` | function | skipped — function | event handler |
| `reverse` | boolean | CheckBox | — |
| `size` | string | TextInput | — |
| `textAlign` | enum | Select (enum) | — |
| `value` | union | TextInput | help: union values |

---

## Menu

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `children` | union | TextInput | help: union values |
| `disabled` | boolean | CheckBox | — |
| `dropAlign` | object | skipped — object | complex object shape; omitted for simplicity |
| `dropBackground` | union | TextInput | help: union values |
| `dropProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `dropTarget` | object | skipped — object | complex object shape; omitted for simplicity |
| `gridArea` | string | TextInput | — |
| `icon` | union | TextInput | help: union values |
| `items` | union | TextInput | help: union values |
| `justifyContent` | enum | Select (enum) | — |
| `label` | union | TextInput | help: union values |
| `margin` | union | TextInput | help: union values |
| `messages` | object | skipped — object | complex object shape; omitted for simplicity |
| `open` | boolean | CheckBox | — |
| `size` | string | TextInput | — |

---

## Nav

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `(extends Box)` | object | skipped — object | complex object shape; omitted for simplicity |

---

## Page

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `kind` | enum | Select (enum) | — |

---

## Paragraph

SKIP_TYPES: none · SKIP_PROPS: `['gridArea', 'margin']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `color` | union | TextInput | help: union values |
| `fill` | boolean | CheckBox | — |
| `gridArea` | string | skipped — prop | layout-only |
| `margin` | union | skipped — prop | layout-only |
| `maxLines` | number | TextInput | parsed as Number before passing to prop |
| `responsive` | boolean | CheckBox | — |
| `size` | string | TextInput | — |
| `textAlign` | enum | Select (enum) | — |

---

## RangeInput

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `color` | union | TextInput | help: union values |
| `disabled` | boolean | CheckBox | — |
| `id` | string | TextInput | — |
| `max` | union | TextInput | help: union values |
| `min` | union | TextInput | help: union values |
| `name` | string | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `step` | number | TextInput | — |
| `value` | union | TextInput | help: union values |

---

## RangeSelector

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `color` | union | TextInput | help: union values |
| `direction` | enum | Select (enum) | — |
| `invert` | boolean | CheckBox | — |
| `label` | union | TextInput | help: union values |
| `max` | number | TextInput | — |
| `messages` | string | TextInput | — |
| `min` | number | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `opacity` | union | TextInput | help: union values |
| `round` | string | TextInput | — |
| `size` | string | TextInput | — |
| `step` | number | TextInput | — |
| `values` | array | skipped — array | complex array shape; omitted for simplicity |

---

## SelectMultiple

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `children` | function | skipped — function | event handler |
| `defaultValue` | array | skipped — array | complex array shape; omitted for simplicity |
| `disabled` | union | TextInput | help: union values |
| `disabledKey` | union | TextInput | help: union values |
| `dropAlign` | object | skipped — object | complex object shape; omitted for simplicity |
| `dropHeight` | string | TextInput | — |
| `dropProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `dropTarget` | object | skipped — object | complex object shape; omitted for simplicity |
| `emptySearchMessage` | union | TextInput | help: union values |
| `focusIndicator` | boolean | CheckBox | — |
| `gridArea` | string | TextInput | — |
| `help` | union | TextInput | help: union values |
| `icon` | union | TextInput | help: union values |
| `labelKey` | union | TextInput | help: union values |
| `limit` | number | TextInput | — |
| `margin` | union | TextInput | help: union values |
| `messages` | object | skipped — object | complex object shape; omitted for simplicity |
| `name` | string | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `onClose` | function | skipped — function | event handler |
| `onMore` | function | skipped — function | event handler |
| `onOpen` | function | skipped — function | event handler |
| `onSearch` | function | skipped — function | event handler |
| `open` | boolean | CheckBox | — |
| `options` | array | skipped — array | complex array shape; omitted for simplicity |
| `placeholder` | union | TextInput | help: union values |
| `plain` | boolean | CheckBox | — |
| `replace` | boolean | CheckBox | — |
| `searchPlaceholder` | union | TextInput | help: union values |
| `showSelectedInline` | boolean | CheckBox | — |
| `size` | string | TextInput | — |
| `sortSelectedOnClose` | boolean | CheckBox | — |
| `value` | array | skipped — array | complex array shape; omitted for simplicity |
| `valueKey` | union | TextInput | help: union values |
| `valueLabel` | union | TextInput | help: union values |

---

## Sidebar

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `footer` | ReactNode | TextInput | — |
| `header` | ReactNode | TextInput | — |

---

## Skeleton

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `colors` | object | skipped — object | complex object shape; omitted for simplicity |
| `gridArea` | string | TextInput | — |
| `height` | union | TextInput | help: union values |
| `margin` | union | TextInput | help: union values |
| `pad` | union | TextInput | help: union values |
| `round` | union | TextInput | help: union values |
| `width` | union | TextInput | help: union values |

---

## Spinner

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `color` | union | TextInput | help: union values |
| `message` | union | TextInput | help: union values |
| `size` | string | TextInput | — |

---

## Stack

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `anchor` | enum | Select (enum) | — |
| `fill` | union | TextInput | help: union values |
| `gridArea` | string | TextInput | — |
| `guidingChild` | union | TextInput | help: union values |
| `interactiveChild` | union | TextInput | help: union values |
| `margin` | union | TextInput | help: union values |

---

## StarRating

SKIP_TYPES: `['function']` · SKIP_PROPS: `['value']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `children` | function | skipped — function | render prop |
| `disabled` | boolean | CheckBox | — |
| `name` | string | TextInput | seeded 'star-rating' |
| `onChange` | function | skipped — function | event handler |
| `value` | union | skipped — managed | controlled by preview state; stars are clickable |

---

## Table

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `caption` | string | TextInput | — |
| `gridArea` | string | TextInput | — |
| `margin` | union | TextInput | help: union values |

---

## Tabs

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `activeIndex` | number | TextInput | — |
| `alignControls` | enum | Select (enum) | — |
| `alignSelf` | enum | Select (enum) | — |
| `children` | ReactNode | TextInput | — |
| `flex` | union | TextInput | help: union values |
| `gridArea` | string | TextInput | — |
| `justify` | enum | Select (enum) | — |
| `margin` | union | TextInput | help: union values |
| `messages` | object | skipped — object | complex object shape; omitted for simplicity |
| `onActive` | function | skipped — function | event handler |

---

## Tag

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `as` | union | TextInput | help: union values |
| `background` | union | TextInput | help: union values |
| `gridArea` | string | TextInput | — |
| `messages` | object | skipped — object | complex object shape; omitted for simplicity |
| `name` | string | TextInput | — |
| `onClick` | function | skipped — function | event handler |
| `onRemove` | function | skipped — function | event handler |
| `size` | string | TextInput | — |
| `value` | string | TextInput | — |

---

## Text

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `as` | union | TextInput | help: union values |
| `color` | union | TextInput | help: union values |
| `gridArea` | string | TextInput | — |
| `margin` | union | TextInput | help: union values |
| `size` | string | TextInput | — |
| `skeleton` | object | skipped — object | complex object shape; omitted for simplicity |
| `tag` | union | TextInput | help: union values |
| `textAlign` | enum | Select (enum) | — |
| `tip` | union | TextInput | help: union values |
| `truncate` | union | TextInput | help: union values |
| `weight` | union | TextInput | help: union values |
| `wordBreak` | enum | Select (enum) | — |

---

## TextArea

SKIP_TYPES: `['function']` · SKIP_PROPS: `['value']`

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `fill` | boolean | CheckBox | — |
| `focusIndicator` | boolean | CheckBox | — |
| `id` | string | TextInput | — |
| `name` | string | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `placeholder` | string | TextInput | — |
| `plain` | boolean | CheckBox | — |
| `resize` | union | TextInput | help: union values |
| `size` | string | TextInput | — |
| `value` | string | skipped — managed | controlled by preview state; textarea is typeable |

---

## ThumbsRating

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `children` | function | skipped — function | event handler |
| `disabled` | boolean | CheckBox | — |
| `name` | string | TextInput | — |
| `onChange` | function | skipped — function | event handler |
| `value` | union | TextInput | help: union values |

---

## Tip

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `content` | ReactNode | TextInput | — |
| `defaultVisible` | boolean | CheckBox | — |
| `dropProps` | object | skipped — object | complex object shape; omitted for simplicity |
| `plain` | boolean | CheckBox | — |

---

## ToggleGroup

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `defaultValue` | union | TextInput | help: union values |
| `multiple` | boolean | CheckBox | — |
| `onToggle` | function | skipped — function | event handler |
| `options` | union | TextInput | help: union values |
| `value` | union | TextInput | help: union values |

---

## WorldMap

SKIP_TYPES: `['function']` · SKIP_PROPS: none

| prop | CSV type | handling | rationale |
|---|---|---|---|
| `a11yTitle` | string | TextInput | — |
| `alignSelf` | enum | Select (enum) | — |
| `color` | union | TextInput | help: union values |
| `continents` | array | skipped — array | complex array shape; omitted for simplicity |
| `fill` | union | TextInput | help: union values |
| `gridArea` | string | TextInput | — |
| `hoverColor` | union | TextInput | help: union values |
| `margin` | union | TextInput | help: union values |
| `onSelectPlace` | function | skipped — function | event handler |
| `places` | array | skipped — array | complex array shape; omitted for simplicity |

---
