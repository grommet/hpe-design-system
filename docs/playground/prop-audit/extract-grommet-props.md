# extract-grommet-props.js

Scrapes prop metadata from [v2.grommet.io](https://v2.grommet.io) for 61 Grommet components and writes a structured CSV.

## Components audited (61)

| Category | Components |
|---|---|
| **Layout** | Box, Card, Footer, Grid, Header, Layer, Main, Page, PageHeader, Sidebar, Stack |
| **Type** | Heading, Markdown, Paragraph, Text, Tag |
| **Controls** | Accordion, Anchor, Button, Drop, DropButton, Menu, Nav, Tabs, Tip, ToggleGroup |
| **Input** | CheckBox, CheckBoxGroup, DateInput, FileInput, MaskedInput, RadioButton, RadioButtonGroup, RangeInput, RangeSelector, Select, SelectMultiple, StarRating, TextArea, TextInput, ThumbsRating, FormField, Form |
| **Visualizations** | Avatar, Calendar, Cards, Chart, Clock, DataChart, DataTable, Diagram, Distribution, List, Meter, NameValueList, Notification, Skeleton, Pagination, Spinner, Table, WorldMap |

To add or remove components, edit the `COMPONENTS` array at the top of the script.

## Usage

```bash
node prop-audit/extract-grommet-props.js
```

Output: `prop-audit/grommet-props.csv` (~737 rows)

To scrape a single category to a separate file (e.g. to avoid overwriting hand-edited data):

```bash
node prop-audit/extract-grommet-props.js --category Visualizations --output grommet-props-visualizations.csv
```

---

## What it does

1. **Fetches** each component's doc page from `v2.grommet.io/<ComponentName>` (with retry logic)
2. **Parses** the Props section — walks `div[id]` siblings of the `<h2>Props</h2>` container to extract per-prop data
3. **Classifies** each prop into a category (`layout`, `content`, `state`, `event`, `accessibility`, `behavior`)
4. **Normalises** the raw prop type into one of 9 coarse categories (`boolean`, `string`, `number`, `array`, `object`, `function`, `ReactNode`, `enum`, `union`)
5. **Writes** all rows to CSV with 15 columns

## Special cases

| Situation | Handling |
|---|---|
| `Card`, `Footer`, `Main`, `Nav` | No Props section on docs — emits a single `(extends Box) / BoxProps` marker row |
| `StarRating`, `ThumbsRating` | No unique props — derives rows from `RadioButtonGroup` (minus `options`) |
| Free-form string props (`gridArea`, `className`, etc.) | Excluded from enum promotion even when `enumValues` is populated |

## Output columns

`component` · `componentCategory` · `prop` · `propType` · `normalizedPropType` · `propCategory` · `defaultValue` · `acceptsObject` · `objectExample` · `acceptsNode` · `enumValues` · `documentedValues` · `description` · `conditionalRelationship` · `childSupport`
