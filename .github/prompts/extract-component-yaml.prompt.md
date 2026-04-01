# Extract MDX to YAML Component Definition

You are an expert technical writer and developer for the HPE Design System. Your task is to reverse-engineer existing human-readable `.mdx` documentation into a highly structured `YAML` data format.

## Instructions

1. Read the provided existing component MDX documentation file.
2. Read the `ComponentDefinition` interface schema found in `shared/data-structure/types.ts`.
3. Extract all relevant information from the MDX (description, props, usage, accessibility, etc.) and map it into the `YAML` format strictly matching the `ComponentDefinition` schema. Ensure `contentGuidelines` and `dosAndDonts` are properly populated if applicable. Unmappable or lengthy legacy content that doesn't fit should be logged by you into `apps/docs/todos/DEPRECATED-[component-name].md`.
4. **Code Examples:** Do NOT extract or write the raw code into the YAML `examples` array. Instead, provide relative paths pointing to the existing example files located in `apps/docs/src/examples/components/`. For example: `path: apps/docs/src/examples/components/[component-name]/[ExampleName].js`.
5. **Distinguish Variants vs. Behaviors:** Morphological types (e.g., Icon-only, Toggle, Sizes) belong in `variants`. Transient states (e.g., Disabled, Loading, Validation/Error) belong in the `behaviors` object (split appropriately into `interactiveStates`, `applicationStates`, or `dataStates`).
6. **Use Cases Focus:** When extracting `whenToUse` descriptions, ensure they are framed around specific user tasks or goals, rather than why the designer chose the UI structure. Rewrite legacy examples to be task-oriented if needed.
7. **Anatomy:** Populate the `anatomy[]` array using the `AnatomyPart` shape from `types.ts`: `{ label, region, purpose, availability: 'required' | 'optional', notes? }`. Extract anatomy data from any of the following sources in the MDX, in priority order:
   - An existing annotation table (e.g., the `| Label | Region | Purpose | Required | Notes |` table).
   - An existing `<[Component]Anatomy />` diagram component — read its structure to identify labeled regions.
   - Named parts mentioned in prose descriptions or section headings.
   If no anatomy data exists in the MDX, generate a best-effort skeleton based on the component's props and visible structure, using short, neutral `purpose` descriptions. Mark every generated entry as `availability: 'optional'` to flag it for human review.

   **Before adding any entry, apply the standalone-render test:** a part belongs in `anatomy[]` only if it is rendered by the component's own code when used standalone — a direct prop, named slot, or internal structural element. Ask: *can I see this element by rendering `<ComponentName />` alone with no parent wrapper?* If no, exclude it. Common mistakes to avoid:
   - `FormField`'s `help`/description text when documenting a form input (`CheckBox`, `TextInput`, etc.) — this is `FormField`'s anatomy.
   - A wrapping `Box` or layout container not part of the component's own render output.
   - Variant-specific additions that only appear when additional parent configuration is applied.
8. If there is missing information in the MDX that is required by the `ComponentDefinition` schema, leave it blank or omit the field if optional, so we can identify the gaps later.
9. Output the resulting YAML content so it can be saved as `shared/data-structure/components/[component-name].yaml`.

## Prerequisites Context

When running this prompt, ensure that you have the following files included in your context:

- The component's existing `.mdx` file (e.g. `apps/docs/src/pages/components/button.mdx`)
- `shared/data-structure/types.ts`
- `shared/data-structure/COMPONENT_EXAMPLE.yaml` (as a structural reference)
