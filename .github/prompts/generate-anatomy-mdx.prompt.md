---
description: "Generate the ## Anatomy MDX section (Example wrapper + annotation table) for a component documentation page, from the component's YAML anatomy[] array."
agent: "agent"
---

# Generate Anatomy MDX Section

You are an expert technical writer for the HPE Design System. Your task is to generate the `## Anatomy` section for a component's MDX documentation page.

## Instructions

1. Read the `anatomy[]` array from the provided component YAML file (`shared/data-structure/components/[component-name].yaml`).
2. Read the `## Anatomy` section in `apps/docs/src/pages/components/menu.mdx` as the canonical reference for structure and formatting.
3. Follow `.github/instructions/anatomy-diagram.instruction.md` for all annotation table column rules.

### Output two parts

#### Part 1: Import additions

Provide the lines to add at the top of the MDX file, alongside the other import statements.

Add the anatomy component to the examples import. If an `import { ... } from '../../examples'` already exists in the file, add the anatomy component to that same destructured import. If no such import exists, add a new one:
```js
import { [Component]Anatomy } from '../../examples';
```

Ensure `Checkmark` is present in the icons import. If it is not already there, add it:
```js
import { Checkmark } from '@hpe-design/icons-grommet';
```

#### Part 2: `## Anatomy` section

Generate the section in this exact order — no additional headings, prose, or blank lines between the two parts:

```mdx
## Anatomy

<Example caption="Diagram illustrating the parts composing [Component]." plain>
  <[Component]Anatomy />
</Example>

| Label  | Region      | Purpose               |                         Required                         | Notes |
| :----: | ----------- | --------------------- | :------------------------------------------------------: | ----- |
| **1**  | **[Region]**| One sentence purpose. | <span><Checkmark a11yTitle="true" size="small" /></span> | --    |
| **1a** | **[Region]**| One sentence purpose. |                         Optional                         | --    |
```

### Annotation table mapping rules

For each `AnatomyPart` in `anatomy[]`, produce one table row:

- `Label` — bold annotation label from the YAML `label` field: `**1**`, `**1a**`. Centered column.
- `Region` — bold region name from the YAML `region` field: `**Button container**`. Left-aligned column.
- `Purpose` — the `purpose` string from the YAML. One sentence, ends with a period.
- `Required`:
  - `availability: 'required'` → `<span><Checkmark a11yTitle="true" size="small" /></span>`
  - `availability: 'optional'` → `Optional`
- `Notes` — the `notes` string from the YAML if present; write `--` if absent.

### Formatting rules

- Place `## Anatomy` immediately after `## Use cases` and before `## Variants` in the MDX file.
- Place the `<Example>` block directly under the `## Anatomy` heading with one blank line between them.
- Place the annotation table directly after the closing `</Example>` tag with one blank line between them.
- Never add a `###` subheading or prose between the `<Example>` block and the table.
- Output only the import additions and the `## Anatomy` section — not the full MDX file.

## Prerequisites Context

When running this prompt, ensure you have the following files in your context:

- The component's YAML file: `shared/data-structure/components/[component-name].yaml`
- `apps/docs/src/pages/components/menu.mdx` (reference for anatomy section structure)
- `.github/instructions/anatomy-diagram.instruction.md`
