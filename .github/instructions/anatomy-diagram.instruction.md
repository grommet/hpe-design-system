---
description: "Use when creating, reviewing, or generating anatomy diagram components or the MDX anatomy annotation table for component documentation pages. Covers the React component pattern, visual rules, file location, mock sub-component guidance, and annotation table formatting."
---

# Anatomy Diagram Guidelines

Anatomy diagrams establish a shared understanding of component structure across design and engineering. Every component documentation page requires a `## Anatomy` section with two artifacts:

1. A React diagram component: `apps/docs/src/examples/components/[name]/[Component]Anatomy.js`
2. An MDX `## Anatomy` section: an `<Example plain>` block embedding the component, followed by an annotation table.

---

## Visual Rules

Apply these rules to every anatomy diagram.

1. **Render the actual grommet component — never reconstruct it.** Import and render the real named grommet component (`<CheckBox>`, `<Button>`, `<Tag>`, etc.) directly in the diagram. Never substitute it with a hand-built facsimile made from `Box`, `Text`, and icon primitives. The real component is the only way to guarantee visual accuracy because it inherits all theme tokens automatically.

   Use simplified structural placeholders only for large patterns (wizards, dashboards, full-page layouts) whose inner labels become unreadable at full scale. Simple and medium components must always use the real component.

2. **Annotate only parts intrinsic to the component itself.** A part qualifies for anatomy only if it is rendered by the component's own code when used standalone — a direct prop, named slot, or internal structural element.

   Apply this test before adding any part: *can I see this element by rendering `<ComponentName />` alone with no parent wrapper?* If the answer is no, exclude it. Parts that appear only inside a parent or wrapper belong to that wrapper's anatomy:
   - `help` / description text rendered by `<FormField>` → `FormField`'s anatomy, not `CheckBox`'s
   - A page header wrapping a `Button` → the page's anatomy, not `Button`'s
   - A `Box` providing padding around `Tag` → the layout's anatomy, not `Tag`'s

3. **Scale detail to complexity.** Label primary structural regions only. Avoid annotating every internal element in large patterns.
   - Simple components (Button, Tag): label icon, label, container.
   - Complex components (DataTable, Layer): label primary regions (header, body, footer, trigger).

4. **Represent invisible sub-containers with dotted borders — never the whole component.** Apply `border={{ style: 'dashed' }}` only to a specific invisible structural sub-container *inside* the component — one that exists in the DOM but has no visible UI boundary. Common correct uses: the clickable hit area of a borderless `Button`, a layout-only wrapper `Box` inside a `Menu` item.

   Never apply a dotted border to the outermost wrapper of the anatomy diagram. Never use dotted lines to frame the component as a whole, label its outer boundary, or add visual structure that doesn't correspond to a real invisible sub-container in the component's DOM.

5. **Omit all outer diagram borders.** Never draw any border — solid or dotted — around the entire anatomy diagram. The component's own visual boundary is sufficient. Decorative frames obscure what is real structure versus documentation chrome.

6. **Use monochrome visuals.** Use only neutral grommet tokens (`background-front`, `border`, `border-weak`). Never use decorative color, fills, or highlighted regions. Color implies semantic meaning and introduces false hierarchy.

7. **Use realistic generic content.** Write short, neutral content in labels and placeholders: "Save changes", "Project settings", "Upload file". Never write "Button label", "Title text", or "Item 1".

8. **Separate structure from implementation details.** Never include spacing values, token names, or elevation values in anatomy labels. Document those in Specs or Properties.

