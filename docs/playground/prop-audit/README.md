# Grommet Prop Audit

A mini-project for extracting and normalising Grommet component prop metadata into a structured CSV dataset.

The dataset is used to review component APIs and determine suitability for inclusion in a Design System component playground control panel.

---

## Contents

```
prop-audit/
  README.md                      ← this file
  extract-grommet-props.js       ← scrapes prop metadata from v2.grommet.io
  grommet-props.csv              ← generated output (61 components, ~737 rows)
  extract-config-warnings.js     ← scans source files for console.warn guards
  config-warnings.csv            ← generated output (prop misconfiguration warnings)
```

---

## Quickstart

From the `grommet` repo root:

```bash
node prop-audit/extract-grommet-props.js
```

The script fetches each component page from `v2.grommet.io`, parses the Props section, and overwrites `prop-audit/grommet-props.csv`.

**Runtime**: ~60–90 seconds for 61 components (300 ms delay between requests).

### Dependencies

`cheerio` and `node-fetch@2` are required and already installed as devDependencies. If they go missing:

```bash
npm install --save-dev cheerio node-fetch@2 --legacy-peer-deps
```

---

## Config Warnings Script

A second script scans the source of all 43 components for `console.warn` calls that fire when props are misconfigured at runtime. These warnings document constraints that aren't expressible in the type system alone — things like mutual exclusions, deprecated APIs, and context misuse.

```bash
node prop-audit/extract-config-warnings.js
```

Output: `prop-audit/config-warnings.csv`

### Config Warnings CSV Columns

| Column | Description |
|--------|-------------|
| `component` | Grommet component name |
| `componentCategory` | High-level grouping: `Layout`, `Type`, `Controls`, `Input`, `Visualizations` |
| `propsInvolved` | Space-separated prop names extracted from the condition expression |
| `warningType` | Classified constraint type (see below) |
| `message` | Warning message text as it appears in source |
| `condition` | The enclosing `if(...)` condition that triggers the warning |
| `sourceFile` | Relative path to the source file |
| `lineNumber` | Line number of the `console.warn` call |

### Warning Types

| Type | Meaning |
|------|---------|
| `mutual_exclusion` | Two props that cannot both be set at the same time |
| `conflict` | One usage mode conflicts with another |
| `dependency` | Prop A only works when prop B is also set |
| `api_misuse` | Prop used in the wrong context (e.g. `checked` inside a group component) |
| `deprecation` | Use of a deprecated prop or API |
| `incompatibility` | Two features that cannot work together at a technical level |
| `other` | Anything that doesn't fit the above |

---

## Component Scope — 43 Components

| Category  | Components |
|-----------|-----------|
| **Layout** | Box, Card, Footer, Grid, Header, Layer, Main, Page, PageHeader, Sidebar, Stack |
| **Type** | Heading, Markdown, Paragraph, Text, Tag |
| **Controls** | Accordion, Anchor, Button, Drop, DropButton, Menu, Nav, Tabs, Tip, ToggleGroup |
| **Input** | CheckBox, CheckBoxGroup, DateInput, FileInput, MaskedInput, RadioButton, RadioButtonGroup, RangeInput, RangeSelector, Select, SelectMultiple, StarRating, TextArea, TextInput, ThumbsRating, FormField, Form |
| **Visualizations** | Avatar, Calendar, Cards, Chart, Clock, DataChart, DataTable, Diagram, Distribution, List, Meter, NameValueList, Notification, Skeleton, Pagination, Spinner, Table, WorldMap |

To change scope, edit the `COMPONENTS` array at the top of `extract-grommet-props.js`.

---

## CSV Columns

| Column | Description |
|--------|-------------|
| `component` | Grommet component name (e.g. `Button`) |
| `componentCategory` | High-level grouping: `Layout`, `Type`, `Controls`, `Input`, `Visualizations` |
| `prop` | Prop name (e.g. `disabled`) |
| `propType` | Type(s) as listed in the docs — multiple types joined with ` \| ` |
| `normalizedPropType` | Coarse type category: `boolean`, `string`, `number`, `array`, `object`, `function`, `ReactNode`, `element`, `enum`, `union` |
| `propCategory` | Classified purpose: `state`, `content`, `layout`, `behavior`, `event`, `accessibility` |
| `defaultValue` | Default value if documented |
| `acceptsObject` | `true` if the prop accepts an object shape |
| `objectExample` | First object example from docs (truncated at 300 chars) |
| `acceptsNode` | `true` if the prop accepts a React node or element |
| `enumValues` | Space-separated list of documented string/literal values |
| `documentedValues` | Same as enumValues (retains raw values for downstream use) |
| `description` | Prop description from the docs page |
| `conditionalRelationship` | Hand-authored note where one prop depends on another |
| `childSupport` | Nested component usage note — populated for `children` props and element-typed props (e.g. `icon`, `actions`) |

---

## How the Script Works

### Source

