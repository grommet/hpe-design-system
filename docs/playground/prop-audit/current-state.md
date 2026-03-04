# Grommet Prop Dataset — Progress & Next Steps

## Progress (Current State)

### 1. Prop dataset created
A structured CSV dataset has been generated from the Grommet component documentation and source.

The dataset includes component props and related metadata such as:

- component
- prop
- propType
- normalizedPropType
- propCategory
- defaultValue
- description
- conditionalRelationship
- childSupport
- enumValues
- objectExample
- acceptsNode
- acceptsObject

This provides a **central dataset of Grommet component APIs**.

---

### 2. PropType normalization model defined
A **coarse normalization model** was defined to reduce many raw `propType` variations into a smaller consistent set `normalizedPropType`.

Normalized categories:

```
boolean
string
number
array
object
ReactNode
function
enum
union
```

This allows props to be analyzed consistently across components.
The aim it to use this a a broad guide for suitable input types for the compoent playground contorl panel

---

### 3. Automated normalization added
A normalization function now derives a new column:

```
normalizedPropType
```

This means the dataset now contains:

```
propType (raw extracted type)
normalizedPropType (coarse classification)
```

Example:

| prop | propType | normalizedPropType |
|------|----------|-------------------|
| size | `"small" \| "medium" \| "large"` | enum |
| disabled | boolean | boolean |
| pad | string \| object | union |

The raw type remains preserved for reference.

---

### 4. Documentation added
Documentation files were added to the repository to provide context for the dataset and normalization process.

Examples:

```
propType-definition.md
specialProps-definition.md
propType-aggregation.md
propType-normalization-context.md
```

These documents explain how prop types are interpreted and normalized.

---

# Current Dataset Structure

The CSV now includes the following columns:

```
component
componentCategory
prop
propType
normalizedPropType
propCategory
defaultValue
acceptsObject
objectExample
acceptsNode
enumValues
documentedValues
description
conditionalRelationship
childSupport
```

This structure supports systematic analysis of component APIs.

---

# Next Steps

### 1. Validate normalization results
Confirm the set of unique `normalizedPropType` values.

Expected values:

```
boolean
string
number
array
object
ReactNode
function
enum
union
```

Goal: ensure no unexpected types appear.

---

### 2. Generate summary metrics
Create quick summaries from the dataset.

Examples:

**Props per component**

```
component → prop count
```

**Type distribution**

```
normalizedPropType → count
```

**Enum props**

```
normalizedPropType = enum
```

This helps understand how complex different components are.

---

### 3. Review prop relationships
Use the following fields to identify patterns:

```
conditionalRelationship
childSupport
```

Examples of relationships:

```
href → target
FormField → input
Select → options
```

These relationships may influence how props are grouped later.

---

# Suggested Tooling for Exploration

Reviewing the dataset directly in CSV form will become difficult as it grows.

A small exploration interface would make analysis easier.

---

### Option 1 — Small local web UI (recommended)

Create a simple local tool that:

- loads the CSV
- filters by component
- filters by normalizedPropType
- filters by propCategory
- displays prop details

Useful views:

```
Component → props table
Type distribution
Enum value explorer
```

Useful libraries:

```
React
TanStack Table
PapaParse (CSV loader)
Vite
```

---

### Option 2 — Spreadsheet tools
Import the CSV into tools such as:

```
Airtable
Notion
Google Sheets
```

This allows sorting and grouping but is harder to automate.

---

### Option 3 — Static dataset viewer
Convert the CSV to JSON and build a simple static page to explore the data.

```
CSV → JSON
JSON → interactive table
```

No backend required.

---

# Potential Future Columns

Once the dataset has been reviewed visually, additional columns may be useful.

Examples:

```
inputTypeRecommendation
propImportance
uiGrouping
```

Example mapping:

| prop | normalizedPropType | inputTypeRecommendation |
|-----|-----|-----|
| disabled | boolean | toggle |
| size | enum | select |
| label | ReactNode | text input |
| pad | union | select + object editor |

These should be added **after reviewing the dataset**, not before.

---

# Recommended Immediate Next Step

Build a small **Prop Explorer** that allows:

```
filter by component
filter by normalizedPropType
filter by propCategory
view enum values
view prop relationships
```

This will make reviewing the dataset significantly easier than working directly in the CSV.