9. **The component must be flush with the left edge — never push it right with an annotation column.** The component must occupy the leftmost column(s) in the `AnatomyGrid`. Annotation bubbles belong only in:
   - (a) a dedicated column to the **right** of all component columns, or
   - (b) a top/bottom row within the **same column span** as the component.

   Never create a grid column to the left of the component to hold annotation bubbles — this indents the component away from the page left edge, breaking visual alignment with the rest of the page content.

   **For sub-parts that sit on the same horizontal row** (e.g., a checkbox square + its label, a button icon + label): place annotation bubbles in a **top row** above the component using `anchor: 'vertical'`. To ensure the vertical wires land on the correct sub-element (not the full component center), render each sub-part wrapped in its own `<Box id="...">` so `Diagram` can measure narrow, accurate positions. This exactly mirrors `MenuAnatomy.js`'s `menu-label`/`menu-icon` isolation pattern:

   ```jsx
   {/* MenuAnatomy pattern — each sub-element has its own id */}
   <MenuMockButton
     label={<Box id="menu-label">Menu</Box>}
     icon={<Box id="menu-icon">{...}</Box>}
   />

   {/* CheckBox equivalent — square-only CheckBox + sibling label */}
   <Box direction="row" align="center" gap="xsmall">
     <Box id="checkbox-input" flex={false}>
       <CheckBox checked={...} onChange={...} /> {/* no label prop — just the square */}
     </Box>
     <Text id="checkbox-label">Accept terms</Text>
   </Box>
   ```

   If the component's internals cannot be isolated (e.g., a fully self-contained grommet component), use `anchor: 'vertical'` top-row annotations and size the grid columns to approximate sub-element positions.

---

## React Component Pattern

All anatomy components follow a consistent structure. Use [`apps/docs/src/examples/components/menu/MenuAnatomy.js`](../../apps/docs/src/examples/components/menu/MenuAnatomy.js) as the canonical implementation. [`apps/docs/src/examples/components/togglegroup/ToggleGroupAnatomy.js`](../../apps/docs/src/examples/components/togglegroup/ToggleGroupAnatomy.js) is a simpler reference for components without mock sub-parts.

### Structure

```jsx
import React, { useContext } from 'react';
import { Box, Grid, Diagram, Stack, ThemeContext } from 'grommet';
import { Annotation } from '../../../layouts';

// 1. Define connection descriptors — one per annotation-to-region wire
const connections = [
  {
    anchor: 'horizontal', // or 'vertical' — choose the axis of the connecting line
    type: 'direct',
    color: 'border',
    thickness: 'hair',
    fromTarget: '1',        // id of the Annotation bubble
    toTarget: 'my-region',  // id of the DOM element in the diagram
  },
  // ...
];

// 2. AnatomyGrid — a grommet Grid that lays out annotation bubbles
//    alongside the component. Define columns, rows, and areas so that
//    each annotation sits clearly next to its target region.
const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['max-content', '5xsmall']}
    rows={[/* one row entry per visual row in your layout */]}
    areas={[
      // Each row: [componentArea, annotationArea]
      // — the component column is always leftmost and sizes to its content
      // — annotations only appear in the rightmost column or in top/bottom rows
    ]}
    align="center"
    justify="center"
    {...rest}
  />
);

// 3. Main export — Stack overlays Diagram wires on top of the AnatomyGrid layout
export const [Component]Anatomy = () => {
  const theme = useContext(ThemeContext); // only import when referencing theme values

  return (
    <Stack margin={{ bottom: 'medium' }} interactiveChild="last">
      <AnatomyGrid>
        {/* Annotation bubbles — one per labeled region */}
        <Annotation id="1" target="1" gridArea="annotation-1" />
        <Annotation id="1a" target="1a" gridArea="annotation-1a" />

        {/* Component regions — each region needs a unique DOM id="" */}
        <Box gridArea="component-area">
          <Box id="my-region">...</Box>
        </Box>
      </AnatomyGrid>

      {/* Diagram renders the connection lines as an SVG overlay */}
      <Diagram connections={connections} />
    </Stack>
  );
};
```

### `Annotation` component

`Annotation` is imported from `'../../../layouts'`. It renders a numbered circle.

| Prop | Type | Purpose |
|------|------|---------|
| `id` | `string \| number` | DOM id used as `fromTarget` in `connections[]` |
| `target` | `string` | Value displayed inside the circle (e.g., `"1"`, `"1a"`) |
| `gridArea` | `string` | Positions the bubble in `AnatomyGrid` |

