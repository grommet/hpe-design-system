---
description: "Generate the [Component]Anatomy.js React diagram file from the component's YAML anatomy[] array."
agent: "agent"
---

# Generate Anatomy Diagram Component

You are an expert React developer for the HPE Design System. Your task is to generate the anatomy diagram React component for a specific component, based on its structured YAML definition.

## Instructions

1. Read the `anatomy[]` array from the provided component YAML file (`shared/data-structure/components/[component-name].yaml`).
2. Read `apps/docs/src/examples/components/menu/MenuAnatomy.js` as the canonical structural reference.
3. Follow `.github/instructions/anatomy-diagram.instruction.md` for all visual rules, React patterns, and file conventions.

### Validate anatomy[] before generating

3b. Before generating any code, review each entry in `anatomy[]` against the standalone-render test: **the part must be visible when rendering `<ComponentName />` alone with no parent wrapper.** If an entry describes something rendered by a parent component (e.g., `FormField`'s `help` text, a layout `Box`, a page-level header), exclude it from the diagram and note the exclusion as a comment at the top of the file.

If you exclude an entry, reduce the region numbering of the remaining entries to stay sequential and update the `anatomy[]` entries you are working from accordingly.

### Mapping anatomy[] to the diagram

4. For each `AnatomyPart` in the `anatomy[]` array:
   - Assign a unique, descriptive DOM `id` to the corresponding region element (e.g., `id="container"`, `id="button-label"`, `id="icon"`).
   - Create an `Annotation` bubble with a matching `id` (used as `fromTarget`) and a `target` value equal to the `label` string from the YAML (e.g., `"1"`, `"1a"`).
   - Add a corresponding entry to the `connections[]` array wiring the `Annotation` id to the region id.
   - Top-level parts whose annotation sits to the **right** use `anchor: 'horizontal'`.
   - Top-level parts or sub-parts whose annotation sits **above or below** (e.g., a left-side element like an input square or leading icon) use `anchor: 'vertical'` — place the bubble in a dedicated top/bottom row aligned with that sub-part's column. Never use a left column for these.
   - Sub-parts in a row above/below the component (e.g., `"1a"`, `"1b"`) use `anchor: 'vertical'`.

5. Design the `AnatomyGrid` layout:
   - Define `columns`, `rows`, and `areas` so each annotation bubble aligns clearly with its target region.
   - Group sub-part annotation bubbles (e.g., `1a`, `1b`) in a row above or below the component area when they annotate horizontally arranged children.
   - Refer to `MenuAnatomy.js` for a worked example of a multi-level annotation layout.

### Visual rules

6. **Render the actual grommet component directly — never reconstruct it.** Import and render the real grommet component by name (e.g., `<CheckBox>`, `<Button>`, `<Tag>`). Do NOT reconstruct it using plain `Box`, `Text`, and icon primitives — that produces a facsimile that will not match the real theme-rendered component. The anatomy diagram must show what the component actually looks like.

7. **Apply dotted borders only to specific invisible sub-containers, never to outer wrappers.** Use `border={{ style: 'dashed' }}` only when a structural sub-container inside the component exists in the DOM but has no visible UI boundary — for example, the hit area of a borderless `Button`. Never wrap the rendered component in a dotted `Box` to mark its outer boundary or frame the diagram. If the component has visible borders of its own, no dotted wrapper is needed.

8. **Never place an annotation bubble in a grid column to the LEFT of the component.** The component must be the leftmost element in the `AnatomyGrid`. Annotation bubbles must only appear in a dedicated column to the **right** of all component columns, or in a **top/bottom row** within the same column span. For sub-parts that sit on the left side of the component (e.g., an input square, a leading icon), place the annotation bubble in a **top row** aligned with that sub-part's column and use `anchor: 'vertical'`. See `MenuAnatomy.js` `1a`/`1b` as the reference pattern.

9. Use realistic generic content in labels and placeholders — never "Button label", "Item 1", or "Placeholder". Use values like "Save changes", "Settings", "Upload file" instead.

9. Use only neutral grommet tokens for color: `background-front`, `border`, `border-weak`. Do not add decorative fills or colors.

### Mock sub-components

11. Do NOT generate mock sub-components within this file. If accurate visual representation of a region requires custom mock components that cannot be achieved with plain grommet primitives:
   - Write `{/* TODO: Replace with [Component]Mock sub-component for accurate visual representation */}` at that point in the JSX.
   - Flag the gap separately in `apps/docs/todos/TODO-[component].md`.

### Output

12. Output the complete, copy-pasteable content for:

```
apps/docs/src/examples/components/[component-name]/[Component]Anatomy.js
```

13. After the file content, provide the one-line export to add to the folder's `index.js`:

```js
export * from './[Component]Anatomy';
```

## Prerequisites Context

When running this prompt, ensure you have the following files in your context:

- The component's YAML file: `shared/data-structure/components/[component-name].yaml`
- `apps/docs/src/examples/components/menu/MenuAnatomy.js` (canonical structural reference)
- `.github/instructions/anatomy-diagram.instruction.md`