All data is scraped from **[v2.grommet.io](https://v2.grommet.io)** — the official Grommet documentation site. The site is Gatsby SSR, so plain HTTP requests return full HTML without needing a headless browser.

The Grommet repo's `.d.ts` files define TypeScript types but contain no prose descriptions or default values. Docs are the only complete source.

### DOM Structure

Each component page (`v2.grommet.io/<componentname>`) follows this pattern:

```
h2: "Props"
  div[id="propName"]         ← one per prop
    h3: propName
    div > span               ← description text
    div.type-variant         ← one per type (e.g. string, object, boolean)
      code: typeName
      pre: exampleValue(s)
  ...
h2: "Theme"
```

The script locates the `Props` h2 container, walks its sibling divs by `[id]`, and extracts each prop's name, all type `<code>` values, `<pre>` example values, and the description `<span>` text.

### Special Cases

| Component | Treatment |
|-----------|-----------|
| **Card, Footer, Main, Nav** | These are pure Box wrappers with no additional props. A single marker row is emitted: `prop=(extends Box)`, `propType=BoxProps`. See Box rows for the full prop set. |
| **StarRating, ThumbsRating** | These extend `RadioButtonGroupExtendedProps` minus the `options` prop (per their `.d.ts` definitions). Rows are derived from RadioButtonGroup rows with `options` filtered out. |
| **Header, Page, Sidebar** | Accurately sparse — these components add only 1–2 props on top of Box. |

### propCategory Classification

Props are classified by name pattern using these regex rules (in priority order):

| Category | Matched names |
|----------|--------------|
| `event` | Starts with `on` or `handle` (e.g. `onClick`, `onChange`) |
| `accessibility` | `a11yTitle`, `aria*`, `tabIndex`, `role`, `htmlFor`, `id`, `lang` |
| `state` | `disabled`, `active`, `busy`, `success`, `open`, `checked`, `selected`, etc. |
| `layout` | `margin`, `pad`, `gap`, `width`, `height`, `align`, `direction`, `background`, etc. |
| `content` | `children`, `label`, `icon`, `badge`, `placeholder`, `tip`, `options`, `data`, etc. |
| `behavior` | Everything else |

### Conditional Relationships

A small hand-authored lookup in `CONDITIONAL_RELATIONSHIPS` covers well-known prop dependencies (e.g. `target` on Button/Anchor requires `href`). These are not inferred — only documented or structurally obvious relationships are included.

---

## Known Limitations

1. **Shared type aliases not resolved** — prop types like `BackgroundType` or `MarginType` appear as-is rather than being expanded to their inline definitions. These are defined in `src/js/utils/`.

2. **defaultValue extraction is heuristic** — the docs don't have a dedicated "default" field; the script matches a `default:` text pattern. Many props will have a blank `defaultValue`.

3. **objectExample truncated at 300 chars** — complex multi-type props (e.g. `Box.background`) have long object shapes that are cut off.

4. **enumValues may include non-enum pre examples** — the script collects all short `<pre>` values as potential enum literals; some may be generic examples (e.g. numeric values like `10`, `0.5`) rather than true enumerations.

5. **Card/Footer/Main/Nav show only a marker row** — their full prop surface is inherited from Box. For a complete picture, join on `component = "Box"` rows.

6. **NewerComponents may be absent from docs** — ToggleGroup is documented but sparsely; if future components don't yet have a `Props` heading on v2.grommet.io they'll emit 0 rows.

---

## Future Work

### Immediate improvements

- [ ] **Resolve shared type aliases** — read `src/js/utils/` type definitions and expand aliases (`BackgroundType` → `string | { dark: string, light: string } | ...`) into an additional `resolvedType` column
- [ ] **Merge Box props into wrappers** — post-process the CSV to duplicate Box rows into Card/Footer/Main/Nav rows, so every component is self-contained
- [ ] **Extract default values from theme** — parse `src/js/themes/base.js` to cross-reference theme token defaults and populate `defaultValue` more accurately
- [ ] **Add a `controlType` column** — map each prop to a suggested playground control type (`toggle`, `text`, `select`, `color`, `number`, `json`, `range`, etc.) based on `propType` and `enumValues`

### Playground control panel integration

The dataset is structured to drive a control panel UI. Suggested downstream steps:

1. Filter `propCategory != 'event'` — events are handlers, not controls
2. Map `propType` + `enumValues` → control input type:
   - `boolean` → toggle
   - enum (non-empty `enumValues`) → dropdown/segmented control
   - `string` (no enum) → text input
   - `number` → number input or range slider
   - `object` → JSON/code editor or expandable group
   - `node` / `element` → slot/children picker
3. Use `conditionalRelationship` to show/hide dependent controls
4. Use `acceptsObject=true` + `objectExample` to pre-populate a JSON control template

### Additional data sources

- **Storybook stories** (`src/js/components/*/stories/`) — extract live usage examples to populate `objectExample` more richly
- **Theme tokens** (`src/js/themes/base.js`) — map theme paths to the props they affect
- **[HPE Design System](https://design-system.hpe.design)** — overlapping component guidance and usage patterns for HPE-specific customisation

---

## Regenerating the CSV

```bash
# From the grommet repo root
node prop-audit/extract-grommet-props.js
```

Output is written to `prop-audit/grommet-props.csv`. Safe to rerun — overwrites the existing file.