Always match `fromTarget` in `connections[]` to `id` on `Annotation`, and `toTarget` to `id` on the component region element.

### `connections[]` anchor values

- `'horizontal'` — wire enters/exits from the left or right of the element. Use when the annotation bubble sits to the **right** of the UI region (annotations in the rightmost column).
- `'vertical'` — wire enters/exits from the top or bottom of the element. Use when the annotation bubble sits **above or below** the UI region — required for any sub-part whose annotation bubble is placed in a top/bottom row (including left-side sub-parts like an input square or leading icon).

---

## Mock Sub-Components

Create mock sub-components when:
- The real grommet component applies visual styles through theme tokens that are not reproducible by passing plain props in the anatomy file.
- Isolating a specific sub-element for annotation requires a wrapper that cannot be added via a plain `id` prop on an existing grommet component.

### Naming and location

| File | Path |
|------|------|
| Mock helpers | `apps/docs/src/examples/components/[name]/[Component]Mock.js` |

- Export mock components from `[Component]Mock.js` and import them into `[Component]Anatomy.js`.
- Do **not** re-export mocks from the folder's `index.js` — they are internal to the anatomy diagram only.

When mock sub-components are needed but too complex to generate automatically, add a `// TODO: Replace with [Component]Mock sub-component for accurate visual representation` comment at that region and flag the work in `apps/docs/todos/TODO-[component].md`.

---

## File Location and Export

| File | Path |
|------|------|
| Anatomy component | `apps/docs/src/examples/components/[name]/[Component]Anatomy.js` |
| Mock helpers (if needed) | `apps/docs/src/examples/components/[name]/[Component]Mock.js` |

Always add the anatomy component to the folder's `index.js`:

```js
export * from './[Component]Anatomy';
```

The export must be present before the MDX page can import the component.

---

## MDX Annotation Table

The `## Anatomy` section in MDX always contains two parts:

1. An `<Example>` block embedding the anatomy component.
2. An annotation table immediately below — no headings or prose between them.

### Example block

```mdx
<Example caption="Diagram illustrating the parts composing [Component]." plain>
  <[Component]Anatomy />
</Example>
```

- Always include `plain` to suppress the code-viewer chrome.
- Write the `caption` as a single sentence: "Diagram illustrating the parts composing [Component]."

### Annotation table

```mdx
| Label  | Region          | Purpose               |                         Required                         | Notes |
| :----: | --------------- | --------------------- | :------------------------------------------------------: | ----- |
| **1**  | **[Part Name]** | One sentence purpose. | <span><Checkmark a11yTitle="true" size="small" /></span> | --    |
| **1a** | **[Sub Part]**  | One sentence purpose. |                         Optional                         | --    |
```

Column rules:

- `Label` — bold annotation number, centered (`| :----: |`).
- `Region` — bold part name, left-aligned.
- `Purpose` — one imperative sentence describing the structural role of the part.
- `Required`:
  - `availability: 'required'` in YAML → `<span><Checkmark a11yTitle="true" size="small" /></span>`
  - `availability: 'optional'` in YAML → `Optional`
- `Notes` — supplemental guidance as plain text; write `--` when nothing to add.

The `Checkmark` icon must be imported at the top of the MDX file:

```js
import { Checkmark } from '@hpe-design/icons-grommet';
```

---

## Anatomy Diagram Checklist

Before committing an anatomy diagram, verify:

- [ ] Real UI is used when the component fits at readable scale
- [ ] Large patterns use simplified structural diagrams
- [ ] Dotted lines represent invisible containers only
- [ ] No outer frame surrounds the diagram
- [ ] Visuals use neutral monochrome styling only
- [ ] Content uses realistic generic examples (no "Label text" or "Item 1")
- [ ] Anatomy labels identify structure only — no tokens, spacing values, or implementation details
- [ ] `[Component]Anatomy.js` is exported from the folder's `index.js`
- [ ] The annotation table `Required` column uses `<Checkmark>` for required parts
- [ ] `Checkmark` is imported in the MDX file
